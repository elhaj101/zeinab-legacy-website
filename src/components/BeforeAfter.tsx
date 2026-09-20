import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function BeforeAfter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const d = dict.beforeAfter;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">{d.eyebrow}</p>
      <h2 className="display mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">{d.headline}</h2>

      {/* Stacked on mobile, side by side from sm: up — mirrors the
          reference site's before/after columns collapsing to a single
          column below its tablet breakpoint. */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--line)] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            {d.beforeLabel}
          </p>
          <ul className="mt-4 space-y-3">
            {d.beforePoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-[var(--muted)]">
                <span aria-hidden className="text-[var(--muted)]">
                  –
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--accent-soft)] bg-[var(--bg-alt)] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            {d.afterLabel}
          </p>
          <ul className="mt-4 space-y-3">
            {d.afterPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm">
                <span aria-hidden className="text-[var(--accent)]">
                  +
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center sm:text-left rtl:sm:text-right">
        <Link
          href={`${base}/apply`}
          className="inline-block rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          {d.cta}
        </Link>
      </div>
    </section>
  );
}
