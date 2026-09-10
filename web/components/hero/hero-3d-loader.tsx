"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type Hero3DState = "pending" | "active" | "paused" | "unavailable";
type Reason = "viewport" | "reduced-motion" | "save-data" | "no-webgl" | "hidden";

const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

function blocker(): Reason | null {
  if (window.innerWidth < 1024) return "viewport";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced-motion";
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData === true) return "save-data";
  if (document.hidden) return "hidden";
  const probe = document.createElement("canvas");
  if (!(probe.getContext("webgl2") ?? probe.getContext("webgl"))) return "no-webgl";
  return null;
}

/** Mounts the WebGL sculpture only where it is worth it: wide viewports, motion allowed,
 *  no data saver, WebGL present, page visible — and only after the page has gone idle.
 *  The static `.hero-ambient` backdrop rendered by the server is the fallback in every other case. */
export function Hero3DLoader() {
  const [state, setState] = useState<Hero3DState>("pending");
  const [reason, setReason] = useState<Reason | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idle = 0;
    const evaluate = () => {
      const blocked = blocker();
      if (blocked) {
        setMounted(false);
        setReason(blocked);
        setState("unavailable");
        return;
      }
      setReason(null);
      if (!mounted) setState("pending");
      const start = () => {
        if (!cancelled) setMounted(true);
      };
      // `typeof`, not `in`: the `in` operator narrows `window` to `never` in the fallback branch.
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(start, { timeout: 1500 });
      else idle = window.setTimeout(start, 200);
    };
    evaluate();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      evaluate();
    };
    window.addEventListener("resize", onChange);
    reduced.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener("resize", onChange);
      reduced.removeEventListener("change", onChange);
    };
    // `mounted` is intentionally read, not tracked: re-running on mount changes would re-probe needlessly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      data-hero-3d={state}
      data-hero-3d-reason={reason ?? undefined}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {mounted ? <Hero3D onState={setState} /> : null}
    </div>
  );
}
