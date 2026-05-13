"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Demo description clamped to two lines with a "More / Less" toggle
 * that only appears when the description actually overflows.
 *
 * On desktop most descriptions fit in two lines, the overflow
 * detection returns false, and no toggle is rendered. On narrow
 * viewports where the text wraps past two lines, the toggle appears
 * so the user can read the full description without the demo card
 * eating three or four lines before they reach the Run button.
 *
 * Overflow is re-measured on `ResizeObserver` so viewport rotations
 * and sidebar collapses re-evaluate the toggle's visibility.
 */
export function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      // `scrollHeight` reflects the full content height even when the
      // paragraph is clamped via `line-clamp-2` (webkit-line-clamp), so
      // comparing it against clientHeight detects overflow regardless
      // of expansion state. When expanded, clientHeight === scrollHeight.
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setOverflows(
        (prev) => (prev || isOverflowing) && (expanded || isOverflowing),
      );
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <>
      <p
        ref={ref}
        className={cn(
          "mt-1 text-sm leading-relaxed text-muted-foreground",
          !expanded && "line-clamp-2",
        )}
      >
        {text}
      </p>
      {overflows ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          <span>{expanded ? "Less" : "More"}</span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-3 transition-transform duration-200 motion-reduce:transition-none",
              expanded && "rotate-180",
            )}
          />
        </button>
      ) : null}
    </>
  );
}
