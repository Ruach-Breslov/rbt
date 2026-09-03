export const locales = ["en", "he", "es", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDetails: Record<Locale, { label: string; nativeLabel: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr" },
  he: { label: "Hebrew", nativeLabel: "עברית", dir: "rtl" },
  es: { label: "Spanish", nativeLabel: "Español", dir: "ltr" },
  fa: { label: "Persian", nativeLabel: "فارسی", dir: "rtl" }
};

export type Dictionary = {
  siteName: string;
  siteTagline: string;
  languageLabel: string;
  system: {
    skipToContent: string;
    liveFoundation: string;
    fastFocusedGlobal: string;
    languagesReady: string;
    videoReady: string;
    staticBoundary: string;
    chooseTopic: string;
    recommendedDefault: string;
    backendRequired: string;
  };
  nav: {
    home: string;
    events: string;
    videos: string;
    contact: string;
    support: string;
  };
  actions: {
    exploreEvents: string;
    contactUs: string;
    watchVideos: string;
    rsvp: string;
    supportUs: string;
    submit: string;
    subscribe: string;
    close: string;
    openMenu: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    featureTitle: string;
    featureCopy: string;
    features: Array<{ title: string; copy: string }>;
    subscriptionTitle: string;
    subscriptionCopy: string;
  };
  events: {
    eyebrow: string;
    title: string;
    description: string;
    dateLabel: string;
    locationLabel: string;
    demoLabel: string;
    items: Record<string, { title: string; summary: string; location: string }>;
  };
  videos: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyCopy: string;
    quality: string;
    hdr: string;
    items: Array<{ title: string; description: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    detailsTitle: string;
    hoursTitle: string;
    hours: string;
    responseTitle: string;
    responseCopy: string;
    faqTitle: string;
    faqs: Array<{ question: string; answer: string }>;
  };
  support: {
    eyebrow: string;
    title: string;
    description: string;
    hostedTitle: string;
    hostedCopy: string;
    customTitle: string;
    customCopy: string;
    unavailable: string;
    secureNote: string;
    processingContext: string;
  };
  forms: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    reason: string;
    message: string;
    preferredLanguage: string;
    newsletter: string;
    eventUpdates: string;
    privacyConsent: string;
    event: string;
    guests: string;
    accessibility: string;
    success: string;
    subscriptionSuccess: string;
    unavailable: string;
    error: string;
    sending: string;
  };
  privacy: {
    title: string;
    intro: string;
    sections: Array<{ title: string; copy: string }>;
  };
  footer: {
    description: string;
    privacy: string;
    rights: string;
  };
};

const en: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "Bringing Rebbe Nachman’s timeless wisdom to life through faith, joy, personal growth, and meaningful connection.",
  languageLabel: "Language",
  system: {
    skipToContent: "Skip to content",
    liveFoundation: "Live foundation",
    fastFocusedGlobal: "Fast, focused, global",
    languagesReady: "languages ready",
    videoReady: "video-ready",
    staticBoundary: "Static-first · Multilingual · Secure service boundary",
    chooseTopic: "Select at least one option.",
    recommendedDefault: "Recommended default",
    backendRequired: "Secure backend required."
  },
  nav: { home: "Home", events: "Events", videos: "Videos", contact: "Contact", support: "Support" },
  actions: {
    exploreEvents: "Explore events",
    contactUs: "Contact us",
    watchVideos: "Watch videos",
    rsvp: "RSVP",
    supportUs: "Support us",
    submit: "Send message",
    subscribe: "Subscribe",
    close: "Close",
    openMenu: "Open menu"
  },
  home: {
    eyebrow: "The timeless wisdom of Rebbe Nachman",
    title: "Find hope. Grow with faith. Live with purpose.",
    description: "Ruach Breslov brings the timeless wisdom of Rebbe Nachman to life through faith, joy, personal growth, and meaningful connection. We create a welcoming space for people of all backgrounds to find hope, deepen their relationship with God, face life’s challenges with strength, and discover greater purpose, goodness, and meaning.",
    featureTitle: "Everything important, working together",
    featureCopy: "Start with a fast static website and connect only the services your organization needs.",
    features: [
      { title: "Events and RSVP", copy: "Publish upcoming programs and collect structured attendance requests." },
      { title: "Stories in motion", copy: "Build a privacy-aware YouTube library ready for 4K and HDR masters." },
      { title: "Meaningful contact", copy: "Route inquiries and subscription preferences through a secure email service." },
      { title: "Global by design", copy: "Serve English, Hebrew, Spanish, and Persian with proper reading direction." }
    ],
    subscriptionTitle: "Stay connected",
    subscriptionCopy: "Choose newsletters, event announcements, or both. You remain in control of your preferences."
  },
  events: {
    eyebrow: "Gather and participate",
    title: "Upcoming events",
    description: "A reusable event calendar with a focused RSVP experience for every program.",
    dateLabel: "Date and time",
    locationLabel: "Location",
    demoLabel: "Sample event",
    items: {
      "community-open-house": { title: "Community open house", summary: "Meet the team, explore the space, and learn what is coming next.", location: "Main venue" },
      "live-workshop": { title: "Live workshop", summary: "A practical, participatory session built around a shared topic.", location: "Studio room" },
      "annual-gathering": { title: "Annual gathering", summary: "An evening of conversation, stories, and community connection.", location: "Central hall" }
    }
  },
  videos: {
    eyebrow: "A library built to scale",
    title: "Video stories",
    description: "YouTube selects playback quality adaptively. When the source and device support it, viewers can use the player controls to select the highest available stream—up to 4K and HDR.",
    emptyTitle: "Your video library is ready",
    emptyCopy: "Add up to three YouTube video IDs in the environment configuration to populate this starter collection.",
    quality: "Highest available · up to 4K",
    hdr: "HDR-ready",
    items: [
      { title: "Featured story", description: "Use this position for the strongest introduction to your work." },
      { title: "From the community", description: "Share a conversation, profile, or recent program." },
      { title: "Ideas in depth", description: "Create a home for talks, classes, and long-form video." }
    ]
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Contact us",
    description: "Give visitors clear ways to reach the right person, ask a question, or begin a partnership.",
    detailsTitle: "Contact details",
    hoursTitle: "Office hours",
    hours: "Sunday–Thursday, 9:00–17:00",
    responseTitle: "What happens next",
    responseCopy: "Messages are routed securely to the configured team inbox. Set a realistic response-time expectation here.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { question: "How quickly will I hear back?", answer: "Replace this answer with your normal response time and urgent-contact guidance." },
      { question: "Can I visit in person?", answer: "Add your appointment policy, accessibility details, parking, and transit information here." },
      { question: "Who receives this form?", answer: "The secure form service sends each inquiry to the destination configured by the site owner." }
    ]
  },
  support: {
    eyebrow: "Secure, provider-hosted payments",
    title: "Support our work",
    description: "Keep card data away from the website by sending supporters to Stripe’s hosted checkout experience.",
    hostedTitle: "Stripe Payment Link",
    hostedCopy: "The recommended default for a static site: simple, reusable, and hosted entirely on Stripe’s payment page.",
    customTitle: "Custom Checkout Session",
    customCopy: "Optional for dynamic prices, inventory, or fulfillment. This mode requires a secure backend and verified webhooks.",
    unavailable: "Add a Stripe Payment Link to enable this option.",
    secureNote: "This website never asks for or stores payment-card details.",
    processingContext: "Payments are configured in {currency}; operational times use {timeZone} (U.S. Eastern Time)."
  },
  forms: {
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    organization: "Organization (optional)",
    reason: "How can we help?",
    message: "Message",
    preferredLanguage: "Preferred language",
    newsletter: "Newsletter",
    eventUpdates: "Event announcements",
    privacyConsent: "I agree to the privacy notice and consent to this submission.",
    event: "Event",
    guests: "Number of guests",
    accessibility: "Accessibility or dietary needs (optional)",
    success: "Thank you. Your request was received.",
    subscriptionSuccess: "Check your inbox and use the confirmation link within 24 hours to finish subscribing.",
    unavailable: "This form is ready but its secure API endpoint has not been configured.",
    error: "Something went wrong. Please try again or contact us directly.",
    sending: "Sending…"
  },
  privacy: {
    title: "Privacy notice",
    intro: "Replace this template notice with legal text reviewed for your organization, services, audience, and jurisdiction.",
    sections: [
      { title: "Information you provide", copy: "Contact, subscription, and RSVP forms may collect the fields shown at the time of submission." },
      { title: "How information is used", copy: "Use submitted information only to respond, manage attendance, and send communications the visitor requested." },
      { title: "Service providers", copy: "The configured email, payment, video, security, and hosting providers process limited data to deliver their services." },
      { title: "Your choices", copy: "Provide a working contact method for access, correction, deletion, and communication-preference requests." }
    ]
  },
  footer: {
    description: "Sharing Rebbe Nachman’s timeless wisdom through faith, joy, growth, and meaningful connection.",
    privacy: "Privacy",
    rights: "All rights reserved."
  }
};

const he: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "מביאים לחיים את חכמתו הנצחית של רבי נחמן באמצעות אמונה, שמחה, צמיחה אישית וחיבור משמעותי.",
  languageLabel: "שפה",
  system: {
    skipToContent: "דילוג לתוכן",
    liveFoundation: "תשתית פעילה",
    fastFocusedGlobal: "מהיר, ממוקד, גלובלי",
    languagesReady: "שפות מוכנות",
    videoReady: "מוכן לווידאו",
    staticBoundary: "סטטי תחילה · רב־לשוני · גבול שירות מאובטח",
    chooseTopic: "יש לבחור אפשרות אחת לפחות.",
    recommendedDefault: "ברירת מחדל מומלצת",
    backendRequired: "נדרש שרת מאובטח."
  },
  nav: { home: "בית", events: "אירועים", videos: "וידאו", contact: "יצירת קשר", support: "תמיכה" },
  actions: {
    exploreEvents: "לאירועים",
    contactUs: "צרו קשר",
    watchVideos: "לצפייה בסרטונים",
    rsvp: "אישור השתתפות",
    supportUs: "תמכו בנו",
    submit: "שליחת הודעה",
    subscribe: "הרשמה",
    close: "סגירה",
    openMenu: "פתיחת תפריט"
  },
  home: {
    eyebrow: "חכמתו הנצחית של רבי נחמן",
    title: "מוצאים תקווה. צומחים באמונה. חיים עם תכלית.",
    description: "Ruach Breslov מביאה לחיים את חכמתו הנצחית של רבי נחמן באמצעות אמונה, שמחה, צמיחה אישית וחיבור משמעותי. אנו יוצרים מרחב מזמין לאנשים מכל רקע כדי למצוא תקווה, להעמיק את הקשר שלהם עם ה׳, להתמודד בכוח עם אתגרי החיים ולגלות תכלית, טוב ומשמעות עמוקים יותר.",
    featureTitle: "כל מה שחשוב, מחובר יחד",
    featureCopy: "מתחילים באתר סטטי מהיר ומחברים רק את השירותים שהארגון צריך.",
    features: [
      { title: "אירועים ואישור הגעה", copy: "פרסום תוכניות קרובות ואיסוף בקשות השתתפות מסודרות." },
      { title: "סיפורים בתנועה", copy: "ספריית YouTube מודעת לפרטיות ומוכנה לתכני 4K ו‑HDR." },
      { title: "קשר משמעותי", copy: "ניתוב פניות והעדפות הרשמה דרך שירות דוא״ל מאובטח." },
      { title: "גלובלי מהיסוד", copy: "עברית, אנגלית, ספרדית ופרסית עם כיוון קריאה נכון." }
    ],
    subscriptionTitle: "נשארים מחוברים",
    subscriptionCopy: "בחרו עדכונים, הודעות על אירועים או את שניהם. השליטה בהעדפות נשארת בידיכם."
  },
  events: {
    eyebrow: "נפגשים ומשתתפים",
    title: "אירועים קרובים",
    description: "לוח אירועים רב־שימושי עם חוויית הרשמה ממוקדת לכל תוכנית.",
    dateLabel: "תאריך ושעה",
    locationLabel: "מיקום",
    demoLabel: "אירוע לדוגמה",
    items: {
      "community-open-house": { title: "בית פתוח לקהילה", summary: "פגשו את הצוות, הכירו את המקום ושמעו מה צפוי בהמשך.", location: "האולם הראשי" },
      "live-workshop": { title: "סדנה חיה", summary: "מפגש מעשי ומשתף סביב נושא משותף.", location: "חדר הסטודיו" },
      "annual-gathering": { title: "המפגש השנתי", summary: "ערב של שיחה, סיפורים וחיבור קהילתי.", location: "האולם המרכזי" }
    }
  },
  videos: {
    eyebrow: "ספרייה שנועדה לצמוח",
    title: "סיפורים בווידאו",
    description: "YouTube בוחר את איכות הניגון באופן מסתגל. כאשר המקור והמכשיר תומכים בכך, ניתן לבחור בהגדרות הנגן את האיכות הגבוהה ביותר הזמינה — עד 4K ו‑HDR.",
    emptyTitle: "ספריית הווידאו מוכנה",
    emptyCopy: "הוסיפו עד שלושה מזהי YouTube בהגדרות הסביבה כדי למלא את האוסף הראשוני.",
    quality: "האיכות הגבוהה ביותר · עד 4K",
    hdr: "מוכן ל‑HDR",
    items: [
      { title: "סיפור מרכזי", description: "המקום להצגה החזקה ביותר של העשייה שלכם." },
      { title: "מתוך הקהילה", description: "שתפו שיחה, פרופיל או תוכנית מהזמן האחרון." },
      { title: "רעיונות לעומק", description: "בית להרצאות, שיעורים ווידאו ארוך." }
    ]
  },
  contact: {
    eyebrow: "מתחילים בשיחה",
    title: "יצירת קשר",
    description: "הציעו למבקרים דרך ברורה להגיע לאדם הנכון, לשאול שאלה או להתחיל שותפות.",
    detailsTitle: "פרטי קשר",
    hoursTitle: "שעות פעילות",
    hours: "ראשון–חמישי, 9:00–17:00",
    responseTitle: "מה קורה לאחר השליחה",
    responseCopy: "ההודעות מנותבות באופן מאובטח לתיבת הצוות שהוגדרה. ציינו כאן זמן תגובה מציאותי.",
    faqTitle: "שאלות נפוצות",
    faqs: [
      { question: "תוך כמה זמן אקבל תשובה?", answer: "החליפו תשובה זו בזמן התגובה הרגיל ובהנחיות לפנייה דחופה." },
      { question: "אפשר להגיע לביקור?", answer: "הוסיפו מדיניות תיאום, מידע על נגישות, חניה ותחבורה." },
      { question: "מי מקבל את הטופס?", answer: "שירות הטפסים המאובטח שולח כל פנייה ליעד שהגדיר בעל האתר." }
    ]
  },
  support: {
    eyebrow: "תשלומים מאובטחים בעמוד הספק",
    title: "תמכו בעשייה שלנו",
    description: "פרטי הכרטיס נשארים מחוץ לאתר באמצעות מעבר לחוויית התשלום המאובטחת של Stripe.",
    hostedTitle: "קישור תשלום של Stripe",
    hostedCopy: "ברירת המחדל המומלצת לאתר סטטי: פשוטה, רב־פעמית ומתארחת כולה בעמוד התשלום של Stripe.",
    customTitle: "Checkout מותאם",
    customCopy: "אפשרות למחירים דינמיים, מלאי או אספקה. מצב זה דורש שרת מאובטח ו‑webhooks מאומתים.",
    unavailable: "הוסיפו קישור תשלום של Stripe כדי להפעיל אפשרות זו.",
    secureNote: "האתר אינו מבקש ואינו שומר פרטי כרטיס.",
    processingContext: "התשלומים מוגדרים ב־{currency}; זמני התפעול משתמשים באזור {timeZone} (שעון מזרח ארה״ב)."
  },
  forms: {
    name: "שם",
    email: "דוא״ל",
    phone: "טלפון (לא חובה)",
    organization: "ארגון (לא חובה)",
    reason: "כיצד נוכל לעזור?",
    message: "הודעה",
    preferredLanguage: "שפה מועדפת",
    newsletter: "עדכונים",
    eventUpdates: "הודעות על אירועים",
    privacyConsent: "קראתי את הודעת הפרטיות ואני מסכים/ה לשליחה.",
    event: "אירוע",
    guests: "מספר משתתפים",
    accessibility: "צורכי נגישות או תזונה (לא חובה)",
    success: "תודה. הבקשה התקבלה.",
    subscriptionSuccess: "בדקו את תיבת הדואר והשלימו את ההרשמה באמצעות קישור האישור בתוך 24 שעות.",
    unavailable: "הטופס מוכן, אך נקודת הקצה המאובטחת טרם הוגדרה.",
    error: "אירעה תקלה. נסו שוב או פנו אלינו ישירות.",
    sending: "שולח…"
  },
  privacy: {
    title: "הודעת פרטיות",
    intro: "יש להחליף הודעה זו בנוסח משפטי שנבדק עבור הארגון, השירותים, הקהל ותחומי השיפוט שלכם.",
    sections: [
      { title: "מידע שנמסר", copy: "טפסי קשר, הרשמה ואישור הגעה עשויים לאסוף את השדות המוצגים בעת השליחה." },
      { title: "שימוש במידע", copy: "יש להשתמש במידע רק למענה, לניהול השתתפות ולשליחת תקשורת שהתבקשה." },
      { title: "ספקי שירות", copy: "ספקי דוא״ל, תשלום, וידאו, אבטחה ואחסון מעבדים מידע מוגבל לצורך אספקת השירות." },
      { title: "הבחירות שלכם", copy: "יש לספק דרך פעילה לבקשות גישה, תיקון, מחיקה ושינוי העדפות תקשורת." }
    ]
  },
  footer: {
    description: "משתפים את חכמתו הנצחית של רבי נחמן באמצעות אמונה, שמחה, צמיחה וחיבור משמעותי.",
    privacy: "פרטיות",
    rights: "כל הזכויות שמורות."
  }
};

const es: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "Damos vida a la sabiduría atemporal del Rebe Najmán por medio de la fe, la alegría, el crecimiento personal y vínculos significativos.",
  languageLabel: "Idioma",
  system: {
    skipToContent: "Saltar al contenido",
    liveFoundation: "Base activa",
    fastFocusedGlobal: "Rápida, enfocada y global",
    languagesReady: "idiomas preparados",
    videoReady: "lista para video",
    staticBoundary: "Estática primero · Multilingüe · Servicios seguros",
    chooseTopic: "Selecciona al menos una opción.",
    recommendedDefault: "Opción recomendada",
    backendRequired: "Se requiere un servidor seguro."
  },
  nav: { home: "Inicio", events: "Eventos", videos: "Videos", contact: "Contacto", support: "Apoyar" },
  actions: {
    exploreEvents: "Explorar eventos",
    contactUs: "Contáctanos",
    watchVideos: "Ver videos",
    rsvp: "Confirmar asistencia",
    supportUs: "Apóyanos",
    submit: "Enviar mensaje",
    subscribe: "Suscribirme",
    close: "Cerrar",
    openMenu: "Abrir menú"
  },
  home: {
    eyebrow: "La sabiduría atemporal del Rebe Najmán",
    title: "Encuentra esperanza. Crece con fe. Vive con propósito.",
    description: "Ruach Breslov da vida a la sabiduría atemporal del Rebe Najmán por medio de la fe, la alegría, el crecimiento personal y vínculos significativos. Creamos un espacio acogedor para que personas de todos los orígenes encuentren esperanza, profundicen su relación con Dios, afronten con fortaleza los desafíos de la vida y descubran un mayor propósito, bondad y sentido.",
    featureTitle: "Todo lo importante, trabajando en conjunto",
    featureCopy: "Comienza con un sitio estático rápido y conecta solo los servicios que tu organización necesita.",
    features: [
      { title: "Eventos y asistencia", copy: "Publica programas y recopila solicitudes de asistencia estructuradas." },
      { title: "Historias en movimiento", copy: "Crea una videoteca de YouTube preparada para fuentes 4K y HDR." },
      { title: "Contacto significativo", copy: "Canaliza consultas y preferencias mediante un servicio de correo seguro." },
      { title: "Global desde el inicio", copy: "Ofrece inglés, hebreo, español y persa con la dirección de lectura adecuada." }
    ],
    subscriptionTitle: "Mantente al día",
    subscriptionCopy: "Elige boletines, anuncios de eventos o ambos. Tú mantienes el control de tus preferencias."
  },
  events: {
    eyebrow: "Reúnete y participa",
    title: "Próximos eventos",
    description: "Un calendario reutilizable con una experiencia de confirmación clara para cada programa.",
    dateLabel: "Fecha y hora",
    locationLabel: "Lugar",
    demoLabel: "Evento de muestra",
    items: {
      "community-open-house": { title: "Jornada de puertas abiertas", summary: "Conoce al equipo, recorre el espacio y descubre lo que viene.", location: "Sede principal" },
      "live-workshop": { title: "Taller en vivo", summary: "Una sesión práctica y participativa en torno a un tema común.", location: "Sala de estudio" },
      "annual-gathering": { title: "Encuentro anual", summary: "Una noche de conversación, historias y conexión comunitaria.", location: "Salón central" }
    }
  },
  videos: {
    eyebrow: "Una videoteca preparada para crecer",
    title: "Historias en video",
    description: "YouTube selecciona la calidad de forma adaptativa. Cuando la fuente y el dispositivo lo permiten, el público puede elegir en el reproductor la máxima calidad disponible, hasta 4K y HDR.",
    emptyTitle: "Tu videoteca está lista",
    emptyCopy: "Añade hasta tres identificadores de YouTube en la configuración del entorno para completar esta colección inicial.",
    quality: "Máxima disponible · hasta 4K",
    hdr: "Preparado para HDR",
    items: [
      { title: "Historia destacada", description: "Utiliza este espacio para presentar tu trabajo con mayor fuerza." },
      { title: "Desde la comunidad", description: "Comparte una conversación, un perfil o un programa reciente." },
      { title: "Ideas en profundidad", description: "Un hogar para charlas, clases y videos de larga duración." }
    ]
  },
  contact: {
    eyebrow: "Inicia una conversación",
    title: "Contáctanos",
    description: "Ofrece formas claras de llegar a la persona adecuada, hacer una pregunta o iniciar una colaboración.",
    detailsTitle: "Datos de contacto",
    hoursTitle: "Horario de atención",
    hours: "Domingo–jueves, 9:00–17:00",
    responseTitle: "Qué sucede después",
    responseCopy: "Los mensajes se envían de forma segura al buzón configurado. Indica aquí un plazo de respuesta realista.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { question: "¿Cuándo recibiré una respuesta?", answer: "Sustituye esta respuesta por el plazo habitual y las instrucciones para asuntos urgentes." },
      { question: "¿Puedo visitar en persona?", answer: "Añade la política de citas, accesibilidad, estacionamiento y transporte." },
      { question: "¿Quién recibe este formulario?", answer: "El servicio seguro envía cada consulta al destino configurado por el propietario del sitio." }
    ]
  },
  support: {
    eyebrow: "Pagos seguros alojados por el proveedor",
    title: "Apoya nuestro trabajo",
    description: "Mantén los datos de tarjeta fuera del sitio enviando a las personas a la experiencia alojada de Stripe.",
    hostedTitle: "Enlace de pago de Stripe",
    hostedCopy: "La opción predeterminada recomendada para un sitio estático: simple, reutilizable y alojada por Stripe.",
    customTitle: "Sesión de Checkout personalizada",
    customCopy: "Opcional para precios dinámicos, inventario o entregas. Requiere un servidor seguro y webhooks verificados.",
    unavailable: "Añade un enlace de pago de Stripe para activar esta opción.",
    secureNote: "Este sitio nunca solicita ni almacena datos de tarjetas.",
    processingContext: "Los pagos se configuran en {currency}; los horarios operativos usan {timeZone} (hora del este de EE. UU.)."
  },
  forms: {
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    organization: "Organización (opcional)",
    reason: "¿Cómo podemos ayudarte?",
    message: "Mensaje",
    preferredLanguage: "Idioma preferido",
    newsletter: "Boletín",
    eventUpdates: "Anuncios de eventos",
    privacyConsent: "Acepto el aviso de privacidad y doy mi consentimiento para este envío.",
    event: "Evento",
    guests: "Número de asistentes",
    accessibility: "Necesidades de accesibilidad o alimentación (opcional)",
    success: "Gracias. Recibimos tu solicitud.",
    subscriptionSuccess: "Revisa tu correo y utiliza el enlace de confirmación en un plazo de 24 horas para completar la suscripción.",
    unavailable: "El formulario está listo, pero aún no se configuró su API segura.",
    error: "Algo salió mal. Inténtalo de nuevo o contáctanos directamente.",
    sending: "Enviando…"
  },
  privacy: {
    title: "Aviso de privacidad",
    intro: "Sustituye este aviso por un texto legal revisado para tu organización, servicios, público y jurisdicción.",
    sections: [
      { title: "Información que proporcionas", copy: "Los formularios pueden recopilar los campos mostrados al momento del envío." },
      { title: "Cómo se utiliza", copy: "Utiliza la información solo para responder, gestionar asistencia y enviar comunicaciones solicitadas." },
      { title: "Proveedores", copy: "Los proveedores de correo, pagos, video, seguridad y alojamiento procesan datos limitados para prestar sus servicios." },
      { title: "Tus opciones", copy: "Ofrece un medio operativo para solicitudes de acceso, corrección, eliminación y preferencias." }
    ]
  },
  footer: {
    description: "Compartimos la sabiduría atemporal del Rebe Najmán mediante la fe, la alegría, el crecimiento y vínculos significativos.",
    privacy: "Privacidad",
    rights: "Todos los derechos reservados."
  }
};

const fa: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "حکمت جاودانۀ ربی نحمان را از راه ایمان، شادی، رشد فردی و پیوندی معنادار زنده می‌کنیم.",
  languageLabel: "زبان",
  system: {
    skipToContent: "رفتن به محتوا",
    liveFoundation: "زیرساخت فعال",
    fastFocusedGlobal: "سریع، متمرکز و جهانی",
    languagesReady: "زبان آماده",
    videoReady: "آماده ویدیو",
    staticBoundary: "ایستا در اولویت · چندزبانه · مرز خدمات امن",
    chooseTopic: "حداقل یک گزینه را انتخاب کنید.",
    recommendedDefault: "گزینه پیشنهادی",
    backendRequired: "سرور امن لازم است."
  },
  nav: { home: "خانه", events: "رویدادها", videos: "ویدیوها", contact: "تماس", support: "حمایت" },
  actions: {
    exploreEvents: "مشاهده رویدادها",
    contactUs: "تماس با ما",
    watchVideos: "تماشای ویدیوها",
    rsvp: "ثبت حضور",
    supportUs: "حمایت کنید",
    submit: "ارسال پیام",
    subscribe: "عضویت",
    close: "بستن",
    openMenu: "باز کردن منو"
  },
  home: {
    eyebrow: "حکمت جاودانۀ ربی نحمان",
    title: "امید را بیابید. با ایمان رشد کنید. هدفمند زندگی کنید.",
    description: "Ruach Breslov حکمت جاودانۀ ربی نحمان را از راه ایمان، شادی، رشد فردی و پیوندی معنادار زنده می‌کند. ما فضایی پذیرا برای افراد با هر پیشینه‌ای فراهم می‌کنیم تا امید بیابند، رابطۀ خود با خدا را عمیق‌تر کنند، با قدرت با چالش‌های زندگی روبه‌رو شوند و هدف، نیکی و معنای بیشتری کشف کنند.",
    featureTitle: "همه چیز مهم، در کنار هم",
    featureCopy: "با یک وب‌سایت ایستای سریع آغاز کنید و فقط خدمات مورد نیاز را متصل کنید.",
    features: [
      { title: "رویداد و ثبت حضور", copy: "برنامه‌های آینده را منتشر و درخواست‌های حضور را منظم جمع‌آوری کنید." },
      { title: "روایت‌های تصویری", copy: "کتابخانه YouTube سازگار با حریم خصوصی و آماده محتوای 4K و HDR بسازید." },
      { title: "ارتباط معنادار", copy: "پیام‌ها و ترجیحات عضویت را از راه یک سرویس ایمیل امن هدایت کنید." },
      { title: "جهانی از ابتدا", copy: "انگلیسی، عبری، اسپانیایی و فارسی با جهت نوشتار درست." }
    ],
    subscriptionTitle: "در ارتباط بمانید",
    subscriptionCopy: "خبرنامه، اطلاعیه رویدادها یا هر دو را انتخاب کنید. کنترل ترجیحات در اختیار شماست."
  },
  events: {
    eyebrow: "گردهمایی و مشارکت",
    title: "رویدادهای پیش رو",
    description: "تقویم رویداد قابل استفاده مجدد با تجربه ثبت حضور روشن برای هر برنامه.",
    dateLabel: "تاریخ و زمان",
    locationLabel: "مکان",
    demoLabel: "رویداد نمونه",
    items: {
      "community-open-house": { title: "روز باز جامعه", summary: "با تیم آشنا شوید، فضا را ببینید و از برنامه‌های آینده باخبر شوید.", location: "محل اصلی" },
      "live-workshop": { title: "کارگاه زنده", summary: "جلسه‌ای عملی و مشارکتی پیرامون یک موضوع مشترک.", location: "اتاق کارگاه" },
      "annual-gathering": { title: "گردهمایی سالانه", summary: "شبی برای گفت‌وگو، داستان و پیوند اجتماعی.", location: "تالار مرکزی" }
    }
  },
  videos: {
    eyebrow: "کتابخانه‌ای برای رشد",
    title: "داستان‌های ویدیویی",
    description: "YouTube کیفیت پخش را به‌صورت تطبیقی انتخاب می‌کند. اگر منبع و دستگاه پشتیبانی کنند، بیننده می‌تواند بالاترین کیفیت موجود، تا 4K و HDR، را از تنظیمات پخش‌کننده انتخاب کند.",
    emptyTitle: "کتابخانه ویدیویی آماده است",
    emptyCopy: "برای تکمیل مجموعه آغازین، حداکثر سه شناسه YouTube را در تنظیمات محیط وارد کنید.",
    quality: "بالاترین کیفیت موجود · تا 4K",
    hdr: "آماده HDR",
    items: [
      { title: "داستان ویژه", description: "این بخش را به بهترین معرفی از فعالیت خود اختصاص دهید." },
      { title: "از دل جامعه", description: "یک گفت‌وگو، معرفی یا برنامه تازه را به اشتراک بگذارید." },
      { title: "ایده‌های عمیق", description: "جایی برای سخنرانی، کلاس و ویدیوهای بلند." }
    ]
  },
  contact: {
    eyebrow: "گفت‌وگو را آغاز کنید",
    title: "تماس با ما",
    description: "راهی روشن برای پرسش، ارتباط با فرد مناسب یا آغاز همکاری فراهم کنید.",
    detailsTitle: "اطلاعات تماس",
    hoursTitle: "ساعات کاری",
    hours: "یکشنبه تا پنج‌شنبه، ۹:۰۰ تا ۱۷:۰۰",
    responseTitle: "پس از ارسال چه می‌شود",
    responseCopy: "پیام‌ها به‌صورت امن به صندوق تیم پیکربندی‌شده می‌رسند. زمان پاسخ واقعی را اینجا بنویسید.",
    faqTitle: "پرسش‌های متداول",
    faqs: [
      { question: "چه زمانی پاسخ می‌گیرم؟", answer: "این پاسخ را با زمان معمول و راهنمای تماس فوری جایگزین کنید." },
      { question: "آیا می‌توانم حضوری مراجعه کنم؟", answer: "سیاست وقت قبلی، دسترس‌پذیری، پارکینگ و حمل‌ونقل را اضافه کنید." },
      { question: "چه کسی فرم را دریافت می‌کند؟", answer: "سرویس امن، هر پیام را به مقصد تعیین‌شده توسط مالک سایت می‌فرستد." }
    ]
  },
  support: {
    eyebrow: "پرداخت امن در صفحه میزبان",
    title: "از کار ما حمایت کنید",
    description: "با هدایت حامیان به صفحه پرداخت Stripe، اطلاعات کارت را از وب‌سایت دور نگه دارید.",
    hostedTitle: "لینک پرداخت Stripe",
    hostedCopy: "گزینه پیش‌فرض پیشنهادی برای سایت ایستا: ساده، قابل استفاده مجدد و میزبانی‌شده توسط Stripe.",
    customTitle: "نشست Checkout سفارشی",
    customCopy: "برای قیمت پویا، موجودی یا تحویل. این حالت به سرور امن و webhook تأییدشده نیاز دارد.",
    unavailable: "برای فعال‌سازی، لینک پرداخت Stripe را اضافه کنید.",
    secureNote: "این وب‌سایت هرگز اطلاعات کارت را درخواست یا ذخیره نمی‌کند.",
    processingContext: "پرداخت‌ها با {currency} تنظیم شده‌اند؛ زمان‌های عملیاتی از {timeZone} (وقت شرقی آمریکا) استفاده می‌کنند."
  },
  forms: {
    name: "نام",
    email: "ایمیل",
    phone: "تلفن (اختیاری)",
    organization: "سازمان (اختیاری)",
    reason: "چگونه می‌توانیم کمک کنیم؟",
    message: "پیام",
    preferredLanguage: "زبان ترجیحی",
    newsletter: "خبرنامه",
    eventUpdates: "اطلاعیه رویدادها",
    privacyConsent: "با اطلاعیه حریم خصوصی و ارسال این فرم موافقم.",
    event: "رویداد",
    guests: "تعداد مهمانان",
    accessibility: "نیازهای دسترس‌پذیری یا غذایی (اختیاری)",
    success: "سپاسگزاریم. درخواست شما دریافت شد.",
    subscriptionSuccess: "صندوق ورودی خود را بررسی کنید و برای تکمیل عضویت، ظرف 24 ساعت از پیوند تأیید استفاده کنید.",
    unavailable: "فرم آماده است، اما نشانی API امن هنوز تنظیم نشده است.",
    error: "مشکلی پیش آمد. دوباره تلاش کنید یا مستقیم تماس بگیرید.",
    sending: "در حال ارسال…"
  },
  privacy: {
    title: "اطلاعیه حریم خصوصی",
    intro: "این متن نمونه را با متن حقوقی متناسب با سازمان، خدمات، مخاطبان و حوزه قضایی خود جایگزین کنید.",
    sections: [
      { title: "اطلاعات ارسالی", copy: "فرم‌های تماس، عضویت و ثبت حضور ممکن است فیلدهای نمایش‌داده‌شده را جمع‌آوری کنند." },
      { title: "نحوه استفاده", copy: "از اطلاعات فقط برای پاسخ، مدیریت حضور و ارسال ارتباطات درخواستی استفاده کنید." },
      { title: "ارائه‌دهندگان خدمات", copy: "ارائه‌دهندگان ایمیل، پرداخت، ویدیو، امنیت و میزبانی داده محدودی را پردازش می‌کنند." },
      { title: "انتخاب‌های شما", copy: "راه ارتباطی فعالی برای دسترسی، اصلاح، حذف و تغییر ترجیحات ارائه دهید." }
    ]
  },
  footer: {
    description: "حکمت جاودانۀ ربی نحمان را با ایمان، شادی، رشد و پیوندی معنادار به اشتراک می‌گذاریم.",
    privacy: "حریم خصوصی",
    rights: "همه حقوق محفوظ است."
  }
};

const dictionaries: Record<Locale, Dictionary> = { en, he, es, fa };

const configuredSiteNames: Partial<Record<Locale, string>> = {
  en: process.env.NEXT_PUBLIC_ORGANIZATION_NAME_EN?.trim(),
  he: process.env.NEXT_PUBLIC_ORGANIZATION_NAME_HE?.trim(),
  es: process.env.NEXT_PUBLIC_ORGANIZATION_NAME_ES?.trim(),
  fa: process.env.NEXT_PUBLIC_ORGANIZATION_NAME_FA?.trim()
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  const dictionary = dictionaries[locale];
  const configuredSiteName = configuredSiteNames[locale];
  return configuredSiteName ? { ...dictionary, siteName: configuredSiteName } : dictionary;
}

export function localeHref(locale: Locale, path = "") {
  const normalizedPath = path && path !== "/" ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return `/${locale}${normalizedPath}`;
}
