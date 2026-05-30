"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";
import { BRAND } from "@/lib/brand";

/* The story, told for someone who has never heard the word "fleet."
   Lead with what it does → the problem → why generic AI fails → the big idea →
   how (trigger hunt) → how (trust labels) → what you get → watch it live. */
const SCENE_DURATIONS_MS = [4600, 7500, 8500, 7500, 8500, 8500, 8000, 99999];
const SCENE_COUNT = SCENE_DURATIONS_MS.length;

export function DemoHero() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SCENE_COUNT - 1, next));
    setScene(clamped);
    if (clamped === SCENE_COUNT - 1) setDone(true);
  }, []);

  useEffect(() => {
    if (paused || scene >= SCENE_COUNT - 1) return;
    timerRef.current = window.setTimeout(() => go(scene + 1), SCENE_DURATIONS_MS[scene]);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene, paused, go]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      if (e.key === "ArrowRight") go(scene + 1);
      else if (e.key === "ArrowLeft") go(scene - 1);
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene, go]);

  return (
    <div ref={rootRef} className="flex flex-col" style={{ minHeight: "calc(100vh - 3.5rem)" }}>
      <main className="flex-1 relative flex items-center justify-center px-5 py-10">
        <div key={scene} className="scene-fade-up w-full max-w-4xl">
          <SceneRouter scene={scene} />
        </div>
      </main>
      <Controls
        scene={scene}
        paused={paused}
        done={done}
        onPause={() => setPaused((p) => !p)}
        onPrev={() => go(scene - 1)}
        onNext={() => go(scene + 1)}
        onRestart={() => {
          setDone(false);
          setPaused(false);
          go(0);
        }}
      />
    </div>
  );
}

function SceneRouter({ scene }: { scene: number }) {
  switch (scene) {
    case 0: return <SceneCold />;
    case 1: return <SceneProblem />;
    case 2: return <SceneGeneric />;
    case 3: return <SceneBigIdea />;
    case 4: return <SceneTrigger />;
    case 5: return <SceneTrust />;
    case 6: return <SceneThesis />;
    default: return <SceneClose />;
  }
}

/* ---------- 0: cold open — say what it IS, plainly ---------- */
function SceneCold() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="flex justify-center mb-6">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber border-3 border-amber-deep spark-pulse text-3xl">⚡</span>
      </div>
      <h1 style={{ animationDelay: "150ms" }} className="display-tagline size-mega">{BRAND.wordmark}</h1>
      <p style={{ animationDelay: "400ms" }} className="size-medium font-display font-bold text-amber-deep mt-3">
        {BRAND.tagline}
      </p>
      <p style={{ animationDelay: "750ms" }} className="text-steel-muted text-lg sm:text-xl mt-5 max-w-2xl mx-auto">
        An AI that researches your sales prospects and tells you{" "}
        <span className="text-steel-ink font-semibold">which ones are actually worth chasing</span> —
        and which to skip.
      </p>
    </div>
  );
}

/* ---------- 1: the problem — relatable, concrete, no jargon ---------- */
function SceneProblem() {
  const { out, done } = useTypewriter("200 companies on your list. Time to call maybe 20.", { speed: 34 });
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-4">The problem every salesperson has</div>
      <p className={`size-large font-display font-bold text-steel-ink ${!done ? "caret" : ""}`}>{out}</p>
      <div className="stagger mt-8 text-steel-muted text-lg max-w-2xl mx-auto space-y-3">
        <p style={{ animationDelay: "2200ms" }}>
          Say your job is selling safety programs to trucking companies. Chase the wrong one for
          three months and the quarter is gone.
        </p>
        <p style={{ animationDelay: "3000ms" }} className="text-amber-deep font-semibold">
          So the real question isn&apos;t &ldquo;tell me about this company.&rdquo; It&apos;s{" "}
          &ldquo;is this one worth my time?&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ---------- 2: generic AI fails — plain framing ---------- */
function SceneGeneric() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }} className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-4 text-center">
        So you ask a normal AI about one of them…
      </div>
      <div style={{ animationDelay: "300ms" }} className="mock-bubble-prompt max-w-2xl mx-auto mb-3">
        &gt; Tell me about Continental Tank Lines, a trucking company I might sell to.
      </div>
      <div style={{ animationDelay: "900ms" }} className="mock-bubble max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
        Continental Tank Lines is a leading trucking carrier{" "}
        <Mark c="#D14A28">(around $400–500 million in revenue)</Mark> with{" "}
        <Mark c="#C8860D">some safety scores that could be better</Mark>,{" "}
        <Mark c="#8194A8" dashed>making them an excellent candidate and a strong fit for your product.</Mark>{" "}
        Want me to draft an outreach email?
      </div>
      <div style={{ animationDelay: "1600ms" }} className="flex flex-wrap justify-center gap-4 mt-5 font-mono text-xs">
        <Legend c="#D14A28" t="A guess" />
        <Legend c="#C8860D" t="No date — could be years old" />
        <Legend c="#8194A8" t="Says this about every company" />
      </div>
      <p style={{ animationDelay: "2300ms" }} className="text-center text-steel-muted mt-5 max-w-xl mx-auto">
        A neat paragraph. More words, but you still don&apos;t know if you should call them.
      </p>
    </div>
  );
}

/* ---------- 3: the big idea — the make-it-make-sense beat ---------- */
function SceneBigIdea() {
  const { out, done } = useTypewriter("Catalyst flips the question.", { speed: 40 });
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep mb-4">Here&apos;s the difference</div>
      <p className={`size-large font-display font-bold text-steel-ink ${!done ? "caret" : ""}`}>{out}</p>
      <div className="stagger mt-8 max-w-2xl mx-auto space-y-4 text-lg">
        <p style={{ animationDelay: "1400ms" }} className="text-steel-muted">
          It doesn&apos;t describe the company. It answers one thing:
        </p>
        <p style={{ animationDelay: "2100ms" }} className="size-medium font-display font-bold text-steel-ink">
          &ldquo;Is there a reason to call them <span className="text-amber-deep">right now</span>?&rdquo;
        </p>
        <p style={{ animationDelay: "3000ms" }} className="text-steel-muted">
          And if there isn&apos;t one — it tells you to skip them. That&apos;s the part that saves
          your quarter.
        </p>
      </div>
    </div>
  );
}

/* ---------- 4: how — the trigger hunt (catalyst, in plain words) ---------- */
function SceneTrigger() {
  const { out, done } = useTypewriter("A company doesn't buy because it's big. It buys because something just changed.", { speed: 24 });
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep mb-4">How · step 1 — find the trigger</div>
      <p className={`size-medium font-display font-bold text-steel-ink max-w-3xl mx-auto ${!done ? "caret" : ""}`}>{out}</p>
      <p className="stagger text-steel-muted mt-5 max-w-xl mx-auto" >
        <span style={{ animationDelay: "3200ms" }}>So it hunts for that recent change — the trigger:</span>
      </p>
      <div className="stagger flex flex-wrap justify-center gap-3 mt-5 max-w-3xl mx-auto">
        {[
          "A lawsuit or a bad accident",
          "A new safety boss in the chair",
          "Drivers quitting in bulk",
          "An insurance or regulator squeeze",
        ].map((c, i) => (
          <span
            key={c}
            style={{ animationDelay: `${3600 + i * 350}ms` }}
            className="px-4 py-2 rounded-full bg-amber-soft border-3 border-amber-deep font-mono text-sm font-bold text-amber-deep"
          >
            {c}
          </span>
        ))}
      </div>
      <p style={{ animationDelay: "5200ms" }} className="stagger text-steel-muted mt-6">
        <span style={{ animationDelay: "5200ms" }}>No trigger? No urgency. It says so, instead of pretending.</span>
      </p>
    </div>
  );
}

/* ---------- 5: how — trust labels (source tiers, in plain words) ---------- */
function SceneTrust() {
  const rows = [
    { label: "Solid", hex: "#1F8A5B", body: "Official records — court filings, government registration. State it plainly." },
    { label: "Aging", hex: "#D08A0A", body: "Safety scores that change every month. Useful, but date it and re-check." },
    { label: "Rumor", hex: "#D14A28", body: "A “$40M lawsuit” someone posted. Don't repeat the number until two sources agree." },
    { label: "Guess", hex: "#4A6E9E", body: "“Probably the person who signs.” Label it a guess — never as fact.", dashed: true },
  ];
  return (
    <div>
      <div className="text-center mb-6">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep mb-2">How · step 2 — grade every fact</div>
        <h2 className="size-medium font-display font-bold text-steel-ink">Because the internet lies.</h2>
        <p className="text-steel-muted mt-2 max-w-xl mx-auto">A normal AI states a guess and a fact with the same confidence. Catalyst won&apos;t.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto stagger">
        {rows.map((t, i) => (
          <div key={t.label} style={{ animationDelay: `${i * 450}ms` }} className="rounded-lg p-4 bg-canvas-card border-3">
            <span
              className="tier-badge stamp-in text-sm"
              style={{
                color: t.hex,
                borderColor: t.hex,
                background: `${t.hex}14`,
                borderStyle: t.dashed ? "dashed" : "solid",
                animationDelay: `${i * 450 + 200}ms`,
              }}
            >
              {t.label}
            </span>
            <div className="text-sm text-steel-ink mt-2 leading-snug">{t.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 6: what you get — the recommendation, plain ---------- */
function SceneThesis() {
  const rows = [
    { k: "Why now", v: "The one trigger that makes this the moment — dated and sourced.", hex: "#C97E08" },
    { k: "Who signs", v: "The role that actually approves the deal — never a made-up name.", hex: "#1E2D3D" },
    { k: "What's unknown", v: "The gaps, named out loud — plus how to close them.", hex: "#1E2D3D" },
    { k: "What kills it", v: "Three things that would change the answer to “skip them.”", hex: "#B23030", kill: true },
  ];
  return (
    <div>
      <div className="text-center mb-5">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-2">What you walk away with</div>
        <h2 className="size-medium font-display font-bold text-steel-ink">A recommendation you can argue with.</h2>
        <p className="text-steel-muted mt-2 max-w-xl mx-auto">Not a paragraph of facts — a call, with its reasons and its weak spots in plain view.</p>
      </div>
      <div className="max-w-2xl mx-auto space-y-2 stagger">
        {rows.map((r, i) => (
          <div
            key={r.k}
            style={{ animationDelay: `${i * 400}ms` }}
            className={`card p-3 flex gap-3 items-baseline ${r.kill ? "kill-snap border-l-4" : ""}`}
          >
            <span className="font-mono font-bold text-xs uppercase tracking-wider shrink-0 w-28" style={{ color: r.hex }}>
              {r.k}
            </span>
            <span className="text-sm text-steel-ink/90">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 7: close → into the duel ---------- */
function SceneClose() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="flex justify-center mb-5">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber border-3 border-amber-deep spark-pulse text-2xl">⚡</span>
      </div>
      <h2 style={{ animationDelay: "150ms" }} className="display-tagline size-large">Same company. Two AIs.</h2>
      <p style={{ animationDelay: "450ms" }} className="text-steel-muted max-w-xl mx-auto mt-4">
        Watch a normal AI and Catalyst answer the exact same question — side by side, live, right
        below. The difference is the whole point.
      </p>
      <div style={{ animationDelay: "750ms" }} className="flex flex-wrap justify-center gap-3 mt-7">
        <a href="#duel" className="cta-btn cta-amber">⚔ See them go head-to-head ↓</a>
        <a href="#workspace" className="cta-btn">⚡ Try it on your own list</a>
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */
function Mark({ children, c, dashed }: { children: React.ReactNode; c: string; dashed?: boolean }) {
  return (
    <span className="rounded px-0.5" style={{ background: `${c}1A`, borderBottom: `2px ${dashed ? "dashed" : "solid"} ${c}` }}>
      {children}
    </span>
  );
}
function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block w-3 h-3 rounded-sm" style={{ background: `${c}33`, border: `2px solid ${c}` }} />
      <span style={{ color: c }}>{t}</span>
    </span>
  );
}

function Controls({
  scene, paused, done, onPause, onPrev, onNext, onRestart,
}: {
  scene: number; paused: boolean; done: boolean;
  onPause: () => void; onPrev: () => void; onNext: () => void; onRestart: () => void;
}) {
  const isLast = scene === SCENE_COUNT - 1;
  return (
    <div className="border-t-3 border-steel bg-canvas-panel/90 backdrop-blur-sm px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky bottom-0 z-10">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: SCENE_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === scene ? "w-6 bg-amber dot-active" : i < scene ? "w-2 bg-steel-muted" : "w-2 bg-canvas-line"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
        <button onClick={onPrev} disabled={scene === 0} className="px-2.5 py-1.5 rounded border-3 border-steel-ink text-steel-ink disabled:opacity-30 hover:bg-canvas-card">‹ Back</button>
        {!isLast ? (
          <button onClick={onPause} className="px-3 py-1.5 rounded border-3 border-steel-ink text-steel-ink hover:bg-canvas-card">{paused ? "▶ Play" : "⏸ Pause"}</button>
        ) : (
          <button onClick={onRestart} className="px-3 py-1.5 rounded border-3 border-amber-deep bg-amber text-steel-ink">↻ Replay</button>
        )}
        <button onClick={onNext} disabled={isLast} className="px-2.5 py-1.5 rounded border-3 border-steel-ink text-steel-ink disabled:opacity-30 hover:bg-canvas-card">{done && !isLast ? "Skip ›" : "Next ›"}</button>
      </div>
    </div>
  );
}
