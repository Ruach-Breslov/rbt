# Ruach Breslov Main Site — Project Memory

Last updated: September 4, 2026

## Working boundary

- This is the active, project-specific repository. Its local folder is `Ruach Breslov Main Site`.
- The clean source template is the sibling repository `Next JS. Web Temp`. Do not modify it with Ruach Breslov content or configuration.
- The active branch is `main`.
- Git remote `origin` is configured as `https://github.com/Ruach-Breslov/rbt.git`; local `main` tracks `origin/main`.
- The `gav4you` organization invitation was accepted, that account has write permission, and GitHub CLI HTTPS authentication is active for repository operations.
- A dedicated Ed25519 keypair also exists at `%USERPROFILE%/.ssh/id_ed25519_ruach_breslov_rbt` (fingerprint `SHA256:Y/aK9sybOXt/WpiY44j13jO1IOSHyassnvrtAP2ROOM`) but is not needed by the current HTTPS connection. The private key must stay outside the repository and env files; only its path is recorded in the ignored master worksheet.
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

## Verification baseline

- Next.js 16.3.3 production build succeeds.
- Static export generates all 25 expected routes across four locales.
- All 10 Cloudflare Worker tests pass.
- All 16 desktop/mobile end-to-end tests passed after the identity and language-preference work.
- The focused localized-purpose browser test passes.

## Remaining work — handle one item at a time

1. Replace generic homepage feature cards with Ruach Breslov’s actual programs and services.
2. Replace sample events with confirmed events, dates, locations, and RSVP requirements.
3. Add the official YouTube channel and up to three featured video IDs.
4. Configure the donation flow and official Stripe-hosted payment link, if donations are offered.
5. Confirm office hours, response-time expectations, visiting policy, accessibility, parking/transit details, and contact FAQs.
6. Replace the starter privacy notice with owner-approved legal content.
7. Fill `.env.master.local`, then configure production URLs, Turnstile, Resend, allowed origins, and the remaining Worker secrets in their documented destinations.
8. Provision project-specific Cloudflare Worker and D1 resources before deployment. The inherited Wrangler configuration must not be treated as the final Ruach Breslov production resource.
9. Configure GitHub deployment variables, connect the final domain, deploy, and run launch-readiness checks.

## Recorded commits

- `6b3694b` — independent template baseline
- `487f05e` — Ruach Breslov identity, public contact details, and persistent language preference
- `5b698c9` — localized Ruach Breslov purpose and homepage messaging
- `960deae` — master live-services environment inventory and credential-handling documentation
