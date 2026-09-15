// 공통 네비게이션 렌더러
function renderSidebar() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  const cur = location.pathname.split('/').pop() || 'index.html';

  const menu = [
    { section: '현장' },
    { id: 'admin.html', label: '현장 관리' },
    { id: 'quantity.html', label: '공사 물량·생산성 산정' },
    { id: 'stations.html', label: '구간별 관측지점' },

    { section: '공사기간 산정' },
    { id: 'duration.html', label: '총괄·결과·Timeline' },
    { id: 'duration-workdays.html', label: '작업일수 산정' },
    { id: 'duration-weather.html', label: '비작업일수 산정·예측정확도' },

    { section: '데이터·공정' },
    { id: 'quality.html', label: '기상데이터 품질관리' },
    { id: 'schedule.html', label: '공정표 Import' },
    { id: 'data.html', label: '데이터 관리' },
    { id: 'index.html', label: '공종·기준·표준작업량' }
  ];

  let h = `
    <div class="brand">
      <div class="logo">WEATHERWORKS</div>
      <h1>WeatherWorks</h1>
      <p>건설공사 비작업일수 · 공사기간 산정</p>
    </div>
    <div class="nav">
  `;

  let inGroup = false;

  for (const m of menu) {
    if (m.section) {
      if (inGroup) {
        h += `</div>`;
      }
      if (m.section === '현장') {
        h += `<div class="nav-group-plain">`;
      } else {
        h += `<div class="nav-group"><div class="nav-group-title">${m.section}</div>`;
      }
      inGroup = true;
    } else {
      const active = (cur === m.id) ? ' active' : '';
      h += `<a href="${m.id}" class="nav-link${active}">${m.label}</a>`;
    }
  }

  if (inGroup) {
    h += `</div>`;
  }

  h += `
    </div>
    <div style="margin-top:auto; padding:16px 20px; font-size:11px; color:#8896A6; border-top:1px solid rgba(255,255,255,0.06); line-height:1.5;">
      예상값이며 실제 작업 여부는 현장 상황 및 공식 기상정보에 따라 달라질 수 있습니다.
    </div>
  `;

  sb.innerHTML = h;
}

function renderTopbar(title, opts = {}) {
  const tb = document.getElementById('topbar');
  if (!tb) return;

  let h = `<div class="title">${title}</div>`;

  if (opts.showProjectSelect) {
    const db = (typeof loadDB === 'function') ? loadDB() : { projects: [] };
    const curId = (typeof getCurrentProjectId === 'function') ? getCurrentProjectId(db) : '';
    h += `<div class="row gap-8" style="align-items:center;">
      <span class="muted" style="font-size:12px;">현장:</span>
      <select id="sel-current-project" onchange="setCurrentProjectId(this.value); location.reload();">`;
    for (const p of (db.projects || [])) {
      const sel = p.id === curId ? 'selected' : '';
      h += `<option value="${p.id}" ${sel}>${p.name}</option>`;
    }
    h += `</select></div>`;
  }

  tb.innerHTML = h;
}