"use client";

import { createScope, type Scope } from "animejs/scope";
import { useEffect, useRef } from "react";

export type Matches = { reduce: boolean; fine: boolean };

/**
 * Runs an Anime.js setup inside a scope that is reverted on unmount and re-run when the
 * visitor's motion or pointer settings change. Nothing runs for reduced motion; `fine` is true
 * for a real mouse (effects that follow the cursor check it).
 */
export function useAnimeScope(
  enabled: boolean,
  setup: (matches: Matches) => void | (() => void),
  deps: unknown[] = [],
) {
  const scope = useRef<Scope | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cleanup: void | (() => void);
    scope.current = createScope({
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)", fine: "(hover: hover) and (pointer: fine)" },
    }).add((self) => {
      const m = self!.matches as Matches;
      if (m.reduce) return;
      cleanup = setup(m);
      return () => cleanup?.();
    });
    return () => scope.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}
