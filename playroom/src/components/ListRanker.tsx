"use client";

import { useState } from "react";
import { useResearchStream } from "@/lib/useResearchStream";
import { Markdown } from "./Markdown";

const SAMPLE = `Meridian Freightways — ~2,500-truck dry van, stable leadership, no recent incidents
Continental Tank Lines — ~1,800-truck hazmat, new Safety VP started 4 months ago
Harbor Point Drayage — ~600 trucks, ~70% owner-operators
Sundown Reefer Co — ~900-truck reefer, lost a major shipper contract last quarter
Ridgeline Flatbed — ~400 trucks, family-owned, founder rumored to be retiring`;

const BANDS = [
  { label: "HOT", hex: "#D14A28", note: "Live catalyst + clear signer" },
  { label: "WARM", hex: "#E8851E", note: "Catalyst exists, signer/timing fuzzy" },
  { label: "WATCH", hex: "#C7A20A", note: "A trigger could form — set a tripwire" },
  { label: "COLD", hex: "#5C7088", note: "No catalyst — deprioritize" },
];

/**
 * The Target-List Ranker. Paste a list; the researcher ranks into
 * catalyst-weighted bands (target-scoring.md). The biggest fleet does NOT
 * automatically win — and that's the demonstration.
 */
export function ListRanker() {
  const [list, setList] = useState(SAMPLE);
  const { messages, isStreaming, error, send, reset } = useResearchStream();
  const result = messages.find((m) => m.role === "assistant");

  function run() {
    if (isStreaming || !list.trim()) return;
    reset();
    send(
      `Here is my target list — rank them into catalyst-weighted bands. Do not profile them.\n\n${list}`,
      "rank",
      []
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4">
      {/* Input */}
      <div className="panel p-4 flex flex-col">
        <div className="text-[0.65rem] uppercase tracking-[0.2em] font-mono font-bold text-steel-muted mb-2">
          Your target list — one fleet per line
        </div>
        <textarea
          value={list}
          onChange={(e) => setList(e.target.value)}
          rows={9}
          disabled={isStreaming}
          className="flex-1 bg-canvas-card border-3 border-steel-ink rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber disabled:opacity-50 font-mono text-steel-ink"
        />
        <div className="flex items-center gap-3 mt-3">
          <button onClick={run} disabled={isStreaming || !list.trim()} className="btn-amber disabled:opacity-40">
            {isStreaming ? "Ranking···" : "⚡ Rank my list"}
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => reset()}
              disabled={isStreaming}
              className="text-[0.7rem] uppercase tracking-wider font-mono text-steel-muted hover:text-steel-ink"
            >
              ↺ Clear
            </button>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {BANDS.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span
                className="font-mono font-bold text-[0.62rem] px-1.5 rounded"
                style={{ color: b.hex, border: `2px solid ${b.hex}`, background: `${b.hex}12` }}
              >
                {b.label}
              </span>
              <span className="text-[0.66rem] text-steel-muted leading-tight">{b.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="panel p-4 overflow-y-auto" style={{ maxHeight: "min(72vh, 640px)" }}>
        {!result ? (
          <div className="h-full flex items-center justify-center text-center min-h-[200px]">
            <p className="text-sm text-steel-soft max-w-xs leading-relaxed italic">
              Ranked into HOT / WARM / WATCH / COLD — by catalyst, not by size. The biggest
              fleet won&apos;t automatically top the list.
            </p>
          </div>
        ) : (
          <>
            <Markdown text={result.content} />
            {isStreaming && result.content.length === 0 && (
              <span className="inline-flex gap-1 text-amber-deep">
                <span className="typing-dot">·</span>
                <span className="typing-dot">·</span>
                <span className="typing-dot">·</span>
              </span>
            )}
          </>
        )}
        {error && <div className="text-sm font-mono text-signal-kill mt-2">{error}</div>}
      </div>
    </div>
  );
}
