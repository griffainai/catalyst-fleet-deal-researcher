"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";
import { BRAND, TIERS, TIER_ORDER } from "@/lib/brand";

/* The 60-second story as a self-contained hero. Eight scenes, auto-advancing,
   fully controllable. When it ends, it points down into the live duel. */
const SCENE_DURATIONS_MS = [4200, 6500, 8500, 8000, 8000, 7500, 9500, 99999];
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

  // Only capture keys while the hero is in view, so they don't fight the page.
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
    case 3: return <SceneGate />;
    case 4: return <SceneTiers />;
    case 5: return <SceneCatalyst />;
    case 6: return <SceneThesis />;
    default: return <SceneClose />;
  }
}

/* ---------- Scene 0: cold open ---------- */
function SceneCold() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="flex justify-center mb-6">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber border-3 border-amber-deep spark-pulse text-3xl">
          ⚡
        </span>
      </div>
      <h1 style={{ animationDelay: "150ms" }} className="display-tagline size-mega">
        {BRAND.wordmark}
      </h1>
      <p style={{ animationDelay: "400ms" }} className="size-medium font-display font-bold text-amber-deep mt-3">
        {BRAND.tagline}
      </p>
      <p style={{ animationDelay: "700ms" }} className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mt-5">
        A deal researcher for trucking-fleet sales
      </p>
    </div>
  );
}

/* ---------- Scene 1: the problem ---------- */
function SceneProblem() {
  const { out, done } = useTypewriter("You have a list of trucking fleets and not enough hours.", { speed: 32 });
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-4">The problem</div>
      <p className={`size-large font-display font-bold text-steel-ink ${!done ? "caret" : ""}`}>{out}</p>
      <div className="stagger mt-8 text-steel-muted text-lg max-w-xl mx-auto space-y-2">
        <p style={{ animationDelay: "2400ms" }}>
          Chase a 2,000-truck carrier for a quarter and find there was never a reason for them to
          buy — and the quarter&apos;s gone.
        </p>
        <p style={{ animationDelay: "3200ms" }} className="text-amber-deep font-semibold">
          The scarce thing isn&apos;t answers. It&apos;s the right question.
        </p>
      </div>
    </div>
  );
}

/* ---------- Scene 2: generic AI fails ---------- */
function SceneGeneric() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }} className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-4 text-center">
        Ask a generic AI about a fleet…
      </div>
      <div style={{ animationDelay: "300ms" }} className="mock-bubble-prompt max-w-2xl mx-auto mb-3">
        &gt; Research Continental Tank Lines — I want to sell them a safety program.
      </div>
      <div style={{ animationDelay: "900ms" }} className="mock-bubble max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
        Continental Tank Lines is a leading bulk-liquid carrier{" "}
        <Mark c="#D14A28">(~$400–500M est. revenue)</Mark>. <Mark c="#C8860D">Elevated CSA scores</Mark>{" "}
        suggest room for improvement,{" "}
        <Mark c="#8194A8" dashed>making them an excellent candidate and a strong fit.</Mark>{" "}
        Want me to draft an outreach email?
      </div>
      <div style={{ animationDelay: "1600ms" }} className="flex flex-wrap justify-center gap-4 mt-5 font-mono text-xs">
        <Legend c="#D14A28" t="Guessed" />
        <Legend c="#C8860D" t="Undated" />
        <Legend c="#8194A8" t="Horoscope — fits every fleet" />
      </div>
      <p style={{ animationDelay: "2200ms" }} className="text-center text-steel-muted mt-5 max-w-lg mx-auto">
        A tidy profile. More facts, no more clarity about where to spend your week.
      </p>
    </div>
  );
}

/* ---------- Scene 3: the gate ---------- */
function SceneGate() {
  const { out, done } = useTypewriter("Before I build anything — three questions. The research is different for each.", { speed: 26 });
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep mb-4 text-center">
        Catalyst does the opposite — it refuses to profile
      </div>
      <div className="mock-bubble max-w-2xl mx-auto mb-5">
        <div className="text-[0.62rem] uppercase tracking-[0.2em] font-mono font-bold text-amber-deep mb-1">⚡ Researcher</div>
        <p className={`text-[1.05rem] leading-relaxed ${!done ? "caret" : ""}`}>{out}</p>
      </div>
      <div className="stagger grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {[
          { n: "1", t: "The angle", d: "Open · qualify · call-prep · walk?" },
          { n: "2", t: "Your belief", d: "So I can confirm — or disconfirm it." },
          { n: "3", t: "What you've seen", d: "So I weigh new sources against it." },
        ].map((q, i) => (
          <div key={q.n} style={{ animationDelay: `${2600 + i * 350}ms` }} className="card p-4">
            <div className="font-display font-bold text-amber-deep text-2xl mb-1">{q.n}</div>
            <div className="font-display font-bold text-steel-ink">{q.t}</div>
            <div className="text-xs text-steel-muted mt-1">{q.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Scene 4: source tiers ---------- */
function SceneTiers() {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-2">Then it weighs every source</div>
        <h2 className="size-large font-display font-bold text-steel-ink">Trucking data is a swamp.</h2>
        <p className="text-steel-muted mt-2">Catalyst tiers every fact before it trusts it.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto stagger">
        {TIER_ORDER.map((id, i) => {
          const t = TIERS[id];
          return (
            <div key={id} style={{ animationDelay: `${i * 400}ms` }} className="rounded-lg p-4 bg-canvas-card border-3">
              <span
                className="tier-badge stamp-in text-sm"
                style={{
                  color: t.hex,
                  borderColor: t.hex,
                  background: `${t.hex}14`,
                  borderStyle: t.dashed ? "dashed" : "solid",
                  animationDelay: `${i * 400 + 200}ms`,
                }}
              >
                {t.code} · {t.label}
              </span>
              <div className="text-sm font-semibold text-steel-ink mt-2 leading-tight">{t.rule}</div>
              <div className="text-[0.7rem] text-steel-soft italic mt-1.5">{t.example}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Scene 5: the catalyst ---------- */
function SceneCatalyst() {
  const { out, done } = useTypewriter("A fleet doesn't buy because it's big. It buys because something changed.", { speed: 28 });
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep mb-4">The catalyst hunt</div>
      <p className={`size-large font-display font-bold text-steel-ink max-w-3xl mx-auto ${!done ? "caret" : ""}`}>{out}</p>
      <div className="stagger flex flex-wrap justify-center gap-3 mt-8 max-w-3xl mx-auto">
        {["Post-incident", "Labor pressure", "Ownership change", "Regulatory / insurance"].map((c, i) => (
          <span
            key={c}
            style={{ animationDelay: `${2600 + i * 300}ms` }}
            className="px-4 py-2 rounded-full bg-amber-soft border-3 border-amber-deep font-mono text-sm font-bold text-amber-deep"
          >
            {c}
          </span>
        ))}
      </div>
      <p style={{ animationDelay: "4000ms" }} className="stagger text-steel-muted mt-6">
        <span style={{ animationDelay: "4000ms" }}>No catalyst? It tells you to deprioritize. That&apos;s the feature.</span>
      </p>
    </div>
  );
}

/* ---------- Scene 6: the thesis ---------- */
function SceneThesis() {
  const rows = [
    { k: "THE CLAIM", v: "Buy-now / qualify-up / deprioritize — in one sentence." },
    { k: "THE CATALYST", v: "The dated, sourced event creating urgency." },
    { k: "THE SIGNER", v: "The role that signs — confidence-labeled, never invented." },
    { k: "THE LEDGER", v: "Known / Inferred / Unknown, kept strictly separate." },
  ];
  return (
    <div>
      <div className="text-center mb-5">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-steel-muted mb-2">What you get</div>
        <h2 className="size-large font-display font-bold text-steel-ink">A Deal Thesis.</h2>
      </div>
      <div className="max-w-2xl mx-auto space-y-2 stagger">
        {rows.map((r, i) => (
          <div key={r.k} style={{ animationDelay: `${i * 350}ms` }} className="card p-3 flex gap-3 items-baseline">
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-steel shrink-0 w-32">{r.k}</span>
            <span className="text-sm text-steel-ink/90">{r.v}</span>
          </div>
        ))}
        <div style={{ animationDelay: "1700ms" }} className="kill-snap card p-3 flex gap-3 items-baseline border-l-4">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-signal-kill shrink-0 w-32">3 THAT KILL IT</span>
          <span className="text-sm text-steel-ink/90">
            The disconfirming evidence. <strong>No summarizer gives you this.</strong>
          </span>
        </div>
        <div style={{ animationDelay: "2100ms" }} className="card p-3 flex gap-3 items-baseline">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-deep shrink-0 w-32">THE NEXT Q</span>
          <span className="text-sm text-steel-ink/90">The single highest-leverage thing to learn — and how.</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Scene 7: close / scroll into the duel ---------- */
function SceneClose() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="flex justify-center mb-5">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber border-3 border-amber-deep spark-pulse text-2xl">⚡</span>
      </div>
      <h2 style={{ animationDelay: "150ms" }} className="display-tagline size-large">{BRAND.tagline}</h2>
      <p style={{ animationDelay: "450ms" }} className="text-steel-muted max-w-xl mx-auto mt-4">
        Now watch it go head-to-head with a generic AI on the same fleet — live, just below.
      </p>
      <div style={{ animationDelay: "750ms" }} className="flex flex-wrap justify-center gap-3 mt-7">
        <a href="#duel" className="cta-btn cta-amber">⚔ See the live duel ↓</a>
        <a href="#workspace" className="cta-btn">⚡ Try it yourself</a>
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
