import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { events, formatEventDate } from "@/data/events";
import type { Dictionary, Locale } from "@/data/locales";
import { RsvpDialog } from "@/components/forms/rsvp-dialog";
import { MotionReveal } from "@/components/motion-reveal";

export function EventsList({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  if (!events.length) {
    return (
      <div className="empty-state">
        <span className="icon-tile"><CalendarDays aria-hidden="true" /></span>
        <h2>{dictionary.events.emptyTitle}</h2>
        <p>{dictionary.events.emptyCopy}</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event, index) => {
        const content = dictionary.events.items[event.id];
        return (
          <MotionReveal key={event.id} delay={index * 0.07} className="event-card">
            <div className="event-card-top">
              <span className="icon-tile"><CalendarDays aria-hidden="true" /></span>
            </div>
            <h2>{content.title}</h2>
            <p>{content.summary}</p>
            <dl className="event-details">
              <div><dt><Clock3 aria-hidden="true" /><span className="sr-only">{dictionary.events.dateLabel}</span></dt><dd>{formatEventDate(event.startsAt, locale)}</dd></div>
              <div><dt><MapPin aria-hidden="true" /><span className="sr-only">{dictionary.events.locationLabel}</span></dt><dd>{content.location}</dd></div>
            </dl>
            <RsvpDialog event={event} eventTitle={content.title} locale={locale} dictionary={dictionary} />
          </MotionReveal>
        );
      })}
    </div>
  );
}
