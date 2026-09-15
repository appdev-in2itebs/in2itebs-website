import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Container } from "@/components/ui/container";
import { homeEcosystem as visibleEcosystem } from "@/content/partner-ecosystem";

/**
 * Names from the preserved partner pages, resolved against content/partner-ecosystem.ts; no invented
 * badges for missing artwork. Since 2026-09-15 16:40 the section sits on ambient footage under the
 * 20% black veil and the `.on-video` palette, and every tile is a `.glass-liquid` panel (iOS 26
 * "Liquid Glass"): clear, refractive, light-leaning so the marks keep their contrast.
 */
export function HomePartners() {
  return (
    <section
      id="partners"
      data-partners
      aria-labelledby="home-partners-title"
      className="on-video relative overflow-hidden border-y border-border-subtle bg-surface py-14 md:py-20"
    >
      <AmbientVideo src="/video/partners-office-720.mp4" poster="/video/partners-office-poster.jpg" />
      <div aria-hidden className="video-veil pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gold">Our ecosystem</p>
            <h2 id="home-partners-title" className="mt-3 max-w-2xl text-h2 font-semibold">
              Our partners &amp; technology ecosystem.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">
              Enterprise applications, cloud and specialist technologies, brought together around your business.
            </p>
          </div>
          <Link
            href="/partners/"
            className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-gold hover:underline"
          >
            Explore our partners <ArrowUpRight aria-hidden size={18} />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {visibleEcosystem.map((partner) => (
            <li
              key={partner.name}
              className="glass-liquid flex min-h-28 flex-col items-center justify-center gap-3 px-4 py-5 text-logo-foreground"
            >
              {partner.logo ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt=""
                    width={112}
                    height={40}
                    loading="lazy"
                    className="h-10 w-28 object-contain"
                  />
                  <span className="text-xs font-medium">{partner.name}</span>
                </>
              ) : (
                <span className="text-xl font-semibold tracking-tight">{partner.name}</span>
              )}
            </li>
          ))}
          <li className="glass-liquid text-logo-foreground">
            <Link
              href="/partners/"
              className="flex h-full min-h-28 items-center justify-center gap-2 p-5 text-sm font-semibold hover:underline"
            >
              Full ecosystem <ArrowUpRight size={18} aria-hidden />
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
