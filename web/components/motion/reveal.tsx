import { Children, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Visible-first rendering: essential text never depends on hydration or an observer.
 *  The `reveal` hook only hides content after `html[data-motion-ready]` is set and
 *  never while motion is paused or reduced (see globals.css). */
export function Reveal({
  children,
  className,
  delay,
  as = "div",
}: {
  children: ReactNode;
  /** Seconds, matching the call sites; becomes the `--reveal-delay` transition delay. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const Tag: ElementType = as;
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = { children: ReactNode; className?: string; index?: number };

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("stagger", className)}>
      {Children.map(children, (child, index) =>
        isValidElement<StaggerItemProps>(child) && child.type === StaggerItem ? cloneElement(child, { index }) : child,
      )}
    </div>
  );
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
