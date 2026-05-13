"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — the AI-presence cue, now a single SVG path that morphs
 * vertex-to-vertex through dot → 6-arm star → dot → hexagon → dot,
 * looping. Same 12-point structure on each shape so the SMIL
 * `<animate>` interpolator tweens point-for-point. Calmer than a
 * spinner, more present than a static dot — the modern "the agent
 * is here" signal used between tool calls and after a user message.
 *
 * 2.8 s per cycle; four 700 ms eased legs.
 */
export function TunedPulsingOrb({ seed = 1 }: { seed?: number }) {
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
    <div className="space-y-2">
      {loaded ? (
        <p className="text-sm leading-relaxed text-foreground">
          Yes — that&apos;s exactly the right framing.
        </p>
      ) : (
        <div className="flex items-center gap-1" aria-label="Working">
          <MorphingOrb />
          <span className="text-sm text-muted-foreground">Working</span>
        </div>
      )}
    </div>
  );
}

/**
 * Morphing presence indicator — dot → 6-arm star → dot → hexagon →
 * dot. All three shapes are 12-point paths sharing the same vertex
 * structure so SMIL's spline interpolator tweens cleanly between them.
 */
function MorphingOrb() {
  // 12 points each, 30° increments around centre (12, 12).
  const DOT =
    "M12 9 L13.5 9.4 L14.6 10.5 L15 12 L14.6 13.5 L13.5 14.6 L12 15 L10.5 14.6 L9.4 13.5 L9 12 L9.4 10.5 L10.5 9.4 Z";
  const STAR =
    "M12 6 L13.1 10.09 L17.2 9 L14.2 12 L17.2 15 L13.1 13.91 L12 18 L10.9 13.91 L6.8 15 L9.8 12 L6.8 9 L10.9 10.09 Z";
  const HEX =
    "M12 6.8 L15 6.8 L16.5 9.4 L18 12 L16.5 14.6 L15 17.2 L12 17.2 L9 17.2 L7.5 14.6 L6 12 L7.5 9.4 L9 6.8 Z";

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-[25px] text-primary"
      fill="currentColor"
    >
      <path d={DOT}>
        <animate
          attributeName="d"
          dur="0.93s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
          values={`${DOT};${STAR};${DOT};${HEX};${DOT}`}
        />
      </path>
    </svg>
  );
}
