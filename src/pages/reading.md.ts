import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { toPlainMarkdown } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const page = await getEntry("pages", "reading");
  if (!page) throw new Error("Missing reading page");
  return new Response(`# ${page.data.title}\n\n> ${page.data.description}\n\n${toPlainMarkdown(page.body, site!)}`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
