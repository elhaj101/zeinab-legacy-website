"use client";

import { animate } from "animejs/animation";
import { spring } from "animejs/easings";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

/** Any .btn squashes a little when pressed and springs back on release. */
export function SpringPress() {
  useAnimeScope(EFFECTS.springPress, () => {
    const down = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      if (btn) animate(btn, { scale: 0.94, duration: 120, ease: "out(2)" });
    };
    const up = () => {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        if (btn.style.transform.includes("scale"))
          animate(btn, { scale: 1, ease: spring({ bounce: 0.55, duration: 350 }) });
      });
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
    };
  });
  return null;
}
