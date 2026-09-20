import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <section className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-4 py-24 text-center sm:px-6">
      <h1 className="display text-3xl font-semibold sm:text-4xl">{dict.thankYou.headline}</h1>
      <p className="mt-4 text-[var(--muted)]">{dict.thankYou.body}</p>
      <Link
        href={`/${raw}`}
        className="mt-8 inline-block rounded-full border border-[var(--line)] px-6 py-3 font-medium transition hover:bg-[var(--bg-alt)]"
      >
        {dict.thankYou.backHome}
      </Link>
    </section>
  );
}
