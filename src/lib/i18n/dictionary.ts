/**
 * The shape every locale dictionary must satisfy. One file per locale
 * (de.ts / en.ts / ar.ts) implements this in full — TypeScript's structural
 * checking means a missing or mistyped key fails `tsc`, not a silent blank
 * spot on the page. Same pattern as el-haj-international's dictionary.
 *
 * All copy in the locale files is DRAFT placeholder text, grounded only in
 * facts Zeinab already gave in her brief (offer names/prices, the LEGACY
 * method's three phases, her audience). It is NOT her actual voice/story —
 * her brief says that still needs to come from her and be professionally
 * structured around it. Treat every string here as a stand-in for real copy,
 * not finished marketing text.
 */

export interface OfferItem {
  name: string;
  price: string;
  cadence: string;
  description: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };

  nav: {
    method: string;
    about: string;
    offers: string;
    apply: string;
    /** Announces the language switcher to screen readers. */
    languageSwitcher: string;
  };

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaApply: string;
    ctaMethod: string;
  };

  method: {
    eyebrow: string;
    headline: string;
    intro: string;
    phases: { title: string; description: string }[];
  };

  about: {
    eyebrow: string;
    headline: string;
    body: string[];
  };

  offers: {
    eyebrow: string;
    headline: string;
    intro: string;
    items: OfferItem[];
    disclaimer: string;
  };

  booking: {
    eyebrow: string;
    headline: string;
    body: string;
    /** Shown when a real booking tool link has been configured. */
    ctaAvailable: string;
    /** Shown while `config/booking.ts` has no embed URL set. */
    ctaComingSoon: string;
    comingSoonNote: string;
  };

  apply: {
    eyebrow: string;
    headline: string;
    intro: string;
    nonGuaranteeNote: string;
    form: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
      contactPreferenceOptions: { email: string; phone: string; whatsapp: string };
      businessType: string;
      currentOffer: string;
      mainChallenge: string;
      goals: string;
      investmentReadiness: string;
      investmentReadinessOptions: { ready: string; exploring: string; notYet: string };
      submit: string;
      submitting: string;
      error: string;
    };
  };

  thankYou: {
    headline: string;
    body: string;
    backHome: string;
  };

  legal: {
    placeholderBanner: string;
    impressumTitle: string;
    impressumBody: string;
    datenschutzTitle: string;
    datenschutzBody: string;
  };

  cookie: {
    message: string;
    accept: string;
    decline: string;
  };

  footer: {
    tagline: string;
    contactHeading: string;
    rights: string;
  };
}
