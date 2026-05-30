"use client";

import { useState } from "react";
import { DUEL_SCENARIOS, type DuelScenario, type GenericSegment } from "@/lib/duel-scenarios";
import { useResearchStream } from "@/lib/useResearchStream";
import { Markdown } from "./Markdown";

/**
 * The Live Duel — the centerpiece. Same fleet, two minds:
 *   LEFT  = generic AI (canned tidy profile, flaws marked) — $0, instant.
 *   RIGHT = the researcher (real, streamed from the folder).
 * The contrast is the pitch.
 */
export function LiveDuel() {
  const [scenario, setScenario] = useState<DuelScenario>(DUEL_SCENARIOS[0]);
  const [showGeneric, setShowGeneric] = useState(false);
  const { messages, isStreaming, error, send, reset } = useResearchStream();

  const researcherMsg = messages.find((m) => m.role === "assistant");
  const ran = messages.length > 0;

  function run() {
    if (isStreaming) return;
    reset();
    setShowGeneric(true);
    // Generic "appears" instantly; researcher streams.
    send(scenario.prompt, "duel", []);
  }

  function pick(s: DuelScenario) {
    if (isStreaming) return;
    setScenario(s);
    setShowGeneric(false);
    reset();
  }

  return (
    <div className="space-y-4">
      {/* Scenario picker */}
      <div className="panel p-3">
        <div className="text-[0.65rem] uppercase tracking-[0.2em] font-mono font-bold text-steel-muted mb-2">
          Pick a fleet — then run both at once
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          {DUEL_SCENARIOS.map((s) => {
            const on = s.id === scenario.id;
            return (
              <button
                key={s.id}
                onClick={() => pick(s)}
                disabled={isStreaming}
                className="text-left px-3 py-2 rounded-md border-3 transition-all disabled:opacity-50"
                style={{
                  borderColor: on ? "#F2A30F" : "#D3DBE3",
                  background: on ? "#FCE8C4" : "#fff",
                  boxShadow: on ? "2px 2px 0 0 #C97E08" : "none",
                }}
              >
                <div className="font-display font-bold text-steel-ink text-sm leading-tight">
                  {s.fleet}
                </div>
                <div className="text-[0.68rem] text-steel-muted leading-snug mt-0.5">
                  {s.segment}
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={run} disabled={isStreaming} className="btn-amber disabled:opacity-40">
            {isStreaming ? "Researching···" : ran ? "↻ Run again" : "⚡ Run the duel"}
          </button>
          <span className="text-xs text-steel-muted font-mono">
            Same prompt. Same fleet. Watch what each one does with it.
          </span>
        </div>
      </div>

      {/* The two columns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Generic */}
        <div
          className="rounded-lg border-3 overflow-hidden"
          style={{ borderColor: "#8194A8", boxShadow: "4px 4px 0 0 #8194A8" }}
        >
          <div className="px-4 py-2.5 bg-canvas-line/50 border-b-3 flex items-center justify-between" style={{ borderColor: "#8194A8" }}>
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-steel-muted">
              🤖 Generic AI
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-steel-soft">
              Confident · instant · guessed
            </span>
          </div>
          <div className="p-4 min-h-[260px]">
            {showGeneric ? (
              <div className="space-y-3">
                <GenericProfile segments={scenario.generic} />
                <div className="border-t-2 border-canvas-line pt-2 mt-2 space-y-1">
                  <FlawTag color="#D14A28" label="Guessed — no source, no date" />
                  <FlawTag color="#C8860D" label="Undated — CSA scores recompute monthly" />
                  <FlawTag color="#8194A8" label="Horoscope — true of literally every fleet" />
                </div>
              </div>
            ) : (
              <Placeholder text="A tidy company profile. Half guessed, none dated, a 'good fit' line that fits everyone." />
            )}
          </div>
        </div>

        {/* Researcher */}
        <div
          className="rounded-lg border-3 overflow-hidden"
          style={{ borderColor: "#F2A30F", boxShadow: "4px 4px 0 0 #C97E08" }}
        >
          <div className="px-4 py-2.5 bg-amber-soft border-b-3 flex items-center justify-between" style={{ borderColor: "#F2A30F" }}>
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-deep">
              ⚡ Catalyst — the Researcher
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-amber-deep">
              Tiered · dated · falsifiable
            </span>
          </div>
          <div className="p-4 min-h-[260px]">
            {!ran ? (
              <Placeholder text="A gate, an angle, a catalyst hunt, tiered sources, and three findings that would kill the deal. Hit run." />
            ) : (
              <>
                {researcherMsg && <Markdown text={researcherMsg.content} />}
                {isStreaming && (!researcherMsg || researcherMsg.content.length === 0) && (
                  <span className="inline-flex gap-1 text-amber-deep">
                    <span className="typing-dot">·</span>
                    <span className="typing-dot">·</span>
                    <span className="typing-dot">·</span>
                  </span>
                )}
                {error && (
                  <div className="text-sm font-mono text-signal-kill mt-2">{error}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericProfile({ segments }: { segments: GenericSegment[] }) {
  return (
    <p className="text-sm leading-relaxed text-steel-ink/80">
      {segments.map((s, i) => {
        if (!s.flaw) return <span key={i}>{s.text}</span>;
        const color =
          s.flaw === "guess" ? "#D14A28" : s.flaw === "undated" ? "#C8860D" : "#8194A8";
        return (
          <span
            key={i}
            className="rounded px-0.5"
            style={{
              background: `${color}1A`,
              borderBottom: `2px ${s.flaw === "horoscope" ? "dashed" : "solid"} ${color}`,
            }}
          >
            {s.text}
          </span>
        );
      })}
    </p>
  );
}

function FlawTag({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[0.7rem] font-mono">
      <span className="inline-block w-3 h-3 rounded-sm" style={{ background: `${color}33`, border: `2px solid ${color}` }} />
      <span style={{ color }}>{label}</span>
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="h-full flex items-center justify-center text-center min-h-[220px]">
      <p className="text-sm text-steel-soft max-w-xs leading-relaxed italic">{text}</p>
    </div>
  );
}
