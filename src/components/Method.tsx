import type { Dictionary } from "@/lib/i18n/dictionary";
import Accordion from "./Accordion";

export default function Method({ dict }: { dict: Dictionary }) {
  return (
    <section id="method" className="border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.method.eyebrow}
        </p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.method.headline}</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{dict.method.intro}</p>

        <div className="mt-10">
          <Accordion
            items={dict.method.phases.map((phase) => ({
              title: phase.title,
              content: phase.description,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
