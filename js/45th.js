/* 45周年专页 · 三板块渲染（PROJECT / INTERVIEW / CONGRATULATIONS）
 * 数据：assets/data/45th-zh.json；零外链：仅站内锚点与弹窗。 */
document.addEventListener('DOMContentLoaded', () => {

  fetch('assets/data/45th-zh.json')
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      window.__45thData = data;
      renderAll(data);
      setupModals(data);
      setupCarousels();
    })
    .catch(err => {
      console.error('45th data load failed:', err);
      ['featuredGrid', 'newsList', 'interviewWrap', 'celebrationList', 'friendsList'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<p class="load-fail">数据加载失败，请通过本地服务器或已发布页面访问。</p>';
      });
    });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function clean(s) { return String(s || '').replace(/モーダルを閉じる|詳細を見る/g, '').replace(/\s+/g, ' ').trim(); }
  function nl2br(s) { return esc(s).replace(/\n/g, '<br>'); }
  function img(src, alt, w, h, cls) {
    return `<img${cls ? ` class="${cls}"` : ''} src="${esc(src)}" alt="${esc(alt)}" width="${w||400}" height="${h||260}" loading="lazy">`;
  }

  function renderAll(data) {
    renderFeatured(data.featured || []);
    renderNews(data.news || []);
    renderInterview(data.interview);
    renderGroup('celebrationList', data.celebrations || [], 'celeb1');
    renderGroup('friendsList', data.friends || [], 'celeb2');
  }

  /* ---------- PROJECT：企划卡 4 张（编号降序） ---------- */
  function renderFeatured(items) {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = items.map(it => {
      const desc = it.descJa ? `<p class="dc-card__desc">${esc(clean(it.descJa).slice(0, 70))}…</p>` : '';
      const inner = `<div class="dc-card__num">${img(it.numberImg, 'PROJECT ' + it.project, 543, 114)}</div>
        <div class="dc-card__thumb">${img(it.thumb, it.titleZh, it.width, it.height)}</div>
        <div class="dc-card__body">
          <h3 class="dc-card__title">${esc(it.titleZh)}</h3>
          <p class="dc-card__title-ja">${esc(it.title)}</p>${desc}
        </div>`;
      return it.target
        ? `<a class="dc-card dc-card--project" href="${esc(it.target)}">${inner}</a>`
        : `<div class="dc-card dc-card--project" role="button" tabindex="0" data-open="modal-${esc(it.modal)}">${inner}</div>`;
    }).join('');
  }

  /* ---------- PROJECT：NEWS 卡（首屏 4 + SHOW MORE） ---------- */
  function renderNews(items) {
    const list = document.getElementById('newsList');
    if (!list) return;
    // 时间逆序：最新在最左（data 内为日期升序，故反转）
    const ordered = [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    list.innerHTML = ordered.map(it => {
      const ref = (it.siteRefs || []).find(x => x.url);
      const refHtml = ref
        ? `<p class="dc-news__ref">本站已收录：<a href="${esc(ref.url)}">${esc(ref.title)}</a></p>`
        : (it.status === 'NEW' ? '<p class="dc-news__ref dc-news__ref--new">本站暂无对应条目</p>' : '');
      const openable = it.modal && (it.detailParagraphs || []).length;
      const card = `<div class="dc-news__thumb">${img(it.image, it.titleZh, it.width, it.height)}</div>
        <time class="dc-news__date" datetime="${esc(it.date)}">${esc(it.date.replace(/-/g, '.'))}</time>
        <h4 class="dc-news__title">${esc(it.titleZh)}</h4>
        <p class="dc-news__title-ja">${esc(it.titleJa)}</p>${refHtml}`;
      return openable
        ? `<article class="dc-news" role="button" tabindex="0" data-open="modal-${esc(it.modal)}">${card}</article>`
        : `<article class="dc-news">${card}</article>`;
    }).join('');
    // 左右箭头滚动
    const wrap = list.closest('.dc-news-carousel');
    if (wrap) {
      const prev = wrap.querySelector('[data-news-prev]');
      const next = wrap.querySelector('[data-news-next]');
      const step = () => {
        const card = list.querySelector('.dc-news');
        const gap = parseFloat(getComputedStyle(list).gap || '22');
        return card ? card.getBoundingClientRect().width + gap : 280;
      };
      if (prev) prev.addEventListener('click', () => list.scrollBy({ left: -step(), behavior: 'smooth' }));
      if (next) next.addEventListener('click', () => list.scrollBy({ left: step(), behavior: 'smooth' }));
    }
  }

  /* ---------- INTERVIEW：1 篇采访 + coming soon ---------- */
  function renderInterview(iv) {
    const wrap = document.getElementById('interviewWrap');
    if (!wrap || !iv) return;
    const qaHtml = (iv.qa || []).map((q, i) => `
      <div class="dc-qa"><h4 class="dc-qa__q"><span>Q${String(i+1).padStart(2,'0')}.</span> ${esc(q.questionJa)}</h4>
      <p class="dc-qa__a">${nl2br(q.answerJa)}</p></div>`).join('');
    wrap.innerHTML = `
      <p class="dc-interview__watermark" aria-hidden="true">interview</p>
      <div class="dc-interview__head">
        <p class="dc-interview__head-label">interview</p>
        <h2 class="dc-interview__title">インタビュー記事</h2>
      </div>
      <div class="dc-interview__card-wrapper">
        <a class="dc-interview__card" id="interview-01" href="45th-interview-01.html">
          <div class="dc-interview__band" aria-hidden="true"><span class="dc-interview__band-text">special interview</span></div>
          <div class="dc-interview__thumb">${img(iv.cover, iv.titleZh, 960, 540)}</div>
          <div class="dc-interview__body">
            <div class="dc-interview__meta">
              <img class="dc-interview__logo" src="assets/img/45th/img_hero_logo.png" alt="队长小翼" width="100" height="48">
              <p class="dc-interview__brand">captain tsubasa<br>45th anniversary</p>
            </div>
            <p class="dc-interview__label">special interview</p>
            <h3 class="dc-interview__card-title">${esc(iv.titleZh)}</h3>
            <p class="dc-interview__card-text">${esc(iv.cardSummaryJa || iv.leadJa)}</p>
            <p class="dc-interview__more">read more</p>
          </div>
        </a>
        ${iv.comingSoon ? '<div class="dc-coming"><p class="dc-coming__title">coming soon...</p></div>' : ''}
      </div>`;
  }

  /* ---------- CONGRATULATIONS：两组祝贺卡 ---------- */
  function renderGroup(id, items, prefix) {
    const list = document.getElementById(id);
    if (!list) return;
    list.innerHTML = items.map(it => `
      <article class="dc-celeb">
        <button type="button" class="dc-celeb__btn" data-open="modal-${prefix}-${String(it.no).padStart(2,'0')}">
          <span class="dc-celeb__body">
            <span class="dc-celeb__thumb">${img(it.face, it.nameZh, 288, 240)}</span>
            <span class="dc-celeb__info">
              <span class="dc-celeb__name">${esc(it.nameZh)}</span>
              <span class="dc-celeb__role">${esc(it.roleZh)}</span>
              <span class="dc-celeb__text">${esc(it.commentZh)}</span>
            </span>
          </span>
        </button>
      </article>`).join('');
    const host = document.getElementById('modals');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', items.map((it, idx) => {
      const qa = (it.qa || []).map(q => `<div class="dc-modal__qa"><p class="dc-modal__question">${esc(q.questionJa)}</p><p class="dc-modal__answer">${nl2br(q.answerJa)}</p></div>`).join('');
      const prev = items[(idx - 1 + items.length) % items.length];
      const next = items[(idx + 1) % items.length];
      const id = `modal-${prefix}-${String(it.no).padStart(2,'0')}`;
      return `<div class="dc-modal dc-modal--celeb" id="${id}" data-group="${prefix}" hidden>
        <div class="dc-modal__backdrop" data-close></div>
        <div class="dc-modal__box" role="dialog" aria-modal="true" aria-label="${esc(it.nameZh)}">
          <button type="button" class="dc-modal__close" data-close aria-label="关闭"><span aria-hidden="true">&times;</span></button>
          <div class="dc-modal__person">
            <div class="dc-modal__figure">
              <div class="dc-modal__photo">${img(it.face, it.nameZh, 500, 400)}</div>
              <p class="dc-modal__name">${esc(it.nameZh)}</p>
              <p class="dc-modal__role">${esc(it.roleZh)}</p>
            </div>
            <div class="dc-modal__scroll">
              <div class="dc-modal__comment"><p class="dc-modal__comment-zh">${esc(it.commentZh)}</p><p class="dc-modal__comment-ja">${esc(it.commentJa)}</p></div>
              ${qa}
              ${it.scene ? '<div class="dc-modal__scene">' + img(it.scene, '活动场景', 1000, 781) + '</div>' : ''}
            </div>
          </div>
        </div>
      </div>`;
    }).join(''));
  }

  /* ---------- 弹窗开关 ---------- */
  function setupModals(data) {
    renderExtraModals(data);
    function show(id) {
      document.querySelectorAll('.dc-modal:not([hidden])').forEach(b => { b.hidden = true; });
      const box = document.getElementById(id);
      if (box) { box.hidden = false; document.body.classList.add('dc-locked'); }
    }
    function hideAll() {
      document.querySelectorAll('.dc-modal:not([hidden])').forEach(b => { b.hidden = true; });
      document.body.classList.remove('dc-locked');
    }
    document.addEventListener('click', e => {
      const open = e.target.closest('[data-open]');
      if (open) { show(open.getAttribute('data-open')); return; }
      const goto = e.target.closest('[data-goto]');
      if (goto) { show(goto.getAttribute('data-goto')); return; }
      if (e.target.closest('[data-close]')) hideAll();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideAll();
      const cur = document.querySelector('.dc-modal--celeb:not([hidden])');
      if (cur && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const btn = cur.querySelector(e.key === 'ArrowLeft' ? '.dc-modal__nav--prev' : '.dc-modal__nav--next');
        if (btn) show(btn.getAttribute('data-goto'));
      }
    });
  }

  function renderExtraModals(data) {
    const host = document.getElementById('modals');
    if (!host) return;
    const parts = [];
    (data.featured || []).filter(x => x.modal).forEach(it => {
      parts.push('<div class="dc-modal dc-modal--news" id="modal-' + esc(it.modal) + '" hidden><div class="dc-modal__backdrop" data-close></div>' +
        '<div class="dc-modal__box" role="dialog" aria-modal="true"><button type="button" class="dc-modal__close" data-close aria-label="关闭">×</button>' +
        '<div class="dc-modal__media">' + img(it.modalImage || it.thumb, it.titleZh, 380, 540) + '</div>' +
        '<div class="dc-modal__content">' +
        '<h3>' + esc(it.titleZh) + '</h3><p class="dc-modal__ja">' + esc(it.title) + '</p>' +
        '<div class="dc-modal__scroll">' + (it.detailParagraphs || []).map(p => '<p>' + nl2br(clean(p)) + '</p>').join('') + '</div></div></div></div>');
    });
    (data.news || []).filter(x => (x.detailParagraphs || []).length).forEach(it => {
      parts.push('<div class="dc-modal dc-modal--news" id="modal-' + esc(it.modal) + '" hidden><div class="dc-modal__backdrop" data-close></div>' +
        '<div class="dc-modal__box" role="dialog" aria-modal="true"><button type="button" class="dc-modal__close" data-close aria-label="关闭">×</button>' +
        '<div class="dc-modal__media">' + img(it.modalImage || it.image, it.titleZh, 380, 540) + '</div>' +
        '<div class="dc-modal__content">' +
        '<time class="dc-modal__date">' + esc(it.date.replace(/-/g,'.')) + '</time><h3>' + esc(it.titleZh) + '</h3><p class="dc-modal__ja">' + esc(it.titleJa) + '</p>' +
        '<div class="dc-modal__scroll">' + (it.detailParagraphs || []).map(p => '<p>' + nl2br(clean(p)) + '</p>').join('') +
        (it.siteRefs||[]).filter(x=>x.url).map(x=>'<p class="dc-modal__ref">本站已收录：<a href="' + esc(x.url) + '">' + esc(x.title) + '</a></p>').join('') + '</div></div></div></div>');
    });
    host.insertAdjacentHTML('beforeend', parts.join(''));
  }

  /* ---------- 祝贺轮播 ---------- */
  function setupCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(track => {
      const prev = track.parentElement.querySelector('[data-prev]');
      const next = track.parentElement.querySelector('[data-next]');
      function step() {
        const card = track.querySelector('.dc-celeb');
        const gap = parseFloat(getComputedStyle(track).columnGap || '16') || 16;
        return card ? card.getBoundingClientRect().width + gap : 300;
      }
      if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
      if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
      // 桌面端：鼠标滚轮上下滚动即横向翻卡（触控板/触摸屏原生横向滑动不受影响）
      track.addEventListener('wheel', e => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        const before = track.scrollLeft;
        track.scrollLeft = before + e.deltaY;
        if (track.scrollLeft !== before) e.preventDefault();
      }, { passive: false });
    });
  }
});
