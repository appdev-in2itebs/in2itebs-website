import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AutoTrack } from "@/components/motion/auto-track";
import { testimonials, testimonialVideos } from "@/content/testimonials";

/**
 * "What People Say" as on in2itebs.com (copied 1:1 on 2026-09-16): the five written client quotes
 * with their people, then the five video testimonies linking straight to YouTube. Both rows are
 * automatic scroll-snap tracks with no controls; the quotes go one at a time, the videos three up.
 * Thumbnails and avatars are the live site's own images, self-hosted under public/testimonials.
 */
export function ClientStories() {
  return (
    <section
      data-client-stories
      aria-labelledby="client-stories-title"
      className="theme-on-brand relative overflow-hidden bg-brand py-14 text-on-brand md:py-20"
    >
      <Container>
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-on-brand">Clients feedback</p>
          <h2 id="client-stories-title" className="mt-3 text-h2 font-semibold text-on-brand">
            What People Say
          </h2>
        </div>
        <AutoTrack label="Client testimonials" interval={7000} focusable>
          {testimonials.map((story) => (
            <li key={story.slug} data-quote={story.slug} className="w-full shrink-0 snap-start">
              <figure className="glass-card mx-auto flex max-w-4xl flex-col gap-6 rounded-surface p-6 sm:flex-row sm:items-start md:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.avatar}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-glass-line/40"
                />
                <div className="min-w-0">
                  <blockquote className="text-base leading-relaxed text-on-brand/90 md:text-lg">
                    {story.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold uppercase tracking-[0.08em] text-on-brand">{story.name}</span>
                    <span className="text-on-brand/70">, {story.role}</span>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </AutoTrack>
        <AutoTrack label="Video testimonies" className="mt-6">
          {testimonialVideos.map((video, index) => (
            <li key={video.id} className="w-[min(82vw,22rem)] shrink-0 snap-start">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testimonial-video={video.id}
                className="glass-card group block overflow-hidden rounded-surface"
              >
                <span className="relative block aspect-video bg-logo-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/testimonials/${video.id}.jpg`}
                    alt=""
                    width={960}
                    height={540}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                    <span className="glass-pill h-12 w-12 justify-center p-0 text-on-brand">
                      <Play size={18} aria-hidden />
                    </span>
                  </span>
                </span>
                <span className="block p-4">
                  <span className="line-clamp-2 text-sm font-semibold text-on-brand">{video.title}</span>
                  <span className="mt-2 block text-xs text-on-brand/70">Watch on YouTube</span>
                </span>
              </a>
            </li>
          ))}
        </AutoTrack>
      </Container>
    </section>
  );
}
