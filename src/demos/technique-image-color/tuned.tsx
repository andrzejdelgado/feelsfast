"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TILES, TILE_P50_MS } from "./config";

/**
 * Tuned — every tile starts as a solid block of the image's dominant
 * colour from frame zero (in production: a 1×1 base64 LQIP inlined
 * in the HTML). When the real image arrives, it crossfades over
 * 350 ms on top of the colour block.
 *
 * Per-tile durations are seeded so each Off tile pairs with its On
 * counterpart — same load time, different visual treatment of the
 * intervening wait.
 */
export function TunedImageColor({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutsRef.current = TILES.map((tile, i) =>
      setTimeout(() => {
        setLoaded((prev) => {
          const next = new Set(prev);
          next.add(tile.id);
          return next;
        });
      }, seededGamma(seed + i * 1009, TILE_P50_MS)),
    );
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [seed]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {TILES.map((tile) => {
        const isLoaded = loaded.has(tile.id);
        return (
          <div
            key={tile.id}
            aria-label={tile.label}
            aria-busy={!isLoaded}
            className="relative aspect-square w-full overflow-hidden rounded"
            style={{ backgroundColor: tile.predominantColor }}
          >
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 transition-opacity duration-[350ms] ease-out motion-reduce:duration-[150ms]",
                isLoaded ? "opacity-100" : "opacity-0",
              )}
              style={{ backgroundImage: tile.gradient }}
            />
          </div>
        );
      })}
    </div>
  );
}
