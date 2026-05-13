import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Direct Manipulation Pan",
  description:
    "Pan around a tile-backed map. Naive: pan locks input until the new tiles load. Tuned: pan is always responsive — the viewport shifts immediately, tiles fade in underneath as each finishes loading.",
  timeBand: "0–100 MS",
};

/** Pan one tile per arrow press. */
export const PAN_STEP = 1;
/**
 * Grid dimensions per breakpoint. Desktop is square (8×8 = 64 tiles).
 * Mobile is wider-than-tall (8 cols × 6 rows = 48 tiles) so the panel
 * footprint stays shorter than its width — important on mobile where
 * two stacked square panels would dominate the viewport.
 *
 * Threaded into `<Naive…>` / `<Tuned…>` as `cols` / `rows` props from
 * `MapInteractionsCard`, which flips between the two at the `md`
 * breakpoint.
 */
export const COLS_DESKTOP = 8;
export const ROWS_DESKTOP = 8;
export const COLS_MOBILE = 8;
export const ROWS_MOBILE = 6;
export const TILE_LOAD_P50_MS = 450;

/**
 * Deterministic tile colour from coordinates — same (x, y) always
 * yields the same colour, so the user recognises tiles when they pan
 * back.
 *
 * The palette is sampled from the same five stops used in the page's
 * top-right gradient backdrop (see `PageGradientBackdrop.tsx`). The
 * primary stop is chosen by the anti-diagonal `x + y` so the grid
 * reads as a pixelated rendering of that gradient; a small
 * deterministic ±1-stop jitter dithers the boundaries between bands
 * so they feel like a gradient and not strict stripes.
 */
const GRADIENT_PALETTE = [
  "#f28866", // deep peach (gradient origin)
  "#ecaa89", // light peach
  "#f7c999", // yellow-peach
  "#f7e1c8", // cream
  "#f7f3e1", // pale ivory
];

export function tileColor(x: number, y: number): string {
  const N = GRADIENT_PALETTE.length;
  // Hash-driven jitter shifts ~60 % of tiles by ±1 gradient stop so
  // adjacent same-band tiles dither rather than form hard stripes.
  const jitter = (((x * 73 + y * 37) % 100) + 100) % 100;
  const shift = jitter < 30 ? -1 : jitter < 70 ? 0 : 1;
  const idx = (((x + y + shift) % N) + N * 1000) % N;
  return GRADIENT_PALETTE[idx];
}

export function tileKey(x: number, y: number): string {
  return `${x},${y}`;
}
