import { pageMetadata } from "@/lib/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Accent, Headline, Lead } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { insights } from "@/content/insights";
import { insightBodies } from "@/content/insight-bodies";

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) notFound();

  const related = insights.filter((i) => i.slug !== article.slug).slice(0, 2);

  return (
    <>
      <BreadcrumbJsonLd path={`/insights/${article.slug}/`} name={article.title} />
      <ArticleJsonLd
        slug={article.slug}
        title={article.title}
        date={article.date}
        excerpt={article.excerpt}
        author={insightBodies[article.slug].author}
      />
      {/* ARTICLE HEADER */}
      <section className="relative overflow-hidden bg-surface-subtle pt-36 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute right-0 top-20 h-[26rem] w-[26rem] opacity-[0.05]">
          <div className="absolute inset-0 origin-center rotate-45 border-[56px] border-gold-soft" />
        </div>
        <Container>
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Eyebrow>{article.category}</Eyebrow>
              {article.date && (
                <time dateTime={article.date} className="text-sm font-medium text-foreground-muted">
                  {formatDate(article.date)}
                </time>
              )}
            </div>
            <Headline level={1}>{article.title}</Headline>
            <Lead>{article.excerpt}</Lead>
          </Reveal>
        </Container>
      </section>

      {/* ARTICLE BODY */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-measure">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground-muted">
              {insightBodies[article.slug].author && (
                <p className="text-sm">Original perspective by {insightBodies[article.slug].author}</p>
              )}
              {insightBodies[article.slug].sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-3 text-h3 font-semibold">{section.heading}</h2>
                  <p>{section.text}</p>
                </section>
              ))}
            </div>
            <p className="mt-8 rounded-surface border border-gold-soft/40 bg-surface-subtle px-6 py-4 text-sm leading-relaxed text-foreground-muted">
              Adapted summary from the In2IT EBS article archive. Product references reflect the original perspective;
              confirm current capabilities and licensing when planning a programme.
            </p>
            <div className="mt-10">
              <Link href="/insights/" className="inline-flex items-center gap-2 text-sm font-semibold text-action">
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
              <Headline level={2}>
                Related <Accent>reading</Accent>.
              </Headline>
            </Reveal>
            <Stagger className="grid gap-5 md:grid-cols-2">
              {related.map((a) => (
                <StaggerItem key={a.slug} className="h-full">
                  <Link
                    href={`/insights/${a.slug}/`}
                    className="group glass-card flex h-full flex-col gap-4 rounded-surface p-7"
                  >
                    <span className="label-caps text-gold">{a.category}</span>
                    <h3 className="text-xl font-bold leading-snug text-foreground">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">{a.excerpt}</p>
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
