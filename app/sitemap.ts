import type { MetadataRoute } from "next";
import { localeHref, locales } from "@/data/locales";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

const localizedPaths = ["", "events", "gallery", "videos", "contact", "support", "privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly" as const, priority: 1 },
    ...locales.flatMap((locale) => localizedPaths.filter((path) => locale !== "en" || path).map((path) => ({
      url: absoluteUrl(localeHref(locale, path) as `/${string}`),
      changeFrequency: path === "events" ? "weekly" as const : "monthly" as const,
      priority: path ? 0.8 : 0.9
    })))
  ];
}
