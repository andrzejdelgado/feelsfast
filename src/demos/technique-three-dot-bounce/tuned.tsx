"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";
import { Bubble } from "./naive";

/**
 * Tuned — between the user's message and the reply, a "typing" bubble
 * appears with three small dots that stagger up-and-down. The
 * staggered delay (0 / 160 / 320 ms) gives the wave effect that reads
 * unmistakably as "an actor is composing." Disappears the moment the
 * actual reply lands.
 *
 * Universal in chat UIs (iMessage, Slack, ChatGPT) for a reason —
 * cheap to ship, immediately legible, never overstays its welcome.
 */
export function TunedThreeDotBounce({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-2 text-sm">
      <Bubble side="me">Where do you want to grab lunch?</Bubble>
      {loaded ? (
        <Bubble side="them">The new ramen place on Hudson.</Bubble>
      ) : (
        <div className="flex justify-start" aria-label="Typing…">
          <div className="rounded-md bg-secondary px-3 py-2.5">
            <div className="flex items-center gap-1">
              <Dot delay="0ms" />
              <Dot delay="160ms" />
              <Dot delay="320ms" />
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes three-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden
      className="block size-1.5 rounded-full bg-muted-foreground motion-reduce:animate-none"
      style={{
        animation: "three-dot-bounce 1100ms ease-in-out infinite",
        animationDelay: delay,
      }}
    />
  );
}
