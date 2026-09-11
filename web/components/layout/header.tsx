"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/content/nav";
import type { NavItem } from "@/content/types";
import { Logo } from "@/components/ui/logo";
import { RegionSwitcher } from "./region-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLAnchorElement | null>>({});
  // Hover-open menus: the trigger wrapper is stretched to the header row so the vertical path into
  // the panel never leaves it, and a diagonal path that does leave it gets a short grace timer;
  // re-entering the trigger or its panel cancels the close.
  const closeTimer = useRef<number | null>(null);
  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setExpanded(null), 160);
  };
  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );
  const close = () => {
    setExpanded(null);
    drawer.current?.close();
    setMobileOpen(false);
  };
  useEffect(() => {
    setExpanded(null);
    drawer.current?.close();
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setExpanded(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    drawer.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1280px)");
    const resize = () => {
      if (mq.matches) {
        drawer.current?.close();
        setMobileOpen(false);
      }
    };
    mq.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      mq.removeEventListener("change", resize);
    };
  }, [mobileOpen]);
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const update = () => {
      el.dataset.scrolled = String(window.scrollY > 20);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header
      ref={header}
      // The scrolled alpha lives in globals.css, not here: as a utility it would also override the
      // `@supports not (backdrop-filter)` fallback and lower it from 0.96 to 0.90 while scrolled.
      className="glass-elevated fixed inset-x-0 top-0 z-40 border-x-0 border-t-0 border-b border-border-subtle text-foreground transition-[background-color,box-shadow,border-color] duration-300 data-[scrolled=true]:border-gold-soft/60 data-[scrolled=true]:shadow-glass-hover"
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          triggers.current[expanded]?.focus();
          setExpanded(null);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setExpanded(null);
      }}
    >
      <div className="border-b border-border-subtle/70 bg-transparent">
        <div className="container flex min-h-11 items-center justify-between gap-3 text-xs sm:text-sm">
          <a
            href="mailto:info@in2itebs.com"
            className="inline-flex min-h-11 items-center font-medium text-action hover:underline"
          >
            info@in2itebs.com
          </a>
          <Link
            href="/contact/"
            className="glass-gold inline-flex min-h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold sm:text-sm"
          >
            Talk to us <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
      <div className="container relative flex h-20 items-center justify-between gap-3 md:h-24">
        <Link href="/" aria-label="In2IT EBS home" className="shrink-0">
          <Logo priority asLink={false} variant="navy" className="theme-logo-light h-9 w-auto sm:h-11" />
          <Logo priority asLink={false} variant="light-blue" className="theme-logo-dark h-9 w-auto sm:h-11" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 self-stretch xl:flex">
          {primaryNav.map((item, index) => {
            const id = `desktop-nav-${index}`;
            const active = pathname === item.href || pathname.startsWith(item.href);
            return (
              <div
                key={item.href}
                // Stretched to the full header row so the wrapper's box touches the panel below it:
                // a pointer travelling straight down never leaves the wrapper's subtree.
                className="flex items-center self-stretch"
                onMouseEnter={() => {
                  if (!item.children) return;
                  cancelClose();
                  setExpanded(item.href);
                }}
                onMouseLeave={() => item.children && scheduleClose()}
              >
                <Link
                  ref={(el) => {
                    if (item.children) triggers.current[item.href] = el;
                  }}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? expanded === item.href : undefined}
                  aria-controls={item.children ? id : undefined}
                  onFocus={() => setExpanded(item.children ? item.href : null)}
                  onKeyDown={(event) => {
                    if (!item.children || event.key !== "ArrowDown") return;
                    event.preventDefault();
                    setExpanded(item.href);
                    requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${id} a[href]`)?.focus());
                  }}
                  className={cn(
                    "nav-link inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold transition-colors hover:text-gold",
                    active && "text-gold",
                  )}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      aria-hidden
                      size={15}
                      className={`transition-transform ${expanded === item.href ? "rotate-180" : ""}`}
                    />
                  ) : null}
                </Link>
                {item.children && (
                  <>
                    <div
                      id={id}
                      hidden={expanded !== item.href}
                      // The panel spans the full viewport width and can sit over busy photography or a
                      // dark industry tile; 0.78 elevated glass lets that read through in the light
                      // theme. 0.92 is the lowest alpha whose composite pairs clear 4.5:1 in both
                      // themes (tests/browser/theme-contrast.spec.ts).
                      className="glass-elevated absolute inset-x-0 top-full max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-b-feature border-t-0 p-7 [--glass-alpha-elevated:0.92]"
                    >
                      <div className={item.label === "Services" ? "grid grid-cols-4 gap-7" : "flex flex-wrap gap-5"}>
                        {item.children.map((child) => (
                          <div key={child.href}>
                            <Link
                              onClick={close}
                              href={child.href}
                              className="inline-flex min-h-11 items-center text-base font-semibold text-foreground hover:text-gold"
                            >
                              {child.label}
                            </Link>
                            {child.children && (
                              <ul className="mt-2 space-y-1">
                                {child.children.map((practice) => (
                                  <li key={practice.href}>
                                    <Link
                                      onClick={close}
                                      href={practice.href}
                                      className="inline-flex min-h-10 items-center text-sm text-foreground-muted hover:text-gold"
                                    >
                                      {practice.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden xl:block">
            <RegionSwitcher />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button
            ref={opener}
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control hover:bg-surface-subtle xl:hidden"
          >
            <Menu size={24} aria-hidden />
          </button>
        </div>
      </div>
      <dialog
        ref={drawer}
        id="mobile-navigation"
        aria-labelledby="mobile-menu-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href],button:not([disabled]),select:not([disabled]),input:not([disabled]),summary,[tabindex="0"]',
            ),
          ).filter((el) => el.getClientRects().length > 0);
          const first = items[0],
            last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => {
          setMobileOpen(false);
          if (opener.current?.getClientRects().length) opener.current.focus();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-dvh w-screen max-w-none overflow-y-auto bg-canvas p-5 text-foreground backdrop:bg-brand/60"
      >
        <div className="mb-5 flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 id="mobile-menu-title" className="heading-plain text-xl font-semibold">
            Explore In2IT EBS
          </h2>
          <button
            autoFocus
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control hover:bg-surface-subtle"
          >
            <X size={24} aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile">
          <MobileLinks items={primaryNav} onNavigate={close} />
        </nav>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-5">
          <RegionSwitcher />
          <ThemeToggle />
          <Link href="/contact/" onClick={close} className="inline-flex min-h-11 items-center text-action underline">
            Start a conversation
          </Link>
        </div>
      </dialog>
    </header>
  );
}
function MobileLinks({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href}>
          {item.children ? (
            <details className="border-b border-border-subtle py-1">
              <summary className="min-h-12 cursor-pointer py-3 text-base font-semibold">{item.label}</summary>
              <div className="pb-3 pl-4">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-action"
                >
                  View {item.label}
                </Link>
                <MobileLinks items={item.children} onNavigate={onNavigate} />
              </div>
            </details>
          ) : (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center text-sm font-medium hover:text-action"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
