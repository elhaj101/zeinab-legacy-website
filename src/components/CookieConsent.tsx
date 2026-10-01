"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "legacy-cookie-consent";

// The stored choice, read through useSyncExternalStore so the banner follows localStorage without
// setting state inside an effect. The server render assumes a choice exists (no banner), so the
// banner never flashes into the static HTML.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};
let dismissed = false; // covers browsers that block storage: the click still hides the banner
const hasChoice = () => {
  if (dismissed) return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
};

/**
 * Minimal placeholder banner. The site sets no analytics/marketing cookies
 * yet (Meta Pixel + analytics are "Should", not day-one) — this only
 * remembers the visitor's choice locally so it doesn't nag on every visit.
 * Needs replacing with a real consent-management flow once analytics/Pixel
 * are actually wired up.
 */
export default function CookieConsent({ dict }: { dict: Dictionary }) {
  const chosen = useSyncExternalStore(subscribe, hasChoice, () => true);

  function choose(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage blocked: the banner just shows again next visit.
    }
    dismissed = true;
    listeners.forEach((cb) => cb());
  }

  if (chosen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--bg)] px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">{dict.cookie.message}</p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="btn btn-outline btn-sm"
          >
            {dict.cookie.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn btn-sm"
          >
            {dict.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
