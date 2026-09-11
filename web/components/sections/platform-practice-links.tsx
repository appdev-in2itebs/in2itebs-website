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
      className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
    >
      {links.map(([name, href]) => (
        <Link
          key={name}
          href={href}
          className="glass-card group flex min-h-20 min-w-0 items-center justify-between gap-3 rounded-surface px-5 py-4 text-base font-semibold text-foreground transition-colors [overflow-wrap:anywhere] hover:text-gold"
        >
          {name}
          <ArrowUpRight aria-hidden size={16} className="shrink-0 text-gold" />
        </Link>
      ))}
    </nav>
  );
}
