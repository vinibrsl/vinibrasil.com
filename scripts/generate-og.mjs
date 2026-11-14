import { chromium } from "playwright";
import { readFileSync, readdirSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const blogDir = path.join(root, "src/content/blog");
const fontDir = path.join(root, "public/fonts");
const outDir = path.join(root, "public/og");
const cacheDir = path.join(root, ".cache/og");
const cacheFile = path.join(cacheDir, "hashes.json");

const SITE_TITLE = "Vinicius Brasil";
const WIDTH = 1200;
const HEIGHT = 630;

// ── fonts, inlined so Chromium needs no network/filesystem lookups ──
const b64 = (file) =>
  readFileSync(path.join(fontDir, file)).toString("base64");
const FONTS = {
  newsreader: b64("Newsreader-Roman.woff2"),
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

function firstImage(raw, file) {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, "");
  const match = body.match(
    /!\[[^\]]*\]\(([^\s)]+)\)|<img\b[^>]*\bsrc=["'](\/[^"']+)["']|<Figure\b[^>]*\bsrc=\{(\w+)\}/,
  );
  if (!match) return "";
  const imports = Object.fromEntries(
    [...body.matchAll(/^import (\w+) from ["']([^"']+)["']/gm)].map(
      ([, name, source]) => [name, source],
    ),
  );
  const src = match[1] || match[2] || imports[match[3]];
  if (URL.canParse(src)) return "";
  const extension = path.extname(src).slice(1).toLowerCase();
  const mime = extension === "jpg" ? "jpeg" : extension;
  const source = src.startsWith("/")
    ? path.join(root, "src/assets", src)
    : path.resolve(blogDir, path.dirname(file), src);
  const data = readFileSync(source).toString("base64");
  return `data:image/${mime};base64,${data}`;
}

function template({ title, slug, image }) {
  const isHome = slug === "default";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{font-family:"Newsreader";src:url(data:font/woff2;base64,${FONTS.newsreader}) format("woff2");font-weight:400 600;font-style:normal}
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${WIDTH}px;height:${HEIGHT}px}
    body{
      background:#f4f1ea;color:#1c1b18;
      font-family:"Newsreader",Georgia,serif;
      display:flex;flex-direction:column;
      padding:64px 76px;
      -webkit-font-smoothing:antialiased;
    }
    .copy{display:flex;flex-direction:column;flex:1;min-width:0}
    body.illustrated{flex-direction:row;gap:48px}
    .illustrated .copy{flex:0 0 520px}
    .illustrated h1{font-size:64px}
    .illustration{width:480px;height:100%;object-fit:contain}
    .body{flex:1;display:flex;align-items:center}
    h1{
      max-width:1000px;font-size:${isHome ? 116 : 88}px;
      font-weight:450;line-height:1.04;
      letter-spacing:-0.025em;text-wrap:pretty;
    }
  </style></head><body class="${image ? "illustrated" : ""}">
    <div class="copy">
    <div class="body">
      <h1>${esc(title)}</h1>
    </div>
    </div>
    ${image ? `<img class="illustration" src="${image}" alt="">` : ""}
  </body></html>`;
}

async function main() {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const cards = [];

  // Site-wide default (home / list pages / fallback).
  cards.push({
    slug: "default",
    title: SITE_TITLE,
  });

  for (const file of readdirSync(blogDir)) {
    if (!/\.(md|mdx)$/.test(file)) continue;
    const raw = readFileSync(path.join(blogDir, file), "utf8");
    const fm = parseFrontmatter(raw);
    if (String(fm.draft) === "true") continue;
    cards.push({
      slug: file.replace(/\.(md|mdx)$/, ""),
      title: fm.title || "Untitled",
      image: firstImage(raw, file),
    });
  }

  const cached = existsSync(cacheFile)
    ? JSON.parse(readFileSync(cacheFile, "utf8"))
    : {};
  const hashes = {};
  const pending = cards.flatMap((card) => {
    const html = template(card);
    const hash = createHash("sha256").update(html).digest("hex");
    hashes[card.slug] = hash;
    const out = path.join(outDir, `${card.slug}.png`);
    return cached[card.slug] === hash && existsSync(out)
      ? []
      : [{ slug: card.slug, html, out }];
  });
  if (pending.length === 0) {
    console.log("og: all cards are up to date");
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  for (const card of pending) {
    await page.setContent(card.html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: card.out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    console.log(`og: ${card.slug}.png`);
  }

  await browser.close();
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cacheFile, JSON.stringify(hashes));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
