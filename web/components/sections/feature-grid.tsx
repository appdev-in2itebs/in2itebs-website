import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  body?: string;
  bullets?: string[];
}

/** Responsive grid of feature cards. Used by practice clusters, industry capabilities,
 *  delivery sections — the workhorse content block. */
export function FeatureGrid({
  features,
  columns = 3,
  bezel = false,
  className,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  bezel?: boolean;
  className?: string;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <Stagger className={cn("grid gap-5", cols, className)}>
      {features.map((f) => (
        <StaggerItem key={f.title} className="h-full">
          <Card bezel={bezel} className="h-full">
            <h3 className="text-h3 font-bold text-foreground">{f.title}</h3>
            {f.body ? <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground-muted">{f.body}</p> : null}
            {f.bullets?.length ? (
              <ul className="mt-4 space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-foreground-muted">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-action" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
