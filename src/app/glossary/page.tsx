import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { glossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Short definitions of the terms used across feelsfast — active vs. passive phase, JND, INP, FID, LCP, TTI, FMP, optimistic UI, skeleton screen, predictive preloading, time band, and more. Cross-linked to the Concepts essays where each term is developed.",
};

export default function GlossaryPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {glossary.length} terms
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Glossary
      </h1>

      <dl className="mt-12">
        {glossary.map((entry, i) => (
          <div
            key={entry.id}
            id={entry.id}
            className={`scroll-mt-24 py-8 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <dt>
              <span className="text-lg font-medium tracking-tight text-foreground">
                {entry.term}
              </span>
            </dt>
            <dd className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground">
              {entry.definition}
              {entry.seeAlso ? (
                <>
                  {" "}
                  <Link
                    href={entry.seeAlso.href}
                    className="inline-flex items-center gap-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-primary hover:underline"
                  >
                    <span>See {entry.seeAlso.label}</span>
                    <ArrowRight aria-hidden className="size-3" />
                  </Link>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
