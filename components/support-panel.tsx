import { ArrowUpRight, CreditCard, LockKeyhole, Mail } from "lucide-react";
import type { Dictionary, Locale } from "@/data/locales";
import { site } from "@/data/site";

function stripeHostedUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["buy.stripe.com", "checkout.stripe.com"].includes(url.hostname) ? url.toString() : "";
  } catch {
    return "";
  }
}

export function SupportPanel({ dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const paymentLink = stripeHostedUrl(site.payments.stripePaymentLink);
  const processingContext = dictionary.support.processingContext
    .replace("{currency}", site.payments.currency)
    .replace("{timeZone}", site.payments.timeZone);

  if (!paymentLink) {
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
    <div className="support-grid">
      <article className="support-card recommended">
        <span className="recommended-badge">{dictionary.system.recommendedDefault}</span>
        <span className="icon-tile"><CreditCard aria-hidden="true" /></span>
        <h2>{dictionary.support.hostedTitle}</h2>
        <p>{dictionary.support.hostedCopy}</p>
        <a className="button button-primary" href={paymentLink} target="_blank" rel="noopener noreferrer">{dictionary.actions.supportUs}<ArrowUpRight aria-hidden="true" /></a>
      </article>

      <div className="payment-security-note">
        <LockKeyhole aria-hidden="true" />
        <span><strong>{dictionary.support.secureNote}</strong><small>{processingContext}</small></span>
      </div>
    </div>
  );
}
