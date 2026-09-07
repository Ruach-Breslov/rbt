import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { events, formatEventDate } from "@/data/events";
import type { Dictionary, Locale } from "@/data/locales";
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
      {events.map((event, index) => (
        <MotionReveal key={event.id} delay={index * 0.07} className="event-card">
          <div className="event-card-top">
            <span className="icon-tile"><CalendarDays aria-hidden="true" /></span>
          </div>
          <h2>{event.title}</h2>
          {event.summary ? <p>{event.summary}</p> : null}
          <dl className="event-details">
            <div><dt><Clock3 aria-hidden="true" /><span className="sr-only">{dictionary.events.dateLabel}</span></dt><dd>{formatEventDate(event, locale)}</dd></div>
            {event.location ? <div><dt><MapPin aria-hidden="true" /><span className="sr-only">{dictionary.events.locationLabel}</span></dt><dd>{event.location}</dd></div> : null}
          </dl>
        </MotionReveal>
      ))}
    </div>
  );
}
