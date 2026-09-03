import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { VideoLibrary } from "@/components/video-library";
import { getDictionary, isLocale } from "@/data/locales";
import { getVideos } from "@/data/videos";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "videos", dictionary.videos.title, dictionary.videos.description);
}

export default async function VideosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return <PageFrame eyebrow={dictionary.videos.eyebrow} title={dictionary.videos.title} description={dictionary.videos.description}><section className="section-shell page-section"><VideoLibrary videos={getVideos(dictionary)} dictionary={dictionary} /></section></PageFrame>;
}
