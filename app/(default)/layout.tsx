import type { Metadata, Viewport } from "next";
import "../globals.css";
import { AmbientBackground } from "@/components/ambient-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultLocale, getDictionary } from "@/data/locales";
import { absoluteUrl, publicAsset } from "@/data/site";
import { contentSecurityPolicy } from "@/lib/security";

const dictionary = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: dictionary.siteName, template: `%s · ${dictionary.siteName}` },
  description: dictionary.siteTagline,
  referrer: "strict-origin-when-cross-origin",
  icons: { icon: publicAsset("/favicon.svg") },
  manifest: publicAsset("/site.webmanifest"),
  alternates: { canonical: absoluteUrl("/") }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b14",
  colorScheme: "dark"
};

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head><meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy()} /></head>
      <body>
        <a className="skip-link" href="#main-content">{dictionary.system.skipToContent}</a>
        <AmbientBackground />
        <SiteHeader locale={defaultLocale} dictionary={dictionary} />
        <div id="main-content">{children}</div>
        <SiteFooter locale={defaultLocale} dictionary={dictionary} />
      </body>
    </html>
  );
}
