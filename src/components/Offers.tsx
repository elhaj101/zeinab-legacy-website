import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function Offers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

  return (
    <section
      id="offers"
      className="theme-dark flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg)]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.offers.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {dict.offers.headline}
        </h2>
        <p data-anim="rise" className="mt-4 max-w-2xl text-[var(--muted)]">
          {dict.offers.intro}
        </p>

        <div data-anim="stagger" className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.offers.items.map((offer) => (
            // Two layers on purpose: the outer one is moved by the scroll reveal (GSAP), the inner
            // one is tilted by the mouse (Anime.js). Two libraries never write the same element.
            <div key={offer.name} className="flex">
              <div
                data-tilt-card
                className="flex w-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--bg-alt)] p-6"
              >
                <h3 className="text-lg font-semibold">{offer.name}</h3>
                {offer.price && <p className="display mt-2 text-2xl font-semibold">{offer.price}</p>}
                <p className="mt-1 text-sm text-[var(--muted)]">{offer.cadence}</p>
                <p className="mt-4 flex-1 text-sm text-[var(--muted)]">{offer.description}</p>
                <Link href={`${base}/apply`} className="btn btn-outline btn-sm mt-6">
                  {dict.hero.ctaApply}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {dict.offers.disclaimer && <p className="mt-6 text-xs text-[var(--muted)]">{dict.offers.disclaimer}</p>}
      </div>
    </section>
  );
}
