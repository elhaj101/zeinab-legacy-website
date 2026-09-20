"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const links = [
    { href: `${base}#method`, label: dict.nav.method },
    { href: `${base}#about`, label: dict.nav.about },
    { href: `${base}#offers`, label: dict.nav.offers },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={base} className="display text-xl font-semibold tracking-tight">
          LEGACY
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[var(--muted)] hover:text-[var(--fg)]">
              {l.label}
            </a>
          ))}
          <Link
            href={`${base}/apply`}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-white transition hover:opacity-90"
          >
            {dict.nav.apply}
          </Link>
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitcher} />
        </nav>
      </div>

      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-4 border-t border-[var(--line)] px-4 py-4 sm:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[var(--muted)]">
              {l.label}
            </a>
          ))}
          <Link
            href={`${base}/apply`}
            onClick={() => setOpen(false)}
            className="w-fit rounded-full bg-[var(--accent)] px-4 py-2 text-white"
          >
            {dict.nav.apply}
          </Link>
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitcher} />
        </nav>
      )}
    </header>
  );
}
