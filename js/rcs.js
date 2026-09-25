/* 《队长小翼：新秀崛起》角色页交互逻辑（排版参照登场角色页） */
(function () {
  'use strict';

  var data = window.RCS_DATA;
  if (!data) return;

  /* 游戏原创角标（依据《游戏原创角色判定_新秀崛起_世界群星.md》）
     orig  = 有据可查的游戏原创（塞内加尔Jr.、美国Jr.为 game-exclusive 队；
             鲁斯亚诺、凯吉诺维基明写 game-original；卡迪纳尔为游戏原创 NPC）
     角标顺序：原创 / 疑似原创 → DLC → 自译待校                                  */
  var RCS_ORIG = {
    '伊士麦・桑戈尔': 'orig',
    '穆萨・马里克・贾罗': 'orig',
    '布雷克・马丁': 'orig',
    '谢尔克・艾斯文': 'orig',
    '列奥那多・鲁斯亚诺': 'orig',
    '凯吉诺': 'orig',
    '乔治·卡迪纳尔': 'orig'
  };

  var tabsEl = document.getElementById('rcsTabs');
  var teamTabsEl = document.getElementById('teamTabs');
  var teamHeadEl = document.getElementById('teamHead');
  var gridEl = document.getElementById('charaGrid');
  var modal = document.getElementById('charaModal');
  var modalInner = document.getElementById('modalInner');

  var curTab = 0;
  var curTeam = 0;

  function curTabData() { return data.tabs[curTab]; }
  function curTeamData() { return curTabData().teams[curTeam]; }

  // 一级标签（中学生篇 / 世界青少年篇 / 非球员角色）
  function renderTabs() {
    tabsEl.innerHTML = '';
    data.tabs.forEach(function (t, i) {
      var btn = document.createElement('button');
      btn.className = 'tab' + (i === curTab ? ' tab--active' : '');
      btn.innerHTML = '<span class="tab-name">' + t.name + '</span>';
      btn.addEventListener('click', function () {
        curTab = i; curTeam = 0;
        renderTabs(); renderTeamTabs(); renderGrid();
        document.querySelector('.chara-section').scrollIntoView({ behavior: 'smooth' });
      });
      tabsEl.appendChild(btn);
    });
  }

  // 二级标签（球队 / 代表队）
  function renderTeamTabs() {
    teamTabsEl.innerHTML = '';
    curTabData().teams.forEach(function (tm, i) {
      var btn = document.createElement('button');
      btn.className = 'team-tab' + (i === curTeam ? ' team-tab--active' : '');
      btn.innerHTML = (tm.icon ? '<img src="' + tm.icon + '" alt="' + tm.name + '" loading="lazy">' : '')
        + '<span>' + tm.name + '</span>';
      btn.addEventListener('click', function () {
        curTeam = i;
        renderTeamTabs(); renderGrid();
      });
      teamTabsEl.appendChild(btn);
    });
  }

  // 队伍说明：LOGO 在左，右侧为队名 + 日文名 + 简介
  function renderTeamHead() {
    var tm = curTeamData();
    var html = '<div class="team-head-top">';
    if (tm.icon) html += '<img class="team-head-logo" src="' + tm.icon + '" alt="' + tm.name + '" loading="lazy">';
    html += '<div class="team-head-text">';
    html += '<h2 class="team-head-title">' + tm.name + '</h2>';
    if (tm.ja) html += '<p class="team-head-ja">' + tm.ja + '</p>';
    if (tm.intro) html += '<p class="team-head-desc">' + tm.intro + '</p>';
    html += '</div></div>';
    if (tm.self) html += '<span class="self-note">该队伍官方中文站未收录，队名与简介依日文原文自译（待校）</span>';
    teamHeadEl.innerHTML = html;
  }

  // 角色网格
  function renderGrid() {
    renderTeamHead();
    var tm = curTeamData();
    gridEl.innerHTML = '';
    tm.chars.forEach(function (c) {
      var posStyle = c.oy ? ' style="object-position:50% ' + c.oy + '%"' : '';
      var badges = '';
      var ot = RCS_ORIG[c.name];
      if (ot === 'orig')       badges += '<div class="chara-card-orig">原创</div>';
      else if (ot === 'maybe') badges += '<div class="chara-card-maybe">疑似原创</div>';
      if (c.dlc)  badges += '<div class="chara-card-dlc">DLC</div>';
      if (c.self) badges += '<div class="chara-card-self">自译待校</div>';
      if (badges) badges = '<div class="chara-card-badges">' + badges + '</div>';
      var card = document.createElement('div');
      card.className = 'chara-card';
      card.innerHTML =
        '<div class="chara-card-img">' +
          (c.img ? '<img src="' + c.img + '" alt="' + c.name + '" loading="lazy"' + posStyle + '>' : '') +
        '</div>' +
        '<div class="chara-card-info">' +
          '<p class="chara-card-ja">' + (c.ja || '') + '</p>' +
          '<h3 class="chara-card-name">' + c.name + '</h3>' +
        '</div>' +
        '<div class="chara-card-btn">详情</div>' +
        badges;
      card.addEventListener('click', function () { openModal(c, tm); });
      gridEl.appendChild(card);
    });
  }

  // 详情弹窗
  function openModal(c, tm) {
    var notes = [];
    if (c.dlc) notes.push('DLC 追加角色。');
    if (c.self) notes.push('官方中文站未收录，上方简介依日文原文自译，译名与措辞待校对。');
    var noteHtml = notes.length ? '<div class="modal-note">' + notes.join('') + '</div>' : '';
    modalInner.innerHTML =
      '<div class="modal-left">' +
        '<div class="modal-img">' + (c.img ? '<img src="' + c.img + '" alt="' + c.name + '"' + (c.oy ? ' style="object-position:50% ' + c.oy + '%"' : '') + '>' : '') + '</div>' +
      '</div>' +
      '<div class="modal-right">' +
        '<p class="modal-en">' + (c.ja || '') + '</p>' +
        '<h2 class="modal-name">' + c.name + '</h2>' +
        '<p class="modal-ja">所属：' + tm.name + (tm.ja ? '／' + tm.ja : '') + '</p>' +
        '<p class="modal-desc">' + c.intro + '</p>' +
        noteHtml +
      '</div>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

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
  renderTeamTabs();
  renderGrid();
})();
