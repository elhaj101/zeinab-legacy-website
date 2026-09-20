"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "legacy-cookie-consent";

/**
 * Minimal placeholder banner. The site sets no analytics/marketing cookies
 * yet (Meta Pixel + analytics are "Should", not day-one) — this only
 * remembers the visitor's choice locally so it doesn't nag on every visit.
 * Needs replacing with a real consent-management flow once analytics/Pixel
 * are actually wired up.
 */
export default function CookieConsent({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--bg)] px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">{dict.cookie.message}</p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
          >
            {dict.cookie.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white"
          >
            {dict.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
