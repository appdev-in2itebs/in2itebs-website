import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MotionControls } from "@/components/sections/motion-controls";
import { SapPartnerBadge } from "@/components/ui/sap-partner-badge";

/**
 * Full-screen brand hero on ambient footage (2026-09-15). Layers, bottom to top: the clip, a brand
 * tint, a canvas-coloured wash that stays near-opaque under the copy column and clears towards the
 * right, the ambient gradient, then the copy. The four alphas are the `--video-*` tokens in
 * globals.css; the contrast spec pins the copy column against the worst-case frame.
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
      <Container className="relative z-10 flex flex-1 flex-col justify-center py-8 md:py-10">
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
        <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
          <MotionControls />
          <Link
            href="#featured-services"
            aria-label="Scroll to featured services"
            className="inline-flex min-h-12 items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted hover:text-gold"
          >
            Discover <ArrowDown size={18} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
