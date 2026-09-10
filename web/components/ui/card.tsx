import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Glass card: frosted surface, hairline top highlight, gold glow on hover.
 *  `bezel` adds an inner gold ring; `tone="navy"` keeps the inverse brand surface. */
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
  if (tone === "navy") {
    return (
      <div
        className={cn(
          "theme-on-brand rounded-feature border border-gold-on-brand/20 bg-brand p-7 text-on-brand shadow-glass",
          className,
        )}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "glass-card rounded-feature p-7 text-foreground",
        bezel && "ring-1 ring-inset ring-gold-soft/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
