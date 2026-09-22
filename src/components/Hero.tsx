"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { asset } from "@/lib/asset";

/** How long a normal phrase stays fully visible before the next replaces it. */
const HOLD_MS = 3400;
/** "LEGACY" gets its own longer pause as the opening brand moment. */
const BRAND_HOLD_MS = 3900;
/** Fade duration between phrases — must match `.is-leaving` in globals.css. */
const FADE_MS = 500;

function holdMsFor(i: number) {
  return i === 0 ? BRAND_HOLD_MS : HOLD_MS;
}

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const chunks = dict.hero.subheadline;

  // One phrase on screen at a time, replaced by the next (not accumulated
  // into the full sentence) — a dramatic, story-style reveal that loops
  // forever (wraps back to "LEGACY" after the last phrase). The first
  // phrase ("LEGACY") renders much larger as a standalone brand moment
  // (see the `index === 0` size override below), then the rest settle
  // into the normal subheadline size. Skipped for prefers-reduced-motion,
  // which shows the complete sentence statically instead of cycling.
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    setIndex(0);
    setLeaving(false);
    if (reduceMotion || chunks.length <= 1) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function step(i: number) {
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          const next = (i + 1) % chunks.length;
          setIndex(next);
          setLeaving(false);
          step(next);
        }, FADE_MS);
      }, holdMsFor(i));
    }
    step(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [chunks, reduceMotion]);

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
        <p className="hero-neon display mx-auto mt-6 flex min-h-[2lh] max-w-3xl items-center justify-center text-2xl font-semibold leading-snug sm:text-4xl md:text-5xl">
          {reduceMotion ? (
            chunks.join(" ")
          ) : (
            <span
              key={index}
              className={[
                "hero-neon-chunk",
                leaving ? "is-leaving" : "",
                index === 0 ? "hero-neon-chunk--brand text-6xl font-bold sm:text-8xl md:text-9xl" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {chunks[index]}
            </span>
          )}
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
