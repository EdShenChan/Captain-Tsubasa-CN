/* 《队长小翼：梦幻队伍》角色专页 —— 渲染与交互
 * 数据：window.DT_DATA（两层级：arcs[].tabs[].chars）
 *   arc1 世界青少年篇（16 国家队） / arc2 海外篇（Next Dream，按俱乐部）
 * 不设定卡片底色：直接展示角色原图（pc 立绘自带官方实底），不对卡片强加背景色
 */
(function () {
  'use strict';
  var DATA = window.DT_DATA || { arcs: [] };
  // 位置主色（取自官网卡片底图边框）：FW红 / DF蓝 / GK橙 / OMF·DMF绿
  var POS_COLOR = { fw: '#760000', df: '#000F84', gk: '#8D3B00', omf: '#015D04', dmf: '#015D04' };

  var arcsEl = document.getElementById('dtArcs');
  var tabsEl = document.getElementById('dtTabs');
  var gridEl = document.getElementById('dtGrid');
  var modal = document.getElementById('dtModal');
  var lastFocus = null;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- 篇章（一级）标签 ---------- */
  function renderArcs() {
    arcsEl.innerHTML = '';
    DATA.arcs.forEach(function (arc, i) {
      var b = el('button', 'dt-arc' + (i === 0 ? ' is-active' : ''));
      b.type = 'button';
      b.textContent = arc.name;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { selectArc(i); });
      arcsEl.appendChild(b);
    });
  }
  function selectArc(i) {
    Array.prototype.forEach.call(arcsEl.children, function (b, j) {
      var on = j === i;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderTabs(DATA.arcs[i]);
  }

  /* ---------- 二级标签（国家队 / 俱乐部） ---------- */
  function renderTabs(arc) {
    tabsEl.innerHTML = '';
    arc.tabs.forEach(function (tab, i) {
      var b = el('button', 'dt-tab' + (i === 0 ? ' is-active' : ''));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      var inner = '';
      if (tab.icon) {
        inner += '<img src="' + esc(tab.icon) + '" alt="' + esc(tab.name) + '徽标" loading="lazy">';
      }
      inner += '<span>' + esc(tab.name) + '</span>';
      b.innerHTML = inner;
      b.addEventListener('click', function () { selectTab(arc, i); });
      tabsEl.appendChild(b);
    });
    renderGrid(arc.tabs[0]);
  }
  function selectTab(arc, i) {
    Array.prototype.forEach.call(tabsEl.children, function (b, j) {
      var on = j === i;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderGrid(arc.tabs[i]);
  }

  /* ---------- 卡片网格 ---------- */
  function renderGrid(tab) {
    gridEl.innerHTML = '';
    (tab.chars || []).forEach(function (c) {
      var card = el('button', 'dt-card');
      card.type = 'button';
      card.setAttribute('aria-label', '查看 ' + c.name + ' 的详细资料' + (c.original ? '（原创角色）' : ''));
      var posText = (c.positionText || (c.positions || []).join('/') || '—').toUpperCase();
      var flagIcon = c.countryIcon || tab.icon || '';
      var flagAlt = c.countryText || tab.name || '';
      card.innerHTML =
        (c.original ? '<span class="orig-tag">原创</span>' : '') +
        (flagIcon ? '<img class="flag" src="' + esc(flagIcon) + '" alt="' + esc(flagAlt) + '" loading="lazy">' : '') +
        '<span class="pos-tag">' + esc(posText) + '</span>' +
        '<img class="avatar" src="' + esc(c.portrait) + '" alt="' + esc(c.name) + '" loading="lazy">' +
        '<span class="arrow"><img src="assets/img/game/dream-team/card-arrow@2x.png" alt="" style="width:100%;height:100%"></span>' +
        '<div class="meta">' +
          '<div class="nm">' + esc(c.name) + '</div>' +
          '<div class="nm-en">' + esc(c.nameEn) + '</div>' +
        '</div>';
      card.addEventListener('click', function () { openModal(c, flagIcon, flagAlt); });
      gridEl.appendChild(card);
    });
  }

  /* ---------- 详情弹窗 ---------- */
  function openModal(c, flagIcon, flagAlt) {
    lastFocus = document.activeElement;
    document.getElementById('dtModalPortrait').src = c.portrait;
    document.getElementById('dtModalPortrait').alt = c.name + ' 立绘';
    document.getElementById('dtModalNo').textContent = 'CHARACTER No. ' + c.no;
    document.getElementById('dtModalName').textContent = c.name;
    document.getElementById('dtModalNameEn').textContent = c.nameEn || '';

    // 标签：位置 + 国籍
    var tags = document.getElementById('dtModalTags');
    tags.innerHTML = '';
    (c.positions || []).forEach(function (p) {
      var chip = el('span', 'dt-chip pos', esc(p.toUpperCase()));
      tags.appendChild(chip);
    });
    var ct = el('span', 'dt-chip',
      (flagIcon ? '<img src="' + esc(flagIcon) + '" alt="">' : '') + esc(c.countryText || flagAlt));
    tags.appendChild(ct);
    if (c.original) {
      tags.appendChild(el('span', 'dt-chip orig', '原创'));
    }

    document.getElementById('dtModalTeam').textContent = c.team || '—';

    // 必杀技
    var sk = document.getElementById('dtModalSkills');
    sk.innerHTML = '';
    if (c.skills && c.skills.length) {
      c.skills.forEach(function (s) { sk.appendChild(el('span', null, esc(s))); });
    } else {
      sk.innerHTML = '<span class="dt-modal-desc"><span class="empty">（暂无登记必杀技）</span></span>';
    }

    // 介绍
    var desc = document.getElementById('dtModalDesc');
    if (c.desc && c.desc.trim()) {
      desc.innerHTML = '<p>' + esc(c.desc).replace(/\n+/g, '</p><p>') + '</p>';
    } else {
      desc.innerHTML = '<p class="empty">（暂无官方角色简介）</p>';
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var closeBtn = modal.querySelector('.dt-modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------- 初始化 ---------- */
  renderArcs();
  if (DATA.arcs.length) selectArc(0);
})();
