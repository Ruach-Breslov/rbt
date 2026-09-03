import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "privacy", dictionary.privacy.title, dictionary.privacy.intro);
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <main className="legal-main section-shell">
      <p className="eyebrow">{dictionary.footer.privacy}</p><h1>{dictionary.privacy.title}</h1><p className="legal-intro">{dictionary.privacy.intro}</p>
      <div className="legal-sections">{dictionary.privacy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.copy}</p></section>)}</div>
    </main>
  );
}
