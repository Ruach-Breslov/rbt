# Security Hardening Checklist

## Implemented in this repository

The Worker enforces exact-origin CORS, JSON body limits, normalized field validation, honeypot and timing checks, mandatory Turnstile verification, salted D1 rate limits, UUID idempotency, generic public errors with private correlation IDs, server-owned event capacity, allowlisted Stripe configuration, provider idempotency keys, raw-body webhook signatures, replay storage, and scheduled retention cleanup. Automated Worker and browser tests cover these boundaries.

The remaining items in this checklist require production accounts, DNS, legal decisions, organizational policy, or manual assistive-technology review.

## Frontend and GitHub Pages

- Keep dependencies locked and Dependabot enabled.
- Require the typecheck, lint, build, static-export check, and dependency audit before deployment.
- Use a verified custom domain with enforced HTTPS when available.
- Keep all third-party frames click-to-load where practical.
- Keep external links isolated with `noopener noreferrer`.
- Review every CSP source when adding a provider.
- The static meta CSP allows inline scripts because Next.js static exports include an inline hydration bootstrap. GitHub Pages cannot attach per-request nonces; use a header-level nonce or hash policy when placing the site behind a configurable CDN.
- Add equivalent HTTP security headers through a trusted proxy/CDN if header-level protection is required; repository files cannot configure GitHub Pages response headers.
- Do not claim that meta CSP enforces `frame-ancestors`, HSTS, `X-Content-Type-Options`, or other response-only controls.

## Public form API

- Reject non-HTTPS traffic and unexpected methods/content types.
- Enforce a small request body limit before parsing.
- Validate every field, enum, length, Unicode form, and email address on the server.
- Reject the honeypot field and implausibly fast submissions, but never treat client signals as sufficient protection.
- Register a production Turnstile widget for the final hostnames and install its site/secret key pair. Server-side verification is already mandatory in code.
- Rate-limit by IP/network, normalized email, route, and risk signal.
- Use request IDs and idempotency storage to prevent duplicate email, RSVP, and Checkout operations.
- Use generic client errors and keep sensitive details out of logs.
- Encrypt data in transit and at rest; define RSVP/contact retention and deletion schedules.
- Alert on spikes in submissions, email bounces, complaints, failed CAPTCHA, and checkout errors.

## Resend

- Use separate keys for transactional sending and Contacts administration.
- Restrict sending keys to the verified domain where supported.
- Keep keys only in the backend platform’s secret store.
- Configure SPF, DKIM, and DMARC for the sending domain.
- Use explicit opt-in topics and a double-opt-in flow where appropriate.
- Include functional unsubscribe/preference links in every marketing message.
- Verify webhook signatures against the raw request body and prevent replay/duplicate processing.

## Stripe

- Prefer Stripe-hosted Payment Links for standard payments or donations.
- Keep every secret or restricted key in the backend secret store.
- If using Checkout Sessions, select allowlisted USD products, Price IDs, amounts, currencies, and return URLs on the server. Use `America/New_York` for payment-related operating schedules and reports.
- Verify Stripe webhook signatures against the raw body.
- Make fulfillment idempotent and driven by verified payment events.
- Limit accepted payment methods and collected fields to business requirements.
- Enable Stripe account MFA, least-privilege access, alerts, and key rotation procedures.

## Privacy and localization

- Obtain legal review for the privacy and consent copy in every language.
- Document data processors, purposes, retention, cross-border transfers, and visitor rights.
- Use professional translation review for legal, payment, consent, and accessibility text.
- Test screen readers and keyboard flow in both LTR and RTL layouts.
