"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import { HERO, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — the image's dominant colour fills the slot from frame zero
 * (in production this would be inlined as a data-uri at upload time;
 * here we use the precomputed hex). When the actual image "lands," it
 * crossfades over 350 ms, replacing the colour block with the real
 * gradient.
 *
 * The perception of "almost there" starts well before the file does:
 * the user sees the warm sunset hue immediately and reads it as the
 * image arriving, just out of resolution. By the time the gradient
 * crossfades in, they already know what the photo is.
 */
export function TunedImageColor() {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      {/* Two stacked layers: the dominant-colour block sits underneath,
          the real image fades in on top. */}
      <div
        aria-label={HERO.alt}
        aria-busy={!loaded}
        className="relative aspect-video w-full"
        style={{ backgroundColor: HERO.predominantColor }}
      >
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
