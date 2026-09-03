import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { defaultLocale, getDictionary, localeHref, locales } from "@/data/locales";
import { absoluteUrl } from "@/data/site";

const dictionary = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dictionary.siteName,
  description: dictionary.home.description,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, locale === "en" ? absoluteUrl("/") : absoluteUrl(localeHref(locale) as `/${string}`)])),
      "x-default": absoluteUrl("/")
    }
  }
};

export default function DefaultHomePage() {
  return <HomePage locale={defaultLocale} dictionary={dictionary} />;
}
