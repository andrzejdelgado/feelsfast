"use client";

import { GripVertical } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import { ITEMS, SERVER_DELAY_P50_MS, type Item } from "./config";

/**
 * Tuned drag-and-drop. While dragging:
 *  - The dragged row dims to ~50 % opacity in place so the user can see
 *    where it came from.
 *  - The current drop-target row gets a primary-coloured top border —
 *    the "this is where it will land" indicator.
 * On drop:
 *  - The reorder commits *immediately* — optimistic placement.
 *  - The server round-trip runs in the background; if it fails the row
 *    would roll back, but in this demo we treat the commit as always
 *    successful so the user sees the optimistic effect.
 *  - A subtle background-tint cue pulses on the moved row for 600 ms so
 *    the eye lands on the new position.
 */
export function TunedDragAndDrop() {
  const [items, setItems] = useState<Item[]>(ITEMS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [justMovedId, setJustMovedId] = useState<string | null>(null);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onDragStart = (id: string) => (e: DragEvent<HTMLLIElement>) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (id: string) => (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setOverId(id);
  };

  const onDragEnd = () => {
    setDraggingId(null);
    setOverId(null);
  };

  const onDrop = (toId: string) => () => {
    const fromId = draggingId;
    setDraggingId(null);
    setOverId(null);
    if (!fromId || fromId === toId) return;
    setItems((prev) => {
      const fromIdx = prev.findIndex((it) => it.id === fromId);
      const toIdx = prev.findIndex((it) => it.id === toId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const next = prev.slice();
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
    // Background "server commit" — the server result does not block the
    // visible reorder, but production code would surface a rollback here
    // if the request failed.
    setTimeout(() => {
      // no-op for the demo; the optimistic placement is already correct.
    }, gammaJitter(SERVER_DELAY_P50_MS));
    setJustMovedId(fromId);
    if (cleanupTimerRef.current !== null) clearTimeout(cleanupTimerRef.current);
    cleanupTimerRef.current = setTimeout(() => setJustMovedId(null), 600);
  };

  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((item) => {
        const isDragging = draggingId === item.id;
        const isOver = overId === item.id && draggingId !== item.id;
        const isJustMoved = justMovedId === item.id;
        return (
          <li
            key={item.id}
            draggable
            onDragStart={onDragStart(item.id)}
            onDragOver={onDragOver(item.id)}
            onDragEnd={onDragEnd}
            onDrop={onDrop(item.id)}
            className={cn(
              "flex items-center gap-2 rounded-md border bg-background px-3 py-2 transition-[opacity,background-color,border-color] duration-200 ease-out motion-reduce:transition-none",
              isDragging
                ? "border-border opacity-50"
                : isOver
                  ? "-translate-y-px border-primary shadow-[0_-2px_0_0_var(--primary)]"
                  : isJustMoved
                    ? "border-primary bg-primary/5"
                    : "border-border",
            )}
          >
            <GripVertical
              aria-hidden
              className="size-4 cursor-grab text-muted-foreground active:cursor-grabbing"
            />
            <span className="flex-1 truncate">{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
}
