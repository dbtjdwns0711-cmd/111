/**
 * WeatherWorks 공통 네비게이션
 */
function renderSidebar() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;

  const cur = location.pathname.split('/').pop() || 'index.html';

  const menu = [
    { section: '현장' },
    { id: 'admin.html', label: '현장 관리', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { id: 'quantity.html', label: '공사 물량·생산성 산정', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5L19 7.5V19a2 2 0 0 1-2 2z' },
    { id: 'stations.html', label: '구간별 관측지점', icon: 'M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' },

    { section: '공사기간 산정' },
    { id: 'duration.html', label: '총괄·결과·Timeline', icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
    { id: 'duration-workdays.html', label: '작업일수 산정', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z' },
    { id: 'duration-weather.html', label: '비작업일수 산정·예측정확도', icon: 'M3 15a4 4 0 0 0 4 4h11a3 3 0 0 0 0-6 5 5 0 0 0-9.9-1A4 4 0 0 0 3 15z' },

    { section: '데이터·공정' },
    { id: 'quality.html', label: '기상데이터 품질관리', icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
    { id: 'schedule.html', label: '공정표 Import', icon: 'M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { id: 'data.html', label: '데이터 관리', icon: 'M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16' },
    { id: 'index.html', label: '기상 판정 기준', icon: 'M12 6V4m0 16v-2m8-8h2M4 12H2m15.364-5.364l1.414-1.414M5.222 17.778l1.414-1.414m0-9.9l-1.414-1.414m12.728 12.728l-1.414-1.414' }
  ];

  let h = `
    <div class="sidebar-brand">
      <div class="brand-sub">WEATHERWORKS</div>
      <div class="brand-title">WeatherWorks</div>
      <div class="brand-desc">건설공사 비작업일수 · 공사기간 산정</div>
    </div>
    <nav class="sidebar-menu">
  `;

  menu.forEach(m => {
    if (m.section) {
      h += `<div class="menu-section">${m.section}</div>`;
    } else {
      const active = (cur === m.id) ? ' active' : '';
      h += `
        <a class="menu-item${active}" href="${m.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="${m.icon}"/>
          </svg>
          <span>${m.label}</span>
        </a>
      `;
    }
  });

  h += `
    </nav>
    <div class="sidebar-footer">
      예상값이며 실제 작업 여부는 현장 상황 및 공식 기상정보에 따라 달라질 수 있습니다.
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