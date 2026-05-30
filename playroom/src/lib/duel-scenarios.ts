/**
 * Duel scenarios — fictional fleets used to show Generic AI vs the Researcher
 * side by side. The "generic" profile is canned (it costs nothing and reliably
 * demonstrates the failure mode: confident, tidy, guessed, undated). The
 * researcher side streams live from the folder.
 *
 * Fleet names are fictional stand-ins. Any resemblance is coincidental.
 */

export type GenericSegment = { text: string; flaw?: "guess" | "horoscope" | "undated" };

export type DuelScenario = {
  id: string;
  fleet: string;
  segment: string;
  prompt: string; // sent to the researcher (angle: duel)
  /** The canned generic-AI "profile" — split into segments so flaws can be marked. */
  generic: GenericSegment[];
};

export const DUEL_SCENARIOS: DuelScenario[] = [
  {
    id: "tanker",
    fleet: "Continental Tank Lines",
    segment: "~1,800-truck hazmat / bulk-liquid carrier",
    prompt:
      "Research Continental Tank Lines — a ~1,800-truck hazmat / bulk-liquid carrier. I want to sell them a safety + driver-retention program. Open angle.",
    generic: [
      { text: "Continental Tank Lines is a leading bulk-liquid carrier " },
      { text: "(approximately 1,800 power units, estimated $400–500M annual revenue, ", flaw: "guess" },
      { text: "headquartered in Houston, TX). " },
      { text: "Elevated CSA scores suggest room for improvement, ", flaw: "undated" },
      {
        text: "making them an excellent candidate for a safety program and a strong fit for your solution. ",
        flaw: "horoscope",
      },
      { text: "Would you like me to draft an outreach email to their leadership team?" },
    ],
  },
  {
    id: "dryvan",
    fleet: "Meridian Freightways",
    segment: "~2,500-truck dry-van carrier, stable leadership",
    prompt:
      "Qualify Meridian Freightways — ~2,500-truck dry-van carrier, stable leadership, no recent incidents I know of. I think they're a strong fit because they're large. Qualify angle.",
    generic: [
      { text: "Meridian Freightways is a major dry-van truckload carrier " },
      { text: "(~2,500 trucks, likely $600M+ in revenue, founded in the early 1990s). ", flaw: "guess" },
      {
        text: "As one of the larger fleets in their region, they would clearly benefit from a driver-retention program ",
        flaw: "horoscope",
      },
      { text: "given the industry's well-known turnover challenges. " },
      { text: "This is a high-value target worth pursuing. Shall I build a pitch deck?", flaw: "horoscope" },
    ],
  },
  {
    id: "drayage",
    fleet: "Harbor Point Drayage",
    segment: "~600-truck port drayage fleet, ~70% owner-operators",
    prompt:
      "Qualify Harbor Point Drayage for our driver-retention program — ~600-truck port drayage fleet, roughly 70% owner-operators. Qualify angle.",
    generic: [
      { text: "Harbor Point Drayage operates ~600 trucks serving major port markets " },
      { text: "(estimated $120M revenue). ", flaw: "guess" },
      {
        text: "With 600 drivers, a retention program would help them reduce costly turnover and improve loyalty — a great fit. ",
        flaw: "horoscope",
      },
      { text: "I'd recommend reaching out to their VP of Driver Experience.", flaw: "guess" },
    ],
  },
];
