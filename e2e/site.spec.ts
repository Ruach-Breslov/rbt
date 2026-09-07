import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { getVideos } from "../data/videos";

const expectedLongVideos = getVideos().filter((video) => video.kind === "video").length;
const expectedShorts = getVideos().filter((video) => video.kind === "short").length;

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

test("keeps the enlarged navigation accessible and unclipped", async ({ page }) => {
  if ((page.viewportSize()?.width ?? 0) > 700) await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/en");
  await expect(page.getByRole("link", { name: "Ruach Breslov — Home" })).toBeVisible();
  await expect(page.locator(".header-contact-button")).toHaveAttribute("href", "/en/contact");
  await expect(page.locator('.desktop-nav a[href="/en/contact"]')).toHaveCount(0);

  const navigationPresentation = await page.locator(".site-header").evaluate((header) => {
    const mark = header.querySelector<HTMLElement>(".brand-mark");
    const image = mark?.querySelector<HTMLImageElement>("img");
    const inner = header.querySelector<HTMLElement>(".site-header-inner");
    const actions = header.querySelector<HTMLElement>(".header-actions");
    const languageMenu = actions?.querySelector<HTMLElement>(".language-menu");
    const visibleTargets = Array.from(header.querySelectorAll<HTMLElement>("a, summary"))
      .map((element) => element.getBoundingClientRect())
      .filter((bounds) => bounds.width > 0 && bounds.height > 0);
    const background = getComputedStyle(header).backgroundColor;

    return {
      background,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      markWidth: mark?.getBoundingClientRect().width ?? 0,
      imageFit: image ? getComputedStyle(image).objectFit : "",
      imageTransform: image ? getComputedStyle(image).transform : "",
      languageAtOuterEdge: actions?.lastElementChild === languageMenu,
      languageEdgeGap: inner && languageMenu ? Math.abs(inner.getBoundingClientRect().right - languageMenu.getBoundingClientRect().right) : null,
      languagePageEdgeGap: languageMenu ? Math.abs(document.documentElement.clientWidth - languageMenu.getBoundingClientRect().right) : null,
      contactNextToSupport: actions?.children[0]?.classList.contains("header-contact-button") && actions?.children[1]?.classList.contains("button-primary"),
      minimumTargetHeight: Math.min(...visibleTargets.map((bounds) => bounds.height))
    };
  });

  expect(navigationPresentation.background).toBe("rgba(23, 17, 14, 0.88)");
  expect(navigationPresentation.documentWidth).toBeLessThanOrEqual(navigationPresentation.viewportWidth);
  expect(navigationPresentation.markWidth).toBeGreaterThanOrEqual(68);
  expect(navigationPresentation.imageFit).toBe("contain");
  expect(navigationPresentation.imageTransform).toBe("none");
  expect(navigationPresentation.languageAtOuterEdge).toBe(true);
  expect(navigationPresentation.languageEdgeGap).not.toBeNull();
  expect(navigationPresentation.languageEdgeGap ?? 1).toBeLessThan(1);
  expect(navigationPresentation.languagePageEdgeGap).not.toBeNull();
  expect(navigationPresentation.languagePageEdgeGap ?? 17).toBeLessThanOrEqual(16);
  expect(navigationPresentation.contactNextToSupport).toBe(true);
  expect(navigationPresentation.minimumTargetHeight).toBeGreaterThanOrEqual(44);
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
  await expect(page.getByText("71-27 147th St, Flushing, NY 11367", { exact: true })).toHaveCount(2);
  await expect(page.getByTitle("Google Map showing the Ruach Breslov location in Flushing")).toHaveAttribute("src", /google\.com\/maps\?q=71-27%20147th%20St/);
  await expect(page.getByRole("link", { name: "Get driving directions" })).toHaveAttribute("href", /google\.com\/maps\/dir\/\?api=1.*travelmode=driving.*dir_action=navigate/);
  await expect(page.getByRole("link", { name: "Open in Google Maps" })).toHaveAttribute("target", "_blank");
});

test("presents Ruach Breslov's purpose in every supported language", async ({ page }) => {
  const localizedPurpose = {
    en: "Ruach Breslov is a growing Queens community",
    he: "Ruach Breslov היא קהילה צומחת בקווינס",
    es: "Ruach Breslov es una comunidad creciente de Queens",
    fa: "Ruach Breslov جامعه‌ای رو به رشد در کویینز"
  } as const;

  for (const [locale, purpose] of Object.entries(localizedPurpose)) {
    await page.goto(`/${locale}`);
    await expect(page.getByText(new RegExp(`^${purpose}`))).toBeVisible();
  }
});

test("publishes the mission, legal identity, and organizational leadership", async ({ page }) => {
  await page.goto("/en/about");
  await expect(page.getByRole("heading", { level: 1, name: "Faith that meets real life. Community that shows up." })).toBeVisible();
  await expect(page.locator('.site-header a[href="/en/about"]').first()).toHaveAttribute("href", "/en/about");

  const mission = page.locator(".about-mission");
  await expect(mission.getByText("Our mission", { exact: true })).toBeVisible();
  await expect(mission).toContainText("so no one has to struggle or grow alone");

  const leadership = page.locator(".leadership-card");
  await expect(leadership.getByRole("heading", { name: "Benjamin Roberts" })).toBeVisible();
  await expect(leadership.getByText("Executive Director", { exact: true })).toBeVisible();

  const legalIdentity = page.locator(".legal-identity");
  await expect(legalIdentity).toContainText("Ruach Breslov Inc.");
  await expect(legalIdentity).toContainText("41-3212278");
  await expect(legalIdentity).toContainText("Public charity");
  await expect(legalIdentity.getByRole("link", { name: "Verify our status with the IRS" })).toHaveAttribute("target", "_blank");

  const organizationData = await page.locator('script[type="application/ld+json"]').evaluate((script) => JSON.parse(script.textContent ?? "{}"));
  expect(organizationData).toMatchObject({ "@type": "NGO", legalName: "Ruach Breslov Inc.", taxID: "41-3212278" });

  await page.goto("/en");
  await expect(page.locator(".home-mission").getByRole("heading", { name: "Torah for real life. A community that shows up." })).toBeVisible();
  await page.goto("/en/support");
  await expect(page.locator(".nonprofit-proof")).toContainText("Ruach Breslov Inc. · EIN 41-3212278");
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

test("opens the cinematic gallery directly from Inside the Community", async ({ page }) => {
  await page.goto("/en");
  const communityGallery = page.locator(".gallery-preview-section");
  await expect(communityGallery.getByRole("heading", { name: "See what it feels like in the room." })).toBeVisible();
  await expect(communityGallery.locator(".gallery-preview-item")).toHaveCount(6);

  await communityGallery.locator(".gallery-preview-item").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("img", { name: "Learning Torah together around an open text" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});

test("presents one-time and recurring Stripe-hosted donation choices", async ({ page }) => {
  await page.goto("/en/support");
  await expect(page.getByRole("heading", { name: "Make a one-time donation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Become a monthly supporter" })).toBeVisible();
  await expect(page.locator('.support-layout a[href^="https://donate.stripe.com/"]')).toHaveCount(5);
  await expect(page.getByRole("link", { name: "Manage monthly support" })).toHaveAttribute("href", /^https:\/\/billing\.stripe\.com\//);
  await expect(page.getByText("Monthly donations renew automatically each month until canceled.", { exact: false })).toBeVisible();
});

test("mirrors the Ruach Breslov channel library and opens a closable player", async ({ page }) => {
  await page.goto("/en/videos");
  await expect(page.getByRole("heading", { name: "Ruach Breslov" })).toBeVisible();
  await expect(page.getByText("@RuachBreslov", { exact: true })).toBeVisible();
  await expect(page.locator(".video-card")).toHaveCount(expectedLongVideos);
  await expect(page.getByRole("button", { name: "Videos", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".video-player-frame iframe")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Visit our YouTube channel" })).toHaveAttribute("href", "https://www.youtube.com/@RuachBreslov");

  await page.getByRole("button", { name: "Shorts", exact: true }).click();
  await expect(page.locator(".video-card")).toHaveCount(expectedShorts);
  await page.getByRole("button", { name: "Videos", exact: true }).click();

  await page.getByRole("button", { name: "Search this channel" }).click();
  await page.getByPlaceholder("Search videos").fill("Power of RUACH");
  await expect(page.locator(".video-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search" }).click();

  await page.getByRole("button", { name: /Play video: The Power of RUACH/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".video-player-frame iframe")).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/77ibzlmzv2E/);
  await page.getByRole("button", { name: "Close video player" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.locator(".video-player-frame iframe")).toHaveCount(0);
});

test("exposes configured forms and bot-challenge fields", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
  await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue("XXXX.DUMMY.TOKEN.XXXX");

  await page.goto("/en");
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeEnabled();
  await expect(page.getByLabel("Email")).toBeVisible();
});

test("uses the client-selected Ruach Breslov artwork as the cinematic home greeting", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator(".hero-artwork img")).toBeVisible();
  await expect(page.locator(".hero-artwork img")).toHaveAttribute("src", /\/media\/hero\/home-hero-client\.webp$/);
  const heroPresentation = await page.locator(".hero-artwork img").evaluate((image) => {
    const bounds = image.getBoundingClientRect();
    const header = document.querySelector(".site-header")?.getBoundingClientRect();
    return { ratio: bounds.width / bounds.height, fit: getComputedStyle(image).objectFit, topGap: header ? bounds.top - header.bottom : null };
  });
  expect(heroPresentation.ratio).toBeCloseTo(1.5, 2);
  expect(heroPresentation.fit).toBe("contain");
  expect(heroPresentation.topGap).not.toBeNull();
  expect(Math.abs(heroPresentation.topGap ?? 1)).toBeLessThan(1);
  const artworkContent = page.locator(".hero-artwork-content");
  await expect(artworkContent).toContainText("Ruach Breslov is a growing Queens community");
  await expect(artworkContent.getByRole("link", { name: "Donate" })).toHaveAttribute("href", "/en/support");
  await expect(artworkContent.getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/en/contact");
  const introduction = page.locator(".hero-introduction");
  await expect(introduction.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(introduction.locator(".subhero-community-photo img")).toHaveAttribute("src", /\/media\/gallery\/full-room\.webp$/);
  await expect(introduction.locator(".subhero-community-photo figcaption")).toHaveText("A full room gathered for Torah and connection");
  await expect(introduction).toContainText("This room is more than a backdrop.");
  await expect(introduction.getByRole("link", { name: "View the gallery" })).toHaveAttribute("href", "/en/gallery");
  await expect(introduction.getByRole("link", { name: "Watch & learn" })).toHaveAttribute("href", "/en/videos");
  await expect(page.locator(".webgpu-hero-surface")).toHaveCount(0);
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
  for (const route of ["/en", "/he", "/es/events", "/fa/contact", "/en/gallery", "/he/support", "/en/videos", "/en/about"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .exclude(".turnstile-shell")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `${testInfo.project.name} ${route}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
  }
});
