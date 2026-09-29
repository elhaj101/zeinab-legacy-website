"use client";

import { useId, useState } from "react";

export interface AccordionItem {
  title: string;
  content: string;
}

/**
 * Single-open accordion. Mobile-friendly pattern for the method explainer
 * and FAQ — matches the reference site's curriculum/FAQ layout (each item
 * collapsed by default, one tap reveals it), which keeps a long page short
 * on a small screen instead of dumping all the copy at once.
 *
 * Every answer stays in the page and grows from zero height (`.acc-panel`
 * in globals.css); closed ones are `inert`, so they can't be tabbed into.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div key={item.title}>
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 py-5 text-left rtl:text-right"
            >
              <span className="flex items-baseline gap-4">
                <span className="display text-lg text-[var(--accent-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{item.title}</span>
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-xl text-[var(--muted)] transition-transform duration-500 ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open}
              inert={!open}
              className="acc-panel"
            >
              <div>
                <p className="pb-5 pl-10 pr-6 text-sm text-[var(--muted)] rtl:pl-6 rtl:pr-10">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
