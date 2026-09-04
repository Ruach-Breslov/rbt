import type { Locale } from "@/data/locales";

export type EventRecord = {
  id: "community-open-house" | "live-workshop" | "annual-gathering";
  startsAt: string;
  durationMinutes: number;
};

// Publish only owner-confirmed events. An empty list renders a clear public state.
export const events: EventRecord[] = [];

const localeTags: Record<Locale, string> = {
  en: "en-US",
  he: "he-IL",
  es: "es-ES",
  fa: "fa-IR"
};

export function formatEventDate(startsAt: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeTags[locale], {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem"
  }).format(new Date(startsAt));
}
