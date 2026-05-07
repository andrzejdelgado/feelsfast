"use client";

import { GripVertical, Loader2 } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { gammaJitter } from "@/lib/jitter";
import { ITEMS, SERVER_DELAY_P50_MS, type Item } from "./config";

/**
 * Naive drag-and-drop. The dragged item gets the browser's default ghost
 * (varies wildly by OS); other items do not move until you drop. After
 * the drop, a simulated server round-trip *blocks* the visual reorder —
 * the row hangs in its original slot for 350 ms p50 with a "Saving…"
 * spinner, then snaps to its new position. The user never sees the
 * "where will this land?" preview while they are dragging.
 */
export function NaiveDragAndDrop() {
  const [items, setItems] = useState<Item[]>(ITEMS);
  const [savingId, setSavingId] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  const onDragStart = (id: string) => (e: DragEvent<HTMLLIElement>) => {
    dragId.current = id;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const onDrop = (overId: string) => () => {
    const fromId = dragId.current;
    dragId.current = null;
    if (!fromId || fromId === overId) return;
    setSavingId(fromId);
    setTimeout(() => {
      setItems((prev) => {
        const fromIdx = prev.findIndex((it) => it.id === fromId);
        const toIdx = prev.findIndex((it) => it.id === overId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const next = prev.slice();
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
      setSavingId(null);
    }, gammaJitter(SERVER_DELAY_P50_MS));
  };

  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((item) => (
        <li
          key={item.id}
          draggable
          onDragStart={onDragStart(item.id)}
          onDragOver={onDragOver}
          onDrop={onDrop(item.id)}
          className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2"
        >
          <GripVertical
            aria-hidden
            className="size-4 cursor-grab text-muted-foreground"
          />
          <span className="flex-1 truncate">{item.title}</span>
          {savingId === item.id ? (
            <Loader2
              aria-hidden
              className="size-3 animate-spin text-muted-foreground motion-reduce:animate-none"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
