import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column {
  title: string;
  badge?: string;
  values: string[];
}

/** Two-column decision table (e.g. RISE vs GROW). Clean, high-contrast,
 *  rounded, on white — one row per aspect with left/right values. */
export function ComparisonTable({
  aspects,
  left,
  right,
}: {
  aspects: string[];
  left: Column;
  right: Column;
}) {
  return (
    <div role="region" aria-label={`${left.title} and ${right.title} comparison, scroll horizontally if needed`} tabIndex={0} className="overflow-x-auto rounded-surface bg-surface shadow-soft ring-1 ring-border-subtle">
      <table className="min-w-[38rem] w-full border-collapse text-left">
        <thead>
          <tr className="theme-on-brand bg-brand text-on-brand">
            <th scope="col" className="px-5 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-label text-blue-light md:px-6">
              <span className="sr-only">Aspect</span>
            </th>
            <ColumnHeader column={left} />
            <ColumnHeader column={right} />
          </tr>
        </thead>
        <tbody>
          {aspects.map((aspect, i) => (
            <tr key={aspect} className={cn("align-top", i % 2 === 1 && "bg-off-white")}>
              <th
                scope="row"
                className="border-t border-navy/10 px-5 py-4 font-sans text-sm font-semibold text-navy md:px-6"
              >
                {aspect}
              </th>
              <td className="border-t border-navy/10 px-5 py-4 text-[0.9rem] leading-relaxed text-grey-muted md:px-6">
                {left.values[i]}
              </td>
              <td className="border-t border-l border-navy/10 px-5 py-4 text-[0.9rem] leading-relaxed text-grey-muted md:px-6">
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
    <th scope="col" className="px-5 py-4 font-serif text-h3 font-bold md:px-6">
      <span className="flex flex-wrap items-center gap-2.5">
        {column.title}
        {column.badge ? <Pill>{column.badge}</Pill> : null}
      </span>
    </th>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal text-blue-pale">
      {children}
    </span>
  );
}
