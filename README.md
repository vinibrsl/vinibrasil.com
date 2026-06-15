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
- Served as pure **Cloudflare Static Assets** (no Worker, zero compute); `www` → apex is a Cloudflare Redirect Rule

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

Pushes to `main` deploy automatically via [Cloudflare Workers
Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) (Git
integration). CI runs `npm run build:ci` (`astro build` only — no Playwright)
and deploys with `npx wrangler deploy`; config lives in `wrangler.jsonc`.

To deploy by hand instead:

```sh
npm run deploy   # npm run build && wrangler deploy
```

The build is served directly from Cloudflare Static Assets — there's no Worker
script, so requests incur no compute. The `www` → apex 301 is handled by a
Cloudflare Redirect Rule at the edge. Routes (apex + `www`) are bound in
`wrangler.jsonc` and require `vinibrasil.com` to be an active zone in the
Cloudflare account.

### Open Graph cards

The CI build does **not** run Playwright, so the generated cards in `public/og/`
are committed to the repo. A `pre-commit` hook (in `.githooks/`, wired up by
`npm install`'s `prepare` script) regenerates and stages them automatically
whenever a commit touches `src/content/blog/`, the fonts, or the generator.
Regenerate manually any time with `npm run og`.

## Fonts

Departure Mono is licensed under the SIL Open Font License; see
`public/fonts/DepartureMono-LICENSE.txt`.
