import type { APIRoute } from "astro";
import { readingToMarkdown } from "../lib/reading";

// Markdown twin of /reading/, for LLMs and agents.
export const GET: APIRoute = () =>
  new Response(readingToMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
