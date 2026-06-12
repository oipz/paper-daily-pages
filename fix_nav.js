const fs = require('fs');

// Fix 06-12 nav
let html12 = fs.readFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', 'utf8');
const oldNav = '<div class="topnav-links"><a href="#topic-ASR-语音识别" class="topnav-link">ASR/语音识别</a> <a href="#topic-TTS-语音合成" class="topnav-link">TTS/语音合成</a> <a href="#topic-其他" class="topnav-link">其他</a> <a href="#topic-情感-应用" class="topnav-link">情感/应用</a> <a href="#topic-语音表征" class="topnav-link">语音表征</a> <a href="#topic-说话人" class="topnav-link">说话人</a></div>';
const newNav = '<div class="topnav-links"><a href="#topic-重点论文" class="topnav-link">🔥 重点</a> <a href="#topic-标准论文" class="topnav-link">⭐ 标准</a> <a href="#topic-简要概览" class="topnav-link">📎 概览</a> <a href="#topic-更新论文" class="topnav-link">🔄 更新</a></div>';
html12 = html12.replace(oldNav, newNav);
fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-12\\index.html', html12, 'utf8');

// Fix 06-11 nav (same issue)
let html11 = fs.readFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-11\\index.html', 'utf8');
// Check what nav links 06-11 has
const navMatch = html11.match(/<div class="topnav-links">.*?<\/div>/);
if (navMatch) {
  console.log('06-11 nav:', navMatch[0]);
  // Replace with section-matching links for 06-11 (it only has one section: 重点论文)
  const newNav11 = '<div class="topnav-links"><a href="#topic-重点论文" class="topnav-link">重点论文</a></div>';
  html11 = html11.replace(navMatch[0], newNav11);
  fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\daily\\2026-06-11\\index.html', html11, 'utf8');
  console.log('06-11 nav fixed');
}

console.log('Nav links fixed for both pages');
