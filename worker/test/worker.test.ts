import { env } from "cloudflare:workers";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sha256Hex, verifyResendSignature, verifyStripeSignature } from "../src/crypto";
import { fetchHandler } from "../src/index";

const origin = "https://site.test";

function publicRequest(path: string, body: Record<string, unknown>, ip = "203.0.113.10") {
  return new Request(`https://api.test${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      "CF-Connecting-IP": ip
    },
    body: JSON.stringify(body)
  });
}

function common(type: string, overrides: Record<string, unknown> = {}) {
  const now = Date.now();
  return {
    type,
    requestId: crypto.randomUUID(),
    locale: "en",
    name: "Ada Lovelace",
    email: `ada-${crypto.randomUUID()}@example.test`,
    consent: "granted",
    website: "",
    startedAt: now - 2_000,
    submittedAt: new Date(now).toISOString(),
    "cf-turnstile-response": "XXXX.DUMMY.TOKEN.XXXX",
    ...overrides
  };
}

function mockProviders(action: string) {
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    if (url.includes("/turnstile/v0/siteverify")) {
      return Response.json({ success: true, hostname: "localhost", action });
    }
    if (url.startsWith("https://api.resend.com/")) return Response.json({ id: "provider-id" });
    if (url === "https://api.stripe.com/v1/checkout/sessions") {
      return Response.json({ url: "https://checkout.stripe.com/c/pay/test" });
    }
    throw new Error(`Unexpected outbound request: ${url}`);
  });
}

beforeEach(async () => {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM rsvps"),
    env.DB.prepare("DELETE FROM events"),
    env.DB.prepare("DELETE FROM subscription_confirmations"),
    env.DB.prepare("DELETE FROM request_log"),
    env.DB.prepare("DELETE FROM rate_limits"),
    env.DB.prepare("DELETE FROM webhook_events")
  ]);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Worker HTTP boundary", () => {
  it("reports healthy D1 access", async () => {
    const response = await fetchHandler(new Request("https://api.test/health"), env);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("rejects public requests from unapproved origins", async () => {
    const request = new Request("https://api.test/v1/contact", {
      method: "POST",
      headers: { Origin: "https://attacker.test", "Content-Type": "application/json" },
      body: "{}"
    });
    const response = await fetchHandler(request, env);
    expect(response.status).toBe(403);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("answers a constrained CORS preflight", async () => {
    const response = await fetchHandler(new Request("https://api.test/v1/contact", {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type"
      }
    }), env);
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe(origin);
    expect(response.headers.get("access-control-allow-credentials")).toBeNull();
  });

  it("validates, sends, and deduplicates a contact request", async () => {
    const outbound = mockProviders("contact");
    const payload = common("contact", {
      phone: "+1 202 555 0100",
      organization: "Analytical Engine Society",
      preferredLanguage: "en",
      reason: "Partnership",
      message: "I would like to discuss a responsible collaboration."
    });
    const first = await fetchHandler(publicRequest("/v1/contact", payload), env);
    const second = await fetchHandler(publicRequest("/v1/contact", payload), env);
    expect(first.status).toBe(202);
    expect(second.status).toBe(202);
    expect(outbound).toHaveBeenCalledTimes(2);
    const stored = await env.DB.prepare("SELECT status FROM request_log WHERE request_id = ?")
      .bind(payload.requestId).first<{ status: string }>();
    expect(stored?.status).toBe("succeeded");
  });

  it("reserves capacity atomically and rejects an over-capacity RSVP", async () => {
    mockProviders("rsvp");
    await env.DB.prepare(
      "INSERT INTO events (id, starts_at, capacity, guest_limit, active) VALUES (?, ?, ?, ?, 1)"
    ).bind("small-event", "2099-01-01T18:00:00Z", 1, 1).run();

    const firstPayload = common("rsvp", { eventId: "small-event", guests: "1", accessibility: "" });
    const secondPayload = common("rsvp", { eventId: "small-event", guests: "1", accessibility: "" });
    const first = await fetchHandler(publicRequest("/v1/rsvp", firstPayload, "203.0.113.11"), env);
    const second = await fetchHandler(publicRequest("/v1/rsvp", secondPayload, "203.0.113.12"), env);
    expect(first.status).toBe(202);
    expect(second.status).toBe(409);
    const count = await env.DB.prepare("SELECT COUNT(*) AS count FROM rsvps").first<{ count: number }>();
    expect(count?.count).toBe(1);
  });

  it("creates a pending double-opt-in confirmation without activating a contact", async () => {
    const outbound = mockProviders("subscribe");
    const payload = common("subscription", { topics: ["newsletter", "events"] });
    const response = await fetchHandler(publicRequest("/v1/subscribe", payload), env);
    expect(response.status).toBe(202);
    expect(outbound).toHaveBeenCalledTimes(2);
    const pending = await env.DB.prepare("SELECT used_at FROM subscription_confirmations WHERE request_id = ?")
      .bind(payload.requestId).first<{ used_at: number | null }>();
    expect(pending?.used_at).toBeNull();
  });

  it("creates only allowlisted hosted Stripe Checkout sessions", async () => {
    mockProviders("checkout");
    const payload = { type: "support", requestId: crypto.randomUUID(), locale: "en", returnUrl: `${origin}/en/support` };
    const response = await fetchHandler(publicRequest("/v1/checkout", payload), env);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ ok: true, url: "https://checkout.stripe.com/c/pay/test" });

    const rejected = await fetchHandler(publicRequest("/v1/checkout", {
      ...payload,
      requestId: crypto.randomUUID(),
      returnUrl: "https://attacker.test/steal"
    }), env);
    expect(rejected.status).toBe(400);
  });
});

describe("webhook signatures", () => {
  it("verifies Stripe HMAC signatures and rejects altered payloads", async () => {
    const body = JSON.stringify({ id: "evt_test", type: "checkout.session.completed" });
    const timestamp = Math.floor(Date.now() / 1000);
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("whsec_stripe_test"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`)));
    const hex = [...signature].map((value) => value.toString(16).padStart(2, "0")).join("");
    expect(await verifyStripeSignature(body, `t=${timestamp},v1=${hex}`, "whsec_stripe_test")).toBe(true);
    expect(await verifyStripeSignature(`${body} `, `t=${timestamp},v1=${hex}`, "whsec_stripe_test")).toBe(false);
  });

  it("hashes private discriminators deterministically", async () => {
    await expect(sha256Hex("same-value")).resolves.toBe(await sha256Hex("same-value"));
    expect(await sha256Hex("same-value")).not.toBe(await sha256Hex("other-value"));
  });

  it("rejects malformed Resend signatures", async () => {
    expect(await verifyResendSignature("{}", "msg_test", `${Math.floor(Date.now() / 1000)}`, "v1,invalid", "whsec_dGVzdA==")).toBe(false);
  });
});
