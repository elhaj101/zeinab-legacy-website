"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { EFFECTS } from "@/effects/registry";
import { useReducedMotion } from "./useReducedMotion";

// Black and white site: the dust is white and silver.
const SILVER: [number, number, number][] = [
  [255, 255, 255],
  [225, 225, 225],
  [190, 190, 190],
  [255, 255, 255],
];

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  c: number;
  phase: number;
};

const SWEEP_MS = 2600;
const HEIGHT = 240;

const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Once per page, when the visitor scrolls to the very bottom, a glowing ball of dust sweeps
 * across the lower edge of the screen and leaves a trail of fading sparkles. It runs right to
 * left on Arabic pages. Decorative only: no pointer events, hidden from screen readers, off for
 * reduced motion. The footer is black, so the white dust shows up there.
 */
export function MagicDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !EFFECTS.magicDust) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let played = false;
    let scrolled = false;
    let raf = 0;

    const play = () => {
      played = true;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth;
      canvas.width = W * dpr;
      canvas.height = HEIGHT * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.opacity = "1";

      const rtl = document.documentElement.dir === "rtl";
      const motes: Mote[] = [];
      const start = performance.now();
      let last = start;
      let prev = { x: rtl ? W + 60 : -60, y: HEIGHT * 0.55 };

      const frame = (now: number) => {
        // The first frame timestamp can predate `start`, so clamp both.
        const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
        last = now;
        const t = Math.max(0, Math.min((now - start) / SWEEP_MS, 1));
        const sweeping = t < 1;

        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, W, HEIGHT);
        ctx.globalCompositeOperation = "lighter";

        if (sweeping) {
          const p = easeInOut(t);
          const x = rtl ? W + 60 - p * (W + 120) : -60 + p * (W + 120);
          const y = HEIGHT * 0.55 + Math.sin(t * Math.PI * 3) * 34 - Math.sin(t * Math.PI) * 30;
          const speed = Math.hypot(x - prev.x, y - prev.y);

          // Scatter dust along the path travelled since the last frame, so fast frames leave no gaps.
          const count = Math.min(26, 6 + Math.round(speed * 0.6));
          for (let i = 0; i < count; i++) {
            const k = Math.random();
            motes.push({
              x: prev.x + (x - prev.x) * k + (Math.random() - 0.5) * 10,
              y: prev.y + (y - prev.y) * k + (Math.random() - 0.5) * 10,
              vx: (Math.random() - 0.5) * 40 + (rtl ? 1 : -1) * 18,
              vy: (Math.random() - 0.7) * 38,
              life: 0,
              max: 0.9 + Math.random() * 1.3,
              size: 0.6 + Math.random() * 2.2,
              c: Math.floor(Math.random() * SILVER.length),
              phase: Math.random() * Math.PI * 2,
            });
          }
          prev = { x, y };

          // The ball: a soft white halo around a bright core.
          const halo = ctx.createRadialGradient(x, y, 0, x, y, 46);
          halo.addColorStop(0, "rgba(255,255,255,0.95)");
          halo.addColorStop(0.18, "rgba(235,235,235,0.7)");
          halo.addColorStop(0.5, "rgba(200,200,200,0.16)");
          halo.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, 46, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let i = motes.length - 1; i >= 0; i--) {
          const m = motes[i];
          m.life += dt;
          if (m.life >= m.max) {
            motes.splice(i, 1);
            continue;
          }
          m.vx *= 0.97;
          m.vy = m.vy * 0.97 + 14 * dt; // dust settles slowly
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const fade = 1 - m.life / m.max;
          const twinkle = 0.55 + 0.45 * Math.sin(m.phase + m.life * 14);
          const [r, g, b] = SILVER[m.c];
          ctx.fillStyle = `rgba(${r},${g},${b},${(fade * twinkle).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * (0.6 + fade * 0.6), 0, Math.PI * 2);
          ctx.fill();
          if (m.size > 2) {
            // The bigger motes get a small star glint.
            ctx.fillRect(m.x - m.size * 2 * fade, m.y - 0.4, m.size * 4 * fade, 0.8);
            ctx.fillRect(m.x - 0.4, m.y - m.size * 2 * fade, 0.8, m.size * 4 * fade);
          }
        }

        if (sweeping || motes.length) raf = requestAnimationFrame(frame);
        else {
          ctx.clearRect(0, 0, W, HEIGHT);
          canvas.style.opacity = "0";
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      if (window.scrollY > 0) scrolled = true;
      if (played || !scrolled) return;
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (bottom) play();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.opacity = "0";
    };
  }, [pathname, reduced]);

  if (reduced || !EFFECTS.magicDust) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 w-full opacity-0"
      style={{ height: HEIGHT }}
    />
  );
}
