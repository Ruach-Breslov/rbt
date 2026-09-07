import { PublicError, type SupportedLocale } from "./types";

const locales = new Set<SupportedLocale>(["en", "he", "es", "fa"]);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasUnsafeControlCharacters(value: string) {
  return [...value].some((character) => {
    const code = character.codePointAt(0) ?? 0;
    return code === 127 || (code >= 128 && code <= 159) || (code < 32 && code !== 9 && code !== 10 && code !== 13);
  });
}

type JsonRecord = Record<string, unknown>;

export type ContactInput = ReturnType<typeof validateContact>;
export type SubscribeInput = ReturnType<typeof validateSubscription>;
export type RsvpInput = ReturnType<typeof validateRsvp>;

export async function readJson(request: Request, maximumBytes = 16_384): Promise<JsonRecord> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() ?? "";
  if (contentType !== "application/json") throw new PublicError(415, "UNSUPPORTED_CONTENT_TYPE");

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) throw new PublicError(413, "REQUEST_TOO_LARGE");

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maximumBytes) throw new PublicError(413, "REQUEST_TOO_LARGE");

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    return parsed as JsonRecord;
  } catch {
    throw new PublicError(400, "INVALID_JSON");
  }
}

function text(input: JsonRecord, key: string, minimum: number, maximum: number, optional = false) {
  const raw = input[key];
  if ((raw === undefined || raw === null || raw === "") && optional) return "";
  if (typeof raw !== "string") throw new PublicError(400, "INVALID_INPUT");
  const value = raw.normalize("NFKC").trim();
  if (value.length < minimum || value.length > maximum || hasUnsafeControlCharacters(value)) {
    throw new PublicError(400, "INVALID_INPUT");
  }
  return value;
}

function singleLineText(input: JsonRecord, key: string, minimum: number, maximum: number, optional = false) {
  const value = text(input, key, minimum, maximum, optional);
  if (/[\t\r\n\u2028\u2029\u202a-\u202e\u2066-\u2069]/u.test(value)) throw new PublicError(400, "INVALID_INPUT");
  return value;
}

function email(input: JsonRecord) {
  const value = singleLineText(input, "email", 3, 254).toLowerCase();
  if (!emailPattern.test(value)) throw new PublicError(400, "INVALID_INPUT");
  return value;
}

function locale(input: JsonRecord) {
  const value = singleLineText(input, "locale", 2, 2) as SupportedLocale;
  if (!locales.has(value)) throw new PublicError(400, "INVALID_INPUT");
  return value;
}

function requestId(input: JsonRecord) {
  const value = singleLineText(input, "requestId", 36, 36);
  if (!uuidPattern.test(value)) throw new PublicError(400, "INVALID_INPUT");
  return value.toLowerCase();
}

function timing(input: JsonRecord) {
  const startedAt = input.startedAt;
  const submittedAt = singleLineText(input, "submittedAt", 20, 40);
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) throw new PublicError(400, "INVALID_INPUT");
  const submittedMs = Date.parse(submittedAt);
  const now = Date.now();
  if (!Number.isFinite(submittedMs) || startedAt > now + 60_000 || submittedMs > now + 60_000) {
    throw new PublicError(400, "INVALID_INPUT");
  }
  if (submittedMs - startedAt < 1_500 || submittedMs - startedAt > 86_400_000) {
    throw new PublicError(400, "SUSPICIOUS_SUBMISSION");
  }
  return { startedAt, submittedAt };
}

function common(input: JsonRecord) {
  if (text(input, "website", 0, 200, true)) throw new PublicError(400, "SUSPICIOUS_SUBMISSION");
  if (singleLineText(input, "consent", 7, 7) !== "granted") throw new PublicError(400, "CONSENT_REQUIRED");
  const turnstileToken = singleLineText(input, "cf-turnstile-response", 1, 2048);
  return {
    requestId: requestId(input),
    locale: locale(input),
    name: singleLineText(input, "name", 2, 100),
    email: email(input),
    turnstileToken,
    ...timing(input)
  };
}

export function validateContact(input: JsonRecord) {
  if (text(input, "type", 7, 7) !== "contact") throw new PublicError(400, "INVALID_INPUT");
  const result = common(input);
  const phone = singleLineText(input, "phone", 0, 40, true);
  if (phone && !/^[+\d][\d\s().-]{4,39}$/.test(phone)) throw new PublicError(400, "INVALID_INPUT");
  const preferredLanguage = singleLineText(input, "preferredLanguage", 2, 2) as SupportedLocale;
  if (!locales.has(preferredLanguage)) throw new PublicError(400, "INVALID_INPUT");
  return {
    ...result,
    phone,
    organization: singleLineText(input, "organization", 0, 120, true),
    preferredLanguage,
    reason: singleLineText(input, "reason", 2, 140),
    message: text(input, "message", 10, 5000)
  };
}

export function validateSubscription(input: JsonRecord) {
  if (text(input, "type", 12, 12) !== "subscription") throw new PublicError(400, "INVALID_INPUT");
  const result = common(input);
  if (!Array.isArray(input.topics)) throw new PublicError(400, "INVALID_INPUT");
  const topics = [...new Set(input.topics.map((value) => typeof value === "string" ? value : ""))];
  if (!topics.length || topics.some((value) => value !== "newsletter" && value !== "events")) {
    throw new PublicError(400, "INVALID_INPUT");
  }
  return { ...result, topics: topics as Array<"newsletter" | "events"> };
}

export function validateRsvp(input: JsonRecord) {
  if (text(input, "type", 4, 4) !== "rsvp") throw new PublicError(400, "INVALID_INPUT");
  const result = common(input);
  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) throw new PublicError(400, "INVALID_INPUT");
  return {
    ...result,
    eventId: singleLineText(input, "eventId", 2, 100),
    guests,
    accessibility: text(input, "accessibility", 0, 1000, true)
  };
}
