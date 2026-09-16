import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AutoTrack } from "@/components/motion/auto-track";
import { leadership } from "@/content/leadership";

/**
 * "Meet Our Team" as on in2itebs.com (copied 1:1 on 2026-09-16, photos included): four leadership
 * cards on an automatic scroll-snap track, two up on desktop and one up on a phone, no controls.
 */
export function LeadershipCarousel() {
  return (
    <section
      data-leadership
      aria-labelledby="leadership-title"
      className="border-t border-border-subtle bg-surface py-14 md:py-20"
    >
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gold">Leadership</p>
            <h2 id="leadership-title" className="mt-3 max-w-2xl text-h2 font-semibold">
              Meet Our Team
            </h2>
          </div>
          <Link
            href="/about/"
            className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-gold hover:underline"
          >
            Know More <ArrowUpRight aria-hidden size={18} />
          </Link>
        </div>
        <AutoTrack label="Leadership team" focusable>
          {leadership.map((person, index) => (
            <li
              key={person.slug}
              data-leader={person.slug}
              className="w-[min(88vw,36rem)] shrink-0 snap-start lg:w-[calc(50%-0.5rem)]"
            >
              <article className="glass-card flex h-full flex-col gap-6 rounded-surface p-6 sm:flex-row sm:items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt={person.name}
                  width={144}
                  height={144}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-36 w-36 shrink-0 rounded-full object-cover object-top ring-1 ring-glass-line/40"
                />
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold">{person.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{person.bio}</p>
                </div>
              </article>
            </li>
          ))}
        </AutoTrack>
      </Container>
    </section>
  );
}
