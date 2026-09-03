import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { AmbientBackground } from "@/components/ambient-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, isLocale, localeDetails, locales } from "@/data/locales";
import { absoluteUrl, publicAsset } from "@/data/site";
import { contentSecurityPolicy } from "@/lib/security";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: { default: dictionary.siteName, template: `%s · ${dictionary.siteName}` },
    description: dictionary.siteTagline,
    referrer: "strict-origin-when-cross-origin",
    icons: { icon: publicAsset("/favicon.svg") },
    manifest: publicAsset("/site.webmanifest")
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b14",
  colorScheme: "dark"
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} dir={localeDetails[locale].dir}>
      <head><meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy()} /></head>
      <body>
        <a className="skip-link" href="#main-content">{dictionary.system.skipToContent}</a>
        <AmbientBackground />
        <SiteHeader locale={locale} dictionary={dictionary} />
        <div id="main-content">{children}</div>
        <SiteFooter locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
