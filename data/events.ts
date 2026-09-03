import type { Locale } from "@/data/locales";

export type EventRecord = {
  id: "community-open-house" | "live-workshop" | "annual-gathering";
  startsAt: string;
  durationMinutes: number;
  demo: boolean;
};

export const events: EventRecord[] = [
  { id: "community-open-house", startsAt: "2026-10-18T18:30:00+03:00", durationMinutes: 120, demo: true },
  { id: "live-workshop", startsAt: "2026-11-05T19:00:00+03:00", durationMinutes: 90, demo: true },
  { id: "annual-gathering", startsAt: "2026-12-12T20:00:00+03:00", durationMinutes: 150, demo: true }
];

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
