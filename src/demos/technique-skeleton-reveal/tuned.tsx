"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { ARTICLES, FETCH_DURATION_P50_MS } from "./config";

/**
 * Tuned — clicking Next swaps the page to a content-true skeleton
 * of the incoming article *immediately*. The skeleton holds for the
 * data-fetch duration, then crossfades to the real content.
 *
 * The user reads the click as "page navigated; data is on its way."
 * The transition decouples nav (instant) from fetch (variable). On
 * production sites this is what the View Transitions API + Suspense
 * boundaries give you for free.
 */
export function TunedSkeletonReveal() {
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
    }, gammaJitter(FETCH_DURATION_P50_MS));
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
      <div className="min-h-[6rem] overflow-hidden rounded-md border border-border bg-background p-3">
        {loading ? <ArticleSkeleton /> : <ArticleView article={article} />}
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="space-y-2 motion-safe:animate-[reveal-fade_180ms_ease-out]">
      <div className="h-4 w-2/3 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-5/6 rounded bg-muted" />
      <div className="h-3 w-1/2 rounded bg-muted" />
      <style>{`
        @keyframes reveal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ArticleView({
  article,
}: {
  article: { title: string; body: string };
}) {
  return (
    <div className="motion-safe:animate-[reveal-fade_220ms_ease-out]">
      <p className="text-sm font-medium">{article.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {article.body}
      </p>
      <style>{`
        @keyframes reveal-fade {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
