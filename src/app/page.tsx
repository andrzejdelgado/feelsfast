import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <article className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-2xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        feelsfast.fyi · v0.1
      </p>
      <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        How fast a website feels
        <br />
        is the only kind of fast that matters.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {siteConfig.description}
      </p>
      <p className="mt-12 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Phase 0 · scaffold complete · layout shell live · content and demos to follow
      </p>
    </article>
  );
}
