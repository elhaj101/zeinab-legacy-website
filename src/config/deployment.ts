/**
 * True only for the static `next build` that ships to GitHub Pages (see
 * next.config.ts and .github/workflows/deploy.yml). GitHub Pages serves
 * static files only, so this build has no /api/apply route — components
 * that depend on server code (the application form) branch on this flag to
 * show a fallback instead of a broken submit. `next dev`/`next start` and
 * any future real host (Vercel, etc.) leave this false and behave normally.
 */
export const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
