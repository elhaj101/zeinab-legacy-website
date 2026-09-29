"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { asset } from "@/lib/asset";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const links = [
    { href: asset(`${base}#method`), label: dict.nav.method },
    { href: asset(`${base}#about`), label: dict.nav.about },
    { href: asset(`${base}#offers`), label: dict.nav.offers },
  ];

  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={base} aria-label="LEGACY">
          <Image
            src={asset("/images/legacy-logo.png")}
            alt="LEGACY"
            width={225}
            height={315}
            priority
            className="site-logo logo-mono"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-[var(--fg)]">
              {l.label}
            </a>
          ))}
          <Link href={`${base}/apply`} className="btn btn-sm">
            {dict.nav.apply}
          </Link>
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitcher} />
        </nav>

        {/* Mobile: the Apply CTA stays visible next to the hamburger rather
            than hiding inside it — matching the reference site, where the
            booking CTA never disappears into the collapsed menu. Only the
            secondary links (method/about/offers) and language switcher
            collapse. */}
        <div className="flex items-center gap-3 sm:hidden">
          <Link href={`${base}/apply`} className="btn btn-sm">
            {dict.nav.apply}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-sm font-medium"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-4 border-t border-[var(--line)] px-4 py-4 sm:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[var(--fg)]">
              {l.label}
            </a>
          ))}
          <LanguageSwitcher locale={locale} label={dict.nav.languageSwitcher} />
        </nav>
      )}
    </header>
  );
}
