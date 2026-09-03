import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventsList } from "@/components/events-list";
import { PageFrame } from "@/components/page-frame";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "events", dictionary.events.title, dictionary.events.description);
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return <PageFrame eyebrow={dictionary.events.eyebrow} title={dictionary.events.title} description={dictionary.events.description}><section className="section-shell page-section"><EventsList locale={locale} dictionary={dictionary} /></section></PageFrame>;
}
