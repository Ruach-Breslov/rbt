import { site } from "@/data/site";

function originOf(value: string) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

export function contentSecurityPolicy() {
  const apiOrigin = originOf(site.api.baseUrl);
  const turnstileOrigin = site.turnstile.siteKey ? "https://challenges.cloudflare.com" : "";
  const connectSources = ["'self'", apiOrigin, turnstileOrigin].filter(Boolean).join(" ");
  const scriptSources = process.env.NODE_ENV === "production"
    ? ["'self'", "'unsafe-inline'", turnstileOrigin].filter(Boolean).join(" ")
    : ["'self'", "'unsafe-inline'", "'unsafe-eval'", turnstileOrigin].filter(Boolean).join(" ");

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src ${scriptSources}`,
    `connect-src ${connectSources}`,
    "frame-src https://www.youtube-nocookie.com https://checkout.stripe.com https://challenges.cloudflare.com",
    "form-action 'self' https://checkout.stripe.com https://buy.stripe.com",
    process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : ""
  ].filter(Boolean).join("; ");
}
