import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredGalleryImages } from "@/data/gallery";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { publicAsset } from "@/data/site";

export function GalleryPreview({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section className="gallery-preview-section section-shell">
      <div className="gallery-preview-heading">
        <div>
          <p className="eyebrow">{dictionary.home.galleryEyebrow}</p>
          <h2>{dictionary.home.galleryTitle}</h2>
          <p>{dictionary.home.galleryCopy}</p>
        </div>
        <Link className="button button-secondary" href={localeHref(locale, "gallery")}>
          {dictionary.actions.viewGallery}<ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="gallery-preview-grid">
        {featuredGalleryImages.map((item) => (
          <Link key={item.id} href={localeHref(locale, "gallery")} className={`gallery-preview-item gallery-${item.category}`}>
            <img
              src={publicAsset(item.src)}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              alt={dictionary.gallery.captions[item.category]}
            />
            <span>{dictionary.gallery.captions[item.category]}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
