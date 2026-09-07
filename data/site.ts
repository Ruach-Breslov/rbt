import { withBasePath } from "@/lib/paths";

function optionalPublicUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    const safeCredentials = !url.username && !url.password;
    return safeCredentials && (url.protocol === "https:" || localHttp) ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}

function optionalHostedUrl(value: string | undefined, allowedHostnames: ReadonlySet<string>) {
  const candidate = optionalPublicUrl(value);
  if (!candidate) return "";
  const url = new URL(candidate);
  return url.protocol === "https:" && allowedHostnames.has(url.hostname.toLowerCase()) ? candidate : "";
}

const stripePaymentHosts = new Set(["buy.stripe.com", "donate.stripe.com"]);
const stripePortalHosts = new Set(["billing.stripe.com"]);
const youtubeHosts = new Set(["www.youtube.com", "youtube.com"]);

function optionalApiOrigin(value: string | undefined) {
  const candidate = optionalPublicUrl(value);
  if (!candidate) return "";
  const url = new URL(candidate);
  const localDevelopment = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const productionApi = url.protocol === "https:" && url.hostname.toLowerCase() === "api.ruachbreslov.org";
  return (localDevelopment || productionApi) && url.pathname === "/" && !url.search && !url.hash ? url.origin : "";
}

const configuredSiteUrl = optionalPublicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://example.com";
const apiBaseUrl = optionalApiOrigin(process.env.NEXT_PUBLIC_API_BASE_URL);
const configuredHeroImage = process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/media/hero/home-hero-client.webp";
const heroImage = configuredHeroImage.startsWith("/") && !configuredHeroImage.startsWith("//") && !configuredHeroImage.includes("..")
  ? withBasePath(configuredHeroImage as `/${string}`)
  : "";

const oneTimePaymentLink = optionalHostedUrl(
  process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_PAYMENT_LINK || process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
  stripePaymentHosts
);

export const site = {
  url: configuredSiteUrl,
  organization: {
    legalName: "Ruach Breslov Inc.",
    ein: "41-3212278",
    classification: "IRS-listed public charity",
    leader: {
      name: "Benjamin Roberts",
      role: "Executive Director"
    },
    irsSearchUrl: "https://apps.irs.gov/app/eos/",
    address: {
      street: "71-27 147th St",
      locality: "Flushing",
      region: "NY",
      postalCode: "11367",
      country: "US"
    }
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@ruachbreslov.org",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "917-740-4509",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || "71-27 147th St, Flushing, NY 11367"
  },
  api: {
    baseUrl: apiBaseUrl,
    contact: apiBaseUrl ? `${apiBaseUrl}/v1/contact` : "",
    subscribe: apiBaseUrl ? `${apiBaseUrl}/v1/subscribe` : "",
    rsvp: apiBaseUrl ? `${apiBaseUrl}/v1/rsvp` : ""
  },
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ""
  },
  payments: {
    oneTimePaymentLink,
    customerPortalUrl: optionalHostedUrl(process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL, stripePortalHosts),
    monthlyPaymentLinks: [
      { amount: 18, url: optionalHostedUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_18, stripePaymentHosts) },
      { amount: 36, url: optionalHostedUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_36, stripePaymentHosts) },
      { amount: 72, url: optionalHostedUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_72, stripePaymentHosts) },
      { amount: 180, url: optionalHostedUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_180, stripePaymentHosts) }
    ],
    currency: "USD",
    timeZone: "America/New_York"
  },
  youtube: {
    channelUrl: optionalHostedUrl(process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL, youtubeHosts) || "https://www.youtube.com/@RuachBreslov"
  },
  media: {
    heroImage,
    communityImage: withBasePath("/media/gallery/study-partners.webp"),
    gatheringImage: withBasePath("/media/gallery/full-room.webp")
  }
} as const;

export function absoluteUrl(path: `/${string}` | "/" = "/") {
  const origin = new URL(site.url).origin;
  return new URL(withBasePath(path), `${origin}/`).toString();
}

export function publicAsset(path: `/${string}`) {
  return withBasePath(path);
}
