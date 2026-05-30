# reference/source-tiers.md — The Credibility Ladder

The researcher's domain edge. Trucking-fleet intelligence is full of sources that *look* authoritative and decay fast or are simply wrong. Every fact you state gets a silent tier. Anything below Tier 1 gets flagged out loud.

---

## The four tiers

### Tier 1 — Hard
Facts that are durable and verifiable.
- SEC filings, court dockets (PACER), state incorporation records
- **FMCSA SAFER** carrier registration: legal name, USDOT#, power-unit count, driver count, cargo/operation type
- Company press releases and the fleet's own corporate site (for *factual* claims, not marketing claims)
- Confirmed, dated executive announcements

**Treatment:** state plainly. Still date-stamp — even hard facts go stale (a fleet sells a division, a count changes).

### Tier 2 — Decaying
Real data with a short half-life.
- **FMCSA BASIC / CSA scores** (Unsafe Driving, HOS, Vehicle Maintenance, Controlled Substances, HazMat, Driver Fitness, Crash Indicator)
- Crash and inspection counts from SAFER's snapshot
- Insurance filing status (MCS-90, BMC forms)

**Treatment:** **always date-stamp and flag as volatile.** BASIC scores recompute roughly monthly as new inspections roll in and old ones age off. The phrase to use: *"as of [date] — re-check before the call."* Never quote a tier or score as if it's permanent.

### Tier 3 — Contested
Plausible but unverified, often wrong.
- **Plaintiff-verdict and settlement dollar figures** (chronically inflated in trade press; reduced on appeal)
- News reports of incidents (right that it happened, often wrong on detail/magnitude)
- Third-party "estimated revenue," analyst guesses, market-share claims

**Treatment:** **never cite a specific number on a single source.** Require two independent confirmations; prefer a primary source (docket) over a news rewrite. If two sources conflict, **cite neither** and state the conflict. You can still use the *existence* of an event (e.g., "a wrongful-death case exists") even when the *magnitude* is unverified — separate the signal from the number.

### Tier 4 — Inferred
Your own reasoning, not external fact.
- Email addresses guessed from a naming pattern
- Org charts reconstructed from LinkedIn
- "Probably the decision-maker," "likely facing turnover pressure"

**Treatment:** **label every inference as an inference, every time.** Inferred emails are written `name@fleet.com (pattern — verify via Hunter.io/Apollo/RocketReach)`. An inference presented as a fact is the single worst thing this researcher can do — it destroys the operator's credibility on a first touch and yours with them.

---

## The hard rule

**If you cannot assign a tier to a claim, you do not make the claim.** "I don't have a credible source for that yet" is a complete, correct, respectable answer. Silence beats a confident guess.

---

## Domain-specific source notes (productionized opinion)

- **SAFER counts are gold; the marketing around them is noise.** Power-unit/driver counts: trust. "Award-winning safety culture": ignore.
- **A new executive <12 months in seat is the strongest soft signal** — weight it, and say you're weighting it.
- **Data-vendor contact lists are stale on arrival.** Every contact is a hypothesis to verify, never a roster to act on.
- **BASIC scores are a direction, not a quote.** Use them to sense pressure; don't read tiers aloud to a prospect unless re-pulled that day.
- **The case-vs-the-number distinction is load-bearing.** Real lesson from the field: an internal doc cited a $16.5M verdict; later research said ~$40M. Correct move was to cite *neither* and treat the *case* as the catalyst. When numbers fight, the number loses; the event survives.

---

## Where the deeper mechanics live

This file is the *credibility* layer — how much to trust a tier. Two companion files carry the operational depth:

- **`fmcsa-csa-explained.md`** — what the FMCSA data actually *is* (SAFER vs SMS vs L&I, the 7 BASICs, why a BASIC is T2, why a freight carrier's percentile may not even be public, rating-vs-score). Read this to understand *why* CSA scores sit at Tier 2.
- **`data-sources.md`** — the pull-map: for any fact, *where* it lives and *how fast it rots*. Read this to know which source a claim came from before you tier it.

A claim's tier is downstream of its source. If you can't name the source (from `data-sources.md`), you can't honestly assign the tier — and per the hard rule above, you don't make the claim.
