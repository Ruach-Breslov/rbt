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

test("opens and closes an RSVP dialog with the keyboard", async ({ page }) => {
  await page.goto("/en/events");
  await page.getByRole("button", { name: "RSVP" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
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
  for (const route of ["/en", "/he", "/es/events", "/fa/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .exclude(".turnstile-shell")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `${testInfo.project.name} ${route}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
  }
});
