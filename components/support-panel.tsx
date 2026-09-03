"use client";

import { useState } from "react";
import { ArrowUpRight, CreditCard, LockKeyhole, ServerCog } from "lucide-react";
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

export function SupportPanel({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "error">("idle");
  const paymentLink = stripeHostedUrl(site.payments.stripePaymentLink);
  const processingContext = dictionary.support.processingContext
    .replace("{currency}", site.payments.currency)
    .replace("{timeZone}", site.payments.timeZone);

  async function createCheckout() {
    if (!site.api.checkout) return;
    setCheckoutState("loading");
    try {
      const response = await fetch(site.api.checkout, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "strict-origin-when-cross-origin",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ type: "support", locale, returnUrl: window.location.href, requestId: crypto.randomUUID() })
      });
      if (!response.ok) throw new Error("CHECKOUT_FAILED");
      const data = await response.json() as { url?: string };
      const checkoutUrl = stripeHostedUrl(data.url ?? "");
      if (!checkoutUrl) throw new Error("INVALID_CHECKOUT_URL");
      window.location.assign(checkoutUrl);
    } catch {
      setCheckoutState("error");
    }
  }

  return (
    <div className="support-grid">
      <article className="support-card recommended">
        <span className="recommended-badge">{dictionary.system.recommendedDefault}</span>
        <span className="icon-tile"><CreditCard aria-hidden="true" /></span>
        <h2>{dictionary.support.hostedTitle}</h2>
        <p>{dictionary.support.hostedCopy}</p>
        {paymentLink ? (
          <a className="button button-primary" href={paymentLink} target="_blank" rel="noopener noreferrer">{dictionary.actions.supportUs}<ArrowUpRight aria-hidden="true" /></a>
        ) : <p className="configuration-note">{dictionary.support.unavailable}</p>}
      </article>

      <article className="support-card">
        <span className="icon-tile"><ServerCog aria-hidden="true" /></span>
        <h2>{dictionary.support.customTitle}</h2>
        <p>{dictionary.support.customCopy}</p>
        {site.api.checkout ? (
          <button className="button button-secondary" type="button" onClick={createCheckout} disabled={checkoutState === "loading"}>
            {checkoutState === "loading" ? dictionary.forms.sending : dictionary.support.customTitle}
          </button>
        ) : <p className="configuration-note">{dictionary.system.backendRequired}</p>}
        {checkoutState === "error" ? <p className="form-feedback error" role="alert">{dictionary.forms.error}</p> : null}
      </article>

      <div className="payment-security-note">
        <LockKeyhole aria-hidden="true" />
        <span><strong>{dictionary.support.secureNote}</strong><small>{processingContext}</small></span>
      </div>
    </div>
  );
}
