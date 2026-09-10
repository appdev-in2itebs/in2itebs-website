import { cn } from "@/lib/utils";

/** SAP Gold Partner credibility badge — composed from the official SAP mark
 *  (public SAP logo) + the partner tier, with a gold accent bar to signal the
 *  Gold level. The white chip keeps the SAP mark legible on light and dark.
 *  (SAP's official PartnerEdge badge file can be dropped in to replace this.) */
export function SapPartnerBadge({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <span
      role="img"
      aria-label="SAP Gold Partner"
      className={cn(
        "glass-gold inline-flex items-center gap-2.5 rounded-full px-3 py-1.5",
        onDark ? "border-gold-on-brand/40" : "shadow-glass",
        className,
      )}
    >
      <span className="flex items-center rounded bg-[#F8FAFD] px-1.5 py-1 ring-1 ring-brand/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/partners/sap.svg" alt="" aria-hidden className="h-4 w-auto" />
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-3.5 w-[3px] rounded-full bg-gold" />
        <span
          className={cn(
            "text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.12em]",
            onDark ? "text-gold-on-brand" : "text-gold",
          )}
        >
          Gold Partner
        </span>
      </span>
    </span>
  );
}
