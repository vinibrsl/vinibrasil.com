// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeMermaid from "rehype-mermaid";
import rehypeFigure from "@microflash/rehype-figure";
import { visit } from "unist-util-visit";
import { cp } from "node:fs/promises";

// Update this to your production domain before deploying.
export const SITE = "https://vinibrasil.com";

function rehypeImageSizes() {
  return (tree) => {
    visit(tree, { tagName: "img" }, (node) => {
      node.properties.sizes =
        "(min-width: 672px) 608px, calc(100vw - clamp(40px, 10vw, 64px))";
      if (node.properties.src.endsWith(".png")) node.properties.quality = 90;
    });
  };
}

/**
 * "Paper" — the code listing theme. A flat panel keyed to the site's own
 * paper palette (matches the notes/figures/tables), so it reads as part of
 * the document. Monochrome ink varied by weight of grey — muted for
 * comments, full --fg for keywords.
 * Colours mirror the --bg-soft / --fg / --fg-soft / --muted design tokens. */
const paperListing = {
  name: "paper-listing",
  type: "light",
  colors: {
    "editor.background": "#ebe6db", // --bg-soft
    "editor.foreground": "#1c1b18", // --fg
  },
  settings: [
    { settings: { foreground: "#1c1b18" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#847f72", fontStyle: "italic" }, // --muted
    },
    {
      scope: ["string", "string.quoted", "constant.other.symbol"],
      settings: { foreground: "#423f38" }, // --fg-soft
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#2f2e28" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.control"],
      settings: { foreground: "#1c1b18" }, // --fg
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#36352f" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#423f38" },
    },
    { scope: ["entity.name.tag"], settings: { foreground: "#1c1b18" } },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#423f38" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator"],
      settings: { foreground: "#847f72" }, // --muted
    },
  ],
};

export default defineConfig({
  site: SITE,
  // mdx() inherits the markdown config below (rehype figures/mermaid, Shiki
  // theme), so .md and .mdx posts render identically — .mdx just adds the
  // ability to import components (see src/components/diagrams/).
  integrations: [
    mdx(),
    sitemap(),
    {
      name: "source-images",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          await cp(new URL("./src/assets/", import.meta.url), dir, {
            recursive: true,
          });
        },
      },
    },
  ],
  image: {
    layout: "constrained",
  },
  markdown: {
    // Render ```mermaid blocks to inline SVG at build time (Playwright);
    // ships zero client JS. Shiki must skip the language so the plugin sees
    // a plain <code class="language-mermaid"> to transform.
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    rehypePlugins: [
      rehypeImageSizes,
      [rehypeFigure, { className: "fig" }],
      // Neutral base; all palette/blue theming lives in one CSS block
      // (.post-body svg[id^="mermaid-"] …) in global.css. Mermaid sizes each
      // label box to the font it lays out with, so we render at build time
      // with the SAME face the page displays (Departure Mono, loaded into the
      // headless Chromium via `css`). Match the build font to the display font
      // and the centering offsets Mermaid bakes in stay correct — otherwise
      // labels drift inside their boxes.
      [
        rehypeMermaid,
        {
          strategy: "inline-svg",
          css: new URL("./src/styles/mermaid-build.css", import.meta.url),
          mermaidConfig: {
            theme: "neutral",
            fontFamily: '"Departure Mono", monospace',
          },
        },
      ],
    ],
    shikiConfig: {
      // A flat paper listing keyed to the site's paper palette.
      theme: paperListing,
      // Expose the language so CSS can print it as a mono corner tag.
      transformers: [
        {
          pre(node) {
            node.properties["data-language"] = this.options.lang;
          },
        },
      ],
    },
  },
});
