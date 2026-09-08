export interface Leader {
  name: string;
  title: string;
  bio: string;
  photo?: string; // /team/<file>; falls back to initials avatar when absent
}

/** Horizontal auto-scrolling leadership marquee (CSS-driven, pauses on hover, reduced-motion safe). */
export function LeadershipScroller({ leaders, duration = 60 }: { leaders: Leader[]; duration?: number }) {
  if (!leaders.length) return null;
  const row = [...leaders, ...leaders];
  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((l, i) => (
          <article
            key={`${l.name}-${i}`}
            className="flex w-[21rem] shrink-0 flex-col gap-4 rounded-xl2 border border-navy/5 bg-white p-7 shadow-soft"
          >
            <div className="flex items-center gap-4">
              {l.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={l.photo}
                  alt={l.name}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-navy/10"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-white"
                >
                  {l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
              <div className="flex flex-col">
                <h3 className="font-serif text-lg font-bold leading-tight text-navy">{l.name}</h3>
                <span className="label-caps text-blue-accent">{l.title}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-grey-muted">{l.bio}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
