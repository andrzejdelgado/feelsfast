"use client";

import { Check } from "lucide-react";
import { useState } from "react";

/**
 * Waitlist form — visual treatment ported from the lessless.app
 * landing page: a single rounded-full pill containing an email input
 * on the left and an inverted "Join Waitlist" submit button on the
 * right. On valid submit the form swaps in-place to a confirmation
 * line. Invalid emails surface an inline error below the pill.
 *
 * NOTE — the address is intentionally NOT persisted anywhere. The
 * Pattern Creator wizard is pre-launch; this form is a teaser
 * stand-in. No fetch, no localStorage, no analytics event. When the
 * feature ships, wire `handleSubmit` to whatever queue is real.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("That doesn't look like a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-primary bg-primary/5 px-5 py-2.5 text-sm font-medium text-foreground"
      >
        <Check aria-hidden className="size-4 text-primary" />
        <span>You&rsquo;re on the list. We&rsquo;ll email when it ships.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 w-full max-w-md"
      aria-label="Join the Pattern Creator waitlist"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 transition-colors focus-within:border-primary">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          placeholder="your@email.com"
          required
          autoComplete="email"
          aria-invalid={error !== null}
          aria-describedby={error ? "waitlist-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/85 active:translate-y-px"
        >
          Join Waitlist
        </button>
      </div>
      {error ? (
        <p
          id="waitlist-error"
          role="alert"
          className="mt-2 text-left text-xs text-red-600"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
