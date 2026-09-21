import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { DEFAULT_LOCALE, dirFor, isLocale, LOCALES } from "@/lib/i18n/locales";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import SetHtmlLangDir from "@/components/SetHtmlLangDir";

// Required for `output: export` (GitHub Pages preview build) — tells Next
// which [locale] values to prerender. Harmless no-op for the normal server
// build. Nested pages under this layout inherit these params automatically.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    // Keyed by locale: forces the whole subtree to remount rather than
    // being reused across a client-side transition between locales.
    <div key={raw}>
      <SetHtmlLangDir locale={raw} dir={dirFor(raw)} />
      <Nav locale={raw} dict={dict} />
      <main>{children}</main>
      <Footer locale={raw} dict={dict} />
      <CookieConsent dict={dict} />
    </div>
  );
}
