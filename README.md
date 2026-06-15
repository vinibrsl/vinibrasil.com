# Vinicius Brasil — blog

My personal blog: short notes on big ideas, code, and a curious life. Static,
fast, and minimal — built with [Astro](https://astro.build), written in
Markdown, and deployed to [Cloudflare Workers](https://workers.cloudflare.com).

Live at **[vinibrasil.com](https://vinibrasil.com)**.

![Screenshot of the blog homepage](docs/screenshot.png)

## Stack

- **Astro v5** — static output, near-zero client JS
- **Markdown / MDX** posts in `src/content/blog/`, validated by a type-safe schema
- **Shiki** syntax highlighting and **Mermaid** diagrams rendered at build time
- **Departure Mono** + **Newsreader**, a single retro-blue accent, warm paper theme
- Auto-generated **Open Graph cards** (`scripts/generate-og.mjs`), **RSS** (`/rss.xml`), and **sitemap**
- **LLM-ready**: an [`/llms.txt`](https://llmstxt.org) index, `/llms-full.txt`, and a clean Markdown twin of every post at `/<slug>.md` (see `src/lib/posts.ts`)
- A thin **Cloudflare Worker** (`src/worker.js`) that 301-redirects `www` → apex

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # generates OG cards, then builds to dist/
npm run preview  # serve the build locally
```

## Writing a post

Add a Markdown (or MDX) file to `src/content/blog/`. The filename becomes the
URL slug (`my-post.md` → `/my-post/`). Frontmatter:

```yaml
---
title: "My post"
description: "One-line summary, used for SEO and the RSS feed."
pubDate: 2026-06-14
updatedDate: 2026-06-20   # optional
tags: ["software"]        # optional
draft: false              # optional; drafts are excluded from build
---
```

## Deploy (Cloudflare Workers)

Deployment uses [Wrangler](https://developers.cloudflare.com/workers/wrangler/);
config lives in `wrangler.jsonc`.

```sh
npm run deploy   # npm run build && wrangler deploy
```

The build is served from Cloudflare Static Assets with `src/worker.js` in front.
Routes (apex + `www`) are bound in `wrangler.jsonc` and require `vinibrasil.com`
to be an active zone in the Cloudflare account.

## Fonts

Departure Mono is licensed under the SIL Open Font License; see
`public/fonts/DepartureMono-LICENSE.txt`.
