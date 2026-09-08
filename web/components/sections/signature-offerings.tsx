import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { signatureOfferings } from "@/content/signature-offerings";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function SignatureOfferings() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3">
      {signatureOfferings.map((o) => (
        <StaggerItem key={o.slug} className="h-full">
          <Card bezel className="flex h-full flex-col gap-4">
            {o.metric ? <span className="label-caps text-blue-accent">{o.metric}</span> : null}
            <h3 className="font-serif text-h3 font-bold text-navy">{o.name}</h3>
            <p className="flex-1 text-[0.95rem] leading-relaxed text-grey-muted">{o.summary}</p>
            <Link
              href={o.href}
              className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-accent"
            >
              {o.cta}
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
