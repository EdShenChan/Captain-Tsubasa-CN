/* ==========================================================================
   FCG カード図鑑 · 渲染逻辑（预览专页专用）
   --------------------------------------------------------------------------
   · 数据：js/fcg-data.js → window.FCG_CARDS（256 件，日文原文，勿手改）
   · 设计基准：不沿用武士道 WS 专页的「颜色 / 等级 / 通用字段表」，
     按 TAKARA TOMY FCG 自身体系适配：
       - 主分类＝系列（CT-03 / CT-02 / CT-01 / CTD-01 / CTD-02 / CT-PR）
       - 次分类＝カテゴリ（キャラ / シュート / アクション）
       - レアリティ＝官方 8 种，用官网 img/<rarity>.png 图标显示
       - 详情弹窗＝仿官网 card/card.html?card=<no> 的构图：
           大图（竖 50% / 横 80%，左右翻页箭头浮于图上）
           → 图标行（ガードアイコン / ガッツ / シュートポイント）
           → 属性表（レアリティ / カテゴリ / 所属 / ポジション）
           → ステータス表（キャラ：Def/Cover/Asst/Off 四数值官方图标）
             或 使用条件 / 使用タイミング 表（シュート・アクション）
           → 能力（记号转官方图标）/ フレーバーテキスト / グラフィックテキスト
           → イラスト / 版权行 / 全字段折叠
   · 图标资源：assets/site/card/img/（43 个，抓自官网）
   · 不依赖 fetch / 模块化，file:// 双击即可运行。
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.FCG_CARDS || [];
  var T = window.FCG_TRANSLATIONS || {};

  var FCG_CONFIG = {
    imageBase: 'assets/img/game/fcg/cards/',
    iconBase: 'assets/img/game/fcg/icons/',
    gridId: 'charaGrid',
    modalId: 'charaModal'
  };

  /* 官方系列顺序（= idlist.php 顺序，亦为 itemsearch.php 分页顺序） */
  var SERIES_ORDER = ['CT-03', 'CT-02', 'CT-01', 'CTD-01', 'CTD-02', 'CT-PR'];
  /* 官方稀有度顺序（数据实测 8 种；master.php 枚举漏 ST） */
  var RARE_ORDER = ['UR', 'EXSR', 'SR', 'EXR', 'R', 'N', 'ST', 'PR'];
  var KINDS = ['キャラ', 'シュート', 'アクション'];
  var POSITIONS = ['FW', 'MF', 'DF', 'GK'];

  /* 能力文本中的官方记号 → 官方图标（与 app-card.js 的 conversionAbility 一致） */
  var ABILITY_ICONS = [
    [/［〓Asst］/g, 'ass.png', 'Asst'],
    [/［〓Off］/g, 'off.png', 'Off'],
    [/［〓SP］/g, 'sp_s.png', 'SP'],
    [/［〓Def］/g, 'def.png', 'Def'],
    [/［〓Cover］/g, 'cov.png', 'Cover'],
    [/［〓Cover\]/g, 'cov.png', 'Cover'],
    [/\[〓手札\]/g, 'hand.png', '手札'],
    [/［〓＋1］/g, 'plus1.png', '＋1']
  ];

  var state = {
    q: '', series: 'ALL', kind: 'ALL', rare: 'ALL', pos: 'ALL',
    attached: 'ALL', illust: 'ALL', sort: 'order', page: 1
  };
  var view = [];
  var modalIndex = -1;
  var PAGE_SIZE = 20;   // 图鉴每页显示张数（用户指定，与武士道 WS 专页一致）
  function totalPages() { return Math.max(1, Math.ceil(view.length / PAGE_SIZE)); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function tr(s) { return T[s] || s; }
  function val(s) { return (s === '' || s == null || s === '-') ? '—' : esc(s); }
  function imgUrl(c) { return FCG_CONFIG.imageBase + (c.picture || ''); }
  function isLandscape(c) { return c.orient === 'landscape'; }
  function isChara(c) { return c.category === 'キャラ'; }
  function icon(name, cls, alt) {
    return '<img class="' + (cls || '') + '" src="' + FCG_CONFIG.iconBase + name +
      '" alt="' + esc(alt || '') + '">';
  }
  function rareIcon(r) { return icon(esc(r) + '.png', 'fcg-rare-img', r); }
  /* 官网 conversionNumber：'1+' → n1p.png，'2' → n2.png */
  function numIcon(v) {
    if (v == null || v === '' || v === '-') return '<span class="fcg-dash">—</span>';
    var s = String(v);
    var name = s.indexOf('+') >= 0 ? 'n' + s.replace('+', '') + 'p' : 'n' + s;
    return icon(name + '.png', 'fcg-num-img', s);
  }
  function abilityHtml(s) {
    var t = esc(s);
    ABILITY_ICONS.forEach(function (m) {
      t = t.replace(m[0], icon(m[1], 'fcg-text-icon', m[2]));
    });
    return t;
  }
  function fmtRaw(s) { return esc(s).replace(/&lt;br\s*\/?&gt;/gi, '<br>'); }

  /* ---------- 下拉选项（从数据动态生成，不依赖 master.php 枚举） ---------- */
  function uniq(key) {
    var seen = {};
    DATA.forEach(function (c) { if (c[key] && c[key] !== '-') seen[c[key]] = 1; });
    return Object.keys(seen).sort(function (a, b) { return String(a).localeCompare(String(b), 'ja'); });
  }
  function fillSelect(id, values, prefix) {
    var el = document.getElementById(id);
    if (!el) return;
    var opts = ['<option value="ALL">' + (prefix || '') + '全部</option>'];
    values.forEach(function (v) {
      opts.push('<option value="' + esc(v) + '">' + esc(v) + '</option>');
    });
    el.innerHTML = opts.join('');
  }
  function fillFilters() {
    var seriesName = {};
    DATA.forEach(function (c) { seriesName[c.series_no] = c.series; });
    var keys = SERIES_ORDER.filter(function (k) { return seriesName[k]; });
    Object.keys(seriesName).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); });
    fillSelect('rareSel', RARE_ORDER.filter(function (r) {
      return DATA.some(function (c) { return c.rarity === r; });
    }), 'レアリティ：');
    fillSelect('posSel', POSITIONS.filter(function (p) {
      return DATA.some(function (c) { return c.position === p; });
    }), 'ポジション：');
    fillSelect('attachedSel', uniq('attached'), '所属：');
    fillSelect('illustSel', uniq('illustrator'), 'イラスト：');
  }

  /* ---------- 筛选与排序 ---------- */
  function filtered() {
    var q = state.q.trim().toLowerCase();
    var out = DATA.filter(function (c) {
      if (state.series !== 'ALL' && c.series_no !== state.series) return false;
      if (state.kind !== 'ALL' && c.category !== state.kind) return false;
      if (state.rare !== 'ALL' && c.rarity !== state.rare) return false;
      if (state.pos !== 'ALL' && c.position !== state.pos) return false;
      if (state.attached !== 'ALL' && c.attached !== state.attached) return false;
      if (state.illust !== 'ALL' && c.illustrator !== state.illust) return false;
      if (q) {
        var hay = [c.no, c.name, c.rarity, c.category, c.series, c.attached, c.position,
          c.ability, c.text, c.graphic_text, c.conditions, c.timing, c.illustrator]
          .join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    if (state.sort === 'order') return out;   /* 官方顺序：DATA 本身即 idlist.php 顺序 */
    out.sort(function (a, b) {
      if (state.sort === 'name') return String(a.name).localeCompare(String(b.name), 'ja');
      if (state.sort === 'rare') {
        var d = RARE_ORDER.indexOf(a.rarity) - RARE_ORDER.indexOf(b.rarity);
        return d || String(a.no).localeCompare(String(b.no), 'ja', { numeric: true });
      }
      if (state.sort === 'series') {
        var s = SERIES_ORDER.indexOf(a.series_no) - SERIES_ORDER.indexOf(b.series_no);
        return s || String(a.no).localeCompare(String(b.no), 'ja', { numeric: true });
      }
      return String(a.no).localeCompare(String(b.no), 'ja', { numeric: true });
    });
    return out;
  }

  /* ---------- 标签条：系列（主轴）/ カテゴリ ---------- */
  function tabHtml(id, list, active, dataAttr) {
    return list.map(function (t) {
      return '<button class="tab' + (active === t[0] ? ' tab--active' : '') +
        '" data-' + dataAttr + '="' + esc(t[0]) + '"><span class="tab-name">' + esc(t[1]) +
        '</span><span class="tab-name fcg-tab-count">' + t[2] + '</span></button>';
    }).join('');
  }
  function renderSeriesTabs() {
    var counts = {}, names = {};
    DATA.forEach(function (c) {
      counts[c.series_no] = (counts[c.series_no] || 0) + 1;
      names[c.series_no] = c.series;
    });
    var keys = SERIES_ORDER.filter(function (k) { return counts[k]; });
    Object.keys(counts).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); });
    var list = [['ALL', '全シリーズ', DATA.length]].concat(keys.map(function (k) {
      return [k, k + '　' + names[k], counts[k]];
    }));
    document.getElementById('seriesTabs').innerHTML = tabHtml('seriesTabs', list, state.series, 'series');
  }
  function renderKindTabs() {
    var counts = {};
    DATA.forEach(function (c) { counts[c.category] = (counts[c.category] || 0) + 1; });
    var list = [['ALL', '全カテゴリ', DATA.length]].concat(KINDS.filter(function (k) {
      return counts[k];
    }).map(function (k) { return [k, k, counts[k]]; }));
    document.getElementById('kindTabs').innerHTML = tabHtml('kindTabs', list, state.kind, 'kind');
  }

  /* ---------- 卡片网格 ---------- */
  function cardHtml(c, i) {
    var nick = [c.category, c.attached, c.position].filter(function (x) {
      return x && x !== '-';
    }).join(' · ');
    return '<article class="chara-card" data-index="' + i + '" tabindex="0">' +
      '<span class="chara-card-btn fcg-card-rare">' + rareIcon(c.rarity) + '</span>' +
      '<div class="chara-card-img' + (isLandscape(c) ? ' is-landscape' : '') + '">' +
      '<img loading="lazy" src="' + esc(imgUrl(c)) + '" alt="' + esc(c.name) +
      '" onload="this.parentElement.classList.toggle(\'is-landscape\',this.naturalWidth>this.naturalHeight)"' +
      ' onerror="this.style.opacity=0"></div>' +
      '<div class="chara-card-info">' +
      '<div class="chara-card-en">' + esc(c.no) + '</div>' +
      '<div class="chara-card-name">' + esc(tr(c.name)) + '</div>' +
      '<div class="chara-card-nick">' + esc(nick) + '</div>' +
      '</div></article>';
  }
  function render() {
    view = filtered();
    var tp = totalPages();
    if (state.page > tp) state.page = tp;
    if (state.page < 1) state.page = 1;
    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = view.slice(start, start + PAGE_SIZE);
    document.getElementById('resultCount').innerHTML =
      '全 <b>' + DATA.length + '</b> 件中　表示 <b>' + view.length + '</b> 件' +
      (tp > 1 ? '　（第 <b>' + state.page + '</b> / <b>' + tp + '</b> ページ）' : '');
    var grid = document.getElementById(FCG_CONFIG.gridId);
    grid.innerHTML = view.length
      ? pageItems.map(function (c, j) { return cardHtml(c, start + j); }).join('')
      : '<p class="no-result">条件に合うカードが見つかりませんでした。</p>';
    Array.prototype.forEach.call(grid.querySelectorAll('.chara-card'), function (el) {
      el.addEventListener('click', function () { openModal(Number(el.dataset.index)); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(Number(el.dataset.index)); }
      });
    });
    renderPagination();
  }

  /* ---------- 分页控件（每页 20 张） ---------- */
  function renderPagination() {
    var box = document.getElementById('fcgPager');
    if (!box) return;
    var tp = totalPages();
    if (tp <= 1) { box.innerHTML = ''; return; }
    var cur = state.page, html = '';
    html += '<button class="pager-btn" data-page="' + (cur - 1) + '"' + (cur <= 1 ? ' disabled' : '') + '>← 前へ</button>';
    var win = [], from = Math.max(1, cur - 3), to = Math.min(tp, cur + 3);
    if (from > 1) { win.push(1); if (from > 2) win.push('…'); }
    for (var p = from; p <= to; p++) win.push(p);
    if (to < tp) { if (to < tp - 1) win.push('…'); win.push(tp); }
    win.forEach(function (p) {
      if (p === '…') { html += '<span class="pager-ellipsis">…</span>'; return; }
      html += '<button class="pager-btn' + (p === cur ? ' pager-btn--active' : '') + '" data-page="' + p + '">' + p + '</button>';
    });
    html += '<button class="pager-btn" data-page="' + (cur + 1) + '"' + (cur >= tp ? ' disabled' : '') + '>次へ →</button>';
    box.innerHTML = html;
  }

  /* ---------- 详情弹窗：仿官网 card/card.html 构图 ---------- */
  function statCell(k, v) {
    return '<div class="fcg-stat fcg-stat--' + k + '">' + numIcon(v) + '</div>';
  }
  function iconRow(c) {
    var s = '<div class="fcg-icons">';
    if (c.icon === '●') s += icon('icon.png', 'fcg-guard-img', 'ガードアイコン');
    else if (c.icon === '+1') s += icon('icon_1.png', 'fcg-guard-img', 'ガードアイコン+1');
    if (c.guts && c.guts !== '-') s += '<div class="fcg-guts"><span>' + esc(c.guts) + '</span></div>';
    if (c.sp && c.sp !== '-') s += '<div class="fcg-sp"><span>' + esc(c.sp) + '</span></div>';
    return s + '</div>';
  }
  function specTables(c) {
    var s = '<table class="fcg-tbl"><tr><th>レアリティ</th><td>' + rareIcon(c.rarity) +
      '</td><th>カテゴリ</th><td>' + esc(c.category) + '</td></tr>';
    if (isChara(c)) {
      s += '<tr><th>所属</th><td>' + val(c.attached) +
        '</td><th>ポジション</th><td>' + val(c.position) + '</td></tr>';
    }
    s += '</table>';
    if (isChara(c)) {
      s += '<table class="fcg-tbl"><tr><th>ステータス</th><td class="fcg-state">' +
        statCell('deffence', c.deffence) + statCell('cover', c.cover) +
        statCell('assist', c.assist) + statCell('offence', c.offence) +
        '</td></tr></table>';
    } else {
      s += '<table class="fcg-tbl"><tr><th>使用条件</th><td>' + val(c.conditions) +
        '</td><th>使用タイミング</th><td>' + val(c.timing) + '</td></tr></table>';
    }
    if (c.ability && c.ability !== '-') {
      s += '<table class="fcg-tbl"><tr><th class="fcg-th-full">能力</th></tr>' +
        '<tr><td class="fcg-textcell">' + abilityHtml(c.ability) + '</td></tr></table>';
    }
    if (c.text && c.text !== '-') {
      s += '<table class="fcg-tbl"><tr><th class="fcg-th-full">フレーバーテキスト</th></tr>' +
        '<tr><td class="fcg-textcell">' + fmtRaw(c.text) + '</td></tr></table>';
    }
    if (c.graphic_text && c.graphic_text !== '-') {
      s += '<table class="fcg-tbl"><tr><th class="fcg-th-full">グラフィックテキスト</th></tr>' +
        '<tr><td class="fcg-textcell">' + fmtRaw(c.graphic_text) + '</td></tr></table>';
    }
    return s;
  }
  function rawDetails(c) {
    var rows = Object.keys(c).map(function (k) {
      var v = c[k];
      if (v && typeof v === 'object') v = JSON.stringify(v);
      return '<tr><th>' + esc(k) + '</th><td>' + val(v) + '</td></tr>';
    }).join('');
    return '<details class="fcg-raw"><summary>全フィールド（原文 / ' +
      Object.keys(c).length + ' 項目）</summary><table>' + rows + '</table></details>';
  }
  function openModal(i) {
    if (i < 0 || i >= view.length) return;
    modalIndex = i;
    var c = view[i];

    document.getElementById('modalInner').innerHTML =
      '<h2 class="fcg-single-title">' + esc(tr(c.name)) +
      '<span class="fcg-single-no">' + esc(c.no) + '</span></h2>' +
      '<div class="fcg-single">' +
        '<div class="fcg-figure' + (isLandscape(c) ? ' is-landscape' : '') + '">' +
          '<img src="' + esc(imgUrl(c)) + '" alt="' + esc(c.name) +
          '" onload="this.parentElement.classList.toggle(\'is-landscape\',this.naturalWidth>this.naturalHeight)"' +
          ' onerror="this.style.opacity=0">' +
          '<button class="fcg-nav fcg-nav--prev" data-step="-1" aria-label="前のカード"' +
          (i <= 0 ? ' disabled' : '') + '>‹</button>' +
          '<button class="fcg-nav fcg-nav--next" data-step="1" aria-label="次のカード"' +
          (i >= view.length - 1 ? ' disabled' : '') + '>›</button>' +
        '</div>' +
        '<div class="fcg-data-box">' + iconRow(c) + specTables(c) +
          '<p class="fcg-illust">イラスト：' + val(c.illustrator) + '</p>' +
          '<p class="fcg-copyright">©高橋陽一／集英社・2018キャプテン翼製作委員会　© ＴＯＭＹ</p>' +
          rawDetails(c) +
        '</div>' +
      '</div>';

    document.getElementById(FCG_CONFIG.modalId).classList.add('open');
    document.body.style.overflow = 'hidden';
    Array.prototype.forEach.call(document.querySelectorAll('.fcg-nav[data-step]'), function (b) {
      b.addEventListener('click', function () {
        var n = modalIndex + Number(b.dataset.step);
        if (n >= 0 && n < view.length) openModal(n);
      });
    });
    document.querySelector('.modal-body').scrollTop = 0;
  }
  function closeModal() {
    document.getElementById(FCG_CONFIG.modalId).classList.remove('open');
    document.body.style.overflow = '';
    modalIndex = -1;
  }

  /* 预载官方图标：弹窗由 innerHTML 动态插入，预先缓存可避免打开时图标闪白 */
  function preloadIcons() {
    var names = ['icon.png', 'icon_1.png', 'guts.png', 'sp.png',
      'deffence.png', 'cover.png', 'assist.png', 'offence.png',
      'ass.png', 'off.png', 'sp_s.png', 'def.png', 'cov.png', 'hand.png', 'plus1.png'];
    RARE_ORDER.forEach(function (r) { names.push(r + '.png'); });
    for (var i = 0; i <= 9; i++) { names.push('n' + i + '.png', 'n' + i + 'p.png'); }
    names.forEach(function (f) { var im = new Image(); im.src = FCG_CONFIG.iconBase + f; });
  }

  /* ---------- 事件 ---------- */
  function bind() {
    document.getElementById('seriesTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-series]'); if (!b) return;
      state.series = b.dataset.series; state.page = 1; renderSeriesTabs(); render();
    });
    document.getElementById('kindTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-kind]'); if (!b) return;
      state.kind = b.dataset.kind; state.page = 1; renderKindTabs(); render();
    });
    document.getElementById('q').addEventListener('input', function (e) { state.q = e.target.value; state.page = 1; render(); });
    ['rareSel:rare', 'posSel:pos', 'attachedSel:attached', 'illustSel:illust', 'sortSel:sort']
      .forEach(function (pair) {
        var p = pair.split(':');
        document.getElementById(p[0]).addEventListener('change', function (e) {
          state[p[1]] = e.target.value; state.page = 1; render();
        });
      });
    var pager = document.getElementById('fcgPager');
    if (pager) {
      pager.addEventListener('click', function (e) {
        var b = e.target.closest('[data-page]'); if (!b || b.disabled) return;
        var p = Number(b.dataset.page);
        if (p >= 1 && p <= totalPages()) { state.page = p; render(); }
      });
    }
    var modal = document.getElementById(FCG_CONFIG.modalId);
    Array.prototype.forEach.call(modal.querySelectorAll('[data-close]'), function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft' && modalIndex > 0) openModal(modalIndex - 1);
      if (e.key === 'ArrowRight' && modalIndex < view.length - 1) openModal(modalIndex + 1);
    });
  }

  preloadIcons();
  fillFilters();
  renderSeriesTabs(); renderKindTabs(); render(); bind();
})();
