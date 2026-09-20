import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {dict.hero.eyebrow}
      </p>
      <h1 className="display mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
        {dict.hero.headline}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)]">{dict.hero.subheadline}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={`${base}/apply`}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90 sm:w-auto"
        >
          {dict.hero.ctaApply}
        </Link>
        <a
          href={`${base}#method`}
          className="w-full rounded-full border border-[var(--line)] px-6 py-3 font-medium transition hover:bg-[var(--bg-alt)] sm:w-auto"
        >
          {dict.hero.ctaMethod}
        </a>
      </div>
    </section>
  );
}
