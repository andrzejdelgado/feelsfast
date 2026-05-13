"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { ARTICLES, FETCH_DURATION_P50_MS } from "./config";

/**
 * Naive — clicking Next clears the page and shows a blank frame
 * until the data lands. The blank reads as a render glitch, not
 * progress.
 */
export function NaiveSkeletonReveal({ seed = 1 }: { seed?: number }) {
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, []);

  const next = () => {
    if (loading) return;
    setLoading(true);
    if (ref.current !== null) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      setIdx((i) => (i + 1) % ARTICLES.length);
      setLoading(false);
    }, seededGamma(seed, FETCH_DURATION_P50_MS));
  };

  const article = ARTICLES[idx];

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={next}
        disabled={loading}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        Next article
        <ChevronRight aria-hidden className="size-3" />
      </button>
      <div className="min-h-[148px] rounded-md border border-border bg-background p-3 md:min-h-[110px]">
        {loading ? null : (
          <>
            <p className="text-sm font-medium">{article.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {article.body}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
