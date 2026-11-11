/* ==========================================================================
   CTB 卡片图鉴 · 渲染逻辑
   --------------------------------------------------------------------------
   · 数据：js/ctb-data.js → window.CTB_CARDS（日文原文，勿手改）
   · 可修改点：
       1) CTB_CONFIG.imageBase  —— 并入主站时改图片目录前缀
       2) window.CTB_TRANSLATIONS —— 日后要译名/中文化时，在本文件之前
          额外加载一个 translations.js，形如 { "大空 翼": "大空翼", ... }，
          渲染时会自动优先取译文；不加载则全部保持日文原文。
       3) COLOR_LABEL / KIND_LABEL / PR_INFO —— 仅界面标签与配布注释，不改动数据。
   · 官方小图标位于 assets/img/game/ctb-w118/_partimages/（[[xxx.gif]] → 站内 GIF）。
   · 详情弹窗排版参照 ws-tcg.com 官方 cardModal。
   · 四版面（商品情报 / 玩法指南 / 卡牌图鉴 / 优胜者卡组配方）用 #hash 切换，默认 #cards；
     优胜者配方数据来自 js/ctb-recipes.js（window.CTB_RECIPES，勿手改），卡号可联动图鉴弹窗。
   · 本页面不依赖 fetch / 模块化，file:// 双击即可运行。
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.CTB_CARDS || [];
  var T = window.CTB_TRANSLATIONS || {};

  var CTB_CONFIG = {
    imageBase: 'assets/img/game/',
    gridId: 'charaGrid',
    modalId: 'charaModal'
  };

  var COLOR_LABEL = {
    '[[yellow.gif]]': '黄',
    '[[blue.gif]]': '青',
    '[[green.gif]]': '緑',
    '[[red.gif]]': '赤'
  };
  var KIND_LABEL = { '2': 'キャラ', '3': 'イベント', '4': 'クライマックス' };
  var RARE_ORDER = ['SP', 'RRR', 'SR', 'RR', 'CR', 'R', 'U', 'C', 'PR'];
  var PAGE_SIZE = 20;   // 图鉴每页显示张数（用户指定）

  /* 官方小图标：官网用 replaceCardIcons() 把 [[xxx.gif]] 替换成 _partimages/ 下的真实 GIF。
     之前抓取遗漏该目录，2026-11-10 已补齐到站内（零外链）。 */
  var ICON_BASE = CTB_CONFIG.imageBase + 'ctb-w118/_partimages/';
  var SIDE_LABEL = { '-1': 'Wサイド', '-2': 'Sサイド' };
  var NEO_NAME = 'キャプテン翼';   // 作品区分（官网「ネオスタンダード区分」）

  /* 特殊发布方式卡片：官方 PR カード页「主な配布方法」原文
     https://ws-tcg.com/cardlist/card_pr/?work_title=『キャプテン翼』
     这 3 张为 PR（プロモーション）卡，非补充包收录，收录商品为「PRカード【Wサイド】」。 */
  var PR_INFO = {
    'CTB/W118-P01':  { way: '11月-12月度ショップ大会(2024)', label: '店铺大会配布' },
    'CTB/W118-P01S': { way: '11月-12月度ショップ大会(2024)', label: '店铺大会配布' },
    'CTB/W118-P02':  { way: 'WGP2024 タイトルカップ上位賞', label: '大赛上位奖' }
  };

  var state = { q: '', rare: 'ALL', kind: 'ALL', color: 'ALL', level: 'ALL', sort: 'number', page: 1 };
  var view = [];
  var modalIndex = -1;

  function totalPages() { return Math.max(1, Math.ceil(view.length / PAGE_SIZE)); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function tr(s) { return T[s] || s; }
  function fmtText(s) {
    return iconify(s).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  }
  function val(s) { return (s === '' || s == null || s === '-') ? '—' : esc(s); }
  function imgUrl(c) { return CTB_CONFIG.imageBase + (c.picture || ''); }

  /* [[xxx.gif]] → 站内官方 GIF 小图标（与官网 replaceCardIcons 同逻辑） */
  function iconify(s) {
    if (s == null || s === '' || s === '-') return '—';
    return esc(s).replace(/\[\[([a-zA-Z0-9_.-]+\.gif)\]\]/g,
      function (_, f) { return '<img class="ctb-ico" src="' + ICON_BASE + f + '" alt="">'; });
  }
  function sideLabel(s) { return SIDE_LABEL[String(s)] || (s === '-' || s == null ? '—' : esc(s)); }
  function expRel(c) {
    try { return JSON.parse(c.expansion_rel || '{}') || {}; } catch (e) { return {}; }
  }
  function featureText(c) {
    return [c.feature1, c.feature2, c.feature3].filter(function (v) {
      return v && String(v).trim() && !/^[-－ー—]+$/.test(String(v).trim());
    }).map(function (v) { return esc(v); }).join('・');
  }
  function faqList(c) {
    try { var a = JSON.parse(c.faqs || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function prNote(c) {
    var p = PR_INFO[c.card_number];
    if (!p) return '';
    var er = expRel(c);
    return '<div class="ctb-pr-note">' +
      '<div class="ctb-pr-note-h">特殊发布方式 / 主な配布方法</div>' +
      '<p>本卡为 <b>PR（プロモーション）卡</b>，<b>未收录于补充包</b>，' +
      '仅通过官方活动／赛事配布取得，无法通过购买补充包获得。</p>' +
      '<dl>' +
      '<div><dt>主な配布方法</dt><dd>' + esc(p.way) + '</dd></div>' +
      '<div><dt>中文说明</dt><dd>' + esc(p.label) + '</dd></div>' +
      '<div><dt>収録商品</dt><dd>' + esc(er.name || 'PRカード【Wサイド】') + '</dd></div>' +
      '</dl>' +
      '<p class="ctb-pr-note-src">依据 ws-tcg.com 官方「PRカード」一覧（主な配布方法）标注。</p>' +
      '</div>';
  }
  function faqHtml(c) {
    var list = faqList(c);
    if (!list.length) return '';
    return '<div class="ctb-faq"><h3>Q&amp;A</h3>' + list.map(function (f) {
      return '<div class="ctb-faq-item">' +
        (f.date ? '<div class="ctb-faq-date">' + esc(f.date) + '</div>' : '') +
        '<div class="ctb-faq-q"><span>Q</span>' + fmtText(f.question) + '</div>' +
        '<div class="ctb-faq-a"><span>A</span>' + fmtText(f.answer) + '</div>' +
        '</div>';
    }).join('') + '</div>';
  }

  /* ---------- 筛选与排序 ---------- */
  function filtered() {
    var q = state.q.trim().toLowerCase();
    var out = DATA.filter(function (c) {
      if (state.rare !== 'ALL' && c.rare !== state.rare) return false;
      if (state.kind !== 'ALL' && String(c.card_kind) !== state.kind) return false;
      if (state.color !== 'ALL' && c.color !== state.color) return false;
      if (state.level !== 'ALL' && String(c.level) !== state.level) return false;
      if (q) {
        var hay = [c.card_number, c.card_name, c.card_name_kana, c.text, c.flavor,
          c.feature1, c.feature2, c.feature3, c.rare].join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    out.sort(function (a, b) {
      if (state.sort === 'name') return String(a.card_name).localeCompare(String(b.card_name), 'ja');
      if (state.sort === 'rare') {
        var d = RARE_ORDER.indexOf(a.rare) - RARE_ORDER.indexOf(b.rare);
        return d || String(a.card_number).localeCompare(String(b.card_number), 'ja', { numeric: true });
      }
      return String(a.card_number).localeCompare(String(b.card_number), 'ja', { numeric: true });
    });
    return out;
  }

  /* ---------- 标签栏 ---------- */
  function renderRareTabs() {
    var counts = {};
    DATA.forEach(function (c) { counts[c.rare] = (counts[c.rare] || 0) + 1; });
    var rares = ['ALL'].concat(RARE_ORDER.filter(function (r) { return counts[r]; }));
    document.getElementById('rareTabs').innerHTML = rares.map(function (r) {
      var label = r === 'ALL' ? 'すべて' : r;
      var num = r === 'ALL' ? DATA.length : counts[r];
      return '<button class="tab' + (state.rare === r ? ' tab--active' : '') +
        '" data-rare="' + esc(r) + '"><span class="tab-name">' + esc(label) +
        '</span><span class="tab-name" style="font-size:11px;opacity:.7">' + num + '</span></button>';
    }).join('');
  }
  function renderKindTabs() {
    var kinds = [['ALL', 'すべて'], ['2', 'キャラ'], ['3', 'イベント'], ['4', 'クライマックス']];
    document.getElementById('kindTabs').innerHTML = kinds.map(function (k) {
      return '<button class="stage-tab' + (state.kind === k[0] ? ' stage-tab--active' : '') +
        '" data-kind="' + k[0] + '">' + k[1] + '</button>';
    }).join('');
  }

  /* ---------- 卡片网格 ---------- */
  function cardHtml(c, i) {
    var nick = [KIND_LABEL[String(c.card_kind)] || c.card_kind,
      COLOR_LABEL[c.color] || '', 'Lv' + c.level].filter(Boolean).join(' · ');
    var pr = PR_INFO[c.card_number];
    return '<article class="chara-card' + (pr ? ' is-pr' : '') + '" data-index="' + i + '" tabindex="0">' +
      '<span class="chara-card-btn rare-' + esc(c.rare) + '">' + esc(c.rare) + '</span>' +
      (pr ? '<span class="ctb-pr-flag" title="' + esc(pr.way) + '">配布限定</span>' : '') +
      '<div class="chara-card-img"><img loading="lazy" src="' + esc(imgUrl(c)) +
      '" alt="' + esc(c.card_name) +
      '" onload="var p=this.closest(\'.chara-card-img,.modal-img\');if(p)p.classList.toggle(\'is-landscape\',this.naturalWidth>this.naturalHeight)"' +
      ' onerror="this.style.opacity=0"></div>' +
      '<div class="chara-card-info">' +
      '<div class="chara-card-en">' + esc(c.card_number) + '</div>' +
      '<div class="chara-card-name">' + esc(tr(c.card_name)) + '</div>' +
      '<div class="chara-card-nick">' + esc(nick) + '</div>' +
      (pr ? '<div class="ctb-pr-card-note">主な配布方法：' + esc(pr.way) + '</div>' : '') +
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
    var grid = document.getElementById('charaGrid');
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

  /* ---------- 分页控件 ---------- */
  function renderPagination() {
    var box = document.getElementById('ctbPager');
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

  /* ---------- 详情弹窗 ----------
     排版参照 ws-tcg.com 官方 cardModal：左侧卡图 / 右侧卡号·假名·卡名·种类，
     两条独立信息行（ネオスタンダード区分・収録商品），紧凑规格网格，
     下方通栏效果文本与 Q&A；本站额外保留「全フィールド」原文表与特殊配布注释。 */
  function specItem(label, valueHtml, mode) {
    var cls = mode === 'alone' ? ' ctb-spec-alone' : (mode ? ' ctb-spec-wide' : '');
    return '<div class="ctb-spec-item' + cls + '">' +
      '<dt>' + esc(label) + '</dt><dd>' + valueHtml + '</dd></div>';
  }
  /* cardOverride：由优胜者配方按卡号联动时直接传入卡对象；此时不属于当前筛选集，
     modalIndex 置 -1 并禁用前后张导航，避免误跳到 view 里的其他卡。 */
  function openModal(i, cardOverride) {
    if (!cardOverride && (i < 0 || i >= view.length)) return;
    modalIndex = cardOverride ? -1 : i;
    var c = cardOverride || view[i];
    var er = expRel(c);
    var kind = KIND_LABEL[String(c.card_kind)] || val(c.card_kind);
    var side = sideLabel(c.side);
    var feat = featureText(c);
    var flavor = (c.flavor && String(c.flavor).trim() &&
      !/^[-－ー—]+$/.test(String(c.flavor).trim())) ? esc(c.flavor) : '';

    var neoHtml =
      '<dl class="ctb-neo">' +
      '<div><dt>ネオスタンダード区分</dt><dd>' + esc(NEO_NAME) + '</dd></div>' +
      '<div><dt>収録商品</dt><dd>' +
        (er.category_name ? '<span class="ctb-exp-cat">［' + esc(er.category_name) + '］</span> ' : '') +
        esc(er.name || '—') + '</dd></div>' +
      '</dl>';

    var specs = [
      ['作品番号', esc(c.title_number || '—')],
      ['レアリティ', esc(c.rare || '—')],
      ['サイド', (String(c.side) === '-1'
        ? '<img class="ctb-ico" src="' + ICON_BASE + 'w.gif" alt="W"> ' : '') + esc(side)],
      ['種類', esc(kind)],
      ['色', iconify(c.color) + ' <span class="ctb-sub">' + esc(COLOR_LABEL[c.color] || '') + '</span>'],
      ['レベル', val(c.level)],
      ['コスト', val(c.cost)],
      ['パワー', iconify(c.power)],
      ['ソウル', iconify(c.soul)],
      ['トリガー', iconify(c.card_trigger)]
    ];
    /* 最后一行若只剩 1 项，令其占满整行，避免出现空格子 */
    var lastAlone = specs.length % 3 === 1;
    var specsHtml = '<dl class="ctb-spec-lists">' + specs.map(function (s, idx) {
      return specItem(s[0], s[1], lastAlone && idx === specs.length - 1 ? 'alone' : false);
    }).join('') +
      specItem('特徴', feat ? feat : '—', 'wide') +
      (flavor ? specItem('フレーバー', flavor, 'wide') : '') +
      '</dl>';

    var rawRows = Object.keys(c).map(function (k) {
      var v = c[k];
      if (v && typeof v === 'object') v = JSON.stringify(v);
      return '<tr><th>' + esc(k) + '</th><td>' + val(v) + '</td></tr>';
    }).join('');

    var imgOnload = 'var p=this.closest(\'.ctb-detail-img\');' +
      'if(p)p.classList.toggle(\'is-landscape\',this.naturalWidth>this.naturalHeight)';

    document.getElementById('modalInner').innerHTML =
      '<div class="ctb-detail">' +
        '<div class="ctb-detail-flex">' +
          '<div class="ctb-detail-img"><img src="' + esc(imgUrl(c)) + '" alt="' + esc(c.card_name) +
            '" onload="' + imgOnload + '" onerror="this.style.opacity=0"></div>' +
          '<div class="ctb-detail-texts">' +
            '<p class="ctb-detail-num">' + esc(c.card_number) + '</p>' +
            (c.card_name_kana ? '<p class="ctb-detail-kana">' + esc(c.card_name_kana) + '</p>' : '') +
            '<h2 class="ctb-detail-name">' + esc(tr(c.card_name)) + '</h2>' +
            '<p class="ctb-detail-type">' + esc(kind) + '【' + esc(side) + '】</p>' +
            neoHtml + specsHtml +
          '</div>' +
        '</div>' +
        (c.text ? '<div class="ctb-detail-desc"><div class="ctb-detail-h">テキスト（原文）</div>' +
          '<div class="ctb-detail-body">' + fmtText(c.text) + '</div></div>' : '') +
        prNote(c) +
        faqHtml(c) +
        '<details class="modal-raw"><summary>全フィールド（原文 / ' + Object.keys(c).length + ' 項目）</summary>' +
          '<table>' + rawRows + '</table></details>' +
        /* 配方联动打开的弹窗不属于当前筛选序列，不显示前后张导航 */
        (modalIndex < 0 ? '' :
          '<div class="modal-nav"><button data-step="-1">← 前のカード</button>' +
          '<button data-step="1">次のカード →</button></div>') +
      '</div>';

    document.getElementById('charaModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    Array.prototype.forEach.call(document.querySelectorAll('.modal-nav button'), function (b) {
      b.addEventListener('click', function () {
        var n = modalIndex + Number(b.dataset.step);
        if (n >= 0 && n < view.length) openModal(n);
      });
    });
    document.querySelector('.modal-body').scrollTop = 0;
  }
  function closeModal() {
    document.getElementById('charaModal').classList.remove('open');
    document.body.style.overflow = '';
    modalIndex = -1;
  }

  /* ==========================================================================
     四版面：商品情报 #info / 玩法指南 #guide / 优胜者配方 #recipes / 卡牌图鉴 #cards
     默认 #cards；用 #hash 直达，切换不改动导航与页脚，URL 可分享。
     ========================================================================== */
  var PANELS = ['info', 'guide', 'cards', 'recipes'];
  var PANEL_TITLE = {
    info: '商品情报', guide: '玩法指南',
    recipes: '优胜者卡组配方', cards: '卡牌图鉴'
  };
  var BASE_TITLE = document.title;
  var tabsEl = document.getElementById('ctbTabs');

  function applyPanel(id, updateHash) {
    if (PANELS.indexOf(id) < 0) id = 'cards';
    PANELS.forEach(function (p) {
      var sec = document.getElementById(p);
      if (sec) sec.hidden = (p !== id);
    });
    if (tabsEl) {
      Array.prototype.forEach.call(tabsEl.querySelectorAll('[data-panel]'), function (a) {
        if (a.dataset.panel === id) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }
    document.title = (id === 'cards' ? '' : PANEL_TITLE[id] + ' · ') + BASE_TITLE;
    if (updateHash) {
      var target = '#' + id;
      if (location.hash !== target) {
        try { history.replaceState(null, '', target); } catch (err) { location.hash = id; }
      }
    }
  }
  function panelFromHash() {
    var h = (location.hash || '').replace(/^#/, '');
    return PANELS.indexOf(h) >= 0 ? h : 'cards';
  }
  function bindPanels() {
    if (!tabsEl) return;
    tabsEl.addEventListener('click', function (e) {
      var a = e.target.closest('[data-panel]');
      if (!a) return;
      e.preventDefault();
      var id = a.dataset.panel;
      applyPanel(id, true);
      // 切换后滚到页标签条位置，避免停在长页面中部
      var top = tabsEl.getBoundingClientRect().top + window.pageYOffset -
        (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72);
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
    window.addEventListener('hashchange', function () { applyPanel(panelFromHash(), false); });
    applyPanel(panelFromHash(), false);
  }

  /* ---------- 优胜者卡组配方 ---------- */
  var RECIPES = window.CTB_RECIPES || [];
  function recipeCardTable(cards) {
    var groups = ['キャラ', 'イベント', 'クライマックス'];
    return groups.map(function (g) {
      var rows = cards.filter(function (c) { return c.g === g; });
      if (!rows.length) return '';
      var body = rows.map(function (c) {
        return '<tr data-c="' + esc(c.c) + '">' +
          '<td><button type="button" class="ctb-cardno" data-cardno="' + esc(c.no) +
            '" title="在卡牌图鉴中查看此卡">' + esc(c.no) + '</button></td>' +
          '<td>' + esc(c.name) + '</td>' +
          '<td>' + esc(c.lv) + '</td>' +
          '<td>' + esc(c.n) + '枚</td></tr>';
      }).join('');
      return '<div class="ctb-recipe-group"><h4>' + esc(g) + 'カード · ' + rows.length + ' 种</h4>' +
        '<table class="ctb-cardtable"><thead><tr><th>番号</th><th>カード名</th>' +
        '<th>LV/コスト</th><th>枚数</th></tr></thead><tbody>' + body + '</tbody></table></div>';
    }).join('');
  }
  function renderRecipes() {
    var box = document.getElementById('ctbRecipeList');
    if (!box) return;
    if (!RECIPES.length) { box.innerHTML = '<p class="no-result">配方数据未加载。</p>'; return; }
    box.innerHTML = RECIPES.map(function (r) {
      var fav = r.favPic ? '<img class="ctb-recipe-fav" src="' + esc(CTB_CONFIG.imageBase + r.favPic) +
        '" alt="' + esc(r.favNo) + '" loading="lazy" onerror="this.style.visibility=\'hidden\'">' :
        '<span class="ctb-recipe-fav"></span>';
      var meta = [r.tournament, r.ranking, r.handle ? '玩家：' + r.handle : '',
        r.deckCode ? 'デッキコード：' + r.deckCode : '',
        r.deckKind].filter(Boolean).map(function (x) { return esc(x); }).join('　·　');
      return '<details class="ctb-recipe">' +
        '<summary class="ctb-recipe-sum">' + fav +
          '<div><div class="ctb-recipe-tt"><span class="ctb-recipe-badge">' + esc(r.ranking || '入賞') +
            '</span>' + esc(r.deckName) + '</div>' +
            '<div class="ctb-recipe-meta">' + meta + '</div></div>' +
          '<div class="ctb-recipe-toggle"><span class="open">展开卡表 ▼</span><span class="close">收起卡表 ▲</span></div>' +
        '</summary>' +
        '<div class="ctb-recipe-body">' +
          (r.comment ? '<div class="ctb-recipe-comment">' + esc(r.comment) + '</div>' : '') +
          recipeCardTable(r.cards) +
        '</div></details>';
    }).join('');

    /* 卡号 → 图鉴详情弹窗联动（纯站内，按卡号在全量数据中定位） */
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cardno]');
      if (!b) return;
      var no = b.dataset.cardno;
      for (var i = 0; i < DATA.length; i++) {
        if (DATA[i].card_number === no) { openModal(i, DATA[i]); return; }
      }
    });
  }

  /* ---------- 事件 ---------- */
  function bind() {
    document.getElementById('rareTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-rare]'); if (!b) return;
      state.rare = b.dataset.rare; state.page = 1; renderRareTabs(); render();
    });
    document.getElementById('kindTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-kind]'); if (!b) return;
      state.kind = b.dataset.kind; state.page = 1; renderKindTabs(); render();
    });
    document.getElementById('q').addEventListener('input', function (e) { state.q = e.target.value; state.page = 1; render(); });
    ['colorSel:color', 'levelSel:level', 'sortSel:sort'].forEach(function (pair) {
      var p = pair.split(':');
      document.getElementById(p[0]).addEventListener('change', function (e) { state[p[1]] = e.target.value; state.page = 1; render(); });
    });
    var pager = document.getElementById('ctbPager');
    if (pager) {
      pager.addEventListener('click', function (e) {
        var b = e.target.closest('[data-page]'); if (!b || b.disabled) return;
        var p = Number(b.dataset.page);
        if (p >= 1 && p <= totalPages()) { state.page = p; render(); }
      });
    }
    var modal = document.getElementById('charaModal');
    Array.prototype.forEach.call(modal.querySelectorAll('[data-close]'), function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (modalIndex < 0) return;   // 配方联动打开的弹窗不参与前后张导航
      if (e.key === 'ArrowLeft' && modalIndex > 0) openModal(modalIndex - 1);
      if (e.key === 'ArrowRight' && modalIndex < view.length - 1) openModal(modalIndex + 1);
    });
  }

  renderRareTabs(); renderKindTabs(); render(); renderRecipes(); bindPanels(); bind();
})();
