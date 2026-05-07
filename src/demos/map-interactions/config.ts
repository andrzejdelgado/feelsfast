import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Map pan",
  description:
    "Pan around a tile-backed map. Naive: pan locks input until the new tiles load. Tuned: pan is always responsive — the viewport shifts immediately, tiles fade in underneath as each finishes loading.",
  timeBand: "0–100 MS",
};

/** Pan one tile per arrow press. */
export const PAN_STEP = 1;
export const VIEWPORT = 4;
export const TILE_LOAD_P50_MS = 450;

/**
 * Deterministic tile colour from coordinates — the same (x, y) always
 * gives the same hue, so the user can recognise tiles when they pan
 * back. Hue cycles smoothly across the grid.
 */
export function tileColor(x: number, y: number): string {
  const hue = (((x * 23 + y * 41) % 360) + 360) % 360;
  const lightness = 65 + ((x + y) % 4) * 4;
  return `hsl(${hue} 55% ${lightness}%)`;
}

export function tileKey(x: number, y: number): string {
  return `${x},${y}`;
}
