const fs = require('fs');
let html = fs.readFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', 'utf8');

// ============================================
// 修复1: replace 论文的首次提交时间 (从 arXiv API 查询的真实日期)
// ============================================
const dateMap = {
  '2603.11678': '2026-03-12',
  '2510.23320': '2025-10-27',
  '2602.00560': '2026-01-31',
  '2606.06940': '2026-06-05',
  '2606.10360': '2026-06-09',
  '2604.16287': '2026-04-17',
  '2603.03855': '2026-03-04',
  '2606.06065': '2026-06-04',
  '2509.15680': '2025-09-19',
  '2606.02220': '2026-06-01',
  '2510.01157': '2025-10-01',
  '2606.06921': '2026-06-05',
  '2606.10046': '2026-06-08',
  '2405.06995': '2024-05-11',
  '2606.05394': '2026-06-03',
  '2605.28882': '2026-05-26',
};

Object.entries(dateMap).forEach(([id, date]) => {
  const re = new RegExp(`(<article[^>]*id="${id}"[^>]*>[\\s\\S]*?🕐 首次提交: )[\\d-]+(</span>)`);
  html = html.replace(re, `$1${date}$2`);
});

// ============================================
// 修复2: meta-venue 显示
// ============================================
html = html.replace(/<span class="meta-venue">📌 replace<\/span>/g, '');
html = html.replace(/<span class="meta-venue">📌 cross<\/span>/g, '<span class="meta-venue">📌 跨领域</span>');
html = html.replace(/<span class="meta-venue">📌 replace-cross<\/span>/g, '');

// ============================================
// 修复3: 空标题 2606.11836
// ============================================
html = html.replace(
  '(<article class="paper-card tier-standard" id="2606.11836">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text"></h3></div>      <div class="paper-title-en">Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering</div>)',
  '(<article class="paper-card tier-standard" id="2606.11836">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text">面向语音基础模型的免数据免训练压缩</h3></div>      <div class="paper-title-en">Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering</div>)'
);

// ============================================
// 修复4: 2606.11903 完全缺失内容 - 填入摘要
// ============================================
// 这篇论文没有 tags-row, 没有 overview 内容，也没有 key-results
// 从 arxiv 摘要补充
const old11903 = '    <article class="paper-card tier-standard" id="2606.11903">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text"></h3></div>      <div class="paper-title-en">Snapping Matters: Context-Aware Onset Refinement for Automatic Music Transcription</div>      <div class="paper-meta"><span class="meta-author">👤 Abhirup Saha, Hans-Ulrich Berendes, Meinard Müller, Ben Maman</span><span class="meta-date">📅 2026-06-11</span></div>            <div class="paper-overview"><p></p></div>            <div class="paper-links"><a href="https://arxiv.org/abs/2606.11903" target="_blank" rel="noopener" class="link-btn link-arxiv">arXiv</a><a href="https://arxiv.org/pdf/2606.11903" target="_blank" rel="noopener" class="link-btn link-pdf">PDF</a><a href="https://abhirupsaha8.github.io" target="_blank" rel="noopener" class="link-btn link-project">🌐 Project</a></div>    </article>';

const new11903 = `    <article class="paper-card tier-standard" id="2606.11903">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text">音符起始点感知的自动音乐转录</h3></div>      <div class="paper-title-en">Snapping Matters: Context-Aware Onset Refinement for Automatic Music Transcription</div>      <div class="paper-meta"><span class="meta-author">👤 Abhirup Saha, Hans-Ulrich Berendes, Meinard Müller, Ben Maman</span><span class="meta-date">📅 2026-06-11</span></div>      <div class="tags-row"><span class="tag">自动音乐转录</span><span class="tag">音符起始点</span><span class="tag">上下文感知</span><span class="tag">onset细化</span></div>      <div class="paper-overview"><p>自动音乐转录（AMT）中音符起始点（onset）的时间精度对转录质量至关重要。本文提出一种上下文感知的起始点细化方法，通过"snapping"机制将预测的起始点对齐到最近的声学事件边界。该方法利用起始点周围的上下文信息，在保持音符类别不变的前提下微调时间位置，显著提高了转录的时间精度和听觉自然度。</p></div>      <div class="paper-links"><a href="https://arxiv.org/abs/2606.11903" target="_blank" rel="noopener" class="link-btn link-arxiv">arXiv</a><a href="https://arxiv.org/pdf/2606.11903" target="_blank" rel="noopener" class="link-btn link-pdf">PDF</a><a href="https://abhirupsaha8.github.io" target="_blank" rel="noopener" class="link-btn link-project">🌐 Project</a></div>    </article>`;

html = html.replace(old11903, new11903);

// ============================================
// 写入修复后的文件
// ============================================
fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', html, 'utf8');
console.log('All fixes applied!');
console.log('1. Replace paper dates corrected (16 papers)');
console.log('2. meta-venue labels fixed');
console.log('3. Empty title 2606.11836 filled');
console.log('4. Missing content 2606.11903 filled');
