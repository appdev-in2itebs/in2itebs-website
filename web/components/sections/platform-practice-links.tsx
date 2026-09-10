import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const links = [
  ["SAP", "/sap-enterprise-solutions/"],
  ["SuccessFactors", "/sap-enterprise-solutions/successfactors/"],
  ["Workday", "/workday/"],
  ["Salesforce", "/salesforce/"],
  ["Oracle", "/oracle/"],
  ["Microsoft", "/microsoft/"],
];
export function PlatformPracticeLinks() {
  return (
    <nav
      aria-label="Platform practices"
      className="grid grid-cols-2 gap-px overflow-hidden rounded-surface border border-border-subtle bg-border-subtle sm:grid-cols-3 lg:grid-cols-6"
    >
      {links.map(([name, href]) => (
        <Link
          key={name}
          href={href}
          className="group flex min-h-20 items-center justify-between gap-3 bg-surface px-5 py-4 text-base font-semibold text-foreground transition-colors hover:bg-surface-subtle hover:text-action"
        >
          {name}
          <ArrowUpRight aria-hidden size={16} className="shrink-0 text-action" />
        </Link>
      ))}
    </nav>
  );
}
