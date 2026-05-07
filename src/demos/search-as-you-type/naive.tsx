"use client";

import { useState, type ChangeEvent } from "react";
import { blockingFilter, ITEMS } from "./config";

const FILTER_BLOCK_MS = 80;

export function NaiveSearchAsYouType() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>(ITEMS);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    // Run the (slow) filter synchronously on every keystroke. Both the input
    // value update and the result update wait for the filter to finish — so
    // the input visibly stutters when typing fast.
    const filtered = blockingFilter(next, FILTER_BLOCK_MS);
    setQuery(next);
    setResults(filtered);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type a fruit…"
        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      <ul className="max-h-40 overflow-auto rounded-md border border-border bg-card text-sm">
        {results.map((item) => (
          <li key={item} className="border-b border-border px-3 py-1.5 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
