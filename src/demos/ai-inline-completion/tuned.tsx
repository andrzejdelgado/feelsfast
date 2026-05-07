"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gammaJitter } from "@/lib/jitter";
import {
  COMPLETION_P50_MS,
  DEBOUNCE_MS,
  predictCompletion,
} from "./config";

/**
 * Tuned inline completion — debounced, cancellable, and stale-aware.
 *
 * 1. Suggestion clears the moment the user types — no chance of showing
 *    a suggestion that does not match the current text.
 * 2. The actual model request fires only after a 200 ms debounce.
 * 3. If a new keystroke lands while a request is in flight, the in-flight
 *    request is cancelled — no race-condition stale suggestions.
 * 4. A subtle "thinking" cue surfaces while the request is in flight so
 *    the user knows a suggestion is on the way.
 * 5. Tab inserts the suggestion immediately (optimistic), and a fresh
 *    request fires for the new text.
 */
export function TunedInlineCompletion() {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<{ cancelled: boolean } | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) clearTimeout(debounceRef.current);
      if (requestRef.current) requestRef.current.cancelled = true;
    };
  }, []);

  const requestSuggestion = (input: string) => {
    if (debounceRef.current !== null) clearTimeout(debounceRef.current);
    if (requestRef.current) requestRef.current.cancelled = true;
    setThinking(false);

    if (!input.trim()) {
      setSuggestion("");
      return;
    }

    debounceRef.current = setTimeout(() => {
      const token = { cancelled: false };
      requestRef.current = token;
      setThinking(true);
      setTimeout(() => {
        if (token.cancelled) return;
        setSuggestion(predictCompletion(input));
        setThinking(false);
      }, gammaJitter(COMPLETION_P50_MS));
    }, DEBOUNCE_MS);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setText(next);
    setSuggestion("");
    requestSuggestion(next);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      const next = text + suggestion;
      setText(next);
      setSuggestion("");
      requestSuggestion(next);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative rounded-md border border-border bg-background font-mono text-[0.8125rem] leading-relaxed transition-colors focus-within:border-primary">
        <pre
          aria-hidden
          className="pointer-events-none m-0 whitespace-pre-wrap break-words px-3 py-2 text-muted-foreground/60"
        >
          <span className="text-foreground">{text}</span>
          <span>{suggestion}</span>
          {"\n\n\n\n"}
        </pre>
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="Type a line… try buy / fix / email …"
          rows={4}
          spellCheck={false}
          className="absolute inset-0 block w-full resize-none rounded-md bg-transparent px-3 py-2 font-mono text-[0.8125rem] leading-relaxed text-transparent caret-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <p className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        <span>Tab · accept suggestion</span>
        <span
          aria-hidden
          className={
            thinking
              ? "text-primary opacity-100 transition-opacity"
              : "opacity-0 transition-opacity"
          }
        >
          Thinking…
        </span>
      </p>
    </div>
  );
}
