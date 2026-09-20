import type { Dictionary } from "@/lib/i18n/dictionary";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {dict.about.eyebrow}
      </p>
      <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.about.headline}</h2>
      <div className="mt-6 space-y-4 text-[var(--muted)]">
        {dict.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
