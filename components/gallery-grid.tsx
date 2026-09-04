"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useState } from "react";
import { galleryImages, galleryVideos, type GalleryImage } from "@/data/gallery";
import type { Dictionary } from "@/data/locales";
import { publicAsset } from "@/data/site";

export function GalleryGrid({ dictionary }: { dictionary: Dictionary }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : galleryImages[selectedIndex];

  function move(direction: -1 | 1) {
    setSelectedIndex((current) => current === null ? null : (current + direction + galleryImages.length) % galleryImages.length);
  }

  return (
    <>
      <div className="gallery-grid">
        {galleryImages.map((item, index) => (
          <button
            type="button"
            className={`gallery-card gallery-${item.category}`}
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            aria-label={`${dictionary.gallery.openImage}: ${dictionary.gallery.captions[item.category]}`}
          >
            <img
              src={publicAsset(item.src)}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              alt=""
            />
            <span className="gallery-card-caption">{dictionary.gallery.captions[item.category]}<Expand aria-hidden="true" /></span>
          </button>
        ))}
      </div>

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

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay gallery-overlay" />
          {selected ? <GalleryLightbox item={selected} dictionary={dictionary} onMove={move} /> : null}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function GalleryLightbox({ item, dictionary, onMove }: { item: GalleryImage; dictionary: Dictionary; onMove: (direction: -1 | 1) => void }) {
  const caption = dictionary.gallery.captions[item.category];

  return (
    <Dialog.Content className="gallery-lightbox" onKeyDown={(event) => {
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    }}>
      <Dialog.Close className="dialog-close gallery-close" aria-label={dictionary.actions.close}><X aria-hidden="true" /></Dialog.Close>
      <Dialog.Title className="sr-only">{caption}</Dialog.Title>
      <Dialog.Description className="sr-only">{dictionary.gallery.lightboxDescription}</Dialog.Description>
      <img src={publicAsset(item.src)} width={item.width} height={item.height} alt={caption} />
      <div className="gallery-lightbox-bar">
        <button type="button" onClick={() => onMove(-1)} aria-label={dictionary.gallery.previous}><ChevronLeft aria-hidden="true" /></button>
        <p>{caption}</p>
        <button type="button" onClick={() => onMove(1)} aria-label={dictionary.gallery.next}><ChevronRight aria-hidden="true" /></button>
      </div>
    </Dialog.Content>
  );
}
