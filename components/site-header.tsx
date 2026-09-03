import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { LanguageMenu } from "@/components/language-menu";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const navigation = [
    { label: dictionary.nav.home, href: localeHref(locale) },
    { label: dictionary.nav.events, href: localeHref(locale, "events") },
    { label: dictionary.nav.videos, href: localeHref(locale, "videos") },
    { label: dictionary.nav.contact, href: localeHref(locale, "contact") }
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={localeHref(locale)} className="brand-lockup" aria-label={`${dictionary.siteName} — ${dictionary.nav.home}`}>
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-text">
            <strong>{dictionary.siteName}</strong>
            <small>{dictionary.siteTagline}</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <div className="header-actions">
          <LanguageMenu locale={locale} dictionary={dictionary} />
          <Link href={localeHref(locale, "support")} className="button button-small button-primary">
            <Heart aria-hidden="true" />
            {dictionary.actions.supportUs}
          </Link>
          <details className="mobile-menu">
            <summary aria-label={dictionary.actions.openMenu}><Menu aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link href={localeHref(locale, "support")}>{dictionary.nav.support}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
