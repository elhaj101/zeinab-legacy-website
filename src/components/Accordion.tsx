"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  content: string;
}

/**
 * Single-open accordion. Mobile-friendly pattern for the method explainer
 * and FAQ — matches the reference site's curriculum/FAQ layout (each item
 * collapsed by default, one tap reveals it), which keeps a long page short
 * on a small screen instead of dumping all the copy at once.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-baseline gap-4">
                <span className="display text-lg text-[var(--accent-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{item.title}</span>
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-xl text-[var(--muted)] transition-transform ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open && (
              <p className="pb-5 pl-10 pr-6 text-sm text-[var(--muted)] rtl:pl-6 rtl:pr-10">
                {item.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
