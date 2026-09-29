"use client";

import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";
import { createDrawable } from "animejs/svg";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

/** Tick marks ([data-check] svg with one path) draw themselves when their row scrolls into view. */
export function CheckDraw() {
  useAnimeScope(EFFECTS.checkDraw, () => {
    const observers = [...document.querySelectorAll<SVGElement>("[data-check]")].map((svg) => {
      const path = svg.querySelector("path");
      if (!path) return null;
      const [drawable] = createDrawable(path);
      drawable.setAttribute("draw", "0 0");
      return onScroll({
        target: svg,
        enter: "bottom-=40 top",
        repeat: false,
        onEnter: () => animate(drawable, { draw: ["0 0", "0 1"], duration: 700, ease: "out(3)" }),
      });
    });
    return () => observers.forEach((o) => o?.revert());
  });
  return null;
}
