import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";
import LegalPlaceholderBanner from "@/components/LegalPlaceholderBanner";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="display text-3xl font-semibold">{dict.legal.datenschutzTitle}</h1>
      <div className="mt-6">
        <LegalPlaceholderBanner message={dict.legal.placeholderBanner} />
      </div>
      <p className="mt-6 text-[var(--muted)]">{dict.legal.datenschutzBody}</p>
    </section>
  );
}
