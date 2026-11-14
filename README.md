# vinibrasil.com

My personal site, built with Astro and hosted on Cloudflare.

## Setup

```sh
npm install
npx playwright install chromium
```

## Commands

| Command | Action |
| --- | --- |
| `make dev` | Start the local server at http://localhost:4321. |
| `make build` | Build the site into `dist/`. |
| `make og` | Generate changed Open Graph cards. |
| `make deploy` | Generate cards, build, and deploy to Cloudflare. |
| `make precommit` | Generate and stage Open Graph cards. The Git hook runs this automatically. |

Cloudflare builds use `npm run build:ci`, an alias for `make build`.
