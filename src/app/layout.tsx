import type { Metadata } from "next";
import { Fraunces, Inter, Cairo } from "next/font/google";
import "./globals.css";

/**
 * The TRUE root layout — the only place `<html>`/`<body>` can be declared.
 * Deliberately locale-agnostic and static (no `headers()`, nothing
 * request-dependent): `lang`/`dir` are corrected per-route by
 * SetHtmlLangDir, invoked from `[locale]/layout.tsx`, which actually has
 * the locale as a route param. See SetHtmlLangDir.tsx for why this
 * component reads locale from a header here instead — short version: it
 * didn't hold up under browser testing. `suppressHydrationWarning` because
 * the static "de" below is a build-time placeholder, already stale by the
 * time SetHtmlLangDir's inline script runs during HTML parsing.
 *
 * Fonts: Fraunces (a warm, elegant serif display face — matches the
 * brief's "premium, warm, modern, elegant, not cold/corporate" direction,
 * placeholder until real brand fonts are chosen) + Inter for body text,
 * both Latin-only, plus Cairo for Arabic pages.
 */
const displayLatin = Fraunces({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const bodyLatin = Inter({
  variable: "--font-body-latin",
  subsets: ["latin"],
});

const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "LEGACY — Seinab Dabbous",
  description: "Personal branding & business development.",
  // No domain or launch decided yet — keep this out of search results
  // until it's actually ready to go live.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${displayLatin.variable} ${bodyLatin.variable} ${arabic.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
