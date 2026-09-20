import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Method({ dict }: { dict: Dictionary }) {
  return (
    <section id="method" className="border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.method.eyebrow}
        </p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.method.headline}</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{dict.method.intro}</p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.method.phases.map((phase, i) => (
            <li key={phase.title} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6">
              <span className="display text-3xl font-semibold text-[var(--accent-soft)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{phase.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{phase.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
