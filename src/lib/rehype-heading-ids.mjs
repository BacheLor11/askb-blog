// 给 markdown 标题生成稳定的 id 锚点。
// Astro 默认不为标题写 id，导致站内 #锚点 跳转无效；此插件补上，供「按日期跳转」等使用。
// 自包含实现，不依赖任何外部包。

function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) return node.children.map(textOf).join('');
  return '';
}

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[^\p{L}\p{N}\-_]/gu, '') // 保留文字/数字/连字符/下划线
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function rehypeHeadingIds() {
  return (tree) => {
    const seen = new Map();
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName || '')) {
        node.properties = node.properties || {};
        if (!node.properties.id) {
          const base = slugify(textOf(node)) || 'section';
          const n = seen.get(base) || 0;
          seen.set(base, n + 1);
          node.properties.id = n === 0 ? base : `${base}-${n}`;
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}
