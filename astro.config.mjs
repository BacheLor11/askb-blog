import { defineConfig } from 'astro/config';

// 站点根域名，RSS 等绝对链接会用到
export default defineConfig({
  site: 'https://askb.app',
  // 关闭开发模式底部的 Astro 调试工具条（生产构建本来就不会出现）
  devToolbar: { enabled: false },
});
