"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import {
  PAN_STEP,
  TILE_LOAD_P50_MS,
  VIEWPORT,
  tileColor,
  tileKey,
} from "./config";

/**
 * Tuned map pan — the viewport shifts immediately on every press; tiles
 * the user has already seen render at full saturation; tiles that have
 * not finished loading render desaturated and 60 % opaque, then fade to
 * full as their simulated load completes. The pan controls are never
 * disabled.
 */
export function TunedMapInteractions() {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
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

  // Schedule load timers in an effect — never during render. Without
  // this, React fires "state update on a component that hasn't mounted
  // yet" because the setTimeout callbacks set state before the first
  // commit completes.
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    tiles.forEach(({ key }) => {
      if (loaded.has(key)) return;
      if (timeouts.has(key)) return;
      const id = setTimeout(() => {
        setLoaded((prev) => {
          if (prev.has(key)) return prev;
          const next = new Set(prev);
          next.add(key);
          return next;
        });
        timeouts.delete(key);
      }, gammaJitter(TILE_LOAD_P50_MS));
      timeouts.set(key, id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerX, centerY]);

  // Cleanup any in-flight timers on unmount.
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  const pan = (dx: number, dy: number) => {
    setCenterX((x) => x + dx);
    setCenterY((y) => y + dy);
  };

  return (
    <div className="space-y-2">
      <div
        className="relative grid w-full overflow-hidden rounded-md border border-border bg-muted"
        style={{
          gridTemplateColumns: `repeat(${VIEWPORT}, 1fr)`,
        }}
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
      <PanControls pan={pan} />
    </div>
  );
}

function PanControls({ pan }: { pan: (dx: number, dy: number) => void }) {
  const btn =
    "inline-flex size-7 items-center justify-center rounded border border-border bg-card text-foreground transition-colors hover:bg-secondary active:scale-[0.95]";
  return (
    <div className="grid w-fit grid-cols-3 gap-1">
      <span />
      <button
        type="button"
        aria-label="Pan up"
        onClick={() => pan(0, -PAN_STEP)}
        className={btn}
      >
        <ChevronUp aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan left"
        onClick={() => pan(-PAN_STEP, 0)}
        className={btn}
      >
        <ChevronLeft aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan right"
        onClick={() => pan(PAN_STEP, 0)}
        className={btn}
      >
        <ChevronRight aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan down"
        onClick={() => pan(0, PAN_STEP)}
        className={btn}
      >
        <ChevronDown aria-hidden className="size-4" />
      </button>
      <span />
    </div>
  );
}
