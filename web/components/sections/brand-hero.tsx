import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SapPartnerBadge } from "@/components/ui/sap-partner-badge";

/**
 * Full-screen brand hero on ambient footage (2026-09-15). Layers, bottom to top: the clip, a brand
 * tint, a light veil, the ambient gradient, then the copy block sitting bottom-left directly on
 * the veil (the owner removed the wash behind the copy at 14:54; the veil alpha `--video-wash-base`
 * is the only readability knob left, and the copy is not contrast-guarded against a dark frame).
 * There is no visible pause control (removed 2026-09-15 pm): MotionObserver pauses the clip under
 * reduced motion and hidden tabs.
 */
export function BrandHero() {
  return (
    <section
      data-brand-hero
      aria-labelledby="home-hero-title"
      className="relative flex min-h-[100svh] overflow-hidden bg-canvas pt-36 text-foreground md:pt-40"
    >
      <AmbientVideo
        src="/video/hero-team-1080.mp4"
        narrowSrc="/video/hero-team-720.mp4"
        poster="/video/hero-team-poster.jpg"
      />
      <div aria-hidden className="video-tint pointer-events-none absolute inset-0" />
      <div aria-hidden className="video-wash pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0" />
      <Container className="relative z-10 flex flex-1 flex-col justify-end gap-10 py-8 md:py-10">
        <div className="max-w-[52rem]">
          <SapPartnerBadge />
          <p className="mt-8 text-sm font-semibold text-gold">Enterprise transformation, under control</p>
          <h1
            id="home-hero-title"
            className="mt-5 max-w-[20ch] text-[clamp(2.75rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
          >
            <span className="block">Change with confidence.</span>
            <span className="block">Run without compromise.</span>
          </h1>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-foreground-muted md:text-xl">
            In2IT EBS connects enterprise platforms, digital engineering and managed operations through one accountable
            transformation partner.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact/" withArrow>
              Start a conversation
            </Button>
            <Link
              href="#featured-services"
              className="inline-flex min-h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-gold hover:bg-glass/70"
            >
              Explore our services <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
        {/* The Discover cue sits bottom-left under the copy block, clear of the fixed quick-contact
            button in the bottom-right corner. Below `sm` the row itself ends under that button, so
            the cue is hidden there: the page scroll is the affordance on a phone. */}
        <div className="flex flex-wrap items-center justify-start gap-4">
          <Link
            href="#featured-services"
            aria-label="Scroll to featured services"
            className="glass-pill hidden min-h-12 items-center gap-3 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted hover:text-gold sm:inline-flex"
          >
            Discover <ArrowDown size={18} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
