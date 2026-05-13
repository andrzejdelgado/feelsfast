"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — no spinner. The word "Thinking…" is itself the cue: a
 * primary-coloured gradient sweeps left-to-right inside the letters.
 *
 * Implementation:
 *   - `background-image: linear-gradient(...)` with an oversize
 *     `background-size: 200% 100%`
 *   - `background-clip: text` + `color: transparent` so the gradient
 *     paints only inside the glyphs
 *   - `animation` cycles `background-position` at a calm 1.6 s
 *
 * Reduced-motion users see the same gradient at a fixed position —
 * the "alive" cue degrades to a primary-coloured label rather than
 * disappearing entirely.
 */
export function TunedThinkingGradient({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="rounded-md border border-border bg-background p-4">
      {loaded ? (
        <Response />
      ) : (
        <div className="flex items-baseline gap-1 text-sm font-medium">
          <span
            className="bg-clip-text text-transparent motion-reduce:animate-none"
            style={{
              backgroundImage:
                "linear-gradient(90deg, color-mix(in oklch, var(--primary) 25%, var(--muted-foreground)) 0%, var(--primary) 50%, color-mix(in oklch, var(--primary) 25%, var(--muted-foreground)) 100%)",
              backgroundSize: "200% 100%",
              animation: "thinking-sweep 1600ms linear infinite",
            }}
          >
            Thinking…
          </span>
          <style>{`
            @keyframes thinking-sweep {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

function Response() {
  return (
    <p className="text-sm leading-relaxed text-foreground">
      Yes — that&apos;s perceived performance.
    </p>
  );
}
