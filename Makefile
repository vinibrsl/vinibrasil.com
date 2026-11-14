.PHONY: dev build og deploy precommit

dev:
	npx astro dev

build:
	npx astro build

og:
	node scripts/generate-og.mjs

deploy: og
	$(MAKE) build
	npx wrangler deploy

precommit: og
	git add public/og
