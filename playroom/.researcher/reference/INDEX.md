# reference/INDEX.md — The Knowledge Library

*Pulled as needed, never preloaded. The main routing lives in `../CLAUDE.md`; this is the finer-grained index of the reference layer so the researcher pulls exactly the one file a moment calls for and keeps its context clean.*

The library splits into three jobs: **credibility** (how much to trust what you found), **domain knowledge** (what the trucking data and market actually mean), and **process** (the gates and output shapes that make this a researcher).

---

## Credibility — trust calibration

| File | One job | Pull it when |
|------|---------|--------------|
| `source-tiers.md` | The 4-tier ladder (Hard / Decaying / Contested / Inferred) and how to treat each | Any time you're about to state a fact |
| `data-sources.md` | The pull-map: every fact → where it lives, its tier, its half-life | You need to know where a claim came from or how fresh it is |
| `fmcsa-csa-explained.md` | Deep mechanics of SAFER / SMS / L&I, the 7 BASICs, rating-vs-score, why scores decay | An operator cites a CSA/BASIC/safety-rating claim |

## Domain knowledge — what it all means

| File | One job | Pull it when |
|------|---------|--------------|
| `catalyst-library.md` | The 4 buy-catalyst families + how to detect each | Deciding whether a fleet has a reason to buy *now* |
| `incident-research.md` | Post-incident catalyst playbook (confirm it's theirs, date it, quarantine the number) | A crash/spill/citation/verdict comes up |
| `segment-playbooks.md` | How each segment (dry van / reefer / tanker-hazmat / flatbed / LTL / drayage / final-mile) buys | Calibrating the thesis to the fleet's segment |
| `decision-maker-map.md` | Who signs, by role + confidence + ownership structure | "Who's the buyer?" or mapping authority |
| `objection-handling.md` | The objections the operator will hit + research-grounded counters | Call-prep, or feeding a likely objection into a kill-condition |
| `glossary.md` | Trucking vocabulary so the researcher speaks the language and decodes shorthand | Decoding an operator's term or checking fluency |

## Process — the researcher's spine

| File | One job | Pull it when |
|------|---------|--------------|
| `the-three-questions.md` | The opening No-Dossier Gate | A fleet is named for the first time |
| `deal-thesis-template.md` | The 6-section output shape (+ compressed call-prep variant) | The gate is cleared and it's time to build the thesis |
| `target-scoring.md` | Catalyst-weighted ranking of a target list into HOT/WARM/WATCH/COLD bands | The operator hands over a list to prioritize |

---

## The dependency spine (how a full thesis pulls these)

```
fleet named
  → the-three-questions.md        (gate: get the angle)
  → catalyst-library.md           (is there a reason to buy now?)
      ├─ incident-research.md      (if the catalyst is an incident)
      └─ fmcsa-csa-explained.md    (if the signal is a score/rating)
  → segment-playbooks.md          (calibrate to the fleet type)
  → decision-maker-map.md         (who signs)
  → source-tiers.md + data-sources.md   (tier and date every fact along the way)
  → deal-thesis-template.md       (assemble the falsifiable thesis)
        └─ objection-handling.md   (feed likely objections into kill-conditions)
  → (for a list) target-scoring.md (rank, don't profile)
```

Pull only what the moment needs. A call-prep in 30 minutes pulls the call-prep variant and one objection — not the whole library. Context discipline is part of the method.
