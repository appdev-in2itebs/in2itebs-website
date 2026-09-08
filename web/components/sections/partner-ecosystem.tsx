/* eslint-disable @next/next/no-img-element */
import type { PartnerCategory } from "@/content/partner-ecosystem";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** Four partner-category blocks — title, intro and partner list.
 *  Shows a logo image where the asset exists, otherwise a styled name chip;
 *  appends a small note pill when present. */
export function PartnerEcosystem({ categories }: { categories: PartnerCategory[] }) {
  return (
    <Stagger className="grid gap-5 md:grid-cols-2">
      {categories.map((category) => (
        <StaggerItem key={category.title} className="h-full">
          <div className="flex h-full flex-col rounded-xl2 bg-white p-7 shadow-soft ring-1 ring-navy/5">
            <h3 className="font-serif text-h3 font-bold text-navy">{category.title}</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-grey-muted">{category.intro}</p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {category.partners.map((partner) => (
                <li key={partner.name}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-off-white px-3.5 py-1.5 text-sm font-medium text-navy ring-1 ring-navy/10">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-5 w-auto max-w-[88px] object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span>{partner.name}</span>
                    )}
                    {partner.note ? (
                      <span className="rounded-full bg-blue-pale/40 px-2 py-0.5 text-xs font-semibold text-blue-accent">
                        {partner.note}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
