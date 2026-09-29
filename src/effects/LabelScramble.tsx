"use client";

import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";
import { scrambleText } from "animejs/text";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

// Arabic scrambles through Arabic letters, so the decoding stays in the page's script.
const CHARS: Record<string, string> = {
  en: "a-zA-Z",
  de: "a-zA-ZäöüÄÖÜß",
  ar: "ابتثجحخدذرزسشصضطظعغفقكلمنهوي",
};

/** Elements marked [data-scramble] decode into their text when they scroll into view. */
export function LabelScramble({ locale }: { locale: string }) {
  useAnimeScope(
    EFFECTS.labelScramble,
    () => {
      // Create the scramble only once the label is on screen, so it never shows random
      // letters before the visitor gets there.
      const observers = [...document.querySelectorAll<HTMLElement>("[data-scramble]")].map((el) =>
        onScroll({
          target: el,
          enter: "bottom-=60 top",
          repeat: false,
          onEnter: () => animate(el, { innerHTML: scrambleText({ chars: CHARS[locale] ?? CHARS.en }), duration: 900 }),
        }),
      );
      return () => observers.forEach((o) => o.revert());
    },
    [locale],
  );
  return null;
}
