"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import type { Dictionary } from "@/data/locales";
import { publicAsset } from "@/data/site";

type CinematicGalleryProps = {
  closeLabel: string;
  galleryDictionary: Dictionary["gallery"];
  images: GalleryImage[];
  variant?: "full" | "preview";
};

export function CinematicGallery({ closeLabel, galleryDictionary, images, variant = "full" }: CinematicGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : images[selectedIndex];

  function move(direction: -1 | 1) {
    setSelectedIndex((current) => current === null ? null : (current + direction + images.length) % images.length);
  }

  return (
    <>
      <div className={variant === "preview" ? "gallery-preview-grid" : "gallery-grid"} data-gallery-variant={variant}>
        {images.map((item, index) => (
          <button
            type="button"
            className={variant === "preview" ? `gallery-preview-item gallery-${item.category}` : `gallery-card gallery-${item.category}`}
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            aria-label={`${galleryDictionary.openImage}: ${galleryDictionary.captions[item.category]}`}
          >
            <img
              src={publicAsset(item.src)}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              alt=""
            />
            <span className="gallery-card-caption">
              {galleryDictionary.captions[item.category]}
              <Expand aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay gallery-overlay" />
          {selected ? <GalleryLightbox item={selected} closeLabel={closeLabel} galleryDictionary={galleryDictionary} onMove={move} /> : null}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function GalleryLightbox({ item, closeLabel, galleryDictionary, onMove }: { item: GalleryImage; closeLabel: string; galleryDictionary: Dictionary["gallery"]; onMove: (direction: -1 | 1) => void }) {
  const caption = galleryDictionary.captions[item.category];

  return (
    <Dialog.Content className="gallery-lightbox" onKeyDown={(event) => {
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    }}>
      <Dialog.Close className="dialog-close gallery-close" aria-label={closeLabel}><X aria-hidden="true" /></Dialog.Close>
      <Dialog.Title className="sr-only">{caption}</Dialog.Title>
      <Dialog.Description className="sr-only">{galleryDictionary.lightboxDescription}</Dialog.Description>
      <img src={publicAsset(item.src)} width={item.width} height={item.height} alt={caption} />
      <div className="gallery-lightbox-bar">
        <button type="button" onClick={() => onMove(-1)} aria-label={galleryDictionary.previous}><ChevronLeft aria-hidden="true" /></button>
        <p>{caption}</p>
        <button type="button" onClick={() => onMove(1)} aria-label={galleryDictionary.next}><ChevronRight aria-hidden="true" /></button>
      </div>
    </Dialog.Content>
  );
}
