import { ArrowUpRight, Check, CreditCard, LockKeyhole, Mail, RefreshCw } from "lucide-react";
import type { Dictionary, Locale } from "@/data/locales";
import { site } from "@/data/site";

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
  const currency = new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: site.payments.currency,
    maximumFractionDigits: 0
  });

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
        {oneTimeLink ? (
          <article className="support-card">
            <span className="icon-tile"><CreditCard aria-hidden="true" /></span>
            <h2>{dictionary.support.hostedTitle}</h2>
            <p>{dictionary.support.hostedCopy}</p>
            <a className="button button-primary" href={oneTimeLink} target="_blank" rel="noopener noreferrer">
              {dictionary.support.oneTimeCta}<ArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ) : null}

        {monthlyLinks.length ? (
          <article className="support-card support-card-monthly">
            <span className="icon-tile"><RefreshCw aria-hidden="true" /></span>
            <h2>{dictionary.support.customTitle}</h2>
            <p>{dictionary.support.customCopy}</p>
            <div className="monthly-gift-grid">
              {monthlyLinks.map((option) => {
                const amount = currency.format(option.amount);
                return (
                  <a key={option.amount} href={option.url} target="_blank" rel="noopener noreferrer" className="monthly-gift-link">
                    <strong>{amount}</strong>
                    <small>{dictionary.support.monthlyLabel}</small>
                    <span>{dictionary.support.monthlyCta.replace("{amount}", amount)}<ArrowUpRight aria-hidden="true" /></span>
                  </a>
                );
              })}
            </div>
            <p className="monthly-disclosure">{dictionary.support.monthlyDisclosure}</p>
            {customerPortalUrl ? (
              <a className="button button-secondary" href={customerPortalUrl} target="_blank" rel="noopener noreferrer">
                {dictionary.support.manageMonthlyCta}<ArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
          </article>
        ) : null}
      </div>

      <aside className="support-impact" aria-labelledby="support-impact-title">
        <h2 id="support-impact-title">{dictionary.support.impactTitle}</h2>
        <ul>{dictionary.support.impactItems.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
      </aside>

      <div className="payment-security-note">
        <LockKeyhole aria-hidden="true" />
        <span><strong>{dictionary.support.secureNote}</strong><small>{processingContext}</small></span>
      </div>
    </div>
  );
}
