"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps an MDX code block (`<pre>`) with a Copy button overlay.
 *
 * The button stays out of the way until the user hovers or focuses inside
 * the block; on click, the contents go to the clipboard and the label
 * flips to a "Copied" success state for 1.5 s. Smaller font size than the
 * default `<pre>` keeps long examples scannable.
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  const onCopy = async () => {
    const text = ref.current?.innerText ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("clipboard write failed", err);
    }
  };

  return (
    <div className={cn("group relative my-5", className)}>
      <pre
        ref={ref}
        className="overflow-x-auto rounded-lg border border-border bg-secondary px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-foreground"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-all",
          copied
            ? "border-primary bg-primary/10 text-primary opacity-100"
            : "border-border bg-background text-muted-foreground opacity-0 hover:bg-secondary group-hover:opacity-100 focus-visible:opacity-100",
        )}
      >
        {copied ? (
          <Check aria-hidden className="size-3" />
        ) : (
          <Copy aria-hidden className="size-3" />
        )}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
