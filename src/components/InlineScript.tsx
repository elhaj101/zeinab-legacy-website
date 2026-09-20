/**
 * Renders a literal <script> tag executing before hydration — the pattern
 * documented in this Next.js version's own
 * `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`
 * for correcting server-rendered content (locale, theme, persisted state)
 * before the browser paints. `type` differs server/client so React doesn't
 * warn about rendering a `<script>` tag; `suppressHydrationWarning` covers
 * that same type mismatch.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger -- static, locally-authored script text, not user input
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
