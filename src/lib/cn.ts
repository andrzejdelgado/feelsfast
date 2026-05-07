import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with Tailwind-aware conflict resolution.
 * Identical signature to the shadcn/ui convention so it stays a drop-in
 * once `npx shadcn@latest init` runs.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
