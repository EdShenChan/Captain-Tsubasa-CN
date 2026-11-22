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

  // 网页端导航「当前专页」高亮同步
  // 以当前页面文件名比对各下拉菜单的专页链接，命中项加 .active（蓝色字体，见 style.css），
  // 并确保其父项（游戏作品 / 动画作品）同为选中态；未命中时不改动任何项。
  // 导航可含多个 .nav-drop，故逐个遍历；带 # 锚点的子项（如「第二季」暂指列表页锚点）
  // 不参与自动高亮，避免列表页误点亮该子项。
  (function () {
    const drops = document.querySelectorAll('.header .nav .nav-drop');
    if (!drops.length) return;
    const norm = function (s) {
      const tail = s.split('/').pop().split(/[?#]/)[0];
      try { return decodeURIComponent(tail); } catch (e) { return tail; }
    };
    const file = norm(window.location.pathname);
    drops.forEach(function (drop) {
      const menu = drop.querySelector('.nav-drop-menu');
      if (!menu) return;
      let hit = null;
      menu.querySelectorAll('a[href]').forEach(function (a) {
        const href = a.getAttribute('href') || '';
        if (href.indexOf('#') !== -1) return;
        a.classList.remove('active');
        a.removeAttribute('aria-current');
        if (norm(href) === file) hit = a;
      });
      if (!hit) return;
      hit.classList.add('active');
      hit.setAttribute('aria-current', 'page');
      // 父项 = .nav-drop 的直接子元素 <a>
      let parent = null;
      for (let i = 0; i < drop.children.length; i++) {
        if (drop.children[i].tagName === 'A') { parent = drop.children[i]; break; }
      }
      if (parent) {
        parent.classList.add('active');
        parent.setAttribute('aria-current', 'true');
      }
    });
  })();

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
