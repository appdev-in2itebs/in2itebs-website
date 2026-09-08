"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/sections/case-study-card";

const AUTO_ADVANCE_MS = 6000;

/** Horizontal scroll-snap carousel of case-study cards: ~3 up on desktop, ~1.15 on
 *  mobile. Round prev/next arrows scrollBy one card; dots track the active index from
 *  scroll position. Auto-advances and loops, pausing on hover, focus-within and
 *  reduced-motion. Pure scroll/transform — no layout animation. */
export function StoriesCarousel({ items }: { items: CaseStudy[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = items.length;

  // Width of a single card step (card + gap), measured from the first two children.
  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    if (second) return second.offsetLeft - first.offsetLeft;
    return first.offsetWidth;
  }, []);

  // Derive the active index from current scroll offset.
  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    if (step <= 0) return;
    const index = Math.round(track.scrollLeft / step);
    setActive(Math.max(0, Math.min(count - 1, index)));
  }, [count, stepWidth]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const step = stepWidth();
      const clamped = Math.max(0, Math.min(count - 1, index));
      track.scrollTo({
        left: step * clamped,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [count, reduce, stepWidth],
  );

  const goPrev = useCallback(() => scrollToIndex(active - 1), [active, scrollToIndex]);
  const goNext = useCallback(() => scrollToIndex(active + 1), [active, scrollToIndex]);

  // Keep the active index in sync with scroll/resize without animating on every frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActive);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive]);

  // Auto-advance, looping back to the start. Paused on hover/focus/reduced-motion.
  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const next = current >= count - 1 ? 0 : current + 1;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, count, scrollToIndex]);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client success stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:gap-6",
          // edge breathing room so cards never kiss the container
          "-mx-1 px-1",
          // hide scrollbar (project idiom)
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {items.map((study, i) => (
          <li
            key={study.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="shrink-0 basis-[86%] snap-start sm:basis-[48%] lg:basis-[31.5%]"
          >
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>

      <div className="mt-9 flex items-center justify-between gap-6">
        {/* Pagination dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose story">
          {items.map((study, i) => {
            const isActive = i === active;
            return (
              <button
                key={study.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to story ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent",
                  isActive ? "w-7 bg-navy" : "w-2 bg-navy/20 hover:bg-navy/40",
                )}
              />
            );
          })}
        </div>

        {/* Prev / Next — hidden on mobile (swipe instead) */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={goPrev}
            disabled={active === 0}
            aria-label="Previous story"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-navy ring-1 ring-navy/15",
              "transition-[transform,background-color,color] duration-200 ease-out",
              "hover:bg-navy hover:text-white active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={active >= count - 1}
            aria-label="Next story"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-navy ring-1 ring-navy/15",
              "transition-[transform,background-color,color] duration-200 ease-out",
              "hover:bg-navy hover:text-white active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
