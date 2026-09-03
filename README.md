# Ruach Breslov Main Site

The multilingual public website for Ruach Breslov. It brings the timeless wisdom of Rebbe Nachman to life through faith, joy, personal growth, and meaningful connection.

The frontend exports to plain HTML, CSS, and JavaScript and deploys to GitHub Pages from the included GitHub Actions workflow. Secure forms, RSVP storage, and optional payment services run through the separate Cloudflare Worker backend.

## Included

- English, Hebrew, Spanish, and Persian routes
- Correct LTR/RTL document direction and language metadata
- Responsive navigation and language selector
- Animated, reduced-motion-aware landing page
- Newsletter and event-announcement preference form
- Event cards and reusable RSVP dialog
- Click-to-load, privacy-enhanced YouTube video library
- Highest-available YouTube playback with 4K/HDR capability labels for appropriately mastered videos
- WebGPU-powered, wide-gamut interactive visuals with automatic CSS fallback
- Optional full-resolution, GPU-enhanced hero photography
- Full contact page with inquiry form, details, hours, response expectations, and FAQs
- Stripe-hosted Payment Link as the recommended payment default
- Optional custom Stripe Checkout Session frontend
- Localized privacy starter pages, sitemap, robots rules, manifest, CSP meta policy, and static-export verification

## Important hosting boundary

GitHub Pages is a static host. It can host the entire user interface, but it cannot securely execute Resend requests, create Stripe Checkout Sessions, verify webhooks, rate-limit forms, or store RSVP records.

The secure production architecture is:

```text
GitHub Pages frontend
        │ HTTPS JSON requests
        ▼
Cloudflare Worker + D1
   ├── Resend email and Contacts
   ├── RSVP database
   └── Optional Stripe Checkout + verified webhooks
```

The Worker implementation lives in `worker/`. See [docs/backend-deployment.md](docs/backend-deployment.md) before enabling forms or custom Checkout.

## Local development

Use Node.js 24.

```bash
npm ci
npm run dev
```

Run the complete production gate:

```bash
npm run check
```

Run the desktop/mobile browser and accessibility suite:

```bash
npm run test:e2e
```

The deployment workflow also runs `npm run check:launch`. That gate deliberately fails while template text, demo events, example service values, or the placeholder D1 ID remain.

## Configure a new website

1. Replace placeholder organization details and translated content in `data/locales.ts` and `data/site.ts`.
2. Replace sample events in `data/events.ts`.
3. Copy `.env.example` to `.env.local` and set only public development values, including the four official organization names and the Turnstile site key.
4. Deploy the included Worker by following `docs/backend-deployment.md`, then set `NEXT_PUBLIC_API_BASE_URL`.
5. Create a Stripe Payment Link and set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`.
6. Add up to three YouTube IDs with `NEXT_PUBLIC_YOUTUBE_VIDEO_IDS`.

YouTube controls the actual stream resolution adaptively. Its IFrame API no longer supports forcing a playback quality, so the template keeps the native quality controls available and truthfully labels capable videos as highest-available, up to 4K/HDR. Upload a 3840×2160 master with correct HDR metadata when those formats are required.
7. Replace and legally review the privacy text for every supported jurisdiction and audience.

## GitHub Pages deployment

1. Push this fresh repository to a GitHub repository on `main`.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Add the required `NEXT_PUBLIC_*` values as GitHub **Actions variables**, not secrets. They are deliberately public and become part of the browser bundle.
4. Push to `main` or run the deployment workflow manually.

The workflow supplies the Pages URL and repository base path automatically, supporting both `owner.github.io/repository` and custom domains.

For a custom domain, add `public/CNAME` only after configuring the domain in GitHub Pages.

## Service configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical deployed URL; supplied automatically on GitHub Pages |
| `NEXT_PUBLIC_BASE_PATH` | Repository path; supplied automatically on GitHub Pages |
| `NEXT_PUBLIC_API_BASE_URL` | Public origin of the separate secure API |
| `NEXT_PUBLIC_ORGANIZATION_NAME_{EN,HE,ES,FA}` | Official organization name for each locale |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile widget key; never the secret key |
| `NEXT_PUBLIC_CONTACT_*` | Public email, phone, and address |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Stripe-hosted Payment Link; recommended payment mode |
| `NEXT_PUBLIC_YOUTUBE_VIDEO_IDS` | Up to three comma-separated YouTube IDs |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` | Optional public YouTube channel URL |
| `NEXT_PUBLIC_HERO_IMAGE` | Optional local `/media/...` hero image enhanced by WebGPU |

Never use a `NEXT_PUBLIC_*` variable for a Resend API key, Stripe secret/restricted key, webhook secret, database credential, CAPTCHA secret, or any other confidential value.

## Content map

- `data/locales.ts`: all translated interface and page copy
- `data/events.ts`: event dates and structural data
- `data/videos.ts`: YouTube library configuration
- `data/site.ts`: public contact and integration configuration
- `app/[locale]/`: localized static pages
- `components/forms/`: contact, subscription, and RSVP clients
- `worker/`: Cloudflare Worker API, D1 migration, and provider integrations
- `worker/test/`: Worker-runtime integration and security tests
- `e2e/`: desktop/mobile Playwright and axe accessibility tests
- `docs/security-hardening.md`: production security requirements

## Naming the subscription section

The current heading is “Stay connected.” Alternatives worth testing include “News and events,” “Keep me informed,” “Join our updates,” and “What’s happening.” The form already lets visitors choose newsletters, event announcements, or both.
