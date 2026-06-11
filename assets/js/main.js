// Paper Daily v2 - Main JS
(function() {
  'use strict';

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  function getStoredTheme() {
    try { return localStorage.getItem('pd-theme'); } catch(e) { return null; }
  }
  
  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    try { localStorage.setItem('pd-theme', theme); } catch(e) {}
  }
  
  // 初始化主题
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const current = body.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // ── Scroll to Top ──
  const scrollTopBtn = document.getElementById('scrollTop');
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

  // ── Intersection Observer for fade-in ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
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

  // ── Nav highlight on scroll ──
  const sections = document.querySelectorAll('.section[id]');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.topnav-link').forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(function(s) { navObserver.observe(s); });
  }
})();
