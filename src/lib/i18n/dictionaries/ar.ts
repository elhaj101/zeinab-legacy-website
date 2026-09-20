import type { Dictionary } from "../dictionary";

// DRAFT PLACEHOLDER COPY — see dictionary.ts's top comment. Modern Standard
// Arabic per the brief (not Lebanese dialect), targeting the wider Arab
// market. Brand names ("LEGACY", "Seinab Dabbous") kept in Latin script
// deliberately — common practice for a stylised brand name in Arabic
// marketing copy, and consistent with how she spells her own brand.
const ar: Dictionary = {
  meta: {
    title: "LEGACY بقلم Seinab Dabbous — العلامة الشخصية وتطوير الأعمال",
    description:
      "LEGACY هو نظام العلامة الشخصية الذي أنشأته Seinab Dabbous للمدرّبين والاستشاريين والخبراء الراغبين في بناء مكانتهم وحضورهم واستقطاب عملائهم بشكل استراتيجي.",
  },

  nav: {
    method: "المنهجية",
    about: "عن Seinab",
    offers: "الباقات",
    apply: "قدّمي طلبك",
    languageSwitcher: "تغيير اللغة",
  },

  hero: {
    eyebrow: "العلامة الشخصية وتطوير الأعمال",
    headline: "علامتك. نظامك. إرثك مع LEGACY.",
    subheadline:
      "LEGACY هو النظام المتكامل للمدرّبين والاستشاريين والخبراء الجادّين في بناء علامتهم الشخصية — تموضع واضح، حضور قوي، ومسار واضح نحو طلبات تعاون مؤهّلة.",
    ctaApply: "قدّمي طلبك الآن",
    ctaMethod: "تعرّفي على المنهجية",
  },

  method: {
    eyebrow: "منهجية LEGACY",
    headline: "نظام، لا عشوائية",
    intro:
      "LEGACY ليس نصيحة بـ«انشري أكثر». إنه نظام من ثلاث مراحل يربط التموضع والحضور والمبيعات بشكل استراتيجي.",
    phases: [
      {
        title: "الهوية والتموضع",
        description: "نحدّد ما تمثّلينه فعلاً — وكيفية التعبير عنه بوضوح وتميّز.",
      },
      {
        title: "المحتوى والحضور",
        description: "يتحوّل تموضعك إلى حضور فعلي: نظام محتوى يبني الثقة بدل ملاحقة الانتشار فقط.",
      },
      {
        title: "المبيعات والنمو",
        description: "يتحوّل الحضور إلى طلبات مؤهّلة — بمسار واضح وقابل للتخطيط نحو عملاء جدد.",
      },
    ],
  },

  about: {
    eyebrow: "عن Seinab",
    headline: "الشخصية وراء LEGACY",
    body: [
      "نص مؤقت: هنا تُضاف قصة Seinab الشخصية وخبرتها وأسلوبها — مباشر، حيوي، واثق، إنساني.",
      "سيُستبدل هذا القسم بالنص الفعلي بمجرد أن ترسله Seinab (راجعي بريف 2026-09-20، قسم المحتوى واللغة).",
    ],
  },

  offers: {
    eyebrow: "الباقات",
    headline: "ثلاث طرق للعمل مع LEGACY",
    intro: "كل باقة مصمّمة لمرحلة مختلفة من مشروعك — من الوضوح الأول حتى التوسّع الكامل للعلامة الشخصية.",
    items: [
      {
        name: "Brand Clarity Audit",
        price: "690 يورو",
        cadence: "دفعة واحدة",
        description: "تقييم معمّق لتموضعك وحضورك الحاليَين — مع خطوات عملية واضحة للمرحلة القادمة.",
      },
      {
        name: "Personal Brand Authority",
        price: "1,490 يورو / شهرياً",
        cadence: "12 أسبوعاً، 3 دفعات",
        description:
          "برنامج الإرشاد الرئيسي: الهوية والتموضع ← المحتوى والحضور ← المبيعات والنمو، بمتابعة مباشرة.",
      },
      {
        name: "Personal Brand Scale",
        price: "2,490 يورو / شهرياً",
        cadence: "بحد أدنى 3 أشهر",
        description: "للعلامات الراسخة الراغبة بتوسيع نظامها القائم بدل البدء من الصفر.",
      },
    ],
    disclaimer: "سعر خاص لأول 3 عميلات في برنامج Personal Brand Authority: 1,190 يورو / شهرياً.",
  },

  booking: {
    eyebrow: "مكالمة تحليلية",
    headline: "تعرّفي على LEGACY في مكالمة قصيرة",
    body: "احجزي مكالمة تحليلية قصيرة لمعرفة ما إذا كان LEGACY يناسب وضعك الحالي وكيف.",
    ctaAvailable: "احجزي موعداً",
    ctaComingSoon: "الحجز الإلكتروني قريباً",
    comingSoonNote: "سيتم تفعيل الحجز الإلكتروني بعد اختيار أداة الحجز المناسبة. حتى ذلك الحين، يرجى التواصل عبر نموذج الطلب.",
  },

  apply: {
    eyebrow: "طلب الانضمام",
    headline: "قدّمي طلبك لـLEGACY",
    intro: "أخبرينا قليلاً عنكِ وعن مشروعك. سنتواصل معكِ لمناقشة الخطوات القادمة.",
    nonGuaranteeNote: "تقديم الطلب لا يضمن الحصول على مقعد في البرنامج — تتم مراجعة كل طلب على حدة.",
    form: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      contactPreference: "طريقة التواصل المفضّلة",
      contactPreferenceOptions: { email: "البريد الإلكتروني", phone: "الهاتف", whatsapp: "واتساب" },
      businessType: "نوع مشروعك",
      currentOffer: "باقتك أو عرضك الحالي",
      mainChallenge: "أكبر تحدٍّ يواجهك في بناء علامتك",
      goals: "أهدافك خلال الأشهر الـ 3 إلى 6 القادمة",
      investmentReadiness: "مدى الاستعداد للاستثمار",
      investmentReadinessOptions: {
        ready: "جاهزة للاستثمار",
        exploring: "ما زلت أستكشف",
        notYet: "ليس الآن",
      },
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال …",
      error: "حدث خطأ ما. يرجى المحاولة مجدداً.",
    },
  },

  thankYou: {
    headline: "شكراً لتقديم طلبك",
    body: "استلمنا بياناتك وسنتواصل معكِ في أقرب وقت بالخطوات القادمة.",
    backHome: "العودة إلى الصفحة الرئيسية",
  },

  legal: {
    placeholderBanner:
      "نص مؤقت — غير ملزم قانونياً. يجب مراجعة بيان الشركة (Impressum) وسياسة الخصوصية من جهة مختصة قبل نشر الموقع فعلياً.",
    impressumTitle: "بيان الشركة (Impressum)",
    impressumBody: "ستُضاف هنا البيانات المطلوبة قانونياً (الاسم، العنوان، بيانات التواصل، السجل التجاري/الرقم الضريبي عند الحاجة) بعد توفّر بيانات Zeinab التجارية ومراجعتها قانونياً.",
    datenschutzTitle: "سياسة الخصوصية",
    datenschutzBody: "ستُضاف هنا سياسة الخصوصية الكاملة المتوافقة مع GDPR بعد تحديد تدفّق البيانات الفعلي (النموذج، الحجز، الدفع، التحليلات) ومراجعته قانونياً.",
  },

  cookie: {
    message: "يستخدم هذا الموقع حالياً وظائف ضرورية فقط — دون ملفات تعريف ارتباط تحليلية أو تسويقية.",
    accept: "حسناً",
    decline: "رفض",
  },

  footer: {
    tagline: "LEGACY — العلامة الشخصية وتطوير الأعمال بقلم Seinab Dabbous",
    contactHeading: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

export default ar;
