// Paper Daily v3 - Main JS
// 展开/收起交互 + 三种模式切换 + 状态持久化
(function() {
  'use strict';

  // ═══════════════════════════════════════
  //  Theme Toggle
  // ═══════════════════════════════════════
  var themeToggle = document.getElementById('themeToggle');
  var body = document.body;
  
  function getStoredTheme() {
    try { return localStorage.getItem('pd-theme'); } catch(e) { return null; }
  }
  
  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    try { localStorage.setItem('pd-theme', theme); } catch(e) {}
  }
  
  var stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var current = body.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // ═══════════════════════════════════════
  //  Scroll to Top
  // ═══════════════════════════════════════
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════════
  //  Paper Expand/Collapse
  // ═══════════════════════════════════════
  
  // 全局函数：切换单篇论文的展开/收起
  window.togglePaper = function(headerEl) {
    var card = headerEl.parentElement;
    if (!card || !card.classList.contains('paper-card')) return;
    
    var arxivId = card.getAttribute('data-arxiv-id');
    var willExpand = !card.classList.contains('expanded');
    
    card.classList.toggle('expanded');
    
    // 持久化单篇论文状态
    if (arxivId) {
      try {
        var store = getExpandStore();
        if (willExpand) {
          store[arxivId] = true;
        } else {
          delete store[arxivId];
        }
        localStorage.setItem('pd-expand', JSON.stringify(store));
      } catch(e) {}
    }
  };

  // 读取展开状态 store
  function getExpandStore() {
    try {
      var raw = localStorage.getItem('pd-expand');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {};
  }

  // ═══════════════════════════════════════
  //  Mode Switching (简略/普通/详细)
  // ═══════════════════════════════════════
  
  var MODE_KEY = 'pd-mode';
  var currentMode = 'brief'; // 默认简略模式
  
  // 读取保存的模式
  try {
    var savedMode = localStorage.getItem(MODE_KEY);
    if (savedMode && (savedMode === 'brief' || savedMode === 'normal' || savedMode === 'full')) {
      currentMode = savedMode;
    }
  } catch(e) {}

  // 全局函数：设置模式
  window.setMode = function(mode) {
    if (mode === currentMode) return;
    currentMode = mode;
    
    // 保存模式
    try { localStorage.setItem(MODE_KEY, mode); } catch(e) {}
    
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });
    
    // 应用模式到所有卡片
    applyMode(mode);
  };

  function applyMode(mode) {
    var cards = document.querySelectorAll('.paper-card');
    var store = getExpandStore();
    
    cards.forEach(function(card) {
      var arxivId = card.getAttribute('data-arxiv-id');
      var tier = card.getAttribute('data-tier') || '';
      
      if (mode === 'brief') {
        // 简略模式：所有论文折叠
        card.classList.remove('expanded');
      } else if (mode === 'normal') {
        // 普通模式：🔥 重点论文默认展开，其他折叠
        if (tier === 'hot') {
          card.classList.add('expanded');
        } else {
          card.classList.remove('expanded');
        }
      } else if (mode === 'full') {
        // 详细模式：所有论文展开
        card.classList.add('expanded');
      }
      
      // 检查是否有用户手动设置的状态（覆盖模式默认）
      if (arxivId && store.hasOwnProperty(arxivId)) {
        if (store[arxivId]) {
          card.classList.add('expanded');
        } else {
          card.classList.remove('expanded');
        }
      }
    });
  }

  // 初始化：应用保存的模式
  function initMode() {
    // 设置按钮 active 状态
    document.querySelectorAll('.mode-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === currentMode);
    });
    applyMode(currentMode);
  }

  // DOM ready 后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMode);
  } else {
    initMode();
  }

  // ═══════════════════════════════════════
  //  Intersection Observer for fade-in
  // ═══════════════════════════════════════
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    
    document.querySelectorAll('.paper-card').forEach(function(card) {
      observer.observe(card);
    });
  }

  // ═══════════════════════════════════════
  //  Nav highlight on scroll
  // ═══════════════════════════════════════
  var sections = document.querySelectorAll('.section[id]');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          document.querySelectorAll('.topnav-link').forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(function(s) { navObserver.observe(s); });
  }
})();
