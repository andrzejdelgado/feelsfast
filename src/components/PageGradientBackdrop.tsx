"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SEEN_KEY = "feelsfast-gradient-seen";
const GRADIENT_PATHS = new Set(["/", "/ai"]);

/**
 * Shared radial gradient backdrop. Mounted once in `SiteShell` and
 * driven by the current pathname rather than per-page, so navigation
 * between gradient-bearing pages (`/`, `/ai`) and other routes is a
 * smooth opacity tween instead of a mount/unmount pop.
 *
 * Three animation flavours:
 *
 *   - **First bloom** (900 ms, opacity + scale): the first time the
 *     gradient becomes visible in the browser session. Marked by the
 *     `feelsfast-gradient-seen` sessionStorage flag.
 *   - **Fade-in** (500 ms, opacity only): subsequent re-entries — the
 *     user has already seen the bloom, so the gradient eases back in
 *     without re-blooming.
 *   - **Fade-out** (500 ms, opacity only): when the route changes to
 *     a non-gradient path, the gradient quietly fades to 0.
 *
 * The first paint (SSR + the tick before useEffect runs) is hidden at
 * opacity 0, scale 0.92, transition `none` — gives every transition
 * a stable starting point and avoids a hydration flash.
 */
export function PageGradientBackdrop() {
  const pathname = usePathname();
  const isActive = GRADIENT_PATHS.has(pathname);
  const [isMounted, setIsMounted] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  // On first mount: read the session flag and flip the mounted bit on
  // the next frame so any opacity/transform transition animates from a
  // clean starting paint.
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(SEEN_KEY) === "true";
      setHasSeen(seen);
    } catch {
      // sessionStorage may be unavailable (private mode). Default to
      // unseen — the first-visit bloom is the better default.
    }
    const raf = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // The first time the gradient becomes active in this session,
  // persist the flag. `hasSeen` flips to true after the bloom has had
  // time to play (~1 s) so any later activation in the same session
  // uses the gentler 500 ms fade rather than re-blooming.
  useEffect(() => {
    if (!isMounted || !isActive || hasSeen) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "true");
    } catch {
      // No-op
    }
    const id = window.setTimeout(() => setHasSeen(true), 1000);
    return () => window.clearTimeout(id);
  }, [isActive, isMounted, hasSeen]);

  const isVisible = isMounted && isActive;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-[30rem] -top-[30rem] -z-10 size-[60rem]"
      style={{
        background:
          "radial-gradient(closest-side, #f28866 0%, #ecaa89 15%, #f7c999 30%, #f7e1c8 50%, #f7f3e1 65%, transparent 80%)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.92)",
        transition: !isMounted
          ? "none"
          : isVisible && !hasSeen
            ? "opacity 900ms ease-out, transform 900ms ease-out"
            : "opacity 500ms ease-out",
        willChange: isMounted ? "opacity, transform" : "auto",
      }}
    />
  );
}
