import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Letter-spaced caps category label (e.g. "AT A GLANCE"). */
export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("label-caps inline-block", onDark ? "text-brand-muted" : "text-action", className)}>
      {children}
    </span>
  );
}

/** Newsreader italic accent word inside a headline. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="accent">{children}</em>;
}

/** Display / heading text in Newsreader. Pass an accent via <Accent> in children. */
export function Headline({
  children,
  level = 2,
  className,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const sizes = { 1: "text-display", 2: "text-h2", 3: "text-h3" } as const;
  const Tag = `h${level}` as unknown as "h1";
  return <Tag className={cn("font-serif font-bold", sizes[level], className)}>{children}</Tag>;
}

export function Lead({ children, className, onDark }: { children: ReactNode; className?: string; onDark?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[70ch] text-lg leading-relaxed md:text-xl",
        onDark ? "text-brand-muted" : "text-foreground-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Eyebrow + headline + optional lead, composed. */
export function SectionHeading({
  eyebrow,
  children,
  lead,
  className,
  onDark,
  level = 2,
}: {
  eyebrow?: string;
  children: ReactNode;
  lead?: ReactNode;
  className?: string;
  onDark?: boolean;
  level?: 1 | 2 | 3;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <Headline level={level} className={onDark ? "text-on-brand" : "text-foreground"}>
        {children}
      </Headline>
      {lead ? <Lead onDark={onDark}>{lead}</Lead> : null}
    </div>
  );
}
