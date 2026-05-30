"use client";

import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Wordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  return (
    <Link href="/" className="inline-flex items-center gap-2 group no-underline">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber border-3 border-amber-deep spark-pulse shrink-0"
        aria-hidden
      >
        <span className="text-steel-ink font-bold text-sm leading-none">⚡</span>
      </span>
      <span
        className={`font-display font-bold tracking-tightest text-steel-ink ${dim} group-hover:text-amber-deep transition-colors`}
      >
        {BRAND.wordmark}
      </span>
    </Link>
  );
}

export function Nav({ active }: { active?: "home" | "try" }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-sm bg-canvas/80 border-b-3 border-steel">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Wordmark />
        <nav className="flex items-center gap-1 sm:gap-2 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors no-underline ${
              active === "home"
                ? "text-steel-ink font-bold"
                : "text-steel-muted hover:text-steel-ink"
            }`}
          >
            Demo
          </Link>
          <Link
            href="/try"
            className={`px-3 py-1.5 rounded-md border-3 transition-all no-underline ${
              active === "try"
                ? "bg-steel text-canvas-card border-steel-ink"
                : "border-steel-ink text-steel-ink hover:bg-steel hover:text-canvas-card"
            }`}
          >
            Try it ⚡
          </Link>
        </nav>
      </div>
    </header>
  );
}
