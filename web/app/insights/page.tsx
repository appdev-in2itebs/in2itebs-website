import {pageMetadata} from "@/lib/metadata";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Accent, SectionHeading } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem} from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { insights } from "@/content/insights";

export const metadata = pageMetadata("/insights/", {
  title: "Insights",
  description: "Perspectives on enterprise transformation — SAP, SuccessFactors, AI and the technologies reshaping the enterprise.",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        headline="Perspectives on enterprise"
        accentWord="transformation"
        subhead="Points of view from our practices on SAP, SuccessFactors, AI and the technologies reshaping the enterprise."
      />

      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading eyebrow="From our article archive">
              Ideas worth <Accent>reading</Accent>.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <Link
                  href={`/insights/${a.slug}/`}
                  className="group flex h-full flex-col gap-4 rounded-xl2 border border-navy/5 bg-white p-7 transition-colors duration-300 hover:bg-off-white hover:shadow-soft"
                >
                  <span className="label-caps text-blue-accent">{a.category}</span>
                  <h2 className="font-serif text-xl font-bold leading-snug text-navy">{a.title}</h2>
                  <p className="text-sm leading-relaxed text-grey-muted">{a.excerpt}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
