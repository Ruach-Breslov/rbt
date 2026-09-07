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
const localizedPages = ["", "about", "contact", "events", "gallery", "privacy", "support", "videos"];
const requiredRoutes = ["/", ...locales.flatMap((locale) => localizedPages.map((page) => `/${locale}${page ? `/${page}` : ""}`))];
const requiredFiles = ["404.html", ".nojekyll", "media/brand/ruach-icon-192.png", "media/brand/ruach-icon-512.png", "robots.txt", "site.webmanifest", "sitemap.xml"];
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
  const aboutHtml = routeHtml("/en/about");
  const galleryHtml = routeHtml("/en/gallery");
  const videosHtml = routeHtml("/en/videos");
  const contactHtml = routeHtml("/en/contact");
  for (const requiredIdentity of ["Ruach Breslov Inc.", "41-3212278", "Benjamin Roberts", "Executive Director"]) {
    if (!aboutHtml.includes(requiredIdentity)) fail(`About page is missing verified identity content: ${requiredIdentity}`);
  }
  if (!aboutHtml.includes('"@type":"NGO"') || !aboutHtml.includes('"taxID":"41-3212278"')) {
    fail("About page is missing nonprofit organization structured data.");
  }
  for (const asset of [
    "/media/hero/home-hero-client.webp",
    "/media/gallery/community-study.webp",
    "/media/gallery/weekly-gathering.webp",
    "/media/gallery/community-arriving.mp4",
    "/media/brand/ruach-breslov-logo.webp"
  ]) {
    if (!galleryHtml.includes(asset) && !rootHtml.includes(asset)) fail(`Gallery or homepage is missing media asset reference: ${asset}`);
    if (!exportPathExists(`${basePath}${asset}`)) fail(`Missing exported media asset: ${asset}`);
  }
  if (!videosHtml.includes("/media/videos/77ibzlmzv2E.webp")) fail("Videos page is missing the local official-video thumbnail.");
  if (!exportPathExists(`${basePath}/media/videos/77ibzlmzv2E.webp`)) fail("Missing exported official-video thumbnail.");
  if (!contactHtml.includes("https://www.google.com/maps?q=") || !contactHtml.includes("output=embed")) {
    fail("Contact page is missing the pinned Google map.");
  }
  if (!contactHtml.includes("https://www.google.com/maps/dir/?api=1") || !contactHtml.includes("travelmode=driving")) {
    fail("Contact page is missing Google Maps driving directions.");
  }
  try {
    const videoCatalog = JSON.parse(readFileSync(path.join(projectRoot, "data", "youtube-catalog.json"), "utf8"));
    if (!Array.isArray(videoCatalog) || !videoCatalog.length) {
      fail("The YouTube catalog must contain at least one video.");
    } else {
      for (const video of videoCatalog) {
        if (!/^[A-Za-z0-9_-]{11}$/.test(video?.youtubeId ?? "")) {
          fail("The YouTube catalog contains an invalid video ID.");
        } else if (!videosHtml.includes(video.youtubeId)) {
          fail(`Videos page is missing catalog entry: ${video.youtubeId}`);
        }
      }
    }
  } catch {
    fail("The YouTube catalog is missing or invalid JSON.");
  }

  if (!/<html lang="en" dir="ltr"/i.test(rootHtml)) fail("Root page must declare English LTR document direction.");
  const expectedHeroImage = heroImage || "/media/hero/home-hero-client.webp";
  if (!rootHtml.includes("hero-artwork") || !rootHtml.includes(expectedHeroImage)) {
    fail("Root page must include the client-selected cinematic hero artwork.");
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

  const decodeHtmlAttribute = (value) => value.replace(
    /&(?:#(\d+)|#x([0-9a-f]+)|quot|apos|amp|lt|gt);/gi,
    (entity, decimal, hexadecimal) => {
      if (decimal) return String.fromCodePoint(Number.parseInt(decimal, 10));
      if (hexadecimal) return String.fromCodePoint(Number.parseInt(hexadecimal, 16));
      return { "&quot;": '"', "&apos;": "'", "&amp;": "&", "&lt;": "<", "&gt;": ">" }[entity.toLowerCase()] ?? entity;
    }
  );
  const htmlAttribute = (tag, name) => decodeHtmlAttribute(
    tag.match(new RegExp(`\\b${name}=(["'])(.*?)\\1`, "i"))?.[2] ?? ""
  );
  const cspMeta = [...rootHtml.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => htmlAttribute(tag, "http-equiv").toLowerCase() === "content-security-policy");
  const cspDirectives = new Map(
    htmlAttribute(cspMeta ?? "", "content")
      .split(";")
      .map((directive) => directive.trim().split(/\s+/))
      .filter((tokens) => tokens[0])
      .map(([name, ...sources]) => [name.toLowerCase(), new Set(sources)])
  );
  const hasCspSource = (directive, source) => cspDirectives.get(directive)?.has(source) ?? false;
  const requiredCspSources = [
    ["frame-src", "https://www.youtube-nocookie.com"],
    ["frame-src", "https://www.google.com"],
    ["script-src-attr", "'none'"],
    ["form-action", "'self'"],
  ];
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
    requiredCspSources.push(
      ["script-src", "https://challenges.cloudflare.com"],
      ["connect-src", "https://challenges.cloudflare.com"],
      ["frame-src", "https://challenges.cloudflare.com"]
    );
  }
  if (!cspMeta || !requiredCspSources.every(([directive, source]) => hasCspSource(directive, source))) {
    fail("CSP must allow only the configured YouTube, Google Maps, and Turnstile experiences.");
  }
  const forbiddenCspSources = new Set([
    "https://checkout.stripe.com",
    "https://buy.stripe.com",
    "https://donate.stripe.com"
  ]);
  if ([...cspDirectives.values()].some((sources) => [...sources].some((source) => forbiddenCspSources.has(source)))) {
    fail("Stripe checkout hosts must not be granted embedded or form-submit privileges in CSP.");
  }

  const configuredVideoIds = (process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_IDS ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  for (const videoId of configuredVideoIds) {
    if (!videosHtml.includes(videoId)) fail(`Videos page is missing configured YouTube video: ${videoId}`);
  }
  const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL?.trim() ?? "";
  if (channelUrl && !videosHtml.includes(channelUrl)) fail("Videos page is missing the configured YouTube channel link.");

  const allFiles = walkFiles(outDir);
  const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
  const textFiles = allFiles.filter((file) => /\.(?:css|html|js|json|map|txt|webmanifest|xml)$/i.test(file));
  const secretPattern = /(?:\bre_[A-Za-z0-9_-]{16,}|\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9_-]{16,}|\bwhsec_[A-Za-z0-9_-]{16,}|\bgithub_pat_[A-Za-z0-9_]{20,}|\bgh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:OPENSSH|RSA|EC) PRIVATE KEY-----)/;

  for (const file of textFiles) {
    if (secretPattern.test(readFileSync(file, "utf8"))) {
      fail(`${path.relative(outDir, file).replaceAll(path.sep, "/")} appears to expose a service secret.`);
    }
  }

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const relativeFile = path.relative(outDir, file).replaceAll(path.sep, "/");

    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const anchor = match[0];
      if (!/\btarget=["']_blank["']/i.test(anchor)) continue;
      const relation = anchor.match(/\brel=["']([^"']*)["']/i)?.[1].toLowerCase().split(/\s+/) ?? [];
      if (!relation.includes("noopener") || !relation.includes("noreferrer")) {
        fail(`${relativeFile} contains a target=_blank link without noopener noreferrer.`);
      }
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
