# The Fleet Deal Researcher

> **For founders and sales leads selling a safety, retention, or driver-appreciation program into enterprise trucking fleets.**
>
> It doesn't hand you a company profile. It builds a **falsifiable theory of why a specific fleet buys *now*** — names who actually signs, weighs the notoriously unreliable sources in this industry, tells you the three findings that would prove the theory wrong, and ends with the one question that decides the deal.

**No dossier. A thesis you can kill.**

Not a database. Not a CRM enrichment tool. Not a profile generator. A researcher.

---

## The problem this solves

You have a target list of trucking fleets and not enough hours. If you chase a 2,000-truck carrier for three months and discover there was never a reason for them to buy, that quarter is gone.

Generic AI makes this worse, not better: ask it about a fleet and it returns a confident, tidy profile — half of it guessed, none of it dated, and a "why they're a good fit" paragraph that's true of literally every fleet. You leave with more facts and no more clarity about where to spend your week.

This researcher does the opposite. It refuses to profile. It hunts the *catalyst* — the recent change that makes now different from six months ago — and if there isn't one, it tells you to deprioritize. It treats trucking data as perishable (because it is), labels every guess as a guess, and leads with what it *doesn't* know.

---

## See the difference in 30 seconds

**You say:** *"Research Continental Tank Lines — ~1,800-truck hazmat carrier, I want to sell them a safety + retention program."*

**A generic AI gives you:**
> Continental Tank Lines is a bulk-liquid carrier (~1,800 units, est. $400–500M revenue, HQ Houston). Elevated CSA scores suggest room for improvement, making them an excellent candidate for a safety program. Want me to draft an outreach email?

A profile. Guessed numbers, no dates, a horoscope conclusion.

**This researcher gives you:**
> Before I build anything — three questions, because the research is different for each: (1) what's the angle — open, qualify, or call-prep? (2) what do you already believe about them, so I can confirm or *disconfirm* it? (3) what have you already looked at? …and one flag: "elevated CSA scores" — where's that from? CSA scores recompute monthly. If it's >30 days old I'm re-pulling it before either of us treats it as real.

A gate. An angle. Source skepticism on turn one. (Full worked example: `anti-examples.md`.)

---

## What you get

Once you give it the angle, it returns a **Deal Thesis**:

1. **The claim** — one sentence: buy-now / qualify-up / deprioritize, and why.
2. **The catalyst** — the dated, sourced event creating urgency (or an honest "there isn't one").
3. **The signer** — the role that signs, confidence-labeled, never an invented name.
4. **The ledger** — Known / Inferred / Unknown, kept strictly separate.
5. **Three findings that would kill the thesis** — the disconfirming evidence. *This is the part no summarizer gives you.*
6. **The next question** — the single highest-leverage thing to learn, and how.

---

## How to use it

**The researcher IS this folder.** Same brain, two surfaces — use whichever fits.

**Surface 1 — drop the folder into Claude (zero install):**

1. Create a new Claude Project at https://claude.ai/projects
2. Upload this entire folder as Project Knowledge.
3. Start with: *"Read CLAUDE.md, then identity.md and rules.md. I'm researching a fleet."*
4. Name your fleet. **Expect three questions back, not a profile.** Answer them. Then you get the thesis.

This surface needs no app and no API key — drop it in anything that can read files and navigate folders.

**Surface 2 — Catalyst, the deployed web app (`playroom/`):**

A Next.js app that reads *these same markdown files at request time* and drives a live research
session via Claude. It adds an animated walkthrough, a **Live Duel** (generic AI vs the researcher,
same fleet, side by side), an angle-gate chat with source-tier badges, and a target-list ranker.
The app is a thin surface — all the behavior still lives in the markdown here. See
[`playroom/DEPLOY.md`](playroom/DEPLOY.md) to run or deploy it.

> Why both? The folder proves the methodology travels anywhere with no infrastructure. The app
> proves it's a usable product. **Edit a rule in `rules.md` and *both* surfaces change** — because
> the app never hard-codes the researcher; it reads the folder.

---

## Folder map

```
fleet-deal-researcher/
├── CLAUDE.md          ← Orientation + routing. Read first.
├── identity.md        ← Who the researcher is. Manifesto + productionized opinion on sources.
├── rules.md           ← The Deal Thesis Protocol. The operating constitution. (Start here to judge it.)
├── examples.md        ← 8 annotated dialogues (incl. a full thesis + a thesis that dies).
├── anti-examples.md   ← Side-by-side: summarizer vs researcher.
├── working-theory.md  ← Live scaffold. The researcher updates it per fleet as it learns.
│
├── reference/         ← The knowledge library. Pulled as needed, not preloaded. (See reference/INDEX.md.)
│   │  ── credibility (trust calibration) ──
│   ├── source-tiers.md          ← 4-tier credibility ladder (the domain edge)
│   ├── data-sources.md          ← the pull-map: fact → source → tier → half-life
│   ├── fmcsa-csa-explained.md   ← deep SAFER/SMS/L&I mechanics, the 7 BASICs, rating-vs-score
│   │  ── domain knowledge ──
│   ├── catalyst-library.md      ← 4 buy-catalyst families + how to detect each
│   ├── incident-research.md     ← post-incident catalyst playbook (case vs. the number)
│   ├── segment-playbooks.md     ← how each segment buys (dry van/reefer/tanker/LTL/drayage…)
│   ├── decision-maker-map.md    ← who signs + ownership-structure variations
│   ├── objection-handling.md    ← objections the operator will hit + grounded counters
│   ├── glossary.md              ← trucking vocabulary
│   │  ── process (the spine) ──
│   ├── the-three-questions.md   ← the opening gate
│   ├── deal-thesis-template.md  ← the output shape (+ call-prep variant)
│   ├── target-scoring.md        ← catalyst-weighted ranking of a target list
│   └── INDEX.md                 ← the library index + dependency spine
│
├── tests/
│   └── test-prompts.md          ← Drop the folder in, run these, check the behavior.
│
├── sessions/
│   └── README.md                ← How longitudinal memory works.
│
└── playroom/                    ← Catalyst — the deployed web app surface (see playroom/DEPLOY.md)
    ├── src/app/page.tsx           ← animated 60s walkthrough
    ├── src/app/try/              ← the workspace: Live Duel · Research chat · List ranker
    ├── src/app/api/research/     ← secure streaming route (server-side key, Haiku, rate-limited)
    └── src/lib/researcher-context.ts ← reads the markdown above → system prompt at request time
```

**Each file does exactly one job.** The reference library is deep but loads only on demand — the researcher pulls the one file a moment calls for and keeps its context clean. Nothing exists "just in case."

---

## Test it yourself

`tests/test-prompts.md` has specific prompts with expected behaviors. The fastest one:

- Type *"Give me everything on [any fleet]."* → It should **refuse to profile** and ask for your angle. If it hands you a company overview, it's broken — reset the project.

---

## Why the structure looks this way

Built on **Interpretable Context Methodology** (Van Clief & McDermott, 2026). The folder isn't decoration — the folder *is* the researcher's architecture. Each file does one job, routing is explicit, reference material loads only when needed. No vector store, no RAG, no orchestration framework. Just folders and markdown that any capable agent can navigate.

The deeper principle it's built on: *in a world full of answers, the scarce thing is the right question.* This researcher's entire arc is question → investigation → a sharper question.

---

## Scope & honesty

- Built specifically for **trucking-fleet** B2B deal research. The source tiers and catalyst families are domain-tuned; point it at a different industry and it'll tell you its instruments don't calibrate there.
- It will tell you when an account is **not** worth your time. That's a feature. It is not built to make every fleet look promising.
- It never presents a guess as a fact. Inferred contacts, volatile scores, and contested figures are always labeled.

## License

MIT. Fork it, point it at your vertical, change the source tiers and catalyst families to fit. If you ship one, link back.

---

## Submission

Built for **Weekly Comp #6 — The Researcher** in the Cleaf Notes / EDUBA community.

> The Fleet Deal Researcher — for founders selling safety/retention programs into enterprise trucking fleets. Instead of a company profile, it builds a falsifiable theory of why a specific fleet buys now, weighs this industry's unreliable sources (volatile CSA scores, inflated verdict figures, stale contact lists), names who signs, and ends with the one question that decides the deal. Most useful for deciding which fleets on your list deserve this quarter's attention — and which to drop.
