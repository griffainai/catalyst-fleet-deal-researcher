"use client";

import { useState } from "react";
import { LiveDuel } from "./LiveDuel";
import { Chat } from "./Chat";
import { ListRanker } from "./ListRanker";

type Tab = "duel" | "chat" | "rank";

const TABS: { id: Tab; label: string; glyph: string; tagline: string }[] = [
  { id: "duel", label: "Live Duel", glyph: "⚔", tagline: "Generic AI vs the Researcher, same fleet." },
  { id: "chat", label: "Research", glyph: "⚡", tagline: "Pick an angle. Name a fleet. Get a thesis." },
  { id: "rank", label: "Rank a List", glyph: "≣", tagline: "Catalyst-weighted bands, not a size sort." },
];

export function Workspace({ initial = "duel" }: { initial?: Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div className="flex gap-2">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-2 rounded-md border-3 font-mono text-xs uppercase tracking-wider transition-all ${
                  on
                    ? "bg-steel text-canvas-card border-steel-ink"
                    : "bg-canvas-card border-steel-ink text-steel-ink hover:bg-canvas-panel"
                }`}
              >
                <span className="mr-1">{t.glyph}</span>
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="text-xs text-steel-muted font-mono">{active.tagline}</div>
      </div>

      {tab === "duel" && <LiveDuel />}
      {tab === "chat" && <Chat />}
      {tab === "rank" && <ListRanker />}
    </div>
  );
}
