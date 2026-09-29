import type { Dictionary } from "@/lib/i18n/dictionary";
import Accordion from "./Accordion";

export default function Faq({ dict }: { dict: Dictionary }) {
  const d = dict.faq;

  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {d.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {d.headline}
        </h2>

        <div data-anim="rise" className="mt-10">
          <Accordion
            items={d.items.map((item) => ({ title: item.question, content: item.answer }))}
          />
        </div>
      </div>
    </section>
  );
}
