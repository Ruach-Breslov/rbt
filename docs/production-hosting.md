# GitHub Pages Hosting

The workflow in `.github/workflows/deploy-github-pages.yml` builds and uploads the static `out/` directory.

## Standard project site

1. Keep `public/CNAME` absent.
2. Select **GitHub Actions** in the repository’s Pages settings.
3. Push to `main`.

The workflow passes GitHub’s `base_url` and `base_path` into the build so links, scripts, styles, icons, form navigation, sitemap entries, and canonical URLs work at `owner.github.io/repository-name`.

## Custom domain

Configure and verify the domain in GitHub first, then configure DNS according to
GitHub's current documentation and enforce HTTPS after the certificate is ready.
Because this site publishes through a custom GitHub Actions workflow, a
repository `CNAME` file is not required and would be ignored by Pages.

## Public Actions variables

Set optional `NEXT_PUBLIC_*` configuration under **Settings → Secrets and variables → Actions → Variables**. These are public build values. Never place Resend, Stripe secret, webhook, CAPTCHA, or database credentials there.

## Backend

Deploy the included Worker and apply its D1 migrations before setting `NEXT_PUBLIC_API_BASE_URL`. Configure `ALLOWED_ORIGINS` for the exact Pages origins and use the same production hostnames in Turnstile. GitHub Pages remains the frontend host; the API runtime is independently deployed and secured.

The Pages workflow refuses to upload an artifact until `npm run check:launch` confirms that public values are present, example values are gone, demo events have been replaced, localized placeholder copy has been reviewed, and the D1 database ID has been configured.
