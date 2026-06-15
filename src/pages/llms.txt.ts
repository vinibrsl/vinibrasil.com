import type { APIRoute } from "astro";
import { getPosts, formatDate } from "../lib/posts";
import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR } from "../consts";

// /llms.txt — the llmstxt.org index. A concise, link-first map of the site
// so language models can find and fetch the content efficiently. Links point
// at the Markdown twins (/<slug>.md); the full text lives at /llms-full.txt.
export const GET: APIRoute = async ({ site }) => {
  const base = site?.origin ?? "";
  const posts = await getPosts();

  const lines = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Personal site of ${AUTHOR}, a software engineer based in Curitiba, Brazil, building the backbone for agentic AI at CrewAI. Writing on building software, AI, and the curious life around it.`,
    "",
    "## Posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${base}/${post.id}.md): ${post.data.description} (${formatDate(post.data.pubDate)})`,
    ),
    "",
    "## Pages",
    "",
    `- [Reading](${base}/reading.md): books I've read, logged by year, with notes`,
    `- [Travel](${base}/travel.md): places I've been, logged by year`,
    "",
    "## Optional",
    "",
    `- [Full text of every post](${base}/llms-full.txt): all posts concatenated as Markdown`,
    `- [RSS feed](${base}/rss.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
