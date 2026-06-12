const fs = require('fs');
let html = fs.readFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-11\\index.html', 'utf8');

// Fix meta-venue labels for 06-11
// "📌 new" → 删除（新论文是默认状态，不需要标记）
html = html.replace(/<span class="meta-venue">📌 new<\/span>/g, '');
// "📌 cross" → "📌 跨领域"
html = html.replace(/<span class="meta-venue">📌 cross<\/span>/g, '<span class="meta-venue">📌 跨领域</span>');
// "📌 replace" → "🔄 更新"
html = html.replace(/<span class="meta-venue">📌 replace<\/span>/g, '<span class="meta-venue">🔄 更新</span>');

fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-11\\index.html', html, 'utf8');
console.log('06-11 meta-venue fixed');
