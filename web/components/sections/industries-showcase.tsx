"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Industry = {
  slug: string;
  name: string;
  headline: string;
  accentWord?: string;
  subhead: string;
  image?: string;
};

/** Renders a headline, highlighting the single accentWord in blue-light (case-insensitive, first match). */
function HeadlineWithAccent({ headline, accentWord }: { headline: string; accentWord?: string }) {
  if (!accentWord) return <>{headline}</>;
  const idx = headline.toLowerCase().indexOf(accentWord.toLowerCase());
  if (idx === -1) return <>{headline}</>;
  const before = headline.slice(0, idx);
  const match = headline.slice(idx, idx + accentWord.length);
  const after = headline.slice(idx + accentWord.length);
  return (
    <>
      {before}
      <em className="font-serif italic text-blue-light">{match}</em>
      {after}
    </>
  );
}

/** Accely-style interactive industries showcase: vertical tablist (desktop) / chip row (mobile)
 *  driving a large cross-fading media panel. Navy dominates; accent blue for links only. */
export function IndustriesShowcase({ items }: { items: Industry[] }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!items?.length) return null;

  const active = items[Math.min(selected, items.length - 1)];

  function focusTab(index: number) {
    const next = (index + items.length) % items.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setSelected(index);
        break;
      default:
        break;
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:items-stretch md:gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
      {/* Mobile: horizontal scroll-snap chip row */}
      <div
        role="tablist"
        aria-label="Industries"
        aria-orientation="horizontal"
        className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const isActive = i === selected;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`industry-chip-${item.slug}`}
              aria-selected={isActive}
              aria-controls={`industry-panel-${active.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                "shrink-0 snap-start whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent",
                isActive
                  ? "bg-navy font-semibold text-white"
                  : "text-grey-muted hover:bg-blue-pale/20",
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Desktop: vertical tablist with roving tabindex */}
      <div
        role="tablist"
        aria-label="Industries"
        aria-orientation="vertical"
        className="hidden flex-col md:flex"
      >
        {items.map((item, i) => {
          const isActive = i === selected;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`industry-tab-${item.slug}`}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              aria-selected={isActive}
              aria-controls={`industry-panel-${active.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                "border-l-2 py-3.5 pl-5 pr-3 text-left font-serif text-lg leading-snug transition-[transform,background-color,color,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent focus-visible:ring-inset",
                isActive
                  ? "border-blue-accent font-semibold text-navy"
                  : "border-transparent text-grey-muted hover:bg-blue-pale/20 hover:text-navy",
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Media panel */}
      <div
        role="tabpanel"
        id={`industry-panel-${active.slug}`}
        aria-labelledby={`industry-tab-${active.slug}`}
        className="theme-on-brand relative min-h-[30rem] w-full overflow-hidden rounded-xl3 bg-brand shadow-soft ring-1 ring-border-subtle md:aspect-[16/10]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            className="absolute inset-0"
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {active.image ? (
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="(min-width: 1024px) 60vw, (min-width: 768px) 55vw, 100vw"
                className="object-cover"
                priority={selected === 0}
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-brand"
              />
            )}
            {/* Navy gradient overlay for legibility */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand via-brand/90 to-brand/50"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlaid text — stagger-revealed on switch */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            className="absolute inset-0 flex flex-col justify-end gap-3 p-7 md:p-10"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={
              reduce
                ? undefined
                : {
                    hidden: {},
                    show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
                  }
            }
          >
            {[
              <h3
                key="headline"
                className="max-w-xl font-serif text-h3 font-bold leading-[1.05] text-white md:text-h2"
              >
                <HeadlineWithAccent headline={active.headline} accentWord={active.accentWord} />
              </h3>,
              <p key="subhead" className="max-w-md text-base leading-relaxed text-blue-light">
                {active.subhead}
              </p>,
              <Link
                key="link"
                href={`/industries/${active.slug}/`}
                className="group mt-1 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent"
              >
                <span>View industry</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </span>
              </Link>,
            ].map((child, i) =>
              reduce ? (
                <div key={i}>{child}</div>
              ) : (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: EASE_OUT },
                    },
                  }}
                >
                  {child}
                </motion.div>
              ),
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
