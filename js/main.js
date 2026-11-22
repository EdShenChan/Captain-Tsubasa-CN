/* 《队长小翼》汉化版知识库 · 共享脚本 */
(function () {
  'use strict';

  // 移动端汉堡菜单
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header .nav');
  // 复位所有下拉的展开态（收起整个菜单时调用）
  const resetDrops = function () {
    nav.querySelectorAll('.nav-drop.open').forEach(function (d) {
      d.classList.remove('open');
      const b = d.querySelector('.nav-drop-toggle');
      if (b) {
        b.textContent = '+';
        b.setAttribute('aria-expanded', 'false');
      }
    });
  };
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      if (!nav.classList.contains('open')) resetDrops();
    });
    // 点击菜单项后收起（+/− 按钮不是 <a>，不受影响，点了不会关掉整个菜单）
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // 移动端下拉：「+/−」按钮展开/收起（按钮由本脚本注入到 .nav-drop 内、父项链接之外，
  // 因此不受链接跳转与蓝色选中态影响）。父项文字仍是链接，点击照常跳转列表页；
  // 手风琴式同时只开一个。桌面端（>860px）按钮被 CSS 隐藏，hover 展开逻辑不变。
  (function () {
    const drops = Array.prototype.slice.call(document.querySelectorAll('.header .nav .nav-drop'));
    const parentOf = function (drop) {
      for (let i = 0; i < drop.children.length; i++) {
        if (drop.children[i].tagName === 'A') return drop.children[i];
      }
      return null;
    };
    drops.forEach(function (drop) {
      const parent = parentOf(drop);
      const menu = drop.querySelector('.nav-drop-menu');
      if (!parent || !menu) return;
      const label = parent.textContent.trim();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-drop-toggle';
      btn.textContent = '+';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '展开「' + label + '」子菜单');
      drop.insertBefore(btn, menu);
      // 按钮锚定到父项所在行：.nav-drop 展开后容器变高，
      // top:50% 会飘进子菜单，故按父项实际行内位置与行高覆写
      const placeBtn = function () {
        btn.style.top = parent.offsetTop + 'px';
        btn.style.height = parent.offsetHeight + 'px';
      };
      placeBtn();
      window.addEventListener('resize', placeBtn);
      btn.addEventListener('click', function () {
        const isOpen = drop.classList.contains('open');
        // 手风琴：先收起其他已展开项
        drops.forEach(function (d) {
          if (d !== drop && d.classList.contains('open')) {
            d.classList.remove('open');
            const b = d.querySelector('.nav-drop-toggle');
            if (b) {
              b.textContent = '+';
              b.setAttribute('aria-expanded', 'false');
            }
          }
        });
        drop.classList.toggle('open', !isOpen);
        btn.textContent = isOpen ? '+' : '\u2212';   // − (U+2212)
        btn.setAttribute('aria-expanded', String(!isOpen));
        btn.setAttribute('aria-label', (isOpen ? '展开' : '收起') + '「' + label + '」子菜单');
      });
    });
  })();

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
    // 页面身份优先取 <body data-page>（各页已静态写入自身文件名）：
    // 部分预览环境（iframe/srcdoc 等）location 不是真实文件路径，仅靠 pathname 会匹配失败
    const file = (document.body && document.body.getAttribute('data-page')) || norm(window.location.pathname);
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
