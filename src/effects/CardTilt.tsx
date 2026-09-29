"use client";

import { createAnimatable } from "animejs/animatable";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

const MAX = 7; // degrees

/** Cards marked [data-tilt-card] tilt in 3D towards the mouse and settle back when it leaves. Mouse only. */
export function CardTilt() {
  useAnimeScope(EFFECTS.cardTilt, ({ fine }) => {
    if (!fine) return;
    const offs: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-tilt-card]").forEach((card) => {
      // Perspective lives on the parent so Anime.js can own the card's own transform.
      if (card.parentElement) card.parentElement.style.perspective = "900px";
      const anim = createAnimatable(card, { rotateX: 500, rotateY: 500, ease: "out(3)" });
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        anim.rotateY(px * MAX * 2);
        anim.rotateX(-py * MAX * 2);
      };
      const leave = () => {
        anim.rotateX(0);
        anim.rotateY(0);
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      offs.push(() => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
        if (card.parentElement) card.parentElement.style.perspective = "";
      });
    });
    return () => offs.forEach((off) => off());
  });
  return null;
}
