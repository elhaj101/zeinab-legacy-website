import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { BOOKING_EMBED_URL } from "@/config/booking";

/**
 * The reference site's "book a call → discovery call → start" process,
 * mapped onto Zeinab's own funnel from her brief ("visitor → trusts Seinab
 * → applies → books an analysis call"). Step 2 folds in what used to be a
 * separate Booking section — same booking-tool-pending logic (config/
 * booking.ts), just presented as this step's action instead of its own
 * full section.
 *
 * Where the three steps sit side by side, a thin line draws from badge to
 * badge as the section scrolls, with a spark riding it (StepsThread). On a
 * phone, where the steps stack, it runs straight down a rail left of the cards.
 */
export default function NextSteps({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const d = dict.nextSteps;
  const b = dict.booking;

  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-4 py-16 sm:px-6">
      <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {d.eyebrow}
      </p>
      <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
        {d.headline}
      </h2>

      <div data-thread className="relative mt-10">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[var(--fg)] opacity-0"
          fill="none"
        >
          <path d="" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span
          aria-hidden
          data-thread-spark
          className="pointer-events-none absolute left-0 top-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-[var(--fg)] opacity-0 shadow-[0_0_14px_3px_rgba(0,0,0,0.3)]"
        />

        <ol data-anim="stagger" className="relative grid gap-6 pl-8 sm:grid-cols-3 sm:pl-0">
          {d.steps.map((step, i) => (
            // Two layers on purpose: the <li> is moved by the scroll reveal (GSAP), the card inside
            // is tilted by the mouse (Anime.js). Two libraries never write the same element.
            <li key={step.title} className="flex">
              <div data-tilt-card className="w-full rounded-2xl border border-[var(--line)] p-6">
                <span
                  data-thread-stop
                  className="display relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--fg)] bg-[var(--bg)] text-xl font-semibold"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{step.description}</p>

                {i === 1 &&
                  (BOOKING_EMBED_URL ? (
                    <a
                      href={BOOKING_EMBED_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="nav-link mt-4 inline-block text-sm font-medium text-[var(--accent)]"
                    >
                      {b.ctaAvailable}
                    </a>
                  ) : (
                    <p className="mt-4 text-xs text-[var(--muted)]">{b.comingSoonNote}</p>
                  ))}

                {i === 0 && (
                  <Link
                    href={`${base}/apply`}
                    className="nav-link mt-4 inline-block text-sm font-medium text-[var(--accent)]"
                  >
                    {dict.hero.ctaApply}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
