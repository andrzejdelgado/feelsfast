import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { PatternEmblem } from "./PatternEmblem";
import { WaitlistForm } from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Pattern Creator — Loading Pattern Wizard",
  description:
    "A guided decision tree that picks the right loading pattern for your scenario and hands you a working demo with the code. Coming soon.",
  alternates: { canonical: "/pattern-creator" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Pattern Creator — Loading Pattern Wizard",
    description:
      "A guided decision tree that picks the right loading pattern for your scenario and hands you the code. Coming soon.",
    type: "website",
    url: "/pattern-creator",
    images: ["/opengraph-image"],
  },
};

export default function PatternCreatorPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-16 lg:px-12 xl:px-16">
      <section className="relative mx-auto max-w-2xl px-6 py-20 sm:px-10 sm:py-28">
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        <div className="flex flex-col items-center text-center">
          <PatternEmblem />

          <p className="mt-10 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
            Pattern Creator
          </p>

          <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Need a loading
            <br />
            pattern?
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground">
            A guided decision tree. Surface, duration, what the user is doing
            &mdash; answer a few questions and out comes the loading pattern
            best suited to your case. Each one ships with a working demo to
            study and a code snippet ready to drop into your project.
          </p>

          <WaitlistForm />
        </div>
      </section>
    </article>
  );
}

/**
 * Registration-mark `+` at one corner of the hero frame. Four of these,
 * one per corner, evoke the architectural-blueprint aesthetic from the
 * inspiration without enclosing the content in a heavy border.
 */
function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position[0] === "t";
  const isLeft = position[1] === "l";
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-3 text-foreground/30",
        isTop ? "-top-1.5" : "-bottom-1.5",
        isLeft ? "-left-1.5" : "-right-1.5",
      )}
    >
      <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-current" />
    </span>
  );
}

