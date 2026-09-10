import { Container } from "@/components/ui/container";
import { Eyebrow, Accent } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Inner-page hero: eyebrow + large serif headline (with accent word) + subhead + CTA.
 *  Optional `media` renders a right-hand visual panel (e.g. <HeroMotif/> or a photo). */
export function PageHero({
  eyebrow,
  headline,
  accentWord,
  subhead,
  cta = true,
  media,
}: {
  eyebrow?: string;
  headline: string;
  accentWord?: string;
  subhead?: ReactNode;
  cta?: boolean;
  media?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-canvas pt-36 pb-20 md:pt-44 md:pb-28">
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-20 h-[26rem] w-[26rem] opacity-[0.12]">
        <div className="absolute inset-0 origin-center rotate-45 border-[56px] border-gold-soft" />
      </div>
      <Container className="relative">
        <div className={cn(media && "grid items-center gap-10 lg:grid-cols-2 lg:gap-16")}>
          <Reveal className="flex max-w-4xl flex-col gap-6">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-display font-display font-bold">
              {headline} {accentWord ? <Accent>{accentWord}</Accent> : null}
            </h1>
            {subhead ? (
              <p className="max-w-measure text-lg leading-relaxed text-foreground-muted md:text-xl">{subhead}</p>
            ) : null}
            {cta ? (
              <div className="pt-2">
                <Button href={site.primaryCta.href} variant="primary" withArrow>
                  {site.primaryCta.label}
                </Button>
              </div>
            ) : null}
          </Reveal>
          {media ? (
            <Reveal delay={0.12} className="hidden lg:block">
              <div className="glass-elevated aspect-[5/4] w-full rounded-feature p-2">{media}</div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
