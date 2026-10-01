import type { Dictionary } from "@/lib/i18n/dictionary";
import { asset } from "@/lib/asset";
import LazyVideo from "./LazyVideo";

export default function WhyLegacy({ dict }: { dict: Dictionary }) {
  const d = dict.whyLegacy;

  return (
    <section className="theme-dark relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-[var(--line)]">
      {/* Background video (one of Seinab's own clips, per Ali's request) —
          it only downloads once the section is near (LazyVideo).
          Vertical source (9:16) cropped by object-cover; the section is
          much wider than tall, so this zooms in — revisit object-position
          once someone's actually watched where the subject sits in frame.
          The wrapper is taller than the section so it can drift slowly
          while the section scrolls past (PageMotion, data-parallax). */}
      <div data-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
        <LazyVideo
          className="h-full w-full object-cover"
          src={asset("/videos/why-legacy-background.mp4")}
          poster={asset("/videos/why-legacy-poster.webp")}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <p data-scramble className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          {d.eyebrow}
        </p>
        <h2 data-anim="words" className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {d.headline}
        </h2>
        <p data-anim="rise" className="mt-4 text-white/85">
          {d.body}
        </p>
        <a href="#method" className="nav-link mt-6 inline-block text-sm font-medium text-[var(--accent)]">
          {d.cta}
        </a>
      </div>
    </section>
  );
}
