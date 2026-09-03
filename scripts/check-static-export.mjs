import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(projectRoot, "out");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}` : "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://example.com").replace(/\/+$/, "");
const heroImage = process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() ?? "";
const locales = ["en", "he", "es", "fa"];
const rtlLocales = new Set(["he", "fa"]);
const localizedPages = ["", "contact", "events", "privacy", "support", "videos"];
const requiredRoutes = ["/", ...locales.flatMap((locale) => localizedPages.map((page) => `/${locale}${page ? `/${page}` : ""}`))];
const requiredFiles = ["404.html", ".nojekyll", "favicon.svg", "robots.txt", "site.webmanifest", "sitemap.xml"];
const errors = [];

function fail(message) {
  errors.push(message);
}

function routeCandidates(route) {
  if (route === "/") return ["index.html"];
  const cleanRoute = route.replace(/^\/+|\/+$/g, "");
  return [`${cleanRoute}.html`, path.join(cleanRoute, "index.html")];
}

function routeFile(route) {
  return routeCandidates(route).find((candidate) => existsSync(path.join(outDir, candidate)));
}

function routeHtml(route) {
  const file = routeFile(route);
  return file ? readFileSync(path.join(outDir, file), "utf8") : "";
}

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

function stripBasePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  if (basePath && (cleanPath === basePath || cleanPath.startsWith(`${basePath}/`))) {
    return cleanPath.slice(basePath.length) || "/";
  }
  return cleanPath;
}

function exportPathExists(urlPath) {
  const exportPath = stripBasePath(urlPath);
  if (!exportPath || exportPath === "/") return existsSync(path.join(outDir, "index.html"));
  const relativePath = exportPath.replace(/^\/+/, "");
  if (existsSync(path.join(outDir, relativePath))) return true;
  return routeCandidates(exportPath).some((candidate) => existsSync(path.join(outDir, candidate)));
}

function absoluteSiteUrl(route) {
  const origin = new URL(siteUrl).origin;
  const pathName = route === "/" ? `${basePath}/` : `${basePath}${route}`;
  return new URL(pathName, `${origin}/`).toString();
}

function normalizedUrl(value) {
  return value.replace(/\/$/, "");
}

if (!existsSync(outDir)) {
  fail("Missing out/ directory. Run `npm run build` first.");
} else {
  for (const file of requiredFiles) {
    const absolutePath = path.join(outDir, file);
    if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) fail(`Missing required export file: ${file}`);
  }

  for (const route of requiredRoutes) {
    if (!routeFile(route)) fail(`Missing exported route: ${route}`);
  }

  const rootHtml = routeHtml("/");
  if (!/<html lang="en" dir="ltr"/i.test(rootHtml)) fail("Root page must declare English LTR document direction.");
  if (!rootHtml.includes("webgpu-hero-surface") || !rootHtml.includes("<canvas")) {
    fail("Root page must include the progressive WebGPU hero surface.");
  }
  if (heroImage) {
    if (!heroImage.startsWith("/") || heroImage.startsWith("//") || heroImage.includes("..")) {
      fail("NEXT_PUBLIC_HERO_IMAGE must be a safe root-relative public asset path.");
    } else if (!exportPathExists(`${basePath}${heroImage}`)) {
      fail(`NEXT_PUBLIC_HERO_IMAGE references a missing export asset: ${heroImage}`);
    }
  }

  for (const locale of locales) {
    for (const page of localizedPages) {
      const route = `/${locale}${page ? `/${page}` : ""}`;
      const html = routeHtml(route);
      const expectedDirection = rtlLocales.has(locale) ? "rtl" : "ltr";
      if (!new RegExp(`<html lang="${locale}" dir="${expectedDirection}"`, "i").test(html)) {
        fail(`${route} must declare lang=${locale} and dir=${expectedDirection}.`);
      }

      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? "";
      const expectedCanonical = route === "/en" ? absoluteSiteUrl("/") : absoluteSiteUrl(route);
      if (normalizedUrl(canonical) !== normalizedUrl(expectedCanonical)) {
        fail(`Canonical URL for ${route} must be ${expectedCanonical}; found ${canonical || "<missing>"}.`);
      }

      for (const alternateLocale of locales) {
        if (!new RegExp(`<link rel="alternate" hreflang="${alternateLocale}" href="`, "i").test(html)) {
          fail(`${route} is missing the ${alternateLocale} language alternate.`);
        }
      }
    }
  }

  for (const route of ["/", ...locales.map((locale) => `/${locale}`)]) {
    const form = routeHtml(route).match(/<form\b[\s\S]*?<\/form>/i)?.[0] ?? "";
    for (const field of ["name", "email", "topics", "consent", "website"]) {
      if (!new RegExp(`name="${field}"`, "i").test(form)) fail(`Subscription form on ${route} is missing ${field}.`);
    }
  }

  for (const locale of locales) {
    const route = `/${locale}/contact`;
    const form = routeHtml(route).match(/<form\b[\s\S]*?<\/form>/i)?.[0] ?? "";
    for (const field of ["name", "email", "phone", "organization", "preferredLanguage", "reason", "message", "consent", "website"]) {
      if (!new RegExp(`name="${field}"`, "i").test(form)) fail(`Contact form on ${route} is missing ${field}.`);
    }
  }

  if (!rootHtml.includes("https://www.youtube-nocookie.com") || !rootHtml.includes("https://checkout.stripe.com")) {
    fail("CSP must allow the configured YouTube and Stripe hosted experiences.");
  }

  const allFiles = walkFiles(outDir);
  const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const relativeFile = path.relative(outDir, file).replaceAll(path.sep, "/");

    if (/(?:\bre_[A-Za-z0-9_-]{16,}|\bsk_(?:live|test)_[A-Za-z0-9_-]{16,}|\bwhsec_[A-Za-z0-9_-]{16,})/.test(html)) {
      fail(`${relativeFile} appears to expose a service secret.`);
    }

    for (const match of html.matchAll(/\b(?:href|src|action)=['"]([^'"]+)['"]/gi)) {
      const target = match[1].trim();
      if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
      if (!target.startsWith("/")) continue;

      const targetPath = target.split("#")[0].split("?")[0];
      if (basePath && targetPath !== basePath && !targetPath.startsWith(`${basePath}/`)) {
        fail(`${relativeFile} contains a root-relative URL without the configured base path: ${target}`);
        continue;
      }
      if (!exportPathExists(target)) fail(`${relativeFile} references missing export path: ${target}`);
    }
  }

  const cnamePath = path.join(outDir, "CNAME");
  if (existsSync(cnamePath)) {
    const cname = readFileSync(cnamePath, "utf8").trim();
    const expectedHost = new URL(siteUrl).hostname;
    if (cname !== expectedHost) fail(`CNAME must match ${expectedHost}; found ${cname || "<empty>"}.`);
  }
}

if (errors.length) {
  console.error("Static export check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static export check passed for ${requiredRoutes.length} routes and ${locales.length} locales.`);
