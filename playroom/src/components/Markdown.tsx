"use client";

/**
 * MarkdownLite — a dependency-free renderer tuned for the researcher's output.
 *
 * It handles the subset the researcher actually emits: bold section headers,
 * ## / ### headings, bullet lists, and paragraphs. Its one special trick is the
 * "lie detector": any inline source-tier mark like (T2 — CSA score, as of Q1)
 * is rendered as a colored tier pill. Kill-condition headers get a red rail.
 */

import React from "react";
import { TIERS, type TierId } from "@/lib/brand";

const TIER_RE = /\((T[1-4])\b([^)]*)\)/g;

function tierIdFromCode(code: string): TierId | null {
  const map: Record<string, TierId> = { T1: "t1", T2: "t2", T3: "t3", T4: "t4" };
  return map[code] ?? null;
}

/** Render a single line of inline text: **bold**, `code`, and tier pills. */
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  // First split out tier marks, then handle bold/code within the rest.
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  TIER_RE.lastIndex = 0;
  let i = 0;
  while ((m = TIER_RE.exec(text)) !== null) {
    if (m.index > lastIndex) {
      out.push(...renderEmphasis(text.slice(lastIndex, m.index), `${keyBase}-t${i}a`));
    }
    const tid = tierIdFromCode(m[1]);
    if (tid) {
      const t = TIERS[tid];
      out.push(
        <span
          key={`${keyBase}-tier${i}`}
          className="tier-badge stamp-in"
          style={{
            color: t.hex,
            borderColor: t.hex,
            background: `${t.hex}14`,
            borderStyle: t.dashed ? "dashed" : "solid",
          }}
          title={`${t.code} — ${t.label}: ${t.rule}`}
        >
          {t.code}
          <span className="opacity-70 normal-case font-normal tracking-normal">
            {m[2].replace(/^[\s—–-]+/, " ").trimEnd()}
          </span>
        </span>
      );
    } else {
      out.push(m[0]);
    }
    lastIndex = m.index + m[0].length;
    i += 1;
  }
  if (lastIndex < text.length) {
    out.push(...renderEmphasis(text.slice(lastIndex), `${keyBase}-tail`));
  }
  return out;
}

/** Handle **bold**, *italic*, and `code` inside a text fragment. */
function renderEmphasis(text: string, keyBase: string): React.ReactNode[] {
  // Bold first (greedy **), then single-* italic, then `code`.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g);
  return parts.map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyBase}-b${idx}`} className="font-bold text-steel-ink">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.length > 2 && p.startsWith("*") && p.endsWith("*")) {
      return (
        <em key={`${keyBase}-i${idx}`} className="italic">
          {p.slice(1, -1)}
        </em>
      );
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <code
          key={`${keyBase}-c${idx}`}
          className="font-mono text-[0.82em] bg-canvas-line/60 px-1 py-0.5 rounded"
        >
          {p.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyBase}-x${idx}`}>{p}</React.Fragment>;
  });
}

function isKillHeader(text: string): boolean {
  return /KILL THIS|WOULD KILL|KILL-?CONDITION|FINDINGS THAT/i.test(text);
}
function isCatalystHeader(text: string): boolean {
  return /THE CATALYST|CATALYST\b/i.test(text);
}

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let key = 0;

  function flushList() {
    if (listBuf.length === 0) return;
    const items = [...listBuf];
    listBuf = [];
    blocks.push(
      <ul key={`ul-${key++}`} className="my-2 space-y-1 pl-1">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2 text-[0.95rem] leading-relaxed">
            <span className="text-amber-deep mt-0.5 select-none">▸</span>
            <span>{renderInline(it, `li-${key}-${idx}`)}</span>
          </li>
        ))}
      </ul>
    );
  }

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (/^\s*[-*•]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      listBuf.push(line.replace(/^\s*([-*•]|\d+\.)\s+/, ""));
      continue;
    }
    flushList();

    if (line.trim() === "") {
      blocks.push(<div key={`sp-${key++}`} className="h-2" />);
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const txt = h[2].replace(/\*\*/g, "");
      blocks.push(
        <h3
          key={`h-${key++}`}
          className="font-display font-bold text-steel-ink mt-3 mb-1 text-[1.05rem]"
        >
          {renderInline(txt, `h-${key}`)}
        </h3>
      );
      continue;
    }

    // A bold-only line acts as a section header (THE CLAIM, etc.)
    const boldHeader = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    if (boldHeader) {
      const txt = boldHeader[1];
      const kill = isKillHeader(txt);
      const cat = isCatalystHeader(txt);
      blocks.push(
        <div
          key={`bh-${key++}`}
          className={`mt-3 mb-1 font-mono font-bold uppercase tracking-wider text-[0.8rem] ${
            kill ? "kill-snap pl-2 border-l-4" : ""
          }`}
          style={{
            color: kill ? "#B23030" : cat ? "#C97E08" : "#1E2D3D",
            borderColor: kill ? "#B23030" : undefined,
          }}
        >
          {txt}
        </div>
      );
      continue;
    }

    blocks.push(
      <p key={`p-${key++}`} className="text-[0.95rem] leading-relaxed text-steel-ink/90">
        {renderInline(line, `p-${key}`)}
      </p>
    );
  }
  flushList();

  return <div className="space-y-0.5 text-left">{blocks}</div>;
}
