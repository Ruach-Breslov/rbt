# Event calendar handoff

Ruach Breslov's event page is designed to be managed through one dedicated
Google Calendar. After the one-time connection, an approved editor only needs
to create, edit, repeat, cancel, or delete an event in Google Calendar. The
website checks that calendar hourly and republishes only when the public event
catalog changes.

## One-time owner setup

These settings can only be completed from Google Calendar in a desktop browser.

1. Next to **Other calendars**, choose **Create new calendar**.
2. Name it **Ruach Breslov Events**. Do not use a person's primary calendar.
3. In **Settings and sharing → Access permissions for events**, enable
   **Make available to public** and select the option that exposes full event
   details. Anything entered on this calendar should be safe to publish.
4. Under **Share with specific people or groups**, add each approved editor with
   **Make changes to events** access. Do not grant public edit access.
5. Under **Integrate calendar**, copy **Public address in iCal format**. It must
   be an HTTPS Google URL ending in `/public/basic.ics`; never use the secret
   address from a private calendar.
6. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and
   create `GOOGLE_CALENDAR_ICAL_URL` with that public iCal address.
7. Run **Sync Google Calendar events** once from the repository's Actions tab.

## Everyday editing

- **Event title** becomes the website card title.
- **Date, time, and repeat settings** control upcoming occurrences. Time is
  displayed in the event's calendar time zone.
- **Location** becomes the location line on the card.
- **Description** becomes a concise summary; the site limits it to 320
  characters so cards remain readable.
- Cancelling or deleting an event removes its future occurrence on the next
  successful hourly sync.
- Events that already ended are removed automatically. The site publishes at
  most the next 60 occurrences within the coming 370 days.

The current secure RSVP form is intentionally separate. It validates capacity
against the production database, so calendar events do not display an RSVP
button until the owner also confirms that event's capacity and RSVP policy.
This prevents a newly published event from offering a form that cannot safely
accept the reservation.

If the Google feed is temporarily unavailable or malformed, synchronization
fails without changing the last successfully published event catalog.
