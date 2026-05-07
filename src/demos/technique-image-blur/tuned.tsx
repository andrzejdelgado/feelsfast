"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { HERO, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — a heavily blurred version of the same gradient fills the
 * slot from frame zero (in production: a 16×16 base-64 inline image
 * stretched up to fill the aspect-ratio with `filter: blur(20px)`).
 * When the real file lands, the blur transitions from 20 px to 0
 * over 350 ms.
 *
 * The dominant shapes and colour come through the blur, so the user
 * reads the photo as "almost there" before the file arrives. Same
 * mechanism Medium, Pinterest, Unsplash, and `next/image` with
 * `placeholder="blur"` use.
 */
export function TunedImageBlur({ seed = 1 }: { seed?: number }) {
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
        className={cn(
          "aspect-video w-full transition-[filter] duration-[350ms] ease-out motion-reduce:transition-none",
          loaded ? "[filter:blur(0)_saturate(1)]" : "[filter:blur(20px)_saturate(0.7)]",
        )}
        style={{ backgroundImage: HERO.gradient }}
      />
      <div className="px-3 py-2 text-xs text-muted-foreground">{HERO.alt}</div>
    </div>
  );
}
