import { cn } from "@/lib/utils";

/**
 * Race-car icon — renders the unmodified bitmap from `/public/car.png`
 * via an `<img>`, preserving every original pixel. A CSS hue / saturation
 * filter shifts the bitmap's reds toward the platform accent (Claude
 * orange) while keeping the relative light / dark structure intact, so
 * the car carries the brand palette without the source pixels being
 * re-authored.
 *
 * Two animations sell speed without modifying the bitmap:
 *   - a tiny vertical jitter on the img (engine-vibration / high-RPM feel)
 *   - five staggered wind streaks behind the car, shorter and faster than
 *     a normal trail to read as "wind ripping past"
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
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        style={{ shapeRendering: "crispEdges", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="6" width="2" height="1" fill="#5e5d59" className="rc-wind-1" />
        <rect x="0" y="7" width="3" height="1" fill="#5e5d59" className="rc-wind-2" />
        <rect x="0" y="8" width="2" height="1" fill="#5e5d59" className="rc-wind-3" />
        <rect x="0" y="9" width="3" height="1" fill="#5e5d59" className="rc-wind-4" />
        <rect x="0" y="10" width="2" height="1" fill="#5e5d59" className="rc-wind-5" />
      </svg>

      {/* Car bitmap — unmodified pixels, accent-shifted via CSS filter, jitter via transform */}
      <img
        src="/car.png"
        alt=""
        className="relative size-full rc-shake"
        style={{
          imageRendering: "pixelated",
          objectFit: "contain",
          filter: "hue-rotate(18deg) saturate(0.78) brightness(1.05)",
        }}
      />

      <style>{`
        .rc-shake {
          animation: rc-shake 100ms steps(1) infinite;
        }
        @keyframes rc-shake {
          0%, 49.99% { transform: translateY(-1.5%); }
          50%, 100%  { transform: translateY(1.5%); }
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
