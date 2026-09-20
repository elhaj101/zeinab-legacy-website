/**
 * Three supported locales. German is the primary/default language per
 * Zeinab's brief ("German (main) + English + professional Modern Standard
 * Arabic — not Lebanese dialect, targeting the wider Arab market").
 *
 * This is a real Next.js server (not a static export, unlike
 * el-haj-international), so `<html lang/dir>` is set correctly per-request
 * server-side in `[locale]/layout.tsx` — no client-side correction script
 * is needed here.
 */
export const LOCALES = ["de", "en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Right-to-left locales. Currently just Arabic. */
const RTL_LOCALES: readonly Locale[] = ["ar"];

export function dirFor(locale: Locale): "rtl" | "ltr" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

/** Human-readable name of each locale, in its OWN language — for the
    language switcher, listing languages the way a reader of each script
    would recognise them. */
export const LOCALE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  ar: "العربية",
};
