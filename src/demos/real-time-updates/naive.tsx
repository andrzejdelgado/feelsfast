"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatRelative,
  rollEventStream,
  type Event,
} from "./config";

/**
 * Naive real-time feed — events arrive and the list reorders instantly,
 * with no animation, no highlight, no register that anything has
 * changed. The user has to read the whole list to spot the new item.
 *
 * Both Off and On consume the same pre-rolled event stream (same seed
 * → same arrival times, same actor / verb pairs), so the only
 * difference is how each side reveals an incoming event.
 */
export function NaiveRealTimeUpdates({ seed = 1 }: { seed?: number }) {
  const stream = useMemo(() => rollEventStream(seed), [seed]);
  const [events, setEvents] = useState<Event[]>([]);
  const [now, setNow] = useState(0);
  const [maxItems, setMaxItems] = useState(5);
  const startedAt = useRef(performance.now());

  // 3 items on mobile, 5 at md+. Avoids overflowing the panel on
  // narrow viewports where the timestamp would push the actor/verb
  // off the right edge.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMaxItems(mq.matches ? 3 : 5);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const timers = stream.map(({ event, at }) =>
      setTimeout(() => {
        setEvents((prev) => [event, ...prev].slice(0, maxItems));
      }, at),
    );
    const tick = setInterval(() => {
      setNow(performance.now() - startedAt.current);
    }, 250);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [stream, maxItems]);

  return (
    <ul className="space-y-2 text-sm">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex items-baseline gap-2 rounded-md border border-border bg-background px-3 py-2"
        >
          <span className="min-w-0 flex-1 truncate">
            <strong className="font-medium">{event.actor}</strong>{" "}
            <span className="text-muted-foreground">{event.verb}</span>
          </span>
          <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
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
