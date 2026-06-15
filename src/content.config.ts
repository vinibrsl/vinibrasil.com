import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Posts are Markdown files in src/content/blog/.
// Frontmatter is validated against this schema at build time —
// a typo or missing field fails the build instead of shipping broken.
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
