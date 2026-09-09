import type {ElementType, ReactNode} from "react";
/** Visible-first rendering: essential text never depends on hydration or an observer. */
export function Reveal({children, className, as = "div"}: {children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "span"}) {
  const Tag: ElementType = as;
  return <Tag className={className}>{children}</Tag>;
}
export function Stagger({children, className}: {children: ReactNode; className?: string}) {
  return <div className={className}>{children}</div>;
}
export function StaggerItem({children, className}: {children: ReactNode; className?: string}) {
  return <div className={className}>{children}</div>;
}
