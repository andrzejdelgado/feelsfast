"use client";

import { ThumbsUp } from "lucide-react";

/**
 * Tuned — `:active` adds a 3 % scale-down and shifts to the primary
 * surface for the duration of the press. The CSS transition is short
 * (~120 ms ease-out) so the press registers within the Card-Moran-
 * Newell perceptual frame even if the underlying work takes longer.
 *
 * The trick is in the cost: this is *zero* JavaScript and zero
 * round-trip. It is the cheapest perceived-performance win on the
 * platform.
 */
export function TunedPressFeedback() {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-[transform,background-color,border-color,color] duration-120 ease-out hover:bg-secondary active:scale-[0.97] active:border-primary active:bg-primary/10 active:text-primary motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        <ThumbsUp className="size-4" aria-hidden />
        Like
      </button>
      <p className="text-xs text-muted-foreground">
        Press and hold. The button scales and shifts colour for as long as the
        press is held — purely CSS, zero JavaScript.
      </p>
    </div>
  );
}
