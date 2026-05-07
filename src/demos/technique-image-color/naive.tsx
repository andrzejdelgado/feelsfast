"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TILES, TILE_P50_MS } from "./config";

/**
 * Naive — blank muted boxes until each tile's gradient lands. No
 * dominant-colour cue, no progressive reveal.
 */
export function NaiveImageColor({ seed = 1 }: { seed?: number }) {
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
            className="aspect-square w-full overflow-hidden rounded bg-muted"
            style={isLoaded ? { backgroundImage: tile.gradient } : undefined}
          />
        );
      })}
    </div>
  );
}
