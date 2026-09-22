import type { Dictionary } from "@/lib/i18n/dictionary";
import { asset } from "@/lib/asset";

export default function WhyLegacy({ dict }: { dict: Dictionary }) {
  const d = dict.whyLegacy;

  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-[var(--line)]">
      {/* Background video (one of Seinab's own clips, per Ali's request) —
          autoplay requires muted + playsInline for mobile browsers.
          Vertical source (9:16) cropped by object-cover; the section is
          much wider than tall, so this zooms in — revisit object-position
          once someone's actually watched where the subject sits in frame. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={asset("/videos/why-legacy-background.mp4")}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto w-full max-w-2xl px-4 py-16 text-center text-white sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent-soft)]">{d.eyebrow}</p>
        <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{d.headline}</h2>
        <p className="mt-4 text-white/85">{d.body}</p>
        <a href="#method" className="mt-6 inline-block text-sm font-medium text-[var(--accent-soft)] underline">
          {d.cta}
        </a>
      </div>
    </section>
  );
}
