"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { asset } from "@/lib/asset";

/** Milliseconds between each subheadline phrase lighting up. */
const REVEAL_STEP_MS = 480;

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const chunks = dict.hero.subheadline;

  // Reveals one phrase at a time on mount, each staying lit (see the
  // `.hero-neon` rules in globals.css) — Ali's request for a dramatic,
  // build-up reveal of the subheadline rather than it appearing all at once.
  const [revealed, setRevealed] = useState(chunks.length > 0 ? 1 : 0);

  useEffect(() => {
    setRevealed(chunks.length > 0 ? 1 : 0);
    if (chunks.length <= 1) return;
    const id = setInterval(() => {
      setRevealed((n) => {
        if (n >= chunks.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, REVEAL_STEP_MS);
    return () => clearInterval(id);
  }, [chunks]);

  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
      {/* Close-up crop, not the full-length shot: a wide, short hero frame
          only ever shows one thin horizontal slice of a tall photo, and for
          the full-length shot that slice was mostly blank wall above her
          head. A face-centered close-up survives that crop. */}
      <Image
        src={asset("/images/seinab-portrait-close.jpg")}
        alt="Seinab Dabbous"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        // 45% keeps her face in the upper part of the frame, away from the
        // text block anchored to the bottom (see the section's
        // `justify-end`) — confirmed on Ali's own screen.
        style={{ objectPosition: "center 45%" }}
      />
      {/* Gradient overlay for text legibility, matching the reference site's
          dark-image + white-text hero treatment. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 pb-16 pt-14 text-center text-white sm:px-6 sm:pb-24">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent-soft)]">
          {dict.hero.eyebrow}
        </p>
        <h1 className="display mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          {dict.hero.headline}
        </h1>
        <p className="hero-neon display mx-auto mt-6 max-w-3xl text-2xl font-semibold leading-snug sm:text-4xl md:text-5xl">
          {chunks.slice(0, revealed).map((chunk, i) => (
            <span key={i} className="hero-neon-chunk">
              {chunk}{" "}
            </span>
          ))}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`${base}/apply`}
            className="w-full rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90 sm:w-auto"
          >
            {dict.hero.ctaApply}
          </Link>
          <a
            href={asset(`${base}#method`)}
            className="w-full rounded-full border border-white/60 px-6 py-3 font-medium text-white transition hover:bg-white/10 sm:w-auto"
          >
            {dict.hero.ctaMethod}
          </a>
        </div>
      </div>
    </section>
  );
}
