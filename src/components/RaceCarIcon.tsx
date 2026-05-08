/**
 * Pixel-art race car as inline SVG. 16×16 viewBox, square aspect, sized
 * via the consumer's `className` (caller passes `size-[1em]` to match
 * font-size). Two-frame wheel cycle (160 ms) plus a one-pixel body
 * bounce (220 ms) — animations run regardless of `prefers-reduced-motion`
 * by deliberate choice.
 *
 * Colours map onto the platform palette (Claude orange + ivory + near-
 * black); shape-rendering is crispEdges so the pixels stay pixels at
 * every display size.
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
      style={{ shapeRendering: "crispEdges", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="rc-body">
        {/* cockpit roof */}
        <rect x="6" y="3" width="4" height="1" fill="#d97757" />
        {/* cockpit window row */}
        <rect x="5" y="4" width="1" height="1" fill="#d97757" />
        <rect x="6" y="4" width="4" height="1" fill="#faf9f5" />
        <rect x="10" y="4" width="1" height="1" fill="#d97757" />
        {/* body upper (narrowing toward the cockpit) */}
        <rect x="3" y="5" width="10" height="1" fill="#d97757" />
        {/* body main */}
        <rect x="2" y="6" width="12" height="2" fill="#d97757" />
        {/* body shadow stripe (sense of weight) */}
        <rect x="2" y="8" width="12" height="1" fill="#b54f30" />
      </g>

      {/* Wheels — Frame A: horizontal spoke */}
      <g className="rc-wheels-a">
        {/* left wheel — outer ring */}
        <rect x="4" y="9" width="2" height="1" fill="#141413" />
        <rect x="3" y="10" width="4" height="2" fill="#141413" />
        <rect x="4" y="12" width="2" height="1" fill="#141413" />
        {/* left wheel — horizontal spoke */}
        <rect x="4" y="10" width="2" height="1" fill="#faf9f5" />

        {/* right wheel — outer ring */}
        <rect x="10" y="9" width="2" height="1" fill="#141413" />
        <rect x="9" y="10" width="4" height="2" fill="#141413" />
        <rect x="10" y="12" width="2" height="1" fill="#141413" />
        {/* right wheel — horizontal spoke */}
        <rect x="10" y="10" width="2" height="1" fill="#faf9f5" />
      </g>

      {/* Wheels — Frame B: vertical spoke (rotated) */}
      <g className="rc-wheels-b">
        {/* left wheel — outer ring */}
        <rect x="4" y="9" width="2" height="1" fill="#141413" />
        <rect x="3" y="10" width="4" height="2" fill="#141413" />
        <rect x="4" y="12" width="2" height="1" fill="#141413" />
        {/* left wheel — vertical spoke */}
        <rect x="4" y="10" width="1" height="2" fill="#faf9f5" />

        {/* right wheel — outer ring */}
        <rect x="10" y="9" width="2" height="1" fill="#141413" />
        <rect x="9" y="10" width="4" height="2" fill="#141413" />
        <rect x="10" y="12" width="2" height="1" fill="#141413" />
        {/* right wheel — vertical spoke */}
        <rect x="10" y="10" width="1" height="2" fill="#faf9f5" />
      </g>

      <style>{`
        .rc-body {
          animation: rc-bounce 220ms steps(1) infinite;
          transform-origin: center;
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
      `}</style>
    </svg>
  );
}
