"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CalendarCheck, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import type { EventRecord } from "@/data/events";
import type { Dictionary, Locale } from "@/data/locales";
import { site } from "@/data/site";
import { FormFeedback } from "./contact-form";
import { formDataObject, submitPublicForm, type SubmissionState } from "./submit";
import { TurnstileWidget } from "./turnstile-widget";

export function RsvpDialog({ event, eventTitle, locale, dictionary }: { event: EventRecord; eventTitle: string; locale: Locale; dictionary: Dictionary }) {
  const formAvailable = Boolean(site.api.rsvp && site.turnstile.siteKey);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmissionState>(formAvailable ? "idle" : "unavailable");
  const [challengeKey, setChallengeKey] = useState(0);
  const startedAt = useRef(Date.now());

  async function onSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    const payload = formDataObject(form);
    if (payload.website) return;

    setState("sending");
    try {
      await submitPublicForm(site.api.rsvp, {
        ...payload,
        type: "rsvp",
        eventId: event.id,
        eventStartsAt: event.startsAt,
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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="button button-primary button-small"><CalendarCheck aria-hidden="true" />{dictionary.actions.rsvp}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close className="dialog-close" aria-label={dictionary.actions.close}><X aria-hidden="true" /></Dialog.Close>
          <Dialog.Title>{dictionary.actions.rsvp}: {eventTitle}</Dialog.Title>
          <Dialog.Description>{dictionary.events.description}</Dialog.Description>
          <form className="form-card compact-card" onSubmit={onSubmit}>
            <input type="hidden" name="event" value={event.id} />
            <label>{dictionary.forms.name}<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
            <label>{dictionary.forms.email}<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
            <label>{dictionary.forms.guests}<input name="guests" type="number" inputMode="numeric" min={1} max={12} defaultValue={1} required /></label>
            <label>{dictionary.forms.accessibility}<textarea name="accessibility" rows={3} maxLength={1000} /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="check-row compact"><input name="consent" type="checkbox" value="granted" required /><span>{dictionary.forms.privacyConsent}</span></label>
            {formAvailable ? <TurnstileWidget key={challengeKey} siteKey={site.turnstile.siteKey} action="rsvp" /> : null}
            <FormFeedback state={state} dictionary={dictionary} />
            <button className="button button-primary" type="submit" disabled={state === "sending" || state === "unavailable"}>
              {state === "sending" ? dictionary.forms.sending : dictionary.actions.rsvp}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
