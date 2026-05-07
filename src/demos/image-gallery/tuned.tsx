"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TILES, TILE_P50_MS } from "./config";

/**
 * Tuned image gallery — every tile shows a heavily blurred low-quality
 * placeholder (same gradient, `filter: blur(20px) saturate(0.6)`) the
 * instant the layout renders. As each high-res "image" finishes loading,
 * the blur and desaturation transition to zero in 350 ms, fading the
 * placeholder up to its final state. The dominant colour tells the eye
 * what is coming, so the wait reads as resolution rather than absence.
 *
 * Per-tile durations are seeded so each Off tile pairs with its On
 * counterpart — same load time, different visual treatment of the
 * intervening wait.
 */
export function TunedImageGallery({ seed = 1 }: { seed?: number }) {
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
            className="aspect-square w-full overflow-hidden rounded"
          >
            <div
              className={cn(
                "size-full transition-[filter] duration-[350ms] ease-out motion-reduce:transition-none",
                isLoaded
                  ? "[filter:blur(0)_saturate(1)]"
                  : "[filter:blur(10px)_saturate(0.6)]",
              )}
              style={{ backgroundImage: tile.gradient }}
            />
          </div>
        );
      })}
    </div>
  );
}
