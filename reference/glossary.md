# reference/glossary.md — Trucking Domain Vocabulary

*So the researcher speaks the language, decodes operator shorthand correctly, and never mistakes one instrument for another. When an operator says "their CSA is bad" or "they're a conditional carrier," this file is how the researcher knows exactly what was claimed — and what tier it earns.*

Terms are grouped by what they're used for. Source-tier notes are included where the term names a piece of data the researcher weighs.

---

## Regulatory & safety data (the FMCSA stack)

- **FMCSA** — Federal Motor Carrier Safety Administration. The federal regulator for interstate trucking.
- **USDOT number** — the carrier's federal registration ID. Durable identity (T1).
- **MC / MX / FF number** — operating-authority number(s). Tied to authority status in L&I.
- **SAFER** — Safety and Fitness Electronic Records. The public **company snapshot** (size, type, rating, crash/inspection summary). Mostly T1. See `fmcsa-csa-explained.md`.
- **SMS** — Safety Measurement System. The engine that computes the BASIC scores. **T2, recomputes monthly.**
- **CSA** — Compliance, Safety, Accountability. FMCSA's enforcement program; "CSA score" colloquially means an SMS BASIC percentile.
- **BASIC** — Behavior Analysis and Safety Improvement Category. The 7 scored categories: Unsafe Driving, Crash Indicator, HOS Compliance, Vehicle Maintenance, Controlled Substances/Alcohol, HazMat Compliance, Driver Fitness.
- **Safety Rating** — Satisfactory / Conditional / Unsatisfactory / Unrated. From a **compliance review** (audit), not the monthly scores. T1 but **slow/lagging**. *Not the same as a CSA score* — see `fmcsa-csa-explained.md`.
- **Conditional rating** — a formal "needs improvement" finding from a review. A stronger, harder catalyst than a BASIC blip.
- **Intervention threshold** — the percentile at which FMCSA prioritizes a carrier for action. Lower (stricter) for passenger/hazmat carriers.
- **L&I** — Licensing & Insurance system. Authority + insurance filings. An insurance lapse here is a live catalyst.
- **MCS-150** — the form carriers file (at least every 2 years) reporting fleet size/operation. **SAFER counts are only as fresh as the last MCS-150** — can be ~2 yrs stale.
- **MCS-90 / BMC-91** — insurance/surety filing forms visible in L&I.
- **DataQs** — the system for challenging FMCSA data (Requests for Data Review). Aggressive use can make a carrier's SMS record cleaner than reality.
- **Compliance review / audit** — FMCSA's on-site or off-site examination that sets the safety rating.

## Operations & hours

- **ELD** — Electronic Logging Device. Federally mandated; records driving hours, enforces HOS.
- **HOS** — Hours of Service. Federal limits on driving/on-duty time.
- **OTR** — Over-the-Road. Long-haul, multi-day, away-from-home driving. **Highest turnover** profile.
- **Regional / Dedicated** — shorter lanes, more home time; **lower turnover** than OTR.
- **Drayage** — short-haul port/rail container moves. Owner-operator heavy.
- **Deadhead** — running empty (no revenue load). An efficiency/cost term.

## Segments (what they haul)

- **Dry van** — enclosed trailer, general freight. The volume default.
- **Reefer** — refrigerated trailer; temperature-controlled freight.
- **Tanker / bulk** — liquids/gases/dry bulk. Often hazmat.
- **Hazmat / HM** — hazardous materials. Stricter CSA thresholds, higher liability.
- **Flatbed / open-deck** — uncovered loads; securement and injury risk.
- **LTL** — Less-Than-Truckload. Terminal networks, shared trailers, **high union exposure**.
- **TL / truckload** — full-trailer single-shipper loads.
- **Intermodal** — freight moving by more than one mode (rail + truck).
- **Final-mile / last-mile** — delivery to the end customer; gig-adjacent, high churn.

## Liability & insurance

- **Nuclear verdict** — a jury award generally over **$10M**. A major driver of insurance cost and board-level safety urgency.
- **Hard market** — an insurance-market phase of rising premiums / tighter capacity. Renewal-driven catalyst.
- **Non-renewal** — insurer declines to renew coverage. A hard, dated, regulatory/insurance catalyst.
- **Reptile theory** — a plaintiff-bar trial strategy that inflates verdicts by framing safety as public danger. Context for why verdict figures balloon — and why the *number* is T3.

## People & buying roles (see `decision-maker-map.md`)

- **CSO / VP Safety** — Chief Safety Officer / VP of Safety. Usual **primary signer**.
- **VP Operations** — driver availability, downtime. Influencer/co-signer.
- **CHRO / VP People** — owns retention metrics. Influencer; rarely sole budget.
- **CFO** — gatekeeper when spend ties to insurance/verdict exposure.
- **Owner-operator (O/O)** — independent contractor driver who owns their truck. A high O/O share complicates a W-2 retention pitch.

## Sales / research terms (this tool's own vocabulary)

- **Catalyst** — the dated, specific recent change that makes a fleet buy *now*. The core unit of the thesis. See `catalyst-library.md`.
- **Signer** — the role/person with authority to approve the purchase.
- **Ledger** — the Known / Inferred / Unknown breakdown carried in every thesis.
- **Kill-condition** — a finding that, if true, would end the thesis. Mandatory in every thesis.
- **The angle** — open / qualify / call-prep / walk. Set at the No-Dossier Gate before any research.
- **Tier (T1–T4)** — the source-credibility ladder: Hard / Decaying / Contested / Inferred. See `source-tiers.md`.

---

## Why the glossary is a research tool, not a footnote

Two reasons it earns a file:
1. **Decoding the operator.** When they say "their CSA is in the red" or "they're conditional," the researcher must translate that to the right instrument and the right tier — not nod along. Half of source discipline is knowing *which thing* was just claimed.
2. **Speaking credibly.** A researcher that calls a "reefer" a "fridge truck" or treats a safety rating like a CSA score outs itself as a generalist. Fluency is part of the domain edge.
