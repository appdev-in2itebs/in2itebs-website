import {pageMetadata} from "@/lib/metadata";
import {BreadcrumbJsonLd} from "@/components/seo/json-ld";
import { PlatformPracticeLinks } from "@/components/sections/platform-practice-links";
import { Container, Section } from "@/components/ui/container";
import { Accent, SectionHeading } from "@/components/ui/typography";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PillarCards } from "@/components/sections/pillar-cards";
import { AllianceStrip } from "@/components/sections/alliance-strip";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata = pageMetadata("/what-we-do/", {
  title: "What We Do",
  description:
    "Three engagement tiers — Advisory, Platforms & Engineering, and Managed Services & Sustenance — running on one continuous delivery engine.",
});

/** Blueprint §5 — three engagement tiers. Clients enter through advise, build
 *  or run, with the same delivery engine underneath. Deck slide 6. */
const tiers = [
  {
    title: "Tier 01 — Advisory",
    body: "Set direction before committing spend. Define the case for change and the path to value.",
    bullets: [
      "Transformation strategy",
      "Business case",
      "Process re-engineering",
      "Change management",
      "Digital roadmap",
    ],
  },
  {
    title: "Tier 02 — Platforms & Engineering",
    body: "Build the enterprise platform and the engineering around it across our core technologies.",
    bullets: [
      "SAP S/4HANA & modules",
      "Workday",
      "Salesforce",
      "SAP SuccessFactors",
      "Oracle",
      "Microsoft",
      "Custom engineering",
      "Digital transformation",
    ],
  },
  {
    title: "Tier 03 — Managed Services & Sustenance",
    body: "Run and continuously improve the landscape once it is live, with always-on operations.",
    bullets: [
      "Application Management Services",
      "Application support",
      "Technical operations",
      "Continuous improvement",
    ],
  },
];

/** Blueprint §5 — one delivery engine. Exact deck components (slide 6). */
const deliveryEngine = [
  {
    title: "FastForward methodology",
    body: "Our proprietary delivery method, built on SAP Activate and accelerated by pre-built assets, governed by a single quality gate at every phase.",
  },
  {
    title: "Development factory",
    body: "A standardised, repeatable, automated development model with output measurement, integrated testing and best-practice frameworks.",
  },
  {
    title: "Global AMS bench",
    body: "A follow-the-sun managed-services bench that takes engagements from go-live into always-on support and sustenance.",
  },
  {
    title: "Account-level governance",
    body: "One accountable structure across advise, build and run — shared quality gates, reporting and ownership at the account level.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/what-we-do/" />
      <PageHero
        eyebrow="What We Do"
        headline="Three tiers."
        accentWord="One continuous engagement."
        subhead="Enter through Advisory, Platforms & Engineering, or Managed Services & Sustenance — and find the same delivery engine underneath, whichever door you choose."
      />

      {/* THREE ENGAGEMENT TIERS */}
      <section aria-labelledby="practice-finder-title" className="bg-surface py-10">
        <Container>
          <h2 id="practice-finder-title" className="mb-5 text-h3 font-semibold text-foreground">Choose your platform practice</h2>
          <PlatformPracticeLinks />
        </Container>
      </section>
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Engagement tiers"
              lead="One continuous model, three starting points. Begin where you are — advise, build or run — and move across tiers as the programme matures."
            >
              Start at the tier that matches your <Accent>need</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={tiers} columns={3} />
        </Container>
      </Section>

      {/* PILLAR ROUTING CARDS */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Choose your route"
              lead="Each pillar describes what it does and when a buyer chooses that path. Pick the route that matches your transformation priority."
            >
              Three practice pillars. One shared <Accent>delivery engine</Accent>.
            </SectionHeading>
          </Reveal>
          <PillarCards />
        </Container>
      </Section>

      {/* ONE DELIVERY ENGINE */}
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="One delivery engine"
              lead="Whichever tier or pillar you enter through, the same delivery machinery sits underneath — the reason you get one accountable partner rather than fragmented vendors."
            >
              The same engine under every <Accent>engagement</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={deliveryEngine} columns={4} />
        </Container>
      </Section>

      {/* PARTNER ALLIANCES STRIP */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <SectionHeading
              eyebrow="Strategic alliances"
              lead="Strategic cloud alliances that extend our reach across the enterprise stack."
            >
              Built on the platforms enterprises <Accent>run on</Accent>.
            </SectionHeading>
          </Reveal>
          <Reveal>
            <AllianceStrip />
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
