import {pageMetadata} from "@/lib/metadata";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, SectionHeading } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroMotif, practiceIcon } from "@/components/sections/hero-motif";

export const metadata = pageMetadata("/sap-enterprise-solutions/analytics-cloud/", {
  title: "SAP Analytics Cloud",
  description:
    "SAP Analytics Cloud as the front door to enterprise data — business intelligence, planning and predictive analytics in one experience, natively connected to S/4HANA, Datasphere, BW/4HANA and non-SAP sources.",
});

/** Value pillars — Blueprint §8.10. */
const pillars = [
  {
    title: "One analytics experience",
    body: "BI, planning and predictive in a single tool.",
    bullets: [
      "Business intelligence and dashboards",
      "Integrated financial and operational planning",
      "Predictive analytics built in",
      "No stitching together separate point tools",
    ],
  },
  {
    title: "Plan and forecast",
    body: "Look forward, not just back.",
    bullets: [
      "Scenario simulation and what-if modelling",
      "Rolling forecasts",
      "Driver-based planning",
      "Reforecast as the business moves",
    ],
  },
  {
    title: "Connected and collaborative",
    body: "Self-service on live enterprise data.",
    bullets: [
      "Self-service collaboration across teams",
      "Native connectivity to S/4HANA, Datasphere and BW/4HANA",
      "Connectors to non-SAP sources",
      "One version of the truth, governed",
    ],
  },
];

/** Coverage across the business — Blueprint §8.10. */
const coverage = [
  "Finance",
  "Sales",
  "Operations",
  "HR",
  "Supply Chain",
  "Procurement",
  "Executive reporting",
];

export default function AnalyticsCloudPage() {
  return (
    <>
      <PageHero
        eyebrow="SAP Enterprise Solutions · SAP Analytics Cloud"
        headline="The front door to your"
        accentWord="enterprise data."
        subhead="SAP Analytics Cloud brings business intelligence, planning and predictive analytics into one experience — the single front door to data across every function, connected live to your SAP and non-SAP landscape."
        media={<HeroMotif icon={practiceIcon("sap-enterprise-solutions")} />}
      />

      {/* VALUE PILLARS */}
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Value pillars"
              lead="One platform that answers what happened, plans what comes next and predicts what is likely — on data drawn live from across the business."
            >
              Insight, plan and <Accent>predict</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={pillars} columns={3} bezel />
        </Container>
      </Section>

      {/* COVERAGE ACROSS THE BUSINESS */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Coverage across the business"
              lead="Analytics Cloud is not a finance-only tool. It serves every function from one trusted source, so each team works from the same numbers."
            >
              Every function, one <Accent>source</Accent>.
            </SectionHeading>
          </Reveal>
          <Reveal>
            <Card tone="white" className="h-full">
              <Eyebrow>Where it serves</Eyebrow>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {coverage.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy shadow-soft ring-1 ring-navy/5"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* PROOF BAND */}
      <Section tone="navy" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-24 top-10 h-[30rem] w-[30rem] origin-center rotate-45 border-[64px] border-blue-light" />
        </div>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow onDark>Proof</Eyebrow>
            <h2 className="mt-5 font-serif text-h2 font-bold text-white">
              Live faster, <Accent>sooner</Accent>.
            </h2>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "Pre-built", label: "Dashboard accelerators" },
              { value: "Live", label: "Connection patterns" },
              { value: "Ready", label: "Planning templates" },
              { value: "3 weeks", label: "Average first dashboard" },
            ].map((s) => (
              <StaggerItem key={s.label} className="h-full">
                <Card tone="navy" bezel={false} className="h-full ring-1 ring-white/10">
                  <div className="font-serif text-[2.5rem] font-bold leading-none text-white">{s.value}</div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-blue-light">{s.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaSection
        eyebrow="SAP Analytics Cloud"
        heading={
          <>
            Build your first enterprise <Accent>dashboard</Accent>.
          </>
        }
        body="Tell us which decisions you need to make faster. We'll connect Analytics Cloud to your landscape and stand up a first dashboard that puts live enterprise data in front of the people who need it."
      />
    </>
  );
}
