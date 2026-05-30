"use client";

import { TIERS, TIER_ORDER } from "@/lib/brand";

/**
 * The source-tier "lie detector" — Catalyst's domain edge, made visible.
 * Trucking intelligence is a swamp of unreliable sources; this is how the
 * researcher decides what to trust, withhold, or flag.
 */
export function TierLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-2">
      {!compact && (
        <div className="text-xs uppercase tracking-[0.18em] font-mono font-bold text-steel-muted">
          The source ladder
        </div>
      )}
      <div className="grid gap-2">
        {TIER_ORDER.map((id) => {
          const t = TIERS[id];
          return (
            <div
              key={id}
              className="flex items-start gap-3 bg-canvas-card border-3 rounded-md px-3 py-2"
              style={{ borderColor: t.hex, boxShadow: `2px 2px 0px 0px ${t.hex}` }}
            >
              <span
                className="font-mono font-bold text-sm shrink-0 mt-0.5 px-1.5 rounded"
                style={{
                  color: t.hex,
                  border: `2px ${t.dashed ? "dashed" : "solid"} ${t.hex}`,
                  background: `${t.hex}12`,
                }}
              >
                {t.code}
              </span>
              <div className="min-w-0">
                <div className="font-display font-bold text-steel-ink text-sm leading-tight">
                  {t.label}
                </div>
                <div className="text-xs text-steel-muted leading-snug">{t.rule}</div>
                {!compact && (
                  <div className="text-[0.7rem] text-steel-soft italic mt-0.5 leading-snug">
                    {t.example}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
