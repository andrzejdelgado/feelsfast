"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { HERO, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — the image slot ships with the full feelsfast wordmark
 * centred from frame zero, sitting on a neutral surface. When the
 * actual image lands it crossfades over 350 ms on top, replacing
 * the wordmark.
 *
 * Use when you have no per-image dominant-colour data — cold cache,
 * fresh content, third-party images. The brand mark says "this
 * surface is alive and ours" without claiming to know what the
 * image is.
 */
export function TunedImageBrand({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div
        aria-label={HERO.alt}
        aria-busy={!loaded}
        className="relative grid aspect-video w-full place-items-center bg-secondary"
      >
        <span
          aria-hidden
          className={cn(
            "flex items-baseline gap-1 transition-opacity duration-[350ms] ease-out",
            loaded ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="text-2xl font-medium tracking-tight text-foreground">
            feelsfast
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
            .fyi
          </span>
        </span>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-[350ms] ease-out motion-reduce:duration-[150ms]",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: HERO.gradient }}
        />
      </div>
      <div className="px-3 py-2 text-xs text-muted-foreground">{HERO.alt}</div>
    </div>
  );
}
