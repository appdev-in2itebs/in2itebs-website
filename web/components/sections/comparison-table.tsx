import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column {
  title: string;
  badge?: string;
  values: string[];
}

/** Two-column decision table (e.g. RISE vs GROW). A rounded glass scroller that keeps its own
 *  horizontal overflow at narrow widths; the header row is an on-brand navy band and each body row
 *  carries one aspect with its left/right values. */
export function ComparisonTable({ aspects, left, right }: { aspects: string[]; left: Column; right: Column }) {
  return (
    <div
      role="region"
      aria-label={`${left.title} and ${right.title} comparison, scroll horizontally if needed`}
      tabIndex={0}
      className="glass overflow-x-auto rounded-feature"
    >
      <table className="min-w-[38rem] w-full border-collapse text-left">
        <thead>
          <tr className="theme-on-brand bg-brand text-on-brand">
            <th
              scope="col"
              className="px-5 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-label text-gold-on-brand md:px-6"
            >
              <span className="sr-only">Aspect</span>
            </th>
            <ColumnHeader column={left} />
            <ColumnHeader column={right} />
          </tr>
        </thead>
        <tbody>
          {aspects.map((aspect, i) => (
            <tr key={aspect} className={cn("align-top", i % 2 === 1 && "bg-surface-subtle/60")}>
              <th
                scope="row"
                className="border-t border-border-subtle px-5 py-4 font-sans text-sm font-semibold text-foreground md:px-6"
              >
                {aspect}
              </th>
              <td className="border-t border-border-subtle px-5 py-4 text-[0.9rem] leading-relaxed text-foreground-muted md:px-6">
                {left.values[i]}
              </td>
              <td className="border-t border-l border-border-subtle px-5 py-4 text-[0.9rem] leading-relaxed text-foreground-muted md:px-6">
                {right.values[i]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ColumnHeader({ column }: { column: Column }) {
  return (
    <th scope="col" className="px-5 py-4 text-h3 font-bold md:px-6">
      <span className="flex flex-wrap items-center gap-2.5">
        {column.title}
        {column.badge ? <Pill>{column.badge}</Pill> : null}
      </span>
    </th>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="glass-gold rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal">
      {children}
    </span>
  );
}
