const fs = require('fs');
let html = fs.readFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', 'utf8');

// 修复 2606.11836 空标题
html = html.replace(
  '<article class="paper-card tier-standard" id="2606.11836">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text"></h3></div>      <div class="paper-title-en">Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering</div>',
  '<article class="paper-card tier-standard" id="2606.11836">      <div class="paper-headline"><span class="topic-badge">ASR/语音识别</span><h3 class="headline-text">面向语音基础模型的免数据免训练压缩</h3></div>      <div class="paper-title-en">Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering</div>'
);

// 修复 2606.11766 空标题
html = html.replace(
  '<article class="paper-card tier-brief card-brief" id="2606.11766">      <div class="paper-headline"><span class="topic-badge">其他</span><h3 class="headline-text"></h3></div>      <div class="paper-title-en">Fast Speech Foundation Model Distillation Using Interleaved Stacking</div>',
  '<article class="paper-card tier-brief card-brief" id="2606.11766">      <div class="paper-headline"><span class="topic-badge">其他</span><h3 class="headline-text">语音基础模型高效蒸馏：交错堆叠法</h3></div>      <div class="paper-title-en">Fast Speech Foundation Model Distillation Using Interleaved Stacking</div>'
);

fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', html, 'utf8');
console.log('Fixed remaining empty titles');
