import type { APIRoute } from "astro";
import { travelToMarkdown } from "../lib/travel";

// Markdown twin of /travel/, for LLMs and agents.
export const GET: APIRoute = () =>
  new Response(travelToMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
