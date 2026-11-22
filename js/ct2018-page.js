
(function(){
  "use strict";
  var D = window.CT2018 || {};
  var TITLES = {info:"作品情报",characters:"角色介绍",episodes:"各话列表",music:"音乐·主题歌",news:"制作花絮"};

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
    }catch(e){ return e; }
  }
  function el(id){ return document.getElementById(id); }

  /* ===== 作品情报 ===== */
  function renderInfo(){
    var s = D.staff||{}, m = D.music||{}, kv = "assets/img/anime/2018/captain_tsubasa_2018_kv.jpg";
    var html = '';
    html += '<div class="ct-info-wrap">';
    html += '  <div>';
    html += '    <h2 class="ct2018-section-title">剧情简介</h2>';
    html += '    <div class="ct-info-syn">';
    String(D.synopsis||"").split(/\n+/).forEach(function(p){
      if(p) html += '<p>'+esc(p)+'</p>';
    });
    html += '    </div>';
    html += '    <h3 class="ct-sub">制作 staff</h3>';
    html += '    <table class="ct-staff"><tbody>';
    var staffRows = [
      ["原作", s["原作"]], ["监督", s["監督"]], ["系列导演", s["シリーズディレクター"]],
      ["系列构成", s["シリーズ構成"]], ["角色设计·总作画监督", s["キャラクターデザイン・総作画監督"]],
      ["音乐", s["音楽"]], ["音响监督", s["音響監督"]], ["动画制作", s["アニメーション制作"]]
    ];
    staffRows.forEach(function(r){
      if(r[1]) html += '<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>';
    });
    html += '    </tbody></table>';
    html += '    <h3 class="ct-sub">主题歌</h3>';
    html += musicBrief(m);
    html += '  </div>';
    html += '  <aside class="ct-info-kv"><img src="'+kv+'" alt="2018《队长小翼》主视觉（中学生篇）" loading="lazy"></aside>';
    html += '</div>';
    html += '<h3 class="ct-sub">播出信息（部分）</h3>';
    html += '<ul class="ct-bc-list">';
    (D.broadcast||[]).forEach(function(b){ html += '<li>'+esc(b)+'</li>'; });
    html += '</ul>';
    html += '<p style="margin-top:18px;font-size:12px;color:#999">资料来源：东京电视台动画官网（粉丝整理，非官方）。各话简介为官网原文日文，中文译名依标题意译。</p>';
    el("info").innerHTML = html;
  }
  function musicBrief(m){
    var html = '<ul class="ct-bc-list">';
    (m.op||[]).concat(m.ed||[]).forEach(function(x){
      var who = x.artist ? esc(x.artist) : "";
      var t = x.title ? esc(x.title) : esc(x.raw||"");
      var arc = x.arc ? "（"+esc(x.arc)+"）" : "";
      html += '<li>'+who+'「'+t+'」'+arc+'</li>';
    });
    html += '</ul>';
    return html;
  }

  /* ===== 角色介绍 ===== */
  function renderCharacters(){
    var groups = [["elementary","小学生篇"],["middle","中学生篇"]];
    var html = '';
    groups.forEach(function(g){
      var list = D.characters[g[0]]||[];
      if(!list.length) return;
      html += '<div class="ct-char-group"><h2 class="ct2018-section-title">'+esc(g[1])+'（'+list.length+' 名）</h2>';
      html += '<div class="ct-char-grid">';
      list.forEach(function(c){
        html += '<div class="ct-char-card">';
        html += '  <img src="'+esc(c.img)+'" alt="'+esc(c.name)+'" loading="lazy">';
        html += '  <div class="body"><div class="nm">'+esc(c.name)+'</div>';
        html += '  <div class="cv">CV：'+esc(c.cv)+'</div>';
        html += '  <div class="pf">'+esc(c.profile)+'</div></div>';
        html += '</div>';
      });
      html += '</div></div>';
    });
    el("characters").innerHTML = html;
  }

  /* ===== 各话列表 ===== */
  var epState = {page:1, q:"", size:20};
  function renderEpisodes(){
    var all = D.episodes||[];
    var q = epState.q.trim();
    var ql = q.toLowerCase();
    var filtered = all.filter(function(e){
      if(!ql) return true;
      return (e.title+" "+e.title_cn+" "+(e.num)).toLowerCase().indexOf(ql)>=0
          || String(e.num)===ql;
    });
    var pages = Math.max(1, Math.ceil(filtered.length/epState.size));
    if(epState.page>pages) epState.page=pages;
    var start = (epState.page-1)*epState.size;
    var slice = filtered.slice(start, start+epState.size);
    var html = '';
    html += '<h2 class="ct2018-section-title">全 '+all.length+' 话 · 显示 '+filtered.length+' 话</h2>';
    html += '<div class="ct-ep-toolbar"><input id="ctEpSearch" type="search" placeholder="搜索话数 / 日文标题 / 中文译名" value="'+esc(q)+'"></div>';
    html += '<ul class="ct-ep-list">';
    slice.forEach(function(e){
      html += '<li class="ct-ep-item">';
      html += '  <div class="ct-ep-no">'+e.num+'<small>话</small></div>';
      html += '  <div><div class="ct-ep-jp">「'+hl(e.title,q)+'」</div>';
      html += '  <div class="ct-ep-cn">'+hl(e.title_cn,q)+'</div>';
      html += '  <div class="ct-ep-meta">'+esc(e.date)+'</div>';
      html += '  <div class="ct-ep-syn">'+hl(e.synopsis,q)+'</div></div>';
      html += '</li>';
    });
    html += '</ul>';
    html += '<div class="ct-pager" id="ctEpPager"></div>';
    el("episodes").innerHTML = html;
    bindEpSearch();
    renderEpPager(pages);
  }
  function renderEpPager(pages){
    var p = el("ctEpPager"); if(!p) return;
    var h = '';
    h += '<button data-p="prev"'+(epState.page<=1?' disabled':'')+'>上一页</button>';
    for(var i=1;i<=pages;i++){
      h += '<button data-p="'+i+'"'+(i===epState.page?' class="cur" aria-current="true"':'')+'>'+i+'</button>';
    }
    h += '<button data-p="next"'+(epState.page>=pages?' disabled':'')+'>下一页</button>';
    p.innerHTML = h;
    p.querySelectorAll("button[data-p]").forEach(function(b){
      b.addEventListener("click", function(){
        var v = b.getAttribute("data-p");
        if(v==="prev") epState.page=Math.max(1,epState.page-1);
        else if(v==="next") epState.page=Math.min(pages,epState.page+1);
        else epState.page=parseInt(v,10);
        renderEpisodes();
        el("episodes").scrollIntoView();
      });
    });
  }
  function bindEpSearch(){
    var inp = el("ctEpSearch"); if(!inp) return;
    inp.addEventListener("input", function(){
      epState.q = inp.value; epState.page = 1; renderEpisodes();
    });
  }

  /* ===== 音乐·主题歌 ===== */
  function renderMusic(){
    var m = D.music||{};
    var html = '<h2 class="ct2018-section-title">主题歌</h2><div class="ct-music-grid">';
    (m.op||[]).forEach(function(x){ html += musicCard("片头曲 OP", x); });
    (m.ed||[]).forEach(function(x){ html += musicCard("片尾曲 ED", x); });
    html += '</div>';
    el("music").innerHTML = html;
  }
  function musicCard(kind, x){
    var who = x.artist ? esc(x.artist) : "";
    var t = x.title ? esc(x.title) : esc(x.raw||"");
    var arc = x.arc ? esc(x.arc) : "";
    return '<div class="ct-music-card"><span class="kind">'+kind+'</span>'
      +'<div class="arc">'+arc+'</div><div class="ttl">「'+t+'」</div>'
      +'<div class="ar">'+who+'</div></div>';
  }

  /* ===== 制作花絮（新闻） ===== */
  function renderNews(){
    var n = D.news||[];
    var html = '<h2 class="ct2018-section-title">官网新闻摘录</h2><ul class="ct-news-list">';
    if(n.length){
      n.forEach(function(x){ html += '<li><span class="d">'+esc(x.date)+'</span><span>'+esc(x.title)+'</span></li>'; });
    }else{
      html += '<li><span>暂无摘录。</span></li>';
    }
    html += '</ul><p style="margin-top:16px;font-size:12px;color:#999">更多资讯见东京电视台动画官网与「动画作品」总览页。</p>';
    el("news").innerHTML = html;
  }

  /* ===== 标签切换 ===== */
  function showPanel(id){
    if(!el(id)) id="info";
    document.querySelectorAll(".ct2018-panel").forEach(function(s){ s.hidden = (s.id!==id); });
    document.querySelectorAll("#ct2018Tabs a").forEach(function(a){
      if(a.dataset.panel===id) a.setAttribute("aria-current","page");
      else a.removeAttribute("aria-current");
    });
    var base = "2018《队长小翼》";
    document.title = base + " · " + (TITLES[id]||"") + " · 队长小翼 WORLD";
  }
  function initTabs(){
    var hash = (location.hash||"").replace("#","");
    if(!el(hash)) hash = "info";
    showPanel(hash);
    window.addEventListener("hashchange", function(){
      var h = (location.hash||"").replace("#","");
      showPanel(el(h)?h:"info");
    });
    document.querySelectorAll("#ct2018Tabs a").forEach(function(a){
      a.addEventListener("click", function(){ showPanel(a.dataset.panel); });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    renderInfo(); renderCharacters(); renderEpisodes(); renderMusic(); renderNews();
    initTabs();
  });
})();
