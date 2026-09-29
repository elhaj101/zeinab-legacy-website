"use client";

import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";
import { createDrawable, createMotionPath } from "animejs/svg";
import { useEffect, useState } from "react";
import { EFFECTS } from "./registry";
import { useAnimeScope } from "./useAnimeScope";

/**
 * In each [data-thread] container, draws a gently curving line through the step badges
 * ([data-thread-stop]) as the section scrolls, and sends a spark ([data-thread-spark]) along it.
 * Positions come from offsetTop/offsetLeft, so reveal transforms on the steps don't skew them.
 * The line only exists when the steps sit side by side; stacked on a phone it stays hidden.
 */
export function StepsThread() {
  const [size, setSize] = useState(0);
  useEffect(() => {
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setSize(window.innerWidth), 200);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useAnimeScope(
    EFFECTS.stepsThread,
    () => {
      document.querySelectorAll<HTMLElement>("[data-thread]").forEach((box) => {
        const svg = box.querySelector("svg");
        const path = svg?.querySelector("path");
        const spark = box.querySelector<HTMLElement>("[data-thread-spark]");
        const stops = [...box.querySelectorAll<HTMLElement>("[data-thread-stop]")];
        if (!svg || !path || !spark || stops.length < 2) return;
        if (getComputedStyle(svg).display === "none") return;

        const pos = (el: HTMLElement) => {
          let x = el.offsetWidth / 2;
          let y = el.offsetHeight / 2;
          for (let n: HTMLElement | null = el; n && n !== box; n = n.offsetParent as HTMLElement | null) {
            x += n.offsetLeft;
            y += n.offsetTop;
          }
          return { x, y };
        };
        const pts = stops.map(pos);
        let d = `M${pts[0].x},${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const sway = i % 2 ? 18 : -18;
          const mid = (a.x + b.x) / 2;
          d += ` C${mid},${a.y + sway} ${mid},${b.y - sway} ${b.x},${b.y}`;
        }
        svg.setAttribute("viewBox", `0 0 ${box.offsetWidth} ${box.offsetHeight}`);
        path.setAttribute("d", d);
        svg.style.opacity = "1";
        spark.style.opacity = "1";

        const scroll = () => onScroll({ target: box, enter: "bottom-=80 top", leave: "center+=120 bottom", sync: 0.3 });
        animate(createDrawable(path), { draw: ["0 0", "0 1"], ease: "linear", autoplay: scroll() });
        animate(spark, { ...createMotionPath(path), ease: "linear", autoplay: scroll() });
      });
    },
    [size],
  );
  return null;
}
