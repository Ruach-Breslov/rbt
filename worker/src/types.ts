export type SupportedLocale = "en" | "he" | "es" | "fa";

export interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  PUBLIC_API_URL: string;
  SUBSCRIPTION_CONFIRMATION_REDIRECT_URL: string;
  ORGANIZATION_NAME: string;
  TURNSTILE_SECRET_KEY: string;
  TURNSTILE_EXPECTED_HOSTNAMES: string;
  RATE_LIMIT_SALT: string;
  RESEND_TRANSACTIONAL_API_KEY: string;
  RESEND_CONTACTS_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
  RESEND_NEWSLETTER_TOPIC_ID: string;
  RESEND_EVENTS_TOPIC_ID: string;
  RESEND_WEBHOOK_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_ID?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  RSVP_RETENTION_DAYS?: string;
}

export class PublicError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message = code
  ) {
    super(message);
    this.name = "PublicError";
  }
}

export function requireBinding(env: Env, name: keyof Env) {
  const value = env[name];
  if (typeof value !== "string" || !value.trim()) {
    throw new PublicError(503, "SERVICE_NOT_CONFIGURED", `Missing Worker binding: ${String(name)}`);
  }
  return value.trim();
}
