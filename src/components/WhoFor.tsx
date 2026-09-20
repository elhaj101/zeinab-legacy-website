import type { Dictionary } from "@/lib/i18n/dictionary";

export default function WhoFor({ dict }: { dict: Dictionary }) {
  const d = dict.whoFor;

  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">{d.eyebrow}</p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{d.headline}</h2>

        <ul className="mt-8 space-y-4">
          {d.items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-[var(--bg)] p-4">
              <span aria-hidden className="mt-0.5 text-[var(--accent)]">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
