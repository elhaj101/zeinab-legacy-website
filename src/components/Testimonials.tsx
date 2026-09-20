import type { Dictionary } from "@/lib/i18n/dictionary";

/**
 * Deliberately empty of quotes. The reference site's testimonials are real,
 * permission-cleared reviews — inventing equivalents for LEGACY would be
 * fabricated content attributed to nonexistent clients, not a harmless
 * placeholder. Her brief is explicit that testimonials only get published
 * with the client's permission, so this section reserves the layout slot
 * (three empty cards, matching the reference's grid) with a visible note
 * instead, exactly like the Impressum/Datenschutz placeholder banners.
 */
export default function Testimonials({ dict }: { dict: Dictionary }) {
  const d = dict.testimonials;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">{d.eyebrow}</p>
      <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{d.headline}</h2>

      <div className="mt-6 rounded-xl border-2 border-dashed border-[var(--line)] bg-[var(--bg-alt)] px-4 py-3 text-sm text-[var(--muted)]">
        {d.placeholderNote}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--line)] p-6 text-center"
          >
            <div className="h-12 w-12 rounded-full border border-dashed border-[var(--line)]" />
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
              {d.placeholderCardLabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
