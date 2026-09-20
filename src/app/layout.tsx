import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, Inter, Cairo } from "next/font/google";
import "./globals.css";
import { DEFAULT_LOCALE, dirFor, isLocale, type Locale } from "@/lib/i18n/locales";

/**
 * The TRUE root layout — the only place `<html>`/`<body>` can be declared
 * (see middleware.ts's comment for why this can't just read the `locale`
 * route param directly). Fonts: Fraunces (a warm, elegant serif display
 * face — matches the brief's "premium, warm, modern, elegant, not cold/
 * corporate" direction, placeholder until real brand fonts are chosen) +
 * Inter for body text, both Latin-only, plus Cairo for Arabic pages.
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const rawLocale = headerList.get("x-locale") ?? DEFAULT_LOCALE;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${displayLatin.variable} ${bodyLatin.variable} ${arabic.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
