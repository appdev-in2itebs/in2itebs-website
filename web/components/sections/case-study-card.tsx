import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";

/** A single case-study card — industry + SAP-path chips, client (or NDA label),
 *  featured solution, a clamped scenario and a context-aware link. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const href = study.named ? `/case-studies/${study.slug}/` : "/contact/";
  const linkLabel = study.named ? "Read the case study" : "Request full story under NDA";
  const clientName = study.named ? study.client : "Confidential — under NDA";

  return (
    <article className="group flex h-full flex-col rounded-xl2 bg-white p-7 shadow-soft ring-1 ring-navy/5 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-off-white px-3 py-1 text-xs font-medium text-navy/70">{study.industry}</span>
        <span className="rounded-full bg-blue-pale/40 px-3 py-1 text-xs font-semibold text-blue-accent">
          {study.sapPath}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-h3 font-bold text-navy">{clientName}</h3>
      <p className="mt-1.5 text-sm font-semibold text-blue-accent">{study.featuredSolution}</p>

      <p className="mt-3 line-clamp-2 flex-1 text-[0.9rem] leading-relaxed text-grey-muted">{study.scenario}</p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors duration-200 hover:text-blue-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent/50"
      >
        {linkLabel}
        <ArrowRight
          size={15}
          strokeWidth={1.75}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
