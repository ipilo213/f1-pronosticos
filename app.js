// ═══════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://rtfqnjivqhaoxxdhjknw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WVf6X7MJUALMR9nACpDH1A_MYu0A_2d';
const ADMIN_PIN    = '1968'; // ← Nacho: cambiá este número

// ═══════════════════════════════════════════════════
//  DATOS F1 2026
// ═══════════════════════════════════════════════════
const DRIVERS = [
  { name:'Antonelli',  team:'Mercedes',    num:12, color:'#00D2BE' },
  { name:'Russell',    team:'Mercedes',    num:63, color:'#00D2BE' },
  { name:'Hamilton',   team:'Ferrari',     num:44, color:'#E8002D' },
  { name:'Leclerc',    team:'Ferrari',     num:16, color:'#E8002D' },
  { name:'Norris',     team:'McLaren',     num:4,  color:'#FF8000' },
  { name:'Piastri',    team:'McLaren',     num:81, color:'#FF8000' },
  { name:'Verstappen', team:'Red Bull',    num:1,  color:'#3671C6' },
  { name:'Hadjar',     team:'Red Bull',    num:6,  color:'#3671C6' },
  { name:'Alonso',     team:'Aston Martin',num:14, color:'#358C75' },
  { name:'Stroll',     team:'Aston Martin',num:18, color:'#358C75' },
  { name:'Gasly',      team:'Alpine',      num:10, color:'#0093CC' },
  { name:'Colapinto',  team:'Alpine',      num:43, color:'#0093CC' },
  { name:'Lawson',     team:'Racing Bulls', num:30, color:'#6692FF' },
  { name:'Lindblad',   team:'Racing Bulls', num:7,  color:'#6692FF' },
  { name:'Bearman',    team:'Haas',        num:87, color:'#B6BABD' },
  { name:'Ocon',       team:'Haas',        num:31, color:'#B6BABD' },
  { name:'Sainz',      team:'Williams',    num:55, color:'#64C4FF' },
  { name:'Albon',      team:'Williams',    num:23, color:'#64C4FF' },
  { name:'Hulkenberg', team:'Audi',        num:27, color:'#52C7B8' },
  { name:'Bortoleto',  team:'Audi',        num:5,  color:'#52C7B8' },
  { name:'Bottas',     team:'Cadillac',    num:77, color:'#900000' },
  { name:'Perez',      team:'Cadillac',    num:11, color:'#900000' },
  { name:'Tsunoda',    team:'Sauber',      num:22, color:'#52C7B8' },
  { name:'Doohan',     team:'Sauber',      num:61, color:'#52C7B8' },
];

const DRIVER_MAP = {};
DRIVERS.forEach(d => DRIVER_MAP[d.name] = d);

const RACES = [
  { id:1,  name:'Australia',      flag:'🇦🇺', date:'2026-03-08' },
  { id:2,  name:'China',          flag:'🇨🇳', date:'2026-03-22' },
  { id:3,  name:'Japón',          flag:'🇯🇵', date:'2026-04-06' },
  { id:4,  name:'Bahréin',        flag:'🇧🇭', date:'2026-04-13' },
  { id:5,  name:'Arabia Saudita', flag:'🇸🇦', date:'2026-04-20' },
  { id:6,  name:'Miami',          flag:'🇺🇸', date:'2026-05-03' },
  { id:7,  name:'Emilia-Romaña',  flag:'🇮🇹', date:'2026-05-17' },
  { id:8,  name:'Mónaco',         flag:'🇲🇨', date:'2026-05-24' },
  { id:9,  name:'España',         flag:'🇪🇸', date:'2026-05-31' },
  { id:10, name:'Canadá',         flag:'🇨🇦', date:'2026-06-14' },
  { id:11, name:'Austria',        flag:'🇦🇹', date:'2026-06-28' },
  { id:12, name:'Gran Bretaña',   flag:'🇬🇧', date:'2026-07-05' },
  { id:13, name:'Bélgica',        flag:'🇧🇪', date:'2026-07-26' },
  { id:14, name:'Hungría',        flag:'🇭🇺', date:'2026-08-02' },
  { id:15, name:'Países Bajos',   flag:'🇳🇱', date:'2026-08-30' },
  { id:16, name:'Italia',         flag:'🇮🇹', date:'2026-09-06' },
  { id:17, name:'Azerbaiyán',     flag:'🇦🇿', date:'2026-09-20' },
  { id:18, name:'Singapur',       flag:'🇸🇬', date:'2026-10-04' },
  { id:19, name:'Austin',         flag:'🇺🇸', date:'2026-10-18' },
  { id:20, name:'México',         flag:'🇲🇽', date:'2026-10-25' },
  { id:21, name:'Brasil',         flag:'🇧🇷', date:'2026-11-08' },
  { id:22, name:'Las Vegas',      flag:'🇺🇸', date:'2026-11-21' },
  { id:23, name:'Qatar',          flag:'🇶🇦', date:'2026-11-29' },
  { id:24, name:'Abu Dhabi',      flag:'🇦🇪', date:'2026-12-06' },
];

const RACE_MAP = {};
RACES.forEach(r => RACE_MAP[r.id] = r);

const PTS_SCALE = [25,18,15,12,10,8,6,4,2,1];

const AVATAR_COLORS = [
  '#E10600','#00D2BE','#3671C6','#FF8000','#358C75',
  '#0093CC','#6692FF','#B6BABD','#64C4FF','#52C7B8',
  '#900000','#E8002D','#cc6200','#006633','#4B0082'
];

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser   = null;
let participantes = [];
let allProns      = [];
let allResults    = [];
let adminUnlocked = false;
let rankMode      = 'general';
let evoChart      = null;

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
async function init() {
  const [{ data: parts }, { data: prons }, { data: ress }] = await Promise.all([
    db.from('participantes').select('*').order('nombre'),
    db.from('pronosticos').select('*'),
    db.from('resultados').select('*'),
  ]);
  participantes = parts || [];
  allProns      = prons || [];
  allResults    = ress  || [];

  renderNameGrid();
  populateAllSelects();

  const saved = sessionStorage.getItem('f1_user');
  if (saved) enterAsUser(JSON.parse(saved));
}

// ═══════════════════════════════════════════════════
//  SELECT SCREEN
// ═══════════════════════════════════════════════════
function renderNameGrid() {
  document.getElementById('name-grid').innerHTML =
    participantes.map((p,i) => `
      <button class="name-btn" onclick='enterAsUser(${JSON.stringify(p)})'>
        ${p.nombre}
      </button>
    `).join('');
}

function enterAsUser(user) {
  currentUser = user;
  sessionStorage.setItem('f1_user', JSON.stringify(user));

  const idx = participantes.findIndex(p => p.id === user.id);
  const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const initials = user.nombre.slice(0,2).toUpperCase();

  document.getElementById('user-avatar').style.background = color;
  document.getElementById('user-avatar').textContent = initials;
  document.getElementById('header-user-name').textContent = user.nombre;

  document.getElementById('screen-select').classList.remove('active');
  document.getElementById('screen-main').classList.add('active');
  showTab('home');
}

function changeUser() {
  currentUser = null;
  adminUnlocked = false;
  sessionStorage.removeItem('f1_user');
  document.getElementById('screen-main').classList.remove('active');
  document.getElementById('screen-select').classList.add('active');
}

// ═══════════════════════════════════════════════════
//  TABS
// ═══════════════════════════════════════════════════
function showTab(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
  document.getElementById(`tab-${name}`).classList.add('active');

  if (name === 'home')        renderHome();
  if (name === 'pronosticar') loadPronostico();
  if (name === 'ranking')     loadRanking();
  if (name === 'resultado')   initAdmin();
}

// ═══════════════════════════════════════════════════
//  SELECTS
// ═══════════════════════════════════════════════════
function populateAllSelects() {
  const opts = RACES.map(r => `<option value="${r.id}">${r.flag} ${r.name}</option>`).join('');
  ['race-select','race-select-rank','race-select-admin'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = opts;
  });
}

function getRaceInfo(id) { return RACES.find(r => r.id === id) || RACES[0]; }

// ═══════════════════════════════════════════════════
//  HOME
// ═══════════════════════════════════════════════════
function renderHome() {
  renderNextRace();
  renderHomeStats();
  renderHomeRanking();
  renderRecentRaces();
}

function renderNextRace() {
  const now = new Date();
  const next = RACES.find(r => new Date(r.date) > now) || RACES[RACES.length-1];
  const target = new Date(next.date);
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hrs  = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const mins = Math.max(0, Math.floor((diff % 3600000) / 60000));

  document.getElementById('next-race-card').innerHTML = `
    <div class="next-race-card">
      <div class="nrc-inner">
        <div class="nrc-label">PRÓXIMA CARRERA</div>
        <div class="nrc-name">${next.name.toUpperCase()}</div>
        <div class="nrc-date">${formatDate(next.date)}</div>
        <div class="nrc-countdown">
          <div class="countdown-unit"><div class="countdown-num">${days}</div><div class="countdown-lbl">días</div></div>
          <div class="countdown-unit"><div class="countdown-num">${hrs}</div><div class="countdown-lbl">hrs</div></div>
          <div class="countdown-unit"><div class="countdown-num">${mins}</div><div class="countdown-lbl">min</div></div>
        </div>
      </div>
      <div class="nrc-flag">${next.flag}</div>
    </div>`;
}

function renderHomeStats() {
  const racesWithResult = [...new Set(allResults.map(r => r.carrera_id))].length;
  const totalProns = allProns.length / 10;
  const myProns = allProns.filter(p => p.participante_id === currentUser?.id);
  const myRaces = [...new Set(myProns.map(p => p.carrera_id))].length;

  document.getElementById('home-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${racesWithResult}</div><div class="stat-lbl">Carreras</div></div>
    <div class="stat-card"><div class="stat-num">${participantes.length}</div><div class="stat-lbl">Jugadores</div></div>
    <div class="stat-card"><div class="stat-num">${myRaces}</div><div class="stat-lbl">Mis pronóst.</div></div>`;
}

function renderHomeRanking() {
  const totals = calcGeneralRanking();
  const max = totals[0]?.pts || 1;
  const top5 = totals.slice(0,5);

  document.getElementById('home-ranking-preview').innerHTML = top5.map((p,i) => {
    const color = avatarColor(p.nombre);
    return `<div class="home-rank-row">
      <div class="hrr-num">${i+1}</div>
      <div class="hrr-av" style="background:${color}">${p.nombre.slice(0,2).toUpperCase()}</div>
      <div class="hrr-name">${p.nombre}</div>
      <div class="hrr-bar-wrap"><div class="hrr-bar" style="width:${Math.round(p.pts/max*100)}%"></div></div>
      <div class="hrr-pts">${p.pts}</div>
    </div>`;
  }).join('') || '<p class="text-muted" style="font-size:.85rem">Sin datos aún</p>';
}

function renderRecentRaces() {
  const raceIds = [...new Set(allResults.map(r => r.carrera_id))];
  if (!raceIds.length) {
    document.getElementById('home-recent-races').innerHTML =
      '<p class="text-muted" style="font-size:.85rem">Aún no hay carreras con resultado</p>';
    return;
  }
  const recent = raceIds.slice(-4).reverse();
  document.getElementById('home-recent-races').innerHTML = recent.map(rid => {
    const race = RACE_MAP[rid];
    const winner = allResults.find(r => r.carrera_id === rid && r.posicion === 1);
    const myScore = getMyScoreForRace(rid);
    return `<div class="recent-race-item" onclick="openRaceModal(${rid})">
      <div class="rri-flag">${race?.flag||'🏁'}</div>
      <div>
        <div class="rri-name">${race?.name||'Carrera'}</div>
        <div class="rri-winner">${winner ? '🏆 '+winner.piloto : ''}</div>
      </div>
      ${myScore !== null ? `<div class="rri-pts">${myScore} pts</div>` : ''}
    </div>`;
  }).join('');
}

function getMyScoreForRace(raceId) {
  if (!currentUser) return null;
  const res = allResults.filter(r => r.carrera_id === raceId);
  if (!res.length) return null;
  const resArr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
  const myP = allProns.filter(p => p.participante_id === currentUser.id && p.carrera_id === raceId);
  if (!myP.length) return null;
  return myP.reduce((sum, pr) => {
    const ri = resArr.indexOf(pr.piloto);
    if (ri === -1) return sum;
    const diff = Math.abs((pr.posicion-1)-ri);
    return sum + (diff < PTS_SCALE.length ? PTS_SCALE[diff] : 0);
  }, 0);
}

// ═══════════════════════════════════════════════════
//  PRONOSTICAR
// ═══════════════════════════════════════════════════
async function loadPronostico() {
  const raceId = parseInt(document.getElementById('race-select').value);
  const race   = getRaceInfo(raceId);

  document.getElementById('pron-race-info').innerHTML = `
    <div class="race-info-bar">
      <div class="race-flag">${race.flag}</div>
      <div>
        <div class="race-info-name">${race.name.toUpperCase()}</div>
        <div class="race-info-date">${formatDate(race.date)}</div>
      </div>
    </div>`;

  const myProns = allProns.filter(p => p.participante_id === currentUser.id && p.carrera_id === raceId)
    .sort((a,b)=>a.posicion-b.posicion);

  document.getElementById('pron-status').innerHTML = myProns.length
    ? `<div class="status-chip chip-ok">✓ Pronóstico guardado</div>`
    : `<div class="status-chip chip-no">Sin pronóstico aún</div>`;

  const picks = {};
  myProns.forEach(p => picks[p.posicion] = p.piloto);

  // get result if exists to show score
  const resForRace = allResults.filter(r => r.carrera_id === raceId).sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);

  document.getElementById('positions-list').innerHTML =
    Array.from({length:10},(_,i) => {
      const pos = i+1;
      const cls = pos===1?'p1':pos===2?'p2':pos===3?'p3':'';
      const sel = picks[pos] || '';
      const d   = sel ? DRIVER_MAP[sel] : null;
      const barColor = d?.color || 'transparent';

      let ptsBadge = '';
      if (sel && resForRace.length) {
        const ri = resForRace.indexOf(sel);
        if (ri !== -1) {
          const diff = Math.abs((pos-1)-ri);
          const pts  = diff < PTS_SCALE.length ? PTS_SCALE[diff] : 0;
          const cls2 = pts === 25 ? 'exact' : pts > 0 ? 'close' : '';
          ptsBadge = `<div class="pos-badge pts ${cls2}">${pts}pts</div>`;
        }
      }

      return `<div class="pos-item">
        <div class="pos-badge ${cls}">${pos}</div>
        <div class="team-bar" style="background:${barColor}" id="bar-${pos}"></div>
        <select class="pos-select" id="pron-${pos}" onchange="updateBar(${pos})">
          <option value="">— piloto —</option>
          ${DRIVERS.map(dr => `<option value="${dr.name}" ${dr.name===sel?'selected':''}>${dr.name}</option>`).join('')}
        </select>
        ${ptsBadge}
      </div>`;
    }).join('');
}

function updateBar(pos) {
  const val = document.getElementById(`pron-${pos}`).value;
  const d   = DRIVER_MAP[val];
  document.getElementById(`bar-${pos}`).style.background = d?.color || 'transparent';
}

async function savePronostico() {
  const raceId = parseInt(document.getElementById('race-select').value);
  const btn    = document.getElementById('btn-save');
  const picks  = [];

  for (let i=1;i<=10;i++) {
    const v = document.getElementById(`pron-${i}`).value;
    if (!v) { toast('Completá las 10 posiciones','err'); return; }
    picks.push(v);
  }
  if (new Set(picks).size !== 10) { toast('Hay pilotos repetidos','err'); return; }

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'GUARDANDO...';

  // delete old + insert new
  await db.from('pronosticos').delete()
    .eq('participante_id', currentUser.id).eq('carrera_id', raceId);

  const rows = picks.map((piloto,i) => ({
    participante_id: currentUser.id,
    carrera_id: raceId,
    posicion: i+1,
    piloto
  }));

  const { error } = await db.from('pronosticos').insert(rows);

  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = 'GUARDAR PRONÓSTICO';

  if (error) { toast('Error al guardar','err'); return; }

  // update local state
  allProns = allProns.filter(p => !(p.participante_id === currentUser.id && p.carrera_id === raceId));
  allProns.push(...rows.map((r,i) => ({...r, id:'local-'+i})));

  toast('Pronóstico guardado 🏁','ok');
  document.getElementById('pron-status').innerHTML = `<div class="status-chip chip-ok">✓ Pronóstico guardado</div>`;
}

// ═══════════════════════════════════════════════════
//  RANKING
// ═══════════════════════════════════════════════════
function setRankMode(mode, btn) {
  rankMode = mode;
  document.querySelectorAll('.toggle-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('rank-race-sel').style.display = mode==='carrera' ? 'block' : 'none';
  document.getElementById('chart-section').style.display = mode==='general' ? 'block' : 'none';
  loadRanking();
}

function loadRanking() {
  if (rankMode === 'general') loadRankGeneral();
  else loadRankCarrera();
}

function calcGeneralRanking() {
  const resMap = {};
  allResults.forEach(r => {
    if (!resMap[r.carrera_id]) resMap[r.carrera_id] = [];
    resMap[r.carrera_id].push(r);
  });

  const totals = {};
  participantes.forEach(p => totals[p.id] = { id:p.id, nombre:p.nombre, pts:0, races:0 });

  allProns.forEach(pr => {
    const res = resMap[pr.carrera_id];
    if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const ri  = arr.indexOf(pr.piloto);
    if (ri === -1) return;
    const diff = Math.abs((pr.posicion-1)-ri);
    const pts  = diff < PTS_SCALE.length ? PTS_SCALE[diff] : 0;
    totals[pr.participante_id].pts  += pts;
    if (pr.posicion === 1) totals[pr.participante_id].races++;
  });

  return Object.values(totals).sort((a,b)=>b.pts-a.pts);
}

function loadRankGeneral() {
  const body = document.getElementById('ranking-body');
  const sorted = calcGeneralRanking();
  const hasData = sorted.some(p=>p.pts>0);

  if (!hasData) {
    body.innerHTML = `<div class="empty-state"><div class="ei">🏁</div><p>Aún no hay resultados</p></div>`;
    document.getElementById('chart-section').style.display = 'none';
    return;
  }

  // Podium
  const [first,second,third,...rest] = sorted;
  let html = `<div class="podium">`;
  if (second) html += podiumSlot(second,'p2','2');
  if (first)  html += podiumSlot(first,'p1','1');
  if (third)  html += podiumSlot(third,'p3','3');
  html += `</div>`;

  // Rest list
  html += `<div class="rank-list">`;
  rest.forEach((p,i) => {
    html += rankRow(p, i+4);
  });
  html += `</div>`;
  body.innerHTML = html;

  // Chart
  document.getElementById('chart-section').style.display = 'block';
  renderEvoChart(sorted);
}

function podiumSlot(p, cls, label) {
  const color = avatarColor(p.nombre);
  return `<div class="podium-slot ${cls}">
    <div class="podium-avatar" style="background:${color}">${p.nombre.slice(0,2).toUpperCase()}</div>
    <div class="podium-name">${p.nombre}</div>
    <div class="podium-pts">${p.pts} pts</div>
    <div class="podium-block">${label}</div>
  </div>`;
}

function rankRow(p, pos) {
  const color = avatarColor(p.nombre);
  const numCls = pos===1?'g':pos===2?'s':pos===3?'b':'';
  return `<div class="rank-row" onclick="toggleRankDetail('rd-${p.id}')" id="rr-${p.id}">
    <div class="rank-num ${numCls}">${pos}</div>
    <div class="rank-av" style="background:${color}">${p.nombre.slice(0,2).toUpperCase()}</div>
    <div class="rank-name">${p.nombre}</div>
    <div class="rank-pts">${p.pts}<span>pts</span></div>
    <div class="rank-chevron">▼</div>
  </div>
  <div class="rank-detail" id="rd-${p.id}">
    <div style="padding:.5rem"><div class="loader">Cargando...</div></div>
  </div>`;
}

function toggleRankDetail(id) {
  const det = document.getElementById(id);
  const row = id.replace('rd-','rr-');
  det.classList.toggle('open');
  document.getElementById(row)?.classList.toggle('expanded');
  if (det.classList.contains('open')) {
    const pid = id.replace('rd-','');
    loadParticipantDetail(pid, det);
  }
}

function loadParticipantDetail(pid, el) {
  const resMap = {};
  allResults.forEach(r => {
    if (!resMap[r.carrera_id]) resMap[r.carrera_id] = [];
    resMap[r.carrera_id].push(r);
  });

  const myProns = allProns.filter(p => p.participante_id == pid);
  const raceIds = [...new Set(myProns.map(p=>p.carrera_id))];

  if (!raceIds.length) {
    el.innerHTML = '<p style="padding:1rem;font-size:.8rem;color:var(--text3)">Sin pronósticos</p>';
    return;
  }

  const rows = raceIds.map(rid => {
    const race = RACE_MAP[rid];
    const res  = resMap[rid];
    if (!res) return null;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const pronsRace = myProns.filter(p=>p.carrera_id===rid).sort((a,b)=>a.posicion-b.posicion);
    const pts = pronsRace.reduce((s,pr)=>{
      const ri = arr.indexOf(pr.piloto);
      if (ri===-1) return s;
      const diff = Math.abs((pr.posicion-1)-ri);
      return s+(diff<PTS_SCALE.length?PTS_SCALE[diff]:0);
    },0);
    return { race, pts };
  }).filter(Boolean).sort((a,b)=>b.pts-a.pts);

  el.innerHTML = `<table class="detail-table">
    <thead><tr><th>Carrera</th><th style="text-align:right">Pts</th></tr></thead>
    <tbody>
      ${rows.map(r=>`<tr>
        <td>${r.race?.flag||''} ${r.race?.name||'?'}</td>
        <td class="${r.pts>50?'pt-ex':r.pts>20?'pt-cl':'pt-no'}">${r.pts}</td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

function loadRankCarrera() {
  const raceId = parseInt(document.getElementById('race-select-rank').value);
  const body   = document.getElementById('ranking-body');
  const res    = allResults.filter(r=>r.carrera_id===raceId).sort((a,b)=>a.posicion-b.posicion);

  if (!res.length) {
    body.innerHTML = `<div class="empty-state"><div class="ei">⏳</div><p>Sin resultado para esta carrera</p></div>`;
    return;
  }

  const resArr = res.map(r=>r.piloto);
  const race   = RACE_MAP[raceId];

  const data = participantes.map(p => {
    const myP = allProns.filter(pr=>pr.participante_id===p.id&&pr.carrera_id===raceId).sort((a,b)=>a.posicion-b.posicion);
    if (!myP.length) return { nombre:p.nombre, id:p.id, pts:null, detail:[] };
    let pts=0;
    const detail = myP.map(pr=>{
      const ri=resArr.indexOf(pr.piloto);
      if(ri===-1) return {piloto:pr.piloto,pred:pr.posicion,real:'—',pts:0};
      const diff=Math.abs((pr.posicion-1)-ri);
      const p2=diff<PTS_SCALE.length?PTS_SCALE[diff]:0;
      pts+=p2;
      return {piloto:pr.piloto,pred:pr.posicion,real:ri+1,pts:p2};
    });
    return {nombre:p.nombre,id:p.id,pts,detail};
  }).sort((a,b)=>(b.pts||0)-(a.pts||0));

  body.innerHTML = `
    <div class="race-info-bar" style="margin-bottom:1rem">
      <div class="race-flag">${race?.flag||'🏁'}</div>
      <div><div class="race-info-name">${race?.name?.toUpperCase()||''}</div>
      <div class="race-info-date">${race?.date?formatDate(race.date):''}</div></div>
    </div>
    <div class="rank-list">
      ${data.map((p,i)=>{
        const color=avatarColor(p.nombre);
        const numCls=i===0?'g':i===1?'s':i===2?'b':'';
        return `<div class="rank-row" onclick="toggleCarreraDetail('crd-${p.id}')" id="crr-${p.id}">
          <div class="rank-num ${numCls}">${i+1}</div>
          <div class="rank-av" style="background:${color}">${p.nombre.slice(0,2).toUpperCase()}</div>
          <div class="rank-name">${p.nombre}</div>
          <div class="rank-pts">${p.pts!==null?p.pts+'<span>pts</span>':'—'}</div>
          <div class="rank-chevron">▼</div>
        </div>
        <div class="rank-detail" id="crd-${p.id}">
          ${p.detail.length ? `<table class="detail-table">
            <thead><tr><th>Pos</th><th>Piloto</th><th>Real</th><th>Pts</th></tr></thead>
            <tbody>
              ${p.detail.map(d=>`<tr>
                <td>${d.pred}</td>
                <td>${d.piloto}</td>
                <td>${d.real}</td>
                <td class="${d.pts===25?'pt-ex':d.pts>0?'pt-cl':'pt-no'}">${d.pts}</td>
              </tr>`).join('')}
            </tbody>
          </table>` : '<p style="padding:1rem;font-size:.8rem;color:var(--text3)">Sin pronóstico</p>'}
        </div>`;
      }).join('')}
    </div>`;
}

function toggleCarreraDetail(id) {
  const det = document.getElementById(id);
  const row = id.replace('crd-','crr-');
  det.classList.toggle('open');
  document.getElementById(row)?.classList.toggle('expanded');
}

// ═══════════════════════════════════════════════════
//  EVOLUTION CHART
// ═══════════════════════════════════════════════════
function renderEvoChart(sorted) {
  const raceIds = [...new Set(allResults.map(r=>r.carrera_id))].sort((a,b)=>a-b);
  if (!raceIds.length) return;

  const labels = raceIds.map(id => RACE_MAP[id]?.name?.slice(0,3).toUpperCase() || id);

  const resMap = {};
  allResults.forEach(r=>{
    if(!resMap[r.carrera_id]) resMap[r.carrera_id]=[];
    resMap[r.carrera_id].push(r);
  });

  const datasets = sorted.slice(0,8).map((p,i)=>{
    const color = avatarColor(p.nombre);
    let cum = 0;
    const data = raceIds.map(rid=>{
      const res=resMap[rid];
      if(!res) return cum;
      const arr=res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
      const myP=allProns.filter(pr=>pr.participante_id===p.id&&pr.carrera_id===rid);
      myP.forEach(pr=>{
        const ri=arr.indexOf(pr.piloto);
        if(ri===-1) return;
        const diff=Math.abs((pr.posicion-1)-ri);
        cum+=diff<PTS_SCALE.length?PTS_SCALE[diff]:0;
      });
      return cum;
    });
    return { label:p.nombre, data, borderColor:color, backgroundColor:color+'22', tension:.4, fill:false, pointRadius:4, pointHoverRadius:6, borderWidth:2 };
  });

  const ctx = document.getElementById('evo-chart');
  if (!ctx) return;
  if (evoChart) evoChart.destroy();

  evoChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color:'#aaa', font:{ family:'Barlow Condensed', size:11 }, boxWidth:12, padding:10 }
        }
      },
      scales: {
        x: { ticks:{ color:'#666', font:{family:'Barlow Condensed',size:10} }, grid:{ color:'rgba(255,255,255,0.05)' } },
        y: { ticks:{ color:'#666', font:{family:'Barlow Condensed',size:10} }, grid:{ color:'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// ═══════════════════════════════════════════════════
//  ADMIN
// ═══════════════════════════════════════════════════
function initAdmin() {
  if (adminUnlocked) {
    showAdminPanel();
  } else {
    document.getElementById('admin-gate').style.display  = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.querySelectorAll('.pin-box').forEach(el=>el.value='');
    document.getElementById('pin-err').textContent='';
    setTimeout(()=>document.querySelector('.pin-box').focus(),100);
  }
}

function showAdminPanel() {
  document.getElementById('admin-gate').style.display  = 'none';
  document.getElementById('admin-panel').style.display = 'block';
  loadAdminResult();
}

function pinIn(el, idx) {
  if (el.value.length===1 && idx<3) document.querySelectorAll('.pin-box')[idx+1].focus();
  if (idx===3) checkPin();
}
function pinDel(e, idx) {
  if (e.key==='Backspace' && !e.target.value && idx>0)
    document.querySelectorAll('.pin-box')[idx-1].focus();
}
function checkPin() {
  const pin = Array.from(document.querySelectorAll('.pin-box')).map(d=>d.value).join('');
  if (pin.length<4) return;
  if (pin===ADMIN_PIN) {
    adminUnlocked = true;
    showAdminPanel();
  } else {
    document.getElementById('pin-err').textContent='PIN incorrecto';
    document.querySelectorAll('.pin-box').forEach(d=>d.value='');
    document.querySelector('.pin-box').focus();
  }
}

function loadAdminResult() {
  const raceId = parseInt(document.getElementById('race-select-admin').value);
  const existing = allResults.filter(r=>r.carrera_id===raceId).sort((a,b)=>a.posicion-b.posicion);
  const picks = {};
  existing.forEach(r=>picks[r.posicion]=r.piloto);

  document.getElementById('admin-pos-list').innerHTML =
    Array.from({length:10},(_,i)=>{
      const pos=i+1;
      const cls=pos===1?'p1':pos===2?'p2':pos===3?'p3':'';
      const sel=picks[pos]||'';
      const d=DRIVER_MAP[sel];
      return `<div class="pos-item">
        <div class="pos-badge ${cls}">${pos}</div>
        <div class="team-bar" style="background:${d?.color||'transparent'}" id="abar-${pos}"></div>
        <select class="pos-select" id="ares-${pos}" onchange="updateABar(${pos})">
          <option value="">— piloto —</option>
          ${DRIVERS.map(dr=>`<option value="${dr.name}" ${dr.name===sel?'selected':''}>${dr.name}</option>`).join('')}
        </select>
      </div>`;
    }).join('');
}

function updateABar(pos) {
  const val=document.getElementById(`ares-${pos}`).value;
  const d=DRIVER_MAP[val];
  document.getElementById(`abar-${pos}`).style.background=d?.color||'transparent';
}

async function saveResultado() {
  const raceId = parseInt(document.getElementById('race-select-admin').value);
  const btn    = document.getElementById('btn-save-res');
  const picks  = [];

  for (let i=1;i<=10;i++){
    const v=document.getElementById(`ares-${i}`).value;
    if(!v){toast('Completá las 10 posiciones','err');return;}
    picks.push(v);
  }
  if(new Set(picks).size!==10){toast('Hay pilotos repetidos','err');return;}

  btn.disabled=true;
  btn.querySelector('.btn-text').textContent='GUARDANDO...';

  await db.from('resultados').delete().eq('carrera_id',raceId);

  const rows=picks.map((piloto,i)=>({carrera_id:raceId,posicion:i+1,piloto}));
  const {error}=await db.from('resultados').insert(rows);

  btn.disabled=false;
  btn.querySelector('.btn-text').textContent='GUARDAR RESULTADO';

  if(error){toast('Error al guardar','err');return;}

  // update local
  allResults=allResults.filter(r=>r.carrera_id!==raceId);
  allResults.push(...rows.map((r,i)=>({...r,id:'local-res-'+i})));

  toast('Resultado guardado ✓','ok');
}

// ═══════════════════════════════════════════════════
//  MODAL CARRERA
// ═══════════════════════════════════════════════════
function openRaceModal(raceId) {
  const race = RACE_MAP[raceId];
  const res  = allResults.filter(r=>r.carrera_id===raceId).sort((a,b)=>a.posicion-b.posicion);
  if (!res.length) return;

  const myScore = getMyScoreForRace(raceId);

  let html = `<div style="margin-bottom:1.5rem">
    <div style="font-family:var(--font-d);font-size:.65rem;letter-spacing:3px;color:var(--red);margin-bottom:.25rem">RESULTADO OFICIAL</div>
    <div style="font-family:var(--font-d);font-size:1.8rem;font-weight:900">${race?.flag} ${race?.name?.toUpperCase()}</div>
    ${myScore!==null?`<div style="margin-top:.5rem;font-family:var(--font-m);font-size:.85rem;color:var(--text2)">Mis puntos: <span style="color:var(--red);font-size:1.1rem;font-weight:700">${myScore}</span></div>`:''}
  </div>`;

  html += `<div style="display:flex;flex-direction:column;gap:4px">`;
  res.forEach((r,i) => {
    const d = DRIVER_MAP[r.piloto];
    const cls = i===0?'p1':i===1?'p2':i===2?'p3':'';
    const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
    html += `<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--dark3);border-radius:var(--r)">
      <div class="pos-badge ${cls}">${r.posicion}</div>
      <div style="width:3px;height:20px;border-radius:2px;background:${d?.color||'#333'};flex-shrink:0"></div>
      <div style="flex:1">
        <div style="font-family:var(--font-d);font-size:.95rem;font-weight:700">${medal} ${r.piloto}</div>
        <div style="font-size:.75rem;color:var(--text3)">${d?.team||''}</div>
      </div>
    </div>`;
  });
  html += `</div>`;

  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal').classList.add('open');
}
function closeModal() { document.getElementById('modal').classList.remove('open'); }

// ═══════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════
function avatarColor(nombre) {
  const idx = participantes.findIndex(p=>p.nombre===nombre);
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', { day:'numeric', month:'long', year:'numeric' });
}

let toastTimer;
function toast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.className='toast',3000);
}

// ═══════════════════════════════════════════════════
//  START
// ═══════════════════════════════════════════════════
init();
