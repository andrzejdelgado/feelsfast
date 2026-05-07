"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The home-page hero animation. Two panels demonstrate the central
 * thesis of the platform — that the same wall-clock duration can feel
 * dramatically different depending on what the user sees during the
 * wait.
 *
 * Both panels run on a 4-second loop and reach their fully-rendered
 * state at exactly the same wall-clock moment (t = 2.7 s).
 *
 *   OFF panel — empty card from 0 → 2.7 s, then content snaps in all
 *               at once. No skeleton, no placeholder; the visitor
 *               stares at the absence.
 *
 *   ON  panel — content-true skeleton at 0 ms; the avatar resolves at
 *               900 ms, the first text line at 1.8 s, the second at
 *               2.7 s. The visitor has been *reading* progressively
 *               while the OFF side was blank.
 *
 * Both panels share fixed-height slots so the transition between
 * skeleton / empty / loaded states never causes layout shift — the
 * point of the demo would be undermined if the boxes themselves
 * jumped.
 *
 * `prefers-reduced-motion` shows both panels in their resolved state
 * with no animation; the comparison still reads even when the timing
 * is suppressed.
 */

const CYCLE_MS = 4000;
const ON_AVATAR_MS = 900;
const ON_LINE1_MS = 1800;
const ON_LINE2_MS = 2700;
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
    const cancelHandles: (() => void)[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        cancelHandles.push(() => clearTimeout(id));
      });

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
        // Final ON element and OFF snap-in fire at the same moment.
        setState({
          offShown: true,
          onAvatar: true,
          onLine1: true,
          onLine2: true,
        });
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
          The right one feels much faster, right?
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

/**
 * Card with three fixed-height slots: a 32 px avatar circle, a 16 px
 * "name" line, and a 14 px "description" line. Each slot reserves its
 * dimensions whether it shows real content, a skeleton placeholder, or
 * nothing at all — so transitions between states never shift the
 * surrounding layout.
 */
function Card({
  avatarShown,
  line1Shown,
  line2Shown,
  skeleton = false,
}: {
  avatarShown: boolean;
  line1Shown: boolean;
  line2Shown: boolean;
  /** When true, slots that have not yet resolved show a pulsing placeholder. */
  skeleton?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {/* Avatar slot — always 32 × 32. */}
      <div className="size-8 shrink-0">
        {avatarShown ? (
          <div className="grid size-8 place-items-center rounded-full bg-primary/15 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-primary">
            MC
          </div>
        ) : skeleton ? (
          <div className="size-8 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        ) : null}
      </div>
      {/* Lines column */}
      <div className="min-w-0 flex-1 pt-0.5">
        {/* Line-1 slot — fixed 16 px height. */}
        <div className="flex h-4 items-center">
          {line1Shown ? (
            <p className="text-[0.8125rem] font-medium leading-none text-foreground">
              Maya Chen
            </p>
          ) : skeleton ? (
            <div className="h-3 w-20 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          ) : null}
        </div>
        {/* Line-2 slot — fixed 14 px height with 8 px gap above. */}
        <div className="mt-2 flex h-3.5 items-center">
          {line2Shown ? (
            <p className="truncate text-[0.6875rem] leading-none text-muted-foreground">
              Migrated the staging DB
            </p>
          ) : skeleton ? (
            <div className="h-2.5 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
