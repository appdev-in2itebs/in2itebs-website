import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Glass card: frosted surface, hairline top highlight, gold glow on hover.
 *  `bezel` adds an inner gold hairline through `.glass-card-bezel`, which appends the ring to the
 *  glass shadow list of every state; a Tailwind `ring-*` utility would replace that shadow instead
 *  and silence the rest and hover elevation. `bezel` is ignored for `tone="navy"`, which renders
 *  the inverse brand plate with its own gold border and no glass treatment. */
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
    <div className={cn("glass-card rounded-feature p-7 text-foreground", bezel && "glass-card-bezel", className)}>
      {children}
    </div>
  );
}
