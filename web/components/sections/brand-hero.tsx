"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SapPartnerBadge } from "@/components/ui/sap-partner-badge";
import { cn } from "@/lib/utils";

/** Milliseconds each slide holds before the next one fades in. */
const INTERVAL = 4500;
/** Milliseconds the leaving clip stays mounted under the arriving one (the CSS fade is 700 ms). */
const FADE = 800;

type Slide = {
  id: string;
  label: string;
  heading: string[];
  body: string;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
  video: { src: string; narrowSrc: string; poster: string };
};

const slides: Slide[] = [
  {
    id: "brand",
    label: "Enterprise transformation, under control",
    heading: ["Change with confidence.", "Run without compromise."],
    body: "In2IT EBS connects enterprise platforms, digital engineering and managed operations through one accountable transformation partner.",
    cta: { href: "/contact/", label: "Start a conversation" },
    secondary: { href: "/what-we-do/", label: "Explore our services" },
    video: {
      src: "/video/hero-entry-1080.mp4",
      narrowSrc: "/video/hero-entry-720.mp4",
      poster: "/video/hero-entry-poster.jpg",
    },
  },
  {
    id: "sap",
    label: "SAP enterprise solutions",
    heading: ["Transform your enterprise with SAP."],
    body: "From S/4HANA and cloud migration to SuccessFactors, analytics and managed services. Connect the platform to the way your business operates.",
    cta: { href: "/sap-enterprise-solutions/", label: "Explore SAP solutions" },
    secondary: { href: "/contact/", label: "Talk to us" },
    video: {
      src: "/video/hero-sap-1080.mp4",
      narrowSrc: "/video/hero-sap-720.mp4",
      poster: "/video/hero-sap-poster.jpg",
    },
  },
  {
    id: "applications",
    label: "Application development & maintenance",
    heading: ["Applications built around your business."],
    body: "Design, build, integrate and maintain business applications, with engineering and ongoing support connected from the start.",
    cta: { href: "/digital-data-ai/application-engineering/", label: "Explore application services" },
    secondary: { href: "/contact/", label: "Talk to us" },
    // The source clip is 720p, so phones and desktops share one file.
    video: {
      src: "/video/hero-applications-720.mp4",
      narrowSrc: "/video/hero-applications-720.mp4",
      poster: "/video/hero-applications-poster.jpg",
    },
  },
  {
    id: "platforms",
    label: "People, finance & customer platforms",
    heading: ["Connect people, processes and performance."],
    body: "Explore SuccessFactors, Workday, Salesforce, Oracle and Microsoft practices for the systems your teams rely on every day.",
    cta: { href: "/platform-services/", label: "Explore our platform practices" },
    secondary: { href: "/contact/", label: "Talk to us" },
    video: {
      src: "/video/hero-platforms-1080.mp4",
      narrowSrc: "/video/hero-platforms-720.mp4",
      poster: "/video/hero-platforms-poster.jpg",
    },
  },
  {
    id: "data-ai",
    label: "Cloud, data & AI",
    heading: ["Turn enterprise data into everyday decisions."],
    body: "Bring data, analytics, integration and AI into the flow of work, with architecture and delivery grounded in your business priorities.",
    cta: { href: "/digital-data-ai/", label: "Explore data & AI services" },
    secondary: { href: "/contact/", label: "Talk to us" },
    video: {
      src: "/video/hero-data-ai-1080.mp4",
      narrowSrc: "/video/hero-data-ai-720.mp4",
      poster: "/video/hero-data-ai-poster.jpg",
    },
  },
];

/**
 * Full-screen brand hero that is itself a five-slide carousel on ambient footage (2026-09-15
 * 15:28): the brand copy on the entry clip, then the four service slides that used to follow the
 * hero in their own section, each on its own clip. It advances every 4.5 s with no controls of any
 * kind (owner's call), and holds only while the hero is offscreen, a tab is hidden, the motion
 * flag is set, or keyboard focus is inside it; reduced motion holds the first slide on its poster.
 *
 * Layers, bottom to top: the clips (only the active and the next one are mounted; the next one
 * plays hidden so it is buffered when its turn comes, and the leaving one stays under the arriving
 * one for the 700 ms cross-fade), a 20% black veil, the ambient gradient, then the copy in the
 * `.on-video` palette (the former dark theme). All five text blocks stay in the document, stacked
 * in one grid cell, so the h1 is always present; inactive ones are hidden from assistive
 * technology and inert.
 */
export function BrandHero() {
  const [slide, setSlide] = useState<{ active: number; leaving: number | null }>({ active: 0, leaving: null });
  const [rotating, setRotating] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setRotating(!reduced.matches);
    apply();
    reduced.addEventListener("change", apply);
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => {
      reduced.removeEventListener("change", apply);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!rotating || offscreen || focused) return;
    const timer = setInterval(() => {
      if (document.hidden || document.documentElement.dataset.motionPaused === "true") return;
      setSlide((current) => ({ active: (current.active + 1) % slides.length, leaving: current.active }));
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [rotating, offscreen, focused]);

  useEffect(() => {
    if (slide.leaving === null) return;
    const timer = setTimeout(() => setSlide((current) => ({ ...current, leaving: null })), FADE);
    return () => clearTimeout(timer);
  }, [slide.leaving, slide.active]);

  const { active, leaving } = slide;
  const next = (active + 1) % slides.length;
  const mounted = [leaving, active, next].filter(
    (index, at, all) => index !== null && all.indexOf(index) === at,
  ) as number[];

  return (
    <section
      ref={root}
      data-brand-hero
      aria-labelledby="home-hero-title"
      aria-roledescription="carousel"
      aria-live="off"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false);
      }}
      className="on-video relative flex min-h-[100svh] overflow-hidden bg-canvas pt-36 text-foreground md:pt-40"
    >
      <div aria-hidden className="absolute inset-0">
        {mounted.map((index) => {
          const item = slides[index];
          return (
            <div
              key={item.id}
              data-hero-video={item.id}
              data-active={index === active ? "true" : undefined}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                index === active ? "z-[2] opacity-100" : index === leaving ? "z-[1] opacity-100" : "z-0 opacity-0",
              )}
            >
              <AmbientVideo src={item.video.src} narrowSrc={item.video.narrowSrc} poster={item.video.poster} />
            </div>
          );
        })}
      </div>
      <div aria-hidden className="video-veil pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0" />
      <Container className="relative z-10 flex flex-1 flex-col justify-end gap-10 py-8 md:py-10">
        <div className="grid max-w-[52rem]">
          {slides.map((item, index) => {
            const isActive = index === active;
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div
                key={item.id}
                data-hero-slide={index}
                data-active={isActive ? "true" : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {index === 0 && <SapPartnerBadge />}
                <p className={cn("text-sm font-semibold text-gold", index === 0 && "mt-8")}>{item.label}</p>
                <Heading
                  id={index === 0 ? "home-hero-title" : undefined}
                  className="mt-5 max-w-[20ch] text-[clamp(2.75rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
                >
                  {item.heading.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Heading>
                <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-foreground-muted md:text-xl">
                  {item.body}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href={item.cta.href} withArrow>
                    {item.cta.label}
                  </Button>
                  <Link
                    href={item.secondary.href}
                    className="inline-flex min-h-12 items-center gap-3 rounded-full px-4 text-sm font-semibold text-gold hover:bg-glass/70"
                  >
                    {item.secondary.label} <ArrowRight size={17} aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* The Discover cue sits bottom-left under the copy, clear of the fixed quick-contact button
            in the bottom-right corner. Below `sm` the row itself ends under that button, so the cue
            is hidden there: the page scroll is the affordance on a phone. */}
        <div className="flex flex-wrap items-center justify-start gap-4">
          <Link
            href="#capabilities"
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
