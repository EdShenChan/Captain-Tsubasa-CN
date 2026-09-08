document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('featuredGrid');

  fetch('assets/data/45th-zh.json')
    .then(r => r.json())
    .then(data => {
      // Featured 企划卡片
      if (featuredGrid) {
        featuredGrid.innerHTML = data.featured.map(item => `
          <article class="featured-card">
            <img class="featured-card__thumb" src="${item.thumbLocal}" alt="${item.titleZh}" loading="lazy">
            <div class="featured-card__body">
              <h3 class="featured-card__title">${item.titleZh}</h3>
              ${item.descJa ? `<p class="featured-card__desc">${clean(item.descJa).slice(0, 110)}…</p>` : ''}
            </div>
          </article>
        `).join('');
      }
    })
    .catch(err => {
      console.error('45th data load failed:', err);
      if (featuredGrid) featuredGrid.innerHTML = '<p class="text-center">企划数据加载失败</p>';
    });

  function clean(str) {
    return String(str)
      .replace(/モーダルを閉じる/g, '')
      .replace(/詳細を見る/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
});
