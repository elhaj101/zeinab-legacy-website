"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { asset } from "@/lib/asset";

/** How long each phrase stays fully visible before the next replaces it. */
const HOLD_MS = 1200;
/** Fade duration between phrases — must match `.is-leaving` in globals.css. */
const FADE_MS = 500;

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const chunks = dict.hero.subheadline;
  const headlineWords = dict.hero.headline.split(" ");

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
      }, HOLD_MS);
    }
    step(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [chunks, reduceMotion]);

  return (
    <section data-hero className="theme-dark relative flex min-h-dvh flex-col overflow-hidden">
      {/* Close-up crop, not the full-length shot: a wide, short hero frame
          only ever shows one thin horizontal slice of a tall photo, and for
          the full-length shot that slice was mostly blank wall above her
          head. A face-centered close-up survives that crop. The wrapper is
          what PageMotion animates (settles in on load, drifts on scroll);
          its resting state is exactly the framing Ali approved. */}
      <div data-hero-media className="absolute inset-0">
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
      </div>
      {/* Gradient overlay for text legibility, matching the reference site's
          dark-image + white-text hero treatment. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
      />
      {/* A soft white light that trails the mouse (CursorSpotlight). */}
      <div
        aria-hidden
        data-spotlight
        className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px] rounded-full bg-white/15 opacity-0 blur-3xl transition-opacity duration-700"
      />

      {/* Headline fixed at the top of the hero, just under the nav — its own
          block rather than grouped with the rest, per Ali's request. Split
          into words here (not by script) so React stays in charge of the DOM
          while the neon subheadline below re-renders every second or so. */}
      <div className="relative mx-auto w-full max-w-4xl px-4 pt-10 text-center text-white sm:px-6 sm:pt-14">
        <h1
          data-intro="head"
          className="display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        >
          {headlineWords.map((word, i) => (
            <Fragment key={i}>
              <span className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
                <span data-intro-word className="inline-block">
                  {word}
                </span>
              </span>
              {i < headlineWords.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>
      </div>

      <div className="relative mx-auto mt-auto w-full max-w-4xl px-4 pb-16 pt-14 text-center text-white sm:px-6 sm:pb-24">
        <p
          data-intro="rise"
          className="hero-neon display mx-auto flex min-h-[2lh] max-w-3xl items-center justify-center text-2xl font-semibold leading-snug sm:text-4xl md:text-5xl"
        >
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
        <div
          data-intro="rise"
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href={`${base}/apply`} className="btn w-full sm:w-auto">
            {dict.hero.ctaApply}
          </Link>
          <a href={asset(`${base}#method`)} className="btn btn-outline w-full sm:w-auto">
            {dict.hero.ctaMethod}
          </a>
        </div>
      </div>
    </section>
  );
}
