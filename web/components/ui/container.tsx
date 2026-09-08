import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container", className)}>{children}</div>;
}

type Tone = "white" | "light" | "navy";

const toneClass: Record<Tone, string> = {
  white: "bg-canvas text-foreground",
  light: "bg-surface-subtle text-foreground",
  navy: "theme-on-brand bg-brand text-on-brand",
};

/** Section with macro vertical rhythm (py-24+) and a tone. */
export function Section({
  children,
  tone = "white",
  className,
  as: As = "section",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <As id={id} className={cn(toneClass[tone], "py-20 md:py-28", className)}>
      {children}
    </As>
  );
}
