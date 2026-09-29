"use client";

import { createAnimatable } from "animejs/animatable";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

/** A soft white light inside the hero that trails the mouse. Needs a [data-spotlight] element. Mouse only. */
export function CursorSpotlight() {
  useAnimeScope(EFFECTS.cursorSpotlight, ({ fine }) => {
    const light = document.querySelector<HTMLElement>("[data-spotlight]");
    const area = light?.parentElement;
    if (!fine || !light || !area) return;
    light.style.opacity = "1";
    const anim = createAnimatable(light, { x: 900, y: 900, ease: "out(4)" });
    const move = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      anim.x(e.clientX - r.left - light.offsetWidth / 2);
      anim.y(e.clientY - r.top - light.offsetHeight / 2);
    };
    area.addEventListener("mousemove", move);
    return () => {
      area.removeEventListener("mousemove", move);
      light.style.opacity = "0";
    };
  });
  return null;
}
