"use client";

import { useEffect, useState } from "react";

/**
 * Sticky reading-progress strip — a 2 px bar at the very top of the
 * viewport that fills as the reader scrolls through the article.
 *
 * Measures the first `<article>` element on the page. The bar's width
 * reflects how much of the article body has scrolled past the top of
 * the viewport, normalised against the article's scrollable distance.
 *
 * Honours `prefers-reduced-motion` via Tailwind's `motion-reduce`
 * variant — the width still updates, only the smoothing transition is
 * removed.
 */
export function ReadingProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    let ticking = false;
    const compute = () => {
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = rect.height - viewport;
      if (distance <= 0) {
        setPercent(100);
        return;
      }
      const scrolled = -rect.top;
      const next = Math.max(0, Math.min(100, (scrolled / distance) * 100));
      setPercent(next);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
