/** Values render accurately in the initial HTML. Motion must never gate factual content. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  return <span className={className}>{value}</span>;
}
