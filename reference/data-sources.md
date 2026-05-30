# reference/data-sources.md — The Research Recipe Book

*Pulled as needed. This is the operational backbone: for any fact the researcher needs, **where it lives, what tier it earns, and how fast it rots.** Pair this with `source-tiers.md` (how much to trust a tier) and `fmcsa-csa-explained.md` (what the FMCSA data actually means).*

The discipline: **you never state a fact without knowing which of these sources it came from.** If a claim can't be traced to a row in the table below, it's Tier-4 inference at best — label it.

---

## The pull-map (fact → source → tier → freshness)

| Fact you need | Primary source | Tier | Half-life / freshness rule |
|---------------|----------------|------|----------------------------|
| Legal name, USDOT#, MC/MX# | FMCSA **SAFER** company snapshot; state SOS | T1 | Durable. Re-check only on M&A. |
| Power-unit count, driver count | SAFER snapshot (from carrier's **MCS-150**) | T1, **with a caveat** | Only as fresh as the **last MCS-150 update** (filed at least every 2 years — can be ~24 mo stale). Date it. |
| Operation type, cargo carried | SAFER snapshot | T1 | Durable; changes on business-model shift. |
| Operating authority status (active/revoked) | FMCSA **L&I** (Licensing & Insurance) | T1 | Re-check — authority can be revoked fast on insurance lapse. |
| Insurance on file / lapse / non-renewal | FMCSA **L&I** (BMC-91, MCS-90 filings) | T1 for *existence*, T2 for *currency* | A lapse filing is a live **regulatory/insurance catalyst** signal. Date it. |
| Safety rating (Satisfactory/Conditional/Unsatisfactory) | SAFER snapshot | T1 | Durable but lags reality — set at last compliance review, not continuous. |
| CSA **BASIC** scores / percentiles | FMCSA **SMS** (Safety Measurement System) | **T2 — decaying** | **Recompute ~monthly.** Never quote without "as of [date], re-check." Property-carrier percentiles are restricted on the public site — see `fmcsa-csa-explained.md`. |
| Crash count, inspection count, violation history | SMS / SAFER snapshot | T2 | Rolling 24-month window; recent events weighted heavier. Date it. |
| Whether a crash was *their* fault / preventable | **Not in FMCSA data** — crash counts are not fault-adjudicated | T3/T4 | Do not infer fault from a raw crash count. Flag this explicitly. |
| Litigation: case exists, docket, filings | **PACER** (federal), state court portals | T1 for *existence* | The case is hard data; the **verdict dollar figure is T3** — see below. |
| Verdict / settlement dollar amount | Trade press, plaintiff-firm PR, jury-verdict reporters | **T3 — contested** | Chronically inflated; reduced on appeal. **Two independent sources or cite neither.** Prefer the docket. |
| Ownership / PE sponsor / acquisition | Press releases, PE firm portfolio pages, SEC (if public) | T1–T2 | Durable once confirmed; the *exit-timeline inference* is T4. |
| New executive in seat (CEO/CFO/CPO/VP-Safety/CHRO) | Company press release, LinkedIn, trade press | T1 if announced, **T4 if only inferred from LinkedIn** | Tenure (<12 mo) is the strongest soft signal — but "started date" off LinkedIn is **inferred**; label it. People also leave silently. |
| Decision-maker **name** | LinkedIn, company site, SAFER contact field | T4 until verified | A scraped name is a hypothesis. Verify before it's "the buyer." |
| Decision-maker **email** | Hunter.io / Apollo / RocketReach / pattern guess | **T4 — inferred** | Always written `name@fleet.com (pattern — verify)`. Never present as fact. |
| Turnover / driver-churn figure | Earnings calls (public), trade surveys, ATA data, direct disclosure | T2–T3 | Company-specific is rare; **industry averages are not a substitute** — flag when you're using a proxy. |
| Union presence (Teamsters, etc.) | NLRB filings, news, the union's own site | T1–T2 | Durable; a *settled* labor action is a spent catalyst — check status. |
| Revenue / financials | SEC 10-K (public only), trade estimates | T1 if public, **T3 if "estimated"** | Most target fleets are private — revenue is usually a T3 estimate. Say so. |
| Telematics/ELD vendor in use | Case studies, press, job postings, LinkedIn | T3–T4 | Useful for the "we already have a vendor" objection; usually inferred. |

---

## The three FMCSA systems — don't confuse them

Operators (and generalist AIs) blur these. The researcher keeps them separate because they answer different questions and decay at different rates. (Full mechanics: `fmcsa-csa-explained.md`.)

- **SAFER** (Safety and Fitness Electronic Records) — the public **company snapshot**: identity, fleet size, operation type, safety rating, inspection/crash summary. Mostly T1, sourced from the carrier's own MCS-150.
- **SMS** (Safety Measurement System) — the **scoring engine**: the 7 BASICs and percentile rankings. T2, recomputes monthly. This is the volatile one.
- **L&I** (Licensing & Insurance) — **authority and insurance** status. T1 for existence; an insurance lapse here is a live catalyst.

If an operator says "their CSA scores," they mean **SMS**. If they say "their safety rating," they mean the **SAFER** rating (a different, slower thing). Don't let the two get conflated — see the rating-vs-score distinction in `fmcsa-csa-explained.md`.

---

## Free vs paid — and what each is good for

- **Free (FMCSA SAFER/SMS/L&I, PACER pay-per-page, state SOS, LinkedIn basic):** enough to build a thesis. The catalyst hunt and the source-tiering run almost entirely on free public data.
- **Paid (Hunter/Apollo/RocketReach for contact verification, Carrier411/RMIS for monitoring, full PACER, data-vendor lists):** speeds up the *contact-closing* step. Never required to decide whether a fleet is worth chasing — that decision is a catalyst call, and the catalyst is usually public.

**Productionized opinion:** spend money on **verifying the contact**, not on **buying the profile**. A profile is a summary; the scarce thing is the dated catalyst and the confirmed signer.

---

## Freshness protocol (the half-life rule, operationalized)

Before any fact goes into a thesis or a call-prep, ask: **when was this true, and could it have moved?**

- **Volatile (re-pull same-day before a call):** CSA/BASIC scores, authority status, insurance currency, who's-in-the-seat.
- **Slow (re-check at session start if the log is >2 weeks old):** fleet size (MCS-150 cadence), safety rating, ownership.
- **Durable (trust unless an event changed it):** legal name, USDOT#, segment, the *existence* of a past lawsuit.

A session log (`sessions/`) is itself a decaying source — treat your own prior notes as **T2** and re-verify anything volatile rather than trusting the stale entry.

---

## The honest limits of public data

State these out loud when they bite — pretending the data is cleaner than it is, is the summarizer's sin:

1. **Crash counts are not fault-adjudicated.** A high crash count ≠ an at-fault fleet. FMCSA's Crash Indicator BASIC has been contested for exactly this reason.
2. **MCS-150 data can be two years stale.** A "1,200-truck" fleet may have grown or shrunk since the last filing.
3. **Property-carrier BASIC percentiles are restricted on the public SMS site** (post-FAST Act, pending methodology review). You may see raw measures and alerts but not always a clean public percentile — verify what's currently visible rather than asserting a number.
4. **Contact data is stale on arrival.** Every name and email is a hypothesis until verified.
5. **Methodology changes.** FMCSA has proposed and revised SMS methodology repeatedly. Treat specific thresholds in this folder as *direction*, and verify the current rule before quoting a number to a prospect.
