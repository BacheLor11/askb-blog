import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章集合：所有文章放在 src/content/blog/ 下，写好 .md 自动收录
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

// 关于页：单一 md 驱动，放在 src/content/about/about.md，方便在 Obsidian 里改
const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { blog, about };
