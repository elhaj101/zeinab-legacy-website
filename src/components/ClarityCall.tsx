import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The Legacy Clarity Call: one 90-minute strategy call, its own before/after and its own price.
 * Same two-card layout as BeforeAfter (the "after" card is the dark one). There is no booking tool yet
 * (config/booking.ts), so the button goes to the application form like the site's other calls to action.
 */
export default function ClarityCall({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const d = dict.clarityCall;

  return (
    <section id="clarity-call" className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center border-t border-[var(--line)] px-4 py-16 sm:px-6">
      <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {d.eyebrow}
      </p>
      <h2 data-anim="words" className="display mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
        {d.headline}
      </h2>

      <div data-anim="stagger" className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--line)] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">{d.beforeLabel}</p>
          <ul className="mt-4 space-y-4">
            {d.beforePoints.map((p) => (
              <li key={p.title}>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="theme-dark rounded-2xl border border-[var(--fg)] bg-[var(--bg)] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{d.afterLabel}</p>
          <ul className="mt-4 space-y-4">
            {d.afterPoints.map((p) => (
              <li key={p.title}>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-anim="rise" className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--bg-alt)] p-6 text-center sm:flex sm:items-center sm:justify-between sm:gap-6 sm:text-start">
        <div>
          <p className="text-lg font-semibold">{d.format}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{d.includes}</p>
        </div>
        <Link href={`/${locale}/apply`} className="btn btn-lg mt-6 inline-block sm:mt-0">
          {d.cta}
        </Link>
      </div>
    </section>
  );
}
