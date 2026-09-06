import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinematicGallery } from "@/components/cinematic-gallery";
import { featuredGalleryImages } from "@/data/gallery";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";

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
      <CinematicGallery closeLabel={dictionary.actions.close} galleryDictionary={dictionary.gallery} images={featuredGalleryImages} variant="preview" />
    </section>
  );
}
