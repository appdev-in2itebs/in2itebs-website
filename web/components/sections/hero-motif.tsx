import {
  Boxes, Cloud, Users, Code2, Car, ShoppingBasket, HeartPulse, Shirt, Mountain,
  FlaskConical, HardHat, Building2, Banknote, Landmark, Briefcase, Zap, RadioTower,
  type LucideIcon,
} from "lucide-react";

const practiceIcons: Record<string, LucideIcon> = {
  "sap-enterprise-solutions": Boxes,
  salesforce: Cloud,
  workday: Users,
  "application-development-managed-services": Code2,
};

const sectorIcons: Record<string, LucideIcon> = {
  automobiles: Car,
  fmcg: ShoppingBasket,
  "healthcare-life-sciences": HeartPulse,
  "textiles-apparel": Shirt,
  "metals-mining": Mountain,
  "chemicals-fertilizers": FlaskConical,
  "engineering-construction": HardHat,
  "real-estate": Building2,
  bfsi: Banknote,
  "government-psu": Landmark,
  "professional-services": Briefcase,
  "energy-utilities": Zap,
  "media-telecom": RadioTower,
};

export function practiceIcon(slug: string): LucideIcon {
  return practiceIcons[slug] ?? Boxes;
}
export function sectorIcon(slug: string): LucideIcon {
  return sectorIcons[slug] ?? Briefcase;
}

/** Navy hero media panel — a large sector/practice icon over a faint node texture
 *  and the converging-triangles motif. Brand-coherent stand-in until/where real
 *  photography is supplied (the slot also accepts a photo via PageHero's media prop). */
export function HeroMotif({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl3 theme-on-brand bg-brand">
      {/* dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(148,184,208,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* converging-triangle motif */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.12]">
        <div className="absolute inset-0 origin-center rotate-45 border-[36px] border-blue-light" />
      </div>
      {/* glow */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(63,117,163,0.45),transparent_60%)]" />
      <div className="relative flex h-full w-full items-center justify-center">
        <Icon size={104} strokeWidth={1} className="text-blue-light" aria-hidden />
      </div>
    </div>
  );
}
