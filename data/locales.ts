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
    gallery: string;
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
    viewGallery: string;
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
    storyEyebrow: string;
    storyTitle: string;
    storyParagraphs: string[];
    galleryEyebrow: string;
    galleryTitle: string;
    galleryCopy: string;
    subscriptionTitle: string;
    subscriptionCopy: string;
  };
  events: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyCopy: string;
    dateLabel: string;
    locationLabel: string;
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
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    openImage: string;
    previous: string;
    next: string;
    lightboxDescription: string;
    clipsEyebrow: string;
    clipsTitle: string;
    clipsCopy: string;
    captions: Record<"study" | "gathering" | "hospitality" | "teaching" | "video", string>;
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
    oneTimeCta: string;
    monthlyCta: string;
    monthlyLabel: string;
    monthlyDisclosure: string;
    manageMonthlyCta: string;
    impactTitle: string;
    impactItems: string[];
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
    liveFoundation: "Ruach Breslov",
    fastFocusedGlobal: "Faith, joy, and purpose",
    languagesReady: "languages",
    videoReady: "at the heart",
    staticBoundary: "Faith · Joy · Personal growth · Meaningful connection",
    chooseTopic: "Select at least one option.",
    recommendedDefault: "Recommended default",
    backendRequired: "Secure backend required."
  },
  nav: { home: "Home", events: "Events", gallery: "Gallery", videos: "Videos", contact: "Contact", support: "Support" },
  actions: {
    exploreEvents: "Explore events",
    contactUs: "Contact us",
    watchVideos: "Watch videos",
    rsvp: "RSVP",
    supportUs: "Support us",
    submit: "Send message",
    subscribe: "Subscribe",
    viewGallery: "View the gallery",
    close: "Close",
    openMenu: "Open menu"
  },
  home: {
    eyebrow: "The timeless wisdom of Rebbe Nachman",
    title: "Find hope. Grow with faith. Live with purpose.",
    description: "Ruach Breslov brings the timeless wisdom of Rebbe Nachman to life through faith, joy, personal growth, and meaningful connection. We create a welcoming space for people of all backgrounds to find hope, deepen their relationship with God, face life’s challenges with strength, and discover greater purpose, goodness, and meaning.",
    featureTitle: "More than a class—a community that grows together",
    featureCopy: "Our gatherings bring Torah to life through emunah, joy, honesty, friendship, and real connection.",
    features: [
      { title: "Weekly Torah classes", copy: "Inspiring gatherings centered on Rebbe Nachman’s teachings, personal growth, connection, and simcha." },
      { title: "One-on-one mentorship", copy: "Personal guidance and encouragement for anyone seeking direction or someone to walk alongside." },
      { title: "Community events", copy: "Food, music, learning, and friendship come together to create a meaningful Jewish experience." },
      { title: "Guest speakers and outreach", copy: "Fresh Torah perspectives and a welcoming hand for people seeking connection and encouragement." }
    ],
    storyEyebrow: "Our legacy of light",
    storyTitle: "A place to belong, exactly as you are.",
    storyParagraphs: [
      "What began as a small gathering has grown into a real brotherhood built on Torah, honesty, friendship, and the belief that no one should feel alone in their struggle.",
      "Inspired by Rebbe Nachman, we believe every soul carries immeasurable light—even when that light feels hidden. Sometimes the right Torah, friend, or conversation can remind a person who they truly are."
    ],
    galleryEyebrow: "Inside the community",
    galleryTitle: "Learning, friendship, and joy in the room",
    galleryCopy: "See Ruach Breslov as it happens: people learning together, sharing a table, and building lasting connection.",
    subscriptionTitle: "Stay connected",
    subscriptionCopy: "Choose newsletters, event announcements, or both. You remain in control of your preferences."
  },
  events: {
    eyebrow: "Gather and participate",
    title: "Upcoming events",
    description: "Confirmed Ruach Breslov gatherings and programs will be shared here.",
    emptyTitle: "No events are currently scheduled",
    emptyCopy: "Subscribe to event announcements or contact us to hear when the next gathering is announced.",
    dateLabel: "Date and time",
    locationLabel: "Location",
    items: {}
  },
  videos: {
    eyebrow: "Teachings and inspiration",
    title: "Ruach Breslov videos",
    description: "Official video teachings and stories from Ruach Breslov will be collected here.",
    emptyTitle: "Videos are coming soon",
    emptyCopy: "Stay connected for new teachings, conversations, and community stories.",
    quality: "Highest available · up to 4K",
    hdr: "HDR-ready",
    items: [
      { title: "Featured story", description: "Use this position for the strongest introduction to your work." },
      { title: "From the community", description: "Share a conversation, profile, or recent program." },
      { title: "Ideas in depth", description: "Create a home for talks, classes, and long-form video." }
    ]
  },
  gallery: {
    eyebrow: "Life at Ruach Breslov",
    title: "Community gallery",
    description: "A glimpse into weekly Torah learning, shared meals, friendship, and the living community growing in Queens.",
    openImage: "Open image",
    previous: "Previous image",
    next: "Next image",
    lightboxDescription: "Expanded community photograph. Use the previous and next buttons or arrow keys to browse.",
    clipsEyebrow: "Moments in motion",
    clipsTitle: "Short community clips",
    clipsCopy: "Silent glimpses from recent gatherings and study sessions.",
    captions: {
      study: "Learning Torah together around an open text",
      gathering: "A full room gathered for Torah and connection",
      hospitality: "Food and hospitality prepared for the community",
      teaching: "A teaching shared during a Ruach Breslov gathering",
      video: "A short silent clip from a Ruach Breslov gathering"
    }
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Contact us",
    description: "Ask a question, learn more about Ruach Breslov, or begin a conversation with our team.",
    detailsTitle: "Contact details",
    hoursTitle: "Visiting",
    hours: "Please contact us before planning an in-person visit.",
    responseTitle: "What happens next",
    responseCopy: "Messages are sent securely to the Ruach Breslov team. We will respond as soon as we can.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { question: "How quickly will I hear back?", answer: "We review messages and respond as soon as we can. For a direct inquiry, email info@ruachbreslov.org or call 917-740-4509." },
      { question: "Can I visit in person?", answer: "Please contact us in advance so we can confirm availability and share current visiting information." },
      { question: "Who receives this form?", answer: "Your inquiry is delivered securely to the Ruach Breslov team at info@ruachbreslov.org." }
    ]
  },
  support: {
    eyebrow: "Help Ruach Breslov grow",
    title: "Support our work",
    description: "Your encouragement and support help Ruach Breslov share faith, joy, and the wisdom of Rebbe Nachman.",
    hostedTitle: "Make a one-time donation",
    hostedCopy: "Choose the amount that feels right and complete your donation securely on Stripe.",
    customTitle: "Become a monthly supporter",
    customCopy: "Recurring support gives classes, hospitality, speakers, and outreach a dependable foundation.",
    unavailable: "Online contributions are not currently available. Please contact us if you would like to support Ruach Breslov.",
    oneTimeCta: "Choose a one-time amount",
    monthlyCta: "Give {amount} monthly",
    monthlyLabel: "per month",
    monthlyDisclosure: "Monthly donations renew automatically each month until canceled. You can manage or cancel through Stripe or by contacting Ruach Breslov.",
    manageMonthlyCta: "Manage monthly support",
    impactTitle: "Your support helps provide",
    impactItems: ["Weekly Torah classes", "Food and hospitality", "Inspiring guest speakers", "Community events and outreach"],
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
    intro: "Last updated September 4, 2026. This notice explains how Ruach Breslov handles information submitted through this website.",
    sections: [
      { title: "Information you provide", copy: "The contact form collects your name, email address, message, and any optional details you choose to provide. Subscription forms collect your name, email address, and selected communication topics." },
      { title: "How we use information", copy: "We use submitted information to answer inquiries, protect the forms from abuse, confirm subscription requests, and send only the communications you requested." },
      { title: "Service providers", copy: "GitHub Pages hosts the website. Cloudflare provides DNS, API hosting, database services, and Turnstile security. Resend delivers email and manages confirmed subscriptions. Stripe securely processes donations and recurring payment details on its hosted pages. These providers process information only as needed to provide those services." },
      { title: "Retention and security", copy: "Contact messages are delivered by email and are not stored in the website database. Unconfirmed subscription requests expire after 24 hours. Confirmed subscription details remain with Resend until you unsubscribe or request deletion. Limited security records are retained to prevent abuse." },
      { title: "Your choices", copy: "You can unsubscribe using links in our emails. To request access, correction, or deletion of information you submitted, contact info@ruachbreslov.org." }
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
    liveFoundation: "Ruach Breslov",
    fastFocusedGlobal: "אמונה, שמחה ותכלית",
    languagesReady: "שפות",
    videoReady: "בלב העשייה",
    staticBoundary: "אמונה · שמחה · צמיחה אישית · חיבור משמעותי",
    chooseTopic: "יש לבחור אפשרות אחת לפחות.",
    recommendedDefault: "ברירת מחדל מומלצת",
    backendRequired: "נדרש שרת מאובטח."
  },
  nav: { home: "בית", events: "אירועים", gallery: "גלריה", videos: "וידאו", contact: "יצירת קשר", support: "תמיכה" },
  actions: {
    exploreEvents: "לאירועים",
    contactUs: "צרו קשר",
    watchVideos: "לצפייה בסרטונים",
    rsvp: "אישור השתתפות",
    supportUs: "תמכו בנו",
    submit: "שליחת הודעה",
    subscribe: "הרשמה",
    viewGallery: "לצפייה בגלריה",
    close: "סגירה",
    openMenu: "פתיחת תפריט"
  },
  home: {
    eyebrow: "חכמתו הנצחית של רבי נחמן",
    title: "מוצאים תקווה. צומחים באמונה. חיים עם תכלית.",
    description: "Ruach Breslov מביאה לחיים את חכמתו הנצחית של רבי נחמן באמצעות אמונה, שמחה, צמיחה אישית וחיבור משמעותי. אנו יוצרים מרחב מזמין לאנשים מכל רקע כדי למצוא תקווה, להעמיק את הקשר שלהם עם ה׳, להתמודד בכוח עם אתגרי החיים ולגלות תכלית, טוב ומשמעות עמוקים יותר.",
    featureTitle: "יותר משיעור — קהילה שצומחת יחד",
    featureCopy: "המפגשים שלנו מחיים את התורה באמונה, שמחה, כנות, חברות וחיבור אמיתי.",
    features: [
      { title: "שיעורי תורה שבועיים", copy: "מפגשים מעוררי השראה סביב תורת רבי נחמן, צמיחה אישית, חיבור ושמחה." },
      { title: "ליווי אישי", copy: "הכוונה ועידוד אישיים למי שמחפש דרך, תמיכה או מישהו שיצעד לצדו." },
      { title: "אירועי קהילה", copy: "אוכל, מוזיקה, לימוד וחברות מתחברים לחוויה יהודית משמעותית." },
      { title: "מרצים אורחים וקירוב", copy: "נקודות מבט חדשות בתורה ויד מושטת למי שמחפש חיבור ועידוד." }
    ],
    storyEyebrow: "מורשת של אור",
    storyTitle: "מקום להשתייך אליו, בדיוק כפי שאתם.",
    storyParagraphs: [
      "מה שהתחיל כמפגש קטן צמח לאחווה אמיתית הבנויה על תורה, כנות, חברות והאמונה שאיש אינו צריך להרגיש לבד במאבק שלו.",
      "בהשראת רבי נחמן אנו מאמינים שבכל נשמה יש אור שאין לו שיעור, גם כשהוא נסתר. לפעמים התורה הנכונה, החבר הנכון או שיחה אמיתית מזכירים לאדם מי הוא באמת."
    ],
    galleryEyebrow: "בתוך הקהילה",
    galleryTitle: "לימוד, חברות ושמחה בחדר אחד",
    galleryCopy: "הצצה ל‑Ruach Breslov ברגעים החיים: לומדים יחד, חולקים שולחן ובונים קשרים שנשארים.",
    subscriptionTitle: "נשארים מחוברים",
    subscriptionCopy: "בחרו עדכונים, הודעות על אירועים או את שניהם. השליטה בהעדפות נשארת בידיכם."
  },
  events: {
    eyebrow: "נפגשים ומשתתפים",
    title: "אירועים קרובים",
    description: "מפגשים ותוכניות מאושרים של Ruach Breslov יתפרסמו כאן.",
    emptyTitle: "אין אירועים מתוכננים כרגע",
    emptyCopy: "הירשמו להודעות על אירועים או צרו איתנו קשר כדי לשמוע על המפגש הבא.",
    dateLabel: "תאריך ושעה",
    locationLabel: "מיקום",
    items: {}
  },
  videos: {
    eyebrow: "לימוד והשראה",
    title: "סרטוני Ruach Breslov",
    description: "לימודי וידאו וסיפורים רשמיים של Ruach Breslov ירוכזו כאן.",
    emptyTitle: "סרטונים יעלו בקרוב",
    emptyCopy: "הישארו מחוברים ללימודים, שיחות וסיפורים חדשים מן הקהילה.",
    quality: "האיכות הגבוהה ביותר · עד 4K",
    hdr: "מוכן ל‑HDR",
    items: [
      { title: "סיפור מרכזי", description: "המקום להצגה החזקה ביותר של העשייה שלכם." },
      { title: "מתוך הקהילה", description: "שתפו שיחה, פרופיל או תוכנית מהזמן האחרון." },
      { title: "רעיונות לעומק", description: "בית להרצאות, שיעורים ווידאו ארוך." }
    ]
  },
  gallery: {
    eyebrow: "החיים ב‑Ruach Breslov",
    title: "גלריית הקהילה",
    description: "הצצה ללימוד תורה שבועי, לארוחות משותפות, לחברות ולקהילה החיה שצומחת בקווינס.",
    openImage: "פתיחת תמונה",
    previous: "התמונה הקודמת",
    next: "התמונה הבאה",
    lightboxDescription: "תמונת קהילה מוגדלת. אפשר לעבור באמצעות הכפתורים או מקשי החצים.",
    clipsEyebrow: "רגעים בתנועה",
    clipsTitle: "קטעי וידאו קצרים מהקהילה",
    clipsCopy: "הצצות שקטות ממפגשים ושיעורים אחרונים.",
    captions: {
      study: "לומדים תורה יחד סביב ספר פתוח",
      gathering: "חדר מלא שהתכנס לתורה ולחיבור",
      hospitality: "אוכל ואירוח שהוכנו עבור הקהילה",
      teaching: "לימוד שנמסר במפגש של Ruach Breslov",
      video: "קטע שקט קצר ממפגש של Ruach Breslov"
    }
  },
  contact: {
    eyebrow: "מתחילים בשיחה",
    title: "יצירת קשר",
    description: "שאלו שאלה, למדו עוד על Ruach Breslov או התחילו שיחה עם הצוות שלנו.",
    detailsTitle: "פרטי קשר",
    hoursTitle: "ביקור במקום",
    hours: "אנא צרו איתנו קשר לפני תכנון ביקור במקום.",
    responseTitle: "מה קורה לאחר השליחה",
    responseCopy: "ההודעות נשלחות באופן מאובטח לצוות Ruach Breslov. נשיב בהקדם האפשרי.",
    faqTitle: "שאלות נפוצות",
    faqs: [
      { question: "תוך כמה זמן אקבל תשובה?", answer: "אנו בודקים את ההודעות ומשיבים בהקדם האפשרי. לפנייה ישירה כתבו ל‑info@ruachbreslov.org או התקשרו ל‑917-740-4509." },
      { question: "אפשר להגיע לביקור?", answer: "אנא צרו איתנו קשר מראש כדי שנוכל לאשר זמינות ולמסור מידע עדכני על הביקור." },
      { question: "מי מקבל את הטופס?", answer: "הפנייה נמסרת באופן מאובטח לצוות Ruach Breslov בכתובת info@ruachbreslov.org." }
    ]
  },
  support: {
    eyebrow: "עוזרים ל‑Ruach Breslov לצמוח",
    title: "תמכו בעשייה שלנו",
    description: "העידוד והתמיכה שלכם עוזרים ל‑Ruach Breslov להפיץ אמונה, שמחה ואת חכמתו של רבי נחמן.",
    hostedTitle: "תרומה חד־פעמית",
    hostedCopy: "בחרו את הסכום שמתאים לכם והשלימו את התרומה באופן מאובטח ב‑Stripe.",
    customTitle: "מצטרפים כתומכים חודשיים",
    customCopy: "תמיכה קבועה מעניקה בסיס יציב לשיעורים, לאירוח, למרצים ולקירוב.",
    unavailable: "תרומות מקוונות אינן זמינות כרגע. צרו איתנו קשר אם תרצו לתמוך ב‑Ruach Breslov.",
    oneTimeCta: "בחירת סכום חד־פעמי",
    monthlyCta: "תרומה של {amount} בכל חודש",
    monthlyLabel: "לחודש",
    monthlyDisclosure: "תרומות חודשיות מתחדשות אוטומטית מדי חודש עד לביטול. אפשר לנהל או לבטל באמצעות Stripe או בפנייה ל‑Ruach Breslov.",
    manageMonthlyCta: "ניהול התמיכה החודשית",
    impactTitle: "התמיכה שלכם מסייעת לקיים",
    impactItems: ["שיעורי תורה שבועיים", "אוכל ואירוח", "מרצים אורחים מעוררי השראה", "אירועי קהילה ופעילות קירוב"],
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
    intro: "עודכן לאחרונה ב־4 בספטמבר 2026. הודעה זו מסבירה כיצד Ruach Breslov מטפלת במידע שנמסר דרך האתר.",
    sections: [
      { title: "מידע שאתם מוסרים", copy: "טופס יצירת הקשר אוסף שם, כתובת דוא״ל, הודעה ופרטים אופציונליים שתבחרו למסור. טופס ההרשמה אוסף שם, כתובת דוא״ל ונושאי תקשורת שבחרתם." },
      { title: "כיצד אנו משתמשים במידע", copy: "אנו משתמשים במידע כדי לענות לפניות, להגן על הטפסים מפני שימוש לרעה, לאשר בקשות הרשמה ולשלוח רק את התקשורת שביקשתם." },
      { title: "ספקי שירות", copy: "GitHub Pages מאחסן את האתר. Cloudflare מספקת DNS, אחסון API, מסד נתונים ואבטחת Turnstile. Resend שולחת דוא״ל ומנהלת הרשמות מאושרות. Stripe מעבדת באופן מאובטח תרומות ופרטי תשלומים חוזרים בעמודים המאוחסנים אצלה. ספקים אלה מעבדים מידע רק ככל שנדרש להפעלת השירותים." },
      { title: "שמירה ואבטחה", copy: "הודעות קשר נמסרות בדוא״ל ואינן נשמרות במסד הנתונים של האתר. בקשות הרשמה שלא אושרו פגות לאחר 24 שעות. פרטי הרשמה מאושרים נשמרים ב‑Resend עד להסרה או לבקשת מחיקה. רשומות אבטחה מוגבלות נשמרות למניעת שימוש לרעה." },
      { title: "הבחירות שלכם", copy: "אפשר להסיר הרשמה באמצעות הקישורים בהודעות שלנו. לבקשת גישה, תיקון או מחיקה של מידע שמסרתם, כתבו ל‑info@ruachbreslov.org." }
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
    liveFoundation: "Ruach Breslov",
    fastFocusedGlobal: "Fe, alegría y propósito",
    languagesReady: "idiomas",
    videoReady: "en el centro",
    staticBoundary: "Fe · Alegría · Crecimiento personal · Vínculos significativos",
    chooseTopic: "Selecciona al menos una opción.",
    recommendedDefault: "Opción recomendada",
    backendRequired: "Se requiere un servidor seguro."
  },
  nav: { home: "Inicio", events: "Eventos", gallery: "Galería", videos: "Videos", contact: "Contacto", support: "Apoyar" },
  actions: {
    exploreEvents: "Explorar eventos",
    contactUs: "Contáctanos",
    watchVideos: "Ver videos",
    rsvp: "Confirmar asistencia",
    supportUs: "Apóyanos",
    submit: "Enviar mensaje",
    subscribe: "Suscribirme",
    viewGallery: "Ver la galería",
    close: "Cerrar",
    openMenu: "Abrir menú"
  },
  home: {
    eyebrow: "La sabiduría atemporal del Rebe Najmán",
    title: "Encuentra esperanza. Crece con fe. Vive con propósito.",
    description: "Ruach Breslov da vida a la sabiduría atemporal del Rebe Najmán por medio de la fe, la alegría, el crecimiento personal y vínculos significativos. Creamos un espacio acogedor para que personas de todos los orígenes encuentren esperanza, profundicen su relación con Dios, afronten con fortaleza los desafíos de la vida y descubran un mayor propósito, bondad y sentido.",
    featureTitle: "Más que una clase: una comunidad que crece unida",
    featureCopy: "Nuestros encuentros dan vida a la Torá con emuná, alegría, honestidad, amistad y una conexión real.",
    features: [
      { title: "Clases semanales de Torá", copy: "Encuentros inspiradores centrados en las enseñanzas del Rebe Najmán, el crecimiento, la conexión y la simjá." },
      { title: "Acompañamiento personal", copy: "Orientación y aliento para quien busca dirección, apoyo o alguien que camine a su lado." },
      { title: "Eventos comunitarios", copy: "Comida, música, aprendizaje y amistad se unen para crear una experiencia judía significativa." },
      { title: "Oradores invitados y alcance", copy: "Nuevas perspectivas de Torá y una mano abierta para quienes buscan conexión y aliento." }
    ],
    storyEyebrow: "Nuestro legado de luz",
    storyTitle: "Un lugar al que pertenecer, tal como eres.",
    storyParagraphs: [
      "Lo que comenzó como un pequeño encuentro se ha convertido en una hermandad real, construida sobre la Torá, la honestidad, la amistad y la convicción de que nadie debería afrontar sus luchas en soledad.",
      "Inspirados por el Rebe Najmán, creemos que cada alma lleva una luz inconmensurable, aun cuando parezca oculta. A veces, la Torá adecuada, un buen amigo o una conversación sincera nos recuerdan quiénes somos de verdad."
    ],
    galleryEyebrow: "Dentro de la comunidad",
    galleryTitle: "Aprendizaje, amistad y alegría en un mismo lugar",
    galleryCopy: "Conoce Ruach Breslov en sus momentos reales: personas que aprenden juntas, comparten la mesa y crean vínculos duraderos.",
    subscriptionTitle: "Mantente al día",
    subscriptionCopy: "Elige boletines, anuncios de eventos o ambos. Tú mantienes el control de tus preferencias."
  },
  events: {
    eyebrow: "Reúnete y participa",
    title: "Próximos eventos",
    description: "Aquí publicaremos las reuniones y los programas confirmados de Ruach Breslov.",
    emptyTitle: "No hay eventos programados por el momento",
    emptyCopy: "Suscríbete a los anuncios de eventos o contáctanos para conocer la próxima reunión.",
    dateLabel: "Fecha y hora",
    locationLabel: "Lugar",
    items: {}
  },
  videos: {
    eyebrow: "Enseñanzas e inspiración",
    title: "Videos de Ruach Breslov",
    description: "Aquí reuniremos enseñanzas en video e historias oficiales de Ruach Breslov.",
    emptyTitle: "Próximamente publicaremos videos",
    emptyCopy: "Mantente en contacto para recibir nuevas enseñanzas, conversaciones e historias de la comunidad.",
    quality: "Máxima disponible · hasta 4K",
    hdr: "Preparado para HDR",
    items: [
      { title: "Historia destacada", description: "Utiliza este espacio para presentar tu trabajo con mayor fuerza." },
      { title: "Desde la comunidad", description: "Comparte una conversación, un perfil o un programa reciente." },
      { title: "Ideas en profundidad", description: "Un hogar para charlas, clases y videos de larga duración." }
    ]
  },
  gallery: {
    eyebrow: "La vida en Ruach Breslov",
    title: "Galería de la comunidad",
    description: "Una mirada a las clases semanales de Torá, las comidas compartidas, la amistad y la comunidad viva que crece en Queens.",
    openImage: "Abrir imagen",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    lightboxDescription: "Fotografía ampliada de la comunidad. Usa los botones o las flechas del teclado para navegar.",
    clipsEyebrow: "Momentos en movimiento",
    clipsTitle: "Videos breves de la comunidad",
    clipsCopy: "Vistazos silenciosos de encuentros y sesiones de estudio recientes.",
    captions: {
      study: "Aprendiendo Torá juntos alrededor de un texto abierto",
      gathering: "Una sala llena reunida para la Torá y la conexión",
      hospitality: "Comida y hospitalidad preparadas para la comunidad",
      teaching: "Una enseñanza compartida durante un encuentro de Ruach Breslov",
      video: "Un video breve y silencioso de un encuentro de Ruach Breslov"
    }
  },
  contact: {
    eyebrow: "Inicia una conversación",
    title: "Contáctanos",
    description: "Haz una pregunta, conoce más sobre Ruach Breslov o inicia una conversación con nuestro equipo.",
    detailsTitle: "Datos de contacto",
    hoursTitle: "Visitas",
    hours: "Contáctanos antes de planificar una visita en persona.",
    responseTitle: "Qué sucede después",
    responseCopy: "Los mensajes se envían de forma segura al equipo de Ruach Breslov. Responderemos tan pronto como podamos.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { question: "¿Cuándo recibiré una respuesta?", answer: "Revisamos los mensajes y respondemos tan pronto como podemos. Para una consulta directa, escribe a info@ruachbreslov.org o llama al 917-740-4509." },
      { question: "¿Puedo visitar en persona?", answer: "Contáctanos con anticipación para que podamos confirmar disponibilidad y compartir información actualizada para tu visita." },
      { question: "¿Quién recibe este formulario?", answer: "Tu consulta se entrega de forma segura al equipo de Ruach Breslov en info@ruachbreslov.org." }
    ]
  },
  support: {
    eyebrow: "Ayuda a crecer a Ruach Breslov",
    title: "Apoya nuestro trabajo",
    description: "Tu aliento y apoyo ayudan a Ruach Breslov a compartir la fe, la alegría y la sabiduría del Rebe Najmán.",
    hostedTitle: "Haz una donación única",
    hostedCopy: "Elige la cantidad que prefieras y completa tu donación de forma segura en Stripe.",
    customTitle: "Hazte colaborador mensual",
    customCopy: "El apoyo recurrente da una base estable a las clases, la hospitalidad, los oradores y el alcance comunitario.",
    unavailable: "Las contribuciones en línea aún no están disponibles. Contáctanos si deseas apoyar a Ruach Breslov.",
    oneTimeCta: "Elegir una cantidad única",
    monthlyCta: "Donar {amount} al mes",
    monthlyLabel: "al mes",
    monthlyDisclosure: "Las donaciones mensuales se renuevan automáticamente cada mes hasta que las canceles. Puedes administrarlas o cancelarlas mediante Stripe o contactando a Ruach Breslov.",
    manageMonthlyCta: "Administrar apoyo mensual",
    impactTitle: "Tu apoyo ayuda a ofrecer",
    impactItems: ["Clases semanales de Torá", "Comida y hospitalidad", "Oradores invitados inspiradores", "Eventos y alcance comunitario"],
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
    intro: "Última actualización: 4 de septiembre de 2026. Este aviso explica cómo Ruach Breslov trata la información enviada mediante este sitio web.",
    sections: [
      { title: "Información que proporcionas", copy: "El formulario de contacto recopila tu nombre, correo electrónico, mensaje y los datos opcionales que decidas proporcionar. El formulario de suscripción recopila tu nombre, correo electrónico y los temas de comunicación seleccionados." },
      { title: "Cómo usamos la información", copy: "Usamos la información para responder consultas, proteger los formularios contra abusos, confirmar solicitudes de suscripción y enviar únicamente las comunicaciones que pediste." },
      { title: "Proveedores de servicios", copy: "GitHub Pages aloja el sitio. Cloudflare proporciona DNS, alojamiento de la API, base de datos y seguridad Turnstile. Resend entrega correos y administra suscripciones confirmadas. Stripe procesa de forma segura las donaciones y los datos de pagos recurrentes en sus páginas alojadas. Estos proveedores procesan información solo cuando es necesario para prestar esos servicios." },
      { title: "Conservación y seguridad", copy: "Los mensajes de contacto se entregan por correo y no se guardan en la base de datos del sitio. Las solicitudes de suscripción no confirmadas vencen después de 24 horas. Los datos de suscripciones confirmadas permanecen en Resend hasta que canceles la suscripción o solicites su eliminación. Conservamos registros de seguridad limitados para prevenir abusos." },
      { title: "Tus opciones", copy: "Puedes cancelar la suscripción mediante los enlaces incluidos en nuestros correos. Para solicitar acceso, corrección o eliminación de información que enviaste, escribe a info@ruachbreslov.org." }
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
    liveFoundation: "Ruach Breslov",
    fastFocusedGlobal: "ایمان، شادی و هدف",
    languagesReady: "زبان",
    videoReady: "در قلب کار",
    staticBoundary: "ایمان · شادی · رشد فردی · پیوند معنادار",
    chooseTopic: "حداقل یک گزینه را انتخاب کنید.",
    recommendedDefault: "گزینه پیشنهادی",
    backendRequired: "سرور امن لازم است."
  },
  nav: { home: "خانه", events: "رویدادها", gallery: "گالری", videos: "ویدیوها", contact: "تماس", support: "حمایت" },
  actions: {
    exploreEvents: "مشاهده رویدادها",
    contactUs: "تماس با ما",
    watchVideos: "تماشای ویدیوها",
    rsvp: "ثبت حضور",
    supportUs: "حمایت کنید",
    submit: "ارسال پیام",
    subscribe: "عضویت",
    viewGallery: "مشاهدۀ گالری",
    close: "بستن",
    openMenu: "باز کردن منو"
  },
  home: {
    eyebrow: "حکمت جاودانۀ ربی نحمان",
    title: "امید را بیابید. با ایمان رشد کنید. هدفمند زندگی کنید.",
    description: "Ruach Breslov حکمت جاودانۀ ربی نحمان را از راه ایمان، شادی، رشد فردی و پیوندی معنادار زنده می‌کند. ما فضایی پذیرا برای افراد با هر پیشینه‌ای فراهم می‌کنیم تا امید بیابند، رابطۀ خود با خدا را عمیق‌تر کنند، با قدرت با چالش‌های زندگی روبه‌رو شوند و هدف، نیکی و معنای بیشتری کشف کنند.",
    featureTitle: "فراتر از یک کلاس؛ جامعه‌ای که با هم رشد می‌کند",
    featureCopy: "گردهمایی‌های ما تورات را با ایمان، شادی، صداقت، دوستی و پیوندی واقعی زنده می‌کنند.",
    features: [
      { title: "کلاس‌های هفتگی تورات", copy: "گردهمایی‌های الهام‌بخش پیرامون آموزه‌های ربی نحمان، رشد فردی، پیوند و شادی." },
      { title: "راهنمایی فردی", copy: "راهنمایی و دلگرمی برای هرکس که به دنبال مسیر، حمایت یا همراهی در راه است." },
      { title: "رویدادهای اجتماعی", copy: "غذا، موسیقی، یادگیری و دوستی برای ساختن تجربه‌ای معنادار از زندگی یهودی کنار هم می‌آیند." },
      { title: "سخنرانان مهمان و ارتباط‌گیری", copy: "نگاهی تازه به تورات و دستی گشوده برای کسانی که به دنبال پیوند و دلگرمی هستند." }
    ],
    storyEyebrow: "میراثی از نور",
    storyTitle: "جایی برای تعلق داشتن، درست همان‌گونه که هستید.",
    storyParagraphs: [
      "آنچه با گردهمایی کوچکی آغاز شد، به برادری واقعی بر پایۀ تورات، صداقت، دوستی و این باور تبدیل شده است که هیچ‌کس نباید در دشواری‌هایش تنها بماند.",
      "با الهام از ربی نحمان باور داریم هر روح نوری بی‌اندازه در خود دارد، حتی زمانی که آن نور پنهان به نظر می‌رسد. گاهی یک آموزۀ درست، یک دوست خوب یا گفت‌وگویی صادقانه به انسان یادآوری می‌کند که واقعاً کیست."
    ],
    galleryEyebrow: "درون جامعه",
    galleryTitle: "یادگیری، دوستی و شادی در کنار هم",
    galleryCopy: "Ruach Breslov را در لحظه‌های واقعی ببینید: کسانی که با هم می‌آموزند، سفره‌ای را سهیم می‌شوند و پیوندهایی ماندگار می‌سازند.",
    subscriptionTitle: "در ارتباط بمانید",
    subscriptionCopy: "خبرنامه، اطلاعیه رویدادها یا هر دو را انتخاب کنید. کنترل ترجیحات در اختیار شماست."
  },
  events: {
    eyebrow: "گردهمایی و مشارکت",
    title: "رویدادهای پیش رو",
    description: "گردهمایی‌ها و برنامه‌های تأییدشدۀ Ruach Breslov در اینجا منتشر می‌شوند.",
    emptyTitle: "در حال حاضر رویدادی برنامه‌ریزی نشده است",
    emptyCopy: "برای آگاهی از گردهمایی بعدی، عضو اطلاعیه‌های رویداد شوید یا با ما تماس بگیرید.",
    dateLabel: "تاریخ و زمان",
    locationLabel: "مکان",
    items: {}
  },
  videos: {
    eyebrow: "آموزه‌ها و الهام",
    title: "ویدیوهای Ruach Breslov",
    description: "آموزه‌های ویدیویی و روایت‌های رسمی Ruach Breslov در اینجا گردآوری می‌شوند.",
    emptyTitle: "ویدیوها به‌زودی منتشر می‌شوند",
    emptyCopy: "برای دریافت آموزه‌ها، گفت‌وگوها و روایت‌های تازه از جامعه با ما در ارتباط بمانید.",
    quality: "بالاترین کیفیت موجود · تا 4K",
    hdr: "آماده HDR",
    items: [
      { title: "داستان ویژه", description: "این بخش را به بهترین معرفی از فعالیت خود اختصاص دهید." },
      { title: "از دل جامعه", description: "یک گفت‌وگو، معرفی یا برنامه تازه را به اشتراک بگذارید." },
      { title: "ایده‌های عمیق", description: "جایی برای سخنرانی، کلاس و ویدیوهای بلند." }
    ]
  },
  gallery: {
    eyebrow: "زندگی در Ruach Breslov",
    title: "گالری جامعه",
    description: "نگاهی به آموزش هفتگی تورات، سفره‌های مشترک، دوستی و جامعۀ پویایی که در کویینز رشد می‌کند.",
    openImage: "باز کردن تصویر",
    previous: "تصویر قبلی",
    next: "تصویر بعدی",
    lightboxDescription: "عکس بزرگ‌شدۀ جامعه. برای مرور از دکمه‌ها یا کلیدهای جهت استفاده کنید.",
    clipsEyebrow: "لحظه‌های زنده",
    clipsTitle: "ویدیوهای کوتاه جامعه",
    clipsCopy: "نگاهی بی‌صدا به گردهمایی‌ها و جلسه‌های آموزشی اخیر.",
    captions: {
      study: "آموختن تورات در کنار هم پیرامون متنی گشوده",
      gathering: "جمعی پُرشور برای تورات و پیوند",
      hospitality: "غذا و پذیرایی آماده‌شده برای جامعه",
      teaching: "آموزه‌ای در یکی از گردهمایی‌های Ruach Breslov",
      video: "ویدیویی کوتاه و بی‌صدا از گردهمایی Ruach Breslov"
    }
  },
  contact: {
    eyebrow: "گفت‌وگو را آغاز کنید",
    title: "تماس با ما",
    description: "پرسش خود را مطرح کنید، با Ruach Breslov بیشتر آشنا شوید یا با تیم ما گفت‌وگو را آغاز کنید.",
    detailsTitle: "اطلاعات تماس",
    hoursTitle: "مراجعه حضوری",
    hours: "پیش از برنامه‌ریزی برای مراجعه حضوری با ما تماس بگیرید.",
    responseTitle: "پس از ارسال چه می‌شود",
    responseCopy: "پیام‌ها به‌صورت امن به تیم Ruach Breslov می‌رسند. در اولین فرصت پاسخ خواهیم داد.",
    faqTitle: "پرسش‌های متداول",
    faqs: [
      { question: "چه زمانی پاسخ می‌گیرم؟", answer: "پیام‌ها را بررسی می‌کنیم و در اولین فرصت پاسخ می‌دهیم. برای تماس مستقیم به info@ruachbreslov.org ایمیل بزنید یا با 917-740-4509 تماس بگیرید." },
      { question: "آیا می‌توانم حضوری مراجعه کنم؟", answer: "از پیش با ما تماس بگیرید تا زمان مناسب و اطلاعات به‌روز مراجعه را در اختیارتان بگذاریم." },
      { question: "چه کسی فرم را دریافت می‌کند؟", answer: "پیام شما به‌صورت امن به تیم Ruach Breslov در info@ruachbreslov.org تحویل می‌شود." }
    ]
  },
  support: {
    eyebrow: "به رشد Ruach Breslov کمک کنید",
    title: "از کار ما حمایت کنید",
    description: "دلگرمی و حمایت شما به Ruach Breslov کمک می‌کند ایمان، شادی و حکمت ربی نحمان را به اشتراک بگذارد.",
    hostedTitle: "کمک یک‌باره",
    hostedCopy: "مبلغ دلخواه خود را انتخاب کنید و کمک را به‌صورت امن در Stripe انجام دهید.",
    customTitle: "حامی ماهانه شوید",
    customCopy: "حمایت مستمر، پایه‌ای مطمئن برای کلاس‌ها، پذیرایی، سخنرانان و ارتباط با جامعه فراهم می‌کند.",
    unavailable: "کمک آنلاین در حال حاضر فعال نیست. اگر مایل به حمایت از Ruach Breslov هستید با ما تماس بگیرید.",
    oneTimeCta: "انتخاب مبلغ یک‌باره",
    monthlyCta: "ماهانه {amount} کمک کنید",
    monthlyLabel: "در ماه",
    monthlyDisclosure: "کمک‌های ماهانه هر ماه به‌طور خودکار تمدید می‌شوند تا زمانی که لغو شوند. می‌توانید از طریق Stripe یا با تماس با Ruach Breslov آن را مدیریت یا لغو کنید.",
    manageMonthlyCta: "مدیریت حمایت ماهانه",
    impactTitle: "حمایت شما به فراهم کردن این موارد کمک می‌کند",
    impactItems: ["کلاس‌های هفتگی تورات", "غذا و پذیرایی", "سخنرانان مهمان الهام‌بخش", "رویدادها و ارتباط با جامعه"],
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
    intro: "آخرین به‌روزرسانی: ۴ سپتامبر ۲۰۲۶. این اطلاعیه توضیح می‌دهد Ruach Breslov چگونه اطلاعات ارسال‌شده از طریق این وب‌سایت را مدیریت می‌کند.",
    sections: [
      { title: "اطلاعاتی که ارائه می‌کنید", copy: "فرم تماس نام، نشانی ایمیل، پیام و هر اطلاعات اختیاری را که وارد کنید دریافت می‌کند. فرم عضویت نام، نشانی ایمیل و موضوعات ارتباطی انتخاب‌شده را دریافت می‌کند." },
      { title: "نحوۀ استفاده از اطلاعات", copy: "از اطلاعات برای پاسخ به پرسش‌ها، محافظت از فرم‌ها در برابر سوءاستفاده، تأیید درخواست عضویت و ارسال تنها پیام‌هایی که خواسته‌اید استفاده می‌کنیم." },
      { title: "ارائه‌دهندگان خدمات", copy: "GitHub Pages میزبان وب‌سایت است. Cloudflare خدمات DNS، میزبانی API، پایگاه داده و امنیت Turnstile را ارائه می‌دهد. Resend ایمیل‌ها و عضویت‌های تأییدشده را مدیریت می‌کند. Stripe کمک‌ها و اطلاعات پرداخت‌های دوره‌ای را به‌صورت امن در صفحه‌های میزبانی‌شدۀ خود پردازش می‌کند. این ارائه‌دهندگان فقط به میزان لازم برای ارائۀ خدمات اطلاعات را پردازش می‌کنند." },
      { title: "نگهداری و امنیت", copy: "پیام‌های تماس از طریق ایمیل تحویل می‌شوند و در پایگاه دادۀ وب‌سایت ذخیره نمی‌شوند. درخواست‌های عضویت تأییدنشده پس از ۲۴ ساعت منقضی می‌شوند. اطلاعات عضویت تأییدشده تا لغو عضویت یا درخواست حذف در Resend باقی می‌ماند. سوابق امنیتی محدود برای جلوگیری از سوءاستفاده نگهداری می‌شوند." },
      { title: "انتخاب‌های شما", copy: "می‌توانید از پیوندهای موجود در ایمیل‌ها عضویت را لغو کنید. برای درخواست دسترسی، اصلاح یا حذف اطلاعاتی که فرستاده‌اید به info@ruachbreslov.org ایمیل بزنید." }
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
