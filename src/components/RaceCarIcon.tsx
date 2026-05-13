import { cn } from "@/lib/utils";

/**
 * Race-car icon — renders the unmodified bitmap from `/public/car.png`
 * via an `<img>`, preserving every original pixel. A `sepia → hue-rotate
 * → saturate` filter chain collapses the bitmap's full palette into the
 * Claude-orange / AI-gradient family: sepia first replaces all chroma
 * with a single brown-orange hue, then hue-rotate shifts that hue to
 * sit on top of Claude orange (#d97757). Result — the wheels (originally
 * near-black), the body (originally red), and the highlights all read as
 * shades of orange, so the car lives entirely inside the brand accent
 * palette rather than carrying its bitmap's incidental greys.
 *
 * One animation layer sells speed without modifying the bitmap: five
 * staggered wind streaks behind the car (left of the bitmap), filled in
 * a peach tone sampled from the AI page's gradient (#ecaa89).
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
        <rect x="0" y="20" width="8"  height="2" fill="#ecaa89" className="rc-wind-1" />
        <rect x="0" y="24" width="12" height="2" fill="#ecaa89" className="rc-wind-2" />
        <rect x="0" y="28" width="8"  height="2" fill="#ecaa89" className="rc-wind-3" />
        <rect x="0" y="32" width="12" height="2" fill="#ecaa89" className="rc-wind-4" />
        <rect x="0" y="36" width="8"  height="2" fill="#ecaa89" className="rc-wind-5" />
      </svg>

      {/* Car bitmap — unmodified pixels, accent-shifted via CSS filter */}
      <img
        src="/car.png"
        alt=""
        className="relative size-full"
        style={{
          imageRendering: "pixelated",
          objectFit: "contain",
          filter:
            "sepia(1) saturate(2.6) hue-rotate(-18deg) brightness(1.08)",
        }}
      />

      <style>{`
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
