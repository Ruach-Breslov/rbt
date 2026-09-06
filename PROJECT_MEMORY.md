# Ruach Breslov Main Site — Project Memory

Last updated: September 6, 2026

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
- Public HTTPS is currently terminated and enforced by Cloudflare while GitHub's native Pages certificate remains unissued. Because the website records are proxied, GitHub's domain-health API currently identifies Cloudflare IPs and reports the apex and `www` as not HTTPS-eligible; native Pages `https_enforced` remains off.
- The production API is Worker `ruach-breslov-api` at `https://api.ruachbreslov.org`, backed by D1 database `ruach-breslov-production` (`21eb66cf-2a77-49c5-91c3-e606a24713ab`). The initial schema and daily cleanup cron are deployed, and required secret names are enforced by Wrangler.
- The production Turnstile widget is restricted to `ruachbreslov.org` and `www.ruachbreslov.org`; its public site key is `0x4AAAAAAEmvXUpwE6Qy8Y81`, and its secret exists only in Cloudflare's Worker secret store.
- Resend full-access API authentication is verified. The `ruachbreslov.org` sending domain is verified with DKIM and SPF through Cloudflare; the `Newsletter` and `Event announcements` Topics use explicit opt-in defaults. The Worker uses a separate send-only key for transactional mail and the owner-provided full-access key for Contacts administration. The webhook is registered at `https://api.ruachbreslov.org/webhooks/resend`; private keys and its signing secret are not committed.
- Keep secrets out of Git. Only public configuration belongs in `NEXT_PUBLIC_*` variables.
- Treat `https://ruachbreslov.wixsite.com/ruach-breslev` as a content reference only. Reuse confirmed organization facts and themes, not its layout, sample events, generic blog promises, or unverified testimonials.
- The owner supplied and approved the local `Pictures` folder for site use. Keep those originals ignored, untracked, and untouched; publish only selected, optimized derivatives under `public/media`.
- The Wix cream/burgundy/gold palette remains a source reference, but the owner rejected the first literal warm treatment as bland and impersonal on September 6, 2026. The approved rescue direction reinterprets it with cinematic charcoal, firelit gold, oxblood, parchment, and quiet sage.
- Stripe live account `acct_1UBfcGJcQUW3PSlA` now provides hosted checkout. The full-access secret remains local provisioning-only and is not installed in GitHub, the frontend, or the Worker.

## Confirmed organization details

- Name in every locale: Ruach Breslov
- Public email: info@ruachbreslov.org
- Public phone: 917-740-4509
- Public address: 71-27 147th St, Flushing, NY 11367
- Core purpose: “Ruach Breslov brings the timeless wisdom of Rebbe Nachman to life through faith, joy, personal growth, and meaningful connection. We create a welcoming space for people of all backgrounds to find hope, deepen their relationship with God, face life’s challenges with strength, and discover greater purpose, goodness, and meaning.”
- Confirmed offerings: weekly Torah gatherings/classes, one-on-one mentorship, community events and hospitality, guest speakers, and outreach.
- Confirmed legacy theme: a small gathering grew into a brotherhood built on Torah, honesty, friendship, and the conviction that no one should feel alone.
- Donation impact language may cover weekly classes, food and hospitality, guest speakers, community events, and outreach.
- Official YouTube channel: `https://www.youtube.com/@RuachBreslov` (handle `@ruachbreslov`, channel ID `UCOhxrylucgg0_WdPRFU1d_w`).

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
- Reworked the homepage with the confirmed programs and legacy story, actual Ruach Breslov branding, and selected community photography, while preserving the independent site structure and visual system.
- Added a localized community gallery with 12 optimized photos, four optimized silent clips, keyboard-accessible lightbox navigation, mobile layouts, and gallery links in the primary navigation, homepage, footer, sitemap, and export checks.
- Provisioned five live Stripe-hosted donation pages: one customer-selected one-time gift (minimum $5, suggested $36, maximum $10,000) and fixed monthly gifts of $18, $36, $72, and $180. Stripe Managed Payments is disabled only on these links because Stripe does not support its donation submit type in Managed Payments mode.
- Enabled Stripe's hosted customer-portal login with billing history, payment-method updates, and self-service subscription cancellation at the end of the current billing period. The public donation and portal URLs are stored as GitHub Actions variables.
- Connected the official Ruach Breslov YouTube channel and featured three verified uploads: “The Power of RUACH,” Likkutei Moharan Torah 7, and Likkutei Moharan Torah 4. Embeds use YouTube's privacy-enhanced domain and load only after an explicit play click; the localized privacy notice describes that request.
- Replaced the dark technology-template presentation with the client's cream, burgundy, muted burgundy, and gold palette; serif editorial typography; authentic community photography; and paper-like surfaces. The homepage hero now uses a real gathering photo, and “Inside the Community” uses the same reusable cinematic lightbox as the full gallery with a deliberately curated six-photo edit.
- Built the owner-approved rescue facelift after the first warm treatment was rejected: the client-supplied `Pictures/Home Hero/home hero.png` now has an optimized published derivative and leads a full cinematic homepage at its exact uncropped 3:2 composition, flush beneath the header. The concise community introduction and Donate/Contact actions sit beneath the artwork's central divider on desktop, shifted down 48px without reflowing the artwork, and continue in a readable charcoal panel on small screens. Below it, a tightly spaced, non-sticky editorial title anchors the left at the owner-selected scale while the lowered full-room photograph, meaning-led copy, and Gallery/Watch & learn actions form the right; homepage language is more direct and human in all four locales; program cards became an editorial offering grid; the real-photo origin story and shared cinematic gallery carry the community proof.
- Enlarged the complete navigation system for low-vision usability: a 112px desktop header and 96px mobile header, an uncropped 80px/68px brand mark, larger organization copy, navigation labels, controls, icons, menu items, and click targets. The compact menu now activates at 1180px to prevent crowding, the linked brand retains its localized accessible name for screen readers, and the owner-approved header surface is slightly transparent at 88% opacity with background blur.
- Rebuilt the video page around the official channel's own content and interaction pattern. It contains 13 verified long videos and three Shorts with local thumbnails, Videos/Shorts tabs, Latest/Popular/Oldest sorting, channel search, and an accessible animated player that uses YouTube's privacy-enhanced domain only after an explicit click and can be closed by its visible exit control or Escape.
- Added an hourly, no-secret YouTube upload sync. It validates the official channel's public feed, archives unseen uploads in `data/youtube-catalog.json`, distinguishes Shorts when YouTube exposes the Shorts route, and explicitly dispatches the existing tested Pages deployment only when the catalog changes. Feed errors or invalid entries fail closed and leave the published library untouched.
- Added a localized Google Maps location panel to the contact page for the confirmed Flushing address, with a visible pin, a cross-device driving-navigation action, and a separate open-in-Maps link. Visitors are reminded to confirm the class date and time before traveling. Google Maps is allowlisted only for frames, and the four-language privacy notice now discloses the map request.
- Added `docs/SITE_STRATEGY.md`, a research-backed audience, content, and phased roadmap grounded in Ruach Breslov's own stated purpose and authoritative Breslov Research Institute context. No unconfirmed program or event claims were added.
- Updated the GitHub Pages `NEXT_PUBLIC_HERO_IMAGE` variable from the previous gallery photograph to `/media/hero/home-hero-client.webp` so production builds cannot override the owner-selected hero.

## Verification baseline

- Next.js 16.3.3 production build succeeds.
- Static export generates all 29 expected routes across four locales.
- All 10 Cloudflare Worker tests pass.
- All 28 desktop/mobile end-to-end tests pass, including locale behavior, public identity, forms, both cinematic gallery/lightbox entry points, recurring donation choices, the complete YouTube channel library and player, the authentic community-photo hero, enlarged navigation, reduced motion, and automated WCAG A/AA checks on core routes.
- The launch-readiness gate passes with the confirmed production public configuration and complete Stripe one-time/monthly link set; optional YouTube values remain strictly validated whenever supplied.
- The live production API health check returns `{ "ok": true }` from `https://api.ruachbreslov.org/health`.
- GitHub Actions deployment run `33858694809` passed the dependency audit, all typechecks, lint, Worker tests, 18 browser tests, production build, static-export check, launch gate, artifact upload, and Pages deployment.
- `https://ruachbreslov.org`, all four canonical language homepages, the events page, and the privacy page return HTTP 200 with valid TLS. Plain HTTP redirects to HTTPS, and `https://www.ruachbreslov.org` redirects to the apex.
- GitHub Actions deployment run `33866088097` published the gallery/donation release after passing all typechecks, lint, 10 Worker tests, 22 browser tests, production build, 29-route export check, launch gate, artifact upload, and Pages deployment. The npm audit registry timed out in CI and emitted the intentional warning; the same release passed `npm audit --audit-level=high` locally.
- Live release checks confirm HTTP 200 for the homepage, English and Hebrew galleries, the support page, optimized hero/photo/video assets, and API health. The deployed support page contains the expected one-time link, all four monthly links, and customer-portal login.
- GitHub Actions deployment run `34032857560` published the official YouTube integration after passing the dependency audit, all typechecks, lint, 10 Worker tests, 24 browser tests, production build, 29-route export check, launch gate, artifact upload, and Pages deployment.
- Live release checks confirm HTTP 200 for the English video page and the official YouTube channel. The deployed page contains the canonical channel link, all three selected video IDs, and the verified “The Power of RUACH” title.
- GitHub Actions deployment run `34034582543` published the warm editorial redesign after passing the dependency audit, all typechecks, lint, 10 Worker tests, 26 browser tests, production build, 29-route export check, launch gate, artifact upload, and Pages deployment.
- Live browser checks confirm the Cloudflare-served homepage uses the cream background and burgundy text, loads `/media/gallery/full-room.webp` as the authentic hero, exposes six curated “Inside the Community” images, contains no generated WebGPU hero surface, and opens the shared cinematic lightbox successfully.
- The approved rescue build compiles successfully, passes the launch-readiness and 29-route/four-locale static-export checks, and passes all 28 desktop/mobile browser tests, including the new channel tools, click-to-open/close player, selected cinematic hero, enlarged navigation, multilingual behavior, reduced motion, and automated WCAG A/AA checks.
- GitHub Actions deployment run `34042251111` published commit `34c5446` after passing the dependency audit, all typechecks, lint, 10 Worker tests, all 28 desktop/mobile browser tests, the production build, 29-route export check, launch gate, artifact upload, and Pages deployment.
- Live Cloudflare-facing checks confirm HTTP 200 for the homepage, support page, video page, and new hero asset; the homepage uses the selected hero and 88%-opaque enlarged header without horizontal overflow; production exposes five hosted Stripe donation choices plus portal access; and the 13-video/three-Short library opens and closes its privacy-enhanced player while removing the iframe on exit.
- Three YouTube synchronization unit tests cover feed validation, archive merging, entity decoding, remote thumbnails, and Shorts classification. A live feed check found all 15 current public feed entries already present and correctly left the 16-item archived catalog unchanged.
- GitHub Actions deployment run `34055867658` published the automatic YouTube synchronization release after passing the dependency audit, all typechecks, lint, three sync tests, 10 Worker tests, all 28 desktop/mobile browser tests, the production build, 29-route export check, launch gate, artifact upload, and Pages deployment.
- Manual synchronization run `34056021685` successfully checked the live official feed and correctly skipped both the catalog commit and redundant deployment because all 15 feed entries were already archived.

## Remaining work — handle one item at a time

1. Monitor GitHub's native Pages certificate; once issued, enable native HTTPS enforcement and reassess Cloudflare Full (strict) origin validation. Public HTTPS is already enforced at Cloudflare and is not blocked on this item.
2. Confirm the event-editing workflow. The current recommendation is a dedicated public “Ruach Breslov Events” Google Calendar shared only with approved editors, synchronized into the site's own event cards; this remains a recommendation until the owner approves it and supplies the calendar's public iCal address.
3. Add confirmed events, dates, locations, and RSVP requirements as they are announced.
4. Confirm office hours, response-time expectations, visiting policy, accessibility, parking/transit details, and any additional contact FAQs.
5. Have the current privacy notice reviewed for the organization’s operating jurisdictions and update it as practices change.

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
- `5327ccb` — production launch continuity record
- `2c1dfae` — confirmed community content, optimized gallery, and live recurring donations
- `70512e7` — gallery and donation launch continuity record
- `4f667f6` — bounded CI audit network wait while preserving vulnerability failures
- `b49e9b9` — removed npm install's duplicate implicit audit call
- `2de812c` — official YouTube channel and featured video integration
- `44370db` — client-selected warm palette, authentic-photo hero, and shared cinematic gallery
- `34c5446` — approved cinematic rescue facelift, enlarged navigation, and full channel-style video library
- `cf74645` — hourly official-channel sync with persistent catalog and tested conditional deployment
