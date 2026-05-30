"use client";

import { useEffect, useRef, useState } from "react";
import { ANGLES, ANGLE_ORDER, type AngleId } from "@/lib/brand";
import { useResearchStream } from "@/lib/useResearchStream";
import { Markdown } from "./Markdown";
import { TierLegend } from "./TierLegend";

/**
 * The Angle-Gate chat. The No-Dossier Gate, made interactive: you pick an angle
 * before you type, and the researcher is loaded in that mode.
 */
export function Chat() {
  const [angle, setAngle] = useState<AngleId>("qualify");
  const { messages, isStreaming, error, send, reset } = useResearchStream();
  const [input, setInput] = useState(ANGLES["qualify"].starter);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const meta = ANGLES[angle];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  function pickAngle(a: AngleId) {
    if (isStreaming) return;
    setAngle(a);
    if (messages.length === 0) setInput(ANGLES[a].starter);
  }

  function submit() {
    if (!input.trim() || isStreaming) return;
    send(input, angle);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
      {/* Main column */}
      <div className="panel flex flex-col overflow-hidden" style={{ height: "min(72vh, 640px)" }}>
        {/* Angle chips */}
        <div className="px-3 py-3 border-b-3 border-steel bg-canvas-panel">
          <div className="text-[0.65rem] uppercase tracking-[0.2em] font-mono font-bold text-steel-muted mb-2">
            Pick your angle — the research is different for each
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ANGLE_ORDER.map((a) => {
              const am = ANGLES[a];
              const on = a === angle;
              return (
                <button
                  key={a}
                  onClick={() => pickAngle(a)}
                  disabled={isStreaming}
                  className="text-left px-2.5 py-2 rounded-md border-3 transition-all disabled:opacity-50"
                  style={{
                    borderColor: am.hex,
                    background: on ? am.hex : "transparent",
                    color: on ? "#fff" : am.hex,
                    boxShadow: on ? `2px 2px 0 0 ${am.hex}` : "none",
                  }}
                >
                  <div className="font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                    <span>{am.glyph}</span>
                    {am.label}
                  </div>
                  <div
                    className="text-[0.66rem] leading-tight mt-0.5"
                    style={{ color: on ? "rgba(255,255,255,0.85)" : "#5C7088" }}
                  >
                    {am.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <EmptyState angle={angle} />
          ) : (
            messages.map((m, i) => (
              <Bubble
                key={i}
                role={m.role}
                content={m.content}
                streaming={isStreaming && i === messages.length - 1 && m.role === "assistant"}
                hex={meta.hex}
              />
            ))
          )}
          {error && (
            <div
              className="card p-3 text-sm font-mono"
              style={{ borderLeftWidth: 6, borderLeftColor: "#B23030", color: "#B23030" }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t-3 border-steel p-3 bg-canvas-panel">
          <div className="flex gap-2 items-stretch">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={meta.placeholder}
              rows={2}
              disabled={isStreaming}
              className="flex-1 bg-canvas-card border-3 border-steel-ink rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 font-sans text-steel-ink placeholder:text-steel-soft"
              style={{ ["--tw-ring-color" as string]: meta.hex } as React.CSSProperties}
            />
            <button
              onClick={submit}
              disabled={isStreaming || !input.trim()}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed self-stretch"
              style={{ background: meta.hex, borderColor: meta.hex }}
            >
              {isStreaming ? "···" : "Research."}
            </button>
          </div>
          {messages.length > 0 && (
            <button
              onClick={reset}
              disabled={isStreaming}
              className="mt-2 text-[0.7rem] uppercase tracking-wider font-mono text-steel-muted hover:text-steel-ink disabled:opacity-40"
            >
              ↺ New fleet
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex flex-col gap-3">
        <div className="panel p-3">
          <div
            className="font-mono font-bold text-xs uppercase tracking-wider mb-1"
            style={{ color: meta.hex }}
          >
            {meta.glyph} {meta.label}
          </div>
          <div className="text-xs text-steel-muted leading-snug">{meta.blurb}</div>
        </div>
        <div className="panel p-3">
          <TierLegend compact />
          <div className="text-[0.68rem] text-steel-soft mt-2 leading-snug">
            Watch for these pills in the answers — that&apos;s the researcher tiering its
            sources instead of guessing.
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  role,
  content,
  streaming,
  hex,
}: {
  role: "user" | "assistant";
  content: string;
  streaming: boolean;
  hex: string;
}) {
  const isResearcher = role === "assistant";
  return (
    <div className={`flex ${isResearcher ? "justify-start" : "justify-end"}`}>
      <div
        className="max-w-[88%] rounded-lg px-4 py-3 border-3"
        style={
          isResearcher
            ? { background: "#fff", borderColor: hex, boxShadow: `3px 3px 0 0 ${hex}` }
            : { background: "#E7EDF3", borderColor: "#14202E", boxShadow: "3px 3px 0 0 #14202E" }
        }
      >
        <div
          className="text-[0.62rem] uppercase tracking-[0.2em] mb-1 font-mono font-bold"
          style={{ color: isResearcher ? hex : "#1E2D3D" }}
        >
          {isResearcher ? "⚡ Researcher" : "You"}
        </div>
        {isResearcher ? (
          <>
            <Markdown text={content} />
            {streaming && content.length === 0 && (
              <span className="inline-flex gap-1" style={{ color: hex }}>
                <span className="typing-dot">·</span>
                <span className="typing-dot">·</span>
                <span className="typing-dot">·</span>
              </span>
            )}
          </>
        ) : (
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{content}</div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ angle }: { angle: AngleId }) {
  const meta = ANGLES[angle];
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6">
      <div className="text-5xl mb-3">{meta.glyph}</div>
      <div className="display-tagline text-3xl mb-1" style={{ color: meta.hex }}>
        {meta.label} mode.
      </div>
      <div className="text-xs uppercase tracking-[0.22em] text-steel-muted mb-4 font-mono font-medium">
        {meta.subtitle}
      </div>
      <p className="text-sm text-steel-muted max-w-sm leading-relaxed">{meta.blurb}</p>
      <div
        className="text-[0.7rem] text-steel-muted mt-6 max-w-sm font-mono font-bold tracking-wider uppercase border-3 rounded px-4 py-2"
        style={{ borderColor: meta.hex, color: meta.hex }}
      >
        Name a fleet. Expect questions back, not a profile.
      </div>
    </div>
  );
}
