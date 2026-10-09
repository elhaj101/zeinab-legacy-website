"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import type { Dictionary, OfferCard, OfferPoint } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

interface Row {
  title: string;
  body: ReactNode;
}

const Points = ({ items }: { items: OfferPoint[] }) => (
  <ul className="space-y-3">
    {items.map((p) => (
      <li key={p.title}>
        <p className="text-sm font-semibold">{p.title}</p>
        <p className="mt-0.5 text-sm text-[var(--muted)]">{p.body}</p>
      </li>
    ))}
  </ul>
);

/** What opens inside a card: why you need it (when it has that text), then before and after. */
const rowsOf = (c: OfferCard): Row[] => [
  ...(c.reason
    ? [{ title: c.reason.title, body: <div className="space-y-2 text-sm text-[var(--muted)]">{c.reason.paragraphs.map((p) => <p key={p}>{p}</p>)}</div> }]
    : []),
  { title: c.beforeLabel, body: <Points items={c.before} /> },
  { title: c.afterLabel, body: <Points items={c.after} /> },
];

/**
 * One card per offer, all the same size. The details are expandable rows INSIDE the card: a click opens or closes
 * a row and its text scrolls within the card's own body, so the card's outer size never changes. One row open at
 * a time per card. Panels use the site's `.acc-panel` grow style; closed ones are `inert`.
 * The nav links to #clarity-call (the first card's id).
 */
export default function Offers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const uid = useId();
  const cards = dict.offers.cards;
  const [open, setOpen] = useState<(number | null)[]>(() => cards.map(() => null));

  return (
    <section id="offers" className="theme-dark flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {dict.offers.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {dict.offers.headline}
        </h2>
        <p data-anim="rise" className="mt-4 max-w-2xl text-[var(--muted)]">
          {dict.offers.intro}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((card, i) => {
            const rows = rowsOf(card);
            return (
              // Fixed height: the card is the same size closed or open; only its inner body scrolls.
              <article key={card.id} id={card.id} className="flex h-[40rem] scroll-mt-24 flex-col rounded-2xl border border-[var(--line)] bg-[var(--bg-alt)] p-6">
                <h3 className="display text-2xl font-semibold">{card.name}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--accent)]">{card.tagline}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{card.description}</p>
                {card.note && <p className="mt-2 text-xs font-medium">{card.note}</p>}

                <div className="mt-4 min-h-0 flex-1 overflow-y-auto border-t border-[var(--line)]">
                  {rows.map((row, r) => {
                    const isOpen = open[i] === r;
                    const bId = `${uid}-${i}-b${r}`;
                    const pId = `${uid}-${i}-p${r}`;
                    return (
                      <div key={row.title} className="border-b border-[var(--line)]">
                        <button
                          type="button"
                          id={bId}
                          aria-expanded={isOpen}
                          aria-controls={pId}
                          onClick={() => setOpen((o) => o.map((v, k) => (k === i ? (isOpen ? null : r) : v)))}
                          className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium rtl:text-right"
                        >
                          <span>{row.title}</span>
                          <span aria-hidden className={`shrink-0 text-lg text-[var(--muted)] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                            +
                          </span>
                        </button>
                        <div id={pId} role="region" aria-labelledby={bId} data-open={isOpen} inert={!isOpen} className="acc-panel">
                          <div>
                            <div className="pb-3">{row.body}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link href={`${base}/apply`} className="btn btn-outline btn-sm mt-4 self-start">
                  {card.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
