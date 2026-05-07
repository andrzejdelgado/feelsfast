import type { MDXComponents } from "mdx/types";
import { ArrowUpRight } from "lucide-react";
import { ArticleWrapper } from "@/components/ArticleWrapper";
import { Cite } from "@/components/Cite";
import { CodeBlock } from "@/components/CodeBlock";

/**
 * True when the href points off-site. Anchor links (`#foo`), site-relative
 * links (`/concepts/...`), and protocol-relative `//` are all internal.
 */
function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return /^https?:\/\//.test(href);
}

/**
 * Global MDX components for feelsfast.fyi.
 *
 * Registers our typography defaults (so MDX prose renders in the project's
 * voice without per-page styling) and our custom components (Cite, …).
 *
 * The `wrapper` constrains the article to `max-w-3xl` for ~75-character
 * measure — wide enough to feel comfortable on desktop, narrow enough to
 * stay readable. Sits flush left in the main column rather than centered,
 * which preserves the full-bleed sidebar layout.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-medium leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-14 text-2xl font-medium tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 text-xl font-medium tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mt-4 leading-relaxed text-foreground" {...props}>
        {children}
      </p>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mt-4 list-decimal space-y-2 pl-6 text-foreground"
        {...props}
      >
        {children}
      </ol>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mt-4 list-disc space-y-2 pl-6 text-foreground"
        {...props}
      >
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => {
      const external = isExternal(href);
      return (
        <a
          href={href}
          className="text-primary underline-offset-2 hover:underline"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          {...props}
        >
          {children}
          {external ? (
            <ArrowUpRight
              aria-hidden
              className="ml-0.5 inline-block size-[0.85em] -translate-y-[0.05em] align-baseline"
            />
          ) : null}
        </a>
      );
    },
    dl: ({ children, ...props }) => (
      <dl className="mt-4 space-y-4 text-sm" {...props}>
        {children}
      </dl>
    ),
    dt: ({ children, ...props }) => (
      <dt
        className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground"
        {...props}
      >
        {children}
      </dt>
    ),
    dd: ({ children, ...props }) => (
      <dd className="mt-1 leading-relaxed text-foreground" {...props}>
        {children}
      </dd>
    ),
    hr: (props) => <hr className="my-12 border-t border-border" {...props} />,
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
    code: ({ children, className, ...props }) => {
      // Block code (inside <pre>) carries a `language-*` className from the MDX
      // parser. Inline code has none. Style only the inline case here; CodeBlock
      // handles the block presentation.
      if (className?.startsWith("language-")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.875em]"
          {...props}
        >
          {children}
        </code>
      );
    },
    Cite,
    wrapper: ({ children }) => <ArticleWrapper>{children}</ArticleWrapper>,
  };
}
