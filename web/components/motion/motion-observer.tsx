"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Drives scroll-in reveals and owns the motion flags on pages that do not mount MotionControls.
 *  Anything already inside the viewport is marked "in" synchronously so above-the-fold content
 *  never flashes from visible to hidden after hydration. */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const owns = () => root.dataset.motionOwner === undefined;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const flags = () => {
      if (!owns()) return;
      root.dataset.motionReady = "true";
      root.dataset.motionPaused = String(reduced.matches || document.hidden);
    };
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const viewport = window.innerHeight;
    // Read every box first, then write: interleaving `getBoundingClientRect` with a `dataset`
    // write forces a layout per element instead of one for the batch.
    const onscreen = targets.map((el) => {
      const box = el.getBoundingClientRect();
      return box.top < viewport && box.bottom > 0;
    });
    targets.forEach((el, i) => {
      if (onscreen[i]) el.dataset.reveal = "in";
    });
    flags();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of targets) if (el.dataset.reveal !== "in") observer.observe(el);
    const safety = window.setTimeout(() => {
      const height = window.innerHeight;
      const visible = targets.map((el) => {
        const box = el.getBoundingClientRect();
        return box.top < height && box.bottom > 0;
      });
      targets.forEach((el, i) => {
        if (visible[i]) el.dataset.reveal = "in";
      });
    }, 1000);
    reduced.addEventListener("change", flags);
    document.addEventListener("visibilitychange", flags);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
      reduced.removeEventListener("change", flags);
      document.removeEventListener("visibilitychange", flags);
      if (owns()) {
        delete root.dataset.motionReady;
        delete root.dataset.motionPaused;
      }
    };
  }, [pathname]);
  return null;
}
