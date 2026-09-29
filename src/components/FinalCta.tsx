import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const d = dict.finalCta;

  return (
    <section className="theme-dark flex min-h-dvh flex-col justify-center border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h2 data-anim="words" className="display text-3xl font-semibold sm:text-4xl">
          {d.headline}
        </h2>
        <div data-anim="rise" className="mt-8">
          <Link href={`/${locale}/apply`} className="btn btn-lg">
            {d.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
