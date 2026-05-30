/**
 * CATALYST — centralized brand + product tokens.
 *
 * Everything that names or styles the product lives here so a rename or
 * re-skin is a single-file edit. The underlying researcher is the folder
 * one level up (../CLAUDE.md, ../identity.md, ../rules.md, ../reference/).
 * This app is just a surface over it.
 */

export const BRAND = {
  name: "Catalyst",
  wordmark: "CATALYST",
  tagline: "No dossier. A thesis you can kill.",
  oneLiner:
    "A deal researcher for trucking-fleet sales. It refuses to profile — it builds a falsifiable theory of why a specific fleet buys now.",
  category: "Fleet Deal Researcher",
  siteUrl: "https://catalyst-fleet-researcher.vercel.app",
  built: "Built on Interpretable Context Methodology — the folder is the agent, this is just a surface.",
} as const;

/** The four source tiers — the domain edge, rendered as a "lie detector." */
export type TierId = "t1" | "t2" | "t3" | "t4";

export type TierMeta = {
  id: TierId;
  code: string; // T1..T4
  label: string;
  hex: string;
  rule: string; // how the researcher treats it
  example: string;
  dashed?: boolean;
};

export const TIERS: Record<TierId, TierMeta> = {
  t1: {
    id: "t1",
    code: "T1",
    label: "Hard",
    hex: "#1F8A5B",
    rule: "State plainly — still date-stamp it.",
    example: "SEC / court filings, FMCSA SAFER registration, the fleet's own site",
  },
  t2: {
    id: "t2",
    code: "T2",
    label: "Decaying",
    hex: "#D08A0A",
    rule: "Date-stamp + flag volatile. BASIC scores recompute monthly.",
    example: "CSA / BASIC scores, crash counts, insurance filings",
  },
  t3: {
    id: "t3",
    code: "T3",
    label: "Contested",
    hex: "#D14A28",
    rule: "Withhold the number until two independent sources agree.",
    example: "Verdict dollar figures, settlement reports, analyst revenue estimates",
  },
  t4: {
    id: "t4",
    code: "T4",
    label: "Inferred",
    hex: "#4A6E9E",
    rule: "Label every inference as an inference. Never present as fact.",
    example: "Email patterns, reconstructed org charts, \"probably the buyer\"",
    dashed: true,
  },
};

export const TIER_ORDER: TierId[] = ["t1", "t2", "t3", "t4"];

/** The four angles — the No-Dossier Gate, made selectable. */
export type AngleId = "open" | "qualify" | "callprep" | "walk";

export type AngleMeta = {
  id: AngleId;
  glyph: string;
  label: string;
  subtitle: string;
  blurb: string;
  hex: string;
  placeholder: string;
  starter: string; // seeds the chat input
  maxTokens: number;
};

export const ANGLES: Record<AngleId, AngleMeta> = {
  open: {
    id: "open",
    glyph: "↗",
    label: "Open",
    subtitle: "Get in the door.",
    blurb:
      "Cold account. The job is to find the catalyst and the signer so the first touch isn't generic.",
    hex: "#2F6BD3",
    placeholder:
      "Name the fleet + segment. e.g. \"Open Continental Tank Lines — ~1,800-truck hazmat carrier.\"",
    starter: "I want to open ",
    maxTokens: 1600,
  },
  qualify: {
    id: "qualify",
    glyph: "⚖",
    label: "Qualify",
    subtitle: "Worth the quarter?",
    blurb:
      "You have a target list and not enough hours. Find the catalyst — or get told to deprioritize.",
    hex: "#1F8A5B",
    placeholder:
      "Name the fleet + what you believe. e.g. \"Qualify a 2,500-truck dry-van carrier, stable leadership.\"",
    starter: "Qualify ",
    maxTokens: 1600,
  },
  callprep: {
    id: "callprep",
    glyph: "⏱",
    label: "Call-Prep",
    subtitle: "On in 45 minutes.",
    blurb:
      "Compressed. Catalyst, signer, the one opening question, the one objection to expect. Four lines.",
    hex: "#E8541E",
    placeholder:
      "Who, when, what seat. e.g. \"On with their Safety VP in 45 min. Go.\"",
    starter: "Call-prep: on with ",
    maxTokens: 600,
  },
  walk: {
    id: "walk",
    glyph: "⊘",
    label: "Walk?",
    subtitle: "Should I drop it?",
    blurb:
      "You suspect it's a dead account. The researcher will tell you if there's no catalyst — honestly.",
    hex: "#5C7088",
    placeholder:
      "Name the fleet + your doubt. e.g. \"Hartline Freight — I think it's a strong fit, confirm it.\"",
    starter: "Should I walk from ",
    maxTokens: 1400,
  },
};

export const ANGLE_ORDER: AngleId[] = ["open", "qualify", "callprep", "walk"];
