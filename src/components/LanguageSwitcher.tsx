"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/locales";

/** Swaps only the leading `/xx` locale segment, keeping the rest of the
    path (e.g. `/de/apply` -> `/ar/apply`). */
function pathForLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

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
        <Link
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
        </Link>
      ))}
    </nav>
  );
}
