"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import {
  EVENT_INTERVAL_P50_MS,
  formatRelative,
  makeEvent,
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
 */
export function TunedRealTimeUpdates() {
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
      {events.map((event) => {
        const age = now - event.at;
        const isFresh = age < HIGHLIGHT_MS;
        return (
          <li
            key={event.id}
            className={cn(
              "flex items-baseline justify-between gap-2 rounded-md border px-3 py-2 transition-[background-color,border-color] duration-700 ease-out motion-reduce:duration-200",
              isFresh
                ? "animate-[slide-down_200ms_ease-out] border-primary bg-primary/5 motion-reduce:animate-none"
                : "border-border bg-background",
            )}
          >
            <span>
              <strong className="font-medium">{event.actor}</strong>{" "}
              <span className="text-muted-foreground">{event.verb}</span>
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
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
