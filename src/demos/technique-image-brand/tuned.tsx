"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TILES, TILE_P50_MS } from "./config";

/**
 * Tuned — every tile ships with the brand monogram centred on a
 * neutral surface from frame zero. When the image arrives, it
 * crossfades over the monogram in 350 ms, replacing it.
 *
 * Use when you have no per-image dominant-color data — cold cache,
 * fresh content, third-party images. The brand mark says "this
 * surface is alive and ours" without claiming to know what each
 * image is.
 */
export function TunedImageBrand({ seed = 1 }: { seed?: number }) {
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
            className="relative grid aspect-square w-full place-items-center overflow-hidden rounded bg-secondary"
          >
            <span
              aria-hidden
              className={cn(
                "flex items-baseline gap-0.5 transition-opacity duration-[350ms] ease-out",
                isLoaded ? "opacity-0" : "opacity-100",
              )}
            >
              <span className="text-xs font-medium tracking-tight text-foreground">
                ff
              </span>
              <span className="font-mono text-[0.5rem] uppercase tracking-wider text-muted-foreground">
                .fyi
              </span>
            </span>
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
