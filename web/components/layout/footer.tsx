import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/content/nav";
import { officeCities } from "@/content/offices";
import { footerCertifications, site, social } from "@/content/site";
import { Logo } from "@/components/ui/logo";

const socials = [
  { href: social.linkedin, label: "LinkedIn" },
  { href: social.x, label: "X" },
  { href: social.youtube, label: "YouTube" },
  { href: social.instagram, label: "Instagram" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-on-brand">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-on-brand/70 transition-colors hover:text-gold-on-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="theme-on-brand relative bg-brand pb-20 text-on-brand">
      <div aria-hidden className="rule-gold absolute inset-x-0 top-0" />
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 border-b border-on-brand/20 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="white" asLink={false} className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed tracking-[-0.02em] text-on-brand">
              Enterprise transformation for organisations that cannot afford operational ambiguity.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-brand/[0.58]">
              SAP Gold Partner with delivery across 30+ countries and adjacent strength in advisory, data, AI and
              digital engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <LinkColumn title="Company" links={footerNav.company.slice(0, 5)} />
            <LinkColumn title="Capabilities" links={footerNav.practices} />
            <LinkColumn title="Resources" links={[...footerNav.company.slice(5), ...footerNav.legal]} />
          </div>
        </div>

        <div className="grid gap-8 border-b border-on-brand/20 py-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerCertifications.map((certification) => (
              <span
                key={certification}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-on-brand"
              >
                {certification}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socials.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-pill min-h-11 bg-on-brand/10 px-3.5 text-sm text-on-brand/80 transition-colors hover:border-gold-on-brand/60 hover:text-gold-on-brand"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 pt-7 text-xs text-on-brand/[0.52] md:flex-row md:items-center">
          <p>
            © {site.copyrightYear} {site.legalName}. All rights reserved.
          </p>
          <Link
            href="/contact/"
            className="group inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-on-brand"
          >
            {officeCities.join(" · ")}
            <ArrowUpRight
              aria-hidden
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
