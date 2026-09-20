import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const d = dict.finalCta;

  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h2 className="display text-3xl font-semibold sm:text-4xl">{d.headline}</h2>
        <Link
          href={`/${locale}/apply`}
          className="mt-6 inline-block rounded-full bg-[var(--accent)] px-8 py-4 text-lg font-medium text-white transition hover:opacity-90"
        >
          {d.cta}
        </Link>
      </div>
    </section>
  );
}
