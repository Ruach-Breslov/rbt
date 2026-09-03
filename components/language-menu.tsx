"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";
import { localeDetails, localeHref, locales, type Dictionary, type Locale } from "@/data/locales";
import { basePath } from "@/lib/paths";
import { rememberLocale } from "@/components/locale-preference";

export function LanguageMenu({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const withoutBasePath = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
    ? pathname.slice(basePath.length) || "/"
    : pathname;
  const segments = withoutBasePath.split("/").filter(Boolean);
  const pageSegments = locales.includes(segments[0] as Locale) ? segments.slice(1) : [];
  const pagePath = pageSegments.join("/");

  return (
    <details className="language-menu">
      <summary aria-label={dictionary.languageLabel}>
        <Languages aria-hidden="true" />
        <span>{localeDetails[locale].nativeLabel}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <div className="language-options">
        {locales.map((availableLocale) => (
          <Link
            key={availableLocale}
            href={availableLocale === "en" && !pagePath ? "/" : localeHref(availableLocale, pagePath)}
            hrefLang={availableLocale}
            lang={availableLocale}
            aria-current={availableLocale === locale ? "page" : undefined}
            onClick={() => rememberLocale(availableLocale)}
          >
            {localeDetails[availableLocale].nativeLabel}
          </Link>
        ))}
      </div>
    </details>
  );
}
