"use client";

import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tuned — same three rows, three different cursor treatments matching
 * the affordance:
 *   - Clickable row → `cursor-pointer`
 *   - Drag handle → `cursor-grab` / `active:cursor-grabbing`
 *   - Disabled row → `cursor-not-allowed`
 *
 * Hover one of the rows on the right to see the cursor change. The
 * affordance arrives in the same frame as the hover — no JavaScript,
 * no round-trip, no perception cost.
 */
export function TunedCursorAffordance() {
  return (
    <div className="space-y-1.5 text-sm">
      <Row label="Open in editor" sub="clickable" interaction="click" />
      <Row label="Drag to reorder" sub="draggable handle" interaction="drag" />
      <Row label="Locked by another user" sub="disabled" interaction="disabled" />
    </div>
  );
}

function Row({
  label,
  sub,
  interaction,
}: {
  label: string;
  sub: string;
  interaction: "click" | "drag" | "disabled";
}) {
  const cursorClass =
    interaction === "click"
      ? "cursor-pointer hover:border-primary"
      : interaction === "drag"
        ? "cursor-grab active:cursor-grabbing"
        : "cursor-not-allowed opacity-50";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 transition-colors",
        cursorClass,
      )}
    >
      {interaction === "drag" ? (
        <GripVertical
          aria-hidden
          className="size-4 cursor-grab text-muted-foreground active:cursor-grabbing"
        />
      ) : (
        <span className="size-4" aria-hidden />
      )}
      <span className="flex-1">{label}</span>
      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        {sub}
      </span>
    </div>
  );
}
