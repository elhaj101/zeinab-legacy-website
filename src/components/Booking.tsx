import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { BOOKING_EMBED_URL } from "@/config/booking";

export default function Booking({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {dict.booking.eyebrow}
      </p>
      <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.booking.headline}</h2>
      <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">{dict.booking.body}</p>

      {BOOKING_EMBED_URL ? (
        <a
          href={BOOKING_EMBED_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          {dict.booking.ctaAvailable}
        </a>
      ) : (
        <div className="mt-8">
          <span className="inline-block cursor-not-allowed rounded-full border border-[var(--line)] px-6 py-3 font-medium text-[var(--muted)]">
            {dict.booking.ctaComingSoon}
          </span>
          <p className="mx-auto mt-3 max-w-md text-xs text-[var(--muted)]">{dict.booking.comingSoonNote}</p>
          <Link href={`${base}/apply`} className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline">
            {dict.hero.ctaApply}
          </Link>
        </div>
      )}
    </section>
  );
}
