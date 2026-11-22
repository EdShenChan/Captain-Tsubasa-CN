
(function(){
  "use strict";
  var D = window.CT2023 || {};
  var TITLES = {info:"作品情报",characters:"角色介绍",episodes:"各话列表",
                music:"音乐·主题歌",video:"影像商品",news:"制作花絮"};
  var PAGE_SIZE = 20;
  var epPage = 1, epQuery = "";

  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function hl(text, q){
    var e = esc(text);
    if(!q) return e;
    try{
      var re = new RegExp("("+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi");
      return e.replace(re, "<mark>$1</mark>");
    }catch(err){ return e; }
  }
  function el(id){ return document.getElementById(id); }
  function yen(n){ return n ? "¥" + n : ""; }

  /* ===== 作品情报 ===== */
  function renderInfo(){
    var kv = "assets/img/anime/2018-season2/captain_tsubasa_season2_kv.jpg";
    var html = '<div class="ct-info-wrap"><div>';
    html += '<h2 class="ct2023-section-title">剧情简介</h2>';
    html += '<div class="ct-info-syn">';
    (D.intro||[]).forEach(function(p){ html += '<p>'+esc(p)+'</p>'; });
    html += '</div>';

    html += '<h3 class="ct-sub">制作 staff</h3><table class="ct-staff"><tbody>';
    (D.staff||[]).forEach(function(s){
      html += '<tr><th>'+esc(s.role)+'</th><td>'+esc(s.name)+'</td></tr>';
    });
    html += '</tbody></table>';

    html += '<h3 class="ct-sub">放送·配信</h3><ul class="ct-bc-list">';
    html += '<li>'+esc(D.onair.premiere)+'</li>';
    html += '<li>再放送：'+esc(D.onair.rerun)+'</li>';
    html += '</ul>';

    (D.onair.streaming||[]).forEach(function(s){
      html += '<h4 class="ct-sub2">'+esc(s.kind)+'<span class="ct-sub2-note">'+esc(s.start)+'</span></h4>';
      html += '<p class="ct-st-note">'+esc(s.note)+'</p>';
      html += '<ul class="ct-svc">';
      s.services.forEach(function(x){ html += '<li>'+esc(x)+'</li>'; });
      html += '</ul>';
    });

    html += '<h3 class="ct-sub">主题歌</h3><ul class="ct-bc-list">';
    (D.music||[]).forEach(function(m){
      html += '<li>'+esc(m.course)+' '+esc(m.kind)+'：'+esc(m.artist)+'「'+esc(m.title)+'」</li>';
    });
    html += '</ul>';
    html += '<p class="ct-src">资料来源：动画《队长小翼 第二季 青少年篇》官方网站（取数归档，站内不作外链）。';
    html += '各话简介官网未提供，故仅列标题；中文译名为整理者意译，非官方译名。</p>';
    html += '</div>';
    html += '<aside class="ct-info-kv"><img src="'+kv+'" alt="2023《队长小翼 第二季 青少年篇》主视觉" loading="lazy">';
    if(D.onair.rerun_img){
      html += '<figure class="ct-rerun"><img src="'+D.onair.rerun_img+'" alt="再放送告知：2026年1月5日起 每周一深夜1:30 东京电视台" loading="lazy"><figcaption>再放送告知（官网图）</figcaption></figure>';
    }
    html += '</aside></div>';
    el("info").innerHTML = html;
  }

  /* ===== 角色介绍 ===== */
  function renderCharacters(){
    var html = '';
    html += '<h2 class="ct2023-section-title">角色介绍</h2>';
    html += '<p class="ct-lead">共 '+ (D.characters||[]).length +' 名。每张卡片的背号、所属球队、声优均照官网角色页；';
    html += '官网角色页未提供「得意技」文字（原站该栏为模板注释残留），故不作补写。</p>';
    html += '<div class="ct-char-grid">';
    (D.characters||[]).forEach(function(c){
      html += '<article class="ct-char-card">';
      html += '  <div class="ct-char-fig">';
      if(c.number) html += '<span class="ct-char-num">'+esc(c.number)+'</span>';
      html += '    <img src="'+c.img+'" alt="'+esc(c.name)+'" loading="lazy">';
      html += '  </div>';
      html += '  <div class="body">';
      html += '    <div class="nm">'+esc(c.name)+'</div>';
      if(c.name_en) html += '    <div class="en">'+esc(c.name_en)+'</div>';
      if(c.team) html += '    <div class="team">'+esc(c.team)+'<span>'+esc(c.team_en||"")+'</span></div>';
      if(c.cv) html += '    <div class="cv">CV '+esc(c.cv)+'</div>';
      if(c.profile) html += '    <p class="pf">'+esc(c.profile)+'</p>';
      html += '  </div>';
      html += '</article>';
    });
    html += '</div>';
    el("characters").innerHTML = html;
  }

  /* ===== 各话列表 ===== */
  function filteredEps(){
    var q = epQuery.trim().toLowerCase();
    var list = D.episodes||[];
    if(!q) return list;
    return list.filter(function(e){
      return String(e.num).indexOf(q) >= 0 ||
        (e.title||"").toLowerCase().indexOf(q) >= 0 ||
        (e.title_cn||"").toLowerCase().indexOf(q) >= 0;
    });
  }
  function renderEpisodes(){
    var html = '';
    html += '<h2 class="ct2023-section-title">各话列表</h2>';
    html += '<p class="ct-lead">全 '+(D.episodes||[]).length+' 话。日文标题照官网；中文译名为整理者意译（非官方）。';
    html += '官网各话页只提供剧照、没有文字简介，故不编写剧情概述。</p>';
    html += '<div class="ct-ep-toolbar"><input id="ctEpSearch" type="search" placeholder="搜索话数 / 日文标题 / 中文译名" value="'+esc(epQuery)+'"></div>';
    html += '<ul class="ct-ep-list" id="ctEpList"></ul>';
    html += '<div class="ct-pager" id="ctEpPager"></div>';
    el("episodes").innerHTML = html;

    var inp = el("ctEpSearch");
    if(inp){
      inp.addEventListener("input", function(){
        epQuery = inp.value; epPage = 1; renderEpRows();
      });
    }
    renderEpRows();
  }
  function renderEpRows(){
    var list = filteredEps();
    var total = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if(epPage > total) epPage = total;
    var start = (epPage-1)*PAGE_SIZE;
    var page = list.slice(start, start+PAGE_SIZE);
    var html = '';
    if(!page.length){
      html = '<li class="ct-ep-empty">没有匹配的话数。</li>';
    }
    page.forEach(function(e){
      html += '<li class="ct-ep-item">';
      html += '  <div class="ct-ep-no">'+ (e.num<10?"0"+e.num:e.num) +'<small>第'+e.num+'話</small></div>';
      if(e.thumb){
        html += '<div class="ct-ep-thumb"><img src="'+e.thumb+'" alt="第'+e.num+'話 剧照" loading="lazy">'
              + (e.still_count>1 ? '<span class="ct-ep-cnt">剧照 '+e.still_count+' 张</span>' : '') + '</div>';
      }
      html += '  <div class="ct-ep-body">';
      html += '    <div class="ct-ep-jp">'+hl(e.title, epQuery)+'</div>';
      if(e.title_cn) html += '    <div class="ct-ep-cn">'+hl(e.title_cn, epQuery)+'</div>';
      html += '  </div>';
      html += '</li>';
    });
    var listEl = el("ctEpList");
    if(listEl) listEl.innerHTML = html;
    renderEpPager(total, list.length);
  }
  function renderEpPager(total, count){
    var p = el("ctEpPager");
    if(!p) return;
    var h = '';
    h += '<button data-p="prev"'+(epPage<=1?' disabled':'')+'>上一页</button>';
    for(var i=1;i<=total;i++){
      h += '<button data-p="'+i+'"'+(i===epPage?' class="cur" aria-current="true"':'')+'>'+i+'</button>';
    }
    h += '<button data-p="next"'+(epPage>=total?' disabled':'')+'>下一页</button>';
    h += '<span class="ct-pager-info">共 '+count+' 话 / '+total+' 页</span>';
    p.innerHTML = h;
    p.querySelectorAll("button[data-p]").forEach(function(b){
      b.addEventListener("click", function(){
        var v = b.getAttribute("data-p");
        if(v==="prev") epPage = Math.max(1, epPage-1);
        else if(v==="next") epPage = Math.min(total, epPage+1);
        else epPage = parseInt(v,10);
        renderEpRows();
        var top = el("episodes").getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo(0, top);
      });
    });
  }

  /* ===== 音乐 ===== */
  function renderMusic(){
    var html = '<h2 class="ct2023-section-title">音乐·主题歌</h2>';
    html += '<p class="ct-lead">按季度分列。第2、3 季度的片头曲官网未标注词曲编曲，故留空。</p>';
    html += '<div class="ct-music-grid">';
    (D.music||[]).forEach(function(m){
      html += '<article class="ct-music-card">';
      if(m.img){
        html += '<div class="ct-music-fig"><img src="'+m.img+'" alt="'+esc(m.title)+'" loading="lazy"></div>';
      }else{
        // 官网该曲目没有提供封面图：保留同高的占位块，避免卡片高度参差
        html += '<div class="ct-music-fig ct-music-noimg"><span>官网未提供封面</span></div>';
      }
      html += '  <div class="ct-music-body">';
      html += '    <span class="kind">'+esc(m.course)+' '+esc(m.kind)+'</span>';
      html += '    <div class="ttl">「'+esc(m.title)+'」</div>';
      html += '    <div class="ar">'+esc(m.artist)+'</div>';
      if(m.credits && m.credits.length){
        html += '    <ul class="ct-music-credit">';
        m.credits.forEach(function(c){ html += '<li>'+esc(c)+'</li>'; });
        html += '    </ul>';
      }else{
        html += '    <p class="ct-music-no">官网未标注词曲编曲</p>';
      }
      html += '  </div>';
      html += '</article>';
    });
    html += '</div>';
    el("music").innerHTML = html;
  }

  /* ===== 影像商品 ===== */
  function renderVideo(){
    var html = '<h2 class="ct2023-section-title">影像商品（Blu-ray / DVD）</h2>';
    html += '<p class="ct-lead">全 3 卷，每卷收录 1 个季度（13 话）。仅列官方规格，站内不提供购买入口。</p>';
    html += '<div class="ct-bd-grid">';
    (D.bd||[]).forEach(function(b){
      html += '<article class="ct-bd-card">';
      if(b.img) html += '<div class="ct-bd-fig"><img src="'+b.img+'" alt="Blu-ray BOX '+esc(b.vol)+'" loading="lazy"></div>';
      html += '  <div class="ct-bd-body">';
      html += '    <div class="ct-bd-vol">'+esc(b.vol)+'<span>'+esc(b.eps)+'</span></div>';
      html += '    <div class="ct-bd-date">'+esc(b.date)+' 发售</div>';
      html += '    <table class="ct-bd-spec"><tbody>';
      html += '      <tr><th>Blu-ray BOX<br>（完全生产限定版）</th><td>'+esc(yen(b.bd_price))+'（含税）<br><small>品番 '+esc(b.bd_code)+'</small></td></tr>';
      html += '      <tr><th>DVD BOX<br>（通常版）</th><td>'+esc(yen(b.dvd_price))+'（含税）<br><small>品番 '+esc(b.dvd_code)+'</small></td></tr>';
      html += '      <tr><th>收录</th><td>'+esc(b.range)+'（'+esc(b.eps)+'）<br><small>'+esc(b.discs)+'</small></td></tr>';
      html += '    </tbody></table>';
      html += '  </div>';
      html += '</article>';
    });
    html += '</div>';
    el("video").innerHTML = html;
  }

  /* ===== 制作花絮（新闻） ===== */
  function renderNews(){
    var html = '<h2 class="ct2023-section-title">制作花絮</h2>';
    html += '<p class="ct-lead">官网新闻标题（按发布时间倒序），仅作动态索引，站内不跳转外站。</p>';
    html += '<ul class="ct-news-list">';
    (D.news||[]).forEach(function(n){
      html += '<li><span class="d">'+esc(n.date)+'</span><span class="t">'+esc(n.title)+'</span></li>';
    });
    html += '</ul>';
    el("news").innerHTML = html;
  }

  /* ===== 版面切换 ===== */
  function showPanel(id){
    if(!TITLES[id]) id = "info";
    document.querySelectorAll(".ct2023-panel").forEach(function(s){
      s.hidden = (s.id !== id);
    });
    document.querySelectorAll("#ct2023Tabs a").forEach(function(a){
      if(a.dataset.panel === id) a.setAttribute("aria-current","page");
      else a.removeAttribute("aria-current");
    });
    document.title = TITLES[id] + "｜电视动画《队长小翼 第二季 青少年篇》专页";
  }

  document.addEventListener("DOMContentLoaded", function(){
    renderInfo(); renderCharacters(); renderEpisodes();
    renderMusic(); renderVideo(); renderNews();
    var init = (location.hash||"").replace("#","");
    showPanel(TITLES[init] ? init : "info");
    document.querySelectorAll("#ct2023Tabs a").forEach(function(a){
      a.addEventListener("click", function(ev){
        ev.preventDefault();
        var id = a.dataset.panel;
        history.replaceState(null, "", "#"+id);
        showPanel(id);
      });
    });
    window.addEventListener("hashchange", function(){
      var id = (location.hash||"").replace("#","");
      showPanel(TITLES[id] ? id : "info");
    });
  });
})();
