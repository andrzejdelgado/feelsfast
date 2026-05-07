import { HeroPerceptionDemo } from "@/components/HeroPerceptionDemo";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <article className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-4xl flex-col justify-center px-8 py-24 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        feelsfast.fyi · v0.1
      </p>
      <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        Learn how to engineer user experiences that feel fast
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {siteConfig.description}
      </p>
      <HeroPerceptionDemo />
    </article>
  );
}
