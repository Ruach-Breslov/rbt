import { CinematicGallery } from "@/components/cinematic-gallery";
import { galleryImages, galleryVideos } from "@/data/gallery";
import type { Dictionary } from "@/data/locales";
import { publicAsset } from "@/data/site";

export function GalleryGrid({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <CinematicGallery closeLabel={dictionary.actions.close} galleryDictionary={dictionary.gallery} images={galleryImages} />

      <section className="gallery-video-section" aria-labelledby="community-clips-title">
        <div className="section-heading">
          <p className="eyebrow">{dictionary.gallery.clipsEyebrow}</p>
          <h2 id="community-clips-title">{dictionary.gallery.clipsTitle}</h2>
          <p>{dictionary.gallery.clipsCopy}</p>
        </div>
        <div className="gallery-video-grid">
          {galleryVideos.map((item) => (
            <figure className="gallery-video-card" key={item.id}>
              <video
                controls
                playsInline
                preload="metadata"
                poster={publicAsset(item.poster)}
                aria-label={dictionary.gallery.captions.video}
              >
                <source src={publicAsset(item.src)} type="video/mp4" />
              </video>
              <figcaption>{dictionary.gallery.captions.video}</figcaption>
            </figure>
          ))}
        </div>
      </section>

    </>
  );
}
