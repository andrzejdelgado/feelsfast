"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("clipboard write failed", err);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      aria-label={copied ? "Copied to clipboard" : label}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        copied
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden className="size-3" />
      ) : (
        <Copy aria-hidden className="size-3" />
      )}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
