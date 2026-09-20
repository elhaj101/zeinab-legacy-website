import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";
import ApplicationForm from "@/components/ApplicationForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <section className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        {dict.apply.eyebrow}
      </p>
      <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.apply.headline}</h1>
      <p className="mt-4 text-[var(--muted)]">{dict.apply.intro}</p>
      <p className="mt-2 text-xs text-[var(--muted)]">{dict.apply.nonGuaranteeNote}</p>

      <ApplicationForm locale={raw} dict={dict} />
    </section>
  );
}
