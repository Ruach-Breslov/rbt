import { createHash } from "node:crypto";
import ICAL from "ical.js";

const DEFAULT_TIME_ZONE = "America/New_York";
const DEFAULT_HORIZON_DAYS = 370;
const DEFAULT_MAX_EVENTS = 60;
const MAX_EXPANSION_STEPS = 50_000;

function text(value) {
  return typeof value === "string"
    ? value.replace(/<[^>]*>/gu, " ").replace(/\s+/gu, " ").trim()
    : "";
}

function conciseDescription(value, maximumLength = 320) {
  const normalized = text(value);
  if (normalized.length <= maximumLength) return normalized;
  const shortened = normalized.slice(0, maximumLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > maximumLength * 0.7 ? lastSpace : maximumLength).trimEnd()}…`;
}

function componentValue(component, name) {
  return component.getFirstPropertyValue(name);
}

function isCancelled(event) {
  return text(componentValue(event.component, "status")).toUpperCase() === "CANCELLED";
}

function validTimeZone(candidate, fallback = DEFAULT_TIME_ZONE) {
  if (!candidate || candidate === "floating" || candidate === "local") return fallback;
  try {
    new Intl.DateTimeFormat("en", { timeZone: candidate }).format();
    return candidate;
  } catch {
    return fallback;
  }
}

function calendarDateToIso(value) {
  if (value.isDate) {
    return new Date(Date.UTC(value.year, value.month - 1, value.day)).toISOString();
  }
  return value.toJSDate().toISOString();
}

function stableEventId(uid, recurrenceId) {
  return createHash("sha256").update(`${uid}\n${recurrenceId}`).digest("hex").slice(0, 24);
}

function recordFromOccurrence(master, occurrenceDetails, defaultTimeZone) {
  const occurrence = occurrenceDetails.item;
  const start = occurrenceDetails.startDate;
  const end = occurrenceDetails.endDate;
  const startsAt = calendarDateToIso(start);
  let endsAt = calendarDateToIso(end);

  if (start.isDate && Date.parse(endsAt) <= Date.parse(startsAt)) {
    endsAt = new Date(Date.parse(startsAt) + 86_400_000).toISOString();
  }

  const occurrenceZone = start.zone?.tzid;
  const title = text(occurrence.summary) || text(master.summary) || "Ruach Breslov gathering";

  return {
    id: stableEventId(master.uid, occurrenceDetails.recurrenceId.toString()),
    title,
    summary: conciseDescription(occurrence.description || master.description),
    location: text(occurrence.location || master.location),
    startsAt,
    endsAt,
    timeZone: start.isDate ? "UTC" : validTimeZone(occurrenceZone, defaultTimeZone),
    allDay: Boolean(start.isDate)
  };
}

function eventEndMilliseconds(record) {
  return Date.parse(record.endsAt || record.startsAt);
}

export function buildGoogleCalendarCatalog(
  calendarText,
  { now = new Date(), horizonDays = DEFAULT_HORIZON_DAYS, maxEvents = DEFAULT_MAX_EVENTS } = {}
) {
  if (typeof calendarText !== "string" || !calendarText.includes("BEGIN:VCALENDAR")) {
    throw new Error("The Google Calendar response is not an iCalendar feed.");
  }

  const windowStart = new Date(now);
  if (Number.isNaN(windowStart.getTime())) throw new Error("Calendar sync received an invalid current date.");
  const windowEndMilliseconds = windowStart.getTime() + horizonDays * 86_400_000;
  const calendar = new ICAL.Component(ICAL.parse(calendarText));
  if (calendar.name !== "vcalendar") throw new Error("The iCalendar feed has no VCALENDAR root.");

  const calendarTimeZone = validTimeZone(text(componentValue(calendar, "x-wr-timezone")));
  const components = calendar.getAllSubcomponents("vevent");
  const exceptions = components.filter((component) => component.hasProperty("recurrence-id"));
  const records = [];

  for (const component of components) {
    if (component.hasProperty("recurrence-id")) continue;
    const uid = text(componentValue(component, "uid"));
    if (!uid) throw new Error("A Google Calendar event is missing its UID.");

    const relatedExceptions = exceptions.filter((exception) => text(componentValue(exception, "uid")) === uid);
    const event = new ICAL.Event(component, { strictExceptions: true, exceptions: relatedExceptions });
    if (isCancelled(event)) continue;

    if (!event.isRecurring()) {
      const details = {
        item: event,
        recurrenceId: event.startDate,
        startDate: event.startDate,
        endDate: event.endDate
      };
      const record = recordFromOccurrence(event, details, calendarTimeZone);
      if (eventEndMilliseconds(record) > windowStart.getTime() && Date.parse(record.startsAt) <= windowEndMilliseconds) {
        records.push(record);
      }
      continue;
    }

    const iterator = event.iterator();
    let steps = 0;
    let occurrence;
    while ((occurrence = iterator.next())) {
      steps += 1;
      if (steps > MAX_EXPANSION_STEPS) {
        throw new Error(`Recurring event ${uid} exceeds the safe expansion limit.`);
      }
      if (occurrence.toJSDate().getTime() > windowEndMilliseconds) break;

      const details = event.getOccurrenceDetails(occurrence);
      if (isCancelled(details.item)) continue;
      const record = recordFromOccurrence(event, details, calendarTimeZone);
      if (eventEndMilliseconds(record) > windowStart.getTime() && Date.parse(record.startsAt) <= windowEndMilliseconds) {
        records.push(record);
      }
    }
  }

  const unique = new Map(records.map((record) => [record.id, record]));
  return [...unique.values()]
    .sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt) || left.title.localeCompare(right.title))
    .slice(0, maxEvents);
}

export function publicGoogleCalendarUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("GOOGLE_CALENDAR_ICAL_URL must be Google's HTTPS public iCal address ending in /public/basic.ics.");
  }
  const acceptedHost = url.hostname === "calendar.google.com" || url.hostname === "www.google.com";
  const publicFeed = /^\/calendar\/ical\/.+\/public\/basic\.ics$/u.test(url.pathname);
  if (url.protocol !== "https:" || !acceptedHost || !publicFeed) {
    throw new Error("GOOGLE_CALENDAR_ICAL_URL must be Google's HTTPS public iCal address ending in /public/basic.ics.");
  }
  return url;
}
