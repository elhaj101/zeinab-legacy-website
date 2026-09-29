import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale } from "@/lib/i18n/locales";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import WhyLegacy from "@/components/WhyLegacy";
import Method from "@/components/Method";
import About from "@/components/About";
import Offers from "@/components/Offers";
import Testimonials from "@/components/Testimonials";
import WhoFor from "@/components/WhoFor";
import NextSteps from "@/components/NextSteps";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Marquee from "@/components/motion/Marquee";
import { dirFor } from "@/lib/i18n/locales";

// Section order follows the reference site (mymiapage.de/social-media-kurs)
// that Zeinab's own brief names as her liked direction: hero → before/after
// → why-it-matters → method → offers → testimonials → who-it's-for →
// next-steps → FAQ → final CTA. Two things from that reference are
// deliberately NOT reproduced: an "as seen in" press strip and real
// testimonial quotes — both would be fabricated claims about LEGACY with
// nothing behind them (see Testimonials.tsx's comment).
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
      <Marquee headline={dict.hero.headline} rtl={dirFor(raw) === "rtl"} />
      <BeforeAfter locale={raw} dict={dict} />
      <WhyLegacy dict={dict} />
      <Method dict={dict} />
      <About dict={dict} />
      <Offers locale={raw} dict={dict} />
      <Testimonials dict={dict} />
      <WhoFor dict={dict} />
      <NextSteps locale={raw} dict={dict} />
      <Faq dict={dict} />
      <FinalCta locale={raw} dict={dict} />
    </>
  );
}
