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
 */
export default function NextSteps({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const d = dict.nextSteps;
  const b = dict.booking;

  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">{d.eyebrow}</p>
      <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{d.headline}</h2>

      <ol className="mt-10 grid gap-6 sm:grid-cols-3">
        {d.steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-[var(--line)] p-6">
            <span className="display text-3xl font-semibold text-[var(--accent-soft)]">
              {i + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{step.description}</p>

            {i === 1 &&
              (BOOKING_EMBED_URL ? (
                <a
                  href={BOOKING_EMBED_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline"
                >
                  {b.ctaAvailable}
                </a>
              ) : (
                <p className="mt-4 text-xs text-[var(--muted)]">{b.comingSoonNote}</p>
              ))}

            {i === 0 && (
              <Link
                href={`${base}/apply`}
                className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline"
              >
                {dict.hero.ctaApply}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
