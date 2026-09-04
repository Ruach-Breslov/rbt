import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageFrame } from "@/components/page-frame";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "gallery", dictionary.gallery.title, dictionary.gallery.description);
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <PageFrame eyebrow={dictionary.gallery.eyebrow} title={dictionary.gallery.title} description={dictionary.gallery.description}>
      <section className="section-shell page-section"><GalleryGrid dictionary={dictionary} /></section>
    </PageFrame>
  );
}
