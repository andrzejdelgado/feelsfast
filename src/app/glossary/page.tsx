import type { Metadata } from "next";
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
            className={`group scroll-mt-24 py-5 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <dt className="flex flex-wrap items-baseline gap-3">
              <span className="text-lg font-medium tracking-tight text-foreground">
                {entry.term}
              </span>
              <a
                href={`#${entry.id}`}
                aria-label={`Link to ${entry.term}`}
                className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 focus-visible:opacity-100"
              >
                #{entry.id}
              </a>
            </dt>
            <dd className="mt-2 max-w-3xl pl-3 text-sm leading-relaxed text-foreground">
              {entry.definition}
              {entry.seeAlso ? (
                <>
                  {" "}
                  <Link
                    href={entry.seeAlso.href}
                    className="font-mono text-[0.75rem] font-medium uppercase tracking-wider text-primary hover:underline"
                  >
                    See {entry.seeAlso.label} →
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
