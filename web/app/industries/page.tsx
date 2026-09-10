import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, SectionHeading } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { CtaSection } from "@/components/sections/cta-section";
import { industries } from "@/content/industries";
import { getClientsBySectors } from "@/lib/content";

export const metadata = pageMetadata("/industries/", {
  title: "Industries",
  description:
    "Selected clients across the regulated, complex sectors where In2IT EBS has delivered SAP, Salesforce, Workday and application transformation programmes.",
});

const howEachPageWorks = [
  {
    title: "Sector body",
    body: "An overview, SAP solution offerings and capability sub-sections drawn from our delivery experience in that industry.",
  },
  {
    title: "Clients in this sector",
    body: "Logos for that industry only, grouped exactly as they appear in our portfolio — no client is shown on a sector it isn't placed in.",
  },
  {
    title: "Case studies, on request",
    body: "Detailed transformation case studies are shared on request, under NDA — never published on the open site.",
  },
];

export default function IndustriesPage() {
  const otherSectorClients = getClientsBySectors(["Others"]);

  return (
    <>
      <BreadcrumbJsonLd path="/industries/" />
      <PageHero
        eyebrow="Industries"
        headline="150+ global enterprises. Across regulated, complex"
        accentWord="industries"
        subhead="Selected clients across the sectors where we've delivered SAP, Salesforce, Workday and application transformation programmes."
      />

      {/* INDUSTRIES WE SERVE */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Industries we serve"
              lead="Deep delivery experience across each sector — every card links to a dedicated page showing that industry's overview, capabilities and clients."
            >
              The sectors where we go <Accent>deep</Accent>.
            </SectionHeading>
          </Reveal>

          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <StaggerItem key={ind.slug} className="h-full">
                <Link
                  href={`/industries/${ind.slug}/`}
                  className="group glass-card flex h-full flex-col justify-between gap-6 rounded-surface p-7"
                >
                  <h3 className="text-h3 font-bold leading-snug text-foreground">{ind.name}</h3>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    See clients in this sector
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* HOW EACH INDUSTRY PAGE WORKS */}
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="How each page works"
              lead="Every industry page follows the same structure, so you can move between sectors and find what you need in the same place."
            >
              A consistent view of every <Accent>sector</Accent>.
            </SectionHeading>
          </Reveal>

          <Stagger className="grid gap-5 md:grid-cols-3">
            {howEachPageWorks.map((item, i) => (
              <StaggerItem key={item.title} className="h-full">
                <Card className="flex h-full flex-col">
                  <span className="label-caps text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-h3 font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">{item.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* CASE STUDIES — UNDER NDA */}
      <Section tone="light">
        <Container>
          <Reveal>
            <Card tone="navy" className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="max-w-xl">
                <Eyebrow onDark>Case studies</Eyebrow>
                <h2 className="mt-4 text-h2 font-bold leading-tight">
                  Detailed case studies, on <Accent>request</Accent>.
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-muted">
                  Our detailed transformation case studies are available on request, under NDA.
                </p>
              </div>
              <div className="shrink-0">
                <Button href="/contact/" variant="on-dark" withArrow>
                  Request case studies under NDA
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* OTHER SECTORS */}
      {otherSectorClients.length ? (
        <Section tone="white">
          <Container>
            <Reveal className="mb-10 max-w-2xl">
              <SectionHeading eyebrow="Other sectors">
                Enterprises beyond the named <Accent>verticals</Accent>.
              </SectionHeading>
            </Reveal>
          </Container>
          <LogoMarquee clients={otherSectorClients} />
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
