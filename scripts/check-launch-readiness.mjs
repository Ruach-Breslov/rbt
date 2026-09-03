import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];

function required(name) {
  const value = process.env[name]?.trim() ?? "";
  if (!value) errors.push(`${name} is missing.`);
  return value;
}

function requireHttps(name, allowedHosts = []) {
  const value = required(name);
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") errors.push(`${name} must use HTTPS.`);
    if (allowedHosts.length && !allowedHosts.includes(url.hostname)) {
      errors.push(`${name} must use one of: ${allowedHosts.join(", ")}.`);
    }
    if (url.hostname.includes("example")) errors.push(`${name} still uses an example hostname.`);
  } catch {
    errors.push(`${name} must be a valid URL.`);
  }
}

requireHttps("NEXT_PUBLIC_SITE_URL");
requireHttps("NEXT_PUBLIC_API_BASE_URL");
requireHttps("NEXT_PUBLIC_STRIPE_PAYMENT_LINK", ["buy.stripe.com", "checkout.stripe.com"]);
requireHttps("NEXT_PUBLIC_YOUTUBE_CHANNEL_URL", ["www.youtube.com", "youtube.com"]);

for (const name of [
  "NEXT_PUBLIC_ORGANIZATION_NAME_EN",
  "NEXT_PUBLIC_ORGANIZATION_NAME_HE",
  "NEXT_PUBLIC_ORGANIZATION_NAME_ES",
  "NEXT_PUBLIC_ORGANIZATION_NAME_FA",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_CONTACT_PHONE",
  "NEXT_PUBLIC_CONTACT_ADDRESS",
  "NEXT_PUBLIC_YOUTUBE_VIDEO_IDS"
]) required(name);

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.endsWith("@example.com"))) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL must be a real public contact address.");
}

const videoIds = (process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_IDS ?? "").split(",").map((value) => value.trim()).filter(Boolean);
if (videoIds.some((value) => !/^[A-Za-z0-9_-]{11}$/.test(value)) || videoIds.length > 3) {
  errors.push("NEXT_PUBLIC_YOUTUBE_VIDEO_IDS must contain one to three valid comma-separated YouTube IDs.");
}

const contentFiles = ["data/locales.ts", "data/events.ts", "data/site.ts"];
const placeholderPatterns = [
  /Organization Name/,
  /שם הארגון/,
  /Nombre de la organización/,
  /نام سازمان/,
  /\bReplace (?:this|placeholder)/i,
  /Add your /i,
  /יש להחליף/,
  /Sustituye este aviso/i,
  /جایگزین کنید/,
  /demo:\s*true/
];

for (const relativePath of contentFiles) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  for (const pattern of placeholderPatterns) {
    if (pattern.test(source)) errors.push(`${relativePath} still matches placeholder marker ${pattern}.`);
  }
}

const wrangler = fs.readFileSync(path.join(root, "wrangler.jsonc"), "utf8");
if (wrangler.includes("00000000-0000-0000-0000-000000000000")) {
  errors.push("wrangler.jsonc still contains the placeholder D1 database ID.");
}

if (errors.length) {
  console.error("Launch readiness check failed:\n");
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Launch readiness check passed: public configuration and placeholder checks are clean.");
