# reference/fmcsa-csa-explained.md — What the FMCSA Data Actually Means

*The domain edge, in depth. A generalist quotes a "CSA score" as if it's a credit score. The researcher knows what it is, how it's computed, how fast it moves, what it does **not** measure, and when it's not even publicly visible. This file is why the source-tiering in `source-tiers.md` is earned, not decorative.*

> **Standing caveat — read first.** FMCSA has proposed and revised the Safety Measurement System methodology repeatedly (and a major overhaul has been in rulemaking). Every threshold, percentile rule, and visibility rule below is **direction, not gospel** — verify the *current* methodology before quoting a specific number to a prospect. The researcher's whole posture is that this data decays; that applies to the rules of the data, not just the data.

---

## 1. The three systems (and why people confuse them)

| System | Full name | Answers | Tier | Decay |
|--------|-----------|---------|------|-------|
| **SAFER** | Safety and Fitness Electronic Records | "Who is this carrier — size, type, rating, crash/inspection summary?" | T1 | Slow |
| **SMS** | Safety Measurement System | "How is this carrier performing on safety, relative to peers?" | T2 | **Monthly** |
| **L&I** | Licensing & Insurance | "Are they legally authorized and insured right now?" | T1 (existence) | Fast on lapse |

The single most common operator error: saying "their CSA score is bad" when they mean **either** an SMS BASIC percentile **or** a SAFER safety rating. These are different instruments measured on different clocks. The researcher always disambiguates which one the operator is actually looking at, because the sales implication differs.

---

## 2. CSA, SMS, and the 7 BASICs

**CSA** (Compliance, Safety, Accountability) is FMCSA's overall enforcement *program*. **SMS** is the data engine inside CSA that scores carriers. SMS sorts a carrier's roadside-inspection and crash history into **seven BASICs** (Behavior Analysis and Safety Improvement Categories):

1. **Unsafe Driving** — speeding, reckless, improper lane change, inattention (from moving violations at roadside).
2. **Crash Indicator** — history of crash involvement (frequency + severity). *Not fault-adjudicated* — see §5.
3. **Hours-of-Service (HOS) Compliance** — log violations, driving over allowed hours, ELD issues.
4. **Vehicle Maintenance** — brakes, lights, tires, defects found at inspection.
5. **Controlled Substances / Alcohol** — drug/alcohol violations.
6. **Hazardous Materials (HM) Compliance** — placarding, packaging, paperwork (only relevant to HM carriers).
7. **Driver Fitness** — CDL validity, medical certification, qualification files.

### How a BASIC is scored
- Built from **roadside inspection violations and crashes over a rolling ~24-month window.**
- Each violation is **severity-weighted** (a brake-out-of-service is worth more than a paperwork nit) **and time-weighted** (recent events weigh more than old ones).
- Normalized by exposure (more trucks/inspections = more data), then expressed as a **percentile rank against a peer group** (0–100; higher = worse).
- **Recomputed roughly monthly** as new inspections roll in and old ones age out of the window. *This is the volatility that makes BASIC scores Tier-2.*

### Intervention thresholds (direction, verify current)
A carrier whose percentile crosses a BASIC's threshold gets prioritized for FMCSA intervention (warning letters, investigations). Thresholds are **not uniform**:
- Higher (more tolerant) thresholds for general freight on some BASICs (historically ~65% for Unsafe Driving / HOS / Crash; ~80% for Vehicle Maintenance / others).
- **Lower (stricter) thresholds for passenger carriers and HM/hazmat carriers** — a hazmat fleet trips intervention at a lower percentile than a dry-van fleet. This matters: **the same raw number is "worse" for a tanker than for a dry van.**

**Sales implication:** a BASIC crossing threshold is a real **regulatory catalyst** — the carrier is now on FMCSA's radar and the safety leader has a board-visible problem. But quote it as a *direction* ("there's pressure on their Unsafe Driving BASIC, as of [date]"), never as a fixed grade.

---

## 3. Safety rating ≠ CSA score (the distinction that catches generalists)

These are two different things and conflating them is a tell that someone doesn't know the domain:

- **Safety Rating** (Satisfactory / Conditional / Unsatisfactory / Unrated) comes from an **on-site or off-site compliance review** — a point-in-time audit. It is **slow**: many carriers carry the same rating for years, or are **Unrated** simply because they've never been reviewed. It is a T1 fact but lags reality.
- **CSA/SMS BASIC percentiles** are **continuous, monthly-updated** relative rankings from roadside data. T2, volatile.

A fleet can be **"Satisfactory"** rated and still have a **BASIC over threshold** — and vice versa. When an operator says "they passed their safety rating so they're fine," the researcher separates the stale audit from the live scores. **A Conditional rating** is a stronger, harder catalyst than a BASIC blip — it's a formal finding and often tied to a remediation obligation.

---

## 4. Why the public number may not exist: the FAST Act visibility rule

After the FAST Act (2015), FMCSA **removed property-carrier BASIC percentiles from public view** pending a National Academy of Sciences review of the methodology. Practically:
- For most **property (freight) carriers**, the public SMS site may show **alerts and underlying measures** but **not always a clean public percentile**.
- For **passenger carriers and HM**, more may remain visible.

**Discipline:** do not assert a precise public BASIC percentile for a freight carrier as if it's posted. Verify what's *currently* visible. If you can only see an alert or a raw measure, say exactly that — "FMCSA flags an alert on their HOS BASIC; the public percentile is restricted, so treat the magnitude as unknown." That honesty is the product.

---

## 5. What the data does NOT tell you (state these out loud)

1. **Crash Indicator is not fault-adjudicated.** A carrier can rack up crashes that weren't their driver's fault (a four-wheeler runs the light). The BASIC counts involvement, not culpability. **Never infer "they're a dangerous fleet" from a crash count alone.** This is the single most contested part of CSA.
2. **DataQs can have scrubbed the record.** Carriers challenge violations/crashes through **DataQs** (Requests for Data Review). A sophisticated fleet with a compliance team may have a *cleaner* SMS record than reality because it disputes aggressively — and a naive fleet may look worse than it is. The score reflects *enforcement data quality*, not pure safety.
3. **Low inspection volume = low confidence.** A small or regional fleet with few roadside inspections has thin data; its percentile swings hard on a single bad inspection. Weight small-sample BASICs cautiously.
4. **Scores are relative, not absolute.** A percentile is a rank against peers. The peer group shifting can move a carrier without their behavior changing.
5. **MCS-150 staleness bleeds in.** Exposure normalization uses fleet size from the MCS-150, which can be ~2 years old (see `data-sources.md`).

---

## 6. Turning FMCSA data into a catalyst (the actual sales use)

| What you observe in the data | Catalyst family | How to handle |
|------------------------------|-----------------|---------------|
| A BASIC crossing/over threshold (esp. Unsafe Driving, HOS) | Regulatory | "Pressure on [BASIC] as of [date] — re-check." Direction, not quote. |
| A **Conditional** safety rating | Regulatory (strong) | Formal finding; often a remediation clock. Higher-confidence than a BASIC blip. |
| A spike in crash count in the recent window | Post-incident (investigate) | Pull the actual events — a single fatal crash is the real catalyst, not the count. See `incident-research.md`. |
| Insurance lapse / authority issue in L&I | Regulatory/insurance | Live, dated, hard. Strong timing signal. |
| HM BASIC pressure on a tanker | Regulatory (amplified) | Stricter thresholds for HM — the same number bites harder. See `segment-playbooks.md`. |

The pattern: **the data points you at where to look; the catalyst is the specific dated event you confirm.** A score is a symptom. The researcher finds the cause and dates it.

---

## 7. The one-paragraph version (if you only remember this)

CSA scores live in **SMS**, are built from 24 months of roadside data, are **severity- and time-weighted**, **recompute monthly**, and for freight carriers may not even be **publicly posted** as a percentile. They are a **direction, not a quote** — Tier 2, always dated, always re-checked before a call. They do **not** measure fault, and they can be gamed via DataQs. The slow, formal cousin is the **safety rating** (Satisfactory/Conditional/Unrated), which is T1 but lags. Don't conflate the two, and verify the current FMCSA methodology before you put any number in front of a buyer.
