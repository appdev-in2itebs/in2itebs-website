"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const slides = [
  {
    label: "SAP enterprise solutions",
    heading: "Transform your enterprise with SAP.",
    body: "From S/4HANA and cloud migration to SuccessFactors, analytics and managed services. Connect the platform to the way your business operates.",
    href: "/sap-enterprise-solutions/",
    cta: "Explore SAP solutions",
    image: "/stock/automobiles.jpg",
  },
  {
    label: "Application development & maintenance",
    heading: "Applications built around your business.",
    body: "Design, build, integrate and maintain business applications, with engineering and ongoing support connected from the start.",
    href: "/digital-data-ai/application-engineering/",
    cta: "Explore application services",
    image: "/stock/professional-services.jpg",
  },
  {
    label: "People, finance & customer platforms",
    heading: "Connect people, processes and performance.",
    body: "Explore SuccessFactors, Workday, Salesforce, Oracle and Microsoft practices for the systems your teams rely on every day.",
    href: "/platform-services/",
    cta: "Explore our platform practices",
    image: "/stock/about-office.jpg",
  },
  {
    label: "Cloud, data & AI",
    heading: "Turn enterprise data into everyday decisions.",
    body: "Bring data, analytics, integration and AI into the flow of work, with architecture and delivery grounded in your business priorities.",
    href: "/digital-data-ai/",
    cta: "Explore data & AI services",
    image: "/stock/hero-abstract.jpg",
  },
];
export function ServiceHero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!reduced.matches);
    const stop = () => {
      if (reduced.matches) setPlaying(false);
    };
    reduced.addEventListener("change", stop);
    const observer = new IntersectionObserver(([entry]) => setSuspended(!entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => {
      reduced.removeEventListener("change", stop);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!playing || hovered || suspended) return;
    const timer = setInterval(() => {
      if (!document.hidden && document.documentElement.dataset.motionPaused !== "true")
        setActive((index) => (index + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [playing, hovered, suspended]);
  const slide = slides[active];
  function change(index: number) {
    setPlaying(false);
    setActive((index + slides.length) % slides.length);
  }
  return (
    <section
      id="featured-services"
      ref={root}
      aria-label="Featured services"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPlaying(false);
      }}
      className="theme-on-brand relative flex min-h-[calc(100svh-7.75rem)] scroll-mt-[7.75rem] overflow-hidden bg-brand text-on-brand md:min-h-[calc(100svh-8.75rem)] md:scroll-mt-[8.75rem]"
    >
      <div className="absolute inset-0">
        {slides.map((item, index) => {
          const mounted =
            index === active ||
            index === (active + 1) % slides.length ||
            index === (active - 1 + slides.length) % slides.length;
          return mounted ? (
            <Image
              key={item.image}
              src={item.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
            />
          ) : null;
        })}
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand via-brand/75 to-brand/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-brand/30" />
      <Container className="relative z-10 flex min-h-[calc(100svh-7.75rem)] flex-1 flex-col justify-end pb-24 pt-16 md:min-h-[calc(100svh-8.75rem)] md:pt-20">
        <div aria-live={playing ? "off" : "polite"} aria-atomic="true" className="max-w-3xl pb-10 md:pb-14">
          <p className="text-sm font-semibold text-gold-on-brand">{slide.label}</p>
          <h2 className="heading-plain mt-4 max-w-[17ch] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-on-brand">
            {slide.heading}
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-on-brand/80 md:text-xl">{slide.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button href={slide.href} variant="on-dark" withArrow>
              {slide.cta}
            </Button>
            <Link
              href="/contact/"
              className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-gold-on-brand hover:underline"
            >
              Talk to us <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-on-brand/30 pt-5">
          <div className="flex flex-wrap gap-1" aria-label="Choose a featured service">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.label}
                onClick={() => change(index)}
                aria-label={`Show ${item.label}`}
                aria-current={active === index ? "true" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm transition-colors ${active === index ? "bg-on-brand text-brand" : "text-on-brand/75 hover:bg-on-brand/10 hover:text-on-brand"}`}
              >
                <span className="tabular-nums">0{index + 1}</span>
                <span className="hidden sm:inline">
                  {["SAP", "Applications", "Enterprise platforms", "Data & AI"][index]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => change(active - 1)}
              aria-label="Previous service"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-brand/50 text-on-brand hover:border-gold-on-brand hover:text-gold-on-brand"
            >
              <ArrowLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause service carousel" : "Play service carousel"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-brand/50 text-on-brand hover:border-gold-on-brand hover:text-gold-on-brand"
            >
              {playing ? <Pause size={17} aria-hidden /> : <Play size={17} aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => change(active + 1)}
              aria-label="Next service"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-brand/50 text-on-brand hover:border-gold-on-brand hover:text-gold-on-brand"
            >
              <ArrowRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
