import { Cpu, Database, Sparkles, Layers, Users, Plus } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const elements = [
  { Icon: Cpu, label: "Technology" },
  { Icon: Database, label: "Data" },
  { Icon: Sparkles, label: "AI" },
  { Icon: Layers, label: "Platforms" },
  { Icon: Users, label: "Human expertise" },
];

/** Why converged intelligence — fusion of five elements. Owner-supplied. Ties to the logo tagline + SOT-27. */
export function ConvergedIntelligence() {
  return (
    <Section tone="navy" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-[28rem] w-[28rem] opacity-[0.06]">
        <div className="absolute inset-0 origin-center rotate-45 border-[60px] border-blue-light" />
      </div>
      <Container>
        <Reveal className="mb-14 max-w-3xl">
          <Eyebrow onDark>The In2IT EBS difference</Eyebrow>
          <h2 className="mt-5 text-display font-serif font-bold leading-[1.02] text-white">
            Why <Accent>converged</Accent> intelligence?
          </h2>
          <p className="mt-6 max-w-measure text-base leading-relaxed text-blue-light md:text-lg">
            We fuse five elements — Technology, Data, AI, Platforms and Human expertise — and unify them to create
            value at every point of your value chain.
          </p>
        </Reveal>

        <Stagger className="flex flex-wrap items-stretch justify-center gap-3 md:flex-nowrap">
          {elements.map(({ Icon, label }, i) => (
            <StaggerItem key={label} className="flex flex-1 items-center gap-3">
              <div className="flex w-full flex-col items-center gap-4 rounded-xl2 border border-white/10 bg-white/[0.04] px-5 py-8 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-light/15 text-blue-light">
                  <Icon size={22} strokeWidth={1.25} />
                </span>
                <span className="font-serif text-lg font-semibold text-white">{label}</span>
              </div>
              {i < elements.length - 1 ? (
                <Plus size={18} strokeWidth={1.5} className="hidden shrink-0 text-blue-light/50 md:block" />
              ) : null}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-12">
          <p className="font-serif text-2xl font-bold leading-snug text-white md:text-3xl">
            Five forces. One operating model. <Accent>Value</Accent> at every point of the value chain.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
