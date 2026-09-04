# Ruach Breslov Main Site — Project Memory

Last updated: September 4, 2026

## Working boundary

- This is the active, project-specific repository. Its local folder is `Ruach Breslov Main Site`.
- The clean source template is the sibling repository `Next JS. Web Temp`. Do not modify it with Ruach Breslov content or configuration.
- The active branch is `main`.
- Git remote `origin` is configured as `https://github.com/Ruach-Breslov/rbt.git`; local `main` tracks `origin/main`.
- The `gav4you` organization invitation was accepted, that account has Admin permission, and GitHub CLI HTTPS authentication is active for repository operations.
- The repository is public. GitHub Pages uses the included GitHub Actions workflow, has `ruachbreslov.org` configured as its custom domain, and successfully published the first production site on September 4, 2026.
- A dedicated Ed25519 keypair also exists at `%USERPROFILE%/.ssh/id_ed25519_ruach_breslov_rbt` (fingerprint `SHA256:Y/aK9sybOXt/WpiY44j13jO1IOSHyassnvrtAP2ROOM`) but is not needed by the current HTTPS connection. The private key must stay outside the repository and env files; only its path is recorded in the ignored master worksheet.
- The production Cloudflare account ID is `021dbe9c5c0ac9f63b2532a0a9c86359`; the active `ruachbreslov.org` zone ID is `0a4fde7c3ae973afc410b5af0d3a2aec`. Global API Key authentication to that account was verified from the ignored master worksheet, and no Cloudflare secret is committed.
- Cloudflare DNS preserves the existing Google MX/TXT records and routes the website to GitHub Pages using four apex A records, four apex AAAA records, and `www` as a CNAME to `ruach-breslov.github.io`. Those nine website records are proxied through Cloudflare; Universal SSL is active, the zone uses Full origin encryption, and Always Use HTTPS is enabled. GitHub Pages remains the origin.
- Public HTTPS is currently terminated and enforced by Cloudflare while GitHub provisions its own Pages certificate. GitHub's domain-health API reports the apex and `www` as valid, served by Pages, HTTPS-eligible, and free of CAA errors; native Pages `https_enforced` remains off until that certificate exists.
- The production API is Worker `ruach-breslov-api` at `https://api.ruachbreslov.org`, backed by D1 database `ruach-breslov-production` (`21eb66cf-2a77-49c5-91c3-e606a24713ab`). The initial schema and daily cleanup cron are deployed, and required secret names are enforced by Wrangler.
- The production Turnstile widget is restricted to `ruachbreslov.org` and `www.ruachbreslov.org`; its public site key is `0x4AAAAAAEmvXUpwE6Qy8Y81`, and its secret exists only in Cloudflare's Worker secret store.
- Resend full-access API authentication is verified. The `ruachbreslov.org` sending domain is verified with DKIM and SPF through Cloudflare; the `Newsletter` and `Event announcements` Topics use explicit opt-in defaults. The Worker uses a separate send-only key for transactional mail and the owner-provided full-access key for Contacts administration. The webhook is registered at `https://api.ruachbreslov.org/webhooks/resend`; private keys and its signing secret are not committed.
- Keep secrets out of Git. Only public configuration belongs in `NEXT_PUBLIC_*` variables.

## Confirmed organization details

- Name in every locale: Ruach Breslov
- Public email: info@ruachbreslov.org
- Public phone: 917-740-4509
- Public address: 71-27 147th St, Flushing, NY 11367
- Core purpose: “Ruach Breslov brings the timeless wisdom of Rebbe Nachman to life through faith, joy, personal growth, and meaningful connection. We create a welcoming space for people of all backgrounds to find hope, deepen their relationship with God, face life’s challenges with strength, and discover greater purpose, goodness, and meaning.”

## Language behavior

- Supported languages: English (`en`), Hebrew (`he`), Spanish (`es`), and Persian (`fa`).
- The organization name remains “Ruach Breslov” in every language.
- Interface and page content are translated for the selected language.
- Hebrew and Persian use right-to-left document direction.
- The language selector preserves the current page when possible, stores the visitor’s selection locally, and restores it on later visits to `/`.
- English is the first-visit default when no preference has been saved.

## Completed work

- Copied the committed template into an independent Git repository without dependencies, build output, local databases, secrets, or Git history.
- Configured the organization name and public contact details.
- Added persistent locale selection and root-page preference restoration.
- Added the owner-provided purpose statement, localized homepage messaging, metadata, and footer copy in all four languages.
- Added automated browser coverage for locale direction, language persistence, public contact information, localized purpose copy, accessibility, forms, dialogs, reduced motion, and WebGPU fallback.
- Added an ignored master live-services worksheet plus a tracked blank template covering public frontend values, Worker configuration, provider secrets, and provisioning credentials. Secrets remain out of Git and are deployed only to their intended destinations.
- Connected the project to `Ruach-Breslov/rbt` and initialized its `main` branch without overwriting any remote history.
- Connected to the confirmed production Cloudflare account and active `ruachbreslov.org` zone, and bound Wrangler to the non-secret account ID.
- Made `Ruach-Breslov/rbt` public, enabled GitHub Pages with GitHub Actions, configured `ruachbreslov.org`, and connected its apex and `www` DNS records through Cloudflare without disturbing mail records.
- Connected and verified the Resend sending domain, created the two required opt-in Topics, and selected `Ruach Breslov <no-reply@ruachbreslov.org>` as the production sender.
- Provisioned and migrated the production D1 database, deployed the production Worker and cleanup cron at `api.ruachbreslov.org`, installed all required non-Stripe Worker secrets, configured the restricted production Turnstile widget, and registered the signed Resend webhook.
- Prepared a verification-ready first public release: removed template/demo claims, withheld unconfirmed events, replaced the inactive payment flow with an honest contact state, and made Stripe and YouTube optional until the owner supplies their official destinations.
- Replaced the starter privacy copy in all four languages with a plain-language notice reflecting the services and data flows currently in use. Owner or legal review remains advisable as the organization and its services evolve.
- Published the verification-ready release through GitHub Pages and placed Cloudflare's active Universal SSL certificate in front of the site so the apex and `www` are publicly secure without waiting for GitHub's certificate queue.

## Verification baseline

- Next.js 16.3.3 production build succeeds.
- Static export generates all 25 expected routes across four locales.
- All 10 Cloudflare Worker tests pass.
- All 18 desktop/mobile end-to-end tests pass, including locale behavior, public identity, forms, reduced motion, WebGPU fallback, and automated WCAG A/AA checks on core routes.
- The launch-readiness gate passes with the confirmed production public configuration; optional Stripe and YouTube values remain strictly validated whenever they are supplied.
- The live production API health check returns `{ "ok": true }` from `https://api.ruachbreslov.org/health`.
- GitHub Actions deployment run `33858694809` passed the dependency audit, all typechecks, lint, Worker tests, 18 browser tests, production build, static-export check, launch gate, artifact upload, and Pages deployment.
- `https://ruachbreslov.org`, all four canonical language homepages, the events page, and the privacy page return HTTP 200 with valid TLS. Plain HTTP redirects to HTTPS, and `https://www.ruachbreslov.org` redirects to the apex.

## Remaining work — handle one item at a time

1. Monitor GitHub's native Pages certificate; once issued, enable native HTTPS enforcement and reassess Cloudflare Full (strict) origin validation. Public HTTPS is already enforced at Cloudflare and is not blocked on this item.
2. Replace the purpose-based homepage cards with Ruach Breslov’s confirmed programs and services when those details are available.
3. Add confirmed events, dates, locations, and RSVP requirements as they are announced.
4. Add the official YouTube channel and up to three featured video IDs when supplied.
5. Configure an official Stripe-hosted payment link if online contributions are offered; Stripe secrets remain optional and are not installed.
6. Confirm office hours, response-time expectations, visiting policy, accessibility, parking/transit details, and any additional contact FAQs.
7. Have the current privacy notice reviewed for the organization’s operating jurisdictions and update it as practices change.

## Recorded commits

- `6b3694b` — independent template baseline
- `487f05e` — Ruach Breslov identity, public contact details, and persistent language preference
- `5b698c9` — localized Ruach Breslov purpose and homepage messaging
- `960deae` — master live-services environment inventory and credential-handling documentation
- `d04e563` — GitHub repository connection continuity
- `43ae48f` — production Cloudflare account connection and safe Global API Key field support
- `dd38443` — public repository, GitHub Pages, custom domain, and Cloudflare DNS
- `6ad4a5b` — verified Resend connection and HTTPS canonical URL normalization for Pages
- `18b4082` — production Worker services, D1, Turnstile, Resend Topics, and signed webhook
- `4351620` — verification-ready public content and launch-safe optional integrations
