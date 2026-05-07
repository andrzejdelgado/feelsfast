"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { seededGamma } from "@/lib/jitter";
import {
  TILE_LOAD_P50_MS,
  VIEWPORT,
  tileColor,
  tileKey,
} from "./config";

type Props = {
  centerX: number;
  centerY: number;
  /** Bumped on every Replay so the demo state resets in lock-step with On. */
  seed?: number;
};

/**
 * Naive map view (controlled by `MapInteractionsCard`). The card owns
 * `centerX`/`centerY` and shares them with both Off and On panels via
 * props — one set of pan controls, two panels reacting in lock-step.
 *
 * The "naive" treatment: every pan triggers a "Loading tiles…" overlay
 * that gates the visible shift until the simulated tile load finishes.
 * The viewport feels stop-and-go.
 */
export function NaiveMapInteractions({ centerX, centerY, seed = 1 }: Props) {
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Whenever the centre changes, kick off a "tile load" delay before
  // we let the panel feel "settled". The total delay is seeded so Off
  // and On always settle on the same wall-clock moment.
  useEffect(() => {
    setPending(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setPending(false),
      seededGamma(seed + (centerX * 73 + centerY * 31), TILE_LOAD_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [centerX, centerY, seed]);

  const tiles: { x: number; y: number; key: string }[] = [];
  const half = Math.floor(VIEWPORT / 2);
  for (let dy = -half; dy < VIEWPORT - half; dy++) {
    for (let dx = -half; dx < VIEWPORT - half; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      tiles.push({ x, y, key: tileKey(x, y) });
    }
  }

  return (
    <div
      className="relative grid w-full overflow-hidden rounded-md border border-border bg-muted"
      style={{ gridTemplateColumns: `repeat(${VIEWPORT}, 1fr)` }}
    >
      {tiles.map((t) => (
        <div
          key={t.key}
          className="aspect-square"
          style={{ backgroundColor: tileColor(t.x, t.y) }}
        />
      ))}
      {pending ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-background/70 text-xs text-muted-foreground">
          Loading tiles…
        </div>
      ) : null}
    </div>
  );
}
