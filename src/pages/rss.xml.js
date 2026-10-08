import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'A宝 · askb.app',
    description: 'A宝的个人博客：知乎长文、数据与随笔',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
    })),
  });
}
