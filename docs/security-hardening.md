# Security Hardening Checklist

## Implemented in this repository

The Worker enforces exact-origin CORS, exact JSON media types, body limits, normalized field validation, single-line control-character rejection, honeypot and timing checks, mandatory Turnstile verification, separate pre-challenge IP and post-challenge email limits, UUID idempotency, sanitized private logs, generic public errors with correlation IDs, server-owned event capacity, Resend idempotency keys, raw-body webhook signatures, replay storage, and scheduled retention cleanup. It has no Stripe secret, checkout, or payment-webhook surface. Automated Worker and browser tests cover these boundaries.

Cloudflare enforces the site CSP and response-level browser headers at the edge. Minimum TLS is 1.2, Always Use HTTPS is active, and HSTS is staged at 30 days without subdomain inheritance or preload. Cloudflare Web Analytics auto-injection is disabled so an unnecessary third-party script is not added to the site. GitHub secret scanning with push protection, Dependabot security updates, CodeQL default setup, default-branch deletion/force-push protection, per-job workflow permissions, and full-commit-SHA action pinning are configured.

The remaining items in this checklist require production accounts, DNS, legal decisions, organizational policy, or manual assistive-technology review.

## Frontend and GitHub Pages

- Keep dependencies locked and Dependabot enabled.
- Require the typecheck, lint, build, static-export check, and dependency audit before deployment.
- Use a verified custom domain with enforced HTTPS when available.
- Keep all third-party frames click-to-load where practical.
- Keep external links isolated with `noopener noreferrer`.
- Review every CSP source when adding a provider.
- The static meta CSP and Cloudflare header policy allow inline scripts because Next.js static exports include inline hydration data. Per-request nonces require dynamic rendering and are unavailable on this GitHub Pages export.
- Keep the Cloudflare header policy synchronized with `lib/security.ts`; the CDN header supplies `frame-ancestors` and the other response-only controls that a meta policy cannot.
- Do not add analytics or another script origin merely to silence a CSP violation. Confirm the integration is necessary and privacy-reviewed first.

## Public form API

- Reject non-HTTPS traffic and unexpected methods/content types.
- Enforce a small request body limit before parsing.
- Validate every field, enum, length, Unicode form, and email address on the server.
- Reject the honeypot field and implausibly fast submissions, but never treat client signals as sufficient protection.
- Register a production Turnstile widget for the final hostnames and install its site/secret key pair. Server-side verification is already mandatory in code.
- Rate-limit by IP/network, normalized email, route, and risk signal.
- Use request IDs and idempotency storage to prevent duplicate email and RSVP operations.
- Use generic client errors and keep sensitive details out of logs.
- Encrypt data in transit and at rest; define RSVP/contact retention and deletion schedules.
- Alert on spikes in submissions, email bounces, complaints, and failed CAPTCHA.

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
- Keep any full-access key only in the ignored local operator worksheet for provisioning; do not deploy it to the site, Worker, or GitHub Actions.
- Keep card, billing, recurring-payment, and customer-management data on Stripe-hosted pages.
- Limit accepted payment methods and collected fields to business requirements.
- Enable Stripe account MFA, least-privilege access, alerts, and key rotation procedures.

## Privacy and localization

- Obtain legal review for the privacy and consent copy in every language.
- Document data processors, purposes, retention, cross-border transfers, and visitor rights.
- Use professional translation review for legal, payment, consent, and accessibility text.
- Test screen readers and keyboard flow in both LTR and RTL layouts.
