import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { SupportPanel } from "@/components/support-panel";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "support", dictionary.support.title, dictionary.support.description);
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return <PageFrame eyebrow={dictionary.support.eyebrow} title={dictionary.support.title} description={dictionary.support.description}><section className="section-shell page-section"><SupportPanel locale={locale} dictionary={dictionary} /></section></PageFrame>;
}
