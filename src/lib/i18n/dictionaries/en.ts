import type { Dictionary } from "../dictionary";

// DRAFT PLACEHOLDER COPY — see dictionary.ts's top comment.
const en: Dictionary = {
  meta: {
    title: "LEGACY by Seinab Dabbous — Personal Branding & Business Development",
    description:
      "LEGACY is Seinab Dabbous's personal branding system for coaches, consultants and experts who want to build their positioning, visibility and client acquisition strategically.",
  },

  nav: {
    method: "Method",
    about: "About Seinab",
    offers: "Offers",
    apply: "Apply",
    languageSwitcher: "Switch language",
  },

  hero: {
    eyebrow: "Personal Branding & Business Development",
    headline: "Your brand. Your system. Your LEGACY.",
    subheadline:
      "LEGACY is the structured system for coaches, consultants and experts who are serious about building a personal brand — clearly positioned, visible, and with a predictable path to qualified client enquiries.",
    ctaApply: "Apply now",
    ctaMethod: "Discover the method",
  },

  method: {
    eyebrow: "The LEGACY method",
    headline: "A system, not guesswork",
    intro:
      "LEGACY isn't \"post more\" advice. It's a three-phase system that connects positioning, visibility and sales strategically.",
    phases: [
      {
        title: "Identity & Positioning",
        description:
          "We define what you actually stand for — and how to communicate it clearly and distinctly.",
      },
      {
        title: "Content & Visibility",
        description:
          "Your positioning becomes visible: a content system that builds trust rather than chasing reach.",
      },
      {
        title: "Sales & Growth",
        description:
          "Visibility turns into qualified enquiries — with a clear, predictable path to new clients.",
      },
    ],
  },

  about: {
    eyebrow: "About Seinab",
    headline: "The person behind LEGACY",
    body: [
      "Placeholder: Seinab's own story, experience and voice go here — direct, energetic, confident, human.",
      "This section will be replaced once Seinab supplies her text (see the 2026-09-20 brief, Content/Language section).",
    ],
  },

  offers: {
    eyebrow: "Offers",
    headline: "Three ways to work with LEGACY",
    intro:
      "Each offer is matched to a different stage of your business — from first clarity to a scaled personal brand.",
    items: [
      {
        name: "Brand Clarity Audit",
        price: "€690",
        cadence: "one-time",
        description:
          "A thorough assessment of your current positioning and visibility — with concrete next steps.",
      },
      {
        name: "Personal Brand Authority",
        price: "€1,490 / month",
        cadence: "12 weeks, 3 instalments",
        description:
          "The flagship mentoring programme: Identity & Positioning → Content & Visibility → Sales & Growth, closely guided.",
      },
      {
        name: "Personal Brand Scale",
        price: "€2,490 / month",
        cadence: "3-month minimum",
        description:
          "For established brands scaling an existing system rather than building from scratch.",
      },
    ],
    disclaimer:
      "Founding-client price for the first 3 clients in the Personal Brand Authority programme: €1,190 / month.",
  },

  booking: {
    eyebrow: "Analysis call",
    headline: "Get to know LEGACY in a conversation",
    body:
      "Book a short analysis call to find out whether and how LEGACY fits your current situation.",
    ctaAvailable: "Book a call",
    ctaComingSoon: "Online booking coming soon",
    comingSoonNote:
      "Online booking will be set up once the right booking tool has been chosen. Until then, please get in touch via the application form.",
  },

  apply: {
    eyebrow: "Application",
    headline: "Apply for LEGACY",
    intro:
      "Tell us a little about yourself and your business. We'll get back to you to discuss next steps.",
    nonGuaranteeNote:
      "Applying does not guarantee a place in the programme — every enquiry is reviewed individually.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      contactPreference: "Preferred contact method",
      contactPreferenceOptions: { email: "Email", phone: "Phone", whatsapp: "WhatsApp" },
      businessType: "Type of business",
      currentOffer: "Your current offer",
      mainChallenge: "Your main challenge in building your brand",
      goals: "Your goals for the next 3–6 months",
      investmentReadiness: "Investment readiness",
      investmentReadinessOptions: {
        ready: "Ready to invest",
        exploring: "Still exploring",
        notYet: "Not yet",
      },
      submit: "Submit application",
      submitting: "Sending …",
      error: "Something went wrong. Please try again.",
    },
  },

  thankYou: {
    headline: "Thank you for your application",
    body: "We've received your details and will be in touch soon with next steps.",
    backHome: "Back to homepage",
  },

  legal: {
    placeholderBanner:
      "Placeholder — not legally valid text. The Impressum and privacy policy must be reviewed by a qualified professional before this site goes live.",
    impressumTitle: "Impressum",
    impressumBody:
      "The legally required details (name, address, contact, trade register/VAT ID as applicable) go here once Zeinab's business details are available and legally reviewed.",
    datenschutzTitle: "Privacy Policy",
    datenschutzBody:
      "The full GDPR-compliant privacy policy goes here once the actual data flows (form, booking, payments, analytics) are settled and legally reviewed.",
  },

  cookie: {
    message: "This site currently uses only strictly necessary functions — no analytics or marketing cookies.",
    accept: "Got it",
    decline: "Decline",
  },

  footer: {
    tagline: "LEGACY — Personal Branding & Business Development by Seinab Dabbous",
    contactHeading: "Contact",
    rights: "All rights reserved.",
  },
};

export default en;
