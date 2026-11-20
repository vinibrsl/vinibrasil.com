# Tailwind migration

## Rules

- Use utility classes for component layout and component-specific styles.
- Keep shared element styles in `src/styles/global.css`. Use `@apply` for these styles.
- Keep selectors for Markdown output in global CSS. Do not add classes to each content file.
- Use Tailwind's standard sizes, spacing, tracking, and breakpoints where they fit.
- Keep custom CSS only when utilities do not express the behavior clearly.
- Preserve focus states, reduced-motion behavior, and responsive layouts.
- Keep Tailwind Preflight disabled unless we review its effect on the whole site.

## Theme and global elements

- [x] Expose the existing colors, font families, and layout tokens through Tailwind's `@theme` configuration.
- [x] Replace custom-property utility syntax with named utilities where theme tokens permit it.
- [x] Convert shared `html`, `body`, and `main` styles to global rules with `@apply`.
- [x] Convert shared heading styles and responsive heading sizes to global rules with `@apply`.
- [x] Convert shared `a` styles and link states to global rules with `@apply`.
- [x] Convert shared `em`, `i`, and focus styles to global rules with `@apply`.
- [x] Convert `.label` to a shared global rule with `@apply`.
- [x] Replace `.muted` with a text-color utility at its call sites.
- [x] Remove redundant `.page-title` styles after checking heading inheritance.
- [x] Keep `@font-face` declarations and rendering properties that still need custom CSS.

## Layouts and pages

- [x] Move the page width and spacing from `body > *` into `src/layouts/Base.astro` utility classes.
- [x] Convert `.post-header` and `.post-eyebrow` in `src/layouts/Post.astro` to utility classes.
- [x] Replace the inline updated-date margin in `src/layouts/Post.astro` with `mt-4`.
- [x] Convert the intro and post list in `src/pages/index.astro` to utility classes.
- [x] Convert the page wrappers in `src/pages/about.astro`, `src/pages/reading.astro`, and `src/pages/travel.astro`.
- [x] Convert the remaining scoped styles in `src/pages/404.astro` to utility classes.

## Markdown and post content

- [x] Convert `.post-body` spacing and heading spacing to global rules with `@apply`.
- [x] Convert post links, images, blockquotes, lists, and task lists to global rules with `@apply`.
- [x] Convert table, cell, and table-heading styles to global rules with `@apply`.
- [x] Convert inline code and Shiki code-block styles to global rules with `@apply`.
- [x] Convert code-language labels and figure labels to global rules with `@apply`.
- [x] Convert note styles and wide-screen margin notes to global rules with `@apply`.
- [x] Convert reading and travel log styles under `.log-page` to global rules with `@apply`.
- [x] Review the unused Markdown `hr` styling before removing or replacing it.

## Figures, embeds, and diagrams

- [x] Convert `src/components/Figure.astro` layout to utility classes.
- [x] Keep shared figure styles for Markdown-generated figures in global CSS with `@apply`.
- [x] Convert shared captions, embed frames, and iframe styles to global rules with `@apply`.
- [x] Convert the shared `.diagram` layout to a global rule with `@apply`.
- [x] Convert `src/components/ScrollRail.astro` layout, typography, and interaction states to utilities where practical.
- [x] Convert layout and static styles in `src/components/diagrams/*.astro` to utilities where practical.
- [x] Keep custom diagram keyframes, SVG geometry, and scroll-driven properties where needed.
- [x] Keep Mermaid overrides global. Use `@apply` where it preserves precedence over generated styles.
- [x] Keep `src/styles/mermaid-build.css` compatible with the standalone build-time renderer.

## Review and verification

- [x] Review remaining arbitrary values in Header, Footer, and Divider against the standard Tailwind scale.
- [x] Remove each obsolete selector after migrating all its call sites.
- [x] Check CSS precedence between shared global rules and component utilities.
- [x] Check header and footer links, active navigation, and keyboard focus.
- [x] Check all page types at mobile and desktop widths.
- [x] Check diagram labels for overlap or clipping after typography changes.
- [x] Check code blocks, tables, captions, and notes with representative content.
- [x] Check reduced-motion behavior.
- [x] Run `rtk npx astro build`.
- [x] Run formatting checks on changed files.
- [x] Run `rtk git diff --check`.
