import {pageMetadata} from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, Headline, Lead } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem} from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { insights } from "@/content/insights";
import { insightBodies } from "@/content/insight-bodies";

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) return pageMetadata(`/insights/${slug}/`, { title: "Insight" });
  return pageMetadata(`/insights/${slug}/`, {
    title: article.title,
    description: article.excerpt,
  });
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFormatter.format(d);
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) notFound();

  const related = insights.filter((i) => i.slug !== article.slug).slice(0, 2);

  return (
    <>
      {/* ARTICLE HEADER */}
      <section className="relative overflow-hidden bg-off-white pt-36 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute right-0 top-20 h-[26rem] w-[26rem] opacity-[0.05]">
          <div className="absolute inset-0 origin-center rotate-45 border-[56px] border-navy" />
        </div>
        <Container>
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Eyebrow>{article.category}</Eyebrow>
              {article.date && <time dateTime={article.date} className="text-sm font-medium text-grey-muted">{formatDate(article.date)}</time>}
            </div>
            <Headline level={1} className="text-navy">
              {article.title}
            </Headline>
            <Lead>{article.excerpt}</Lead>
          </Reveal>
        </Container>
      </section>

      {/* ARTICLE BODY */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-measure">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-grey-muted">
              {insightBodies[article.slug].author && <p className="text-sm">Original perspective by {insightBodies[article.slug].author}</p>}
              {insightBodies[article.slug].sections.map(section => <section key={section.heading}>
                <h2 className="mb-3 text-h3 font-semibold text-foreground">{section.heading}</h2>
                <p>{section.text}</p>
              </section>)}
            </div>
            <p className="mt-8 rounded-xl2 border border-sand/40 bg-off-white px-6 py-4 text-sm leading-relaxed text-grey-muted">
              Adapted summary from the In2IT EBS article archive. Product references reflect the original perspective;
              confirm current capabilities and licensing when planning a programme.
            </p>
            <div className="mt-10">
              <Link
                href="/insights/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-accent"
              >
                ← All insights
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* RELATED */}
      {related.length ? (
        <Section tone="light">
          <Container>
            <Reveal className="mb-12 max-w-2xl">
              <Headline level={2} className="text-navy">
                Related <Accent>reading</Accent>.
              </Headline>
            </Reveal>
            <Stagger className="grid gap-5 md:grid-cols-2">
              {related.map((a) => (
                <StaggerItem key={a.slug} className="h-full">
                  <Link
                    href={`/insights/${a.slug}/`}
                    className="group flex h-full flex-col gap-4 rounded-xl2 border border-navy/5 bg-white p-7 transition-colors duration-300 hover:bg-off-white hover:shadow-soft"
                  >
                    <span className="label-caps text-blue-accent">{a.category}</span>
                    <h3 className="font-serif text-xl font-bold leading-snug text-navy">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-grey-muted">{a.excerpt}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        eyebrow="Keep exploring"
        heading={
          <>
            Bring these ideas to your <Accent>enterprise</Accent>.
          </>
        }
        body="Start your transformation and we'll map how these themes apply to your priorities — advisory, build or run."
      />
    </>
  );
}
