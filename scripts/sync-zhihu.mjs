#!/usr/bin/env node
// 把 dsh-zhihu-scroll 产出的月报 md 同步进博客内容目录
// 用法: node scripts/sync-zhihu.mjs [out目录]
// 默认读取 /Volumes/askb-d/Agent-Projects/dsh-zhihu-scroll/zhihu-duty/out
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const OUT =
  process.argv[2] ||
  '/Volumes/askb-d/Agent-Projects/dsh-zhihu-scroll/zhihu-duty/out';
const DEST = path.join(repoRoot, 'src/content/zhihu');

if (!fs.existsSync(OUT)) {
  console.error(`[sync-zhihu] out 目录不存在: ${OUT}`);
  process.exit(1);
}
fs.mkdirSync(DEST, { recursive: true });

let n = 0;
for (const f of fs.readdirSync(OUT)) {
  if (!f.endsWith('.md')) continue;
  const raw = fs.readFileSync(path.join(OUT, f), 'utf8');

  const m = f.match(/(\d{4})年(\d{1,2})月/);
  if (!m) {
    console.warn(`[sync-zhihu] 跳过（文件名无年月）: ${f}`);
    continue;
  }
  const month = `${m[1]}-${String(m[2]).padStart(2, '0')}`;

  const titleLine =
    (raw.match(/^#\s+(.+)$/m) || [])[1]?.trim() || `大肥鱼带你刷知乎 · ${m[1]}年${m[2]}月`;
  const count = (raw.match(/本月共\s*\*\*(\d+)\*\*\s*条/) || [])[1] || null;
  const updated = (raw.match(/更新于\s*([0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}\s+[0-9:]+)/) || [])[1] || null;

  // 正文：从第一个「## YYYY-MM-DD」开始，去掉结尾的生成说明
  let bodyStart = raw.search(/^##\s+\d{4}-\d{2}-\d{2}/m);
  let body = bodyStart >= 0 ? raw.slice(bodyStart) : raw;
  const footIdx = body.indexOf('由 `dsh-zhihu-scroll`');
  if (footIdx > 0) body = body.slice(0, footIdx);
  body = body.replace(/\n-{3,}\s*$/, '').trim() + '\n';

  const fmLines = ['---', `month: "${month}"`];
  fmLines.push(`title: "${titleLine.replace(/"/g, '\\"')}"`);
  if (count) fmLines.push(`count: ${count}`);
  if (updated) fmLines.push(`updated: "${updated}"`);
  fmLines.push('---', '');

  fs.writeFileSync(path.join(DEST, `${month}.md`), fmLines.join('\n') + body);
  console.log(`[sync-zhihu] ${f}  ->  ${month}.md  (${count || '?'} 条)`);
  n++;
}
console.log(`[sync-zhihu] 完成，共同步 ${n} 个月份到 ${path.relative(repoRoot, DEST)}/`);
