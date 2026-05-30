import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DemoHero } from "@/components/DemoHero";
import { LiveDuel } from "@/components/LiveDuel";
import { Workspace } from "@/components/Workspace";
import { TierLegend } from "@/components/TierLegend";
import { BRAND } from "@/lib/brand";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav active="home" />

      {/* 1 — the animated demo */}
      <DemoHero />

      {/* 2 — the live duel */}
      <Section id="duel" tone="dark">
        <Eyebrow tone="dark">The proof · live</Eyebrow>
        <H2 tone="dark">Same fleet. Two minds.</H2>
        <Lede tone="dark">
          Hit run and watch a generic AI and Catalyst answer the <em>same</em> prompt side by
          side. One profiles. The other refuses to — and hunts the catalyst instead. This is the
          whole pitch in ten seconds.
        </Lede>
        <div className="mt-7">
          <LiveDuel />
        </div>
      </Section>

      {/* 3 — try it yourself */}
      <Section id="workspace">
        <Eyebrow>Try it yourself</Eyebrow>
        <H2>Pick an angle. Name a fleet. Get a thesis — not a profile.</H2>
        <Lede>
          The No-Dossier Gate, made interactive. Choose how you&apos;re working the account, then
          run the researcher. Watch it tier its sources with color-coded badges, name who signs,
          and end on the one question that decides the deal. There&apos;s a list-ranker too.
        </Lede>
        <div className="mt-7">
          <Workspace initial="chat" />
        </div>
      </Section>

      {/* 4 — what you get */}
      <Section tone="panel">
        <Eyebrow>What you get</Eyebrow>
        <H2>A falsifiable Deal Thesis. Every time.</H2>
        <div className="grid md:grid-cols-3 gap-4 mt-7">
          <Feature n="01" title="The catalyst" body="The dated, sourced event that makes now different from six months ago — or an honest 'there isn't one, deprioritize.'" />
          <Feature n="02" title="The signer" body="The role that actually signs, confidence-labeled. Never an invented name presented as research." />
          <Feature n="03" title="The ledger" body="Known / Inferred / Unknown, kept strictly separate. It leads with what it doesn't know." />
          <Feature n="04" title="Source tiers" body="Every fact weighed T1–T4. Volatile CSA scores get date-stamped; contested verdict figures get withheld until two sources agree." accent />
          <Feature n="05" title="Three kill-conditions" body="The disconfirming evidence that would make you drop the account. No summarizer gives you this." kill />
          <Feature n="06" title="The next question" body="The single highest-leverage thing to learn next — and exactly how to learn it." accent />
        </div>
      </Section>

      {/* 5 — the source ladder */}
      <Section>
        <Eyebrow>The domain edge</Eyebrow>
        <H2>It treats trucking data like the swamp it is.</H2>
        <Lede>
          Generic AI states a guessed revenue figure and an undated CSA score with the same
          confidence. Catalyst can&apos;t — it tiers every source before it trusts it. That&apos;s
          the difference between a researcher and a search box.
        </Lede>
        <div className="mt-7 max-w-3xl">
          <TierLegend />
        </div>
      </Section>

      {/* 6 — two surfaces / how to use */}
      <Section tone="panel">
        <Eyebrow>How it&apos;s built</Eyebrow>
        <H2>The folder is the agent. This app is just a surface.</H2>
        <Lede>
          Built on <strong>Interpretable Context Methodology</strong> — no vector store, no RAG, no
          orchestration framework. The researcher is a folder of plain markdown: each file does one
          job, routing is explicit, reference material loads only when needed. This web app reads
          those same files at request time, so editing a rule changes both surfaces.
        </Lede>
        <div className="grid md:grid-cols-2 gap-4 mt-7">
          <Surface
            tag="Surface 1 · zero install"
            title="Drop the folder into Claude"
            body="Upload the folder to a Claude Project and start researching. No app, no API key, no infrastructure. Proof the methodology travels anywhere."
          />
          <Surface
            tag="Surface 2 · this app"
            title="Catalyst, deployed"
            body="A Next.js app over the same markdown — animated demo, live duel, angle-gate chat, list ranker. Proof it's a usable product."
            accent
          />
        </div>
      </Section>

      {/* 7 — closing CTA */}
      <Section tone="dark" center>
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber border-3 border-amber-deep spark-pulse text-2xl">⚡</span>
        </div>
        <h2 className="display-tagline size-large text-canvas">{BRAND.tagline}</h2>
        <p className="text-canvas-line/80 max-w-xl mx-auto mt-4">
          Stop profiling fleets. Start deciding which ones deserve this quarter.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <a href="#duel" className="cta-btn cta-amber">⚔ Run the duel</a>
          <Link href="/try" className="cta-btn">⚡ Open the workspace</Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

/* ---------------- layout primitives ---------------- */
type Tone = "default" | "panel" | "dark";

function Section({
  id, children, tone = "default", center = false,
}: {
  id?: string; children: React.ReactNode; tone?: Tone; center?: boolean;
}) {
  const bg =
    tone === "dark" ? "bg-steel-ink text-canvas" : tone === "panel" ? "bg-canvas-panel" : "";
  return (
    <section id={id} className={`scroll-mt-16 border-t-3 border-steel ${bg}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 ${center ? "text-center" : ""}`}>
        {children}
      </div>
    </section>
  );
}
function Eyebrow({ children, tone = "default" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <div className={`font-mono text-xs uppercase tracking-[0.25em] mb-3 ${tone === "dark" ? "text-amber" : "text-amber-deep"}`}>
      {children}
    </div>
  );
}
function H2({ children, tone = "default" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <h2 className={`font-display font-bold tracking-tightest size-medium ${tone === "dark" ? "text-canvas" : "text-steel-ink"}`}>
      {children}
    </h2>
  );
}
function Lede({ children, tone = "default" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={`mt-3 max-w-2xl text-base sm:text-lg leading-relaxed ${tone === "dark" ? "text-canvas-line/85" : "text-steel-muted"}`}>
      {children}
    </p>
  );
}

function Feature({
  n, title, body, accent, kill,
}: {
  n: string; title: string; body: string; accent?: boolean; kill?: boolean;
}) {
  const hex = kill ? "#B23030" : accent ? "#C97E08" : "#1E2D3D";
  return (
    <div className="bg-canvas-card border-3 rounded-lg p-5" style={{ borderColor: hex, boxShadow: `4px 4px 0 0 ${hex}` }}>
      <div className="font-mono font-bold text-2xl" style={{ color: hex }}>{n}</div>
      <div className="font-display font-bold text-steel-ink mt-1 text-lg">{title}</div>
      <p className="text-sm text-steel-muted mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}

function Surface({
  tag, title, body, accent,
}: {
  tag: string; title: string; body: string; accent?: boolean;
}) {
  const hex = accent ? "#F2A30F" : "#1E2D3D";
  const sh = accent ? "#C97E08" : "#14202E";
  return (
    <div className="bg-canvas-card border-3 rounded-lg p-5" style={{ borderColor: hex, boxShadow: `4px 4px 0 0 ${sh}` }}>
      <div className="font-mono text-[0.7rem] uppercase tracking-wider font-bold" style={{ color: sh }}>{tag}</div>
      <div className="font-display font-bold text-steel-ink mt-1 text-xl">{title}</div>
      <p className="text-sm text-steel-muted mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-3 border-steel bg-steel-ink text-canvas-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="font-display font-bold text-canvas text-xl tracking-tightest">
            ⚡ {BRAND.wordmark}
          </div>
          <div className="flex gap-4 font-mono text-xs uppercase tracking-wider">
            <a href="#duel" className="hover:text-amber transition-colors">Duel</a>
            <a href="#workspace" className="hover:text-amber transition-colors">Try it</a>
            <Link href="/try" className="hover:text-amber transition-colors">Workspace</Link>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-canvas-line/70 leading-relaxed">
          {BRAND.name} — for founders selling safety / retention / driver-appreciation programs into
          enterprise trucking fleets. Instead of a company profile, it builds a falsifiable theory
          of why a specific fleet buys now, weighs this industry&apos;s unreliable sources, names
          who signs, and ends with the one question that decides the deal.
        </p>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-wider text-canvas-line/50">
          Built on Interpretable Context Methodology · Submission for Weekly Comp #6 — The
          Researcher · Cleaf Notes / EDUBA
        </p>
      </div>
    </footer>
  );
}
