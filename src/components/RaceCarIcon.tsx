import { cn } from "@/lib/utils";

/**
 * Race-car icon — renders the unmodified bitmap from `/public/car.png`
 * via an `<img>`, preserving every original pixel. A CSS hue / saturation
 * filter shifts the bitmap's reds toward the platform accent (Claude
 * orange) while keeping the relative light / dark structure intact, so
 * the car carries the brand palette without the source pixels being
 * re-authored.
 *
 * Animated wind streaks sit on a separate SVG layer behind the bitmap to
 * suggest motion. The car itself is static (no bounce, no wheel spin —
 * those would require sprite-sheet extraction of the bitmap, which would
 * mean re-authoring it).
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
        viewBox="0 0 16 16"
        className="absolute inset-0 size-full"
        style={{ shapeRendering: "crispEdges", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="7" width="3" height="1" fill="#5e5d59" className="rc-wind-1" />
        <rect x="0" y="8" width="2" height="1" fill="#5e5d59" className="rc-wind-2" />
        <rect x="0" y="9" width="3" height="1" fill="#5e5d59" className="rc-wind-3" />
      </svg>

      {/* Car bitmap — unmodified pixels, accent-shifted via CSS filter */}
      <img
        src="/car.png"
        alt=""
        className="relative size-full"
        style={{
          imageRendering: "pixelated",
          objectFit: "contain",
          // Shift the bitmap's reds toward Claude orange while preserving
          // the relative light/dark structure of every pixel.
          filter: "hue-rotate(18deg) saturate(0.78) brightness(1.05)",
        }}
      />

      <style>{`
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
    </span>
  );
}
