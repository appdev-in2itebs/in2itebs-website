import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practices } from "@/content/nav";
import { Stagger, StaggerItem} from "@/components/motion/reveal";

export function PracticeGrid() {
  return (
    <Stagger className="grid gap-px overflow-hidden rounded-xl2 border border-navy/5 bg-navy/5 md:grid-cols-2">
      {practices.map((p) => (
        <StaggerItem key={p.slug} className="h-full">
          <Link
            href={p.href}
            className="group flex h-full flex-col justify-between gap-8 bg-white p-8 transition-colors duration-300 hover:bg-off-white md:p-10"
          >
            <div>
              <h3 className="font-serif text-h3 font-bold text-navy">{p.name}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-grey-muted">{p.tagline}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-accent">
              Explore this practice
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
