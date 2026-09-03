"use client";

import { useRef, useState, type FormEvent } from "react";
import { BellRing } from "lucide-react";
import type { Dictionary, Locale } from "@/data/locales";
import { site } from "@/data/site";
import { FormFeedback } from "./contact-form";
import { formDataObject, submitPublicForm, type SubmissionState } from "./submit";
import { TurnstileWidget } from "./turnstile-widget";

export function SubscriptionForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const formAvailable = Boolean(site.api.subscribe && site.turnstile.siteKey);
  const [state, setState] = useState<SubmissionState>(formAvailable ? "idle" : "unavailable");
  const [topicError, setTopicError] = useState(false);
  const [challengeKey, setChallengeKey] = useState(0);
  const startedAt = useRef(Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const topics = formData.getAll("topics").map(String);
    if (!topics.length) {
      setTopicError(true);
      return;
    }
    setTopicError(false);
    const payload = formDataObject(form);
    if (payload.website) return;

    setState("sending");
    try {
      await submitPublicForm(site.api.subscribe, {
        ...payload,
        topics,
        type: "subscription",
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
    <form className="subscription-form" onSubmit={onSubmit}>
      <div className="subscription-fields">
        <label>{dictionary.forms.name}<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
        <label>{dictionary.forms.email}<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <fieldset>
        <legend className="sr-only">Subscription topics</legend>
        <label className="topic-chip"><input name="topics" type="checkbox" value="newsletter" /><span>{dictionary.forms.newsletter}</span></label>
        <label className="topic-chip"><input name="topics" type="checkbox" value="events" /><span>{dictionary.forms.eventUpdates}</span></label>
      </fieldset>
      {topicError ? <p className="form-feedback error" role="alert">{dictionary.system.chooseTopic}</p> : null}
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check-row compact"><input name="consent" type="checkbox" value="granted" required /><span>{dictionary.forms.privacyConsent}</span></label>
      {formAvailable ? <TurnstileWidget key={challengeKey} siteKey={site.turnstile.siteKey} action="subscribe" /> : null}
      <FormFeedback state={state} dictionary={dictionary} successMessage={dictionary.forms.subscriptionSuccess} />
      <button className="button button-light" type="submit" disabled={state === "sending" || state === "unavailable"}>
        <BellRing aria-hidden="true" />{state === "sending" ? dictionary.forms.sending : dictionary.actions.subscribe}
      </button>
    </form>
  );
}
