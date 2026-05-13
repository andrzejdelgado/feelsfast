import { readFileSync } from "node:fs";
import { join } from "node:path";

const WORDS_PER_MINUTE = 225;

function readTimeForFile(path: string): number {
  const raw = readFileSync(path, "utf8");
  const withoutImports = raw.replace(/^import .+;$/gm, "");
  const withoutMetadata = withoutImports.replace(
    /export const metadata\s*=\s*\{[\s\S]*?\};/,
    "",
  );
  const withoutJsx = withoutMetadata.replace(/<[^>]+>/g, " ");
  const words = withoutJsx.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Estimated read time in minutes for a Concepts essay.
 *
 * Reads the MDX source for `/concepts/<slug>` at build time, strips imports,
 * metadata, and JSX/MDX tags, then divides the remaining word count by
 * `WORDS_PER_MINUTE`. Minimum is 1 minute.
 */
export function getEssayReadTime(slug: string): number {
  return readTimeForFile(
    join(process.cwd(), "src", "app", "concepts", slug, "page.mdx"),
  );
}

/**
 * Estimated read time in minutes for a Scenario page.
 *
 * Same algorithm as `getEssayReadTime`, applied to `/scenarios/<slug>`.
 */
export function getScenarioReadTime(slug: string): number {
  return readTimeForFile(
    join(process.cwd(), "src", "app", "scenarios", slug, "page.mdx"),
  );
}
