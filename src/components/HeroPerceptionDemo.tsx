"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The home-page hero animation. Two panels demonstrate the central
 * thesis of the platform — that the same wall-clock duration can feel
 * dramatically different depending on what the user sees during the
 * wait.
 *
 * Both panels run on a 4-second loop and reach the same "fully
 * rendered" state by t ≈ 2.7 s.
 *
 *   OFF panel — empty gray card from 0 → 2.7 s, then content snaps in
 *               all at once. The visitor stares at the absence.
 *
 *   ON  panel — content-true skeleton at 0 ms; the avatar resolves at
 *               800 ms, the first text line at 1.6 s, the second at
 *               2.4 s. By 2.7 s the user has already been reading for
 *               300 ms.
 *
 * The caption beneath spells it out so the gap registers
 * intellectually as well as viscerally.
 *
 * `prefers-reduced-motion` shows both panels in their resolved state
 * with no animation — the structure of the comparison still reads
 * even when the timing is suppressed.
 */

const CYCLE_MS = 4000;
const ON_AVATAR_MS = 800;
const ON_LINE1_MS = 1600;
const ON_LINE2_MS = 2400;
const OFF_REVEAL_MS = 2700;

type State = {
  /** Off panel has snapped to the loaded state. */
  offShown: boolean;
  /** On panel: avatar has resolved from skeleton to content. */
  onAvatar: boolean;
  /** On panel: first text line has resolved. */
  onLine1: boolean;
  /** On panel: second text line has resolved. */
  onLine2: boolean;
};

const RESOLVED: State = {
  offShown: true,
  onAvatar: true,
  onLine1: true,
  onLine2: true,
};

const INITIAL: State = {
  offShown: false,
  onAvatar: false,
  onLine1: false,
  onLine2: false,
};

export function HeroPerceptionDemo() {
  const [state, setState] = useState<State>(INITIAL);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState(RESOLVED);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        // Allow cancellation to clear pending timers.
        cancelHandles.push(() => clearTimeout(id));
      });
    const cancelHandles: (() => void)[] = [];

    const loop = async () => {
      while (!cancelled) {
        setState(INITIAL);
        await sleep(ON_AVATAR_MS);
        if (cancelled) break;
        setState((s) => ({ ...s, onAvatar: true }));
        await sleep(ON_LINE1_MS - ON_AVATAR_MS);
        if (cancelled) break;
        setState((s) => ({ ...s, onLine1: true }));
        await sleep(ON_LINE2_MS - ON_LINE1_MS);
        if (cancelled) break;
        setState((s) => ({ ...s, onLine2: true }));
        await sleep(OFF_REVEAL_MS - ON_LINE2_MS);
        if (cancelled) break;
        setState((s) => ({ ...s, offShown: true }));
        await sleep(CYCLE_MS - OFF_REVEAL_MS);
      }
    };
    loop();

    return () => {
      cancelled = true;
      cancelHandles.forEach((c) => c());
    };
  }, []);

  return (
    <div aria-hidden className="mt-12 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <Panel label="Off">
          <Card
            avatarShown={state.offShown}
            line1Shown={state.offShown}
            line2Shown={state.offShown}
          />
        </Panel>
        <Panel label="On" highlighted>
          <Card
            avatarShown={state.onAvatar}
            line1Shown={state.onLine1}
            line2Shown={state.onLine2}
            skeleton
          />
        </Panel>
      </div>
      <p className="mt-4 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Both finish at 2.7 s.{" "}
        <span className="text-foreground">
          The right one feels twice as fast.
        </span>
      </p>
    </div>
  );
}

function Panel({
  label,
  highlighted = false,
  children,
}: {
  label: "Off" | "On";
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-card p-3",
        highlighted ? "border-primary" : "border-border",
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.6875rem] font-medium uppercase tracking-wider",
          highlighted ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Card({
  avatarShown,
  line1Shown,
  line2Shown,
  skeleton = false,
}: {
  avatarShown: boolean;
  line1Shown: boolean;
  line2Shown: boolean;
  /** When true, unrendered slots show a pulsing skeleton placeholder. */
  skeleton?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="size-8 shrink-0">
        {avatarShown ? (
          <div className="grid size-8 place-items-center rounded-full bg-primary/15 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-primary">
            MC
          </div>
        ) : skeleton ? (
          <div className="size-8 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        ) : (
          <div className="size-8 rounded-full bg-muted/40" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2 pt-0.5">
        {line1Shown ? (
          <p className="text-[0.8125rem] font-medium leading-tight text-foreground">
            Maya Chen
          </p>
        ) : skeleton ? (
          <div className="h-3 w-20 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        ) : (
          <div className="h-3 w-20 rounded bg-muted/40" />
        )}
        {line2Shown ? (
          <p className="truncate text-[0.6875rem] leading-tight text-muted-foreground">
            Migrated the staging DB
          </p>
        ) : skeleton ? (
          <div className="h-2.5 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        ) : (
          <div className="h-2.5 w-32 rounded bg-muted/40" />
        )}
      </div>
    </div>
  );
}
