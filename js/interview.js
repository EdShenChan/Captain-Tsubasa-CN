/* 《队长小翼》汉化版知识库 · 高桥阳一访谈渲染脚本
 * 合并前编/后编为一篇完整访谈，每个提问旁展示高桥阳一头像
 */
(function () {
  'use strict';

  if (typeof INTERVIEW_DATA === 'undefined') return;

  const escapeHtml = function (s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const list = document.getElementById('qaList');
  if (!list) return;

  const authorPhoto = INTERVIEW_DATA.part1.authorPhoto;

  // 合并前编 + 后编的 Q&A 与插图
  const allQA = INTERVIEW_DATA.part1.qa.concat(INTERVIEW_DATA.part2.qa);
  const allImages = (INTERVIEW_DATA.part1.images || []).concat(INTERVIEW_DATA.part2.images || []);

  let imgIdx = 0;
  let qaCount = 0;

  allQA.forEach(function (qa) {
    // 小节副标题（参考达芬奇 WEB 采访页 .iv-section h2）
    if (qa.sectionTitle) {
      const h2 = document.createElement('h2');
      h2.className = 'qa-section-title';
      h2.setAttribute('data-reveal', '');
      h2.textContent = qa.sectionTitleZh || qa.sectionTitle;
      list.appendChild(h2);
      return;
    }

    const item = document.createElement('div');
    item.className = 'qa-item';
    item.setAttribute('data-reveal', '');

    item.innerHTML =
      '<p class="qa-q">' + escapeHtml(qa.q) + '</p>' +
      '<div class="qa-a">' +
        '<img class="qa-avatar" src="' + authorPhoto + '" alt="高桥阳一" loading="lazy">' +
        '<div class="qa-a-text">' + escapeHtml(qa.a) + '</div>' +
      '</div>';

    // 先追加卡片，再追加插图（插图作为 qa-list 的独立子元素，位于卡片之外）
    list.appendChild(item);

    // 每 2 组 Q&A 后插入一张插图（按顺序，共 9 张），独立于卡片之外
    if (imgIdx < allImages.length && qaCount % 2 === 1) {
      const img = allImages[imgIdx++];
      const fig = document.createElement('figure');
      fig.className = 'qa-image';
      fig.setAttribute('data-reveal', '');
      fig.innerHTML = '<img src="' + img.src + '" alt="' + escapeHtml(img.caption) + '" loading="lazy"><figcaption>' + escapeHtml(img.caption) + '</figcaption>';
      list.appendChild(fig);
    }
    qaCount++;
  });

  // 若还有未插入的插图，追加到末尾
  while (imgIdx < allImages.length) {
    const img = allImages[imgIdx++];
    const fig = document.createElement('figure');
    fig.className = 'qa-image';
    fig.innerHTML = '<img src="' + img.src + '" alt="' + escapeHtml(img.caption) + '" loading="lazy"><figcaption>' + escapeHtml(img.caption) + '</figcaption>';
    list.appendChild(fig);
  }
})();
