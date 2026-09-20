"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/locales";

/** Swaps only the leading `/xx` locale segment, keeping the rest of the
    path (e.g. `/de/apply` -> `/ar/apply`). */
function pathForLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

/**
 * Plain <a> tags, not next/link. Root-caused during testing (see
 * SetHtmlLangDir.tsx): the original root layout read the locale from a
 * `headers()`-stamped request header, which is exactly the pattern this
 * Next.js version's own docs (`preventing-flash-before-hydration.md`) warn
 * reads request data per-request rather than being safe to rely on
 * uniformly across soft navigations under this version's caching model —
 * a client-side transition could render an internally inconsistent page
 * (Nav/Footer in one locale, content in another). Fixed at the source by
 * moving lang/dir correction to SetHtmlLangDir (a Client Component, which
 * the same doc confirms handles soft navigations correctly too). Kept as
 * hard navigation here anyway: language switching is infrequent, and this
 * is the one path that's been exhaustively re-verified after the fix — no
 * reason to reopen that risk for a marginal SPA-smoothness gain.
 */
export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex items-center gap-3 text-sm">
      {LOCALES.map((l) => (
        <a
          key={l}
          href={pathForLocale(pathname, l)}
          aria-current={l === locale ? "true" : undefined}
          className={
            l === locale
              ? "font-semibold text-[var(--fg)]"
              : "text-[var(--muted)] hover:text-[var(--fg)]"
          }
        >
          {LOCALE_NAMES[l]}
        </a>
      ))}
    </nav>
  );
}
