import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import About from "@/components/About";
import Offers from "@/components/Offers";
import Booking from "@/components/Booking";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <Hero locale={raw} dict={dict} />
      <Method dict={dict} />
      <About dict={dict} />
      <Offers locale={raw} dict={dict} />
      <Booking locale={raw} dict={dict} />
    </>
  );
}
