import {
  Boxes,
  Cloud,
  Users,
  Code2,
  Car,
  ShoppingBasket,
  HeartPulse,
  Shirt,
  Mountain,
  FlaskConical,
  HardHat,
  Building2,
  Banknote,
  Landmark,
  Briefcase,
  Zap,
  RadioTower,
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

/** Glass hero media panel — a large sector/practice icon over a faint node texture
 *  and the converging-triangles motif. Brand-coherent stand-in until/where real
 *  photography is supplied (the slot also accepts a photo via PageHero's media prop). */
export function HeroMotif({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-feature)-0.5rem)] bg-surface-subtle">
      {/* dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(oklch(var(--color-gold) / 0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* converging-triangle motif */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.25]">
        <div className="absolute inset-0 origin-center rotate-45 border-[36px] border-gold-soft" />
      </div>
      {/* ambient orbs */}
      <div aria-hidden className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-action/[0.14] blur-[90px]" />
      <div
        aria-hidden
        className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-gold-soft/[0.35] blur-[100px]"
      />
      <div className="relative flex h-full w-full items-center justify-center">
        <Icon size={104} strokeWidth={1} className="text-gold" aria-hidden />
      </div>
    </div>
  );
}
