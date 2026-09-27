import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const GET: APIRoute = async () => {
  const page = await getEntry("pages", "travel");
  if (!page) throw new Error("Missing travel page");
  return new Response(`# ${page.data.title}\n\n> ${page.data.description}\n\n${page.body}`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
