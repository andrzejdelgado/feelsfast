"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type WrapBreakpoint = "sm" | "md" | "lg" | "never";

type SwipeableRowProps = {
  children: ReactNode;
  /**
   * Viewport breakpoint at and above which the row stops scrolling and
   * wraps to multiple lines instead. Default: `md`. Pass `"never"` to
   * keep the row swipeable at every viewport.
   */
  wrapAt?: WrapBreakpoint;
  /** Extra classes applied to the scroll container (e.g. padding). */
  className?: string;
  /** Aria-label / role passthrough. */
  role?: string;
  ariaLabel?: string;
};

const WRAP_CLASSES: Record<WrapBreakpoint, string> = {
  sm: "sm:flex-wrap sm:overflow-x-visible sm:[mask-image:none]",
  md: "md:flex-wrap md:overflow-x-visible md:[mask-image:none]",
  lg: "lg:flex-wrap lg:overflow-x-visible lg:[mask-image:none]",
  never: "",
};

/**
 * Swipeable horizontal row with conditional edge fades.
 *
 * Layout: a single flex row that scrolls horizontally on narrow
 * viewports and (at or above `wrapAt`) collapses to a wrapped flex
 * layout. The hidden native scrollbar plus a `mask-image` linear
 * gradient give the iOS-style behaviour the design calls for —
 * content disappears under a fade at whichever edge has more content
 * off-screen, and the fade goes away when the user has reached that
 * edge.
 *
 * Children should be `shrink-0` so they don't compress when overflow
 * is active.
 */
export function SwipeableRow({
  children,
  wrapAt = "md",
  className,
  role,
  ariaLabel,
}: SwipeableRowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState<{ atStart: boolean; atEnd: boolean }>({
    atStart: true,
    atEnd: true,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      // Epsilon accounts for sub-pixel rounding in some browsers.
      const atStart = scrollLeft <= 1;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      setEdges((prev) =>
        prev.atStart === atStart && prev.atEnd === atEnd
          ? prev
          : { atStart, atEnd },
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // CSS variables drive the mask stops — `black` means "show through
  // fully", `transparent` means "fade out". When at the start, the
  // left edge stays solid (nothing to hide behind a fade); same for
  // the end edge on the right.
  const style = {
    "--swipe-fade-left": edges.atStart ? "black" : "transparent",
    "--swipe-fade-right": edges.atEnd ? "black" : "transparent",
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      role={role}
      aria-label={ariaLabel}
      style={style}
      className={cn(
        "scrollbar-none flex items-center gap-2 overflow-x-auto",
        "[mask-image:linear-gradient(to_right,var(--swipe-fade-left)_0,black_2rem,black_calc(100%-2rem),var(--swipe-fade-right)_100%)]",
        WRAP_CLASSES[wrapAt],
        className,
      )}
    >
      {children}
    </div>
  );
}
