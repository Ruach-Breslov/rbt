import Link from "next/link";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { publicAsset } from "@/data/site";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <div className="footer-brand"><span className="brand-mark" aria-hidden="true"><img src={publicAsset("/media/brand/ruach-breslov-logo.webp")} alt="" /></span><strong>{dictionary.siteName}</strong></div>
          <p>{dictionary.footer.description}</p>
        </div>
        <div className="footer-links">
          <Link href={localeHref(locale, "events")}>{dictionary.nav.events}</Link>
          <Link href={localeHref(locale, "gallery")}>{dictionary.nav.gallery}</Link>
          <Link href={localeHref(locale, "videos")}>{dictionary.nav.videos}</Link>
          <Link href={localeHref(locale, "contact")}>{dictionary.nav.contact}</Link>
          <Link href={localeHref(locale, "privacy")}>{dictionary.footer.privacy}</Link>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} {dictionary.siteName}. {dictionary.footer.rights}</div>
    </footer>
  );
}
