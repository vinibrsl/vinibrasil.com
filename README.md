# Vinicius Brasil blog

A personal dev blog. Static, fast, minimal — built with [Astro](https://astro.build),
written in Markdown, deployed to Cloudflare Pages.

## Stack

- **Astro v5** — static output, near-zero client JS
- **Markdown** posts in `src/content/blog/`, validated by a type-safe schema
- **Shiki** syntax highlighting at build time
- **Departure Mono** for titles, a single retro-blue accent, warm paper theme + dark mode
- Built-in **RSS** (`/rss.xml`), **sitemap**, and full Open Graph / Twitter meta

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview  # serve the build locally
```

## Writing a post

Add a Markdown file to `src/content/blog/`. The filename becomes the URL slug
(`my-post.md` → `/my-post/`). Frontmatter:

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

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add your custom domain under the project's **Custom domains** tab.

Every push to `main` redeploys automatically.

## Before going live

- Set your real domain in `astro.config.mjs` (`SITE`) and `public/robots.txt`.
- Update social handles / links in `src/consts.ts` and `src/pages/about.astro`.
- Add an `public/og-default.png` (1200×630) for link previews, or wire up
  per-post OG image generation.

## Fonts

Departure Mono is licensed under the SIL Open Font License; see
`public/fonts/DepartureMono-LICENSE.txt`.
