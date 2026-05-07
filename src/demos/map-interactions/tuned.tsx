"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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
  /** Bumped on every Replay so the demo state resets in lock-step with Off. */
  seed?: number;
};

/**
 * Tuned map view (controlled by `MapInteractionsCard`). The card owns
 * `centerX`/`centerY` and shares them with both Off and On panels via
 * props — one set of pan controls, two panels reacting in lock-step.
 *
 * The "tuned" treatment: the viewport shifts immediately on every
 * pan; tiles the user has already seen render at full saturation;
 * tiles that have not finished loading render desaturated and
 * 60 % opaque, then fade to full as their seeded simulated load
 * completes.
 */
export function TunedMapInteractions({ centerX, centerY, seed = 1 }: Props) {
  const [loaded, setLoaded] = useState<Set<string>>(new Set([tileKey(0, 0)]));
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  // Compute the visible tile set during render (pure).
  const tiles: { x: number; y: number; key: string }[] = [];
  const half = Math.floor(VIEWPORT / 2);
  for (let dy = -half; dy < VIEWPORT - half; dy++) {
    for (let dx = -half; dx < VIEWPORT - half; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      tiles.push({ x, y, key: tileKey(x, y) });
    }
  }

  // Schedule per-tile load timers in an effect — never during render.
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    tiles.forEach(({ x, y, key }) => {
      if (loaded.has(key)) return;
      if (timeouts.has(key)) return;
      const id = setTimeout(
        () => {
          setLoaded((prev) => {
            if (prev.has(key)) return prev;
            const next = new Set(prev);
            next.add(key);
            return next;
          });
          timeouts.delete(key);
        },
        seededGamma(seed + (x * 73 + y * 31), TILE_LOAD_P50_MS),
      );
      timeouts.set(key, id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerX, centerY, seed]);

  // Reset the loaded set when the seed changes (Replay).
  useEffect(() => {
    setLoaded(new Set([tileKey(0, 0)]));
    const timeouts = timeoutsRef.current;
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  }, [seed]);

  // Cleanup any in-flight timers on unmount.
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  return (
    <div
      className="relative grid w-full overflow-hidden rounded-md border border-border bg-muted"
      style={{ gridTemplateColumns: `repeat(${VIEWPORT}, 1fr)` }}
    >
      {tiles.map((t) => {
        const isLoaded = loaded.has(t.key);
        return (
          <div
            key={t.key}
            className={cn(
              "aspect-square transition-[opacity,filter] duration-300 ease-out motion-reduce:transition-none",
              isLoaded
                ? "opacity-100 [filter:saturate(1)]"
                : "opacity-60 [filter:saturate(0.5)]",
            )}
            style={{ backgroundColor: tileColor(t.x, t.y) }}
          />
        );
      })}
    </div>
  );
}
