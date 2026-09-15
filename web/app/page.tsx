import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Route,
  ScanSearch,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { HomePartners } from "@/components/sections/home-partners";
import { BrandHero } from "@/components/sections/brand-hero";
import { AmbientVideo } from "@/components/media/ambient-video";
import { ServiceHero } from "@/components/sections/service-hero";
import { PlatformPracticeLinks } from "@/components/sections/platform-practice-links";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { pillars } from "@/content/nav";
import { industries } from "@/content/industries";
import { site, stats } from "@/content/site";
import { clients } from "@/content/clients";

export const metadata = pageMetadata("/", {
  title: { absolute: "In2IT EBS — Enterprise transformation under control" },
  description:
    "SAP-led enterprise transformation, advisory, digital engineering and managed operations across more than 30 countries.",
});

const capabilityIcons: LucideIcon[] = [Layers3, Route, BrainCircuit, Gauge];

const operatingSystem: Array<{
  code: string;
  title: string;
  copy: string;
  href: string;
  Icon: LucideIcon;
}> = [
  {
    code: "01",
    title: "ECC Prism™",
    copy: "A fact-based assessment for the move from SAP ECC to S/4HANA.",
    href: "/ecc-prism/",
    Icon: ScanSearch,
  },
  {
    code: "02",
    title: "FastForward",
    copy: "Our delivery method built on SAP Activate and accelerated by pre-built assets.",
    href: "/delivery-excellence/#fastforward",
    Icon: Route,
  },
  {
    code: "03",
    title: "Health Check 360",
    copy: "Machine-scale diagnosis across configuration, adoption and AI readiness.",
    href: "/sap-enterprise-solutions/health-check-360/",
    Icon: ChartNoAxesCombined,
  },
  {
    code: "04",
    title: "Development Factory",
    copy: "A governed plan, build and run system for dependable delivery at scale.",
    href: "/delivery-excellence/#factory",
    Icon: Boxes,
  },
];

const transformationStages: Array<{
  number: string;
  title: string;
  body: string;
  points: string[];
  Icon: LucideIcon;
  className: string;
}> = [
  {
    number: "01",
    title: "Decide",
    body: "Make the programme legible before committing the organisation.",
    points: ["Business case", "Architecture", "Risk and sequencing"],
    Icon: ScanSearch,
    className: "lg:col-span-4 lg:mt-12",
  },
  {
    number: "02",
    title: "Transform",
    body: "Connect process, platform, data and adoption through one accountable programme.",
    points: ["Design and build", "Migration", "Change and assurance"],
    Icon: Workflow,
    className: "text-foreground lg:col-span-5",
  },
  {
    number: "03",
    title: "Operate",
    body: "Move from go-live to stable operations and continuous improvement.",
    points: ["AMS transition", "Service control", "Optimisation"],
    Icon: Gauge,
    className: "lg:col-span-3 lg:mt-24",
  },
];

const featuredIndustries = [
  {
    name: "Manufacturing",
    detail: "Automotive, heavy engineering and industrial products",
    href: "/industries/automobiles/",
    image: "/stock/automobiles.jpg",
    Icon: GitBranch,
    className: "md:col-span-7 md:row-span-2",
  },
  {
    name: "Energy & utilities",
    detail: "Critical infrastructure and public enterprises",
    href: "/industries/energy-utilities/",
    image: "/stock/energy-utilities.jpg",
    Icon: Network,
    className: "md:col-span-5",
  },
  {
    name: "Consumer products",
    detail: "Food, beverage and high-velocity supply chains",
    href: "/industries/fmcg/",
    image: "/stock/fmcg.jpg",
    Icon: Building2,
    className: "md:col-span-5",
  },
];

export default function HomePage() {
  return (
    <>
      <BrandHero />
      <ServiceHero />
      <section aria-labelledby="platform-practices-title" className="bg-surface py-10">
        <Container>
          <h2 id="platform-practices-title" className="heading-plain mb-5 text-lg font-semibold text-foreground">
            Find your platform practice
          </h2>
          <PlatformPracticeLinks />
          <div className="mt-10">
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="metric-item glass-card relative rounded-surface px-6 py-7">
                  <dd className="text-gradient-numeral text-3xl font-semibold tabular-nums tracking-[-0.04em] md:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-gold">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section
        aria-label="Selected clients"
        className="relative border-b border-border-subtle bg-surface py-8 md:py-10"
      >
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Trusted in complex operating environments
          </p>
          <LogoMarquee clients={clients} />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-foreground-muted">Pause and full-list controls are available above.</span>
            <Link
              href="/partners/"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-gold underline decoration-gold/40 underline-offset-4"
            >
              Partners &amp; technology ecosystem
            </Link>
          </div>
        </Container>
      </section>

      <HomePartners />

      <section
        id="capabilities"
        className="seamless-section relative scroll-mt-20 overflow-hidden bg-surface py-24 md:py-32"
      >
        <div aria-hidden className="absolute inset-0 section-tint-a" />
        <Container className="relative">
          <Reveal className="grid gap-8 border-b border-border-strong pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                One connected delivery model
              </p>
              <h2 className="mt-5 max-w-[15ch] text-[clamp(2.65rem,5vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Built for the whole transformation lifecycle.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <p className="max-w-[48ch] text-base leading-relaxed text-foreground-muted">
                Strategy, platform and operations stay connected—so accountability does not disappear between phases or
                suppliers.
              </p>
            </div>
          </Reveal>

          <Stagger className="border-b border-border-subtle">
            {pillars.map((pillar, index) => {
              const Icon = capabilityIcons[index] ?? Layers3;
              return (
                <StaggerItem key={pillar.slug}>
                  <Link
                    href={pillar.href}
                    className="capability-row group grid gap-5 rounded-surface border-t border-border-subtle py-8 transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus md:grid-cols-12 md:items-center md:px-4 md:py-10"
                  >
                    <span className="icon-tile h-11 w-11 rounded-surface md:col-span-1">
                      <Icon aria-hidden size={19} strokeWidth={1.55} />
                    </span>
                    <span className="text-2xl font-semibold tracking-[-0.025em] text-foreground transition-colors group-hover:text-gold md:col-span-4 md:text-3xl">
                      <span className="mr-4 align-middle text-[0.62rem] font-semibold tabular-nums tracking-[0.14em] text-gold">
                        0{index + 1}
                      </span>
                      {pillar.name}
                    </span>
                    <span className="max-w-[55ch] text-sm leading-relaxed text-foreground-muted md:col-span-5">
                      {pillar.tagline}
                    </span>
                    <span className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground group-hover:text-gold md:col-span-2 md:justify-end">
                      Explore{" "}
                      <ArrowUpRight
                        aria-hidden
                        size={18}
                        className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section
        data-methods
        className="seamless-section relative overflow-hidden bg-surface py-24 text-foreground md:py-32"
      >
        {/* Ambient footage under the same tint as the brand hero, with a looser veil; the heading
            column and the method list each sit on their own feathered wash (`.video-wash-copy`). */}
        <AmbientVideo src="/video/methods-office-720.mp4" poster="/video/methods-office-poster.jpg" />
        <div aria-hidden className="video-tint pointer-events-none absolute inset-0" />
        <div aria-hidden className="video-wash video-wash-loose pointer-events-none absolute inset-0" />
        <div aria-hidden className="absolute inset-0 section-tint-b" />
        <div aria-hidden className="motion-rail absolute left-0 right-0 top-0 h-px bg-border-subtle">
          <span />
        </div>
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="relative isolate lg:col-span-5 lg:self-start">
              <div aria-hidden className="video-wash-copy" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">In2IT delivery intelligence</p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,4.6vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                Methods that make delivery observable.
              </h2>
              <p className="mt-7 max-w-[45ch] text-base leading-relaxed text-foreground-muted">
                Our methods and accelerators turn programme complexity into explicit decisions, checkpoints and
                operating outcomes.
              </p>
            </Reveal>

            <div className="relative isolate lg:col-span-7">
              <div aria-hidden className="video-wash-copy" />
              <Stagger className="method-list relative border-t border-border-strong">
                {operatingSystem.map((item) => (
                  <StaggerItem key={item.title}>
                    <Link
                      href={item.href}
                      className="method-row group grid gap-4 border-b border-border-subtle py-7 transition-colors duration-200 sm:grid-cols-[3rem_3rem_1fr_auto] sm:items-start"
                    >
                      <span className="pt-3 text-[0.65rem] font-semibold tabular-nums tracking-[0.14em] text-gold">
                        {item.code}
                      </span>
                      <span className="icon-tile h-11 w-11 rounded-surface">
                        <item.Icon aria-hidden size={18} strokeWidth={1.55} />
                      </span>
                      <span>
                        <span className="block text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
                          {item.title}
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-sm leading-relaxed text-foreground-muted">
                          {item.copy}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        size={19}
                        className="mt-3 text-gold transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="operating-model"
        className="seamless-section relative scroll-mt-20 overflow-hidden bg-surface py-24 md:py-32"
      >
        <div aria-hidden className="absolute inset-0 section-tint-c" />
        <Container className="relative">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">From decision to operation</p>
              <h2 className="mt-5 max-w-[14ch] text-[clamp(2.65rem,5vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                One continuous line of accountability.
              </h2>
            </div>
            <p className="max-w-[48ch] text-base leading-relaxed text-foreground-muted lg:col-span-4">
              Clear gates connect strategy, implementation and operation. The same context moves forward instead of
              being rediscovered at every hand-off.
            </p>
          </Reveal>

          <Stagger className="relative mt-16 grid gap-3 lg:grid-cols-12">
            <div aria-hidden className="absolute left-[6%] right-[6%] top-10 hidden h-px bg-border-strong lg:block">
              <span className="flow-signal absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-action" />
            </div>
            {transformationStages.map((stage) => (
              <StaggerItem key={stage.title} className={stage.className}>
                <article
                  className={`stage-card relative min-h-[24rem] overflow-hidden border p-7 text-foreground md:p-9 ${stage.number === "02" ? "stage-card-featured glass-elevated rounded-feature border-gold-soft/70" : "glass-card rounded-feature"}`}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 ${stage.number === "02" ? "stage-featured-tint" : "blueprint-light opacity-30"}`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.16em] text-gold">
                        {stage.number}
                      </span>
                      <span className="icon-tile h-12 w-12 rounded-surface">
                        <stage.Icon aria-hidden size={21} strokeWidth={1.5} />
                      </span>
                    </div>
                    <h3 className="mt-12 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{stage.title}</h3>
                    <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-foreground-muted">{stage.body}</p>
                    <ul className="mt-auto border-t border-border-subtle pt-5">
                      {stage.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]"
                        >
                          <span className="h-1 w-1 bg-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section
        id="industries"
        className="seamless-section relative scroll-mt-20 overflow-hidden bg-surface py-24 md:py-32"
      >
        <div aria-hidden className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-action/[0.06] blur-[100px]" />
        <Container className="relative">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Operating context</p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(2.65rem,5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.05em]">
                Enterprise experience, grounded in the real world.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="max-w-[52ch] text-base leading-relaxed text-foreground-muted">
                Transformation behaves differently on a factory floor, across a transmission network and inside a
                regulated enterprise. Our work starts with that context.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid auto-rows-[19rem] gap-3 md:grid-cols-12">
            {featuredIndustries.map((industry) => (
              <StaggerItem key={industry.name} className={industry.className}>
                <Link
                  href={industry.href}
                  className="industry-tile group relative block h-full overflow-hidden rounded-feature bg-brand"
                >
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/[0.12] to-transparent transition-colors duration-300 group-hover:from-brand"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-on-brand md:p-8">
                    <div>
                      <industry.Icon aria-hidden size={18} strokeWidth={1.5} className="mb-4 text-gold-on-brand" />
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{industry.name}</h3>
                      <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-on-brand/70">{industry.detail}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      size={20}
                      className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.slice(2, 6).map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}/`}
                className="glass-card group flex min-h-24 items-center justify-between gap-4 rounded-surface px-5 py-5"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-gold">{industry.name}</span>
                <ArrowRight
                  aria-hidden
                  size={16}
                  className="shrink-0 text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:text-gold"
                />
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button href="/industries/" variant="secondary" withArrow>
              Explore all industries
            </Button>
          </div>
        </Container>
      </section>

      <section className="glass border-x-0 py-8">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {["SAP Gold Partner", "300+ SAP consultants", "1,000+ combined years of SAP experience"].map(
              (item, index) => (
                <p key={item} className="flex items-center gap-4 text-sm font-semibold text-foreground">
                  <span className="text-[0.65rem] tabular-nums tracking-[0.14em] text-gold">0{index + 1}</span>
                  {item}
                </p>
              ),
            )}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow="A useful first conversation"
        heading={<>Bring the programme constraint. Leave with a clearer first move.</>}
        body="We will bring the right platform, architecture and delivery specialists—and map the decisions that matter before the next commitment is made."
        ctaLabel={site.primaryCta.label}
      />
    </>
  );
}
