import { ArrowUpRight, BadgeCheck, Check, LockKeyhole, Mail } from "lucide-react";
import type { Dictionary, Locale } from "@/data/locales";
import { site } from "@/data/site";
import { DonationChooser } from "@/components/donation-chooser";

const stripeHosts = new Set(["buy.stripe.com", "checkout.stripe.com", "donate.stripe.com"]);
const stripePortalHosts = new Set(["billing.stripe.com"]);
const localeTags: Record<Locale, string> = { en: "en-US", he: "he-IL", es: "es-US", fa: "fa-IR" };

function stripeHostedUrl(value: string, allowedHosts: ReadonlySet<string> = stripeHosts) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && allowedHosts.has(url.hostname) ? url.toString() : "";
  } catch {
    return "";
  }
}

export function SupportPanel({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const oneTimeLink = stripeHostedUrl(site.payments.oneTimePaymentLink);
  const customerPortalUrl = stripeHostedUrl(site.payments.customerPortalUrl, stripePortalHosts);
  const monthlyLinks = site.payments.monthlyPaymentLinks
    .map((option) => ({ ...option, url: stripeHostedUrl(option.url) }))
    .filter((option) => option.url);
  const processingContext = dictionary.support.processingContext
    .replace("{currency}", site.payments.currency)
    .replace("{timeZone}", site.payments.timeZone);
  if (!oneTimeLink && monthlyLinks.length === 0) {
    return (
      <div className="empty-state">
        <span className="icon-tile"><Mail aria-hidden="true" /></span>
        <h2>{dictionary.support.hostedTitle}</h2>
        <p>{dictionary.support.unavailable}</p>
        <a className="button button-secondary" href={`mailto:${site.contact.email}`}>{dictionary.actions.contactUs}</a>
      </div>
    );
  }

  return (
    <div className="support-layout">
      <div className="support-grid">
        <DonationChooser
          oneTimeLink={oneTimeLink}
          monthlyLinks={monthlyLinks}
          customerPortalUrl={customerPortalUrl}
          localeTag={localeTags[locale]}
          currency={site.payments.currency}
          copy={dictionary.support}
        />
      </div>

      <aside className="support-impact" aria-labelledby="support-impact-title">
        <h2 id="support-impact-title">{dictionary.support.impactTitle}</h2>
        <ul>{dictionary.support.impactItems.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
      </aside>

      <aside className="nonprofit-proof" aria-labelledby="nonprofit-proof-title">
        <BadgeCheck aria-hidden="true" />
        <div>
          <h2 id="nonprofit-proof-title">{dictionary.support.nonprofitTitle}</h2>
          <p>{dictionary.support.nonprofitCopy}</p>
          <strong>{site.organization.legalName} · EIN {site.organization.ein}</strong>
          <a href={site.organization.irsSearchUrl} target="_blank" rel="noopener noreferrer">
            {dictionary.support.verifyStatus}<ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </aside>

      <div className="payment-security-note">
        <LockKeyhole aria-hidden="true" />
        <span><strong>{dictionary.support.secureNote}</strong><small>{processingContext}</small></span>
      </div>
    </div>
  );
}
