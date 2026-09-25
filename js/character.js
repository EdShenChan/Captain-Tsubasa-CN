/* 角色页交互逻辑 */
(function () {
  'use strict';

  var data = window.CHARA_DATA;
  // 角色立绘按「所属漫画作品」分目录存放（见 图片素材出处对照表.md）
  var SERIES_IMG_PATH = {
    1: 'assets/img/manga/captain-tsubasa/',
    2: 'assets/img/manga/world-youth/',
    3: 'assets/img/manga/road-to-2002/',
    4: 'assets/img/manga/golden-23/',
    5: 'assets/img/manga/in-calcio/',
    6: 'assets/img/manga/en-la-liga/',
    7: 'assets/img/manga/rising-sun/'
  };

  var tabsEl = document.getElementById('seriesTabs');
  var headEl = document.getElementById('seriesHead');
  var headTitle = document.querySelector('.series-head-title');
  var headDesc = document.querySelector('.series-head-desc');
  var stageTabsEl = document.getElementById('stageTabs');
  var gridEl = document.getElementById('charaGrid');
  var modal = document.getElementById('charaModal');
  var modalInner = document.getElementById('modalInner');

  var currentSeries = data.series[0].id;
  var currentStage = -1; // -1 表示「全部」

  // 渲染系列切换标签（含官网 LOGO + 页签名）
  function renderTabs() {
    tabsEl.innerHTML = '';
    data.series.forEach(function (s) {
      var btn = document.createElement('button');
      btn.className = 'tab' + (s.id === currentSeries ? ' tab--active' : '');
      btn.innerHTML =
        '<span class="tab-logo"><img src="' + s.logo + '" alt="' + s.full + '" loading="lazy"></span>' +
        '<span class="tab-name">' + s.name + '</span>';
      btn.addEventListener('click', function () {
        currentSeries = s.id;
        currentStage = -1;
        renderTabs();
        renderStageTabs();
        renderGrid();
        document.querySelector('.chara-section').scrollIntoView({ behavior: 'smooth' });
      });
      tabsEl.appendChild(btn);
    });
  }

  // 渲染子阶段标签（仅当系列有 stages 时显示）
  function renderStageTabs() {
    var series = data.series.find(function (s) { return s.id === currentSeries; });
    stageTabsEl.innerHTML = '';

    if (!series.stages || series.stages.length === 0) {
      stageTabsEl.style.display = 'none';
      return;
    }

    stageTabsEl.style.display = 'flex';

    // 「全部」按钮
    var allBtn = document.createElement('button');
    allBtn.className = 'stage-tab' + (currentStage === -1 ? ' stage-tab--active' : '');
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', function () {
      currentStage = -1;
      renderStageTabs();
      renderGrid();
    });
    stageTabsEl.appendChild(allBtn);

    series.stages.forEach(function (name, idx) {
      var btn = document.createElement('button');
      btn.className = 'stage-tab' + (currentStage === idx ? ' stage-tab--active' : '');
      btn.textContent = name;
      btn.addEventListener('click', function () {
        currentStage = idx;
        renderStageTabs();
        renderGrid();
      });
      stageTabsEl.appendChild(btn);
    });
  }

  // 角色图片路径（优先使用 img 字段，兼容旧 code 映射）
  function imgSrc(c) {
    var base = SERIES_IMG_PATH[c.series] || SERIES_IMG_PATH[1];
    if (c.img) return base + c.img;
    return base + 'chara_' + c.code + '.webp';
  }

  // 渲染角色网格
  function renderGrid() {
    var series = data.series.find(function (s) { return s.id === currentSeries; });
    headTitle.textContent = series.full || series.name;
    headDesc.textContent = series.desc;

    var chars = data.characters.filter(function (c) {
      if (c.series !== currentSeries) return false;
      if (currentStage !== -1 && c.stage !== currentStage) return false;
      return true;
    });

    gridEl.innerHTML = '';
    chars.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'chara-card';
      card.innerHTML =
        '<div class="chara-card-img">' +
          '<img src="' + imgSrc(c) + '" alt="' + c.name + '" loading="lazy">' +
        '</div>' +
        '<div class="chara-card-info">' +
          '<p class="chara-card-en">' + c.en + '</p>' +
          '<h3 class="chara-card-name">' + c.name + '</h3>' +
          '<p class="chara-card-nick">' + (c.nick !== '-' ? c.nick : '') + '</p>' +
        '</div>' +
        '<div class="chara-card-btn">详情</div>';
      card.addEventListener('click', function () { openModal(c); });
      gridEl.appendChild(card);
    });
  }

  // 打开详情弹窗
  function openModal(c) {
    var series = data.series.find(function (s) { return s.id === c.series; });
    var stageName = '';
    if (series.stages && c.stage !== undefined && c.stage >= 0) {
      stageName = series.stages[c.stage];
    }

    var info = [
      { k: '系列', v: series ? (series.full || series.name) : '' },
      { k: '时期', v: stageName },
      { k: '昵称', v: c.nick },
      { k: '位置', v: c.pos },
      { k: '背号', v: c.number },
      { k: '所属', v: c.team },
      { k: '必杀技', v: c.skills }
    ];
    var rows = info.map(function (it) {
      if (!it.v || it.v === '-') return '';
      return '<div class="modal-row"><span class="modal-k">' + it.k + '</span><span class="modal-v">' + it.v + '</span></div>';
    }).join('');

    modalInner.innerHTML =
      '<div class="modal-left">' +
        '<div class="modal-img"><img src="' + imgSrc(c) + '" alt="' + c.name + '"></div>' +
      '</div>' +
      '<div class="modal-right">' +
        '<p class="modal-en">' + c.en + '</p>' +
        '<h2 class="modal-name">' + c.name + '</h2>' +
        rows +
        '<p class="modal-desc">' + c.desc + '</p>' +
        (c.profile ? '<div class="modal-profile"><span class="modal-profile-k">官网介绍</span>' +
                     '<p class="modal-profile-t">' + c.profile + '</p></div>' : '') +
      '</div>';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // 关闭弹窗
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  renderTabs();
  renderStageTabs();
  renderGrid();
})();
