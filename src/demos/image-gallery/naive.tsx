"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TILES, TILE_P50_MS } from "./config";

/**
 * Naive image gallery — every tile is an empty gray box until its image
 * "loads," then the colour snaps in. There is no progressive cue, no
 * placeholder content; the user stares at the layout while it backfills
 * tile by tile in arbitrary order.
 *
 * Per-tile durations are seeded so each Off tile pairs with its On
 * counterpart — same load time, different visual treatment of the
 * intervening wait.
 */
export function NaiveImageGallery({ seed = 1 }: { seed?: number }) {
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
            className="aspect-square w-full rounded"
            style={
              isLoaded
                ? { backgroundImage: tile.gradient }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
