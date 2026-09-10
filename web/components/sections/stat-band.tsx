import type { Stat } from "@/content/types";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/ui/count-up";

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <Stagger className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem key={s.label}>
          <div className="flex flex-col gap-1.5">
            <CountUp value={s.value} className="text-gradient-numeral text-[2.75rem] font-bold leading-none" />
            <span className="text-sm text-gold">{s.label}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
