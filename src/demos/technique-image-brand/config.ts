import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Branded image skeleton",
  description:
    "Image slot with the brand mark centred. Naive: empty muted box until the file lands. Tuned: a small primary-coloured logo / monogram sits in the centre of a neutral surface from frame zero. The slot reads as \"image is on its way from this brand\" rather than \"image is missing\". Useful when no dominant-colour data is available (cold cache, new content).",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 2400;

export const HERO = {
  gradient:
    "linear-gradient(135deg, #1f4d2c 0%, #3a7a47 45%, #b3c97a 100%)",
  alt: "Forest canopy in late spring",
} as const;
