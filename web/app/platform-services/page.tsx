import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, SectionHeading } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { HeroMotif, practiceIcon } from "@/components/sections/hero-motif";
import { CtaSection } from "@/components/sections/cta-section";
import { platformPractices } from "@/content/nav";

export const metadata = pageMetadata("/platform-services/", {
  title: "Platform Services",
  description:
    "SAP, SuccessFactors, Salesforce, Workday, Oracle and Microsoft: consulting, implementation, rollout and managed services with one accountable partner.",
});

// Full lifecycle stages (Blueprint §6 — deck slides 4 & 7).
const lifecycle = [
  "Consulting",
  "Implementation",
  "Rollouts",
  "Upgrades & migrations",
  "Enhancements",
  "AMS",
  "Application support",
  "Hypercare",
  "Integration",
];

// SAP / Salesforce / Workday cards, drawn from platformPractices (Blueprint §6).
const cardCopy: Record<string, { eyebrow: string; bullets: string[]; cta: string }> = {
  successfactors: {
    eyebrow: "Human experience",
    bullets: ["Core HR and payroll", "Talent and workforce experience", "Integration and ongoing support"],
    cta: "Explore SuccessFactors",
  },
  oracle: {
    eyebrow: "Enterprise applications",
    bullets: ["Oracle E-Business Suite and JD Edwards", "Oracle Cloud ERP", "Database and middleware services"],
    cta: "Explore Oracle",
  },
  microsoft: {
    eyebrow: "Connected business",
    bullets: ["Dynamics 365 ERP and CRM", "Microsoft 365 and SharePoint", "Azure cloud services"],
    cta: "Explore Microsoft",
  },
  sap: {
    eyebrow: "Flagship practice",
    bullets: [
      "SAP Gold Partner, 300+ consultants and 1,000+ combined years of SAP experience",
      "S/4HANA, SuccessFactors, Ariba, Concur and SAP Analytics Cloud",
      "Datasphere, BTP clean-core extensions and Joule activation",
    ],
    cta: "Explore SAP Services",
  },
  salesforce: {
    eyebrow: "Customer experience",
    bullets: [
      "Sales, Service, Marketing and Commerce Clouds",
      "Industry Clouds for vertical needs",
      "Einstein and Platform for predictive sales and service",
    ],
    cta: "Explore Salesforce Services",
  },
  workday: {
    eyebrow: "HR & finance cloud",
    bullets: [
      "Advisory, implementation and integration",
      "HR analytics and workforce planning",
      "Managed services across HR and finance",
    ],
    cta: "Explore Workday Services",
  },
};

// Future platform expansion only — not current flagship practice depth (Blueprint §6).
const futurePlatforms = ["ServiceNow", "Adobe"];

export default function PlatformServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/platform-services/" />
      <PageHero
        eyebrow="Platform Services"
        headline="Platform-led transformation, one accountable"
        accentWord="partner."
        subhead="Consulting, implementation and managed services across SAP, SuccessFactors, Salesforce, Workday, Oracle and Microsoft, with one accountable partner for the full lifecycle."
        media={<HeroMotif icon={practiceIcon("sap-enterprise-solutions")} />}
      />

      {/* LIFECYCLE BAND */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Full lifecycle"
              lead="From first advisory conversation to always-on support, every stage runs on one delivery engine with shared governance and account ownership."
            >
              The full platform <Accent>lifecycle</Accent>.
            </SectionHeading>
          </Reveal>

          <Reveal>
            <Card tone="white">
              <ul className="flex flex-wrap gap-x-2.5 gap-y-3">
                {lifecycle.map((stage) => (
                  <li
                    key={stage}
                    className="rounded-full border border-navy/10 bg-off-white px-4 py-1.5 text-sm font-medium text-navy"
                  >
                    {stage}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-measure border-l-2 border-sand pl-5 text-[0.95rem] leading-relaxed text-grey-muted">
              One delivery engine — FastForward methodology, development factory, global AMS bench and account-level
              governance — runs beneath every stage.{" "}
              <Link
                href="/delivery-excellence/"
                className="font-semibold text-blue-accent underline-offset-4 hover:underline"
              >
                See Delivery Excellence
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* THREE PLATFORM PRACTICES */}
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Platforms we deliver"
              lead="SAP as the flagship capability, with credible platform depth across Salesforce and Workday — connected to one enterprise transformation story."
            >
              Three platforms, one <Accent>standard</Accent>.
            </SectionHeading>
          </Reveal>

          <Stagger className="grid gap-5 md:grid-cols-3">
            {platformPractices.map((practice) => {
              const copy = cardCopy[practice.slug];
              return (
                <StaggerItem key={practice.slug} className="h-full">
                  <Card className="flex h-full flex-col">
                    <Eyebrow>{copy.eyebrow}</Eyebrow>
                    <h3 className="mt-3 font-serif text-h3 font-bold text-navy">{practice.name}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-muted">{practice.tagline}</p>
                    <ul className="mt-5 space-y-2">
                      {copy.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-grey-muted">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Link
                        href={practice.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-accent transition-colors duration-200 hover:text-navy"
                      >
                        {copy.cta}
                        <ArrowUpRight size={16} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* FUTURE PLATFORMS NOTE */}
      <Section tone="light">
        <Container>
          <Reveal>
            <Card tone="white">
              <Eyebrow>Future platform expansion</Eyebrow>
              <p className="mt-4 max-w-measure text-[0.95rem] leading-relaxed text-grey-muted">
                ServiceNow and Adobe remain areas of planned expansion. Our current practice routes cover SAP,
                SuccessFactors, Salesforce, Workday, Oracle and Microsoft.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-3">
                {futurePlatforms.map((platform) => (
                  <li
                    key={platform}
                    className="rounded-full border border-navy/10 bg-off-white px-4 py-1.5 text-sm font-medium text-grey-muted"
                  >
                    {platform}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Platform transformation"
        heading={
          <>
            Discuss your platform <Accent>transformation</Accent>.
          </>
        }
        body="Tell us which platforms you run today and where you want to go. We'll bring the lifecycle, the people and the proof — and map your first move in a single conversation."
      />
    </>
  );
}
