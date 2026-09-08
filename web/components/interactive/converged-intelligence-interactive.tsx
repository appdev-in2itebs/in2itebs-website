"use client";

import { Cpu, Database, Sparkles, Layers, Users, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_MOVE = [0.32, 0.72, 0, 1] as const;

type Element = {
  id: string;
  label: string;
  Icon: LucideIcon;
  contribution: string;
};

const elements: Element[] = [
  {
    id: "technology",
    label: "Technology",
    Icon: Cpu,
    contribution: "SAP, Salesforce and Workday — the core platforms that run the enterprise.",
  },
  {
    id: "data",
    label: "Data",
    Icon: Database,
    contribution: "Clean, governed, migration-ready data — the foundation everything builds on.",
  },
  {
    id: "ai",
    label: "AI",
    Icon: Sparkles,
    contribution: "Joule, GenAI and applied ML embedded where work actually happens.",
  },
  {
    id: "platforms",
    label: "Platforms",
    Icon: Layers,
    contribution: "BTP and clean-core extensions that keep the core stable and upgrade-ready.",
  },
  {
    id: "human",
    label: "Human expertise",
    Icon: Users,
    contribution: "300+ consultants and 1,000+ combined years turning capability into outcomes.",
  },
];

// --- Orbit geometry (desktop) -------------------------------------------------
// A 560×440 viewBox. Core sits low-centre; the five nodes fan out in an arc above
// it so connectors radiate up and outward like spokes from a hub.
const VB_W = 560;
const VB_H = 440;
const CORE = { x: VB_W / 2, y: 340 };
const RADIUS = 250;
// Angles measured from vertical, spread across a 180° fan (−90°…+90°).
const ANGLES = [-90, -45, 0, 45, 90];

const nodePositions = ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CORE.x + RADIUS * Math.sin(rad),
    y: CORE.y - RADIUS * Math.cos(rad),
  };
});

export function ConvergedIntelligenceInteractive() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(elements[0].id);
  const gradientId = useId();

  const active = elements.find((e) => e.id === activeId) ?? elements[0];

  return (
    <Section tone="navy" className="relative overflow-hidden">
      {/* faint rotated frame echo — decorative, matches the static version's tone */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 h-[30rem] w-[30rem] opacity-[0.05]"
      >
        <div className="absolute inset-0 origin-center rotate-45 border-[64px] border-blue-light" />
      </div>

      <Container>
        <motion.div
          className="mb-14 max-w-3xl"
          initial={false}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <Eyebrow onDark>The In2IT EBS difference</Eyebrow>
          <h2 className="mt-5 text-display font-serif font-bold leading-[1.02] text-white">
            Why <Accent>converged</Accent> intelligence?
          </h2>
          <p className="mt-6 max-w-measure text-base leading-relaxed text-blue-light md:text-lg">
            Five elements, fused into one operating model. Explore each force to see what it brings
            to the value chain.
          </p>
        </motion.div>

        {/* ---------------- Desktop: orbit + SVG connectors ---------------- */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12">
          <div className="relative">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="h-auto w-full"
              role="presentation"
              aria-hidden
            >
              <defs>
                <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3F75A3" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#121E3B" stopOpacity="0.9" />
                </radialGradient>
              </defs>

              {/* connector lines from each node to the core */}
              {nodePositions.map((pos, i) => {
                const el = elements[i];
                const isActive = el.id === activeId;
                const len = Math.hypot(pos.x - CORE.x, pos.y - CORE.y);
                return (
                  <motion.line
                    key={el.id}
                    x1={pos.x}
                    y1={pos.y}
                    x2={CORE.x}
                    y2={CORE.y}
                    stroke={isActive ? "#94B8D0" : "#94B8D0"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeLinecap="round"
                    strokeDasharray={len}
                    initial={false}
                    animate={
                      reduce
                        ? { opacity: isActive ? 0.85 : 0.18, strokeDashoffset: 0 }
                        : {
                            opacity: isActive ? 0.9 : 0.18,
                            strokeDashoffset: isActive ? [len, 0] : 0,
                          }
                    }
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.7, ease: EASE_MOVE }
                    }
                  />
                );
              })}

              {/* core node */}
              <g>
                <circle cx={CORE.x} cy={CORE.y} r={58} fill={`url(#${gradientId})`} />
                <circle
                  cx={CORE.x}
                  cy={CORE.y}
                  r={58}
                  fill="none"
                  stroke="#94B8D0"
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />
              </g>
              <text
                x={CORE.x}
                y={CORE.y - 6}
                textAnchor="middle"
                className="fill-white font-serif"
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                Converged
              </text>
              <text
                x={CORE.x}
                y={CORE.y + 16}
                textAnchor="middle"
                className="fill-blue-light font-serif"
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                Intelligence
              </text>
            </svg>

            {/* node buttons positioned over the SVG via percentage coordinates */}
            {nodePositions.map((pos, i) => {
              const el = elements[i];
              const isActive = el.id === activeId;
              const Icon = el.Icon;
              return (
                <button
                  key={el.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${el.label}: ${el.contribution}`}
                  onClick={() => setActiveId(el.id)}
                  onMouseEnter={() => setActiveId(el.id)}
                  onFocus={() => setActiveId(el.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none"
                  style={{
                    left: `${(pos.x / VB_W) * 100}%`,
                    top: `${(pos.y / VB_H) * 100}%`,
                  }}
                >
                  <motion.span
                    initial={false}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }
                    }
                    className={cn(
                      "flex w-32 flex-col items-center gap-2 rounded-xl2 px-4 py-4 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ring-1 transition-[background-color,box-shadow] duration-200 ease-out active:scale-[0.97]",
                      isActive
                        ? "bg-white/[0.08] ring-2 ring-blue-accent"
                        : "bg-white/[0.04] ring-white/10 group-hover:bg-white/[0.06] group-focus-visible:ring-2 group-focus-visible:ring-blue-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ease-out",
                        isActive ? "bg-blue-accent/25 text-blue-pale" : "bg-blue-light/15 text-blue-light",
                      )}
                    >
                      <Icon size={20} strokeWidth={1.25} />
                    </span>
                    <span className="font-serif text-sm font-semibold leading-tight text-white">
                      {el.label}
                    </span>
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* descriptor panel */}
          <DescriptorPanel active={active} reduce={!!reduce} />
        </div>

        {/* ---------------- Mobile / tablet: selectable rows ---------------- */}
        <div className="lg:hidden">
          <p className="mb-6 text-center font-serif text-xl font-semibold text-white">
            Converged <span className="text-blue-light">Intelligence</span>
          </p>
          <ul className="flex flex-col gap-3" role="list">
            {elements.map((el) => {
              const isActive = el.id === activeId;
              const Icon = el.Icon;
              return (
                <li key={el.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(el.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl2 px-4 py-4 text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ring-1 transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent",
                      isActive
                        ? "bg-white/[0.08] ring-2 ring-blue-accent"
                        : "bg-white/[0.04] ring-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ease-out",
                        isActive
                          ? "bg-blue-accent/25 text-blue-pale"
                          : "bg-blue-light/15 text-blue-light",
                      )}
                    >
                      <Icon size={20} strokeWidth={1.25} />
                    </span>
                    <span className="font-serif text-base font-semibold text-white">{el.label}</span>
                  </button>
                  {isActive ? (
                    <motion.p
                      key={el.id}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
                      className="px-4 pb-1 pt-3 text-sm leading-relaxed text-blue-light"
                    >
                      {el.contribution}
                    </motion.p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* closing line */}
        <motion.div
          className="mt-16"
          initial={false}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        >
          <div aria-hidden className="mb-8 h-px w-24 bg-sand/40" />
          <p className="font-serif text-2xl font-bold leading-snug text-white md:text-3xl">
            Five forces. One operating model. <Accent>Value</Accent> at every point of the value chain.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

function DescriptorPanel({ active, reduce }: { active: Element; reduce: boolean }) {
  const Icon = active.Icon;
  return (
    <div
      aria-live="polite"
      className="rounded-xl3 bg-white/[0.04] p-1.5 ring-1 ring-white/10"
    >
      <div className="h-full rounded-xl2 bg-brand p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <motion.div
          key={active.id}
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }}
          className="flex flex-col gap-4"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-accent/25 text-blue-pale">
            <Icon size={22} strokeWidth={1.25} />
          </span>
          <span className="label-caps text-blue-light">Contribution</span>
          <h3 className="font-serif text-h3 font-semibold text-white">{active.label}</h3>
          <p className="text-base leading-relaxed text-blue-light">{active.contribution}</p>
        </motion.div>
      </div>
    </div>
  );
}
