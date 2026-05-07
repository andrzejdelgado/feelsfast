"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — the chat thread shows the user's message and then nothing
 * until the reply lands. The user does not know whether the recipient
 * is composing, away, or the network is dead.
 */
export function NaiveThreeDotBounce({ seed = 1 }: { seed?: number }) {
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
      {loaded ? <Bubble side="them">The new ramen place on Hudson.</Bubble> : null}
    </div>
  );
}

export function Bubble({
  side,
  children,
}: {
  side: "me" | "them";
  children: React.ReactNode;
}) {
  const isMe = side === "me";
  return (
    <div className={isMe ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isMe
            ? "max-w-[80%] rounded-md bg-primary/15 px-3 py-1.5 text-sm text-foreground"
            : "max-w-[80%] rounded-md bg-secondary px-3 py-1.5 text-sm text-foreground"
        }
      >
        {children}
      </div>
    </div>
  );
}
