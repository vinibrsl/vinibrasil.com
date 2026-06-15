// Build-time Open Graph card generator.
//
// Renders one 1200×630 PNG per post (plus a site-wide default) into
// public/og/, so every shared link gets a branded preview. We reuse the
// Playwright that rehype-mermaid already pulls in — same headless Chromium,
// no new dependency — and render with the SAME woff2 faces the site ships
// (embedded as base64) so the cards match the page exactly: warm paper,
// Newsreader headline, Departure Mono chrome, one retro-blue accent.
//
// Wired into `npm run build` (see package.json) ahead of `astro build`,
// which then copies public/og/ into dist/ like any other static asset.

import { chromium } from "playwright";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const blogDir = path.join(root, "src/content/blog");
const fontDir = path.join(root, "public/fonts");
const outDir = path.join(root, "public/og");

const SITE_TITLE = "Vinicius Brasil";
const WIDTH = 1200;
const HEIGHT = 630;

// ── fonts, inlined so Chromium needs no network/filesystem lookups ──
const b64 = (file) =>
  readFileSync(path.join(fontDir, file)).toString("base64");
const FONTS = {
  newsreader: b64("Newsreader-Roman.woff2"),
  newsreaderItalic: b64("Newsreader-Italic.woff2"),
  mono: b64("DepartureMono-Regular.woff2"),
};

// ── minimal frontmatter reader (avoids a YAML/gray-matter dependency) ──
// Only the handful of scalar fields the card needs.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim().replace(/^["']|["']$/g, "");
    data[key] = val;
  }
  return data;
}

const esc = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function template({ title, description, eyebrow }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{font-family:"Newsreader";src:url(data:font/woff2;base64,${FONTS.newsreader}) format("woff2");font-weight:400 600;font-style:normal}
    @font-face{font-family:"Newsreader";src:url(data:font/woff2;base64,${FONTS.newsreaderItalic}) format("woff2");font-weight:400 600;font-style:italic}
    @font-face{font-family:"Departure Mono";src:url(data:font/woff2;base64,${FONTS.mono}) format("woff2");font-weight:400;font-style:normal}
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${WIDTH}px;height:${HEIGHT}px}
    body{
      background:#f4f1ea;color:#1c1b18;
      font-family:"Newsreader",Georgia,serif;
      display:flex;flex-direction:column;
      padding:72px 80px;position:relative;
      border:1px solid #ddd7c9;
    }
    .frame{position:absolute;inset:28px;border:1.5px solid #ddd7c9;pointer-events:none}
    .mark{
      font-family:"Departure Mono",monospace;font-size:24px;
      letter-spacing:0.08em;text-transform:uppercase;color:#1c1b18;
      display:flex;align-items:center;gap:14px;
    }
    .mark .dot{width:11px;height:11px;background:#2a4fd6;display:inline-block}
    .body{flex:1;display:flex;flex-direction:column;justify-content:center;max-width:980px}
    .eyebrow{
      font-family:"Departure Mono",monospace;font-size:20px;
      letter-spacing:0.08em;text-transform:uppercase;color:#847f72;
      margin-bottom:26px;
    }
    h1{
      font-size:74px;font-weight:560;line-height:1.08;
      letter-spacing:-0.018em;text-wrap:balance;color:#1c1b18;
    }
    p.desc{
      font-size:31px;line-height:1.4;color:#423f38;
      margin-top:30px;font-style:italic;max-width:900px;
      display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
    }
    .foot{
      font-family:"Departure Mono",monospace;font-size:20px;
      letter-spacing:0.08em;text-transform:uppercase;color:#847f72;
      display:flex;justify-content:space-between;align-items:center;
    }
    .foot .rule{height:1px;background:#ddd7c9;flex:1;margin:0 22px}
  </style></head><body>
    <div class="frame"></div>
    <div class="mark"><span class="dot"></span>${esc(SITE_TITLE)}</div>
    <div class="body">
      ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ""}
      <h1>${esc(title)}</h1>
      ${description ? `<p class="desc">${esc(description)}</p>` : ""}
    </div>
    <div class="foot"><span>${eyebrow ? "Essay" : "Blog"}</span><span class="rule"></span><span>vinibrsl.dev</span></div>
  </body></html>`;
}

const fmtDate = (raw) => {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

async function main() {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const cards = [];

  // Site-wide default (home / list pages / fallback).
  cards.push({
    slug: "default",
    title: "Small notes on big ideas, code, and a curious life.",
    description: "",
    eyebrow: "",
  });

  for (const file of readdirSync(blogDir)) {
    if (!/\.(md|mdx)$/.test(file)) continue;
    const raw = readFileSync(path.join(blogDir, file), "utf8");
    const fm = parseFrontmatter(raw);
    if (String(fm.draft) === "true") continue;
    cards.push({
      slug: file.replace(/\.(md|mdx)$/, ""),
      title: fm.title || "Untitled",
      description: fm.description || "",
      eyebrow: fmtDate(fm.pubDate),
    });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2, // crisp on retina / when platforms upscale
  });

  for (const card of cards) {
    await page.setContent(template(card), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(outDir, `${card.slug}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    console.log(`og: ${card.slug}.png`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
