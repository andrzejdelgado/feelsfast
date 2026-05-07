"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarSections, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="flex h-full min-h-screen flex-col gap-8 px-6 py-8 text-sm"
    >
      <Link href="/" className="block leading-none">
        <span className="text-base font-medium tracking-tight text-foreground">
          {siteConfig.name}
        </span>
        <span className="ml-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          .fyi
        </span>
      </Link>

      <ul className="flex flex-col gap-0.5">
        {sidebarSections.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden
                />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-sm bg-primary/10 px-1.5 py-0 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-primary">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col gap-2 text-xs text-muted-foreground">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider">
          v0.1 · phase 0
        </span>
      </div>
    </nav>
  );
}
