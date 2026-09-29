"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { EFFECTS } from "@/effects/registry";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** Keeps ScrollTrigger in step with Lenis, starts each new page at the top and handles in-page links. */
function Sync() {
  const pathname = usePathname();
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  // Links like "/de#method": if the target is on this page, glide to it; otherwise leave the
  // click alone so the browser navigates as normal (the header links exist on every page).
  useEffect(() => {
    if (!lenis) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const trim = (p: string) => p.replace(/\/$/, "");
      if (url.origin !== window.location.origin || trim(url.pathname) !== trim(window.location.pathname)) return;
      if (url.hash.length < 2) return;
      let target: Element | null = null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
      window.history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  // Trigger positions go stale whenever the page height changes after they were measured
  // (web font swap, late content, an accordion opening). Re-measure on any height change.
  useEffect(() => {
    let t = 0;
    const refresh = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        refresh();
      }
    });
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);
    refresh();
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}

/** Smooth wheel scrolling. Touch stays native, and reduced-motion visitors get plain scrolling. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced || !EFFECTS.smoothScroll) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: false }}>
      <Sync />
      {children}
    </ReactLenis>
  );
}
