/**
 * Pixel-art sports-car icon as inline SVG. 16×16 viewBox, sized via the
 * consumer's `className` (caller passes `size-[1em]` to match font-
 * size). Three concurrent animations — body bounce, two-frame wheel
 * cycle, and staggered wind streaks behind the car — all running on
 * `steps(1)` keyframes for the frame-flip pixel-art feel.
 *
 * Loops forever and intentionally does not honour
 * `prefers-reduced-motion` (deliberate request).
 *
 * Palette is purple-cyan-silver to read as a sports-car illustration
 * rather than a brand element; wind streaks are muted-foreground.
 * `shape-rendering: crispEdges` keeps the pixels crisp at every
 * display size.
 */
export function RaceCarIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      style={{ shapeRendering: "crispEdges", overflow: "visible", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wind streaks — left of the car, suggest motion */}
      <g>
        <rect x="0" y="7" width="3" height="1" fill="#5e5d59" className="rc-wind-1" />
        <rect x="0" y="8" width="2" height="1" fill="#5e5d59" className="rc-wind-2" />
        <rect x="0" y="9" width="3" height="1" fill="#5e5d59" className="rc-wind-3" />
      </g>

      {/* Body group — bounces */}
      <g className="rc-body">
        {/* Roof */}
        <rect x="6" y="5" width="3" height="1" fill="#7c4cd8" />

        {/* Windshield row — pillars + glass */}
        <rect x="5" y="6" width="1" height="1" fill="#7c4cd8" />
        <rect x="6" y="6" width="3" height="1" fill="#b9e7f0" />
        <rect x="9" y="6" width="1" height="1" fill="#7c4cd8" />

        {/* Body upper (slightly narrower; ends at col 14) */}
        <rect x="2" y="7" width="13" height="1" fill="#7c4cd8" />

        {/* Body main (full width, ends at col 15 for pointed front) */}
        <rect x="1" y="8" width="15" height="1" fill="#7c4cd8" />

        {/* Body lower / shadow stripe (narrower for taper) */}
        <rect x="2" y="9" width="12" height="1" fill="#4d2a8c" />
      </g>

      {/* Wheels — Frame A: horizontal spoke */}
      <g className="rc-wheels-a">
        {/* Rear wheel — outer ring */}
        <rect x="2" y="10" width="2" height="1" fill="#141413" />
        <rect x="1" y="11" width="4" height="2" fill="#141413" />
        <rect x="2" y="13" width="2" height="1" fill="#141413" />
        {/* Rear wheel — silver hub, horizontal */}
        <rect x="2" y="11" width="2" height="1" fill="#b8bec4" />

        {/* Front wheel — outer ring */}
        <rect x="12" y="10" width="2" height="1" fill="#141413" />
        <rect x="11" y="11" width="4" height="2" fill="#141413" />
        <rect x="12" y="13" width="2" height="1" fill="#141413" />
        {/* Front wheel — silver hub, horizontal */}
        <rect x="12" y="11" width="2" height="1" fill="#b8bec4" />
      </g>

      {/* Wheels — Frame B: vertical spoke */}
      <g className="rc-wheels-b">
        {/* Rear wheel — outer ring */}
        <rect x="2" y="10" width="2" height="1" fill="#141413" />
        <rect x="1" y="11" width="4" height="2" fill="#141413" />
        <rect x="2" y="13" width="2" height="1" fill="#141413" />
        {/* Rear wheel — silver hub, vertical */}
        <rect x="2" y="11" width="1" height="2" fill="#b8bec4" />

        {/* Front wheel — outer ring */}
        <rect x="12" y="10" width="2" height="1" fill="#141413" />
        <rect x="11" y="11" width="4" height="2" fill="#141413" />
        <rect x="12" y="13" width="2" height="1" fill="#141413" />
        {/* Front wheel — silver hub, vertical */}
        <rect x="12" y="11" width="1" height="2" fill="#b8bec4" />
      </g>

      <style>{`
        .rc-body {
          animation: rc-bounce 220ms steps(1) infinite;
        }
        @keyframes rc-bounce {
          0%, 49.99% { transform: translateY(0); }
          50%, 100%  { transform: translateY(-6.25%); }
        }
        .rc-wheels-a { animation: rc-flicker-a 160ms steps(1) infinite; }
        .rc-wheels-b { animation: rc-flicker-b 160ms steps(1) infinite; }
        @keyframes rc-flicker-a {
          0%, 49.99% { opacity: 1; }
          50%, 100%  { opacity: 0; }
        }
        @keyframes rc-flicker-b {
          0%, 49.99% { opacity: 0; }
          50%, 100%  { opacity: 1; }
        }
        .rc-wind-1 { animation: rc-wind 240ms steps(1) infinite; }
        .rc-wind-2 { animation: rc-wind 240ms steps(1) infinite; animation-delay: -80ms; }
        .rc-wind-3 { animation: rc-wind 240ms steps(1) infinite; animation-delay: -160ms; }
        @keyframes rc-wind {
          0%   { opacity: 1;   transform: translateX(0); }
          33%  { opacity: 0.6; transform: translateX(-12.5%); }
          66%  { opacity: 0.2; transform: translateX(-25%); }
          100% { opacity: 0;   transform: translateX(-25%); }
        }
      `}</style>
    </svg>
  );
}
