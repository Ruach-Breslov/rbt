"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, isLocale, localeHref, type Locale } from "@/data/locales";

const localePreferenceKey = "ruach-breslov-locale";

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localePreferenceKey, locale);
  } catch {
    // Language selection still works through locale-specific URLs when storage is unavailable.
  }
}

export function LocalePreference({ locale, restore = false }: { locale: Locale; restore?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (restore) {
      try {
        const preferredLocale = window.localStorage.getItem(localePreferenceKey);
        if (preferredLocale && isLocale(preferredLocale) && preferredLocale !== locale) {
          router.replace(preferredLocale === defaultLocale ? "/" : localeHref(preferredLocale));
          return;
        }
      } catch {
        // Fall through to the default locale when storage is unavailable.
      }
    }

    rememberLocale(locale);
  }, [locale, restore, router]);

  return null;
}
