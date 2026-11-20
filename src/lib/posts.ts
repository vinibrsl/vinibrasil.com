import { getCollection, type CollectionEntry } from "astro:content";
import { AUTHOR } from "../consts";

export type Post = CollectionEntry<"blog">;

// Published posts, newest first. Shared by every page and feed so the
// ordering and draft filtering live in one place.
export async function getPosts(): Promise<Post[]> {
  return (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

// "August 25, 2024" — same long form the rendered pages use.
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Strip MDX-only syntax so the body reads as plain Markdown for LLMs and
// other Markdown consumers: ES imports and the self-closing diagram
// components (<BookLLM />) that only carry visual meaning.
export function toPlainMarkdown(body: string, site: URL): string {
  const imports = Object.fromEntries(
    [...body.matchAll(/^import (\w+) from ["']([^"']+)["']/gm)].map(
      ([, name, source]) => [name, source],
    ),
  );
  return body
    .replace(
      /<Figure\b[^>]*src=\{(\w+)\}[^>]*alt="([^"]*)"[^>]*>[\s\S]*?<\/Figure>/g,
      (_, source, alt) => `![${alt}](${imports[source]})`,
    )
    .replace(/^import\s.+?$/gm, "")
    .replace(/^\s*<[A-Z][\w.]*\s*\/>\s*$/gm, "")
    .replace(/(\]\()([^)]+)(\))/g, (_, open, destination, close) => {
      if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(destination)) {
        return `${open}${destination}${close}`;
      }
      const path = destination.replace(/^\.\.\/\.\.\/assets\//, "/assets/");
      return `${open}${new URL(path, site).href}${close}`;
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// A single post rendered as a self-contained Markdown document: title,
// description, byline/dates, then the cleaned body.
export function postToMarkdown(post: Post, site: URL): string {
  const { title, description, pubDate, updatedDate } = post.data;
  const meta = [`Published ${formatDate(pubDate)} by ${AUTHOR}.`];
  if (updatedDate) meta.push(`Updated ${formatDate(updatedDate)}.`);

  return (
    [
      `# ${title}`,
      "",
      `> ${description}`,
      "",
      `_${meta.join(" ")}_`,
      "",
      "---",
      "",
      toPlainMarkdown(post.body, site),
    ].join("\n") + "\n"
  );
}
