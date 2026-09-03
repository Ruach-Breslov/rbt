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
const configuredHeroImage = process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() ?? "";
const heroImage = configuredHeroImage.startsWith("/") && !configuredHeroImage.startsWith("//") && !configuredHeroImage.includes("..")
  ? withBasePath(configuredHeroImage as `/${string}`)
  : "";

export const site = {
  url: configuredSiteUrl,
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@example.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+1 000 000 0000",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || "Add your public address"
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
    stripePaymentLink: optionalPublicUrl(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK),
    currency: "USD",
    timeZone: "America/New_York"
  },
  youtube: {
    channelUrl: optionalPublicUrl(process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL)
  },
  media: {
    heroImage
  }
} as const;

export function absoluteUrl(path: `/${string}` | "/" = "/") {
  const origin = new URL(site.url).origin;
  return new URL(withBasePath(path), `${origin}/`).toString();
}

export function publicAsset(path: `/${string}`) {
  return withBasePath(path);
}
