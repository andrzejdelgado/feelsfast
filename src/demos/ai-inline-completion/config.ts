import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Inline completion",
  description:
    "User types in a notes editor; the AI suggests an ending for the current line as ghost text. Naive: fires on every keystroke, no abort. Tuned: 200 ms debounce, abort on next keystroke, Tab to accept.",
  timeBand: "100 MS – 1 S",
};

export const COMPLETION_P50_MS = 600;
export const DEBOUNCE_MS = 200;

/**
 * A toy "completion model": match the last (incomplete) line by its
 * leading verb and return a plausible ending. Lower-cased; first match
 * wins.
 */
const RULES: readonly { prefix: string; ending: string }[] = [
  { prefix: "buy", ending: " milk, bread, and eggs" },
  { prefix: "fix", ending: " the login button alignment" },
  { prefix: "call", ending: " the dentist about the appointment" },
  { prefix: "email", ending: " Sarah about the design review" },
  { prefix: "review", ending: " the Q3 budget spreadsheet" },
  { prefix: "schedule", ending: " a 1:1 with the team lead" },
  { prefix: "write", ending: " the project proposal draft" },
  { prefix: "ship", ending: " the staging deploy" },
  { prefix: "talk", ending: " to legal about the contract" },
  { prefix: "read", ending: " the new design spec" },
  { prefix: "draft", ending: " the kick-off email" },
  { prefix: "send", ending: " the weekly status update" },
];

export function predictCompletion(text: string): string {
  if (!text) return "";
  const lastLine = text.split("\n").pop() ?? "";
  const trimmed = lastLine.trim().toLowerCase();
  if (!trimmed) return "";
  for (const { prefix, ending } of RULES) {
    if (
      trimmed === prefix ||
      trimmed.startsWith(prefix + " ") ||
      trimmed === prefix + ""
    ) {
      // Continue from where the user is.
      const remainder = lastLine.slice(lastLine.toLowerCase().indexOf(prefix) + prefix.length);
      if (remainder.length === 0) return ending;
      // If user already typed something after the verb, replace the ending.
      // For demo purposes we just return the canonical ending tail; production
      // models would obviously do real completion.
      return ending.slice(remainder.length) || "";
    }
  }
  return "";
}
