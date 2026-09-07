"use client";

import { useState } from "react";
import { ArrowUpRight, CreditCard, LockKeyhole, RefreshCw } from "lucide-react";
import type { Dictionary } from "@/data/locales";

type Frequency = "oneTime" | "monthly";

type MonthlyLink = {
  amount: number;
  url: string;
};

type DonationChooserProps = {
  oneTimeLink: string;
  monthlyLinks: MonthlyLink[];
  customerPortalUrl: string;
  localeTag: string;
  currency: string;
  copy: Dictionary["support"];
};

export function DonationChooser({
  oneTimeLink,
  monthlyLinks,
  customerPortalUrl,
  localeTag,
  currency,
  copy
}: DonationChooserProps) {
  const [frequency, setFrequency] = useState<Frequency>(oneTimeLink ? "oneTime" : "monthly");
  const [monthlyAmount, setMonthlyAmount] = useState(monthlyLinks[0]?.amount ?? 0);
  const monthlySelection = monthlyLinks.find((option) => option.amount === monthlyAmount) ?? monthlyLinks[0];
  const isMonthly = frequency === "monthly";
  const checkoutUrl = isMonthly ? monthlySelection?.url : oneTimeLink;
  const money = new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  });

  return (
    <article className="giving-chooser">
      <div className="giving-chooser-copy" aria-live="polite">
        <span className="icon-tile">
          {isMonthly ? <RefreshCw aria-hidden="true" /> : <CreditCard aria-hidden="true" />}
        </span>
        <p className="giving-kicker">{copy.givingFrequency}</p>
        <h2>{isMonthly ? copy.customTitle : copy.hostedTitle}</h2>
        <p>{isMonthly ? copy.customCopy : copy.hostedCopy}</p>
      </div>

      <div className="giving-chooser-controls">
        {oneTimeLink && monthlyLinks.length ? (
          <div className="giving-frequency" role="group" aria-label={copy.givingFrequency}>
            <button type="button" aria-pressed={!isMonthly} onClick={() => setFrequency("oneTime")}>
              <CreditCard aria-hidden="true" />
              {copy.oneTimeOption}
            </button>
            <button type="button" aria-pressed={isMonthly} onClick={() => setFrequency("monthly")}>
              <RefreshCw aria-hidden="true" />
              {copy.monthlyOption}
            </button>
          </div>
        ) : null}

        <div className="giving-choice-panel">
          {isMonthly ? (
            <fieldset className="monthly-amounts">
              <legend>{copy.monthlyAmountPrompt}</legend>
              <div className="monthly-amount-grid">
                {monthlyLinks.map((option) => {
                  const amount = money.format(option.amount);
                  const selected = monthlySelection?.amount === option.amount;
                  return (
                    <button
                      key={option.amount}
                      type="button"
                      aria-label={copy.monthlyCta.replace("{amount}", amount)}
                      aria-pressed={selected}
                      onClick={() => setMonthlyAmount(option.amount)}
                    >
                      <strong>{amount}</strong>
                      <small>{copy.monthlyLabel}</small>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <div className="one-time-choice">
              <span aria-hidden="true">{currency}</span>
              <strong>{copy.oneTimeCta}</strong>
            </div>
          )}

          {checkoutUrl ? (
            <a className="button button-primary giving-checkout-button" href={checkoutUrl} target="_blank" rel="noopener noreferrer">
              {copy.continueToStripe}<ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}

          <p className="giving-checkout-note">
            <LockKeyhole aria-hidden="true" />
            <span>{copy.stripeRedirectNote}</span>
          </p>

          {isMonthly ? <p className="monthly-disclosure">{copy.monthlyDisclosure}</p> : null}

          {customerPortalUrl ? (
            <a className="manage-monthly-link" href={customerPortalUrl} target="_blank" rel="noopener noreferrer">
              {copy.manageMonthlyCta}<ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
