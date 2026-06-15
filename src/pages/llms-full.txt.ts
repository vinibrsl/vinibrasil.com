import type { APIRoute } from "astro";
import { getPosts, postToMarkdown } from "../lib/posts";
import { travelToMarkdown } from "../lib/travel";
import { readingToMarkdown } from "../lib/reading";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

// /llms-full.txt — the whole site inlined as Markdown: every post (newest
// first) plus the reading and travel lists. Small enough to hand an LLM in a
// single fetch.
export const GET: APIRoute = async () => {
  const posts = await getPosts();

  const body = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    ...posts.map(postToMarkdown),
    readingToMarkdown(),
    travelToMarkdown(),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
