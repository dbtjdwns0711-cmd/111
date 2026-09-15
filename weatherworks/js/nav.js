/**
 * WeatherWorks 공통 네비게이션
 */
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
    { id: 'index.html', label: '기상 판정 기준' }
  ];

  let h = `
    <div class="sidebar-brand">
      <div class="brand-sub">WEATHERWORKS</div>
      <div class="brand-title">WeatherWorks</div>
      <div class="brand-desc">건설공사 비작업일수 · 공사기간 산정</div>
    </div>
    <div class="nav-menu">
  `;

  menu.forEach(m => {
    if (m.section) {
      h += `<div class="nav-group-title">${m.section}</div>`;
    } else {
      const active = (cur === m.id) ? ' active' : '';
      h += `<a class="nav-item${active}" href="${m.id}">${m.label}</a>`;
    }
  });

  h += `
    </div>
    <div class="sidebar-footer">
      예상값이며 실제 작업 여부는 현장 상황 및 공식 기상정보에 따라 달라질 수 있습니다
    </div>
  `;

  sb.innerHTML = h;
}

function renderTopbar(title, opts = {}) {
  const tb = document.getElementById('topbar');
  if (!tb) return;

  let h = `<div class="topbar-title">${title}</div>`;

  if (opts.showProjectSelect) {
    let db = (typeof loadDB === 'function') ? loadDB() : { projects: [] };
    let curId = (typeof getCurrentProjectId === 'function') ? getCurrentProjectId(db) : '';
    h += `<div class="topbar-actions">
      <select id="sel-current-project" class="select" onchange="setCurrentProjectId(this.value); location.reload();">`;
    (db.projects || []).forEach(p => {
      h += `<option value="${p.id}" ${p.id === curId ? 'selected' : ''}>${p.name}</option>`;
    });
    h += `</select></div>`;
  }

  tb.innerHTML = h;
}