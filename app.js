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
  { id:1,  name:'Australia',      flag:'🇦🇺', start:'2026-03-08T05:00:00Z' }, // pasada - bloqueada
  { id:2,  name:'China',          flag:'🇨🇳', start:'2026-03-22T07:00:00Z' }, // pasada - bloqueada
  { id:3,  name:'Japón',          flag:'🇯🇵', start:null }, // dejada abierta para cargar pronósticos
  { id:6,  name:'Miami',          flag:'🇺🇸', start:'2026-05-03T20:00:00Z' }, // 4pm EDT
  { id:7,  name:'Canadá',         flag:'🇨🇦', start:'2026-05-24T20:00:00Z' }, // 4pm EDT
  { id:8,  name:'Mónaco',         flag:'🇲🇨', start:'2026-06-07T13:00:00Z' }, // 3pm CEST
  { id:9,  name:'España (Madrid)',flag:'🇪🇸', start:'2026-06-14T13:00:00Z' }, // 3pm CEST
  { id:10, name:'Austria',        flag:'🇦🇹', start:'2026-06-28T13:00:00Z' }, // 3pm CEST
  { id:11, name:'Gran Bretaña',   flag:'🇬🇧', start:'2026-07-05T14:00:00Z' }, // 3pm BST
  { id:12, name:'Bélgica',        flag:'🇧🇪', start:'2026-07-26T13:00:00Z' }, // 3pm CEST
  { id:13, name:'Hungría',        flag:'🇭🇺', start:'2026-08-02T13:00:00Z' }, // 3pm CEST
  { id:14, name:'Países Bajos',   flag:'🇳🇱', start:'2026-08-30T13:00:00Z' }, // 3pm CEST
  { id:15, name:'Italia',         flag:'🇮🇹', start:'2026-09-06T13:00:00Z' }, // 3pm CEST
  { id:16, name:'España (Barna)', flag:'🇪🇸', start:'2026-09-13T13:00:00Z' }, // 3pm CEST
  { id:17, name:'Azerbaiyán',     flag:'🇦🇿', start:'2026-09-26T11:00:00Z' }, // 3pm AZT (sábado)
  { id:18, name:'Singapur',       flag:'🇸🇬', start:'2026-10-04T12:00:00Z' }, // 8pm SGT
  { id:19, name:'Austin',         flag:'🇺🇸', start:'2026-10-18T19:00:00Z' }, // 3pm CDT
  { id:20, name:'México',         flag:'🇲🇽', start:'2026-10-25T20:00:00Z' }, // 2pm CDT
  { id:21, name:'Brasil',         flag:'🇧🇷', start:'2026-11-08T17:00:00Z' }, // 2pm BRT
  { id:22, name:'Las Vegas',      flag:'🇺🇸', start:'2026-11-22T06:00:00Z' }, // 10pm PST sábado
  { id:23, name:'Qatar',          flag:'🇶🇦', start:'2026-11-29T16:00:00Z' }, // 7pm AST
  { id:24, name:'Abu Dhabi',      flag:'🇦🇪', start:'2026-12-06T13:00:00Z' }, // 5pm GST
];

const RACE_MAP = {};
RACES.forEach(r => RACE_MAP[r.id] = r);

function isDeadlinePassed(raceId) {
  const race = RACE_MAP[raceId];
  if (!race || !race.start) return false;
  const deadline = new Date(new Date(race.start).getTime() - 60 * 60 * 1000); // 1hr before
  return new Date() > deadline;
}

function getDeadlineText(raceId) {
  const race = RACE_MAP[raceId];
  if (!race || !race.start) return '';
  const deadline = new Date(new Date(race.start).getTime() - 60 * 60 * 1000);
  return deadline.toLocaleString('es-AR', { dateStyle:'short', timeStyle:'short' });
}

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
let allHistorico  = [];
let adminUnlocked = false;
let rankMode      = 'general';
let evoChart      = null;

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
const PARTICIPANTES_HARDCODED = [
  { id:1,  nombre:'Nacho' },
  { id:2,  nombre:'Diego' },
  { id:3,  nombre:'Daniel A' },
  { id:4,  nombre:'Alejandro' },
  { id:5,  nombre:'Daniel H' },
  { id:6,  nombre:'Martin' },
  { id:7,  nombre:'Federico' },
  { id:8,  nombre:'Damian' },
  { id:9,  nombre:'Andres' },
  { id:10, nombre:'Adolfo' },
  { id:11, nombre:'German' },
  { id:12, nombre:'Juan Bon' },
  { id:13, nombre:'Lito' },
  { id:14, nombre:'Sebastian' },
  { id:15, nombre:'Mauricio' },
];

async function init() {
  participantes = PARTICIPANTES_HARDCODED;
  renderNameGrid();
  populateAllSelects();

  const saved = sessionStorage.getItem('f1_user');
  if (saved) enterAsUser(JSON.parse(saved));

  const [{ data: prons }, { data: ress }, { data: hist }] = await Promise.all([
    db.from('pronosticos').select('*'),
    db.from('resultados').select('*'),
    db.from('puntos_historicos').select('*'),
  ]);
  allProns     = prons || [];
  allResults   = ress  || [];
  allHistorico = hist  || [];
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
  const next = RACES.find(r => r.start && new Date(r.start) > now) || RACES[RACES.length-1];
  const target = new Date(next.start || next.date || now);
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hrs  = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const mins = Math.max(0, Math.floor((diff % 3600000) / 60000));

  document.getElementById('next-race-card').innerHTML = `
    <div class="next-race-card">
      <div class="nrc-inner">
        <div class="nrc-label">PRÓXIMA CARRERA</div>
        <div class="nrc-name">${next.name.toUpperCase()}</div>
        <div class="nrc-date">${formatDate(next.start || next.date)}</div>
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

  const deadline = isDeadlinePassed(raceId);
  const deadlineText = getDeadlineText(raceId);
  const saveBtn = document.getElementById('btn-save');
  if (saveBtn) {
    saveBtn.disabled = deadline;
    saveBtn.querySelector('.btn-text').textContent = deadline ? 'PRONÓSTICO CERRADO' : 'GUARDAR PRONÓSTICO';
  }

  document.getElementById('pron-race-info').innerHTML = `
    <div class="race-info-bar">
      <div class="race-flag">${race.flag}</div>
      <div>
        <div class="race-info-name">${race.name.toUpperCase()}</div>
        <div class="race-info-date">${race.start ? formatDate(race.start) : ''}</div>
      </div>
      <div class="race-deadline">${deadline
        ? '⛔ CERRADO'
        : deadlineText ? `Cierra: ${deadlineText}` : ''
      }</div>
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

  if (isDeadlinePassed(raceId)) {
    toast('⛔ Pronóstico cerrado — la carrera está por empezar','err');
    return;
  }

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
  showShareButton(raceId, picks);
}

function showShareButton(raceId, picks) {
  const existing = document.getElementById('share-section');
  if (existing) existing.remove();
  const race = RACE_MAP[raceId];
  const el = document.createElement('div');
  el.id = 'share-section';
  el.style.cssText = 'margin-bottom:1rem;';
  el.innerHTML = `<button class="btn-f1" style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.15);" onclick="generateShareImage(${raceId}, ${JSON.stringify(picks)}, this)">
    <span class="btn-text">COMPARTIR PRONÓSTICO</span>
    <span class="btn-flag" style="font-size:1rem">↗</span>
  </button>`;
  const saveBar = document.querySelector('.sticky-save');
  saveBar.parentNode.insertBefore(el, saveBar);
}

async function generateShareImage(raceId, picks, btn) {
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'GENERANDO...';

  try {
    const race    = RACE_MAP[raceId];
    const dateStr = new Date().toLocaleDateString('es-AR', {day:'numeric',month:'long',year:'numeric'});
    const scale   = 2;
    const W       = 480;
    const rowH    = 48;
    const headerH = 110;
    const footerH = 36;
    const H       = headerH + picks.length * rowH + footerH;

    const canvas  = document.createElement('canvas');
    canvas.width  = W * scale;
    canvas.height = H * scale;
    const ctx     = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // background
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, W, H);

    // top red bar
    ctx.fillStyle = '#E10600';
    ctx.fillRect(0, 0, W, 4);

    // header
    ctx.fillStyle = '#E10600';
    ctx.font = 'bold 9px Arial';
    ctx.letterSpacing = '3px';
    ctx.fillText('PRONOSTICO F1 · 2026', 24, 26);
    ctx.letterSpacing = '0px';

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Arial';
    ctx.fillText((race?.name || '').toUpperCase(), 24, 58);

    ctx.fillStyle = '#555';
    ctx.font = '11px Arial';
    ctx.fillText(dateStr, 24, 76);

    // user name right
    ctx.fillStyle = '#555';
    ctx.font = '9px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('PRONOSTICADO POR', W - 24, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(currentUser.nombre.toUpperCase(), W - 24, 64);
    ctx.textAlign = 'left';

    // divider
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, headerH - 10);
    ctx.lineTo(W - 24, headerH - 10);
    ctx.stroke();

    // rows
    picks.forEach((piloto, i) => {
      const pos   = i + 1;
      const d     = DRIVER_MAP[piloto] || {};
      const color = d.color || '#444';
      const y     = headerH + i * rowH;

      // row bg for top 3
      if (pos <= 3) {
        ctx.fillStyle = '#161616';
        ctx.beginPath();
        ctx.roundRect(16, y + 4, W - 32, rowH - 6, 4);
        ctx.fill();
      }

      // team color bar
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(16, y + 4, 3, rowH - 6, 2);
      ctx.fill();

      // position number
      ctx.fillStyle = '#444';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(String(pos), 38, y + rowH/2 + 5);
      ctx.textAlign = 'left';

      // driver name
      ctx.fillStyle = '#f2f2f2';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(piloto, 52, y + rowH/2 + 2);

      // team
      ctx.fillStyle = '#555';
      ctx.font = '10px Arial';
      ctx.fillText(d.team || '', 52, y + rowH/2 + 15);

      // color dot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(W - 28, y + rowH/2, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // footer
    const fy = headerH + picks.length * rowH + 8;
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, fy);
    ctx.lineTo(W - 24, fy);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '9px Arial';
    ctx.fillText('F1 BCU · f1bcu.com', 24, fy + 18);
    ctx.textAlign = 'right';
    ctx.fillText('QUIEN GANA?', W - 24, fy + 18);
    ctx.textAlign = 'left';

    // share
    canvas.toBlob(async blob => {
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'COMPARTIR PRONOSTICO';
      const file = new File([blob], `pronostico-${race?.name||'f1'}.png`, {type:'image/png'});
      if (navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
        await navigator.share({files:[file], title:`Mi pronostico - ${race?.name}`, text:`Mi pronostico para el GP de ${race?.name}`});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `pronostico-${race?.name||'f1'}.png`;
        a.click(); URL.revokeObjectURL(url);
        toast('Imagen descargada','ok');
      }
    }, 'image/png');

  } catch(e) {
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'COMPARTIR PRONOSTICO';
    toast('Error: ' + e.message, 'err');
  }
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

// Calcula los puntos de pronóstico de un participante en una carrera
function calcRaceScore(participanteId, raceId, resArr) {
  const myP = allProns.filter(p => p.participante_id === participanteId && p.carrera_id === raceId);
  if (!myP.length) return null;
  return myP.reduce((sum, pr) => {
    const ri = resArr.indexOf(pr.piloto);
    if (ri === -1) return sum;
    const diff = Math.abs((pr.posicion - 1) - ri);
    return sum + (diff < PTS_SCALE.length ? PTS_SCALE[diff] : 0);
  }, 0);
}

// Asigna puntos de campeonato según posición en el ranking de cada carrera
// Con empate: promedio de los puntos de las posiciones que comparten
function assignChampionshipPts(scores) {
  // scores = [{ id, nombre, raceScore }, ...] ordenado desc por raceScore
  // Agrupar empates
  const result = [];
  let i = 0;
  while (i < scores.length) {
    const val = scores[i].raceScore;
    if (val === null) { result.push({ ...scores[i], champPts: 0 }); i++; continue; }
    // encontrar todos los que empatan
    let j = i;
    while (j < scores.length && scores[j].raceScore === val) j++;
    // posiciones i..j-1 (1-indexed: i+1..j)
    const posiciones = Array.from({length: j-i}, (_, k) => i+k); // 0-indexed → PTS_SCALE[pos]
    const ptsValidos = posiciones.map(p => p < PTS_SCALE.length ? PTS_SCALE[p] : 0);
    const avg = ptsValidos.reduce((s,p)=>s+p,0) / ptsValidos.length;
    for (let k = i; k < j; k++) {
      result.push({ ...scores[k], champPts: avg });
    }
    i = j;
  }
  return result;
}

function calcGeneralRanking() {
  const totals = {};
  participantes.forEach(p => totals[p.id] = { id:p.id, nombre:p.nombre, pts:0, breakdown:[] });

  // Sumar puntos históricos (carreras sin pronósticos en la app)
  allHistorico.forEach(h => {
    if (!totals[h.participante_id]) return;
    totals[h.participante_id].pts += Number(h.pts_campeonato);
    totals[h.participante_id].breakdown.push({
      raceId: h.carrera_id,
      raceScore: h.pts_carrera,
      champPts: Number(h.pts_campeonato),
      historico: true
    });
  });

  // Sumar puntos calculados desde pronósticos cargados en la app
  const raceIdsConProns = [...new Set(allProns.map(p => p.carrera_id))];
  const raceIdsConResult = [...new Set(allResults.map(r => r.carrera_id))];
  const raceIdsHistorico = new Set(allHistorico.map(h => h.carrera_id));

  // Solo procesar carreras que tienen resultado Y pronósticos Y NO están en histórico
  const raceIds = raceIdsConResult.filter(rid =>
    raceIdsConProns.includes(rid) && !raceIdsHistorico.has(rid)
  );

  const resMap = {};
  allResults.forEach(r => {
    if (!resMap[r.carrera_id]) resMap[r.carrera_id] = [];
    resMap[r.carrera_id].push(r);
  });

  raceIds.forEach(rid => {
    const res = resMap[rid];
    if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);

    const scores = participantes.map(p => ({
      id: p.id, nombre: p.nombre,
      raceScore: calcRaceScore(p.id, rid, arr)
    })).filter(p => p.raceScore !== null)
      .sort((a,b) => b.raceScore - a.raceScore);

    const withChamp = assignChampionshipPts(scores);
    withChamp.forEach(p => {
      totals[p.id].pts += p.champPts;
      totals[p.id].breakdown.push({ raceId: rid, raceScore: p.raceScore, champPts: p.champPts });
    });
  });

  return Object.values(totals).sort((a,b) => b.pts - a.pts);
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
  // Use the breakdown from calcGeneralRanking
  const allRankings = calcGeneralRanking();
  const mine = allRankings.find(p => p.id == pid);
  if (!mine || !mine.breakdown.length) {
    el.innerHTML = '<p style="padding:1rem;font-size:.8rem;color:var(--text3)">Sin pronósticos</p>';
    return;
  }
  const rows = mine.breakdown.sort((a,b)=>b.champPts-a.champPts);
  el.innerHTML = `<table class="detail-table">
    <thead><tr>
      <th>Carrera</th>
      <th style="text-align:right">Pts pronóst.</th>
      <th style="text-align:right">Pts campeon.</th>
    </tr></thead>
    <tbody>
      ${rows.map(r=>{
        const race = RACE_MAP[r.raceId];
        const cp = Number.isInteger(r.champPts) ? r.champPts : r.champPts.toFixed(1);
        return `<tr>
          <td>${race?.flag||''} ${race?.name||'?'}</td>
          <td class="${r.raceScore>50?'pt-ex':r.raceScore>20?'pt-cl':'pt-no'}">${r.raceScore}</td>
          <td class="${r.champPts>=25?'pt-ex':r.champPts>0?'pt-cl':'pt-no'}">${cp}</td>
        </tr>`;
      }).join('')}
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
      <div class="race-info-date">${race?.date?formatDate(race.start || race.date):''}</div></div>
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

  // Pre-compute championship pts per participant per race
  const champByRace = {}; // champByRace[pid][rid] = champPts
  raceIds.forEach(rid => {
    const res = resMap[rid];
    if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const scores = participantes.map(p => ({
      id: p.id, nombre: p.nombre,
      raceScore: calcRaceScore(p.id, rid, arr)
    })).filter(p => p.raceScore !== null).sort((a,b)=>b.raceScore-a.raceScore);
    const withChamp = assignChampionshipPts(scores);
    withChamp.forEach(p => {
      if (!champByRace[p.id]) champByRace[p.id] = {};
      champByRace[p.id][rid] = p.champPts;
    });
  });

  const datasets = sorted.slice(0,8).map((p,i)=>{
    const color = avatarColor(p.nombre);
    let cum = 0;
    const data = raceIds.map(rid=>{
      cum += (champByRace[p.id]?.[rid] || 0);
      return Math.round(cum * 10) / 10;
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

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('es-AR', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit', timeZoneName:'short' });
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
