# Secure Backend Integration

## Why a separate API is required

GitHub Pages cannot run request handlers. Resend and Stripe secret operations require confidential credentials, and RSVP submissions need trusted validation and durable storage. Putting those credentials in browser code would allow anyone to use the associated accounts.

Host a small API on a serverless platform such as Cloudflare Workers, Vercel Functions, Netlify Functions, AWS Lambda, or another managed runtime. The frontend expects the HTTPS origin in `NEXT_PUBLIC_API_BASE_URL`.

## Frontend API contract

All endpoints accept JSON and return a success status with JSON. Error responses should use a generic public message and a private correlation ID.

### `POST /v1/contact`

Expected fields:

```json
{
  "type": "contact",
  "name": "Visitor name",
  "email": "visitor@example.com",
  "phone": "optional",
  "organization": "optional",
  "preferredLanguage": "en",
  "reason": "General inquiry",
  "message": "Message text",
  "consent": "granted",
  "locale": "en",
  "startedAt": 0,
  "submittedAt": "ISO timestamp",
  "requestId": "UUID",
  "website": ""
}
```

After validation, send a transactional message through Resend to a server-configured destination. Use a Resend key limited to sending access and a verified sending domain. Set `reply_to` to the validated visitor address; never let the browser choose the sender or destination.

### `POST /v1/subscribe`

Expected fields include `name`, `email`, `topics`, `consent`, `locale`, timing fields, and `requestId`.

Use Resend Contacts with two explicit, opt-in Topics:

- Newsletter
- Event announcements

The server must own the Resend Topic IDs. Do not accept arbitrary Topic IDs from the browser. Use a separate server-only key with the minimum permission that supports Contacts. For stricter consent, create a pending record and send a single-use double-opt-in link before activating the topics.

Resend Broadcasts should include its unsubscribe/preference link so contacts can change individual Topics or unsubscribe globally.

### `POST /v1/rsvp`

Expected fields include `eventId`, `eventStartsAt`, `name`, `email`, `guests`, accessibility notes, consent, locale, timing fields, and `requestId`.

The API must:

1. Look up `eventId` in a server-owned allowlist or database.
2. Ignore client-provided capacity, price, event title, and authorization decisions.
3. Enforce guest limits and event availability transactionally.
4. Store a normalized RSVP record with an idempotency constraint.
5. Send confirmation and organizer notifications through Resend.
6. Avoid putting accessibility or personal details in URLs, analytics, or ordinary logs.

### `POST /v1/checkout` — optional

This is not needed for the recommended Payment Link path. Use it only when dynamic prices, products, inventory, or automatic fulfillment are required.

The browser sends a purpose, locale, return URL, and request ID. The server selects an allowlisted Stripe Price ID and creates a hosted Checkout Session. Never accept a client-provided amount, currency, destination account, or unrestricted success URL.

This implementation's payment defaults are `USD` and the IANA time zone `America/New_York`. Configure Stripe Prices and Payment Links in USD. Keep currency and time-zone selection server-controlled; use `America/New_York`, rather than a fixed `EST` offset, so daylight-saving transitions are handled correctly.

Return only a Stripe-hosted URL:

```json
{ "url": "https://checkout.stripe.com/..." }
```

Automatic fulfillment requires an additional Stripe webhook endpoint. Verify the Stripe signature against the raw body, process relevant events idempotently, and treat the webhook—not the success-page redirect—as the payment source of truth.

## Resend webhooks

For delivery, bounce, complaint, and subscription processing, expose a dedicated webhook endpoint and verify Resend’s signing headers using the raw request body and the server-only webhook secret. Store processed event IDs to reject duplicates and replay attempts.

## Required CORS behavior

- Allow only the exact production custom domain and/or exact `owner.github.io` origin.
- Do not reflect arbitrary `Origin` headers.
- Permit only `POST`, `OPTIONS`, `Content-Type`, and the headers actually used.
- Do not use cookies or browser credentials for public forms.
- Return `Vary: Origin` when responding to multiple allowlisted origins.

Origin checks reduce cross-site abuse but do not authenticate a public form. Rate limiting and bot verification remain necessary.

## Implemented backend

The repository now includes a Cloudflare Worker and D1 implementation in `worker/`. It provides:

- strict JSON, field, timing, consent, and request-size validation;
- exact-origin CORS with no browser credentials;
- salted IP/email rate-limit keys and idempotent request tracking;
- mandatory server-side Turnstile verification;
- Resend transactional delivery and 24-hour double opt-in for Topics;
- atomic event-capacity checks and normalized RSVP storage;
- allowlisted Stripe Price IDs and hosted Checkout Session URLs;
- raw-body Resend and Stripe webhook signature verification;
- scheduled expiry of rate limits, pending confirmations, request logs, webhook events, and RSVP records.

Apply `worker/migrations/0001_initial.sql` before serving requests. Never use the demo seed in production. Follow `backend-deployment.md` for the account-side setup and secret commands.
