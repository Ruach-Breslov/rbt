import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutContent } from "@/components/about-content";
import { PageFrame } from "@/components/page-frame";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "about", dictionary.about.title, dictionary.about.description);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <PageFrame eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} description={dictionary.about.description}>
      <AboutContent locale={locale} dictionary={dictionary} />
    </PageFrame>
  );
}
