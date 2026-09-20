"use client";

import { useLayoutEffect } from "react";
import InlineScript from "./InlineScript";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Sets <html lang>/<html dir> to the route's real locale.
 *
 * Why this exists instead of reading the locale straight from `headers()`
 * in the true root layout: an earlier version of this file did exactly
 * that (a `proxy.ts` middleware stamped the resolved locale onto a request
 * header, and the root layout read it back). It worked under direct/SSR
 * page loads and under `curl`, but browser testing turned up cases where
 * the rendered page ended up in a different, WRONG locale than the URL —
 * consistently reproducible, survived a full production build + `next
 * start` (so not a dev-mode/HMR artifact), and `location.href` inside the
 * page confirmed the URL itself was correct while `document.title`/`lang`/
 * content were not. That points at a hydration-time mismatch on the
 * dynamic, headers()-dependent root layout rather than anything wrong with
 * the dictionary/locale logic itself (every hard page load, checked via
 * curl and via fresh browser tabs, rendered the correct locale).
 *
 * This is the same problem el-haj-international already solved for its
 * static export, for an unrelated reason (no server to read a locale
 * header from at all there). Reusing its proven fix here: keep the true
 * root layout (`app/layout.tsx`) static and locale-agnostic, and correct
 * `<html>` from this CLIENT component instead, which sits in `[locale]/
 * layout.tsx` and so genuinely has the locale as a route param — no
 * `headers()`, no request-time ambiguity for hydration to trip over.
 *
 * Three mechanisms, matching el-haj-international's SetHtmlLangDir:
 *  1. An inline script — runs during HTML parsing, before first paint.
 *  2. This layout effect — backstop for client-side transitions.
 *  (El-haj-international's Nav also sets these directly in its language-
 *  toggle click handler as mechanism 3; not needed here since this site's
 *  LanguageSwitcher does a full page load rather than a soft navigation.)
 */
export default function SetHtmlLangDir({
  locale,
  dir,
}: {
  locale: Locale;
  dir: "ltr" | "rtl";
}) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <InlineScript
      html={`(function(){try{var e=document.documentElement;e.lang=${JSON.stringify(
        locale,
      )};e.dir=${JSON.stringify(dir)}}catch(_){}})()`}
    />
  );
}
