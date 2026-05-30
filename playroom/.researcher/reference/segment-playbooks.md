# reference/segment-playbooks.md — How Each Fleet Segment Buys

*A 1,500-truck dry-van carrier and a 1,500-truck hazmat tanker are not the same target. They have different turnover, different margins, different union exposure, different regulatory pressure, and a different person who signs. This file is how the researcher calibrates the thesis to the segment instead of treating "trucking" as one market.*

The operator sells a **safety / retention / driver-appreciation** program. The same program lands on a different nerve in each segment. Find the nerve.

---

## The fast read (segment → dominant nerve)

| Segment | Turnover pressure | Safety/regulatory pressure | Union exposure | Who tends to sign | Dominant nerve for a safety/retention sell |
|---------|-------------------|----------------------------|----------------|-------------------|---------------------------------------------|
| **Dry van (OTR truckload)** | **Very high** (long-haul churn notoriously ~90%+ annualized) | Moderate | Low (mostly non-union) | VP Safety / VP Ops | **Retention** — the churn is the bleeding wound |
| **Refrigerated (reefer)** | High but lower than OTR | Moderate | Low | VP Safety / VP Ops | Retention + reliability (driver continuity protects load integrity) |
| **Tanker / bulk / hazmat** | **Lower** (specialized, harder-to-replace drivers) | **Very high** (HM thresholds stricter; nuclear-verdict exposure) | Mixed | VP Safety / CSO + **CFO** (insurance) | **Safety + insurance exposure** — retention is secondary |
| **Flatbed / open-deck** | Moderate | Moderate–high (cargo securement, injury risk) | Low | VP Safety / Ops | Safety (injury/securement) + skilled-driver retention |
| **LTL (less-than-truckload)** | **Lower** (dock + line-haul, more tenured) | Moderate | **High** (Teamsters presence historically strong) | VP Ops / Labor Relations + CHRO | **Labor/retention** — union dynamics dominate; appreciation programs land here |
| **Intermodal / drayage** | High (port churn, owner-operator heavy) | Moderate | Pockets (port unionization) | Ops / Safety | Mixed; **owner-operator share complicates a W-2 retention pitch** |
| **Final-mile / last-mile** | **Very high** (gig-adjacent, high churn) | Rising (urban accident exposure) | Low–pockets | Ops / HR | **Retention** + onboarding velocity |
| **Auto-hauler / specialized** | Lower (high skill) | High (high-value cargo, damage claims) | Low | Safety / Ops | Safety + skilled-driver retention |

> Numbers like "~90% OTR turnover" are **industry-pattern direction**, not a given carrier's figure. Use them to frame the segment's nerve; never substitute the average for the target's actual turnover — flag the proxy (see `data-sources.md`).

---

## Segment notes (the why behind the table)

### Dry van / OTR truckload
The classic retention bloodbath. Long-haul drivers are away from home for weeks; churn is structural and brutal. A retention/appreciation program sells itself *if* there's a catalyst (a turnover spike, a new CHRO, a recruiting-cost crunch). **Trap:** every OTR fleet has high turnover, so "high turnover" alone is not a catalyst — it's the baseline. Find the *change*: a turnover spike above their own norm, a new exec, a recruiting budget that just blew up.

### Refrigerated (reefer)
Similar to dry van but driver continuity matters more — temperature-sensitive loads punish inexperience and churn. Slightly lower turnover than dry van. The retention story can be framed as *load-integrity protection*, not just HR cost. **Trap:** regional/dedicated reefer can run genuinely low turnover — which means *less pain to sell into*. Don't assume reefer = high churn.

### Tanker / bulk liquid / hazmat
The highest-stakes segment. Hazmat amplifies everything: stricter CSA/HM thresholds (see `fmcsa-csa-explained.md`), catastrophic incident potential, and **nuclear-verdict / insurance exposure that puts the CFO in the room**. Drivers are specialized and harder to replace, so turnover is *lower* — meaning the **safety/insurance** nerve, not retention, is usually dominant. A hard-market insurance renewal or a spill is the catalyst that funds a program here. **This is the segment where the case-vs-the-number discipline matters most** (verdict figures fly around; see `incident-research.md`).

### Flatbed / open-deck
Cargo securement and driver-injury risk drive the safety nerve. Drivers are skilled (tarping, securement) and somewhat sticky. Injury frequency and workers'-comp exposure can be the budget hook. Catalyst often regulatory (securement violations) or post-incident (a securement-related crash).

### LTL (less-than-truckload)
Structurally different: terminal networks, dock workers, line-haul drivers, more tenure, **and the strongest union exposure in trucking** (Teamsters). Labor relations and appreciation programs land naturally here, but the buyer map shifts toward **VP Operations / Labor Relations and CHRO**, and a labor action (or its threat) is the dominant catalyst. **The 2023 Yellow collapse reshaped the LTL landscape** — capacity moved, and surviving carriers absorbed volume and headcount; treat LTL leadership/ownership changes as live and verify current state.

### Intermodal / drayage
Port-centric, short-haul, and **heavy on owner-operators / independent contractors**. This is the segment where a W-2-driver retention program may *not fit* — a large 1099 share means there's no employee to "retain" in the usual sense. The researcher flags this misfit rather than forcing the thesis. AB5-style contractor-classification fights are a live regulatory wildcard in certain states.

### Final-mile / last-mile
Exploding with e-commerce, gig-adjacent labor, very high churn, rising urban-accident exposure. Retention + fast onboarding is the nerve. Often younger, less FMCSA-legible operations (lighter vehicles may fall outside some FMCSA reporting) — verify what regulatory data even exists.

---

## How to use this file

1. **Identify the segment first** (SAFER operation type + cargo). It sets the default nerve and the default signer.
2. **Pick the nerve, then look for a catalyst that matches it.** Retention-nerve segment → hunt for turnover/leadership catalysts. Safety-nerve segment → hunt for incident/regulatory/insurance catalysts.
3. **Check for segment misfit.** Heavy owner-operator (drayage), or a genuinely low-turnover dedicated operation, can make the operator's program a poor fit — **say so**. A wrong-segment fit is a deprioritize finding, not a thing to paper over.
4. **Let the segment route the signer.** Hazmat/insurance nerve → CFO co-signs. Labor nerve (LTL) → Ops/Labor Relations + CHRO. See `decision-maker-map.md`.

**The anti-pattern:** treating "trucking fleets" as one homogeneous market and running the same retention pitch at a hazmat tanker that you'd run at an OTR dry-van carrier. The segment changes the nerve, the catalyst, and the signer. Calibrate, or you're a generalist with a trucking skin.
