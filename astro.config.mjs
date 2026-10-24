import { defineConfig } from 'astro/config';
import rehypeHeadingIds from './src/lib/rehype-heading-ids.mjs';

// 站点根域名，RSS 等绝对链接会用到
export default defineConfig({
  site: 'https://askb.app',
  // 关闭开发模式底部的 Astro 调试工具条（生产构建本来就不会出现）
  devToolbar: { enabled: false },
  // 给 markdown 标题自动加 id，供站内锚点跳转（如「大肥鱼带你刷知乎」按日期跳转）
  markdown: { rehypePlugins: [rehypeHeadingIds] },
});
