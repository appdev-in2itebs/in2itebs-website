import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Double-bezel card: an outer shell holding an inner core with concentric radii
 *  and an inset top highlight — feels like a machined plate, not a flat div. */
export function Card({
  children,
  className,
  bezel = true,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  bezel?: boolean;
  tone?: "light" | "white" | "navy";
}) {
  const core =
    tone === "navy"
      ? "theme-on-brand bg-brand text-on-brand"
      : tone === "white"
        ? "bg-white text-navy"
        : "bg-off-white text-navy";
  if (!bezel) {
    return <div className={cn("rounded-xl2 p-7 shadow-soft", core, className)}>{children}</div>;
  }
  return (
    <div className="rounded-xl3 bg-navy/[0.04] p-1.5 ring-1 ring-navy/5">
      <div className={cn("h-full rounded-xl2 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]", core, className)}>
        {children}
      </div>
    </div>
  );
}
