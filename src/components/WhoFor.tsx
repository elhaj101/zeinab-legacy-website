import type { Dictionary } from "@/lib/i18n/dictionary";

export default function WhoFor({ dict }: { dict: Dictionary }) {
  const d = dict.whoFor;

  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {d.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {d.headline}
        </h2>

        <ul data-anim="stagger" className="mt-8 space-y-4">
          {d.items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-[var(--bg)] p-4">
              {/* The tick is an SVG so CheckDraw can draw it when it scrolls into view. */}
              <svg
                data-check
                aria-hidden
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
