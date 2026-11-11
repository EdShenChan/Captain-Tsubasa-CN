/* 王者のフィールド 卡牌图鉴：筛选 + 分页（无详情弹窗） */
(function () {
  var DATA = window.COF_CARDS || [];
  var BASE = 'assets/img/game/champion-of-field/cards/';
  var PAGE_SIZE = 24;

  var grid = document.getElementById('cofGrid');
  var pager = document.getElementById('cofPager');
  var countEl = document.getElementById('cofCount');
  var filter = document.getElementById('cofFilter');
  if (!grid) return;

  var state = { type: 'all', page: 1 };

  function filtered() {
    if (state.type === 'all') return DATA;
    return DATA.filter(function (c) { return c.type === state.type; });
  }

  function render() {
    var list = filtered();
    var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;
    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = list.slice(start, start + PAGE_SIZE);

    // grid
    var html = '';
    for (var i = 0; i < pageItems.length; i++) {
      var c = pageItems[i];
      html += '<figure class="cof-card">' +
        '<img src="' + BASE + c.no + '.jpg" alt="' + c.no + ' 卡面" loading="lazy" width="680" height="988">' +
        '<figcaption>' + c.no + '</figcaption>' +
        '</figure>';
    }
    grid.innerHTML = html;

    // count
    if (countEl) {
      countEl.textContent = '显示 ' + (start + 1) + '–' + (start + pageItems.length) + ' / 共 ' + list.length + ' 张' +
        '（第 ' + state.page + ' / ' + totalPages + ' 页）';
    }

    // pager
    var p = '';
    p += '<button type="button" data-page="' + (state.page - 1) + '"' + (state.page <= 1 ? ' disabled' : '') + '>‹ 上一页</button>';
    for (var n = 1; n <= totalPages; n++) {
      if (totalPages > 9 && n !== 1 && n !== totalPages && Math.abs(n - state.page) > 2) {
        if (n === 2 || n === totalPages - 1) p += '<span style="padding:0 4px;color:var(--muted)">…</span>';
        continue;
      }
      p += '<button type="button" data-page="' + n + '"' + (n === state.page ? ' aria-current="page"' : '') + '>' + n + '</button>';
    }
    p += '<button type="button" data-page="' + (state.page + 1) + '"' + (state.page >= totalPages ? ' disabled' : '') + '>下一页 ›</button>';
    if (pager) pager.innerHTML = p;
  }

  // filter buttons
  if (filter) {
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-type]');
      if (!btn) return;
      state.type = btn.dataset.type;
      state.page = 1;
      Array.prototype.forEach.call(filter.querySelectorAll('button[data-type]'), function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      render();
    });
  }

  // pager clicks
  if (pager) {
    pager.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-page]');
      if (!btn || btn.disabled) return;
      var n = parseInt(btn.dataset.page, 10);
      if (!isNaN(n)) { state.page = n; render(); }
    });
  }

  render();
})();
