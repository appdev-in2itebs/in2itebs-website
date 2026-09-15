"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type State = "pending" | "poster" | "playing" | "paused";

/**
 * Decorative background footage: muted, looping, inline, never with controls.
 *
 * It reports what it is doing on `data-ambient-video` so tests and styles can react:
 * - `poster`: `prefers-reduced-motion` or data saver — the clip is never fetched or played.
 * - `paused`: the page pause control (`html[data-motion-paused="true"]`), a hidden tab or the
 *   section being offscreen. The clip is fetched on the first run request, so a section far
 *   below the fold costs nothing until it is scrolled to.
 * - `playing`: running.
 *
 * The source is chosen once on the client (`narrowSrc` under 768px), which also keeps the server
 * markup free of any media request.
 */
export function AmbientVideo({
  src,
  narrowSrc,
  poster,
  className,
}: {
  src: string;
  narrowSrc?: string;
  poster: string;
  className?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<State>("pending");
  const [gated, setGated] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let loaded = false;
    let onScreen = false;
    let stopRunning: (() => void) | null = null;

    const sync = () => {
      const shouldRun = onScreen && root.dataset.motionPaused !== "true" && !document.hidden;
      if (!shouldRun) {
        element.pause();
        setState("paused");
        return;
      }
      if (!loaded) {
        loaded = true;
        const narrow = narrowSrc && matchMedia("(max-width: 767px)").matches;
        element.src = narrow ? narrowSrc : src;
      }
      element.muted = true;
      element
        .play()
        .then(() => setState("playing"))
        .catch(() => setState("paused"));
    };
    const startRunning = () => {
      const visibility = new IntersectionObserver((entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        sync();
      });
      visibility.observe(wrapper.current ?? element);
      const attributes = new MutationObserver(sync);
      attributes.observe(root, { attributes: true, attributeFilter: ["data-motion-paused"] });
      document.addEventListener("visibilitychange", sync);
      stopRunning = () => {
        visibility.disconnect();
        attributes.disconnect();
        document.removeEventListener("visibilitychange", sync);
        element.pause();
        stopRunning = null;
      };
    };
    // The gate is decided before any observer is wired, so a reduced-motion visitor never sees a
    // play request, and a change of preference tears the observers down again.
    const evaluate = () => {
      if (reduced.matches || connection?.saveData === true) {
        stopRunning?.();
        setGated(true);
        setState("poster");
        return;
      }
      setGated(false);
      if (!stopRunning) startRunning();
    };
    evaluate();
    reduced.addEventListener("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      stopRunning?.();
    };
  }, [src, narrowSrc]);

  return (
    <div
      ref={wrapper}
      aria-hidden
      data-ambient-video={state}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <video
        ref={video}
        muted
        loop
        playsInline
        poster={poster}
        preload={gated ? "none" : "metadata"}
        className="ambient-video h-full w-full object-cover"
      />
    </div>
  );
}
