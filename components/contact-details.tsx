import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/data/locales";
import { site } from "@/data/site";

export function ContactDetails({ dictionary }: { dictionary: Dictionary }) {
  return (
    <aside className="contact-sidebar">
      <section className="info-card">
        <h2>{dictionary.contact.detailsTitle}</h2>
        <ul className="contact-list">
          <li><Mail aria-hidden="true" /><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
          <li><Phone aria-hidden="true" /><a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a></li>
          <li><MapPin aria-hidden="true" /><span>{site.contact.address}</span></li>
        </ul>
      </section>
      <section className="info-card"><Clock3 aria-hidden="true" /><h2>{dictionary.contact.hoursTitle}</h2><p>{dictionary.contact.hours}</p></section>
      <section className="info-card accent-card"><h2>{dictionary.contact.responseTitle}</h2><p>{dictionary.contact.responseCopy}</p></section>
    </aside>
  );
}
