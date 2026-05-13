/**
 * Animated hero emblem for the Pattern Creator teaser.
 *
 * Same 36-cell diamond tessellation as the lessless.app logo
 * (squares rotated -45° packed into a larger diamond). Every cell
 * runs the same Matrix-rain keyframe — base 0.15 → peak 1.0 → trail
 * → back to base — so every dot "drops" identically; the only
 * per-cell variable is `animation-delay`, driven by column and row
 * position so heads sweep top-to-bottom through each column with
 * columns offset at scrambled phases. Under reduced motion the
 * animation is suppressed and the cells revert to the lessless
 * static design (mix of 1.0 and 0.3 base opacities preserved as
 * the inline fallback).
 *
 * No client boundary required — animation is pure CSS keyframes.
 */

type Cell = readonly [number, number, number?];

const CELLS: readonly Cell[] = [
  [14.5564, 1.85742],
  [11.7279, 4.68555],
  [17.3848, 4.68555],
  [8.89954, 7.51562, 0.3],
  [14.5564, 7.51562],
  [20.2133, 7.51562, 0.3],
  [6.07104, 10.3438, 0.3],
  [11.7279, 10.3438, 0.3],
  [17.3848, 10.3438, 0.3],
  [23.0416, 10.3438, 0.3],
  [3.24268, 13.1719],
  [8.89954, 13.1719],
  [14.5564, 13.1719],
  [20.2133, 13.1719, 0.3],
  [25.8701, 13.1719],
  [0.414185, 16],
  [6.07104, 16],
  [11.7279, 16],
  [17.3848, 16],
  [23.0416, 16],
  [28.6985, 16],
  [3.24268, 18.8281],
  [8.89954, 18.8281, 0.3],
  [14.5564, 18.8281],
  [20.2133, 18.8281, 0.3],
  [25.8701, 18.8281],
  [6.07104, 21.6562, 0.3],
  [11.7279, 21.6562, 0.3],
  [17.3848, 21.6562, 0.3],
  [23.0416, 21.6562, 0.3],
  [8.89954, 24.4844, 0.3],
  [14.5564, 24.4844],
  [20.2133, 24.4844, 0.3],
  [11.7279, 27.3145],
  [17.3848, 27.3145],
  [14.5564, 30.1426],
];

const CYCLE_MS = 3500;
const ROW_STEP_MS = 220;
// Prime multiplier chosen so column phases scramble well under modulo —
// adjacent columns end up on opposite sides of the cycle, so the field
// reads as asynchronous rain rather than a left-to-right wave.
const COLUMN_PHASE_PRIME = 1097;

type PreparedCell = {
  x: number;
  y: number;
  baseOpacity: number;
  delayMs: number;
};

const PREPARED_CELLS: PreparedCell[] = (() => {
  const byColumn = new Map<string, Cell[]>();
  for (const cell of CELLS) {
    const key = cell[0].toFixed(3);
    const bucket = byColumn.get(key);
    if (bucket) bucket.push(cell);
    else byColumn.set(key, [cell]);
  }
  const xKeys = Array.from(byColumn.keys()).sort(
    (a, b) => parseFloat(a) - parseFloat(b),
  );
  const out: PreparedCell[] = [];
  xKeys.forEach((key, colIdx) => {
    const colCells = byColumn.get(key)!.sort((a, b) => a[1] - b[1]);
    const colPhase = (colIdx * COLUMN_PHASE_PRIME) % CYCLE_MS;
    colCells.forEach(([x, y, opacity], rowIdx) => {
      out.push({
        x,
        y,
        baseOpacity: opacity ?? 1,
        delayMs: (colPhase + rowIdx * ROW_STEP_MS) % CYCLE_MS,
      });
    });
  });
  return out;
})();

export function PatternEmblem() {
  return (
    <div className="relative">
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        className="h-28 w-28 text-primary"
        fill="currentColor"
      >
        {PREPARED_CELLS.map(({ x, y, baseOpacity, delayMs }, i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="2"
            height="2"
            rx="1"
            ry="1"
            transform={`rotate(-45 ${x} ${y})`}
            className="pe-matrix-cell motion-reduce:![animation:none]"
            style={
              {
                opacity: baseOpacity,
                animationDelay: `${delayMs}ms`,
                "--pe-base": String(baseOpacity),
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
      <style>{`
        .pe-matrix-cell {
          animation: pe-matrix-fall ${CYCLE_MS}ms ease-in-out infinite;
        }
        @keyframes pe-matrix-fall {
          0%, 100% { opacity: 0.15; }
          6%       { opacity: 1;    }
          16%      { opacity: 1;    }
          26%      { opacity: 0.65; }
          42%      { opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pe-matrix-cell { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
