// ═══════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://rtfqnjivqhaoxxdhjknw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WVf6X7MJUALMR9nACpDH1A_MYu0A_2d';
const ADMIN_PIN    = '1968';

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
];

const DRIVER_MAP = {};
DRIVERS.forEach(d => DRIVER_MAP[d.name] = d);

const RACES = [
  { id:1,  name:'Australia',      flag:'🇦🇺', start:'2026-03-08T05:00:00Z' },
  { id:2,  name:'China',          flag:'🇨🇳', start:'2026-03-22T07:00:00Z' },
  { id:3,  name:'Japón',          flag:'🇯🇵', start:null },
  { id:6,  name:'Miami',          flag:'🇺🇸', start:'2026-05-03T20:00:00Z' },
  { id:7,  name:'Canadá',         flag:'🇨🇦', start:'2026-05-24T20:00:00Z' },
  { id:8,  name:'Mónaco',         flag:'🇲🇨', start:'2026-06-07T13:00:00Z' },
  { id:9,  name:'España (Madrid)',flag:'🇪🇸', start:'2026-06-14T13:00:00Z' },
  { id:10, name:'Austria',        flag:'🇦🇹', start:'2026-06-28T13:00:00Z' },
  { id:11, name:'Gran Bretaña',   flag:'🇬🇧', start:'2026-07-05T14:00:00Z' },
  { id:12, name:'Bélgica',        flag:'🇧🇪', start:'2026-07-26T13:00:00Z' },
  { id:13, name:'Hungría',        flag:'🇭🇺', start:'2026-08-02T13:00:00Z' },
  { id:14, name:'Países Bajos',   flag:'🇳🇱', start:'2026-08-30T13:00:00Z' },
  { id:15, name:'Italia',         flag:'🇮🇹', start:'2026-09-06T13:00:00Z' },
  { id:16, name:'España (Barna)', flag:'🇪🇸', start:'2026-09-13T13:00:00Z' },
  { id:17, name:'Azerbaiyán',     flag:'🇦🇿', start:'2026-09-26T11:00:00Z' },
  { id:18, name:'Singapur',       flag:'🇸🇬', start:'2026-10-04T12:00:00Z' },
  { id:19, name:'Austin',         flag:'🇺🇸', start:'2026-10-18T19:00:00Z' },
  { id:20, name:'México',         flag:'🇲🇽', start:'2026-10-25T20:00:00Z' },
  { id:21, name:'Brasil',         flag:'🇧🇷', start:'2026-11-08T17:00:00Z' },
  { id:22, name:'Las Vegas',      flag:'🇺🇸', start:'2026-11-22T06:00:00Z' },
  { id:23, name:'Qatar',          flag:'🇶🇦', start:'2026-11-29T16:00:00Z' },
  { id:24, name:'Abu Dhabi',      flag:'🇦🇪', start:'2026-12-06T13:00:00Z' },
];

const RACE_MAP = {};
RACES.forEach(r => RACE_MAP[r.id] = r);

function isDeadlinePassed(raceId) {
  const race = RACE_MAP[raceId];
  if (!race || !race.start) return false;
  const deadline = new Date(new Date(race.start).getTime() - 60 * 60 * 1000);
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

function renderNameGrid() {
  document.getElementById('name-grid').innerHTML =
    participantes.map(p => `<button class="name-btn" onclick='enterAsUser(${JSON.stringify(p)})'>${p.nombre}</button>`).join('');
}

function enterAsUser(user) {
  currentUser = user;
  sessionStorage.setItem('f1_user', JSON.stringify(user));
  const idx = participantes.findIndex(p => p.id === user.id);
  const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  document.getElementById('user-avatar').style.background = color;
  document.getElementById('user-avatar').textContent = user.nombre.slice(0,2).toUpperCase();
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

function showTab(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
  document.getElementById(`tab-${name}`).classList.add('active');
  if (name === 'home')        renderHome();
  if (name === 'pronosticar') loadPronostico();
  if (name === 'ranking')     loadRanking();
  if (name === 'stats')       renderStats();
  if (name === 'resultado')   initAdmin();
}

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
  const target = new Date(next.start || now);
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hrs  = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const mins = Math.max(0, Math.floor((diff % 3600000) / 60000));
  document.getElementById('next-race-card').innerHTML = `
    <div class="next-race-card">
      <div class="nrc-inner">
        <div class="nrc-label">PRÓXIMA CARRERA</div>
        <div class="nrc-name">${next.name.toUpperCase()}</div>
        <div class="nrc-date">${formatDate(next.start || now)}</div>
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
  document.getElementById('home-ranking-preview').innerHTML = totals.slice(0,5).map((p,i) => {
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
    document.getElementById('home-recent-races').innerHTML = '<p class="text-muted" style="font-size:.85rem">Aún no hay carreras con resultado</p>';
    return;
  }
  document.getElementById('home-recent-races').innerHTML = raceIds.slice(-4).reverse().map(rid => {
    const race = RACE_MAP[rid];
    const winner = allResults.find(r => r.carrera_id === rid && r.posicion === 1);
    const myScore = getMyScoreForRace(rid);
    return `<div class="recent-race-item" onclick="openRaceModal(${rid})">
      <div class="rri-flag">${race?.flag||'🏁'}</div>
      <div><div class="rri-name">${race?.name||'Carrera'}</div>
      <div class="rri-winner">${winner ? '🏆 '+winner.piloto : ''}</div></div>
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
      <div><div class="race-info-name">${race.name.toUpperCase()}</div>
      <div class="race-info-date">${race.start ? formatDate(race.start) : ''}</div></div>
      <div class="race-deadline">${deadline ? '⛔ CERRADO' : deadlineText ? `Cierra: ${deadlineText}` : ''}</div>
    </div>`;
  const myProns = allProns.filter(p => p.participante_id === currentUser.id && p.carrera_id === raceId).sort((a,b)=>a.posicion-b.posicion);
  document.getElementById('pron-status').innerHTML = myProns.length
    ? `<div class="status-chip chip-ok">✓ Pronóstico guardado</div>`
    : `<div class="status-chip chip-no">Sin pronóstico aún</div>`;
  const picks = {};
  myProns.forEach(p => picks[p.posicion] = p.piloto);
  const resForRace = allResults.filter(r => r.carrera_id === raceId).sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
  document.getElementById('positions-list').innerHTML = Array.from({length:10},(_,i) => {
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
  if (isDeadlinePassed(raceId)) { toast('⛔ Pronóstico cerrado — la carrera está por empezar','err'); return; }
  for (let i=1;i<=10;i++) {
    const v = document.getElementById(`pron-${i}`).value;
    if (!v) { toast('Completá las 10 posiciones','err'); return; }
    picks.push(v);
  }
  if (new Set(picks).size !== 10) { toast('Hay pilotos repetidos','err'); return; }
  const otrosProns = participantes.filter(p => p.id !== currentUser.id).map(p => {
    const susProns = allProns.filter(pr => pr.participante_id === p.id && pr.carrera_id === raceId).sort((a,b) => a.posicion - b.posicion).map(pr => pr.piloto);
    return { nombre: p.nombre, prons: susProns };
  }).filter(p => p.prons.length === 10);
  const copia = otrosProns.find(p => p.prons.every((piloto, i) => piloto === picks[i]));
  if (copia) { toast(`⚠️ ${copia.nombre} ya pronosticó exactamente igual. Cambiá algo.`, 'err'); return; }
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'GUARDANDO...';
  await db.from('pronosticos').delete().eq('participante_id', currentUser.id).eq('carrera_id', raceId);
  const rows = picks.map((piloto,i) => ({ participante_id: currentUser.id, carrera_id: raceId, posicion: i+1, piloto }));
  const { error } = await db.from('pronosticos').insert(rows);
  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = 'GUARDAR PRONÓSTICO';
  if (error) { toast('Error al guardar','err'); return; }
  allProns = allProns.filter(p => !(p.participante_id === currentUser.id && p.carrera_id === raceId));
  allProns.push(...rows.map((r,i) => ({...r, id:'local-'+i})));
  toast('Pronóstico guardado 🏁','ok');
  document.getElementById('pron-status').innerHTML = `<div class="status-chip chip-ok">✓ Pronóstico guardado</div>`;
  showShareButton(raceId, picks);
}

let _sharePicks = [];
let _shareRaceId = null;

function showShareButton(raceId, picks) {
  _sharePicks = picks;
  _shareRaceId = raceId;
  const existing = document.getElementById('share-section');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'share-section';
  el.style.cssText = 'margin-bottom:1rem;';
  el.innerHTML = `<button class="btn-f1" style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.15);" onclick="generateShareImage(_shareRaceId, _sharePicks, this)">
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
    const scale=2, W=480, rowH=48, headerH=110, footerH=36;
    const H = headerH + picks.length * rowH + footerH;
    const canvas = document.createElement('canvas');
    canvas.width = W * scale; canvas.height = H * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#080808'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#E10600'; ctx.fillRect(0, 0, W, 4);
    ctx.fillStyle = '#E10600'; ctx.font = 'bold 9px Arial'; ctx.letterSpacing = '3px';
    ctx.fillText('PRONOSTICO F1 · 2026', 24, 26); ctx.letterSpacing = '0px';
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px Arial';
    ctx.fillText((race?.name || '').toUpperCase(), 24, 58);
    ctx.fillStyle = '#555'; ctx.font = '11px Arial'; ctx.fillText(dateStr, 24, 76);
    ctx.fillStyle = '#555'; ctx.font = '9px Arial'; ctx.textAlign = 'right';
    ctx.fillText('PRONOSTICADO POR', W - 24, 44);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 16px Arial';
    ctx.fillText(currentUser.nombre.toUpperCase(), W - 24, 64); ctx.textAlign = 'left';
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(24, headerH - 10); ctx.lineTo(W - 24, headerH - 10); ctx.stroke();
    picks.forEach((piloto, i) => {
      const pos = i + 1, d = DRIVER_MAP[piloto] || {}, color = d.color || '#444';
      const y = headerH + i * rowH;
      if (pos <= 3) { ctx.fillStyle = '#161616'; ctx.beginPath(); ctx.roundRect(16, y + 4, W - 32, rowH - 6, 4); ctx.fill(); }
      ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(16, y + 4, 3, rowH - 6, 2); ctx.fill();
      ctx.fillStyle = '#444'; ctx.font = 'bold 14px Arial'; ctx.textAlign = 'center';
      ctx.fillText(String(pos), 38, y + rowH/2 + 5); ctx.textAlign = 'left';
      ctx.fillStyle = '#f2f2f2'; ctx.font = 'bold 14px Arial'; ctx.fillText(piloto, 52, y + rowH/2 + 2);
      ctx.fillStyle = '#555'; ctx.font = '10px Arial'; ctx.fillText(d.team || '', 52, y + rowH/2 + 15);
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(W - 28, y + rowH/2, 4, 0, Math.PI * 2); ctx.fill();
    });
    const fy = headerH + picks.length * rowH + 8;
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(24, fy); ctx.lineTo(W - 24, fy); ctx.stroke();
    ctx.fillStyle = '#333'; ctx.font = '9px Arial';
    ctx.fillText('F1 BCU · f1bcu.com', 24, fy + 18);
    ctx.textAlign = 'right'; ctx.fillText('QUIEN GANA?', W - 24, fy + 18); ctx.textAlign = 'left';
    canvas.toBlob(async blob => {
      btn.disabled = false; btn.querySelector('.btn-text').textContent = 'COMPARTIR PRONOSTICO';
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
    btn.disabled = false; btn.querySelector('.btn-text').textContent = 'COMPARTIR PRONOSTICO';
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

function calcRaceExactos(participanteId, raceId, resArr) {
  const myP = allProns.filter(p => p.participante_id === participanteId && p.carrera_id === raceId);
  return myP.reduce((sum, pr) => {
    const ri = resArr.indexOf(pr.piloto);
    return sum + (ri !== -1 && Math.abs((pr.posicion-1)-ri) === 0 ? 1 : 0);
  }, 0);
}

function assignChampionshipPts(scores) {
  // scores sorted desc by raceScore, each entry has { id, nombre, raceScore, exactos }
  // tiebreak: more exactos wins; if same exactos → share (average)
  const result = [];
  let i = 0;
  while (i < scores.length) {
    const val = scores[i].raceScore;
    if (val === null) { result.push({ ...scores[i], champPts: 0 }); i++; continue; }
    let j = i;
    while (j < scores.length && scores[j].raceScore === val) j++;
    const tiedGroup = scores.slice(i, j);
    const ptsValidos = Array.from({length: j-i}, (_,k) => (i+k) < PTS_SCALE.length ? PTS_SCALE[i+k] : 0);
    if (tiedGroup.length === 1) {
      result.push({ ...tiedGroup[0], champPts: ptsValidos[0] });
    } else {
      const exactosCounts = tiedGroup.map(s => s.exactos || 0);
      const allSameExactos = exactosCounts.every(e => e === exactosCounts[0]);
      if (allSameExactos) {
        // todos igual exactos → promedio
        const avg = ptsValidos.reduce((s,p)=>s+p,0) / ptsValidos.length;
        tiedGroup.forEach(s => result.push({ ...s, champPts: avg }));
      } else {
        // distintos exactos → ordenar por exactos desc, asignar posiciones
        const sorted = [...tiedGroup].sort((a,b) => (b.exactos||0) - (a.exactos||0));
        let si = 0;
        while (si < sorted.length) {
          let sj = si;
          const eVal = sorted[si].exactos || 0;
          while (sj < sorted.length && (sorted[sj].exactos||0) === eVal) sj++;
          const subPts = ptsValidos.slice(si, sj);
          const subAvg = subPts.reduce((s,p)=>s+p,0) / subPts.length;
          for (let sk = si; sk < sj; sk++) result.push({ ...sorted[sk], champPts: subAvg });
          si = sj;
        }
      }
    }
    i = j;
  }
  return result;
}

function calcGeneralRanking() {
  const totals = {};
  participantes.forEach(p => totals[p.id] = { id:p.id, nombre:p.nombre, pts:0, breakdown:[] });
  allHistorico.forEach(h => {
    if (!totals[h.participante_id]) return;
    totals[h.participante_id].pts += Number(h.pts_campeonato);
    totals[h.participante_id].breakdown.push({ raceId: h.carrera_id, raceScore: h.pts_carrera, champPts: Number(h.pts_campeonato), historico: true });
  });
  const raceIdsConProns = [...new Set(allProns.map(p => p.carrera_id))];
  const raceIdsConResult = [...new Set(allResults.map(r => r.carrera_id))];
  const raceIdsHistorico = new Set(allHistorico.map(h => h.carrera_id));
  const raceIds = raceIdsConResult.filter(rid => raceIdsConProns.includes(rid) && !raceIdsHistorico.has(rid));
  const resMap = {};
  allResults.forEach(r => { if (!resMap[r.carrera_id]) resMap[r.carrera_id] = []; resMap[r.carrera_id].push(r); });
  raceIds.forEach(rid => {
    const res = resMap[rid];
    if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const scores = participantes.map(p => ({
      id: p.id, nombre: p.nombre,
      raceScore: calcRaceScore(p.id, rid, arr),
      exactos: calcRaceExactos(p.id, rid, arr)
    })).filter(p => p.raceScore !== null).sort((a,b) => b.raceScore - a.raceScore);
    assignChampionshipPts(scores).forEach(p => {
      totals[p.id].pts += p.champPts;
      totals[p.id].breakdown.push({ raceId: rid, raceScore: p.raceScore, champPts: p.champPts, exactos: p.exactos });
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
  const [first,second,third,...rest] = sorted;

  // CAMBIO 2: margin-top en podio para separarlo del toggle
  let html = `<div class="podium" style="margin-top:1.5rem;">`;
  if (second) html += podiumSlot(second,'p2','2');
  if (first)  html += podiumSlot(first,'p1','1');
  if (third)  html += podiumSlot(third,'p3','3');
  html += `</div>`;

  // CAMBIO 1: podio también tiene detail expandible
  html += `<div class="rank-list" style="margin-top:.5rem;">`;
  if (second) html += podiumDetailRow(second);
  if (first)  html += podiumDetailRow(first);
  if (third)  html += podiumDetailRow(third);
  rest.forEach((p,i) => { html += rankRow(p, i+4); });
  html += `</div>`;
  body.innerHTML = html;
  document.getElementById('chart-section').style.display = 'block';
  renderEvoChart(sorted);
}

function podiumDetailRow(p) {
  return `<div class="rank-detail" id="rd-${p.id}">
    <div style="padding:.5rem"><div class="loader">Cargando...</div></div>
  </div>`;
}

function podiumSlot(p, cls, label) {
  const color = avatarColor(p.nombre);
  // CAMBIO 1: podium slot clickeable
  return `<div class="podium-slot ${cls}" onclick="toggleRankDetail('rd-${p.id}')" style="cursor:pointer" id="rr-${p.id}">
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
  const allRankings = calcGeneralRanking();
  const mine = allRankings.find(p => p.id == pid);
  if (!mine || !mine.breakdown.length) {
    el.innerHTML = '<p style="padding:1rem;font-size:.8rem;color:var(--text3)">Sin pronósticos</p>';
    return;
  }

  // Calcular posición en el ranking de cada carrera para mostrar medalla
  // CAMBIO 3: agregar posición en la carrera con medalla
  const raceRankings = {}; // raceId -> sorted array of {id, champPts}
  const resMap = {};
  allResults.forEach(r => { if (!resMap[r.carrera_id]) resMap[r.carrera_id] = []; resMap[r.carrera_id].push(r); });

  const rows = mine.breakdown.sort((a,b)=>b.champPts-a.champPts);

  // Para cada carrera, calcular en qué posición quedó
  const posicionPorCarrera = {};
  const raceIdsConResult = [...new Set(allResults.map(r => r.carrera_id))];
  raceIdsConResult.forEach(rid => {
    const res = resMap[rid];
    if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const scores = participantes.map(p => ({ id: p.id, raceScore: calcRaceScore(p.id, rid, arr) }))
      .filter(p => p.raceScore !== null).sort((a,b) => b.raceScore - a.raceScore);
    scores.forEach((s, i) => { if (s.id == pid) posicionPorCarrera[rid] = i + 1; });
  });
  // También para históricas
  allHistorico.filter(h => h.participante_id == pid).forEach(h => {
    // Calcular posición en la carrera histórica
    const allInRace = allHistorico.filter(x => x.carrera_id === h.carrera_id).sort((a,b) => Number(b.pts_carrera) - Number(a.pts_carrera));
    const pos = allInRace.findIndex(x => x.participante_id == pid) + 1;
    posicionPorCarrera[h.carrera_id] = pos;
  });

  el.innerHTML = `<table class="detail-table">
    <thead><tr>
      <th>Carrera</th>
      <th style="text-align:center">Pos.</th>
      <th style="text-align:right">Pts pronóst.</th>
      <th style="text-align:right">Pts campeon.</th>
    </tr></thead>
    <tbody>
      ${rows.map(r=>{
        const race = RACE_MAP[r.raceId];
        const cp = Number.isInteger(r.champPts) ? r.champPts : r.champPts.toFixed(1);
        const pos = posicionPorCarrera[r.raceId];
        const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos ? `${pos}°` : '—';
        return `<tr>
          <td>${race?.flag||''} ${race?.name||'?'}</td>
          <td style="text-align:center">${medal}</td>
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
      <div class="race-info-date">${race?.start?formatDate(race.start):''}</div></div>
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
                <td>${d.pred}</td><td>${d.piloto}</td><td>${d.real}</td>
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
  allResults.forEach(r=>{ if(!resMap[r.carrera_id]) resMap[r.carrera_id]=[]; resMap[r.carrera_id].push(r); });
  const champByRace = {};
  raceIds.forEach(rid => {
    const res = resMap[rid]; if (!res) return;
    const arr = res.sort((a,b)=>a.posicion-b.posicion).map(r=>r.piloto);
    const scores = participantes.map(p => ({
      id: p.id, nombre: p.nombre,
      raceScore: calcRaceScore(p.id, rid, arr),
      exactos: calcRaceExactos(p.id, rid, arr)
    })).filter(p => p.raceScore !== null).sort((a,b)=>b.raceScore-a.raceScore);
    assignChampionshipPts(scores).forEach(p => {
      if (!champByRace[p.id]) champByRace[p.id] = {};
      champByRace[p.id][rid] = p.champPts;
    });
  });
  const datasets = sorted.slice(0,8).map(p => {
    const color = avatarColor(p.nombre);
    let cum = 0;
    const data = raceIds.map(rid=>{ cum += (champByRace[p.id]?.[rid] || 0); return Math.round(cum * 10) / 10; });
    return { label:p.nombre, data, borderColor:color, backgroundColor:color+'22', tension:.4, fill:false, pointRadius:4, pointHoverRadius:6, borderWidth:2 };
  });
  const ctx = document.getElementById('evo-chart');
  if (!ctx) return;
  if (evoChart) evoChart.destroy();
  evoChart = new Chart(ctx, {
    type: 'line', data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color:'#aaa', font:{ family:'Barlow Condensed', size:11 }, boxWidth:12, padding:10 } } },
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
  if (adminUnlocked) { showAdminPanel(); return; }
  document.getElementById('admin-gate').style.display  = 'block';
  document.getElementById('admin-panel').style.display = 'none';
  document.querySelectorAll('.pin-box').forEach(el=>el.value='');
  document.getElementById('pin-err').textContent='';
  setTimeout(()=>document.querySelector('.pin-box').focus(),100);
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
  if (e.key==='Backspace' && !e.target.value && idx>0) document.querySelectorAll('.pin-box')[idx-1].focus();
}
function checkPin() {
  const pin = Array.from(document.querySelectorAll('.pin-box')).map(d=>d.value).join('');
  if (pin.length<4) return;
  if (pin===ADMIN_PIN) { adminUnlocked = true; showAdminPanel(); }
  else {
    document.getElementById('pin-err').textContent='PIN incorrecto';
    document.querySelectorAll('.pin-box').forEach(d=>d.value='');
    document.querySelector('.pin-box').focus();
  }
}

function loadAdminResult() {
  const raceId = parseInt(document.getElementById('race-select-admin').value);
  const picks = {};
  allResults.filter(r=>r.carrera_id===raceId).forEach(r=>picks[r.posicion]=r.piloto);
  document.getElementById('admin-pos-list').innerHTML = Array.from({length:10},(_,i)=>{
    const pos=i+1, cls=pos===1?'p1':pos===2?'p2':pos===3?'p3':'', sel=picks[pos]||'', d=DRIVER_MAP[sel];
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
  document.getElementById(`abar-${pos}`).style.background=DRIVER_MAP[val]?.color||'transparent';
}

async function saveResultado() {
  const raceId = parseInt(document.getElementById('race-select-admin').value);
  const btn = document.getElementById('btn-save-res');
  const picks = [];
  for (let i=1;i<=10;i++){
    const v=document.getElementById(`ares-${i}`).value;
    if(!v){toast('Completá las 10 posiciones','err');return;}
    picks.push(v);
  }
  if(new Set(picks).size!==10){toast('Hay pilotos repetidos','err');return;}
  btn.disabled=true; btn.querySelector('.btn-text').textContent='GUARDANDO...';
  await db.from('resultados').delete().eq('carrera_id',raceId);
  const rows=picks.map((piloto,i)=>({carrera_id:raceId,posicion:i+1,piloto}));
  const {error}=await db.from('resultados').insert(rows);
  btn.disabled=false; btn.querySelector('.btn-text').textContent='GUARDAR RESULTADO';
  if(error){toast('Error al guardar','err');return;}
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
  </div><div style="display:flex;flex-direction:column;gap:4px">`;
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
//  ESTADÍSTICAS
// ═══════════════════════════════════════════════════
function renderStats() {
  const body = document.getElementById('tab-stats');
  if (!allResults.length) {
    body.innerHTML = '<div class="pane-inner"><div class="empty-state"><div class="ei">📊</div><p>Sin datos aún</p></div></div>';
    return;
  }
  const raceIds = [...new Set(allResults.map(r => r.carrera_id))];
  const resMap = {};
  allResults.forEach(r => { if (!resMap[r.carrera_id]) resMap[r.carrera_id] = []; resMap[r.carrera_id].push(r); });
  const statsByParticipant = {};
  participantes.forEach(p => { statsByParticipant[p.id] = { nombre: p.nombre, carreras: [], totalExactos: 0, pilotosFav: {} }; });
  const carreraStats = [];
  raceIds.forEach(rid => {
    const res = resMap[rid]?.sort((a,b) => a.posicion - b.posicion) || [];
    const resArr = res.map(r => r.piloto);
    const race = RACE_MAP[rid];
    const scores = [];
    participantes.forEach(p => {
      const myP = allProns.filter(pr => pr.participante_id === p.id && pr.carrera_id === rid).sort((a,b) => a.posicion - b.posicion);
      if (!myP.length) return;
      let pts = 0, exactos = 0;
      myP.forEach(pr => {
        const ri = resArr.indexOf(pr.piloto);
        if (ri === -1) return;
        const diff = Math.abs((pr.posicion - 1) - ri);
        const p2 = diff < PTS_SCALE.length ? PTS_SCALE[diff] : 0;
        pts += p2;
        if (diff === 0) exactos++;
        if (pr.posicion === 1) statsByParticipant[p.id].pilotosFav[pr.piloto] = (statsByParticipant[p.id].pilotosFav[pr.piloto] || 0) + 1;
      });
      statsByParticipant[p.id].carreras.push({ raceId: rid, pts, exactos });
      statsByParticipant[p.id].totalExactos += exactos;
      scores.push({ id: p.id, nombre: p.nombre, pts, exactos });
    });
    carreraStats.push({ raceId: rid, nombre: race?.name || rid, flag: race?.flag || '', scores });
  });
  let maxPtsCarrera = { pts: 0, nombre: '', carrera: '' };
  let maxExactosCarrera = { exactos: 0, nombre: '', carrera: '' };
  let maxExactosTotales = { exactos: 0, nombre: '' };
  let pilotoMasAcertado = {};
  let pilotoMasDificil = {};
  let mejorRacha = { racha: 0, nombre: '' };
  allProns.forEach(pr => {
    const res = resMap[pr.carrera_id]; if (!res) return;
    const resArr = res.sort((a,b) => a.posicion - b.posicion).map(r => r.piloto);
    const ri = resArr.indexOf(pr.piloto); if (ri === -1) return;
    const diff = Math.abs((pr.posicion - 1) - ri);
    if (diff === 0) pilotoMasAcertado[pr.piloto] = (pilotoMasAcertado[pr.piloto] || 0) + 1;
    pilotoMasDificil[pr.piloto] = pilotoMasDificil[pr.piloto] || { intentos: 0, exactos: 0 };
    pilotoMasDificil[pr.piloto].intentos++;
    if (diff === 0) pilotoMasDificil[pr.piloto].exactos++;
  });
  participantes.forEach(p => {
    const sp = statsByParticipant[p.id]; if (!sp.carreras.length) return;
    sp.carreras.forEach(c => {
      if (c.pts > maxPtsCarrera.pts) maxPtsCarrera = { pts: c.pts, nombre: p.nombre, carrera: RACE_MAP[c.raceId]?.name || '' };
      if (c.exactos > maxExactosCarrera.exactos) maxExactosCarrera = { exactos: c.exactos, nombre: p.nombre, carrera: RACE_MAP[c.raceId]?.name || '' };
    });
    if (sp.totalExactos > maxExactosTotales.exactos) maxExactosTotales = { exactos: sp.totalExactos, nombre: p.nombre };
    let racha = 0, maxR = 0;
    sp.carreras.forEach(c => { if (c.pts > 0) { racha++; maxR = Math.max(maxR, racha); } else racha = 0; });
    if (maxR > mejorRacha.racha) mejorRacha = { racha: maxR, nombre: p.nombre };
  });
  const topPiloto = Object.entries(pilotoMasAcertado).sort((a,b) => b[1] - a[1])[0];
  const difPiloto = Object.entries(pilotoMasDificil).filter(([,v]) => v.intentos >= 3).sort((a,b) => (a[1].exactos/a[1].intentos) - (b[1].exactos/b[1].intentos))[0];
  const favoritosPorPersona = participantes.map(p => {
    const favs = statsByParticipant[p.id]?.pilotosFav || {};
    const top = Object.entries(favs).sort((a,b) => b[1] - a[1])[0];
    return { nombre: p.nombre, piloto: top?.[0] || '—', veces: top?.[1] || 0 };
  }).filter(p => p.piloto !== '—');
  const mejorCarreraPorPersona = participantes.map(p => {
    const sp = statsByParticipant[p.id]; if (!sp?.carreras.length) return null;
    const best = sp.carreras.reduce((a,b) => b.pts > a.pts ? b : a);
    return { nombre: p.nombre, pts: best.pts, carrera: RACE_MAP[best.raceId]?.name || '?', flag: RACE_MAP[best.raceId]?.flag || '' };
  }).filter(Boolean).sort((a,b) => b.pts - a.pts);
  const exactosRanking = participantes.map(p => ({ nombre: p.nombre, exactos: statsByParticipant[p.id]?.totalExactos || 0 })).sort((a,b) => b.exactos - a.exactos).filter(p => p.exactos > 0);
  const maxExactos = exactosRanking[0]?.exactos || 1;
  const promedioRanking = participantes.map(p => {
    const sp = statsByParticipant[p.id]; if (!sp?.carreras.length) return null;
    const avg = sp.carreras.reduce((s,c) => s + c.pts, 0) / sp.carreras.length;
    return { nombre: p.nombre, avg: Math.round(avg * 10) / 10 };
  }).filter(Boolean).sort((a,b) => b.avg - a.avg);
  const maxAvg = promedioRanking[0]?.avg || 1;
  let carreraMasPareja = { diff: 9999, nombre: '', flag: '' };
  carreraStats.forEach(cs => {
    if (cs.scores.length < 2) return;
    const sorted = cs.scores.sort((a,b) => b.pts - a.pts);
    const diff = sorted[0].pts - sorted[sorted.length-1].pts;
    if (diff < carreraMasPareja.diff) carreraMasPareja = { diff, nombre: cs.nombre, flag: cs.flag };
  });

  body.innerHTML = `<div class="pane-inner" id="stats-inner">
    <h2 class="section-title">RÉCORDS</h2>
    <div class="stats-records-grid">
      <div class="stat-record-card"><div class="src-icon">🏆</div><div class="src-value">${maxPtsCarrera.pts}</div><div class="src-label">pts en una carrera</div><div class="src-who">${maxPtsCarrera.nombre} — ${maxPtsCarrera.carrera}</div></div>
      <div class="stat-record-card"><div class="src-icon">🎯</div><div class="src-value">${maxExactosCarrera.exactos}</div><div class="src-label">exactos en una carrera</div><div class="src-who">${maxExactosCarrera.nombre} — ${maxExactosCarrera.carrera}</div></div>
      <div class="stat-record-card"><div class="src-icon">⭐</div><div class="src-value">${maxExactosTotales.exactos}</div><div class="src-label">exactos en la temporada</div><div class="src-who">${maxExactosTotales.nombre}</div></div>
      <div class="stat-record-card"><div class="src-icon">🔥</div><div class="src-value">${mejorRacha.racha}</div><div class="src-label">carreras seguidas puntuando</div><div class="src-who">${mejorRacha.nombre}</div></div>
      ${topPiloto ? `<div class="stat-record-card"><div class="src-icon">✅</div><div class="src-value">${topPiloto[1]}x</div><div class="src-label">piloto más acertado</div><div class="src-who">${topPiloto[0]}</div></div>` : ''}
      ${difPiloto ? `<div class="stat-record-card"><div class="src-icon">😤</div><div class="src-value">${difPiloto[0]}</div><div class="src-label">más difícil de acertar</div><div class="src-who">${difPiloto[1].exactos}/${difPiloto[1].intentos} exactos</div></div>` : ''}
      <div class="stat-record-card"><div class="src-icon">🤝</div><div class="src-value">${carreraMasPareja.flag} ${carreraMasPareja.nombre}</div><div class="src-label">carrera más pareja</div><div class="src-who">diferencia de ${carreraMasPareja.diff} pts</div></div>
    </div>
    <h2 class="section-title" style="margin-top:2rem">EXACTOS EN LA TEMPORADA</h2>
    <div class="stats-bar-list">
      ${exactosRanking.map(p => `<div class="stats-bar-row"><div class="sbr-name">${p.nombre}</div><div class="sbr-bar-wrap"><div class="sbr-bar" style="width:${Math.round(p.exactos/maxExactos*100)}%;background:#E10600"></div></div><div class="sbr-val">${p.exactos}</div></div>`).join('')}
    </div>
    <h2 class="section-title" style="margin-top:2rem">PROMEDIO DE PTS POR CARRERA</h2>
    <div class="stats-bar-list">
      ${promedioRanking.map(p => `<div class="stats-bar-row"><div class="sbr-name">${p.nombre}</div><div class="sbr-bar-wrap"><div class="sbr-bar" style="width:${Math.round(p.avg/maxAvg*100)}%;background:#00D2BE"></div></div><div class="sbr-val">${p.avg}</div></div>`).join('')}
    </div>
    <h2 class="section-title" style="margin-top:2rem">MEJOR CARRERA DE CADA UNO</h2>
    <div class="stats-best-grid">
      ${mejorCarreraPorPersona.map(p => `<div class="stats-best-card"><div class="sbc-name">${p.nombre}</div><div class="sbc-race">${p.flag} ${p.carrera}</div><div class="sbc-pts">${p.pts}<span>pts</span></div></div>`).join('')}
    </div>
    <h2 class="section-title" style="margin-top:2rem">PILOTO FAVORITO DE CADA UNO</h2>
    <div class="stats-fav-grid">
      ${favoritosPorPersona.map(p => { const d = DRIVER_MAP[p.piloto] || {}; return `<div class="stats-fav-card" style="border-left:3px solid ${d.color||'#444'}"><div class="sfc-name">${p.nombre}</div><div class="sfc-piloto">${p.piloto}</div><div class="sfc-team">${d.team||''}</div><div class="sfc-veces">${p.veces}x en P1</div></div>`; }).join('')}
    </div>
    <div id="stats-chart-section" style="margin-top:2rem">
      <h2 class="section-title">PTS POR CARRERA — TODOS</h2>
      <div class="chart-wrap"><canvas id="stats-chart"></canvas></div>
    </div>
  </div>`;

  renderStatsChart(carreraStats);
}

function renderStatsChart(carreraStats) {
  const ctx = document.getElementById('stats-chart');
  if (!ctx) return;
  const labels = carreraStats.map(c => c.flag + ' ' + c.nombre.slice(0,3).toUpperCase());
  const datasets = participantes.map(p => {
    const color = avatarColor(p.nombre);
    const data = carreraStats.map(cs => { const s = cs.scores.find(s => s.id === p.id); return s ? s.pts : null; });
    return { label: p.nombre, data, borderColor: color, backgroundColor: color + '33', tension: 0.3, fill: false, pointRadius: 4, pointHoverRadius: 6, borderWidth: 2, spanGaps: true };
  });
  if (window._statsChart) window._statsChart.destroy();
  window._statsChart = new Chart(ctx, {
    type: 'bar', data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#aaa', font: { family: 'Barlow Condensed', size: 10 }, boxWidth: 10, padding: 8 } } },
      scales: {
        x: { ticks: { color: '#666', font: { family: 'Barlow Condensed', size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#666', font: { family: 'Barlow Condensed', size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

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

init();
