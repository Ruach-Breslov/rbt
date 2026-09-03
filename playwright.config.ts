import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } }
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: baseURL,
      NEXT_PUBLIC_API_BASE_URL: "https://api.example.test",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      NEXT_PUBLIC_ORGANIZATION_NAME_EN: "Example Community",
      NEXT_PUBLIC_ORGANIZATION_NAME_HE: "קהילה לדוגמה",
      NEXT_PUBLIC_ORGANIZATION_NAME_ES: "Comunidad de ejemplo",
      NEXT_PUBLIC_ORGANIZATION_NAME_FA: "جامعه نمونه"
    }
  }
});
