import type { APIRoute, GetStaticPaths } from "astro";
import { getPosts, postToMarkdown, type Post } from "../lib/posts";

// A clean Markdown twin of every post, served at /<slug>.md alongside the
// HTML page at /<slug>/. Lets LLMs and agents fetch the prose without
// parsing layout, nav, or styling. Linked from each post's <head> and
// from /llms.txt.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(postToMarkdown(props.post as Post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
