import Link from "next/link";
import { ArrowUpRight, BookOpenText, HandHeart, MailCheck, Mic2, Sparkles, UsersRound } from "lucide-react";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { GalleryPreview } from "@/components/gallery-preview";
import { MotionReveal } from "@/components/motion-reveal";
import { SubscriptionForm } from "@/components/forms/subscription-form";
import { site } from "@/data/site";

const featureIcons = [BookOpenText, HandHeart, UsersRound, Mic2] as const;

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-artwork">
          <img
            src={site.media.heroImage}
            width={1536}
            height={1024}
            decoding="async"
            alt={`${dictionary.siteName} — ${dictionary.siteTagline}`}
          />
          <div className="hero-artwork-content">
            <p>{dictionary.home.description}</p>
            <div className="hero-artwork-actions">
              <Link href={localeHref(locale, "support")} className="button button-primary">{dictionary.actions.donate}<ArrowUpRight aria-hidden="true" /></Link>
              <Link href={localeHref(locale, "contact")} className="button button-secondary">{dictionary.actions.contactUs}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-introduction section-shell">
        <MotionReveal className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" />{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.title}</h1>
        </MotionReveal>
        <MotionReveal delay={0.1} className="hero-invitation">
          <figure className="subhero-community-photo">
            <img
              src={site.media.gatheringImage}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              alt={dictionary.gallery.captions.gathering}
            />
            <figcaption>{dictionary.gallery.captions.gathering}</figcaption>
          </figure>
          <p className="hero-description">{dictionary.home.gatheringCopy}</p>
          <div className="button-row">
            <Link href={localeHref(locale, "gallery")} className="button button-primary">{dictionary.actions.viewGallery}<ArrowUpRight aria-hidden="true" /></Link>
            <Link href={localeHref(locale, "videos")} className="button button-secondary">{dictionary.actions.watchVideos}</Link>
          </div>
        </MotionReveal>
      </section>

      <section className="features-section section-shell">
        <MotionReveal className="section-heading">
          <p className="eyebrow">{dictionary.home.featureEyebrow}</p>
          <h2>{dictionary.home.featureTitle}</h2>
          <p>{dictionary.home.featureCopy}</p>
        </MotionReveal>
        <div className="feature-grid">
          {dictionary.home.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <MotionReveal key={feature.title} delay={index * 0.06} className="feature-card">
                <span className="icon-tile"><Icon aria-hidden="true" /></span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      <section className="story-section section-shell">
        <MotionReveal className="story-photo">
          <img
            src={site.media.communityImage}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            alt={dictionary.gallery.captions.study}
          />
        </MotionReveal>
        <MotionReveal delay={0.1} className="story-copy">
          <p className="eyebrow">{dictionary.home.storyEyebrow}</p>
          <h2>{dictionary.home.storyTitle}</h2>
          {dictionary.home.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </MotionReveal>
      </section>

      <GalleryPreview locale={locale} dictionary={dictionary} />

      <section className="subscription-section">
        <div className="subscription-inner section-shell">
          <MotionReveal className="subscription-copy">
            <p className="eyebrow"><MailCheck aria-hidden="true" />{dictionary.forms.newsletter} + {dictionary.forms.eventUpdates}</p>
            <h2>{dictionary.home.subscriptionTitle}</h2>
            <p>{dictionary.home.subscriptionCopy}</p>
          </MotionReveal>
          <MotionReveal delay={0.1}><SubscriptionForm locale={locale} dictionary={dictionary} /></MotionReveal>
        </div>
      </section>
    </main>
  );
}
