"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

export type Hero3DState = "pending" | "active" | "paused" | "unavailable";
type Reason = "viewport" | "reduced-motion" | "save-data" | "no-webgl" | "hidden";

const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

/** Acquiring a context is expensive and the answer cannot change for the life of the document,
 *  so probe once and reuse the verdict on every later evaluation. */
let webglProbe: boolean | undefined;
function hasWebGL() {
  if (webglProbe === undefined) {
    const probe = document.createElement("canvas");
    webglProbe = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  }
  return webglProbe;
}

function blocker(): Reason | null {
  if (window.innerWidth < 1024) return "viewport";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced-motion";
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData === true) return "save-data";
  if (document.hidden) return "hidden";
  if (!hasWebGL()) return "no-webgl";
  return null;
}

/** Mounts the WebGL sculpture only where it is worth it: wide viewports, motion allowed,
 *  no data saver, WebGL present, page visible — and only after the page has gone idle.
 *  The static `.hero-ambient` backdrop rendered by the server is the fallback in every other case. */
export function Hero3DLoader() {
  const [state, setState] = useState<Hero3DState>("pending");
  const [reason, setReason] = useState<Reason | null>(null);
  const [mounted, setMounted] = useState(false);
  // Mount state has to be readable inside an effect that never re-runs, so it lives in a ref as well.
  const mountedRef = useRef(false);

  /** The scene reports "unavailable" when its renderer will not construct; take it back down and say why. */
  const report = useCallback((next: "active" | "paused" | "unavailable") => {
    if (next === "unavailable") {
      mountedRef.current = false;
      setMounted(false);
      setReason("no-webgl");
    }
    setState(next);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idle = 0;
    let debounce = 0;
    const cancelIdle = () => {
      // `typeof`, not `in`: the `in` operator narrows `window` to `never` in the fallback branch.
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
    const evaluate = () => {
      const blocked = blocker();
      if (blocked) {
        mountedRef.current = false;
        setMounted(false);
        setReason(blocked);
        setState("unavailable");
        return;
      }
      // Already running: there is nothing to re-probe, and re-announcing "pending" would strand the
      // attribute there, because mounting an already-mounted scene produces no further report.
      if (mountedRef.current) return;
      setReason(null);
      setState("pending");
      const start = () => {
        if (cancelled) return;
        mountedRef.current = true;
        setMounted(true);
      };
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(start, { timeout: 1500 });
      else idle = window.setTimeout(start, 200);
    };
    evaluate();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    // Resize arrives in bursts; coalesce them so one drag costs one evaluation.
    const onChange = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        cancelIdle();
        evaluate();
      }, 150);
    };
    window.addEventListener("resize", onChange);
    reduced.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      window.clearTimeout(debounce);
      cancelIdle();
      window.removeEventListener("resize", onChange);
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-hero-3d={state}
      data-hero-3d-reason={reason ?? undefined}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {mounted ? <Hero3D onState={report} /> : null}
    </div>
  );
}
