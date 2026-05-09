import { cn } from "@/lib/utils";

/**
 * Race-car icon — renders the unmodified bitmap from `/public/car.png`
 * via an `<img>`, preserving every original pixel. A CSS hue / saturation
 * filter shifts the bitmap's reds toward the platform accent (Claude
 * orange) while keeping the relative light / dark structure intact, so
 * the car carries the brand palette without the source pixels being
 * re-authored.
 *
 * Two animation layers sell speed without modifying the bitmap:
 *   - five staggered wind streaks behind the car (left of the bitmap)
 *   - per-wheel diagonal spoke pixels overlaid on top of the bitmap, two
 *     frames alternating to suggest a spinning hub
 *
 * Loops forever and intentionally does not honour
 * `prefers-reduced-motion` (deliberate request).
 */
export function RaceCarIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={style}
      aria-hidden
    >
      {/* Wind streaks — animated SVG layer behind the car */}
      <svg
        viewBox="0 0 96 48"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        style={{ shapeRendering: "crispEdges", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="20" width="8"  height="2" fill="#5e5d59" className="rc-wind-1" />
        <rect x="0" y="24" width="12" height="2" fill="#5e5d59" className="rc-wind-2" />
        <rect x="0" y="28" width="8"  height="2" fill="#5e5d59" className="rc-wind-3" />
        <rect x="0" y="32" width="12" height="2" fill="#5e5d59" className="rc-wind-4" />
        <rect x="0" y="36" width="8"  height="2" fill="#5e5d59" className="rc-wind-5" />
      </svg>

      {/* Car bitmap — unmodified pixels, accent-shifted via CSS filter */}
      <img
        src="/car.png"
        alt=""
        className="relative size-full"
        style={{
          imageRendering: "pixelated",
          objectFit: "contain",
          filter: "hue-rotate(18deg) saturate(0.78) brightness(1.05)",
        }}
      />

      {/* Wheel spoke overlay — on top of the bitmap, two diagonal frames */}
      <svg
        viewBox="0 0 96 48"
        className="pointer-events-none absolute inset-0 size-full"
        style={{ shapeRendering: "crispEdges" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frame A — top-left + bottom-right diagonal */}
        <g className="rc-wheels-a">
          {/* Rear wheel */}
          <rect x="20" y="33" width="2" height="2" fill="#141413" />
          <rect x="24" y="37" width="2" height="2" fill="#141413" />
          {/* Front wheel */}
          <rect x="72" y="33" width="2" height="2" fill="#141413" />
          <rect x="76" y="37" width="2" height="2" fill="#141413" />
        </g>
        {/* Frame B — top-right + bottom-left diagonal */}
        <g className="rc-wheels-b">
          {/* Rear wheel */}
          <rect x="24" y="33" width="2" height="2" fill="#141413" />
          <rect x="20" y="37" width="2" height="2" fill="#141413" />
          {/* Front wheel */}
          <rect x="76" y="33" width="2" height="2" fill="#141413" />
          <rect x="72" y="37" width="2" height="2" fill="#141413" />
        </g>
      </svg>

      <style>{`
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
        .rc-wind-1 { animation: rc-wind 180ms steps(1) infinite; }
        .rc-wind-2 { animation: rc-wind 180ms steps(1) infinite; animation-delay: -36ms; }
        .rc-wind-3 { animation: rc-wind 180ms steps(1) infinite; animation-delay: -72ms; }
        .rc-wind-4 { animation: rc-wind 180ms steps(1) infinite; animation-delay: -108ms; }
        .rc-wind-5 { animation: rc-wind 180ms steps(1) infinite; animation-delay: -144ms; }
        @keyframes rc-wind {
          0%   { opacity: 1;   transform: translateX(0); }
          25%  { opacity: 0.7; transform: translateX(-15%); }
          50%  { opacity: 0.4; transform: translateX(-30%); }
          75%  { opacity: 0.15; transform: translateX(-45%); }
          100% { opacity: 0;   transform: translateX(-60%); }
        }
      `}</style>
    </span>
  );
}
