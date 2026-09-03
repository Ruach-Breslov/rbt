import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/forms/contact-form";
import { PageFrame } from "@/components/page-frame";
import { getDictionary, isLocale } from "@/data/locales";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(locale, "contact", dictionary.contact.title, dictionary.contact.description);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <PageFrame eyebrow={dictionary.contact.eyebrow} title={dictionary.contact.title} description={dictionary.contact.description}>
      <section className="contact-layout section-shell page-section"><ContactForm locale={locale} dictionary={dictionary} /><ContactDetails dictionary={dictionary} /></section>
      <section className="faq-section section-shell">
        <p className="eyebrow">FAQ</p><h2>{dictionary.contact.faqTitle}</h2>
        <div className="faq-grid">{dictionary.contact.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>
    </PageFrame>
  );
}
