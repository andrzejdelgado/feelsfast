import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Predominant-color image",
  description:
    "A 6-image gallery loading at varying rates. Naive: blank tiles until each image arrives. Tuned: each tile's dominant color fills the slot from frame zero (cheap to inline as a 1-pixel data-uri at upload time), then crossfades into the real image. The eye reads the colour as the image arriving.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserve exactly the 3×2 aspect-square grid height at each
  // breakpoint so the panel doesn't jump between idle and running
  // and sits snug to the loaded tiles (no empty space below).
  panelMinHeight: "min-h-[149px] md:min-h-[214px] lg:min-h-[219px]",
};

/** Per-tile median load time (gamma-jittered, seeded). */
export const TILE_P50_MS = 2200;

/**
 * Six "photographs" rendered as CSS gradients. Each one carries the
 * single dominant color we'd inline as a 1×1 base64 LQIP at upload
 * time — the Tuned side fills the slot with that colour from frame
 * zero, then crossfades to the gradient.
 */
export const TILES = [
  {
    id: "1",
    label: "Sunset",
    gradient:
      "radial-gradient(ellipse at 30% 35%, #ffd07b 0%, #ff8a5c 38%, #c64657 78%)",
    predominantColor: "#ee8e62",
  },
  {
    id: "2",
    label: "Forest",
    gradient:
      "linear-gradient(135deg, #1f4d2c 0%, #3a7a47 45%, #b3c97a 100%)",
    predominantColor: "#4f7e4a",
  },
  {
    id: "3",
    label: "Ocean",
    gradient:
      "linear-gradient(180deg, #6fb3d2 0%, #2a6f97 60%, #013a63 100%)",
    predominantColor: "#3a7da4",
  },
  {
    id: "4",
    label: "Desert",
    gradient:
      "radial-gradient(ellipse at 60% 70%, #f6c989 0%, #d99c5a 50%, #8a4f1e 100%)",
    predominantColor: "#c79256",
  },
  {
    id: "5",
    label: "Snow",
    gradient:
      "linear-gradient(160deg, #e0eaf1 0%, #b6c5d6 55%, #6c8aa8 100%)",
    predominantColor: "#a9bccd",
  },
  {
    id: "6",
    label: "Bloom",
    gradient:
      "radial-gradient(circle at 40% 60%, #f7c1c4 0%, #d96c8a 55%, #6e2945 100%)",
    predominantColor: "#c5677b",
  },
] as const;
