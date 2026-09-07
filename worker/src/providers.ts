import { PublicError, requireBinding, type Env } from "./types";

type TurnstileResult = {
  success?: boolean;
  hostname?: string;
  action?: string;
};

async function providerFetch(url: string, init: RequestInit, provider: string) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new PublicError(502, "UPSTREAM_FAILURE", `${provider} returned ${response.status}`);
  }
  return response;
}

export async function validateTurnstile(env: Env, token: string, remoteIp: string, requestId: string, action: string) {
  const body = new FormData();
  body.set("secret", requireBinding(env, "TURNSTILE_SECRET_KEY"));
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);
  body.set("idempotency_key", requestId);

  const response = await providerFetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body
  }, "Turnstile");
  const result = await response.json<TurnstileResult>();
  const expectedHostnames = requireBinding(env, "TURNSTILE_EXPECTED_HOSTNAMES").split(",").map((value) => value.trim()).filter(Boolean);
  if (!result.success || result.action !== action || !result.hostname || !expectedHostnames.includes(result.hostname)) {
    throw new PublicError(400, "BOT_CHALLENGE_FAILED");
  }
}

async function resendRequest(env: Env, apiKeyName: "RESEND_TRANSACTIONAL_API_KEY" | "RESEND_CONTACTS_API_KEY", path: string, init: RequestInit) {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${requireBinding(env, apiKeyName)}`);
  headers.set("Content-Type", "application/json");
  return fetch(`https://api.resend.com${path}`, { ...init, headers });
}

export async function sendEmail(
  env: Env,
  input: { to: string; subject: string; text: string; replyTo?: string; idempotencyKey: string }
) {
  const response = await resendRequest(env, "RESEND_TRANSACTIONAL_API_KEY", "/emails", {
    method: "POST",
    headers: { "Idempotency-Key": input.idempotencyKey },
    body: JSON.stringify({
      from: requireBinding(env, "RESEND_FROM_EMAIL"),
      to: [input.to],
      subject: input.subject,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {})
    })
  });
  if (!response.ok) throw new PublicError(502, "UPSTREAM_FAILURE", `Resend email returned ${response.status}`);
}

export async function upsertResendContact(env: Env, input: { email: string; name: string; topics: string[] }) {
  const topicIds = input.topics.map((topic) => ({
    id: topic === "newsletter"
      ? requireBinding(env, "RESEND_NEWSLETTER_TOPIC_ID")
      : requireBinding(env, "RESEND_EVENTS_TOPIC_ID"),
    subscription: "opt_in"
  }));
  const names = input.name.trim().split(/\s+/);
  const createResponse = await resendRequest(env, "RESEND_CONTACTS_API_KEY", "/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      first_name: names[0],
      last_name: names.slice(1).join(" "),
      unsubscribed: false,
      topics: topicIds
    })
  });
  if (createResponse.ok) return;
  if (createResponse.status !== 409) {
    throw new PublicError(502, "UPSTREAM_FAILURE", `Resend contacts returned ${createResponse.status}`);
  }

  const updateResponse = await resendRequest(
    env,
    "RESEND_CONTACTS_API_KEY",
    `/contacts/${encodeURIComponent(input.email)}/topics`,
    { method: "PATCH", body: JSON.stringify({ topics: topicIds }) }
  );
  if (!updateResponse.ok) throw new PublicError(502, "UPSTREAM_FAILURE", `Resend topics returned ${updateResponse.status}`);
}
