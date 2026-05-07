"use client";

import {
  useDeferredValue,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { blockingFilter, ITEMS } from "./config";

const FILTER_BLOCK_MS = 80;

export function TunedSearchAsYouType() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // The filter still runs synchronously and still costs ~80 ms — but
  // useDeferredValue tells React to schedule the filter as low-priority work
  // and keep the input render at high priority. The input stays instant; the
  // results catch up a frame or two later. The "stale" condition fires while
  // they're catching up, so we can dim the list to telegraph that the user.
  const results = useMemo(
    () => blockingFilter(deferredQuery, FILTER_BLOCK_MS),
    [deferredQuery],
  );
  const isStale = query !== deferredQuery;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
        {isStale ? " · refreshing…" : ""}
      </p>
      <ul
        className={`max-h-40 overflow-auto rounded-md border border-border bg-card text-sm transition-opacity ${
          isStale ? "opacity-60" : "opacity-100"
        }`}
        aria-busy={isStale}
      >
        {results.map((item) => (
          <li
            key={item}
            className="border-b border-border px-3 py-1.5 last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
