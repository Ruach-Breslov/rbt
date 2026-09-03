import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Globe2, MailCheck, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import { localeHref, type Dictionary, type Locale } from "@/data/locales";
import { MotionReveal } from "@/components/motion-reveal";
import { SubscriptionForm } from "@/components/forms/subscription-form";
import { WebGpuHero } from "@/components/webgpu/webgpu-surface";
import { site } from "@/data/site";

const featureIcons = [CalendarCheck, PlayCircle, MailCheck, Globe2] as const;

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <main className="home-main">
      <section className="hero section-shell">
        <MotionReveal className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" />{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.title}</h1>
          <p className="hero-description">{dictionary.home.description}</p>
          <div className="button-row">
            <Link href={localeHref(locale, "events")} className="button button-primary">{dictionary.actions.exploreEvents}<ArrowUpRight aria-hidden="true" /></Link>
            <Link href={localeHref(locale, "contact")} className="button button-secondary">{dictionary.actions.contactUs}</Link>
          </div>
          <div className="trust-line"><ShieldCheck aria-hidden="true" /><span>{dictionary.system.staticBoundary}</span></div>
        </MotionReveal>

        <MotionReveal delay={0.12} className="hero-visual">
          <WebGpuHero imageUrl={site.media.heroImage} />
          <div className="signal-card signal-card-primary">
            <span className="signal-dot" />
            <small>{dictionary.system.liveFoundation}</small>
            <strong>{dictionary.system.fastFocusedGlobal}</strong>
          </div>
          <div className="signal-orbit"><span /><span /><span /></div>
          <div className="signal-card signal-card-secondary"><Globe2 aria-hidden="true" /><strong>4</strong><small>{dictionary.system.languagesReady}</small></div>
          <div className="signal-card signal-card-tertiary"><PlayCircle aria-hidden="true" /><strong>4K + HDR</strong><small>{dictionary.system.videoReady}</small></div>
        </MotionReveal>
      </section>

      <section className="features-section section-shell">
        <MotionReveal className="section-heading">
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
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
