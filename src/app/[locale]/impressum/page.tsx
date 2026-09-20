import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";
import LegalPlaceholderBanner from "@/components/LegalPlaceholderBanner";

// robots: noindex is set globally on the true root layout already; this
// page additionally must never be linked as if it were real legal text.
export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <section className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="display text-3xl font-semibold">{dict.legal.impressumTitle}</h1>
      <div className="mt-6">
        <LegalPlaceholderBanner message={dict.legal.placeholderBanner} />
      </div>
      <p className="mt-6 text-[var(--muted)]">{dict.legal.impressumBody}</p>
    </section>
  );
}
