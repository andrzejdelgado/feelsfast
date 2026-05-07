"use client";

import { ThumbsUp } from "lucide-react";

/**
 * Naive — no `:active` styling. The button looks identical when
 * pressed, idle, or hovered. The user gets zero acknowledgement of the
 * press itself; the only signal is the result.
 */
export function NaivePressFeedback() {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-secondary"
      >
        <ThumbsUp className="size-4" aria-hidden />
        Like
      </button>
      <p className="text-xs text-muted-foreground">
        Press the button. Notice that nothing visibly acknowledges the press.
      </p>
    </div>
  );
}
