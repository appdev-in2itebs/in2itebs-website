import { cn } from "@/lib/utils";

/** Animated abstract data-network — navy + blue, no people. Brand-exact SVG
 *  (no licensing), CSS-animated (off main thread), reduced-motion safe. */
const nodes = [
  { x: 300, y: 300, r: 9 }, { x: 160, y: 140, r: 5 }, { x: 120, y: 300, r: 4 },
  { x: 180, y: 460, r: 6 }, { x: 320, y: 120, r: 5 }, { x: 460, y: 170, r: 6 },
  { x: 500, y: 320, r: 7 }, { x: 440, y: 470, r: 5 }, { x: 300, y: 500, r: 4 },
  { x: 250, y: 230, r: 4 }, { x: 380, y: 260, r: 5 }, { x: 360, y: 400, r: 4 },
  { x: 220, y: 360, r: 4 }, { x: 90, y: 200, r: 3 }, { x: 540, y: 440, r: 4 },
  { x: 420, y: 90, r: 3 },
];
const edges: [number, number][] = [
  [0, 9], [0, 10], [0, 11], [0, 12], [9, 1], [9, 2], [1, 4], [4, 15], [4, 5],
  [5, 6], [6, 7], [6, 14], [7, 8], [8, 11], [12, 3], [3, 2], [2, 13], [10, 5], [11, 7], [0, 5],
];

export function HeroGraphic({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <style>{`
        @keyframes ciPulse { 0%,100% { opacity:.4 } 50% { opacity:1 } }
        @keyframes ciDrift { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
        .ci-node { animation: ciPulse 4.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .ci-drift { animation: ciDrift 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .ci-node,.ci-drift { animation: none } }
      `}</style>
      <svg viewBox="0 0 600 600" className="h-full w-full" fill="none">
        <g className="ci-drift">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="#94B8D0" strokeWidth="1" strokeOpacity="0.28"
            />
          ))}
          {nodes.map((nd, i) => (
            <circle
              key={i}
              className="ci-node"
              cx={nd.x} cy={nd.y} r={nd.r}
              fill={i === 0 ? "#A3CBE6" : "#94B8D0"}
              style={{ animationDelay: `${(i % 8) * 0.35}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
