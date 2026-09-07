import type { Locale } from "@/data/locales";
import calendarEvents from "@/data/calendar-events.json";

export type EventRecord = {
  id: string;
  title: string;
  summary: string;
  location: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  allDay: boolean;
};

// This catalog is generated from the owner-managed public Google Calendar.
// An empty catalog preserves the honest, no-unconfirmed-events public state.
export const events: EventRecord[] = calendarEvents;

const localeTags: Record<Locale, string> = {
  en: "en-US",
  he: "he-IL",
  es: "es-ES",
  fa: "fa-IR"
};

function validTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone }).format();
    return timeZone;
  } catch {
    return "America/New_York";
  }
}

export function formatEventDate(event: EventRecord, locale: Locale) {
  const startsAt = new Date(event.startsAt);
  const endsAt = new Date(event.endsAt);

  if (event.allDay) {
    const formatter = new Intl.DateTimeFormat(localeTags[locale], {
      dateStyle: "long",
      timeZone: "UTC"
    });
    const inclusiveEnd = new Date(Math.max(startsAt.getTime(), endsAt.getTime() - 1));
    return endsAt.getTime() - startsAt.getTime() <= 86_400_000
      ? formatter.format(startsAt)
      : formatter.formatRange(startsAt, inclusiveEnd);
  }

  const formatter = new Intl.DateTimeFormat(localeTags[locale], {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: validTimeZone(event.timeZone)
  });
  return endsAt > startsAt ? formatter.formatRange(startsAt, endsAt) : formatter.format(startsAt);
}
