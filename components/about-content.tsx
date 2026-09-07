import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BookOpenText, HandHeart, Mic2, UsersRound } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { site } from "@/data/site";

const featureIcons = [BookOpenText, HandHeart, UsersRound, Mic2] as const;

export function AboutContent({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <div className="about-content">
      <section className="about-mission section-shell">
        <MotionReveal className="about-mission-photo">
          <img src={site.media.gatheringImage} width={1600} height={1200} alt={dictionary.gallery.captions.gathering} />
        </MotionReveal>
        <MotionReveal delay={0.1} className="about-mission-copy">
          <p className="eyebrow">{dictionary.about.missionEyebrow}</p>
          <h2>{dictionary.about.missionTitle}</h2>
          <p>{dictionary.about.mission}</p>
        </MotionReveal>
      </section>

      <section className="about-story section-shell">
        <MotionReveal className="about-story-copy">
          <p className="eyebrow">{dictionary.about.storyEyebrow}</p>
          <h2>{dictionary.about.storyTitle}</h2>
          {dictionary.about.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </MotionReveal>
        <MotionReveal delay={0.1} className="leadership-card">
          <span>{dictionary.about.leadershipEyebrow}</span>
          <h2>{site.organization.leader.name}</h2>
          <strong>{site.organization.leader.role}</strong>
          <p>{dictionary.about.leadershipCopy}</p>
        </MotionReveal>
      </section>

      <section className="about-work section-shell">
        <MotionReveal className="section-heading">
          <p className="eyebrow">{dictionary.about.workEyebrow}</p>
          <h2>{dictionary.about.workTitle}</h2>
          <p>{dictionary.about.workCopy}</p>
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

      <section className="legal-identity section-shell" aria-labelledby="legal-identity-title">
        <MotionReveal className="legal-identity-intro">
          <p className="eyebrow"><BadgeCheck aria-hidden="true" />{dictionary.about.legalEyebrow}</p>
          <h2 id="legal-identity-title">{dictionary.about.legalTitle}</h2>
          <p>{dictionary.about.legalCopy}</p>
          <a href={site.organization.irsSearchUrl} target="_blank" rel="noopener noreferrer">
            {dictionary.about.verifyStatus}<ArrowUpRight aria-hidden="true" />
          </a>
        </MotionReveal>
        <MotionReveal delay={0.1} className="legal-identity-card">
          <dl>
            <div><dt>{dictionary.about.legalNameLabel}</dt><dd>{site.organization.legalName}</dd></div>
            <div><dt>{dictionary.about.einLabel}</dt><dd>{site.organization.ein}</dd></div>
            <div><dt>{dictionary.about.classificationLabel}</dt><dd>{dictionary.about.classification}</dd></div>
            <div><dt>{dictionary.about.addressLabel}</dt><dd>{site.contact.address}</dd></div>
          </dl>
        </MotionReveal>
      </section>

      <section className="about-cta section-shell">
        <MotionReveal>
          <h2>{dictionary.about.ctaTitle}</h2>
          <p>{dictionary.about.ctaCopy}</p>
          <div className="button-row">
            <Link href={localeHref(locale, "support")} className="button button-light">{dictionary.actions.donate}<ArrowUpRight aria-hidden="true" /></Link>
            <Link href={localeHref(locale, "contact")} className="button button-secondary">{dictionary.actions.contactUs}</Link>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
