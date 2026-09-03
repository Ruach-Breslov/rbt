"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { localeDetails, locales, type Dictionary, type Locale } from "@/data/locales";
import { site } from "@/data/site";
import { formDataObject, submitPublicForm, type SubmissionState } from "./submit";
import { TurnstileWidget } from "./turnstile-widget";

export function ContactForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const formAvailable = Boolean(site.api.contact && site.turnstile.siteKey);
  const [state, setState] = useState<SubmissionState>(formAvailable ? "idle" : "unavailable");
  const [challengeKey, setChallengeKey] = useState(0);
  const startedAt = useRef(Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = formDataObject(form);

    if (payload.website) return;

    setState("sending");
    try {
      await submitPublicForm(site.api.contact, {
        ...payload,
        type: "contact",
        locale,
        startedAt: startedAt.current,
        submittedAt: new Date().toISOString(),
        requestId: crypto.randomUUID()
      });
      form.reset();
      startedAt.current = Date.now();
      setChallengeKey((value) => value + 1);
      setState("success");
    } catch (error) {
      setChallengeKey((value) => value + 1);
      setState(error instanceof Error && error.message === "FORM_ENDPOINT_UNAVAILABLE" ? "unavailable" : "error");
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid two-columns">
        <label>{dictionary.forms.name}<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
        <label>{dictionary.forms.email}<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label>{dictionary.forms.phone}<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label>{dictionary.forms.organization}<input name="organization" autoComplete="organization" maxLength={120} /></label>
        <label>
          {dictionary.forms.preferredLanguage}
          <select name="preferredLanguage" defaultValue={locale}>
            {locales.map((availableLocale) => <option key={availableLocale} value={availableLocale}>{localeDetails[availableLocale].nativeLabel}</option>)}
          </select>
        </label>
        <label>{dictionary.forms.reason}<input name="reason" maxLength={140} required /></label>
      </div>
      <label>{dictionary.forms.message}<textarea name="message" rows={7} minLength={10} maxLength={5000} required /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check-row"><input name="consent" type="checkbox" value="granted" required /><span>{dictionary.forms.privacyConsent}</span></label>
      {formAvailable ? <TurnstileWidget key={challengeKey} siteKey={site.turnstile.siteKey} action="contact" /> : null}
      <FormFeedback state={state} dictionary={dictionary} />
      <button className="button button-primary" type="submit" disabled={state === "sending" || state === "unavailable"}>
        <Send aria-hidden="true" />{state === "sending" ? dictionary.forms.sending : dictionary.actions.submit}
      </button>
    </form>
  );
}

export function FormFeedback({ state, dictionary, successMessage }: { state: SubmissionState; dictionary: Dictionary; successMessage?: string }) {
  if (state === "idle" || state === "sending") return null;
  const message = state === "success" ? successMessage ?? dictionary.forms.success : state === "unavailable" ? dictionary.forms.unavailable : dictionary.forms.error;
  return <p className={`form-feedback ${state}`} role={state === "error" ? "alert" : "status"}>{message}</p>;
}
