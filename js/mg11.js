/* 《队长小翼：我的黄金十一人》角色专页渲染
   数据：js/mg11-data.js（window.MG11_DATA）
   交互：一级 5 国家队标签；仅点击下方头像才切换上方立绘、PROFILE 与角色介绍；
        角色介绍文字直接展示于资料卡（不再另设弹窗），CV 信息已另立存档文件；
        上方显示的角色，其对应头像呈放大 + 橙黄高亮（is-active），其余默认。 */
(function () {
  'use strict';
  var DATA = window.MG11_DATA;
  if (!DATA || !DATA.tabs) return;

  var tabs = DATA.tabs;
  var $ = function (id) { return document.getElementById(id); };
  var tabBox = $('mg11Tabs');
  var thumbBox = $('mg11Thumbs');
  var portrait = $('mg11Portrait');
  var nameEl = $('mg11Name');
  var introEl = $('mg11Intro');

  var curTab = 0;
  var curChar = 0;
  var thumbs = [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function setText(id, value) {
    var n = $(id);
    if (n) n.textContent = value == null ? '' : value;
  }

  /* ---------- 一级标签 ---------- */
  function buildTabs() {
    tabBox.innerHTML = '';
    tabs.forEach(function (t, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mg11-tab' + (i === 0 ? ' is-active' : '');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      var inner = '';
      if (t.icon) {
        inner += '<img src="' + esc(t.icon) + '" alt="' + esc(t.name) + '徽标" loading="lazy">';
      }
      inner += '<span>' + esc(t.name) + '</span>';
      b.innerHTML = inner;
      b.addEventListener('click', function () { switchTab(i); });
      tabBox.appendChild(b);
    });
  }

  function switchTab(i) {
    curTab = i;
    Array.prototype.forEach.call(tabBox.children, function (b, n) {
      b.classList.toggle('is-active', n === i);
      b.setAttribute('aria-selected', n === i ? 'true' : 'false');
    });
    buildThumbs();
    select(0);
  }

  /* ---------- 头像列表 ---------- */
  function buildThumbs() {
    var chars = tabs[curTab].chars;
    thumbBox.innerHTML = '';
    thumbs = [];

    chars.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mg11-thumb';
      b.setAttribute('aria-label', c.name);
      b.title = c.name;

      var off = document.createElement('img');
      off.className = 'off';
      off.src = c.thumbOff;
      off.alt = c.name;
      off.loading = 'lazy';
      var on = document.createElement('img');
      on.className = 'on';
      on.src = c.thumb;
      on.alt = '';
      on.loading = 'lazy';
      b.appendChild(off);
      b.appendChild(on);

      // 仅点击下方头像才切换上方角色资料；上方显示谁，下方对应头像才高亮放大
      b.addEventListener('click', function () { select(i); });

      thumbBox.appendChild(b);
      thumbs.push(b);
    });
  }

  /* ---------- 切换当前角色 ---------- */
  function select(i) {
    var chars = tabs[curTab].chars;
    if (i < 0 || i >= chars.length) return;
    curChar = i;
    var c = chars[i];

    thumbs.forEach(function (b, n) { b.classList.toggle('is-active', n === i); });

    nameEl.textContent = c.name;
    nameEl.classList.toggle('is-long', c.name.length >= 12);
    setText('mg11Team', c.team || '—');
    setText('mg11Birthday', c.birthday || '—');
    setText('mg11Height', c.height || '—');
    setText('mg11Weight', c.weight || '—');
    setText('mg11Blood', c.blood || '—');

    portrait.classList.add('is-swapping');
    var pre = new Image();
    function applyPortrait() {
      portrait.src = c.img;
      portrait.alt = c.name + ' 官方立绘';
      window.requestAnimationFrame(function () { portrait.classList.remove('is-swapping'); });
    }
    pre.onload = pre.onerror = applyPortrait;
    pre.src = c.img;
    // 图片若已缓存（complete 为真），onload 可能不会触发，需立即应用，避免立绘空白
    if (pre.complete) applyPortrait();

    // 角色介绍：直接展示于资料卡（替代原 CV 行位置）
    if (introEl) {
      introEl.innerHTML = '';
      if (c.intro) {
        var h = document.createElement('h3');
        h.className = 'mg11-intro-h';
        h.textContent = '角色介绍';
        introEl.appendChild(h);
        c.intro.split(/\n\s*\n/).forEach(function (para) {
          var p = para.trim();
          if (!p) return;
          var node = document.createElement('p');
          node.textContent = p;
          introEl.appendChild(node);
        });
      }
    }
  }

  /* ---------- 初始化 ---------- */
  buildTabs();
  buildThumbs();
  select(0);
})();
