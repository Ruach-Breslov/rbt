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
    about: string;
    events: string;
    gallery: string;
    videos: string;
    contact: string;
    support: string;
  };
  actions: {
    exploreEvents: string;
    contactUs: string;
    donate: string;
    watchVideos: string;
    rsvp: string;
    supportUs: string;
    submit: string;
    subscribe: string;
    viewGallery: string;
    aboutUs: string;
    close: string;
    openMenu: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    gatheringCopy: string;
    missionEyebrow: string;
    missionTitle: string;
    missionCopy: string;
    featureEyebrow: string;
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
  about: {
    eyebrow: string;
    title: string;
    description: string;
    missionEyebrow: string;
    missionTitle: string;
    mission: string;
    storyEyebrow: string;
    storyTitle: string;
    storyParagraphs: string[];
    workEyebrow: string;
    workTitle: string;
    workCopy: string;
    leadershipEyebrow: string;
    leadershipTitle: string;
    leadershipCopy: string;
    legalEyebrow: string;
    legalTitle: string;
    legalCopy: string;
    legalNameLabel: string;
    einLabel: string;
    classificationLabel: string;
    classification: string;
    addressLabel: string;
    verifyStatus: string;
    ctaTitle: string;
    ctaCopy: string;
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
    channelCta: string;
    channelDescription: string;
    videoCount: string;
    videosTab: string;
    shortsTab: string;
    latest: string;
    popular: string;
    oldest: string;
    searchLabel: string;
    searchPlaceholder: string;
    clearSearch: string;
    closePlayer: string;
    playVideo: string;
    views: string;
    noResults: string;
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
    mapEyebrow: string;
    mapTitle: string;
    mapCopy: string;
    mapFrameTitle: string;
    directionsCta: string;
    openMapCta: string;
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
    givingFrequency: string;
    oneTimeOption: string;
    monthlyOption: string;
    monthlyAmountPrompt: string;
    continueToStripe: string;
    stripeRedirectNote: string;
    oneTimeCta: string;
    monthlyCta: string;
    monthlyLabel: string;
    monthlyDisclosure: string;
    manageMonthlyCta: string;
    impactTitle: string;
    impactItems: string[];
    nonprofitTitle: string;
    nonprofitCopy: string;
    verifyStatus: string;
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
  siteTagline: "Torah, friendship, emunah, and joy in Queens.",
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
  nav: { home: "Home", about: "About", events: "Events", gallery: "Gallery", videos: "Videos", contact: "Contact", support: "Support" },
  actions: {
    exploreEvents: "Explore events",
    contactUs: "Contact us",
    donate: "Donate",
    watchVideos: "Watch & learn",
    rsvp: "RSVP",
    supportUs: "Support us",
    submit: "Send message",
    subscribe: "Subscribe",
    viewGallery: "View the gallery",
    aboutUs: "About Ruach Breslov",
    close: "Close",
    openMenu: "Open menu"
  },
  home: {
    eyebrow: "Torah, friendship, and a little more light",
    title: "Come as you are. There’s a place for you here.",
    description: "Ruach Breslov is a growing Queens community where Rebbe Nachman’s teachings meet real life. We learn, eat, ask honest questions, and help one another move forward—with emunah and joy.",
    gatheringCopy: "This room is more than a backdrop. It is where Torah becomes conversation, strangers become friends, and people find the strength to take their next step.",
    missionEyebrow: "Our mission",
    missionTitle: "Torah for real life. A community that shows up.",
    missionCopy: "Bringing Rebbe Nachman’s teachings into everyday life so people can find hope, deepen their faith, build honest friendships, and face life’s challenges with joy and purpose.",
    featureEyebrow: "What happens here",
    featureTitle: "More than a class. A room full of people who show up.",
    featureCopy: "No performance and no perfect background required—just practical Torah, warmth, and honest conversation.",
    features: [
      { title: "Weekly Torah around the table", copy: "Open a sefer, ask what is really on your mind, and leave with something you can carry into the week." },
      { title: "One honest conversation", copy: "Personal mentorship for the moments when a little direction—or simply someone listening—can make a difference." },
      { title: "Food, music, and being together", copy: "Community nights where people share a meal, laugh, learn, and stop feeling like they have to do life alone." },
      { title: "A door that stays open", copy: "Guest teachers, outreach, and a warm welcome for anyone looking for connection, encouragement, or a way back in." }
    ],
    storyEyebrow: "How it began",
    storyTitle: "A few people around a table became a brotherhood.",
    storyParagraphs: [
      "Ruach Breslov began simply: people learning together, speaking honestly, and making room for one another. That small gathering grew because nobody had to pretend they had everything figured out.",
      "We believe every soul carries immeasurable light, even when it feels hidden. Sometimes a piece of Torah, a good friend, or one real conversation is enough to help someone see it again."
    ],
    galleryEyebrow: "Inside the community",
    galleryTitle: "See what it feels like in the room.",
    galleryCopy: "Not stock photos and not a staged idea of community—these are the tables, faces, learning, and shared moments that make Ruach Breslov real.",
    subscriptionTitle: "Stay connected",
    subscriptionCopy: "Choose newsletters, event announcements, or both. You remain in control of your preferences."
  },
  about: {
    eyebrow: "Who we are",
    title: "Faith that meets real life. Community that shows up.",
    description: "Ruach Breslov is a public charity in Flushing, New York, bringing Rebbe Nachman’s teachings into everyday life through Torah learning, personal mentorship, hospitality, and community.",
    missionEyebrow: "Our mission",
    missionTitle: "Help every person find hope, faith, and a place to belong.",
    mission: "Ruach Breslov’s mission is to strengthen Jewish life and human connection by bringing the teachings of Rebbe Nachman into the realities of everyday life. Through accessible Torah learning, one-on-one mentorship, shared meals, community gatherings, and compassionate outreach, we create a welcoming place where people of all backgrounds can find hope, deepen their relationship with God, build honest friendships, and meet life’s challenges with faith, joy, and purpose—so no one has to struggle or grow alone.",
    storyEyebrow: "Our story",
    storyTitle: "A few people around a table became a community.",
    storyParagraphs: [
      "Ruach Breslov began with people learning together, speaking honestly, and making room for one another. The gathering grew because nobody had to pretend they had everything figured out.",
      "Inspired by Rebbe Nachman, we believe every soul carries immeasurable light, even when it feels hidden. Sometimes a piece of Torah, a shared meal, a good friend, or one real conversation is enough to help someone see it again."
    ],
    workEyebrow: "What we do",
    workTitle: "The mission becomes real in the room.",
    workCopy: "Our programs bring learning, mentorship, hospitality, and human connection together in practical ways.",
    leadershipEyebrow: "Organizational leadership",
    leadershipTitle: "Leadership",
    leadershipCopy: "Benjamin Roberts guides Ruach Breslov’s day-to-day operations and helps turn its mission into consistent programs, relationships, and community support.",
    legalEyebrow: "Public accountability",
    legalTitle: "Our legal identity",
    legalCopy: "Ruach Breslov Inc. is listed by the Internal Revenue Service as a public charity eligible to receive tax-deductible charitable contributions.",
    legalNameLabel: "Legal name",
    einLabel: "Employer Identification Number (EIN)",
    classificationLabel: "IRS classification",
    classification: "Public charity",
    addressLabel: "Principal location",
    verifyStatus: "Verify our status with the IRS",
    ctaTitle: "Help keep the door open.",
    ctaCopy: "Your support helps provide weekly Torah learning, personal guidance, food and hospitality, guest speakers, community events, and outreach."
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
    description: "Watch official teachings and stories from the Ruach Breslov YouTube channel.",
    emptyTitle: "Videos are coming soon",
    emptyCopy: "Stay connected for new teachings, conversations, and community stories.",
    channelCta: "Visit our YouTube channel",
    channelDescription: "A growing community bringing Rebbe Nachman’s teachings into real life—with clarity, joy, depth, and connection.",
    videoCount: "{count} videos",
    videosTab: "Videos",
    shortsTab: "Shorts",
    latest: "Latest",
    popular: "Popular",
    oldest: "Oldest",
    searchLabel: "Search this channel",
    searchPlaceholder: "Search videos",
    clearSearch: "Clear search",
    closePlayer: "Close video player",
    playVideo: "Play video",
    views: "views",
    noResults: "No videos match that search."
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
    mapEyebrow: "Plan your visit",
    mapTitle: "Find us in Flushing",
    mapCopy: "Open driving directions straight to our location. Please confirm the class date and time with us before traveling.",
    mapFrameTitle: "Google Map showing the Ruach Breslov location in Flushing",
    directionsCta: "Get driving directions",
    openMapCta: "Open in Google Maps",
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
    givingFrequency: "Donation frequency",
    oneTimeOption: "One time",
    monthlyOption: "Monthly",
    monthlyAmountPrompt: "Choose a monthly amount",
    continueToStripe: "Continue securely with Stripe",
    stripeRedirectNote: "Stripe opens in a new tab to securely collect and process your payment.",
    oneTimeCta: "Choose a one-time amount",
    monthlyCta: "Give {amount} monthly",
    monthlyLabel: "per month",
    monthlyDisclosure: "Monthly donations renew automatically each month until canceled. You can manage or cancel through Stripe or by contacting Ruach Breslov.",
    manageMonthlyCta: "Manage monthly support",
    impactTitle: "Your support helps provide",
    impactItems: ["Weekly Torah classes", "Food and hospitality", "Inspiring guest speakers", "Community events and outreach"],
    nonprofitTitle: "Give with confidence",
    nonprofitCopy: "Ruach Breslov Inc. is listed by the IRS as a public charity eligible to receive tax-deductible charitable contributions.",
    verifyStatus: "Verify our status with the IRS",
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
      { title: "Service providers", copy: "GitHub Pages hosts the website. Cloudflare provides DNS, API hosting, database services, and Turnstile security. Resend delivers email and manages confirmed subscriptions. Stripe securely processes donations and recurring payment details on its hosted pages. When you choose to play an embedded video, YouTube receives the request and processes it under its policies. When the location map loads or you open directions, Google Maps receives the request and processes it under its policies. These providers process information only as needed to provide those services." },
      { title: "Retention and security", copy: "Contact messages are delivered by email and are not stored in the website database. Unconfirmed subscription requests expire after 24 hours. Confirmed subscription details remain with Resend until you unsubscribe or request deletion. Limited security records are retained to prevent abuse." },
      { title: "Your choices", copy: "You can unsubscribe using links in our emails. To request access, correction, or deletion of information you submitted, contact info@ruachbreslov.org." }
    ]
  },
  footer: {
    description: "A place in Queens to learn, share a table, and move forward together.",
    privacy: "Privacy",
    rights: "All rights reserved."
  }
};

const he: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "תורה, חברות, אמונה ושמחה בקווינס.",
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
  nav: { home: "בית", about: "אודותינו", events: "אירועים", gallery: "גלריה", videos: "וידאו", contact: "יצירת קשר", support: "תמיכה" },
  actions: {
    exploreEvents: "לאירועים",
    contactUs: "צרו קשר",
    donate: "לתרומה",
    watchVideos: "צפו ולמדו",
    rsvp: "אישור השתתפות",
    supportUs: "תמכו בנו",
    submit: "שליחת הודעה",
    subscribe: "הרשמה",
    viewGallery: "לצפייה בגלריה",
    aboutUs: "אודות Ruach Breslov",
    close: "סגירה",
    openMenu: "פתיחת תפריט"
  },
  home: {
    eyebrow: "תורה, חברות וקצת יותר אור",
    title: "בואו כמו שאתם. יש לכם מקום כאן.",
    description: "Ruach Breslov היא קהילה צומחת בקווינס שבה תורת רבי נחמן פוגשת את החיים עצמם. לומדים, אוכלים, שואלים בכנות ועוזרים זה לזה להתקדם — באמונה ובשמחה.",
    gatheringCopy: "החדר הזה הוא יותר מתפאורה. כאן התורה הופכת לשיחה, זרים הופכים לחברים ואנשים מוצאים את הכוח לצעד הבא שלהם.",
    missionEyebrow: "המשימה שלנו",
    missionTitle: "תורה לחיים עצמם. קהילה שבאמת נוכחת.",
    missionCopy: "להביא את תורת רבי נחמן אל חיי היום־יום, כדי שאנשים ימצאו תקווה, יעמיקו את אמונתם, יבנו חברויות כנות ויתמודדו עם אתגרי החיים בשמחה ובתכלית.",
    featureEyebrow: "מה קורה כאן",
    featureTitle: "יותר משיעור. חדר מלא באנשים שבאמת מגיעים.",
    featureCopy: "בלי הצגות ובלי צורך ברקע מושלם — רק תורה מעשית, חום ושיחה כנה.",
    features: [
      { title: "תורה שבועית סביב השולחן", copy: "פותחים ספר, שואלים את מה שבאמת יושב על הלב ויוצאים עם משהו לקחת אל השבוע." },
      { title: "שיחה אחת כנה", copy: "ליווי אישי לרגעים שבהם מעט כיוון — או פשוט מישהו שמקשיב — יכול לעשות הבדל." },
      { title: "אוכל, מוזיקה ולהיות יחד", copy: "ערבי קהילה שבהם אוכלים, צוחקים, לומדים ומפסיקים להרגיש שצריך לעבור את החיים לבד." },
      { title: "דלת שנשארת פתוחה", copy: "מורים אורחים, קירוב וקבלת פנים חמה למי שמחפש חיבור, עידוד או דרך לחזור פנימה." }
    ],
    storyEyebrow: "איך זה התחיל",
    storyTitle: "כמה אנשים סביב שולחן הפכו לאחווה.",
    storyParagraphs: [
      "מה שהתחיל כמפגש קטן צמח לאחווה אמיתית הבנויה על תורה, כנות, חברות והאמונה שאיש אינו צריך להרגיש לבד במאבק שלו.",
      "בהשראת רבי נחמן אנו מאמינים שבכל נשמה יש אור שאין לו שיעור, גם כשהוא נסתר. לפעמים התורה הנכונה, החבר הנכון או שיחה אמיתית מזכירים לאדם מי הוא באמת."
    ],
    galleryEyebrow: "בתוך הקהילה",
    galleryTitle: "כך זה מרגיש בתוך החדר.",
    galleryCopy: "לא תמונות מאגר ולא רעיון מבוים של קהילה — אלה השולחנות, הפנים, הלימוד והרגעים המשותפים שהופכים את Ruach Breslov לאמיתית.",
    subscriptionTitle: "נשארים מחוברים",
    subscriptionCopy: "בחרו עדכונים, הודעות על אירועים או את שניהם. השליטה בהעדפות נשארת בידיכם."
  },
  about: {
    eyebrow: "מי אנחנו",
    title: "אמונה שפוגשת את החיים. קהילה שבאמת נוכחת.",
    description: "Ruach Breslov היא עמותת צדקה ציבורית בפלאשינג, ניו יורק, המביאה את תורת רבי נחמן אל חיי היום־יום באמצעות לימוד תורה, ליווי אישי, הכנסת אורחים וקהילה.",
    missionEyebrow: "המשימה שלנו",
    missionTitle: "לעזור לכל אדם למצוא תקווה, אמונה ומקום להשתייך אליו.",
    mission: "המשימה של Ruach Breslov היא לחזק את החיים היהודיים ואת הקשר האנושי באמצעות הבאת תורת רבי נחמן אל המציאות של חיי היום־יום. דרך לימוד תורה נגיש, ליווי אישי, ארוחות משותפות, מפגשים קהילתיים ופעילות קירוב מתוך אכפתיות, אנו יוצרים מקום מזמין שבו אנשים מכל רקע יכולים למצוא תקווה, להעמיק את הקשר עם ה׳, לבנות חברויות כנות ולהתמודד עם אתגרי החיים באמונה, בשמחה ובתכלית — כדי שאיש לא יצטרך להתמודד או לצמוח לבד.",
    storyEyebrow: "הסיפור שלנו",
    storyTitle: "כמה אנשים סביב שולחן הפכו לקהילה.",
    storyParagraphs: [
      "Ruach Breslov התחילה באנשים שלמדו יחד, דיברו בכנות ופינו מקום זה לזה. המפגש צמח מפני שאיש לא נדרש להעמיד פנים שיש לו את כל התשובות.",
      "בהשראת רבי נחמן אנו מאמינים שבכל נשמה יש אור שאין לו שיעור, גם כשהוא נסתר. לפעמים דבר תורה, ארוחה משותפת, חבר טוב או שיחה אמיתית מספיקים כדי לעזור לאדם לראות אותו מחדש."
    ],
    workEyebrow: "מה אנחנו עושים",
    workTitle: "המשימה הופכת למציאות בתוך החדר.",
    workCopy: "התוכניות שלנו מחברות לימוד, ליווי, הכנסת אורחים וקשר אנושי בדרכים מעשיות.",
    leadershipEyebrow: "הנהגת הארגון",
    leadershipTitle: "הנהגה",
    leadershipCopy: "Benjamin Roberts מוביל את הפעילות השוטפת של Ruach Breslov ומסייע להפוך את המשימה שלה לתוכניות עקביות, לקשרים ולתמיכה בקהילה.",
    legalEyebrow: "אחריות ציבורית",
    legalTitle: "הזהות המשפטית שלנו",
    legalCopy: "Ruach Breslov Inc. רשומה ברשות המסים האמריקאית כעמותת צדקה ציבורית הזכאית לקבל תרומות המוכרות לצורכי מס.",
    legalNameLabel: "שם משפטי",
    einLabel: "מספר זיהוי מעסיק (EIN)",
    classificationLabel: "סיווג ברשות המסים האמריקאית",
    classification: "עמותת צדקה ציבורית",
    addressLabel: "מיקום עיקרי",
    verifyStatus: "אימות המעמד שלנו באתר רשות המסים",
    ctaTitle: "עזרו לנו להשאיר את הדלת פתוחה.",
    ctaCopy: "התמיכה שלכם מסייעת לקיים לימוד תורה שבועי, הכוונה אישית, אוכל ואירוח, מרצים אורחים, אירועי קהילה ופעילות קירוב."
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
    description: "צפו בשיעורים ובסיפורים רשמיים מערוץ ה‑YouTube של Ruach Breslov.",
    emptyTitle: "סרטונים יעלו בקרוב",
    emptyCopy: "הישארו מחוברים ללימודים, שיחות וסיפורים חדשים מן הקהילה.",
    channelCta: "לערוץ ה‑YouTube שלנו",
    channelDescription: "קהילה צומחת שמביאה את תורת רבי נחמן לחיים עצמם — בבהירות, שמחה, עומק וחיבור.",
    videoCount: "{count} סרטונים",
    videosTab: "סרטונים",
    shortsTab: "Shorts",
    latest: "החדשים ביותר",
    popular: "פופולריים",
    oldest: "הישנים ביותר",
    searchLabel: "חיפוש בערוץ",
    searchPlaceholder: "חיפוש סרטונים",
    clearSearch: "ניקוי החיפוש",
    closePlayer: "סגירת נגן הווידאו",
    playVideo: "הפעלת הסרטון",
    views: "צפיות",
    noResults: "לא נמצאו סרטונים התואמים לחיפוש."
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
    mapEyebrow: "מתכננים את הביקור",
    mapTitle: "איך מגיעים אלינו בפלאשינג",
    mapCopy: "פתחו הוראות נסיעה ישירות למיקום שלנו. אנא אשרו איתנו את תאריך ושעת השיעור לפני היציאה לדרך.",
    mapFrameTitle: "מפת Google המציגה את מיקום Ruach Breslov בפלאשינג",
    directionsCta: "הוראות נסיעה",
    openMapCta: "פתיחה ב‑Google Maps",
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
    givingFrequency: "תדירות התרומה",
    oneTimeOption: "חד־פעמית",
    monthlyOption: "חודשית",
    monthlyAmountPrompt: "בחרו סכום חודשי",
    continueToStripe: "המשך מאובטח ל‑Stripe",
    stripeRedirectNote: "Stripe ייפתח בכרטיסייה חדשה כדי לאסוף ולעבד את התשלום באופן מאובטח.",
    oneTimeCta: "בחירת סכום חד־פעמי",
    monthlyCta: "תרומה של {amount} בכל חודש",
    monthlyLabel: "לחודש",
    monthlyDisclosure: "תרומות חודשיות מתחדשות אוטומטית מדי חודש עד לביטול. אפשר לנהל או לבטל באמצעות Stripe או בפנייה ל‑Ruach Breslov.",
    manageMonthlyCta: "ניהול התמיכה החודשית",
    impactTitle: "התמיכה שלכם מסייעת לקיים",
    impactItems: ["שיעורי תורה שבועיים", "אוכל ואירוח", "מרצים אורחים מעוררי השראה", "אירועי קהילה ופעילות קירוב"],
    nonprofitTitle: "תורמים בביטחון",
    nonprofitCopy: "Ruach Breslov Inc. רשומה ברשות המסים האמריקאית כעמותת צדקה ציבורית הזכאית לקבל תרומות המוכרות לצורכי מס.",
    verifyStatus: "אימות המעמד שלנו באתר רשות המסים",
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
      { title: "ספקי שירות", copy: "GitHub Pages מאחסן את האתר. Cloudflare מספקת DNS, אחסון API, מסד נתונים ואבטחת Turnstile. Resend שולחת דוא״ל ומנהלת הרשמות מאושרות. Stripe מעבדת באופן מאובטח תרומות ופרטי תשלומים חוזרים בעמודים המאוחסנים אצלה. כאשר בוחרים להפעיל סרטון מוטמע, YouTube מקבלת את הבקשה ומעבדת אותה בהתאם למדיניות שלה. כאשר מפת המיקום נטענת או כשפותחים הוראות נסיעה, Google Maps מקבלת את הבקשה ומעבדת אותה בהתאם למדיניות שלה. ספקים אלה מעבדים מידע רק ככל שנדרש להפעלת השירותים." },
      { title: "שמירה ואבטחה", copy: "הודעות קשר נמסרות בדוא״ל ואינן נשמרות במסד הנתונים של האתר. בקשות הרשמה שלא אושרו פגות לאחר 24 שעות. פרטי הרשמה מאושרים נשמרים ב‑Resend עד להסרה או לבקשת מחיקה. רשומות אבטחה מוגבלות נשמרות למניעת שימוש לרעה." },
      { title: "הבחירות שלכם", copy: "אפשר להסיר הרשמה באמצעות הקישורים בהודעות שלנו. לבקשת גישה, תיקון או מחיקה של מידע שמסרתם, כתבו ל‑info@ruachbreslov.org." }
    ]
  },
  footer: {
    description: "מקום בקווינס ללמוד, לחלוק שולחן ולהתקדם יחד.",
    privacy: "פרטיות",
    rights: "כל הזכויות שמורות."
  }
};

const es: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "Torá, amistad, emuná y alegría en Queens.",
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
  nav: { home: "Inicio", about: "Quiénes somos", events: "Eventos", gallery: "Galería", videos: "Videos", contact: "Contacto", support: "Apoyar" },
  actions: {
    exploreEvents: "Explorar eventos",
    contactUs: "Contáctanos",
    donate: "Donar",
    watchVideos: "Mira y aprende",
    rsvp: "Confirmar asistencia",
    supportUs: "Apóyanos",
    submit: "Enviar mensaje",
    subscribe: "Suscribirme",
    viewGallery: "Ver la galería",
    aboutUs: "Conoce Ruach Breslov",
    close: "Cerrar",
    openMenu: "Abrir menú"
  },
  home: {
    eyebrow: "Torá, amistad y un poco más de luz",
    title: "Ven tal como eres. Aquí hay un lugar para ti.",
    description: "Ruach Breslov es una comunidad creciente de Queens donde las enseñanzas del Rebe Najmán se encuentran con la vida real. Aprendemos, comemos, hacemos preguntas sinceras y nos ayudamos a avanzar, con emuná y alegría.",
    gatheringCopy: "La sala es mucho más que un escenario. Aquí la Torá se vuelve conversación, los desconocidos se vuelven amigos y cada persona encuentra fuerzas para dar su próximo paso.",
    missionEyebrow: "Nuestra misión",
    missionTitle: "Torá para la vida real. Una comunidad que se hace presente.",
    missionCopy: "Llevamos las enseñanzas del Rebe Najmán a la vida cotidiana para que las personas encuentren esperanza, profundicen su fe, construyan amistades sinceras y afronten los desafíos con alegría y propósito.",
    featureEyebrow: "Lo que sucede aquí",
    featureTitle: "Más que una clase. Una sala llena de personas que se hacen presentes.",
    featureCopy: "Sin apariencias y sin exigir una historia perfecta: Torá práctica, calidez y conversación sincera.",
    features: [
      { title: "Clases semanales de Torá", copy: "Encuentros inspiradores centrados en las enseñanzas del Rebe Najmán, el crecimiento, la conexión y la simjá." },
      { title: "Acompañamiento personal", copy: "Orientación y aliento para quien busca dirección, apoyo o alguien que camine a su lado." },
      { title: "Eventos comunitarios", copy: "Comida, música, aprendizaje y amistad se unen para crear una experiencia judía significativa." },
      { title: "Oradores invitados y alcance", copy: "Nuevas perspectivas de Torá y una mano abierta para quienes buscan conexión y aliento." }
    ],
    storyEyebrow: "Cómo comenzó",
    storyTitle: "Unas personas alrededor de una mesa se convirtieron en una hermandad.",
    storyParagraphs: [
      "Lo que comenzó como un pequeño encuentro se ha convertido en una hermandad real, construida sobre la Torá, la honestidad, la amistad y la convicción de que nadie debería afrontar sus luchas en soledad.",
      "Inspirados por el Rebe Najmán, creemos que cada alma lleva una luz inconmensurable, aun cuando parezca oculta. A veces, la Torá adecuada, un buen amigo o una conversación sincera nos recuerdan quiénes somos de verdad."
    ],
    galleryEyebrow: "Dentro de la comunidad",
    galleryTitle: "Descubre cómo se siente estar en la sala.",
    galleryCopy: "No son fotos de archivo ni una idea escenificada de comunidad: son las mesas, los rostros, el aprendizaje y los momentos compartidos que hacen real a Ruach Breslov.",
    subscriptionTitle: "Mantente al día",
    subscriptionCopy: "Elige boletines, anuncios de eventos o ambos. Tú mantienes el control de tus preferencias."
  },
  about: {
    eyebrow: "Quiénes somos",
    title: "Fe que se encuentra con la vida real. Una comunidad que se hace presente.",
    description: "Ruach Breslov es una organización benéfica pública en Flushing, Nueva York, que lleva las enseñanzas del Rebe Najmán a la vida cotidiana mediante el estudio de Torá, el acompañamiento personal, la hospitalidad y la comunidad.",
    missionEyebrow: "Nuestra misión",
    missionTitle: "Ayudar a cada persona a encontrar esperanza, fe y un lugar al que pertenecer.",
    mission: "La misión de Ruach Breslov es fortalecer la vida judía y los vínculos humanos llevando las enseñanzas del Rebe Najmán a la realidad cotidiana. Mediante el estudio accesible de la Torá, el acompañamiento personal, las comidas compartidas, los encuentros comunitarios y un alcance compasivo, creamos un lugar acogedor donde personas de todos los orígenes puedan encontrar esperanza, profundizar su relación con Dios, construir amistades sinceras y afrontar los desafíos de la vida con fe, alegría y propósito, para que nadie tenga que luchar ni crecer en soledad.",
    storyEyebrow: "Nuestra historia",
    storyTitle: "Unas personas alrededor de una mesa se convirtieron en una comunidad.",
    storyParagraphs: [
      "Ruach Breslov comenzó con personas que aprendían juntas, hablaban con sinceridad y se hacían espacio unas a otras. El encuentro creció porque nadie tenía que fingir que ya lo tenía todo resuelto.",
      "Inspirados por el Rebe Najmán, creemos que cada alma lleva una luz inconmensurable, aun cuando parezca escondida. A veces una enseñanza de Torá, una comida compartida, un buen amigo o una conversación real bastan para ayudar a alguien a verla de nuevo."
    ],
    workEyebrow: "Lo que hacemos",
    workTitle: "La misión se vuelve real dentro de la sala.",
    workCopy: "Nuestros programas unen aprendizaje, acompañamiento, hospitalidad y conexión humana de maneras prácticas.",
    leadershipEyebrow: "Liderazgo de la organización",
    leadershipTitle: "Liderazgo",
    leadershipCopy: "Benjamin Roberts dirige las operaciones cotidianas de Ruach Breslov y ayuda a convertir su misión en programas constantes, relaciones y apoyo comunitario.",
    legalEyebrow: "Responsabilidad pública",
    legalTitle: "Nuestra identidad legal",
    legalCopy: "Ruach Breslov Inc. figura ante el Servicio de Impuestos Internos de EE. UU. como una organización benéfica pública autorizada para recibir contribuciones caritativas deducibles de impuestos.",
    legalNameLabel: "Nombre legal",
    einLabel: "Número de Identificación del Empleador (EIN)",
    classificationLabel: "Clasificación del IRS",
    classification: "Organización benéfica pública",
    addressLabel: "Ubicación principal",
    verifyStatus: "Verificar nuestro estado ante el IRS",
    ctaTitle: "Ayúdanos a mantener la puerta abierta.",
    ctaCopy: "Tu apoyo ayuda a ofrecer estudio semanal de Torá, orientación personal, comida y hospitalidad, oradores invitados, eventos comunitarios y alcance."
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
    description: "Mira enseñanzas e historias oficiales del canal de YouTube de Ruach Breslov.",
    emptyTitle: "Próximamente publicaremos videos",
    emptyCopy: "Mantente en contacto para recibir nuevas enseñanzas, conversaciones e historias de la comunidad.",
    channelCta: "Visita nuestro canal de YouTube",
    channelDescription: "Una comunidad en crecimiento que lleva las enseñanzas de Rebe Najmán a la vida real, con claridad, alegría, profundidad y conexión.",
    videoCount: "{count} videos",
    videosTab: "Videos",
    shortsTab: "Shorts",
    latest: "Más recientes",
    popular: "Populares",
    oldest: "Más antiguos",
    searchLabel: "Buscar en este canal",
    searchPlaceholder: "Buscar videos",
    clearSearch: "Borrar búsqueda",
    closePlayer: "Cerrar reproductor",
    playVideo: "Reproducir video",
    views: "visualizaciones",
    noResults: "Ningún video coincide con la búsqueda."
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
    mapEyebrow: "Planifica tu visita",
    mapTitle: "Encuéntranos en Flushing",
    mapCopy: "Abre indicaciones para llegar directamente a nuestra ubicación. Confirma con nosotros la fecha y hora de la clase antes de viajar.",
    mapFrameTitle: "Mapa de Google que muestra la ubicación de Ruach Breslov en Flushing",
    directionsCta: "Cómo llegar en auto",
    openMapCta: "Abrir en Google Maps",
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
    givingFrequency: "Frecuencia de donación",
    oneTimeOption: "Una vez",
    monthlyOption: "Mensual",
    monthlyAmountPrompt: "Elige una cantidad mensual",
    continueToStripe: "Continuar de forma segura en Stripe",
    stripeRedirectNote: "Stripe se abre en una pestaña nueva para recopilar y procesar tu pago de forma segura.",
    oneTimeCta: "Elegir una cantidad única",
    monthlyCta: "Donar {amount} al mes",
    monthlyLabel: "al mes",
    monthlyDisclosure: "Las donaciones mensuales se renuevan automáticamente cada mes hasta que las canceles. Puedes administrarlas o cancelarlas mediante Stripe o contactando a Ruach Breslov.",
    manageMonthlyCta: "Administrar apoyo mensual",
    impactTitle: "Tu apoyo ayuda a ofrecer",
    impactItems: ["Clases semanales de Torá", "Comida y hospitalidad", "Oradores invitados inspiradores", "Eventos y alcance comunitario"],
    nonprofitTitle: "Dona con confianza",
    nonprofitCopy: "Ruach Breslov Inc. figura ante el IRS como una organización benéfica pública autorizada para recibir contribuciones caritativas deducibles de impuestos.",
    verifyStatus: "Verificar nuestro estado ante el IRS",
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
      { title: "Proveedores de servicios", copy: "GitHub Pages aloja el sitio. Cloudflare proporciona DNS, alojamiento de la API, base de datos y seguridad Turnstile. Resend entrega correos y administra suscripciones confirmadas. Stripe procesa de forma segura las donaciones y los datos de pagos recurrentes en sus páginas alojadas. Cuando eliges reproducir un video incorporado, YouTube recibe la solicitud y la procesa conforme a sus políticas. Cuando se carga el mapa de ubicación o abres las indicaciones, Google Maps recibe la solicitud y la procesa conforme a sus políticas. Estos proveedores procesan información solo cuando es necesario para prestar esos servicios." },
      { title: "Conservación y seguridad", copy: "Los mensajes de contacto se entregan por correo y no se guardan en la base de datos del sitio. Las solicitudes de suscripción no confirmadas vencen después de 24 horas. Los datos de suscripciones confirmadas permanecen en Resend hasta que canceles la suscripción o solicites su eliminación. Conservamos registros de seguridad limitados para prevenir abusos." },
      { title: "Tus opciones", copy: "Puedes cancelar la suscripción mediante los enlaces incluidos en nuestros correos. Para solicitar acceso, corrección o eliminación de información que enviaste, escribe a info@ruachbreslov.org." }
    ]
  },
  footer: {
    description: "Un lugar en Queens para aprender, compartir la mesa y avanzar juntos.",
    privacy: "Privacidad",
    rights: "Todos los derechos reservados."
  }
};

const fa: Dictionary = {
  siteName: "Ruach Breslov",
  siteTagline: "تورات، دوستی، ایمان و شادی در کویینز.",
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
  nav: { home: "خانه", about: "دربارۀ ما", events: "رویدادها", gallery: "گالری", videos: "ویدیوها", contact: "تماس", support: "حمایت" },
  actions: {
    exploreEvents: "مشاهده رویدادها",
    contactUs: "تماس با ما",
    donate: "اهدای کمک",
    watchVideos: "ببینید و بیاموزید",
    rsvp: "ثبت حضور",
    supportUs: "حمایت کنید",
    submit: "ارسال پیام",
    subscribe: "عضویت",
    viewGallery: "مشاهدۀ گالری",
    aboutUs: "دربارۀ Ruach Breslov",
    close: "بستن",
    openMenu: "باز کردن منو"
  },
  home: {
    eyebrow: "تورات، دوستی و کمی نور بیشتر",
    title: "همان‌گونه که هستید بیایید. اینجا جایی برای شماست.",
    description: "Ruach Breslov جامعه‌ای رو به رشد در کویینز است؛ جایی که آموزه‌های ربی نحمان با زندگی واقعی روبه‌رو می‌شوند. با هم می‌آموزیم، غذا می‌خوریم، صادقانه می‌پرسیم و با ایمان و شادی به یکدیگر برای پیش رفتن کمک می‌کنیم.",
    gatheringCopy: "این اتاق فقط یک پس‌زمینه نیست؛ جایی است که تورات به گفت‌وگو تبدیل می‌شود، غریبه‌ها دوست می‌شوند و آدم‌ها نیروی گام بعدی را پیدا می‌کنند.",
    missionEyebrow: "ماموریت ما",
    missionTitle: "تورات برای زندگی واقعی؛ جامعه‌ای که واقعاً حضور دارد.",
    missionCopy: "آموزه‌های ربی نحمان را به زندگی روزمره می‌آوریم تا مردم امید بیابند، ایمان خود را عمیق‌تر کنند، دوستی‌های صادقانه بسازند و با شادی و هدف با دشواری‌های زندگی روبه‌رو شوند.",
    featureEyebrow: "اینجا چه می‌گذرد",
    featureTitle: "فراتر از یک کلاس؛ اتاقی پُر از آدم‌هایی که واقعاً حضور دارند.",
    featureCopy: "بدون نمایش و بدون نیاز به پیشینه‌ای بی‌نقص؛ فقط تورات کاربردی، گرما و گفت‌وگویی صادقانه.",
    features: [
      { title: "کلاس‌های هفتگی تورات", copy: "گردهمایی‌های الهام‌بخش پیرامون آموزه‌های ربی نحمان، رشد فردی، پیوند و شادی." },
      { title: "راهنمایی فردی", copy: "راهنمایی و دلگرمی برای هرکس که به دنبال مسیر، حمایت یا همراهی در راه است." },
      { title: "رویدادهای اجتماعی", copy: "غذا، موسیقی، یادگیری و دوستی برای ساختن تجربه‌ای معنادار از زندگی یهودی کنار هم می‌آیند." },
      { title: "سخنرانان مهمان و ارتباط‌گیری", copy: "نگاهی تازه به تورات و دستی گشوده برای کسانی که به دنبال پیوند و دلگرمی هستند." }
    ],
    storyEyebrow: "چگونه آغاز شد",
    storyTitle: "چند نفر دور یک میز به برادری تبدیل شدند.",
    storyParagraphs: [
      "آنچه با گردهمایی کوچکی آغاز شد، به برادری واقعی بر پایۀ تورات، صداقت، دوستی و این باور تبدیل شده است که هیچ‌کس نباید در دشواری‌هایش تنها بماند.",
      "با الهام از ربی نحمان باور داریم هر روح نوری بی‌اندازه در خود دارد، حتی زمانی که آن نور پنهان به نظر می‌رسد. گاهی یک آموزۀ درست، یک دوست خوب یا گفت‌وگویی صادقانه به انسان یادآوری می‌کند که واقعاً کیست."
    ],
    galleryEyebrow: "درون جامعه",
    galleryTitle: "ببینید بودن در این اتاق چه حسی دارد.",
    galleryCopy: "نه عکس‌های آماده و نه تصویری صحنه‌سازی‌شده از جامعه؛ اینها میزها، چهره‌ها، یادگیری و لحظه‌های مشترکی هستند که Ruach Breslov را واقعی می‌کنند.",
    subscriptionTitle: "در ارتباط بمانید",
    subscriptionCopy: "خبرنامه، اطلاعیه رویدادها یا هر دو را انتخاب کنید. کنترل ترجیحات در اختیار شماست."
  },
  about: {
    eyebrow: "ما که هستیم",
    title: "ایمانی که با زندگی واقعی روبه‌رو می‌شود؛ جامعه‌ای که واقعاً حضور دارد.",
    description: "Ruach Breslov یک خیریۀ عمومی در فلاشینگِ نیویورک است که آموزه‌های ربی نحمان را از راه آموزش تورات، راهنمایی فردی، مهمان‌نوازی و جامعه وارد زندگی روزمره می‌کند.",
    missionEyebrow: "ماموریت ما",
    missionTitle: "کمک کنیم هر فرد امید، ایمان و جایی برای تعلق پیدا کند.",
    mission: "ماموریت Ruach Breslov تقویت زندگی یهودی و پیوند انسانی با آوردن آموزه‌های ربی نحمان به واقعیت زندگی روزمره است. از راه آموزش دسترس‌پذیر تورات، راهنمایی فردی، وعده‌های مشترک، گردهمایی‌های اجتماعی و ارتباط‌گیری دلسوزانه، فضایی پذیرا می‌سازیم تا افراد با هر پیشینه‌ای امید بیابند، رابطۀ خود با خدا را عمیق‌تر کنند، دوستی‌های صادقانه بسازند و با ایمان، شادی و هدف با دشواری‌های زندگی روبه‌رو شوند؛ تا هیچ‌کس مجبور نباشد تنها مبارزه کند یا رشد کند.",
    storyEyebrow: "داستان ما",
    storyTitle: "چند نفر دور یک میز به یک جامعه تبدیل شدند.",
    storyParagraphs: [
      "Ruach Breslov با افرادی آغاز شد که کنار هم می‌آموختند، صادقانه سخن می‌گفتند و برای یکدیگر جا باز می‌کردند. این جمع رشد کرد چون هیچ‌کس مجبور نبود وانمود کند پاسخ همۀ پرسش‌ها را می‌داند.",
      "با الهام از ربی نحمان باور داریم هر روح نوری بی‌اندازه در خود دارد، حتی زمانی که پنهان به نظر می‌رسد. گاهی یک آموزۀ تورات، یک وعدۀ مشترک، دوستی خوب یا گفت‌وگویی واقعی کافی است تا کسی دوباره آن نور را ببیند."
    ],
    workEyebrow: "کار ما",
    workTitle: "ماموریت در این اتاق به واقعیت تبدیل می‌شود.",
    workCopy: "برنامه‌های ما آموزش، راهنمایی، مهمان‌نوازی و پیوند انسانی را به شیوه‌هایی عملی در کنار هم قرار می‌دهند.",
    leadershipEyebrow: "رهبری سازمان",
    leadershipTitle: "رهبری",
    leadershipCopy: "Benjamin Roberts فعالیت‌های روزمرۀ Ruach Breslov را هدایت می‌کند و کمک می‌کند ماموریت آن به برنامه‌های منظم، روابط پایدار و حمایت از جامعه تبدیل شود.",
    legalEyebrow: "پاسخ‌گویی عمومی",
    legalTitle: "هویت حقوقی ما",
    legalCopy: "Ruach Breslov Inc. در فهرست ادارۀ مالیات ایالات متحده به‌عنوان خیریۀ عمومی واجد شرایط دریافت کمک‌های خیریۀ قابل کسر از مالیات ثبت شده است.",
    legalNameLabel: "نام حقوقی",
    einLabel: "شمارۀ شناسایی کارفرما (EIN)",
    classificationLabel: "رده‌بندی ادارۀ مالیات آمریکا",
    classification: "خیریۀ عمومی",
    addressLabel: "محل اصلی",
    verifyStatus: "تأیید وضعیت ما در ادارۀ مالیات آمریکا",
    ctaTitle: "کمک کنید درِ این خانه باز بماند.",
    ctaCopy: "حمایت شما به برگزاری آموزش هفتگی تورات، راهنمایی فردی، غذا و پذیرایی، سخنرانان مهمان، رویدادهای اجتماعی و ارتباط‌گیری کمک می‌کند."
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
    description: "آموزه‌ها و روایت‌های رسمی کانال YouTube متعلق به Ruach Breslov را تماشا کنید.",
    emptyTitle: "ویدیوها به‌زودی منتشر می‌شوند",
    emptyCopy: "برای دریافت آموزه‌ها، گفت‌وگوها و روایت‌های تازه از جامعه با ما در ارتباط بمانید.",
    channelCta: "مشاهدۀ کانال YouTube ما",
    channelDescription: "جامعه‌ای رو به رشد که آموزه‌های ربی نحمان را با روشنی، شادی، عمق و پیوند وارد زندگی واقعی می‌کند.",
    videoCount: "{count} ویدیو",
    videosTab: "ویدیوها",
    shortsTab: "Shorts",
    latest: "جدیدترین",
    popular: "محبوب‌ترین",
    oldest: "قدیمی‌ترین",
    searchLabel: "جست‌وجو در کانال",
    searchPlaceholder: "جست‌وجوی ویدیوها",
    clearSearch: "پاک کردن جست‌وجو",
    closePlayer: "بستن پخش‌کننده",
    playVideo: "پخش ویدیو",
    views: "بازدید",
    noResults: "هیچ ویدیویی با این جست‌وجو مطابقت ندارد."
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
    mapEyebrow: "برای مراجعه برنامه‌ریزی کنید",
    mapTitle: "موقعیت ما در فلاشینگ",
    mapCopy: "مسیر رانندگی مستقیم به محل ما را باز کنید. لطفاً پیش از حرکت، تاریخ و ساعت کلاس را با ما تأیید کنید.",
    mapFrameTitle: "نقشه Google که موقعیت Ruach Breslov در فلاشینگ را نشان می‌دهد",
    directionsCta: "مسیریابی رانندگی",
    openMapCta: "باز کردن در Google Maps",
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
    givingFrequency: "تکرار کمک",
    oneTimeOption: "یک‌باره",
    monthlyOption: "ماهانه",
    monthlyAmountPrompt: "مبلغ ماهانه را انتخاب کنید",
    continueToStripe: "ادامه امن در Stripe",
    stripeRedirectNote: "Stripe در برگه‌ای جدید باز می‌شود تا پرداخت شما را به‌صورت امن دریافت و پردازش کند.",
    oneTimeCta: "انتخاب مبلغ یک‌باره",
    monthlyCta: "ماهانه {amount} کمک کنید",
    monthlyLabel: "در ماه",
    monthlyDisclosure: "کمک‌های ماهانه هر ماه به‌طور خودکار تمدید می‌شوند تا زمانی که لغو شوند. می‌توانید از طریق Stripe یا با تماس با Ruach Breslov آن را مدیریت یا لغو کنید.",
    manageMonthlyCta: "مدیریت حمایت ماهانه",
    impactTitle: "حمایت شما به فراهم کردن این موارد کمک می‌کند",
    impactItems: ["کلاس‌های هفتگی تورات", "غذا و پذیرایی", "سخنرانان مهمان الهام‌بخش", "رویدادها و ارتباط با جامعه"],
    nonprofitTitle: "با اطمینان کمک کنید",
    nonprofitCopy: "Ruach Breslov Inc. در فهرست ادارۀ مالیات آمریکا به‌عنوان خیریۀ عمومی واجد شرایط دریافت کمک‌های خیریۀ قابل کسر از مالیات ثبت شده است.",
    verifyStatus: "تأیید وضعیت ما در ادارۀ مالیات آمریکا",
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
      { title: "ارائه‌دهندگان خدمات", copy: "GitHub Pages میزبان وب‌سایت است. Cloudflare خدمات DNS، میزبانی API، پایگاه داده و امنیت Turnstile را ارائه می‌دهد. Resend ایمیل‌ها و عضویت‌های تأییدشده را مدیریت می‌کند. Stripe کمک‌ها و اطلاعات پرداخت‌های دوره‌ای را به‌صورت امن در صفحه‌های میزبانی‌شدۀ خود پردازش می‌کند. وقتی پخش یک ویدیوی جاسازی‌شده را انتخاب می‌کنید، YouTube درخواست را دریافت و طبق سیاست‌های خود پردازش می‌کند. وقتی نقشۀ موقعیت بارگیری می‌شود یا مسیریابی را باز می‌کنید، Google Maps درخواست را دریافت و طبق سیاست‌های خود پردازش می‌کند. این ارائه‌دهندگان فقط به میزان لازم برای ارائۀ خدمات اطلاعات را پردازش می‌کنند." },
      { title: "نگهداری و امنیت", copy: "پیام‌های تماس از طریق ایمیل تحویل می‌شوند و در پایگاه دادۀ وب‌سایت ذخیره نمی‌شوند. درخواست‌های عضویت تأییدنشده پس از ۲۴ ساعت منقضی می‌شوند. اطلاعات عضویت تأییدشده تا لغو عضویت یا درخواست حذف در Resend باقی می‌ماند. سوابق امنیتی محدود برای جلوگیری از سوءاستفاده نگهداری می‌شوند." },
      { title: "انتخاب‌های شما", copy: "می‌توانید از پیوندهای موجود در ایمیل‌ها عضویت را لغو کنید. برای درخواست دسترسی، اصلاح یا حذف اطلاعاتی که فرستاده‌اید به info@ruachbreslov.org ایمیل بزنید." }
    ]
  },
  footer: {
    description: "جایی در کویینز برای یادگیری، هم‌سفره شدن و پیش رفتن در کنار هم.",
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
