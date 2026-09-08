/* 《队长小翼》汉化版知识库 · 共享脚本 */
(function () {
  'use strict';

  // 移动端汉堡菜单
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header .nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    // 点击菜单项后收起
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // 滚动时给 header 增加投影
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 滚动进入视口时的淡入动画
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      io.observe(el);
    });
  }

  // 悬浮返回顶部按钮（右下角，长页面滚动后出现）
  const toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top-btn';
  toTop.setAttribute('aria-label', '返回顶部');
  toTop.innerHTML = '&#8593;';
  document.body.appendChild(toTop);

  const toggleToTop = function () {
    if (window.scrollY > 240) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
