# Cloudflare Worker Deployment

The API is implemented in `worker/src/` and uses a D1 database. Account creation, domain verification, secret installation, and production deployment must be performed by an authorized owner.

## Local development

1. Copy `.dev.vars.example` to `.dev.vars` and replace the Resend placeholders if testing provider calls.
2. Apply the schema with `npm run db:migrate:local`.
3. Load demo events only in the local database with `npm run db:seed:local`.
4. Start the API with `npm run worker:dev`.
5. Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8787` and Cloudflare's documented test site key in `.env.local`.

The `.dev.vars` file is ignored by Git. Never put production secrets in `.env.local`, `NEXT_PUBLIC_*`, GitHub Actions variables, or `wrangler.jsonc`.

## Production setup

Use the ignored `.env.master.local` worksheet to collect the authorized owner's
values before starting. It is an inventory only: copy public values to GitHub
Actions Variables, put non-secret Worker configuration in `wrangler.jsonc`, and
install Worker secrets individually. Never pass the whole master file to
`wrangler secret bulk`, because it also contains frontend and provisioning
values.

1. Authenticate an authorized Cloudflare account with `npx wrangler login`.
2. Create the production database with `npx wrangler d1 create ruach-breslov-production`.
3. Replace the inherited database UUID in `wrangler.jsonc` with the returned project-specific database ID.
4. Replace the local Worker variables with the exact HTTPS frontend origin, deployed API URL, post-confirmation redirect, organization name, production Turnstile hostnames, and approved RSVP retention period.
5. Install these Worker secrets with `npx wrangler secret put NAME`:
   - `RATE_LIMIT_SALT` — at least 32 random characters
   - `TURNSTILE_SECRET_KEY`
   - `RESEND_TRANSACTIONAL_API_KEY`
   - `RESEND_CONTACTS_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
   - `RESEND_NEWSLETTER_TOPIC_ID`
   - `RESEND_EVENTS_TOPIC_ID`
   - `RESEND_WEBHOOK_SECRET`
   - optionally `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, and `STRIPE_WEBHOOK_SECRET`
6. Apply the production schema with `npm run db:migrate:remote`.
7. Insert reviewed production events into D1. Do not execute `worker/seeds/dev.sql` remotely.
8. Run `npm run check`, `npm run test:e2e`, and `npm run check:launch` with production public variables.
9. Deploy with `npm run worker:deploy` and verify `GET /health` returns `{ "ok": true }`.

The Ruach Breslov production deployment uses Worker `ruach-breslov-api`, D1
database `ruach-breslov-production`, and the Worker Custom Domain
`https://api.ruachbreslov.org`. `wrangler.jsonc` declares the required secret
names so later deployments fail safely if a binding is missing; values remain in
Cloudflare's encrypted secret store and never in this repository.

## Turnstile

Create separate development and production widgets. Restrict the production widget to the final frontend hostnames. Put the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the secret in the Worker secret store. The Worker checks the expected hostname and per-form action and rejects expired, replayed, or invalid tokens.

## Resend

Verify the sending domain and publish SPF, DKIM, and DMARC. Use a separate
sending-only key for transactional email and a full-access administration key
for Contacts operations. Create `Newsletter` and `Event announcements` Topics
and install their IDs as Worker secrets.

Register a webhook at `https://api.ruachbreslov.org/webhooks/resend` and install its signing secret. The subscription endpoint sends a single-use, 24-hour confirmation link before activating Topics.

## Stripe

For ordinary support, create a Stripe-hosted Payment Link and expose only that `buy.stripe.com` URL to the frontend. Custom Checkout is optional. When enabled, install one server-owned USD Price ID and register `https://YOUR_API_HOST/webhooks/stripe`; the browser cannot choose amounts, currencies, prices, or redirect origins.

The current webhook stores verified events for idempotency and audit. Add explicit fulfillment logic only when the organization defines a concrete product or entitlement workflow.

## Production verification

- Confirm unexpected origins receive `403` without an `Access-Control-Allow-Origin` header.
- Confirm valid preflights allow only `POST`, `OPTIONS`, and `Content-Type`.
- Complete real contact, double-opt-in subscription, RSVP, and payment test-mode flows.
- Replay request IDs and provider events to confirm no duplicate email, RSVP, or fulfillment action occurs.
- Confirm scheduled cleanup runs and monitoring alerts on elevated error, CAPTCHA, bounce, and complaint rates.
