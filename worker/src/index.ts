import { sha256Hex, verifyResendSignature, verifyStripeSignature } from "./crypto";
import {
  claimRequest,
  cleanExpiredData,
  createSubscriptionConfirmation,
  enforceRateLimit,
  findSubscriptionConfirmation,
  finishRequest,
  markSubscriptionConfirmationUsed,
  reserveRsvp,
  storeWebhookEvent
} from "./database";
import { createStripeCheckout, sendEmail, upsertResendContact, validateTurnstile } from "./providers";
import { PublicError, requireBinding, type Env } from "./types";
import { readJson, validateCheckout, validateContact, validateRsvp, validateSubscription } from "./validation";

type JsonObject = Record<string, unknown>;
type ExecutionContextLike = Pick<ExecutionContext, "waitUntil">;

const publicPostRoutes = new Set(["/v1/contact", "/v1/subscribe", "/v1/rsvp", "/v1/checkout"]);

function allowedOrigins(env: Env) {
  return new Set(env.ALLOWED_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean));
}

function requestOrigin(request: Request, env: Env) {
  const origin = request.headers.get("origin") ?? "";
  if (!origin || !allowedOrigins(env).has(origin)) throw new PublicError(403, "ORIGIN_NOT_ALLOWED");
  return origin;
}

function responseHeaders(origin = "") {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff"
  });
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  return headers;
}

function json(body: JsonObject, status = 200, origin = "") {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders(origin) });
}

function preflight(request: Request, env: Env) {
  const origin = requestOrigin(request, env);
  const requestedMethod = request.headers.get("access-control-request-method") ?? "";
  const requestedHeaders = (request.headers.get("access-control-request-headers") ?? "").toLowerCase();
  if (requestedMethod !== "POST" || requestedHeaders.split(",").map((value) => value.trim()).filter(Boolean).some((value) => value !== "content-type")) {
    throw new PublicError(403, "CORS_REQUEST_REJECTED");
  }
  const headers = responseHeaders(origin);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "600");
  headers.delete("Content-Type");
  return new Response(null, { status: 204, headers });
}

function remoteIp(request: Request) {
  return request.headers.get("CF-Connecting-IP")?.trim() ?? "unknown";
}

async function privateHash(env: Env, purpose: string, value: string) {
  const salt = requireBinding(env, "RATE_LIMIT_SALT");
  if (salt.length < 32) throw new PublicError(503, "SERVICE_NOT_CONFIGURED", "RATE_LIMIT_SALT must be at least 32 characters");
  return sha256Hex(`${salt}:${purpose}:${value}`);
}

async function rateLimitPerson(env: Env, route: string, ip: string, email: string, ipLimit: number, emailLimit: number) {
  const [ipHash, emailHash] = await Promise.all([
    privateHash(env, "ip", ip),
    privateHash(env, "email", email)
  ]);
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO rate_limits (key, bucket, count, expires_at) VALUES (?, ?, 1, ?)
       ON CONFLICT(key, bucket) DO UPDATE SET count = count + 1`
    ).bind(`${route}:ip:${ipHash}`, Math.floor(Date.now() / 600_000), Math.floor(Date.now() / 1000) + 1200),
    env.DB.prepare(
      `INSERT INTO rate_limits (key, bucket, count, expires_at) VALUES (?, ?, 1, ?)
       ON CONFLICT(key, bucket) DO UPDATE SET count = count + 1`
    ).bind(`${route}:email:${emailHash}`, Math.floor(Date.now() / 600_000), Math.floor(Date.now() / 1000) + 1200)
  ]);
  const [ipCount, emailCount] = await Promise.all([
    env.DB.prepare("SELECT count FROM rate_limits WHERE key = ? AND bucket = ?")
      .bind(`${route}:ip:${ipHash}`, Math.floor(Date.now() / 600_000)).first<{ count: number }>(),
    env.DB.prepare("SELECT count FROM rate_limits WHERE key = ? AND bucket = ?")
      .bind(`${route}:email:${emailHash}`, Math.floor(Date.now() / 600_000)).first<{ count: number }>()
  ]);
  if (!ipCount || !emailCount || ipCount.count > ipLimit || emailCount.count > emailLimit) {
    throw new PublicError(429, "RATE_LIMITED");
  }
  return emailHash;
}

async function idempotent(
  env: Env,
  requestId: string,
  route: string,
  operation: () => Promise<JsonObject>
) {
  const claim = await claimRequest(env, requestId, route);
  if (claim.state === "completed") return claim.response;
  if (claim.state === "processing") throw new PublicError(409, "REQUEST_IN_PROGRESS");
  try {
    const response = await operation();
    await finishRequest(env, requestId, true, response);
    return response;
  } catch (error) {
    await finishRequest(env, requestId, false);
    throw error;
  }
}

function assertReturnUrlAllowed(value: string, env: Env) {
  try {
    const url = new URL(value);
    if (!allowedOrigins(env).has(url.origin)) throw new Error("origin");
    return url.toString();
  } catch {
    throw new PublicError(400, "INVALID_RETURN_URL");
  }
}

async function handleContact(request: Request, env: Env, origin: string) {
  const input = validateContact(await readJson(request));
  await rateLimitPerson(env, "contact", remoteIp(request), input.email, 8, 4);
  const response = await idempotent(env, input.requestId, "contact", async () => {
    await validateTurnstile(env, input.turnstileToken, remoteIp(request), input.requestId, "contact");
    const organizationName = requireBinding(env, "ORGANIZATION_NAME");
    const message = [
      `New contact request for ${organizationName}`,
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "Not provided"}`,
      `Organization: ${input.organization || "Not provided"}`,
      `Preferred language: ${input.preferredLanguage}`,
      `Reason: ${input.reason}`,
      "",
      input.message,
      "",
      `Request ID: ${input.requestId}`
    ].join("\n");
    await sendEmail(env, {
      to: requireBinding(env, "CONTACT_TO_EMAIL"),
      subject: `Contact request: ${input.reason}`,
      text: message,
      replyTo: input.email,
      idempotencyKey: `contact/${input.requestId}`
    });
    return { ok: true, requestId: input.requestId };
  });
  return json(response, 202, origin);
}

async function handleSubscription(request: Request, env: Env, origin: string) {
  const input = validateSubscription(await readJson(request));
  await rateLimitPerson(env, "subscribe", remoteIp(request), input.email, 6, 3);
  const response = await idempotent(env, input.requestId, "subscribe", async () => {
    await validateTurnstile(env, input.turnstileToken, remoteIp(request), input.requestId, "subscribe");
    const token = await privateHash(env, "subscription-confirmation", input.requestId);
    const tokenHash = await sha256Hex(token);
    await createSubscriptionConfirmation(env, input, tokenHash);
    const confirmationUrl = new URL("/v1/subscribe/confirm", requireBinding(env, "PUBLIC_API_URL"));
    confirmationUrl.searchParams.set("token", token);
    await sendEmail(env, {
      to: input.email,
      subject: `Confirm your ${requireBinding(env, "ORGANIZATION_NAME")} subscription`,
      text: [
        `Hello ${input.name},`,
        "",
        "Confirm the updates you requested by opening this single-use link within 24 hours:",
        confirmationUrl.toString(),
        "",
        "If you did not request this, you can ignore this message."
      ].join("\n"),
      idempotencyKey: `subscribe-confirm/${input.requestId}`
    });
    return { ok: true, requestId: input.requestId, confirmationRequired: true };
  });
  return json(response, 202, origin);
}

async function handleSubscriptionConfirmation(request: Request, env: Env) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!/^[0-9a-f]{64}$/.test(token)) throw new PublicError(400, "INVALID_CONFIRMATION");
  const confirmation = await findSubscriptionConfirmation(env, await sha256Hex(token));
  if (!confirmation) throw new PublicError(400, "INVALID_CONFIRMATION");
  if (!confirmation.used_at) {
    let topics: string[];
    try {
      const parsed: unknown = JSON.parse(confirmation.topics_json);
      if (!Array.isArray(parsed) || parsed.some((topic) => topic !== "newsletter" && topic !== "events")) throw new Error("topics");
      topics = parsed;
    } catch {
      throw new PublicError(500, "INVALID_STORED_DATA");
    }
    await upsertResendContact(env, { email: confirmation.email, name: confirmation.name, topics });
    await markSubscriptionConfirmationUsed(env, confirmation.id);
  }

  const redirectUrl = assertReturnUrlAllowed(requireBinding(env, "SUBSCRIPTION_CONFIRMATION_REDIRECT_URL"), env);
  const target = new URL(redirectUrl);
  target.searchParams.set("subscription", "confirmed");
  return Response.redirect(target.toString(), 303);
}

async function handleRsvp(request: Request, env: Env, origin: string) {
  const input = validateRsvp(await readJson(request));
  const emailHash = await rateLimitPerson(env, "rsvp", remoteIp(request), input.email, 12, 6);
  const response = await idempotent(env, input.requestId, "rsvp", async () => {
    await validateTurnstile(env, input.turnstileToken, remoteIp(request), input.requestId, "rsvp");
    const rsvpId = await reserveRsvp(env, input, emailHash);
    const organizationName = requireBinding(env, "ORGANIZATION_NAME");
    await Promise.all([
      sendEmail(env, {
        to: input.email,
        subject: `RSVP received by ${organizationName}`,
        text: [
          `Hello ${input.name},`,
          "",
          `Your RSVP for ${input.eventId} has been recorded for ${input.guests} guest(s).`,
          `Confirmation ID: ${rsvpId}`
        ].join("\n"),
        idempotencyKey: `rsvp-guest/${input.requestId}`
      }),
      sendEmail(env, {
        to: requireBinding(env, "CONTACT_TO_EMAIL"),
        subject: `New RSVP: ${input.eventId}`,
        text: [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Event: ${input.eventId}`,
          `Guests: ${input.guests}`,
          `Accessibility or dietary notes: ${input.accessibility || "None provided"}`,
          `RSVP ID: ${rsvpId}`,
          `Request ID: ${input.requestId}`
        ].join("\n"),
        replyTo: input.email,
        idempotencyKey: `rsvp-organizer/${input.requestId}`
      })
    ]);
    return { ok: true, requestId: input.requestId, confirmationId: rsvpId };
  });
  return json(response, 202, origin);
}

async function handleCheckout(request: Request, env: Env, origin: string) {
  const input = validateCheckout(await readJson(request, 4096));
  const ipHash = await privateHash(env, "ip", remoteIp(request));
  await enforceRateLimit(env, `checkout:ip:${ipHash}`, 10, 600);
  const returnUrl = assertReturnUrlAllowed(input.returnUrl, env);
  const response = await idempotent(env, input.requestId, "checkout", async () => ({
    ok: true,
    requestId: input.requestId,
    url: await createStripeCheckout(env, { requestId: input.requestId, returnUrl })
  }));
  return json(response, 200, origin);
}

async function readWebhookBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > 262_144) throw new PublicError(413, "REQUEST_TOO_LARGE");
  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 262_144) throw new PublicError(413, "REQUEST_TOO_LARGE");
  return body;
}

function webhookIdentity(rawBody: string) {
  try {
    const value: unknown = JSON.parse(rawBody);
    if (!value || typeof value !== "object") throw new Error("shape");
    const record = value as Record<string, unknown>;
    if (typeof record.id !== "string" || typeof record.type !== "string" || record.id.length > 200 || record.type.length > 200) throw new Error("fields");
    return { id: record.id, type: record.type };
  } catch {
    throw new PublicError(400, "INVALID_WEBHOOK");
  }
}

async function handleResendWebhook(request: Request, env: Env) {
  const rawBody = await readWebhookBody(request);
  const valid = await verifyResendSignature(
    rawBody,
    request.headers.get("svix-id") ?? "",
    request.headers.get("svix-timestamp") ?? "",
    request.headers.get("svix-signature") ?? "",
    requireBinding(env, "RESEND_WEBHOOK_SECRET")
  );
  if (!valid) throw new PublicError(400, "INVALID_WEBHOOK_SIGNATURE");
  const event = webhookIdentity(rawBody);
  await storeWebhookEvent(env, "resend", event.id, event.type, rawBody);
  return json({ ok: true });
}

async function handleStripeWebhook(request: Request, env: Env) {
  const rawBody = await readWebhookBody(request);
  const valid = await verifyStripeSignature(
    rawBody,
    request.headers.get("stripe-signature") ?? "",
    requireBinding(env, "STRIPE_WEBHOOK_SECRET")
  );
  if (!valid) throw new PublicError(400, "INVALID_WEBHOOK_SIGNATURE");
  const event = webhookIdentity(rawBody);
  await storeWebhookEvent(env, "stripe", event.id, event.type, rawBody);
  return json({ ok: true });
}

async function route(request: Request, env: Env) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS" && publicPostRoutes.has(url.pathname)) return preflight(request, env);

  if (request.method === "GET" && url.pathname === "/health") {
    await env.DB.prepare("SELECT 1").first();
    return json({ ok: true });
  }
  if (request.method === "GET" && url.pathname === "/v1/subscribe/confirm") {
    return handleSubscriptionConfirmation(request, env);
  }
  if (request.method === "POST" && url.pathname === "/webhooks/resend") return handleResendWebhook(request, env);
  if (request.method === "POST" && url.pathname === "/webhooks/stripe") return handleStripeWebhook(request, env);

  if (request.method === "POST" && publicPostRoutes.has(url.pathname)) {
    const origin = requestOrigin(request, env);
    if (url.pathname === "/v1/contact") return handleContact(request, env, origin);
    if (url.pathname === "/v1/subscribe") return handleSubscription(request, env, origin);
    if (url.pathname === "/v1/rsvp") return handleRsvp(request, env, origin);
    if (url.pathname === "/v1/checkout") return handleCheckout(request, env, origin);
  }

  throw new PublicError(404, "NOT_FOUND");
}

async function fetchHandler(request: Request, env: Env) {
  const correlationId = crypto.randomUUID();
  try {
    return await route(request, env);
  } catch (error) {
    const publicError = error instanceof PublicError ? error : new PublicError(500, "INTERNAL_ERROR");
    console.error(JSON.stringify({
      correlationId,
      method: request.method,
      path: new URL(request.url).pathname,
      error: error instanceof Error ? error.message : "Unknown error"
    }));
    const origin = request.headers.get("origin") ?? "";
    const safeOrigin = origin && allowedOrigins(env).has(origin) ? origin : "";
    return json({ ok: false, error: publicError.code, correlationId }, publicError.status, safeOrigin);
  }
}

export default {
  fetch(request: Request, env: Env, _context: ExecutionContextLike) {
    return fetchHandler(request, env);
  },
  scheduled(_controller: ScheduledController, env: Env, context: ExecutionContextLike) {
    context.waitUntil(cleanExpiredData(env));
  }
};

export { fetchHandler };
