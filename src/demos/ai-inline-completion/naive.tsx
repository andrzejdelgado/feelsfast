"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { gammaJitter } from "@/lib/jitter";
import { COMPLETION_P50_MS, predictCompletion } from "./config";

/**
 * Naive inline completion — no debounce, no abort, no cancellation. Every
 * keystroke fires its own simulated request, each request finishes when it
 * finishes, and whichever response lands last wins. The user sees stale
 * suggestions appear after they have already moved past — the classic
 * "ghost text shows what I typed five characters ago" failure.
 */
export function NaiveInlineCompletion() {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const reqIdRef = useRef(0);

  const fire = (input: string) => {
    const id = ++reqIdRef.current;
    setTimeout(() => {
      const next = predictCompletion(input);
      // Naive: the *latest* finished request wins, regardless of order.
      if (id <= reqIdRef.current) setSuggestion(next);
    }, gammaJitter(COMPLETION_P50_MS));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setText(next);
    fire(next);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      const next = text + suggestion;
      setText(next);
      setSuggestion("");
      fire(next);
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
          {/* Ensures the box always reserves at least four lines of height. */}
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
      <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        Tab · accept suggestion
      </p>
    </div>
  );
}
