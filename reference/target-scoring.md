# reference/target-scoring.md — Ranking a Target List (Qualify Mode)

*When the operator hands over a list — "here are 30 fleets, where do I spend this quarter?" — this is how the researcher ranks them. It is deliberately **catalyst-weighted, not size-weighted**, and it produces a **priority tier with a reason**, never a false-precision decimal score that launders guesses into math.*

> **Why not a 0–100 score?** A single number hides the tiering. A fleet that looks like an "82" on size and segment but has **no catalyst** is a cold lead, and a crisp number would bury that. The researcher ranks into **bands with a one-line reason**, so the operator sees *why* — and can challenge it.

---

## The five factors (in priority order)

The order is the point. Catalyst dominates; size is the weakest and comes last.

1. **Catalyst — present, dated, window open?** *(decisive)*
   - This is the gate. **No catalyst → cannot rank above "cold," regardless of every other factor.** A live, recent, in-window catalyst is the single thing that moves a fleet to the top.
   - Stacked catalysts (e.g., spill + insurance renewal) outrank single ones.

2. **Segment fit / nerve match** *(strong)*
   - Does the operator's program hit this segment's dominant nerve (see `segment-playbooks.md`)? An OTR fleet with a turnover catalyst is a clean fit; a drayage fleet that's 70% owner-operator is a structural misfit even with a catalyst.

3. **Signer accessibility** *(moderate)*
   - Can the actual signer be identified and reached? A single-signer family fleet with a known VP Safety is faster than a PE-owned fleet with a diffuse committee and an unknown name. (See `decision-maker-map.md`.)

4. **Source confidence** *(moderate, modifies the others)*
   - How much of the above rests on T1–T2 vs T3–T4? A catalyst confirmed on a court docket beats one inferred from a single news rewrite. **Low confidence caps the band** — you don't rank a fleet "hot" on a rumor.

5. **Size band** *(weakest)*
   - Within the operator's ICP (~500–3,000 power units), bigger ≠ better. Size only breaks ties between fleets that are otherwise equal on 1–4. **Listing size first is the summarizer's instinct; here it's the tiebreaker.**

---

## The output: priority bands

| Band | Definition | Recommended action |
|------|------------|--------------------|
| **HOT** | Live, dated, in-window catalyst (T1–T2) + segment fit + reachable signer | Chase this week. Build the full thesis. |
| **WARM** | Catalyst present but aging/closing, OR strong fit with a catalyst confirmed only at T3 | Verify the soft spot first (re-pull the score, confirm the exec), then commit. |
| **WATCH** | No live catalyst yet, but a plausible trigger is foreseeable (PE mid-hold, exec recently in seat, renewal months out) | Set a recheck date. Don't spend the quarter; don't drop it. |
| **COLD** | No catalyst, or a structural misfit (segment, owner-operator share), or it rests entirely on size | **Deprioritize and say so.** Protecting the operator's time is the deliverable. |

Each ranked fleet gets **one line**: band + the deciding reason + the biggest unknown.
Example: *"Midwest Bulk — **WARM**: Conditional rating (T1, dated) is a real regulatory catalyst, but the signer is unknown; close the name before committing."*

---

## Worked mini-example (a 5-fleet list)

> *"Apex Tank — **HOT**: spill 6 weeks ago (T1 docket) + hard-market renewal in Q3 → stacked catalyst, CFO+CSO in the room. Build the thesis."*
> *"Granite Logistics — **WARM**: Unsafe-Driving BASIC drifting toward threshold (T2, as of last month — re-pull) and a VP Safety ~7 mo in seat (T4, verify). Confirm both, then chase."*
> *"Hartline Freight — **WATCH**: 1,200 reefer, stable leadership, no incident. No catalyst yet; recheck in 90 days. Size is not a reason."*
> *"Coastal Drayage — **COLD**: catalyst exists (turnover) but ~65% owner-operator → structural misfit for a W-2 retention program. Deprioritize unless the program fits 1099s."*
> *"National Van Lines — **COLD**: nothing but size (2,800 trucks). No catalyst, stable. Big is not warm."*

Notice: the **biggest fleet ranks last**, and a fleet with a catalyst but a structural misfit is honestly killed. That ordering is the whole philosophy.

---

## Rules of the ranking

1. **Catalyst is a gate, not a weight.** No catalyst caps you at WATCH/COLD no matter how attractive the other factors.
2. **Never emit false precision.** Bands with reasons, not decimals. If the operator wants a number, give the band and explain why a decimal would lie.
3. **Confidence caps the band.** A HOT requires T1–T2 evidence for its catalyst. Rumor-grade evidence cannot produce a HOT.
4. **A COLD verdict is a finding, not a failure.** The most valuable output of a list-rank is often "drop these 18, here are the 4 that are real."
5. **Re-rank on decay.** Bands move. A HOT whose catalyst window closes becomes WARM then COLD. A WATCH whose trigger fires becomes HOT. Re-rank when the session log is stale (see `data-sources.md` freshness protocol).
