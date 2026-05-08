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
 * The button is always visible — the previous hover-only treatment
 * meant touch-device users could not see it at all, and the
 * appear-on-hover transition raced against the click in some setups.
 *
 * On click, the pre's text content is copied to the clipboard. We try
 * the modern async Clipboard API first, then fall back to the legacy
 * execCommand path so the button still works in older browsers and
 * non-secure contexts.
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  const onCopy = async () => {
    const text = ref.current?.innerText ?? "";
    if (!text) return;
    const ok = await writeToClipboard(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("relative my-8", className)}>
      <pre
        ref={ref}
        className="whitespace-pre-wrap break-words rounded-lg border border-border bg-secondary px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-foreground"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy code"}
        className={cn(
          "absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
          copied
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
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

async function writeToClipboard(text: string): Promise<boolean> {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard?.writeText &&
    window.isSecureContext
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy path
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text: string): boolean {
  if (typeof document === "undefined") return false;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(ta);
  }
}
