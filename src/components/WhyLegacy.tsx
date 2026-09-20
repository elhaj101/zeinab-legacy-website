import type { Dictionary } from "@/lib/i18n/dictionary";

export default function WhyLegacy({ dict }: { dict: Dictionary }) {
  const d = dict.whyLegacy;

  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">{d.eyebrow}</p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{d.headline}</h2>
        <p className="mt-4 text-[var(--muted)]">{d.body}</p>
        <a href="#method" className="mt-6 inline-block text-sm font-medium text-[var(--accent)] underline">
          {d.cta}
        </a>
      </div>
    </section>
  );
}
