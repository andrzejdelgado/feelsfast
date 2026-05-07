"use client";

import { GripVertical } from "lucide-react";

/**
 * Naive — every row uses the default cursor. The user has to *try*
 * clicking or dragging to find out which rows are interactive. The
 * page communicates nothing through cursor state.
 */
export function NaiveCursorAffordance() {
  return (
    <div className="space-y-1.5 text-sm">
      <Row label="Open in editor" sub="clickable" />
      <Row label="Drag to reorder" sub="draggable handle" handle />
      <Row label="Locked by another user" sub="disabled" disabled />
    </div>
  );
}

function Row({
  label,
  sub,
  handle = false,
  disabled = false,
}: {
  label: string;
  sub: string;
  handle?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {handle ? (
        <GripVertical aria-hidden className="size-4 text-muted-foreground" />
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
