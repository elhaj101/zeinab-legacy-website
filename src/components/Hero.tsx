import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Not a full-bleed background photo behind the text — tried that first, but
 * a wide/short desktop hero only ever shows one thin horizontal slice of a
 * tall portrait photo, and no single object-position value kept her face
 * clear of the text block at every viewport height (the text block's own
 * height varies with content, so it isn't a fixed target to crop around).
 * A contained portrait-ratio image next to the text — same pattern as
 * About.tsx — sidesteps the whole problem: the photo is always shown in
 * full, positioned above the text on mobile (image is the first grid
 * child) and beside it on desktop, so there's no overlap to tune around.
 */
export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;

  return (
    <section className="flex min-h-dvh flex-col justify-center border-b border-[var(--line)]">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl sm:order-2">
          <Image
            src="/images/seinab-portrait-close.jpg"
            alt="Seinab Dabbous"
            fill
            priority
            sizes="(min-width: 640px) 400px, 90vw"
            className="object-cover"
          />
        </div>

        <div className="text-center sm:order-1 sm:text-left rtl:sm:text-right">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            {dict.hero.eyebrow}
          </p>
          <h1 className="display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {dict.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-[var(--muted)] sm:mx-0">
            {dict.hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
            <Link
              href={`${base}/apply`}
              className="w-full rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90 sm:w-auto"
            >
              {dict.hero.ctaApply}
            </Link>
            <a
              href={`${base}#method`}
              className="w-full rounded-full border border-[var(--line)] px-6 py-3 font-medium transition hover:bg-[var(--bg-alt)] sm:w-auto"
            >
              {dict.hero.ctaMethod}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
