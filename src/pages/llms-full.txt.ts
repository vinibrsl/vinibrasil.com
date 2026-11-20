import type { APIRoute } from "astro";
import { getPosts, postToMarkdown, toPlainMarkdown } from "../lib/posts";
import { getEntry } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

// /llms-full.txt — the whole site inlined as Markdown: every post (newest
// first) plus the reading and travel lists. Small enough to hand an LLM in a
// single fetch.
export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const reading = await getEntry("pages", "reading");
  const travel = await getEntry("pages", "travel");
  if (!reading || !travel) throw new Error("Missing reading or travel page");

  const body = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    ...posts.map((post) => postToMarkdown(post, site!)),
    `# ${reading.data.title}\n\n> ${reading.data.description}\n\n${toPlainMarkdown(reading.body, site!)}`,
    `# ${travel.data.title}\n\n> ${travel.data.description}\n\n${toPlainMarkdown(travel.body, site!)}`,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
