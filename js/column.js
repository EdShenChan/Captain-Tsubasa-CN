/* 《队长小翼》汉化版知识库 · 特别专栏渲染脚本 */
(function () {
  'use strict';

  const list = document.getElementById('columnList');
  if (!list || typeof COLUMN_DATA === 'undefined') return;

  // 自动按时间顺序排序（倒序：最新在前）。日期为 YYYY.MM.DD 字符串，字典序即时间序。
  // pin: true 的条目（需突出展示的采访等）始终置顶，不受日期排序影响。
  COLUMN_DATA.sort(function (a, b) {
    if (!!a.pin !== !!b.pin) return a.pin ? -1 : 1;
    return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
  });

  // 折叠状态的最大高度（与 column.css 中 .col-fold 的 max-height 保持一致）
  const FOLD_H = 280;

  // 图片说明文字（按专栏配图补充）
  const CAPTIONS = {
    "622": "帕德尔球球场（高桥阳一老师提供）",
    "604": ["西班牙·萨瓦德尔", "意大利·阿尔巴"],
    "581": "意大利·那不勒斯街头的《队长小翼》壁画"
  };

  // 专栏总数（非 full 条目）；用于给专栏条目倒序编号 COLUMN N..01（最新=N）
  const totalCols = COLUMN_DATA.filter(function (c) { return !c.full; }).length;
  let colSeq = 0;

  COLUMN_DATA.forEach(function (col, i) {
    // full:true 的条目完整展示（不折叠、无展开按钮、无来源、标签用 INTERVIEW、无日文小字）
    const isFull = !!col.full;

    // 专栏条目才递增序号（倒序：最新=totalCols）
    let idx = '';
    if (!isFull) {
      colSeq++;
      idx = String(totalCols - colSeq + 1).padStart(2, '0');
    }

    const article = document.createElement('article');
    article.className = 'column-item';
    article.setAttribute('data-reveal', '');
    article.setAttribute('data-cat', isFull ? 'INTERVIEW' : 'COLUMN');   // 供分类筛选使用

    // 识别署名段（以「高桥」开头的段落视为署名）
    const isSign = function (p) {
      const t = p.trim();
      return t.indexOf('高桥') === 0 && t.length < 20;
    };

    // 分离正文与署名
    const signParas = col.body.filter(isSign);
    const bodyParas = col.body.filter(function (p) { return !isSign(p); });

    // 正文段落
    const bodyHtml = bodyParas.map(function (p) {
      const safe = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return '<p>' + safe.replace(/\n/g, '<br>') + '</p>';
    }).join('');

    // 采访评论段（heading + 圆形头像 + 正文左对齐缩进，仿采访页 iv-a 发言格式）
    let quoteHtml = '';
    if (col.quote) {
      const q = col.quote;
      const qParas = Array.isArray(q.text) ? q.text : [q.text];
      const qText = qParas.map(function (p) {
        const safe = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return '<p>' + safe.replace(/\n/g, '<br>') + '</p>';
      }).join('');
      const qHeading = q.heading ? '<p class="col-quote-heading">' + q.heading + '</p>' : '';
      quoteHtml = qHeading +
        '<div class="col-quote">' +
          '<img class="col-quote-avatar" src="' + q.avatar + '" alt="高桥阳一" loading="lazy">' +
          '<div class="col-quote-body">' + qText + '</div>' +
        '</div>';
    }

    // 配图（插在正文末尾）
    let imgsHtml = '';
    if (col.imgs && col.imgs.length) {
      const caps = CAPTIONS[col.id] || [];
      const figs = col.imgs.map(function (src, j) {
        const cap = Array.isArray(caps) ? caps[j] : (j === 0 ? caps : '');
        return '<figure><img src="' + src + '" alt="' + (cap || col.title) + '" loading="lazy">' + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
      }).join('');
      imgsHtml = '<div class="col-imgs">' + figs + '</div>';
    }

    // 新闻式排版（newsLayout: true）：配图提到标题下方、正文之上，横排缩略图
    // 与【新闻动态】卡片一致；此类条目保留「展开全文」按钮（按内容高度判断）
    const newsLayout = !!col.newsLayout;
    let thumbsHtml = '';
    if (newsLayout && col.imgs && col.imgs.length) {
      thumbsHtml = '<div class="col-thumbs">' + col.imgs.map(function (src) {
        return '<img class="col-thumb" src="' + src + '" alt="' + col.title + '" loading="lazy">';
      }).join('') + '</div>';
    }

    // 署名
    let signHtml = '';
    if (signParas.length) {
      const signText = signParas.map(function (p) {
        return p.replace(/\n/g, '').trim();
      }).join('');
      signHtml = '<div class="col-sign">— ' + signText + '</div>';
    }

    // 索引标签：full 条目显示 INTERVIEW，其余显示 COLUMN（不再带数字序号）
    const tagLabel = isFull ? 'INTERVIEW' : 'COLUMN';

    // 日文小字（full 条目不显示）
    const jaHtml = (!isFull && col.titleJa) ? '<p class="col-title-ja">' + col.titleJa + '</p>' : '';

    // 跳转按钮（带 link 的条目渲染；绝对外链在新标签页打开）
    let btnHtml = '';
    if (col.link) {
      const isExt = /^https?:\/\//.test(col.link);
      const target = isExt ? ' target="_blank" rel="noopener"' : '';
      btnHtml = '<div class="col-action"><a href="' + col.link + '" class="btn"' + target + '>' + (col.linkText || '阅读全文 →') + '</a></div>';
    }

    // 原文出处：full 条目去掉；普通条目移到折叠区内部
    // （折叠区内部的内容在 col-foldInner 中拼入）
    let sourceHtml = '';
    if (!isFull) {
      if (col.link) {
        sourceHtml = '<p class="col-source">来源：集英社 100 周年企划「MANGA MILLION」</p>';
      } else {
        sourceHtml = '<p class="col-source">原文出处：<a href="https://captain-tsubasa.world/special/' + col.id + '/" target="_blank" rel="noopener">captain-tsubasa.world/special/' + col.id + '/</a></p>';
      }
    } else if (col.sourceText) {
      // full 条目：纯文本来源（零外链约定，不做成可点击链接）
      sourceHtml = '<p class="col-source">原文出处：' + col.sourceText + '</p>';
    }

    // 折叠区内容 = 正文 + 配图 + 署名 + 来源（来源在折叠区内部、正文末尾）
    // full 条目且带配图：正文与配图左右分栏（配图在右），无折叠按钮
    let foldInner;
    if (isFull && col.imgs && col.imgs.length && !newsLayout) {
      foldInner = '<div class="col-flex">' +
                    '<div class="col-body">' + bodyHtml + quoteHtml + '</div>' +
                    imgsHtml +
                  '</div>' + signHtml + sourceHtml;
    } else {
      // 新闻式排版的配图已提到标题下方，正文内不再重复插入
      foldInner = '<div class="col-body">' + bodyHtml + quoteHtml + (newsLayout ? '' : imgsHtml) + '</div>' + signHtml + sourceHtml;
    }

    article.innerHTML =
      '<div class="col-meta">' +
        '<span class="col-date">' + col.date + '</span>' +
        '<span class="col-index">' + tagLabel + '</span>' +
      '</div>' +
      '<h2 class="col-title">' + col.title + '</h2>' +
      jaHtml +
      thumbsHtml +
      '<div class="col-fold">' + foldInner + '</div>' +
      '<button type="button" class="col-toggle" aria-expanded="false">' +
        '<span class="col-toggle-label">展开全文</span>' +
        '<span class="col-toggle-arrow"></span>' +
      '</button>' +
      btnHtml +
      '<div style="clear:both"></div>';

    list.appendChild(article);

    // ---- 折叠逻辑 ----
    const fold = article.querySelector('.col-fold');
    const toggleBtn = article.querySelector('.col-toggle');

    if (isFull && !newsLayout) {
      // 完整展示：不折叠、无展开按钮
      fold.classList.add('no-fold');
      toggleBtn.style.display = 'none';
      return;
    }

    // 判断内容是否真的超出折叠高度
    // 临时放开高度测量真实内容高度（同帧内完成，不会闪烁）
    fold.style.maxHeight = 'none';
    const contentH = fold.scrollHeight;
    fold.style.maxHeight = '';

    // 新闻式排版的配图在折叠区之外，不因「有图」而强制折叠
    const hasImages = !newsLayout && col.imgs && col.imgs.length > 0;

    if (contentH <= FOLD_H + 8 && !hasImages) {
      // 内容很短，无需折叠：隐藏按钮、移除渐变遮罩
      toggleBtn.style.display = 'none';
      fold.classList.add('no-fold');
    } else {
      // 内容超长：进入折叠态，绑定点击展开/收起
      fold.classList.add('folded');
      toggleBtn.addEventListener('click', function () {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          // 收起
          fold.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.querySelector('.col-toggle-label').textContent = '展开全文';
        } else {
          // 展开
          fold.classList.add('open');
          toggleBtn.setAttribute('aria-expanded', 'true');
          toggleBtn.querySelector('.col-toggle-label').textContent = '收起';
        }
      });
    }
  });

  /* ===== 分类筛选（ALL / COLUMN / INTERVIEW）+ 分页（每页 10 条） ===== */
  const CAT_ORDER = ['ALL', 'COLUMN', 'INTERVIEW'];
  const PER_PAGE  = 10;
  const counts = {};
  COLUMN_DATA.forEach(function (c) {
    const k = c.full ? 'INTERVIEW' : 'COLUMN';
    counts[k] = (counts[k] || 0) + 1;
  });

  const filterBar = document.getElementById('columnFilter');
  const pager     = document.getElementById('columnPager');
  const emptyTip  = document.getElementById('columnEmpty');
  const cards     = Array.prototype.slice.call(list.querySelectorAll('.column-item'));
  let curCat = 'ALL';
  let curPage = 1;

  function cur() {
    return cards.filter(function (a) {
      return curCat === 'ALL' || a.getAttribute('data-cat') === curCat;
    });
  }

  function renderPager(total, pages) {
    if (!pager) return;
    pager.innerHTML = '';
    if (!total) { if (emptyTip) emptyTip.style.display = 'block'; return; }
    if (emptyTip) emptyTip.style.display = 'none';
    const info = document.createElement('div');
    info.className = 'pg-info';
    info.textContent = '共 ' + total + ' 条　第 ' + curPage + ' / ' + pages + ' 页';
    pager.appendChild(info);

    function add(label, page, cls, active, disabled) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pg-btn' + (cls ? ' ' + cls : '') + (active ? ' is-active' : '');
      b.innerHTML = label;
      if (disabled) b.disabled = true;
      else b.addEventListener('click', function () { go(page); });
      pager.appendChild(b);
    }
    add('&#8249;', curPage - 1, 'pg-nav', false, curPage === 1);
    for (let i = 1; i <= pages; i++) add(String(i), i, '', i === curPage, false);
    add('&#8250;', curPage + 1, 'pg-nav', false, curPage === pages);
  }

  function applyView(scrollTop) {
    const vis = cur();
    const pages = Math.max(1, Math.ceil(vis.length / PER_PAGE));
    if (curPage > pages) curPage = pages;
    if (curPage < 1) curPage = 1;
    const start = (curPage - 1) * PER_PAGE;
    cards.forEach(function (a) { a.style.display = 'none'; });
    vis.slice(start, start + PER_PAGE).forEach(function (a) { a.style.display = ''; });
    renderPager(vis.length, pages);
    if (scrollTop && vis.length) {
      const top = list.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top: top > 0 ? top : 0, behavior: 'smooth' });
    }
  }

  function go(p) { curPage = p; applyView(true); }

  function applyFilter(cat) {
    curCat = cat;
    curPage = 1;
    applyView(false);
    if (!filterBar) return;
    Array.prototype.forEach.call(filterBar.children, function (b) {
      const on = b.getAttribute('data-cat') === cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  if (filterBar) {
    CAT_ORDER.forEach(function (cat) {
      const n = (cat === 'ALL') ? cards.length : (counts[cat] || 0);
      if (cat !== 'ALL' && !n) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nf-btn' + (cat === 'ALL' ? ' is-active' : '');
      btn.setAttribute('data-cat', cat);
      btn.setAttribute('aria-pressed', cat === 'ALL' ? 'true' : 'false');
      btn.innerHTML = cat + '<span class="nf-num">' + n + '</span>';
      btn.addEventListener('click', function () { applyFilter(cat); });
      filterBar.appendChild(btn);
    });
  }
  applyFilter('ALL');
})();
