import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";

const SITE_URL = BRAND.siteUrl;
const TITLE = `${BRAND.tagline} | ${BRAND.name} — ${BRAND.category}`;
const DESCRIPTION =
  "Catalyst is a deal researcher for founders selling safety/retention programs into enterprise trucking fleets. It refuses to profile — it builds a falsifiable theory of why a specific fleet buys now, weighs this industry's unreliable sources (volatile CSA scores, inflated verdict figures, stale contacts), names who signs, and ends with the one question that decides the deal. Built on Interpretable Context Methodology.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fleet research",
    "trucking sales",
    "B2B deal research",
    "FMCSA",
    "CSA scores",
    "safety program sales",
    "Interpretable Context Methodology",
    "ICM",
    "EDUBA",
    "Cleaf Notes",
    "Claude",
    "Anthropic",
  ],
  authors: [{ name: "griffainai" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-steel-ink font-sans">{children}</body>
    </html>
  );
}
