"use client";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * A horizontal scroll-snap track that advances on its own (2026-09-16): every `interval` it scrolls
 * to the next snap child, and back to the start after the last one. It holds while the pointer or
 * keyboard focus is inside the enclosing section, while the track is mostly offscreen, while the tab
 * is hidden or the motion flag is set, and it never moves under `prefers-reduced-motion`. Native
 * scrolling (touch, trackpad, keyboard) keeps working throughout; the scrollbar is hidden because
 * the snap points are the visible affordance. Pass `trackRef` to drive it from outside (arrows).
 * A track whose cards carry no links must be `focusable` so keyboard users can reach and scroll
 * it (axe `scrollable-region-focusable`); focus inside it holds the rotation like a hover does.
 */
export function AutoTrack({
  children,
  label,
  interval = 4500,
  className,
  trackRef,
  focusable = false,
}: {
  children: ReactNode;
  label: string;
  interval?: number;
  className?: string;
  trackRef?: RefObject<HTMLUListElement | null>;
  focusable?: boolean;
}) {
  const own = useRef<HTMLUListElement>(null);
  const ref = trackRef ?? own;

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const section = track.closest("section") ?? track;
    let held = false;
    let offscreen = true;
    let timer: number | undefined;

    const advance = () => {
      if (document.hidden || document.documentElement.dataset.motionPaused === "true") return;
      const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const items = Array.from(track.children) as HTMLElement[];
      const next = items.find((item) => item.offsetLeft - padding > track.scrollLeft + 1);
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      track.scrollTo({ left: !next || atEnd ? 0 : next.offsetLeft - padding, behavior: "smooth" });
    };
    const sync = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (reduced.matches || held || offscreen) return;
      timer = window.setInterval(advance, interval);
    };
    const hold = () => {
      held = true;
      sync();
    };
    const release = (event: Event) => {
      if (event.type === "focusout" && section.contains((event as FocusEvent).relatedTarget as Node)) return;
      held = false;
      sync();
    };
    const visibility = new IntersectionObserver(
      ([entry]) => {
        offscreen = !entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    visibility.observe(track);
    section.addEventListener("pointerenter", hold);
    section.addEventListener("pointerleave", release);
    section.addEventListener("focusin", hold);
    section.addEventListener("focusout", release);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      window.clearInterval(timer);
      visibility.disconnect();
      section.removeEventListener("pointerenter", hold);
      section.removeEventListener("pointerleave", release);
      section.removeEventListener("focusin", hold);
      section.removeEventListener("focusout", release);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, interval]);

  return (
    <ul
      ref={ref}
      data-auto-track
      aria-label={label}
      tabIndex={focusable ? 0 : undefined}
      className={cn(
        "auto-track relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-4 md:-mx-8 md:scroll-pl-8 md:px-8",
        className,
      )}
    >
      {children}
    </ul>
  );
}
