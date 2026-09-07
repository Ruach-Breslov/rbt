import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildGoogleCalendarCatalog, publicGoogleCalendarUrl } from "./lib/google-calendar.mjs";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const catalogPath = path.join(projectRoot, "data", "calendar-events.json");
const feedUrl = publicGoogleCalendarUrl(process.env.GOOGLE_CALENDAR_ICAL_URL?.trim() ?? "");

const response = await fetch(feedUrl, {
  headers: {
    accept: "text/calendar, text/plain;q=0.9",
    "user-agent": "Ruach-Breslov-event-sync/1.0"
  },
  redirect: "error",
  signal: AbortSignal.timeout(30_000)
});

if (!response.ok) throw new Error(`Google Calendar request failed with HTTP ${response.status}.`);
const calendarText = await response.text();
if (calendarText.length > 5_000_000) throw new Error("Google Calendar returned an unexpectedly large feed.");

const catalog = buildGoogleCalendarCatalog(calendarText);
const currentCatalog = JSON.parse(await readFile(catalogPath, "utf8"));

if (JSON.stringify(catalog) === JSON.stringify(currentCatalog)) {
  console.log(`Event sync complete: ${catalog.length} upcoming event(s); no catalog changes.`);
} else {
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Event sync updated the public catalog with ${catalog.length} upcoming event(s).`);
}
