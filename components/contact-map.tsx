import { ExternalLink, MapPin, Navigation } from "lucide-react";
import type { Dictionary } from "@/data/locales";
import { site } from "@/data/site";

export function ContactMap({ dictionary }: { dictionary: Dictionary }) {
  const destination = encodeURIComponent(site.contact.address);
  const mapUrl = `https://www.google.com/maps?q=${destination}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving&dir_action=navigate`;
  const placeUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;

  return (
    <section className="contact-map-section section-shell" aria-labelledby="contact-map-title">
      <div className="contact-map-card">
        <div className="contact-map-copy">
          <p className="eyebrow">{dictionary.contact.mapEyebrow}</p>
          <h2 id="contact-map-title">{dictionary.contact.mapTitle}</h2>
          <p>{dictionary.contact.mapCopy}</p>
          <address><MapPin aria-hidden="true" /><span>{site.contact.address}</span></address>
          <div className="contact-map-actions">
            <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">
              <Navigation aria-hidden="true" />{dictionary.contact.directionsCta}
            </a>
            <a className="contact-map-link" href={placeUrl} target="_blank" rel="noreferrer">
              {dictionary.contact.openMapCta}<ExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="contact-map-frame">
          <iframe
            src={mapUrl}
            title={dictionary.contact.mapFrameTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
