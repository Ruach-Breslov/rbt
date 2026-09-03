import type { Metadata } from "next";
import { localeHref, locales, type Locale } from "@/data/locales";
import { absoluteUrl } from "@/data/site";

export function createLocalizedMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const localizedPath = locale === "en" && !path ? "/" : localeHref(locale, path);
  const languageAlternates = Object.fromEntries(
    locales.map((availableLocale) => {
      const alternatePath = availableLocale === "en" && !path ? "/" : localeHref(availableLocale, path);
      return [availableLocale, absoluteUrl(alternatePath as `/${string}`)];
    })
  );
  languageAlternates["x-default"] = absoluteUrl((path ? localeHref("en", path) : "/") as `/${string}`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(localizedPath as `/${string}`),
      languages: languageAlternates
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath as `/${string}`),
      locale,
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}
