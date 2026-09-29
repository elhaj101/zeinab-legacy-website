import { EFFECTS } from "@/effects/registry";

/**
 * A looping band of the site's own headline, between the hero and the first section. The words
 * are decorative (the headline is already in the hero), so the band is hidden from screen
 * readers. PageMotion moves it; with reduced motion it just sits still.
 */
export default function Marquee({ headline, rtl }: { headline: string; rtl: boolean }) {
  if (!EFFECTS.marquee) return null;
  const parts = headline
    .split(/\.\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  // One group: the phrases twice over, so a single group is wider than any screen. Two identical
  // groups sit in the track, and PageMotion slides the track by exactly half.
  const group = (key: string) => (
    <div key={key} className="marquee-item display" dir={rtl ? "rtl" : "ltr"}>
      {[...parts, ...parts].map((part, i) => (
        <span key={i} className="inline-flex items-center gap-5">
          <span className={i % 2 ? "marquee-outline" : ""}>{part}</span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
        </span>
      ))}
    </div>
  );

  return (
    <div aria-hidden="true" className="marquee theme-dark border-y border-[var(--line)] bg-[var(--bg)] py-3 text-[var(--fg)]">
      <div data-marquee-track className="marquee-track">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}
