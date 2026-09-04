import { withBasePath } from "@/lib/paths";

function optionalPublicUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    return url.protocol === "https:" || localHttp ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}

const configuredSiteUrl = optionalPublicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://example.com";
const apiBaseUrl = optionalPublicUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
const configuredHeroImage = process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/media/hero/ruach-breslov-hero.webp";
const heroImage = configuredHeroImage.startsWith("/") && !configuredHeroImage.startsWith("//") && !configuredHeroImage.includes("..")
  ? withBasePath(configuredHeroImage as `/${string}`)
  : "";

const oneTimePaymentLink = optionalPublicUrl(
  process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_PAYMENT_LINK || process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK
);

export const site = {
  url: configuredSiteUrl,
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@ruachbreslov.org",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "917-740-4509",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || "71-27 147th St, Flushing, NY 11367"
  },
  api: {
    baseUrl: apiBaseUrl,
    contact: apiBaseUrl ? `${apiBaseUrl}/v1/contact` : "",
    subscribe: apiBaseUrl ? `${apiBaseUrl}/v1/subscribe` : "",
    rsvp: apiBaseUrl ? `${apiBaseUrl}/v1/rsvp` : "",
    checkout: apiBaseUrl ? `${apiBaseUrl}/v1/checkout` : ""
  },
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ""
  },
  payments: {
    oneTimePaymentLink,
    customerPortalUrl: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL),
    monthlyPaymentLinks: [
      { amount: 18, url: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_18) },
      { amount: 36, url: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_36) },
      { amount: 72, url: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_72) },
      { amount: 180, url: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK_180) }
    ],
    currency: "USD",
    timeZone: "America/New_York"
  },
  youtube: {
    channelUrl: optionalPublicUrl(process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL)
  },
  media: {
    heroImage,
    communityImage: withBasePath("/media/gallery/community-study.webp")
  }
} as const;

export function absoluteUrl(path: `/${string}` | "/" = "/") {
  const origin = new URL(site.url).origin;
  return new URL(withBasePath(path), `${origin}/`).toString();
}

export function publicAsset(path: `/${string}`) {
  return withBasePath(path);
}
