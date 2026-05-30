import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { loadResearcherSystemPrompt, type Angle } from "@/lib/researcher-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClientMessage = { role: "user" | "assistant"; content: string };

// --- Cost control: Haiku by default on the public demo. ---
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";

const VALID_ANGLES: Angle[] = ["open", "qualify", "callprep", "walk", "rank", "duel"];

// Per-angle output caps (cost ceiling). Call-prep is deliberately tiny.
const MAX_TOKENS: Record<Angle, number> = {
  open: 1600,
  qualify: 1600,
  callprep: 600,
  walk: 1400,
  rank: 2000,
  duel: 1200,
};

// --- Input guardrails ---
const MAX_MESSAGES = 24; // conversation depth ceiling
const MAX_CHARS_PER_MSG = 4000; // single-message length ceiling
const MAX_TOTAL_CHARS = 16000; // whole-conversation ceiling

// --- Per-IP rate limit (in-memory token bucket). Resets on cold start; that's fine for a demo. ---
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 12);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "anon";
}

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  if (b.count >= RATE_LIMIT_MAX) {
    return { limited: true, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { limited: false, retryAfter: 0 };
}

// Opportunistic cleanup so the map doesn't grow unbounded.
function sweep() {
  if (buckets.size < 5000) return;
  const now = Date.now();
  for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
}

function parseAngle(input: unknown): Angle {
  if (typeof input === "string" && (VALID_ANGLES as string[]).includes(input)) {
    return input as Angle;
  }
  return "qualify";
}

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return json(
      {
        error:
          "ANTHROPIC_API_KEY is not set. The researcher cannot respond without it. Add it to .env.local or your Vercel environment.",
      },
      500
    );
  }

  // Rate limit before doing any work.
  sweep();
  const ip = clientIp(req);
  const rl = rateLimited(ip);
  if (rl.limited) {
    return json(
      { error: `Rate limit reached. This is a public demo on a shared key — try again in ${rl.retryAfter}s.` },
      429,
      { "Retry-After": String(rl.retryAfter) }
    );
  }

  let body: { messages: ClientMessage[]; angle?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  let messages = body.messages?.filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (!messages || messages.length === 0) {
    return json({ error: "No messages provided" }, 400);
  }

  // Enforce input caps (depth + length).
  if (messages.length > MAX_MESSAGES) {
    messages = messages.slice(-MAX_MESSAGES);
  }
  let totalChars = 0;
  for (const m of messages) {
    if (m.content.length > MAX_CHARS_PER_MSG) {
      m.content = m.content.slice(0, MAX_CHARS_PER_MSG);
    }
    totalChars += m.content.length;
  }
  if (totalChars > MAX_TOTAL_CHARS) {
    return json(
      { error: "Conversation is too long for this demo. Start a fresh session." },
      413
    );
  }

  const angle = parseAngle(body.angle);
  const systemPrompt = await loadResearcherSystemPrompt(angle);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.create({
          model: MODEL,
          max_tokens: MAX_TOKENS[angle],
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`\n\n[researcher error: ${msg}]\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
      "X-Research-Angle": angle,
    },
  });
}
