# Security Policy

## Reporting

Configure a private security contact or enable GitHub private vulnerability reporting before publishing this repository. Do not report vulnerabilities through public issues when they include exploit details, credentials, or personal information.

## Static frontend

This repository must contain public website code and public configuration only. Everything sent to the browser, including every `NEXT_PUBLIC_*` value, is visible to visitors.

Never commit:

- Resend API keys or webhook signing secrets
- Stripe secret/restricted keys or webhook signing secrets
- Database credentials or private RSVP/contact exports
- Private keys, deployment tokens, service-account credentials, or `.env.local`
- Unredacted production logs or personal records

## Required API controls

The included Worker validates input server-side, restricts CORS to exact deployed origins, limits request size, rate-limits by multiple salted signals, requires Turnstile, uses idempotency, keeps personal data out of logs, and verifies provider webhook signatures using the unmodified request body. Production still requires real keys, exact origins, DNS controls, alerting, and account hardening.

See `docs/security-hardening.md` for the production checklist.
