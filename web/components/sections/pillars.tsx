import { Layers, Compass, Code2 } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Accent, SectionHeading } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import Link from 'next/link';
import {platformPractices} from '@/content/nav';

const pillars = [
  {
    Icon: Layers,
    name: "Platforms",
    body: "SAP, SuccessFactors, Salesforce, Workday, Oracle and Microsoft: enterprise platforms connected to your business processes and supported across their lifecycle.",
  },
  {
    Icon: Compass,
    name: "Advisory",
    body: "Strategy, business case, process re-engineering and a board-ready roadmap that de-risks the decision before you commit.",
  },
  {
    Icon: Code2,
    name: "Digital Engineering",
    body: "Custom development, integration and 24×7 managed services across every stack — build, integrate and run.",
  },
];

/** Who we are — AI-led transformation, three pillars. Owner-supplied positioning. */
export function PillarsSection({ tone = "white" as "white" | "light" }) {
  return (
    <Section tone={tone}>
      <Container>
        <Reveal className="mb-14 max-w-3xl">
          <SectionHeading
            eyebrow="Who we are"
            lead="Structured around three pillars that work as one — Platforms, Advisory and Digital Engineering."
          >
            An <Accent>AI-led</Accent> enterprise transformation company.
          </SectionHeading>
        </Reveal>
        <Stagger className="grid gap-px overflow-hidden rounded-xl2 border border-navy/5 bg-navy/5 md:grid-cols-3">
          {pillars.map(({ Icon, name, body }) => (
            <StaggerItem key={name} className="h-full">
              <div className="flex h-full flex-col gap-5 bg-white p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-pale/40 text-navy">
                  <Icon size={22} strokeWidth={1.25} />
                </span>
                <h3 className="font-serif text-h3 font-bold text-navy">{name}</h3>
                <p className="text-[0.95rem] leading-relaxed text-grey-muted">{body}</p>
                {name==='Platforms' && <ul className="flex flex-wrap gap-x-4 gap-y-1">{platformPractices.map(practice=><li key={practice.slug}><Link href={practice.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-action underline">{practice.name}</Link></li>)}</ul>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
