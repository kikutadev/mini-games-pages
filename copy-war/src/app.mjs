import { STAGES } from './progression.mjs';
import {
  SIZE, TYPES, createBattle, updateBattle, findCopyTarget, copyEnemy, previewCopyLocation,
} from './core.mjs';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d', { alpha: false });
const arena = document.querySelector('#arena-wrap');
const overlay = document.querySelector('#overlay');
const button = document.querySelector('#start');
const timeText = document.querySelector('#time');
const allyHealth = document.querySelector('#ally-health');
const enemyHealth = document.querySelector('#enemy-health');
const blueCount = document.querySelector('#blue-count');
const redCount = document.querySelector('#red-count');
const toast = document.querySelector('#toast');
const instruction = document.querySelector('#instruction');
const subInstruction = document.querySelector('#sub-instruction');
const cancelButton = document.querySelector('#cancel');
const ROLE_HINTS = Object.freeze({
  sword:'高速近接戦・前衛の穴埋め',
  archer:'出現時に三連矢・飛行兵に強い',
  guardian:'着地衝撃で地上の敵を吹き飛ばす',
  mage:'出現時に範囲魔法・集団と飛行兵に強い',
  healer:'出現と同時に味方をまとめて回復',
  titan:'巨大地震で敵陣を一気に制圧',
  raider:'出現直後に敵の背後へ突進',
  flier:'飛行しながら後衛を攻撃',
});

let battle = createBattle();
let running = false;
let lastTime = 0;
let uiTime = -1;
let drag = null;
let pendingSourceId = null;
let hovered = null;
let toastDeadline = 0;
let audio = null;
let shake = 0;
let slowFrames = 0;

/** Unlock the game sounds only after a deliberate player gesture. */
function unlockAudio() {
  if (!audio) {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (Audio) audio = new Audio();
  }
  if (audio?.state === 'suspended') audio.resume().catch(() => {});
}

/** Play a short oscillator with an attack/decrease envelope for arcade feedback. */
function beep(hz, length, volume = .04, waveform = 'sine', pitchEnd = 1) {
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;
  osc.type = waveform;
  osc.frequency.setValueAtTime(hz, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(30, hz * pitchEnd), now + length);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(.0001, now + length);
  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + length);
}

/** Convert CSS-scaled pointer coordinates into the fixed arena coordinate system. */
function toWorld(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width * SIZE.width,
    y: (event.clientY - rect.top) / rect.height * SIZE.height + battle.cameraY,
  };
}

/** Keep transient contextual copy prompts visible but outside the battle flow. */
function notify(message, seconds = 1.6) {
  toast.textContent = message;
  toastDeadline = performance.now() + seconds * 1000;
  toast.classList.add('show');
}

/** Reset the scene and begin the autonomous fight without a separate tutorial level. */
function start() {
  unlockAudio();
  battle = createBattle(Math.floor(Math.random() * 10000) + 1);
  running = true;
  drag = null;
  pendingSourceId = null;
  hovered = null;
  overlay.hidden = true;
  lastTime = performance.now();
  uiTime = -1;
  updateHud(true);
  notify('巨兵を掴んで下へドラッグ！味方が増える', 3.5);
  beep(350, .12, .06, 'triangle', 1.6);
}

/** End the fight with the achieved result and immediately available retry. */
function finish() {
  running = false;
  pendingSourceId = null;
  drag = null;
  const won = battle.result === 'won';
  document.querySelector('#overlay-title').innerHTML = won
    ? '敵の拠点を<br><em>制圧した！</em>'
    : '進軍失敗…<br><em>再挑戦しよう。</em>';
  document.querySelector('#overlay-description').innerHTML =
    '突破 ' + battle.secured.length + '/3　／　コピー ' + battle.copied + '体<br>' +
    (won ? '奪った戦力で、敵の軍勢を上回った。' : '敵の強さを、もっと味方に取り込もう。');
  button.innerHTML = 'もう一度プレイ <span>→</span>';
  overlay.hidden = false;
  beep(won ? 540 : 150, .42, .09, 'sawtooth', won ? 2 : .3);
}

/** Reflect the actual teams' size, gates and remaining time in a compact header. */
function updateHud(force = false) {
  const stamp = Math.floor(battle.time * 10);
  if (stamp === uiTime && !force) return;
  uiTime = stamp;
  timeText.textContent = Math.max(0, Math.ceil(battle.timeLimit - battle.time));
  document.querySelector('#red-label').textContent = `防衛線 ${battle.stage+1}/${STAGES.length}・${STAGES[battle.stage].name}`;
  document.querySelector('#stage-progress').style.width = `${(battle.secured.length / STAGES.length) * 100}%`;
  const alliedUnits = battle.units.filter(u => u.side === 'blue').length;
  allyHealth.style.width = battle.commandMorale + '%';
  allyHealth.classList.toggle('low', battle.commandMorale < 30);
  enemyHealth.style.width = Math.max(0, battle.gateRed.hp / battle.gateRed.maxHp * 100) + '%';
  blueCount.textContent = alliedUnits + '体';
  redCount.textContent = battle.units.filter(u => u.side === 'red').length + '体';

  const carrying = pendingSourceId !== null || !!drag;
  cancelButton.hidden = !carrying;
  const unit = pendingSourceId ? battle.units.find(u => u.id === pendingSourceId) :
    drag ? battle.units.find(u => u.id === drag.unitId) : null;
  instruction.textContent = carrying && unit
    ? TYPES[unit.type].label + 'の味方を好きな場所に置く'
    : '赤い敵をつかんで、味方側へ引っ張る';
  subInstruction.textContent = carrying && unit
    ? ROLE_HINTS[unit.type]
    : battle.commandMorale < 30
      ? '前線が崩壊寸前！ 敵をコピーして立て直そう。'
      : '強敵もボスもコピー可能。配置で戦況を変えよう。';
}

/** Consume events from the combat system and map them to sound and visual feedback. */
function handleEvents() {
  for (const event of battle.events.splice(0)) {
    if (event.kind === 'clone') {
      beep(event.type === 'titan' ? 160 : 460, .21, .06, 'triangle', 2.25);
      notify(TYPES[event.type].label + 'が味方になった！', 1.0);
    } else if (event.kind === 'burst-heal') {
      beep(650, .21, .055, 'sine', 1.7);
    } else if (event.kind === 'morale-low') {
      notify('劣勢！ 強い敵をコピーして立て直そう', 2.2);
      beep(190, .4, .05, 'triangle', .65);
    } else if (event.kind === 'volley') {
      beep(730, .1, .03, 'triangle', .7);
    } else if (event.kind === 'slam') {
      beep(event.side === 'blue' ? 125 : 100, .19, .07, 'sawtooth', .42);
      shake = Math.min(6, shake + (event.power >= 70 ? 3.7 : 2.2));
    } else if (event.kind === 'boss') {
      notify('巨神出現！ このボスもコピーできる', 3.2);
      beep(115, .5, .1, 'sawtooth', 1.5);
    } else if (event.kind === 'checkpoint') {
      notify(`突破！ 次は ${event.label}`, 3.3);
      beep(460, .52, .08, 'triangle', 2.1);
    } else if (event.kind === 'wave' && event.wave > 3) {
      notify('敵の援軍が到着！', 1.3);
    } else if (event.kind === 'titan-down') {
      shake = 5;
      beep(82, .34, .09, 'sawtooth', .28);
    }
  }
}

/** Execute a drag-copy while preserving original enemies and their combat behavior. */
function attemptCopy(sourceId, x, y) {
  const result = copyEnemy(battle, sourceId, x, y);
  if (result.ok) {
    handleEvents();
    slowFrames = 10;
    shake = Math.max(shake, result.unit.radius >= 20 ? 3.5 : 1.5);
    pendingSourceId = null;
    return true;
  }
  notify(result.reason === 'blocked' ? '拠点の真上には配置できません'
    : result.reason === 'limit' ? '戦場がいっぱいです'
    : 'もう一度敵をつかんでください', 1.5);
  pendingSourceId = null;
  return false;
}

/** Start dragging an enemy or complete tap-to-select then tap-to-place fallback. */
canvas.addEventListener('pointerdown', event => {
  if (!running || event.isPrimary === false) return;
  event.preventDefault();
  const pt = toWorld(event);
  if (pendingSourceId !== null) {
    const clicked = findCopyTarget(battle, pt.x, pt.y);
    if (clicked) {
      // A selected source must never block the direct gesture on another enemy.
      pendingSourceId = null;
      drag = { unitId: clicked.id, start: pt, position: pt, begun: performance.now() };
      hovered = pt;
      canvas.setPointerCapture(event.pointerId);
    } else {
      attemptCopy(pendingSourceId, pt.x, pt.y);
    }
    updateHud(true);
    return;
  }
  const unit = findCopyTarget(battle, pt.x, pt.y);
  if (!unit) {
    notify('赤い敵を指でつかもう', 1.1);
    return;
  }
  drag = { unitId: unit.id, start: pt, position: pt, begun: performance.now() };
  hovered = pt;
  canvas.setPointerCapture(event.pointerId);
  updateHud(true);
});
canvas.addEventListener('pointermove', event => {
  if (!running) return;
  hovered = toWorld(event);
  if (drag) drag.position = hovered;
});
canvas.addEventListener('pointerup', event => {
  if (!running || !drag) return;
  const pt = toWorld(event);
  const source = drag.unitId;
  const moved = Math.hypot(pt.x - drag.start.x, pt.y - drag.start.y);
  drag = null;
  if (moved >= 24) attemptCopy(source, pt.x, pt.y);
  else {
    pendingSourceId = source;
    notify('置きたい場所をタップすると味方になる', 2.4);
  }
  hovered = pt;
  updateHud(true);
});
canvas.addEventListener('pointercancel', () => { drag = null; hovered = null; updateHud(true); });
canvas.addEventListener('contextmenu', e => e.preventDefault());
cancelButton.addEventListener('click', () => {
  drag = null; pendingSourceId = null; hovered = null;
  updateHud(true);
});
button.addEventListener('click', start);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { drag = null; pendingSourceId = null; updateHud(true); }
  if ((e.key === 'Enter' || e.key === ' ') && !running) { e.preventDefault(); start(); }
});
document.addEventListener('visibilitychange', () => { lastTime = performance.now(); });

/** Draw a blurred ground vignette and lane markers for battlefield geography. */
function drawTerrain(t) {
  const g = ctx.createLinearGradient(0, 0, 0, SIZE.height);
  g.addColorStop(0, '#463b4a'); g.addColorStop(.32, '#38434c');
  g.addColorStop(.65, '#344b52'); g.addColorStop(1, '#2b4e59');
  ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE.width, SIZE.height);

  ctx.fillStyle = 'rgba(10,22,32,.17)';
  ctx.beginPath(); ctx.ellipse(180, 300, 165, 235, 0, 0, Math.PI * 2); ctx.fill();

  for (let col = 0; col < 12; col++) {
    for (let row = -1; row < 20; row++) {
      const x = col * 35 + (row % 2) * 16;
      const y = row * 35 + 9 - (battle.cameraY % 35);
      ctx.strokeStyle = row < 9 ? '#ffc1a20d' : '#9be9fa0a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, 33, 33);
    }
  }
  // Two subdued flanking roads make unit depth and formations legible.
  ctx.fillStyle = 'rgba(19,26,34,.12)';
  ctx.fillRect(52, 62, 55, 471);ctx.fillRect(253, 62, 55, 471);
  ctx.strokeStyle = '#e4d7bc1e';ctx.lineWidth = 2;ctx.setLineDash([7, 15]);
  for (const x of [78, 280]) {
    ctx.beginPath();ctx.moveTo(x, 89);ctx.lineTo(x, 515);ctx.stroke();
  }
  ctx.setLineDash([]);

  for (let i = 0; i < 29; i++) {
    const x = (i * 97 + 49) % 351;
    const y = ((i * 127 + 39 - Math.floor(battle.cameraY * .67)) % 556 + 556) % 556 + 20;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(252,214,167,.14)' : 'rgba(15,29,39,.23)';
    ctx.save();ctx.translate(x, y);ctx.rotate(i * .79);
    ctx.fillRect(-3, -2, 9, 4);ctx.restore();
  }
  ctx.fillStyle = 'rgba(236,122,105,.055)';
  ctx.fillRect(0, 0, SIZE.width, 100);
  ctx.fillStyle = 'rgba(92,209,234,.055)';
  ctx.fillRect(0, 510, SIZE.width, 90);
  ctx.strokeStyle = '#ffbaa228';ctx.lineWidth = 2;
  ctx.beginPath();ctx.moveTo(0, 74);ctx.lineTo(SIZE.width, 74);ctx.stroke();
  ctx.strokeStyle = '#aaf5ff26';
  ctx.beginPath();ctx.moveTo(0, 525);ctx.lineTo(SIZE.width, 525);ctx.stroke();
}

/** Shared rendering helper for filled and outlined circular effects. */
function circle(x, y, r, fill = true) {
  ctx.beginPath();ctx.arc(x, y, Math.max(0.1, r), 0, Math.PI * 2);
  fill ? ctx.fill() : ctx.stroke();
}

/** Render each base as a fortress and a clearly destructible strategic target. */
function drawGate(gate, side, t) {
  ctx.save();ctx.translate(gate.x, gate.y);
  const blue = side === 'blue';
  ctx.shadowBlur = 15;ctx.shadowColor = blue ? '#70ddfa' : '#ff9277';
  ctx.fillStyle = blue ? '#417b92' : '#965467';
  ctx.beginPath();
  ctx.moveTo(-40,-14);ctx.lineTo(-27,-31);ctx.lineTo(27,-31);ctx.lineTo(40,-14);
  ctx.lineTo(40,17);ctx.lineTo(22,34);ctx.lineTo(-22,34);ctx.lineTo(-40,17);ctx.closePath();ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = blue ? '#9deaf9' : '#ffc2a0';ctx.lineWidth=3;ctx.stroke();
  ctx.fillStyle = '#142b3c';ctx.fillRect(-21,-12,42,26);
  ctx.fillStyle = blue ? '#a3faff' : '#ffd5a0';
  ctx.rotate(t * (blue ? .65 : -.65));
  ctx.beginPath();
  for (let i=0; i<8; i++) {
    const a = i*Math.PI/4;
    const r = i%2 ? 13 : 19;
    i===0 ? ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
  }
  ctx.closePath();ctx.fill();
  ctx.restore();
}

/** Draw a unit as a tiny readable soldier rather than an indistinguishable dot. */
function drawUnit(u, t, ghost = false) {
  const ally = u.side === 'blue';
  const stats = TYPES[u.type];
  const r = u.radius;
  const isLarge = ['guardian','titan'].includes(u.type);
  ctx.save();ctx.translate(u.x, u.y);
  const bob = u.windup > 0 ? -2 : Math.sin(u.step * 2.3) * (isLarge ? 1.1 : 1.8);
  const energy = u.windup > 0 ? 1 - Math.max(0, u.windup) / stats.windup : 0;
  const glow = ally ? '#72e8fc' : '#ff8e7d';

  ctx.fillStyle = '#07142181';
  ctx.beginPath();ctx.ellipse(0, r*.7+(u.type==='flier'?10:0), r*1.04, r*.40, 0, 0, Math.PI*2);ctx.fill();

  if (u.spawnGlow > 0 || ghost) {
    ctx.globalAlpha = ghost ? .55 : Math.min(.9, u.spawnGlow * .8);
    ctx.strokeStyle = ally ? '#aefaff' : '#ffd2aa';ctx.lineWidth=3;
    circle(0, 0, r + 11 + (1-u.spawnGlow)*8, false);
    ctx.globalAlpha = 1;
  }

  if (u.windup > 0 && isLarge) {
    ctx.strokeStyle = ally ? '#abf5ff' : '#ffc1a2';
    ctx.lineWidth = 3 + energy * 3;
    ctx.globalAlpha = .4 + energy*.5;
    circle(0, 0, r + 8 + energy*18, false);
    ctx.globalAlpha = 1;
  }
  ctx.translate(0, bob - (u.type==='flier' ? 7 + Math.sin(t*4+u.id)*4 : 0));
  ctx.shadowColor = glow;ctx.shadowBlur = u.flash > 0 ? 26 : ghost ? 18 : 5;
  ctx.fillStyle = ally ? '#479fbf' : '#b95366';
  if (isLarge) {
    ctx.beginPath();
    ctx.moveTo(-r*.88,-r*.38);ctx.lineTo(-r*1.2,-r*.78);
    ctx.lineTo(-r*.33,-r*.82);ctx.lineTo(r*.33,-r*.82);
    ctx.lineTo(r*1.2,-r*.78);ctx.lineTo(r*.88,-r*.38);
    ctx.lineTo(r*.84,r*.75);ctx.lineTo(-r*.84,r*.75);ctx.closePath();ctx.fill();
  } else {
    circle(0, 1, r);
  }
  ctx.shadowBlur = 0;
  ctx.strokeStyle = ally ? '#b7f8ff' : '#ffd0b0';ctx.lineWidth = isLarge ? 3 : 2;
  circle(0, 1, r, false);

  // Weapon geometry gives each class its own silhouette and identifiable attack source.
  if (u.type === 'raider') {
    ctx.fillStyle = ally ? '#98edff' : '#ffcda2';
    ctx.beginPath();ctx.moveTo(-r*.83,-r*.6);ctx.lineTo(r*.2,-r*1.2);ctx.lineTo(r*.45,-r*.2);ctx.fill();
    ctx.strokeStyle='#fff3d0';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(r*.3,r*.3);ctx.lineTo(r*1.5,-r*.5);ctx.stroke();
  } else if (u.type === 'flier') {
    ctx.fillStyle = ally ? '#a5f2ff' : '#fbd0f5';
    ctx.beginPath();ctx.moveTo(-r*.6,0);ctx.lineTo(-r*2.0,-r*.9);ctx.lineTo(-r*1.4,r*.8);ctx.fill();
    ctx.beginPath();ctx.moveTo(r*.6,0);ctx.lineTo(r*2.0,-r*.9);ctx.lineTo(r*1.4,r*.8);ctx.fill();
  } else if (u.type === 'sword') {
    ctx.strokeStyle = '#fbf4de';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(r*.25, r*.5);ctx.lineTo(r*.95,-r*.91);ctx.stroke();
    ctx.strokeStyle = ally ? '#96f5ff' : '#ffd08b';ctx.lineWidth=3.5;
    ctx.beginPath();ctx.moveTo(r*.5,-r*.4);ctx.lineTo(r*1.18,-r*.25);ctx.stroke();
  } else if (u.type === 'archer') {
    ctx.strokeStyle = '#fee6ab';ctx.lineWidth=2.7;
    ctx.beginPath();ctx.arc(r*.55, 0, r*.73, -1.25, 1.25);ctx.stroke();
    ctx.strokeStyle = '#edfafb';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(r*.78,-r*.68);ctx.lineTo(r*.78,r*.68);ctx.stroke();
  } else if (u.type === 'guardian' || u.type === 'titan') {
    ctx.fillStyle = ally ? '#87d9e9' : '#e7a17f';
    ctx.fillRect(-r*1.18,-r*.36,r*.49,r*.77);
    ctx.fillRect(r*.69,-r*.36,r*.49,r*.77);
    ctx.fillStyle='#dae5db';
    ctx.fillRect(-r*.23,-r*.71,r*.46,r*.65);
    if (u.type === 'titan') {
      ctx.fillStyle = '#f6d9aa';
      ctx.beginPath();ctx.moveTo(-r*.8,-r*.4);ctx.lineTo(-r*1.23,-r*1.5);ctx.lineTo(-r*.2,-r*.9);ctx.fill();
      ctx.beginPath();ctx.moveTo(r*.8,-r*.4);ctx.lineTo(r*1.23,-r*1.5);ctx.lineTo(r*.2,-r*.9);ctx.fill();
    }
  } else if (u.type === 'mage') {
    ctx.fillStyle = '#cfb4f8';ctx.beginPath();
    ctx.moveTo(-r*.85,-r*.46);ctx.lineTo(0,-r*1.8);ctx.lineTo(r*.83,-r*.46);ctx.closePath();ctx.fill();
    ctx.fillStyle = ally ? '#bcf8ff' : '#ffd2d2';circle(r*1.02,-r*.27,r*.37);
  } else if (u.type === 'healer') {
    ctx.fillStyle = '#fbe6b0';ctx.fillRect(-r*.18,-r*.60,r*.36,r*1.12);
    ctx.fillRect(-r*.5,-r*.28,r*1.0,r*.37);
  }
  // Tiny eyes and a tiny expression remain visible on smartphone scale.
  ctx.fillStyle = '#f5f6eb';
  circle(-r*.3,-r*.12,isLarge?3.0:2.0);
  circle(r*.3,-r*.12,isLarge?3.0:2.0);
  ctx.fillStyle = '#153248';
  circle(-r*.28,-r*.12,isLarge?1.5:1.1);
  circle(r*.32,-r*.12,isLarge?1.5:1.1);

  if (u.hp < u.maxHp || isLarge) {
    const width = r*2.1;
    ctx.fillStyle = '#142631ce';ctx.fillRect(-width/2,-r-12,width,4);
    ctx.fillStyle = ally ? '#83e4ef' : '#ff967e';
    ctx.fillRect(-width/2,-r-12,width*(u.hp/u.maxHp),4);
  }
  ctx.restore();
}

/** Render moving arrows and glowing spells with enough contrast to read direction. */
function drawProjectile(p) {
  const angle = Math.atan2(p.vy, p.vx);
  ctx.save();ctx.translate(p.x, p.y);ctx.rotate(angle);
  ctx.shadowBlur = 13;ctx.shadowColor = p.side === 'blue' ? '#8aeeff' : '#ffaf78';
  ctx.strokeStyle = p.side === 'blue' ? '#b5faff' : '#ffcf95';
  ctx.lineWidth = p.kind === 'orb' ? 7 : 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();ctx.moveTo(-17,0);ctx.lineTo(4,0);ctx.stroke();
  ctx.fillStyle = p.kind === 'orb' ? '#ebd4fa' : p.side === 'blue' ? '#efffff' : '#ffe4b2';
  if (p.kind === 'orb') circle(0,0,6);else {
    ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-3,-4);ctx.lineTo(-3,4);ctx.fill();
  }
  ctx.restore();
}

/** Draw particle trails and expanding rings above the characters. */
function drawEffects() {
  for (const e of battle.effects) {
    const alpha = Math.min(1,e.life/e.totalLife);
    if (e.kind === 'ring') {
      ctx.globalAlpha = alpha*.85;ctx.lineWidth = 3*(1-alpha)+.8;
      ctx.strokeStyle=e.color;
      circle(e.x,e.y, e.radius*(1-alpha), false);
    } else {
      ctx.globalAlpha=alpha;
      ctx.fillStyle=e.color;
      circle(e.x,e.y,e.r);
    }
  }
  ctx.globalAlpha=1;
}

/** Draw the direct gesture's source, ghost copy, and link as a live placement preview. */
function drawDrag() {
  const id = drag?.unitId ?? pendingSourceId;
  if (id === null) return;
  const source = battle.units.find(u => u.id === id && !u.dead);
  if (!source) return;
  const pos = drag?.position ?? hovered ?? { x: 180, y: battle.cameraY + 410 };
  const deployment = previewCopyLocation(battle, id, pos.x, pos.y);
  if (!deployment) return;
  const {x,y} = deployment;
  ctx.save();
  ctx.setLineDash([8,5]);ctx.lineWidth=2.5;ctx.strokeStyle='#b1f7ffb0';
  ctx.beginPath();ctx.moveTo(source.x,source.y);ctx.quadraticCurveTo(source.x+35,(source.y+y)/2,x,y);ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle='#9af6ff';ctx.lineWidth=2.5;
  circle(source.x,source.y,source.radius+9,false);
  ctx.fillStyle='#91f2ff22';circle(x,y,source.radius+17);
  ctx.strokeStyle='#b6fbffb0';circle(x,y,source.radius+17,false);
  drawUnit({ ...source, x, y, side:'blue', hp:source.maxHp, spawnGlow:1, flash:.1 }, battle.time, true);
  ctx.font='bold 12px -apple-system,sans-serif';ctx.textAlign='center';
  ctx.fillStyle='#e9ffff';ctx.shadowBlur=8;ctx.shadowColor='#16384a';
  ctx.fillText(TYPES[source.type].label + 'を味方に！',Math.max(65,Math.min(300,x)),Math.max(battle.cameraY+92,y-source.radius-25));
  ctx.restore();
}

/** Render an initial in-world gesture arrow so instructions match actual objects. */
function drawPrompt(t) {
  if (!running || battle.copied > 0 || drag || pendingSourceId !== null || battle.time > 10) return;
  const source = battle.units.find(u => u.side === 'red' && u.type === 'guardian');
  if (!source) return;
  ctx.save();ctx.globalAlpha=.65+Math.sin(t*3)*.20;
  ctx.strokeStyle='#b2faff';ctx.lineWidth=3;ctx.setLineDash([5,8]);
  ctx.beginPath();ctx.moveTo(source.x+23,source.y+20);
  ctx.quadraticCurveTo(source.x+76,source.y+95,source.x+18,source.y+175);ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();ctx.moveTo(source.x+11,source.y+163);
  ctx.lineTo(source.x+18,source.y+178);ctx.lineTo(source.x+30,source.y+166);ctx.stroke();
  ctx.fillStyle='#e7ffff';ctx.font='bold 13px -apple-system,sans-serif';ctx.textAlign='center';
  ctx.fillText('巨兵を味方にしよう',180,source.y+100);
  ctx.restore();
}

/** Draw the full scene with a capped shake that cannot displace pointer hitboxes. */
function render(t) {
  ctx.save();
  if (shake > .2) {
    ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
    shake*=.78;
  }
  drawTerrain(t);
  ctx.save();
  ctx.translate(0,-battle.cameraY);
  drawGate(battle.gateRed,'red',t);
  drawGate(battle.gateBlue,'blue',t);
  for (const gate of battle.gates) {
    if (gate.index < battle.stage) {
      ctx.save();ctx.globalAlpha=.24;
      drawGate(gate,'red',t);ctx.restore();
    }
  }
  // Character y-order preserves obvious physical layering.
  const sorted = [...battle.units].sort((a,b)=>a.y-b.y);
  for (const unit of sorted) drawUnit(unit,t);
  for (const projectile of battle.projectiles) drawProjectile(projectile);
  drawEffects();
  drawPrompt(t);
  drawDrag();
  ctx.restore();
  ctx.restore();
}

/** Run at actual animation speed; hold slower motion briefly for a successful copy. */
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.max(0,Math.min(.05,(now-(lastTime||now))/1000));
  lastTime=now;
  if (running) {
    // Tactical aiming holds the battlefield, so a selected enemy cannot die under the finger.
    if (!drag && pendingSourceId === null) {
      updateBattle(battle,dt*(slowFrames>0 ? .75 : 1));
    }
    if (slowFrames>0) slowFrames--;
    handleEvents();
    if (battle.result !== 'playing') finish();
  }
  render(now/1000);
  updateHud();
  if (toast.classList.contains('show') && now>toastDeadline) toast.classList.remove('show');
}

window.__copyWarDebug = {
  get state() { return battle; },
  start,
  findCopyTarget: (x,y)=>findCopyTarget(battle,x,y),
  copyEnemy: (id,x,y)=>copyEnemy(battle,id,x,y),
};
requestAnimationFrame(frame);