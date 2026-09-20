import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function Offers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

  return (
    <section id="offers" className="border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.offers.eyebrow}
        </p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.offers.headline}</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{dict.offers.intro}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.offers.items.map((offer) => (
            <div
              key={offer.name}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6"
            >
              <h3 className="text-lg font-semibold">{offer.name}</h3>
              <p className="display mt-2 text-2xl font-semibold">{offer.price}</p>
              <p className="text-sm text-[var(--muted)]">{offer.cadence}</p>
              <p className="mt-4 flex-1 text-sm text-[var(--muted)]">{offer.description}</p>
              <Link
                href={`${base}/apply`}
                className="mt-6 rounded-full border border-[var(--line)] px-4 py-2 text-center text-sm font-medium transition hover:bg-[var(--bg-alt)]"
              >
                {dict.hero.ctaApply}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--muted)]">{dict.offers.disclaimer}</p>
      </div>
    </section>
  );
}
