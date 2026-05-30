# Deploying Catalyst

Catalyst is the **visual surface** for the Fleet Deal Researcher. The researcher itself is the
markdown folder one level up (`../CLAUDE.md`, `../identity.md`, `../rules.md`, `../reference/`).
This app reads those files **at request time** and feeds them to Claude as the system prompt — so
the app is never out of sync with the folder. Edit a rule in `../rules.md`, redeploy, and the
behavior changes. **The folder is the agent; this is just a surface.**

---

## Run it locally

```bash
cd playroom
npm install
cp .env.local.example .env.local      # then paste your Anthropic key into .env.local
npm run dev                            # http://localhost:3000
```

You need an Anthropic API key from https://console.anthropic.com/. It is read **server-side only**
(in the API route) and is never exposed to the browser.

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** the repo.
3. **Root Directory:** set it to `playroom` (the app is not at repo root — the researcher folder is).
4. Framework preset auto-detects **Next.js**. Leave build/install commands as-is.
5. **Environment Variables** → add `ANTHROPIC_API_KEY`. (Optional: `ANTHROPIC_MODEL`,
   `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`.)
6. Deploy.

> The app reads `../CLAUDE.md` etc. with `process.cwd()/..`. Because the Root Directory is
> `playroom`, the build includes the sibling researcher files — they ship with the deployment.

CLI alternative:

```bash
cd playroom
vercel            # first run links the project
vercel --prod     # production deploy
# set the key once:
vercel env add ANTHROPIC_API_KEY
```

---

## The guardrails (why this is safe to make public)

The key is shared across everyone who hits the public URL, so cost is controlled at every layer:

| Guardrail | Where | Default |
|-----------|-------|---------|
| **Server-side key only** | `src/app/api/research/route.ts` | never sent to the client |
| **Low-cost model** | `MODEL` | `claude-3-5-haiku-latest` (override with `ANTHROPIC_MODEL`) |
| **Per-angle output cap** | `MAX_TOKENS` | 600 (call-prep) → 2000 (rank) |
| **Per-IP rate limit** | in-memory token bucket | 12 req / 60s (`RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`) |
| **Input caps** | message count / length / total | 24 msgs · 4k chars/msg · 16k total |
| **Prompt caching** | `cache_control: ephemeral` on the system prompt | constitution cached between turns |

For a sharper private instance: set `ANTHROPIC_MODEL=claude-sonnet-4-5`, raise the token caps, and
loosen the rate limit.

---

## What's where

```
playroom/
├── src/app/page.tsx              ← the animated 60s demo
├── src/app/try/page.tsx          ← the workspace (Duel · Research · Rank)
├── src/app/api/research/route.ts ← the secure streaming route + guardrails
├── src/lib/researcher-context.ts ← reads ../ folder → system prompt (angle-aware)
├── src/lib/brand.ts              ← all product naming + tiers + angles (rename = one edit)
└── src/components/               ← LiveDuel · Chat · ListRanker · Markdown · TierLegend
```
