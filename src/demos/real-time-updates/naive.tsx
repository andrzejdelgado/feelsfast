"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import {
  EVENT_INTERVAL_P50_MS,
  formatRelative,
  makeEvent,
  type Event,
} from "./config";

/**
 * Naive real-time feed — events arrive and the list reorders instantly,
 * with no animation, no highlight, no register that anything has
 * changed. The user has to read the whole list to spot the new item.
 */
export function NaiveRealTimeUpdates() {
  const [events, setEvents] = useState<Event[]>([]);
  const [now, setNow] = useState(0);
  const startedAt = useRef(performance.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timeoutRef.current = setTimeout(
        () => {
          const elapsed = performance.now() - startedAt.current;
          setEvents((prev) => [makeEvent(elapsed), ...prev].slice(0, 5));
          schedule();
        },
        gammaJitter(EVENT_INTERVAL_P50_MS),
      );
    };
    schedule();
    const tick = setInterval(() => {
      setNow(performance.now() - startedAt.current);
    }, 250);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      clearInterval(tick);
    };
  }, []);

  return (
    <ul className="space-y-2 text-sm">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex items-baseline justify-between gap-2 rounded-md border border-border bg-background px-3 py-2"
        >
          <span>
            <strong className="font-medium">{event.actor}</strong>{" "}
            <span className="text-muted-foreground">{event.verb}</span>
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
            {formatRelative(event.at, now)}
          </span>
        </li>
      ))}
      {events.length === 0 ? (
        <li className="text-sm text-muted-foreground">Waiting for activity…</li>
      ) : null}
    </ul>
  );
}
