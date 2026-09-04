import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", async (route) => {
    if (route.request().url().includes("/turnstile/v0/api.js")) {
      await route.fulfill({
        contentType: "application/javascript",
        body: `window.turnstile={render:(container,options)=>{const input=document.createElement('input');input.type='hidden';input.name=options['response-field-name'];input.value='XXXX.DUMMY.TOKEN.XXXX';container.append(input);return 'test-widget';},remove:()=>{}};`
      });
      return;
    }
    await route.abort();
  });
});

test("sets language and direction for every locale", async ({ page }) => {
  for (const [locale, direction] of [["en", "ltr"], ["he", "rtl"], ["es", "ltr"], ["fa", "rtl"]] as const) {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", direction);
    await expect(page.locator("main")).toBeVisible();
  }
});

test("remembers the selected language and restores it on the root page", async ({ page }) => {
  await page.goto("/en/contact");
  await page.locator(".language-menu summary").click();
  await page.getByRole("link", { name: "עברית" }).click();

  await expect(page).toHaveURL(/\/he\/contact$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.goto("/");
  await expect(page).toHaveURL(/\/he$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
});

test("shows Ruach Breslov's public contact details", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByRole("link", { name: "info@ruachbreslov.org" })).toHaveAttribute("href", "mailto:info@ruachbreslov.org");
  await expect(page.getByRole("link", { name: "917-740-4509" })).toHaveAttribute("href", "tel:9177404509");
  await expect(page.getByText("71-27 147th St, Flushing, NY 11367", { exact: true })).toBeVisible();
});

test("presents Ruach Breslov's purpose in every supported language", async ({ page }) => {
  const localizedPurpose = {
    en: "Ruach Breslov brings the timeless wisdom of Rebbe Nachman to life",
    he: "Ruach Breslov מביאה לחיים את חכמתו הנצחית של רבי נחמן",
    es: "Ruach Breslov da vida a la sabiduría atemporal del Rebe Najmán",
    fa: "Ruach Breslov حکمت جاودانۀ ربی نحمان را از راه ایمان"
  } as const;

  for (const [locale, purpose] of Object.entries(localizedPurpose)) {
    await page.goto(`/${locale}`);
    await expect(page.getByText(new RegExp(`^${purpose}`))).toBeVisible();
  }
});

test("does not publish unconfirmed events", async ({ page }) => {
  await page.goto("/en/events");
  await expect(page.getByRole("heading", { name: "No events are currently scheduled" })).toBeVisible();
  await expect(page.getByRole("button", { name: "RSVP" })).toHaveCount(0);
});

test("offers an accessible community gallery and lightbox", async ({ page }) => {
  await page.goto("/en/gallery");
  await expect(page.getByRole("heading", { name: "Community gallery" })).toBeVisible();
  await expect(page.locator(".gallery-card")).toHaveCount(12);
  await expect(page.locator(".gallery-video-card video")).toHaveCount(4);

  await page.locator(".gallery-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("img", { name: "Learning Torah together around an open text" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("img", { name: "Food and hospitality prepared for the community" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("presents one-time and recurring Stripe-hosted donation choices", async ({ page }) => {
  await page.goto("/en/support");
  await expect(page.getByRole("heading", { name: "Make a one-time donation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Become a monthly supporter" })).toBeVisible();
  await expect(page.locator('.support-layout a[href^="https://donate.stripe.com/"]')).toHaveCount(5);
  await expect(page.getByRole("link", { name: "Manage monthly support" })).toHaveAttribute("href", /^https:\/\/billing\.stripe\.com\//);
  await expect(page.getByText("Monthly donations renew automatically each month until canceled.", { exact: false })).toBeVisible();
});

test("exposes configured forms and bot-challenge fields", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
  await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue("XXXX.DUMMY.TOKEN.XXXX");

  await page.goto("/en");
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeEnabled();
  await expect(page.getByLabel("Email")).toBeVisible();
});

test("keeps a usable CSS fallback when WebGPU is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "gpu", { configurable: true, get: () => undefined });
  });
  await page.goto("/en");
  await expect(page.locator('[data-webgpu-state="fallback"]')).toBeVisible();
  await expect(page.locator(".ambient-background")).toBeAttached();
});

test("honors reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const duration = await page.locator(".motion-reveal").first().evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test("has no automatically detectable WCAG A/AA violations on core routes", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/en", "/he", "/es/events", "/fa/contact", "/en/gallery", "/he/support"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .exclude(".turnstile-shell")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `${testInfo.project.name} ${route}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
  }
});
