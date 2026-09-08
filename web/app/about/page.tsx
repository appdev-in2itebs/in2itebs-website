import {pageMetadata} from "@/lib/metadata";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, SectionHeading } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { StatBand } from "@/components/sections/stat-band";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { PillarsSection } from "@/components/sections/pillars";
import { stats, footerCertifications } from "@/content/site";

export const metadata = pageMetadata("/about/", {
  title: "Who We Are",
  description:
    "Three pillars, one converged enterprise: the structure, scale, footprint, credentials and leadership behind 10+ years of enterprise transformation.",
});

/** Why the three-pillar structure wins — Blueprint §4, Deck slide 4. */
const structureReasons = [
  {
    title: "Aligned across the lifecycle",
    body: "Consulting, platform and engineering services pull in one direction, under shared delivery and account ownership — not three vendors stitched together after the fact.",
  },
  {
    title: "Stronger enterprise positioning",
    body: "A single accountable partner for the whole transformation agenda, credible enough for large, complex programmes while keeping the agility and domain depth of a specialist.",
  },
  {
    title: "Cross-sell across pillars",
    body: "Advisory frames the decision, Platforms build the core and Digital, Data & AI extend it — so value compounds across the engagement rather than stopping at a project boundary.",
  },
  {
    title: "Future-ready for AI-led transformation",
    body: "AI is woven across every pillar rather than bolted on, positioning the enterprise for continuous, intelligence-led change as platforms and operating models evolve.",
  },
];

/** Footprint exactly as the deck states — Blueprint §4 / proof register. */
const deliveryCentres = ["Bengaluru", "Hyderabad", "Delhi NCR", "Bhubaneswar"];
const salesOffices = ["Mumbai", "Chennai", "Singapore", "Dubai", "Nairobi", "Johannesburg"];

const leadership = [
  {
    name: "Rudra Shankar Shatapathy",
    title: "Managing Director",
    photo: "/team/rudra-shankar-shatapathy.png",
    bio: "Rudra has provided vision and dedicated leadership in building and aligning solutions for clients across multiple geographies, helping IT organisations expand across India, the USA, Africa and Singapore. His focus has been on simplifying the corporate world by connecting technology seamlessly to business. He holds an MBA in International Business and a B.Tech in Mechanical Engineering.",
  },
  {
    name: "Parichay Joshi",
    title: "Chief Executive Officer / Director",
    photo: "/team/parichay-joshi.png",
    bio: "Parichay is a sales leader with rich experience across business applications, services and IT infrastructure. He has worked across industries and customer segments, bringing in marquee deals and first-of-many engagements. He has worked extensively with customer organisations to transform them into digital enterprises by intelligently connecting people, things and businesses.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        headline="Three pillars."
        accentWord="One converged enterprise."
        media={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl3 shadow-soft ring-1 ring-navy/10">
            <Image
              src="/stock/about-office.jpg"
              alt="Inside In2IT EBS"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        }
        subhead="We are structured for Platforms, Advisory and Digital Engineering under shared delivery, governance and account ownership — so you get one accountable partner for the whole transformation, not a patchwork of vendors."
      />

      {/* AT A GLANCE — corporate proof strip */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading eyebrow="At a glance">
              10+ years of scale, credentials and reach, <Accent>in numbers</Accent>.
            </SectionHeading>
          </Reveal>
          <StatBand stats={stats} />
        </Container>
      </Section>

      {/* ENTERPRISE STRUCTURE — three pillars + delivery layer */}
      <PillarsSection tone="white" />

      {/* WHY THIS STRUCTURE WINS */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Why this structure wins"
              lead="Each pillar has distinct ownership, but a common delivery and governance foundation. That is what turns three capabilities into one converged enterprise."
            >
              One structure, built to <Accent>compound</Accent>.
            </SectionHeading>
          </Reveal>
          <FeatureGrid features={structureReasons} columns={2} />
        </Container>
      </Section>

      {/* GLOBAL FOOTPRINT — 4 delivery centres + 6 sales offices */}
      <Section tone="white">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Global footprint"
              lead="Four India delivery centres anchor follow-the-sun delivery, with sales offices placed close to clients across South Asia, South-East Asia, the Middle East and Africa."
            >
              Close to delivery, close to <Accent>clients</Accent>.
            </SectionHeading>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <Card tone="white" className="h-full">
                <Eyebrow>Delivery centres</Eyebrow>
                <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-3">
                  {deliveryCentres.map((city) => (
                    <li
                      key={city}
                      className="rounded-full border border-navy/10 bg-off-white px-4 py-1.5 text-sm font-medium text-navy"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card tone="white" className="h-full">
                <Eyebrow>Sales offices</Eyebrow>
                <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-3">
                  {salesOffices.map((city) => (
                    <li
                      key={city}
                      className="rounded-full border border-navy/10 bg-off-white px-4 py-1.5 text-sm font-medium text-navy"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CREDENTIALS & CERTIFICATIONS */}
      <Section tone="light">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Credentials & certifications"
              lead="Partner status and process credentials that underpin every engagement."
            >
              Backed by recognised <Accent>standards</Accent>.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {footerCertifications.map((cert) => (
              <StaggerItem key={cert}>
                <div className="flex h-full items-center justify-center rounded-xl2 border border-navy/10 bg-white px-4 py-6 text-center text-sm font-semibold text-navy">
                  {cert}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* LEADERSHIP — approved profiles only */}
      <Section tone="white" id="leadership">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <SectionHeading
              eyebrow="Leadership"
              lead="Founder-led, with leadership that has built and scaled enterprise practices across India, the Middle East, Africa and South-East Asia."
            >
              Led by people who have done it <Accent>before</Accent>.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {leadership.map((leader) => (
              <StaggerItem key={leader.name} className="h-full">
                <Card tone="white" className="flex h-full flex-col gap-5 sm:flex-row sm:gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="h-28 w-28 shrink-0 rounded-xl2 object-cover object-top ring-1 ring-navy/10"
                  />
                  <div className="flex flex-col gap-2.5">
                    <div>
                      <h3 className="font-serif text-h3 font-bold leading-tight text-navy">{leader.name}</h3>
                      <span className="label-caps text-blue-accent">{leader.title}</span>
                    </div>
                    <p className="text-[0.92rem] leading-relaxed text-grey-muted">{leader.bio}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
