import {pageMetadata} from "@/lib/metadata";
import { Container, Section } from "@/components/ui/container";
import { Accent, SectionHeading } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroMotif, practiceIcon } from "@/components/sections/hero-motif";

export const metadata = pageMetadata("/digital-data-ai/application-engineering/", {
  title: "Application Engineering",
  description:
    "Custom development, integration, post-implementation support and continuous improvement across legacy and modern application estates.",
});

const serviceMap = [
  {
    title: "Application Development",
    body: "Custom builds across web, mobile and analytics — designed, built and tested as production systems.",
    bullets: ["Custom application development", "Web, mobile & analytics", "Quality-assured delivery"],
  },
  {
    title: "Integration Services",
    body: "Connecting platforms, products and channels cleanly across the estate.",
    bullets: ["Platform & product integration", "Channel integration", "Reusable integration patterns"],
  },
  {
    title: "Post-implementation Support",
    body: "Application management that sustains and extends what you have built.",
    bullets: ["Application management", "Enhancements", "Upgrades"],
  },
  {
    title: "Optimisation Services",
    body: "Advisory and assessment that keep applications healthy and improving.",
    bullets: ["System health checks", "Gap-fit analysis", "Continuous improvement"],
  },
];

const lifecycle = [
  { stage: "Design & Architecture", note: "Solution shaping, architecture and technical design." },
  { stage: "Development & Testing", note: "Build and quality assurance across modern and legacy stacks." },
  { stage: "Maintenance & Support", note: "Application management that sustains the estate." },
  { stage: "Optimisation", note: "Assessment and continuous improvement over the lifecycle." },
];

const estate = [
  {
    title: "Bespoke Applications",
    body: "Tailor-made builds across web, mobile and analytics.",
    bullets: [
      "Java/J2EE, ASP.NET, PHP, Python",
      "SharePoint, Power Apps",
      "Android, iOS & Hybrid",
      "BI, MEAN & CMS",
    ],
  },
  {
    title: "Legacy Applications",
    body: "Sustaining, migrating and retiring established platforms.",
    bullets: ["APEX, Mainframe, AS/400", "VAX/VMS, PL/I", "Migration & retirement"],
  },
  {
    title: "Packaged Integration",
    body: "Connecting and extending enterprise packages.",
    bullets: ["SAP, Oracle Suite", "Microsoft 365, OpenText", "AWS & Azure", "Qlikview & Tableau"],
  },
];

export default function ApplicationEngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital, Data & AI · Application Engineering"
        headline="Custom development, integration and support across every"
        accentWord="estate"
        subhead="Custom development, integrations, post-implementation support and continuous improvement across legacy and modern application estates."
        media={<HeroMotif icon={practiceIcon("application-development-managed-services")} />}
      />

      {/* SERVICE MAP */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Service map"
              lead="Four services that cover the full application lifecycle — development, integration, support and optimisation — used independently or together."
            >
              Build, integrate, support, <Accent>optimise</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={serviceMap} columns={2} />
        </Container>
      </Section>

      {/* LIFECYCLE STAGES */}
      <Section tone="white" id="lifecycle">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Lifecycle stages"
              lead="Every engagement moves through four clear stages — so delivery stays controlled from first design to ongoing optimisation."
            >
              An application lifecycle with every stage <Accent>covered</Accent>.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifecycle.map((l) => (
              <StaggerItem key={l.stage} className="h-full">
                <div className="flex h-full flex-col gap-2 rounded-xl2 border border-navy/5 bg-off-white p-6">
                  <span className="label-caps text-blue-accent">{l.stage}</span>
                  <p className="text-[0.9rem] leading-relaxed text-grey-muted">{l.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* TECHNOLOGY ESTATE */}
      <Section tone="light" id="technology-estate">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Technology estate"
              lead="Bespoke, legacy and packaged — we build the new, sustain the established and connect the enterprise packages that run the business."
            >
              Across bespoke, legacy and <Accent>packaged</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={estate} columns={3} />
        </Container>
      </Section>

      <CtaSection
        eyebrow="Next step"
        heading={
          <>
            Modernise your application <Accent>landscape</Accent>.
          </>
        }
        body="Start your transformation and we'll map your application priorities — development, integration, support or optimisation."
        ctaLabel="Start your transformation"
        ctaHref="/contact/"
      />
    </>
  );
}
