"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

// On-screen drift/morph easing — the house "drawer" curve (cubic-bezier(0.32,0.72,0,1)).
// Mirrored to ease-in-out for seamless, breathing infinite loops.
const DRIFT_EASE = [0.32, 0.72, 0, 1] as const;

type Blob = {
  /** Radial-gradient fill — navy dominant, accent/light used sparingly + low opacity. */
  fill: string;
  /** Resting position + size as Tailwind utilities. */
  box: string;
  /** Looping transform keyframes (GPU-only: translate + scale). */
  animate: { x: number[]; y: number[]; scale: number[] };
  transition: Transition;
};

const BLOBS: Blob[] = [
  {
    // Deep navy core — anchors the composition, ~60% of the visual weight.
    fill: "radial-gradient(circle at 50% 50%, rgba(18,30,59,0.35) 0%, rgba(18,30,59,0) 70%)",
    box: "left-[-12%] top-[-18%] h-[40rem] w-[40rem]",
    animate: { x: [0, 36, 0], y: [0, 24, 0], scale: [1, 1.08, 1] },
    transition: { duration: 26, ease: DRIFT_EASE, repeat: Infinity, repeatType: "mirror" },
  },
  {
    // Accent blue — small + restrained; an accent, never a primary fill.
    fill: "radial-gradient(circle at 50% 50%, rgba(63,117,163,0.22) 0%, rgba(63,117,163,0) 72%)",
    box: "right-[-8%] top-[6%] h-[32rem] w-[32rem]",
    animate: { x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.12, 1] },
    transition: { duration: 22, ease: DRIFT_EASE, repeat: Infinity, repeatType: "mirror", delay: 1.5 },
  },
  {
    // Soft blue-light wash low on the canvas — gentle editorial glow.
    fill: "radial-gradient(circle at 50% 50%, rgba(148,184,208,0.18) 0%, rgba(148,184,208,0) 70%)",
    box: "bottom-[-22%] left-[28%] h-[44rem] w-[44rem]",
    animate: { x: [0, 28, 0], y: [0, -22, 0], scale: [1, 1.06, 1] },
    transition: { duration: 30, ease: DRIFT_EASE, repeat: Infinity, repeatType: "mirror", delay: 3 },
  },
];

// Very faint node-dot texture — pale-blue dots on a fine grid, masked to fade at the edges.
const DOT_SIZE = "26px 26px";
const DOT_TEXTURE = "radial-gradient(rgba(163,203,230,0.6) 1px, transparent 1.4px)";
const EDGE_FADE =
  "radial-gradient(ellipse 80% 80% at 50% 50%, #000 35%, transparent 100%)";

/**
 * Decorative animated aurora backdrop for the navy hero.
 * Absolutely positioned, aria-hidden and non-interactive — drops INSIDE a
 * `bg-navy` parent (it contributes no background of its own). Composes 3 soft
 * radial "aurora" blobs that slowly drift + scale on GPU-only transforms, over a
 * very faint node-dot texture. Honours prefers-reduced-motion (renders static).
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {BLOBS.map((blob, i) =>
        reduce ? (
          <div
            key={i}
            className={cn("absolute rounded-full", blob.box)}
            style={{ backgroundImage: blob.fill, willChange: "transform" }}
          />
        ) : (
          <motion.div
            key={i}
            className={cn("absolute rounded-full", blob.box)}
            style={{ backgroundImage: blob.fill, willChange: "transform" }}
            animate={blob.animate}
            transition={blob.transition}
          />
        ),
      )}

      {/* Faint node-dot texture, edge-masked so it never reaches a hard border. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: DOT_TEXTURE,
          backgroundSize: DOT_SIZE,
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      />
    </div>
  );
}
