import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pillars } from "@/content/nav";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Accent left-border per pillar (Design Plan):
 *  Platform=navy, Advisory=accent-blue, Digital/Data/AI=light-blue, Delivery=sand. */
const accentBySlug: Record<string, string> = {
  "platform-services": "border-navy",
  "advisory-services": "border-blue-accent",
  "digital-data-ai": "border-blue-light",
  "delivery-excellence": "border-sand",
};

/** The four pillars rendered as accent-edged cards — the three-pillar
 *  navigation block used on hub and overview pages. */
export function PillarCards() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-2">
      {pillars.map((pillar) => (
        <StaggerItem key={pillar.slug} className="h-full">
          <Link
            href={pillar.href}
            className={cn(
              "group flex h-full flex-col rounded-xl2 border-l-4 bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent/50",
              accentBySlug[pillar.slug] ?? "border-navy",
            )}
          >
            <h3 className="font-serif text-h3 font-bold text-navy">{pillar.name}</h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-grey-muted">{pillar.tagline}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-accent">
              Explore
              <ArrowRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
