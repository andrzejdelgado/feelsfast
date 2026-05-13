"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  formatRelative,
  rollEventStream,
  type Event,
} from "./config";

const HIGHLIGHT_MS = 1200;

/**
 * Tuned real-time feed — incoming events animate in from the top with a
 * primary-coloured highlight that fades over 1.2 s. The animation lives
 * inside the Card-Moran-Newell ~100 ms perceptual frame for the start
 * (so the user notices it as motion, not as a new render), then decays
 * gradually so the highlight is finished by the time the eye finishes
 * reading the line. Reduced-motion users get a single colour pulse with
 * no slide.
 *
 * Both Off and On consume the same pre-rolled event stream, so the
 * arrival time, actor, and verb of every event are identical between
 * the panels — only the reveal differs.
 */
export function TunedRealTimeUpdates({ seed = 1 }: { seed?: number }) {
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
      {events.map((event) => {
        const age = now - event.at;
        const isFresh = age < HIGHLIGHT_MS;
        return (
          <li
            key={event.id}
            className={cn(
              "flex items-baseline gap-2 rounded-md border px-3 py-2 transition-[background-color,border-color] duration-700 ease-out motion-reduce:duration-200",
              isFresh
                ? "animate-[slide-down_200ms_ease-out] border-primary bg-primary/5 motion-reduce:animate-none"
                : "border-border bg-background",
            )}
          >
            <span className="min-w-0 flex-1 truncate">
              <strong className="font-medium">{event.actor}</strong>{" "}
              <span className="text-muted-foreground">{event.verb}</span>
            </span>
            <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              {formatRelative(event.at, now)}
            </span>
          </li>
        );
      })}
      {events.length === 0 ? (
        <li className="text-sm text-muted-foreground">Waiting for activity…</li>
      ) : null}
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ul>
  );
}
