import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Search as you type",
  description:
    "Same dataset, same filter logic, same artificial work per keystroke. The naive side blocks input on every keystroke; the tuned side uses React 19's useDeferredValue to keep the input instant while the filter catches up.",
  timeBand: "0 – 100 MS",
};

export const ITEMS = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Date",
  "Dragon fruit",
  "Elderberry",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Kiwi",
  "Kumquat",
  "Lemon",
  "Lime",
  "Lychee",
  "Mango",
  "Mulberry",
  "Nectarine",
  "Orange",
  "Papaya",
  "Passion fruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Pineapple",
  "Plum",
  "Pomegranate",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Watermelon",
];

/**
 * Synchronously block the main thread for `ms` milliseconds, then return the
 * filtered items. Simulates a slow filter / search index lookup that runs on
 * every keystroke. In a real app this work would happen off the main thread
 * (worker, debounced fetch, etc.) — here it is intentionally on the hot path
 * so the naive demo can demonstrate the input lag.
 */
export function blockingFilter(query: string, ms: number): string[] {
  const start =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  // eslint-disable-next-line no-empty
  while (
    (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      start <
    ms
  ) {}
  if (!query) return ITEMS;
  const q = query.toLowerCase();
  return ITEMS.filter((item) => item.toLowerCase().includes(q));
}
