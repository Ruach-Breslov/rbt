import assert from "node:assert/strict";
import test from "node:test";
import { buildGoogleCalendarCatalog, publicGoogleCalendarUrl } from "./lib/google-calendar.mjs";

const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ruach Breslov//Calendar sync test//EN
X-WR-TIMEZONE:America/New_York
BEGIN:VEVENT
UID:one-time@example.com
DTSTART:20260910T230000Z
DTEND:20260911T010000Z
SUMMARY:Torah & Connection
DESCRIPTION:Weekly learning\\, dinner\\nand an honest conversation.
LOCATION:71-27 147th St\\, Flushing\\, NY 11367
END:VEVENT
BEGIN:VEVENT
UID:weekly@example.com
DTSTART:20260908T230000Z
DTEND:20260909T003000Z
RRULE:FREQ=WEEKLY;COUNT=4
EXDATE:20260915T230000Z
SUMMARY:Weekly class
LOCATION:Queens
END:VEVENT
BEGIN:VEVENT
UID:weekly@example.com
RECURRENCE-ID:20260922T230000Z
DTSTART:20260923T000000Z
DTEND:20260923T013000Z
SUMMARY:Weekly class — later this week
LOCATION:Queens
END:VEVENT
BEGIN:VEVENT
UID:all-day@example.com
DTSTART;VALUE=DATE:20260912
DTEND;VALUE=DATE:20260914
SUMMARY:Community weekend
END:VEVENT
BEGIN:VEVENT
UID:cancelled@example.com
DTSTART:20260911T230000Z
DTEND:20260912T000000Z
SUMMARY:Cancelled event
STATUS:CANCELLED
END:VEVENT
END:VCALENDAR`;

const zonedCalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ruach Breslov//Calendar timezone test//EN
X-WR-TIMEZONE:America/New_York
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:zoned@example.com
DTSTART;TZID=America/New_York:20260910T190000
DTEND;TZID=America/New_York:20260910T203000
SUMMARY:Evening class
END:VEVENT
END:VCALENDAR`;

test("builds a future event catalog with recurrence changes and cancellations", () => {
  const events = buildGoogleCalendarCatalog(calendar, {
    now: new Date("2026-09-09T02:00:00Z"),
    horizonDays: 30
  });

  assert.deepEqual(events.map((event) => event.title), [
    "Torah & Connection",
    "Community weekend",
    "Weekly class — later this week",
    "Weekly class"
  ]);
  assert.equal(events[0].summary, "Weekly learning, dinner and an honest conversation.");
  assert.equal(events[0].location, "71-27 147th St, Flushing, NY 11367");
  assert.equal(events[0].timeZone, "UTC");
  assert.equal(events[1].allDay, true);
  assert.equal(events[1].startsAt, "2026-09-12T00:00:00.000Z");
  assert.equal(events[1].endsAt, "2026-09-14T00:00:00.000Z");
  assert.equal(events[2].startsAt, "2026-09-23T00:00:00.000Z");
  assert.equal(new Set(events.map((event) => event.id)).size, events.length);
});

test("excludes events that have already ended", () => {
  const events = buildGoogleCalendarCatalog(calendar, {
    now: new Date("2026-10-01T00:00:00Z"),
    horizonDays: 30
  });
  assert.deepEqual(events, []);
});

test("preserves Google Calendar time zones for correct local display", () => {
  const [event] = buildGoogleCalendarCatalog(zonedCalendar, {
    now: new Date("2026-09-01T00:00:00Z"),
    horizonDays: 30
  });
  assert.equal(event.startsAt, "2026-09-10T23:00:00.000Z");
  assert.equal(event.endsAt, "2026-09-11T00:30:00.000Z");
  assert.equal(event.timeZone, "America/New_York");
});

test("accepts only Google's public iCal address", () => {
  assert.equal(
    publicGoogleCalendarUrl("https://calendar.google.com/calendar/ical/example%40group.calendar.google.com/public/basic.ics").hostname,
    "calendar.google.com"
  );
  assert.throws(() => publicGoogleCalendarUrl("https://example.com/calendar.ics"), /public iCal address/);
  assert.throws(
    () => publicGoogleCalendarUrl("https://calendar.google.com/calendar/ical/example/private/basic.ics"),
    /public iCal address/
  );
  assert.throws(() => publicGoogleCalendarUrl(""), /public iCal address/);
});
