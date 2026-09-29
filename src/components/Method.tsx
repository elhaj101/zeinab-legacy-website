import type { Dictionary } from "@/lib/i18n/dictionary";
import Accordion from "./Accordion";

export default function Method({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="method"
      className="flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg-alt)]"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.method.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {dict.method.headline}
        </h2>
        <p data-anim="rise" className="mt-4 max-w-2xl text-[var(--muted)]">
          {dict.method.intro}
        </p>

        <div data-anim="rise" className="mt-10">
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
