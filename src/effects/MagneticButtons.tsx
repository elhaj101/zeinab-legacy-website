"use client";

import { createAnimatable } from "animejs/animatable";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

const REACH = 30; // px around the button where the pull starts
const PULL = 0.18; // share of the distance the button moves

/** Main call-to-action buttons lean towards the mouse when it comes close. Mouse only. */
export function MagneticButtons({ selector = "main .btn:not([data-no-magnet])" }: { selector?: string }) {
  useAnimeScope(EFFECTS.magneticButtons, ({ fine }) => {
    if (!fine) return;
    const items = [...document.querySelectorAll<HTMLElement>(selector)].map((el) => ({
      el,
      anim: createAnimatable(el, { x: 450, y: 450, ease: "out(3)" }),
    }));
    const onMove = (e: MouseEvent) => {
      for (const { el, anim } of items) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const near =
          e.clientX > r.left - REACH &&
          e.clientX < r.right + REACH &&
          e.clientY > r.top - REACH &&
          e.clientY < r.bottom + REACH;
        anim.x(near ? (e.clientX - cx) * PULL : 0);
        anim.y(near ? (e.clientY - cy) * PULL : 0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  });
  return null;
}
