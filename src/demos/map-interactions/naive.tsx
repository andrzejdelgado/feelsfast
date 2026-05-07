"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import {
  PAN_STEP,
  TILE_LOAD_P50_MS,
  VIEWPORT,
  tileColor,
  tileKey,
} from "./config";

/**
 * Naive map pan — every pan disables the controls and shows a "Loading
 * tiles…" overlay while the new tiles are simulated. The viewport does
 * not shift until the load completes, so panning feels stop-and-go: the
 * cursor and the content are not coupled.
 */
export function NaiveMapInteractions() {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const pan = (dx: number, dy: number) => {
    if (pending) return;
    setPending(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => {
        setCenterX((x) => x + dx);
        setCenterY((y) => y + dy);
        setPending(false);
      },
      gammaJitter(TILE_LOAD_P50_MS),
    );
  };

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
    <div className="space-y-2">
      <div
        className="relative grid w-full overflow-hidden rounded-md border border-border bg-muted"
        style={{
          gridTemplateColumns: `repeat(${VIEWPORT}, 1fr)`,
        }}
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
      <PanControls pan={pan} disabled={pending} />
    </div>
  );
}

function PanControls({
  pan,
  disabled,
}: {
  pan: (dx: number, dy: number) => void;
  disabled: boolean;
}) {
  const btn =
    "inline-flex size-7 items-center justify-center rounded border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <div className="grid w-fit grid-cols-3 gap-1">
      <span />
      <button
        type="button"
        aria-label="Pan up"
        onClick={() => pan(0, -PAN_STEP)}
        disabled={disabled}
        className={btn}
      >
        <ChevronUp aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan left"
        onClick={() => pan(-PAN_STEP, 0)}
        disabled={disabled}
        className={btn}
      >
        <ChevronLeft aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan right"
        onClick={() => pan(PAN_STEP, 0)}
        disabled={disabled}
        className={btn}
      >
        <ChevronRight aria-hidden className="size-4" />
      </button>
      <span />
      <button
        type="button"
        aria-label="Pan down"
        onClick={() => pan(0, PAN_STEP)}
        disabled={disabled}
        className={btn}
      >
        <ChevronDown aria-hidden className="size-4" />
      </button>
      <span />
    </div>
  );
}
