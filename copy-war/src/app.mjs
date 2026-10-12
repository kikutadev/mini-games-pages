import {
  WORLD, createGame, updateGame, copyRegion, copyEntity,
  pasteRegion, pickEntity, cancelCopy,
} from './core.mjs';

const canvas = document.getElementById('arena');
const context = canvas.getContext('2d', { alpha: false });
const arena = document.getElementById('arena-shell');
const screen = document.getElementById('screen');
const topTime = document.getElementById('time');
const score = document.getElementById('score');
const health = document.getElementById('health-fill');
const healthText = document.getElementById('health-text');
const selectionInfo = document.getElementById('selection');
const action = document.getElementById('action');
const help = document.getElementById('help');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const overlayButton = document.getElementById('overlay-button');
const info = document.getElementById('info');
const toast = document.getElementById('toast');

let game = createGame();
let running = false;
let last = 0;
let pointerStart = null;
let pointerCurrent = null;
let audio = null;
let toastUntil = 0;
let slowUntil = 0;
let shake = 0;
let frame = 0;
let lastUiUpdate = 0;

/** Initialize WebAudio after a real user gesture, without autoplay assumptions. */
function ensureAudio() {
  if (!audio) {
    const A = window.AudioContext || window.webkitAudioContext;
    if (A) audio = new A();
  }
  if (audio && audio.state === 'suspended') audio.resume().catch(() => {});
}

/** Generate compact feedback tones; every frequency is a deliberate gameplay cue. */
function tone(freq, duration, waveform, volume, slide = 1) {
  if (!audio) return;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(freq, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), now + duration);
  gain.gain.setValueAtTime(Math.max(.0001, volume), now);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

/** Convert the browser pointer position into fixed simulation coordinates. */
function gamePoint(event) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - bounds.left) / bounds.width * WORLD.width,
    y: (event.clientY - bounds.top) / bounds.height * WORLD.height,
  };
}

/** Explain the next action only when the player needs the information. */
function hint(text, duration = 2.3) {
  toast.textContent = text;
  toast.classList.add('visible');
  toastUntil = performance.now() + duration * 1000;
}

/** Start a fresh play session with no persistent upgrades or hidden stat boosts. */
function startGame() {
  ensureAudio();
  game = createGame(Math.floor(Math.random() * 100000));
  overlay.hidden = true;
  screen.classList.add('playing');
  running = true;
  last = performance.now();
  slowUntil = 0;
  shake = 0;
  pointerStart = null;
  pointerCurrent = null;
  updateUi(true);
  hint('光る弾をタップしてコピー', 3.4);
}

/** Show a result state with an immediate one-tap retry path. */
function finishGame() {
  running = false;
  screen.classList.remove('playing');
  overlay.hidden = false;
  overlay.classList.remove('intro');
  overlayTitle.textContent = game.phase === 'won' ? '防衛成功' : 'コア破壊';
  overlayText.textContent = '撃破 ' + game.kills + '体  ·  複製 ' +
    game.cloneCount + '個  ·  SCORE ' + game.score.toLocaleString('ja-JP');
  overlayButton.textContent = 'もう一度プレイ';
  tone(game.phase === 'won' ? 530 : 135, .4, 'sawtooth', .09,
    game.phase === 'won' ? 1.85 : .35);
}

/** Advance a fixed-size world with short substeps after inactive background frames. */
function tick(now) {
  requestAnimationFrame(tick);
  const delta = Math.min(.07, Math.max(0, (now - (last || now)) / 1000));
  last = now;
  frame++;
  if (running) {
    updateGame(game, delta * (now < slowUntil ? .22 : 1));
    processEvents();
    if (game.phase !== 'playing') finishGame();
  }
  drawWorld(now / 1000);
  if (now - lastUiUpdate > 80) {
    updateUi();
    lastUiUpdate = now;
  }
  if (toast.classList.contains('visible') && now > toastUntil) toast.classList.remove('visible');
}

/** Process simulation events once, keeping sound and screen shake out of the engine. */
function processEvents() {
  for (const event of game.events.splice(0)) {
    switch (event.type) {
      case 'copy':
        tone(510, .09, 'triangle', .06, 1.48);
        hint(event.count > 1 ? event.count + '個をコピー — 貼り付ける位置をタップ' : 'コピー完了 — 貼り付ける位置をタップ', 2);
        break;
      case 'paste':
        tone(220, .18, 'sawtooth', .065, 2.2);
        shake = Math.max(shake, 3);
        hint(event.count + '個ペースト！', 1.05);
        break;
      case 'invalid-paste':
        tone(160, .08, 'sine', .045);
        hint('中央のコアや画面外には貼れません', 2.2);
        break;
      case 'core-hit':
        tone(95, .18, 'sawtooth', .1, .5);
        shake = 5;
        break;
      case 'boss':
        tone(100, .65, 'sawtooth', .1, 2.5);
        hint('大型機接近！ 敵の攻撃を奪え', 3);
        break;
    }
  }
}

/** Keep the HUD focused on only health, survival time, and immediate action. */
function updateUi(force = false) {
  topTime.textContent = Math.ceil(game.remaining);
  score.textContent = game.score.toLocaleString('ja-JP');
  health.style.width = Math.round(game.core.hp / game.core.maxHp * 100) + '%';
  healthText.textContent = Math.round(game.core.hp / game.core.maxHp * 100) + '%';
  const carrying = !!game.clipboard;
  selectionInfo.textContent = carrying ? game.clipboard.count + '個コピー中' : 'COPY';
  action.textContent = carrying ? '貼り付け先をタップ' : '敵の弾をタップ';
  arena.classList.toggle('carrying', carrying);
  help.textContent = carrying ? '同じ向きに飛ぶ。敵の手前に貼ろう' : 'ドラッグして複数まとめてコピー';
  if (force) toast.classList.remove('visible');
}

/** Draw a glowing particle-free scene background with stable contrast. */
function drawBackground(t) {
  const ctx = context;
  const gradient = ctx.createLinearGradient(0, 0, 0, WORLD.height);
  gradient.addColorStop(0, '#0e1c34');
  gradient.addColorStop(1, '#08131f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WORLD.width, WORLD.height);

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(108,168,205,.075)';
  for (let x = 0; x < WORLD.width; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, WORLD.height); ctx.stroke();
  }
  for (let y = 0; y < WORLD.height; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WORLD.width, y); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(109,187,216,.12)';
  for (const r of [74, 122, 181, 230]) {
    ctx.beginPath(); ctx.arc(game.core.x, game.core.y, r, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,181,106,.09)';
  const a = t * .12;
  for (let k = 0; k < 8; k++) {
    ctx.beginPath();
    const theta = k / 8 * Math.PI * 2 + a;
    ctx.moveTo(game.core.x + Math.cos(theta) * 215, game.core.y + Math.sin(theta) * 215);
    ctx.lineTo(game.core.x + Math.cos(theta) * 235, game.core.y + Math.sin(theta) * 235);
    ctx.stroke();
  }
}

/** Render the defended core as a distinct objective, never a fake physical projectile. */
function drawCore(t) {
  const ctx = context;
  const c = game.core;
  const glow = .25 + Math.sin(t * 3.1) * .07;
  ctx.save();
  ctx.translate(c.x, c.y);
  if (game.bigHit > 0) ctx.globalAlpha = .6 + Math.sin(t * 85) * .35;
  ctx.shadowColor = '#4bceee'; ctx.shadowBlur = 28;
  ctx.fillStyle = 'rgba(42,161,209,' + glow + ')';
  circle(ctx, 0, 0, 43);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#5de2f4'; ctx.lineWidth = 3.5;
  circle(ctx, 0, 0, 26, true);
  ctx.rotate(t * .35);
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = '#83deee';
    ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(8, -8); ctx.lineTo(0, -12); ctx.lineTo(-8, -8); ctx.closePath(); ctx.fill();
  }
  ctx.rotate(-t * .7);
  ctx.fillStyle = '#e0fcff'; circle(ctx, 0, 0, 11);
  ctx.fillStyle = '#5fc6db'; circle(ctx, 0, 0, 5);
  ctx.restore();
}

/** Draw an enemy ship with a visible forward-facing weapon and a distinctive hull. */
function drawEnemy(e, t) {
  const ctx = context;
  const isClone = e.generation > 0;
  ctx.save(); ctx.translate(e.x, e.y);
  const angle = Math.atan2(game.core.y - e.y, game.core.x - e.x);
  ctx.rotate(angle);
  ctx.shadowColor = isClone ? '#7adfff' : '#f86672';
  ctx.shadowBlur = e.flash > 0 ? 23 : isClone ? 15 : 7;
  ctx.fillStyle = e.flash > 0 ? '#fff3e8' : isClone ? '#6cc3d8' :
    e.enemyKind === 'boss' ? '#f3ac65' : e.enemyKind === 'rocket' ? '#e99a81' : '#ec6d74';
  if (e.enemyKind === 'rocket' || e.enemyKind === 'boss') {
    ctx.beginPath();
    ctx.moveTo(e.r + 7, 0); ctx.lineTo(e.r * .35, e.r * .85);
    ctx.lineTo(-e.r * .8, e.r * .72); ctx.lineTo(-e.r, 0);
    ctx.lineTo(-e.r * .8, -e.r * .72); ctx.lineTo(e.r * .35, -e.r * .85);
    ctx.closePath(); ctx.fill();
  } else {
    roundRect(ctx, -e.r, -e.r * .8, e.r * 2, e.r * 1.6, 5);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#5b273e';
  roundRect(ctx, 3, -4, e.r + 11, 8, 3); ctx.fill();
  ctx.fillStyle = '#ffd9b7'; roundRect(ctx, 11, -2, e.r, 4, 2); ctx.fill();
  ctx.fillStyle = '#27293f'; circle(ctx, -e.r * .22, 0, e.r * .35);
  ctx.fillStyle = '#ffc4ad'; circle(ctx, -e.r * .2, 0, e.r * .15);
  if (isClone) {
    ctx.strokeStyle = '#b5f4ff'; ctx.lineWidth = 1.7;
    circle(ctx, 0, 0, e.r + 5, true);
  }
  ctx.restore();
  if (e.hp < e.maxHp) {
    ctx.fillStyle = '#1d2935'; ctx.fillRect(e.x - e.r, e.y - e.r - 11, e.r * 2, 3);
    ctx.fillStyle = '#ffc280'; ctx.fillRect(e.x - e.r, e.y - e.r - 11,
      e.r * 2 * Math.max(0, e.hp / e.maxHp), 3);
  }
  if (e.cloneUntil !== null) drawCloneTimer(e);
}

/** Render visual clone expiry so temporary objects never disappear unexpectedly. */
function drawCloneTimer(e) {
  const remain = Math.max(0, e.cloneUntil - game.time);
  const progress = Math.min(1, remain / 4);
  const ctx = context;
  ctx.strokeStyle = 'rgba(118,238,255,.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(e.x, e.y, e.r + 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
  ctx.stroke();
}

/** Draw projectiles with a trailing light streak that reveals direction and speed. */
function drawProjectile(e) {
  const ctx = context;
  const angle = Math.atan2(e.vy, e.vx);
  ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(angle);
  ctx.shadowColor = e.generation > 0 ? '#82f4ff' : '#ffbe66';
  ctx.shadowBlur = e.kind === 'bolt' ? 14 : 18;
  ctx.strokeStyle = e.generation > 0 ? '#8eecfa' : '#f6ae60';
  ctx.lineWidth = e.r * .85;
  ctx.lineCap = 'round';
  ctx.globalAlpha = .5;
  ctx.beginPath(); ctx.moveTo(-e.r * 3.8, 0); ctx.lineTo(-e.r * .65, 0); ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = e.generation > 0 ? '#c5f8ff' : '#ffe1a2';
  if (e.kind === 'rocket') {
    ctx.beginPath();
    ctx.moveTo(e.r * 1.2, 0); ctx.lineTo(-e.r, -e.r * .65); ctx.lineTo(-e.r * .8, e.r * .65); ctx.closePath(); ctx.fill();
  } else if (e.kind === 'bomb') {
    circle(ctx, 0, 0, e.r);
    ctx.strokeStyle = '#fff4d0'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-e.r*.45,0);ctx.lineTo(e.r*.45,0);ctx.stroke();
  } else circle(ctx, 0, 0, e.r);
  ctx.restore();
  if (e.cloneUntil !== null) drawCloneTimer(e);
}

/** Render explosion life proportionally, making an almost-finished source distinguishable. */
function drawExplosion(e) {
  const ctx = context;
  const f = e.ttl / e.totalTtl;
  ctx.save(); ctx.globalAlpha = Math.min(1, f * 1.8);
  const gradient = ctx.createRadialGradient(e.x, e.y, 1, e.x, e.y, e.r * (1.15 - f * .25));
  gradient.addColorStop(0, '#fff8c6');
  gradient.addColorStop(.3, '#ffd58a');
  gradient.addColorStop(.68, e.generation > 0 ? '#5ed5e8' : '#fa7b53');
  gradient.addColorStop(1, 'rgba(251,85,67,0)');
  ctx.fillStyle = gradient;
  circle(ctx, e.x, e.y, e.r * (1.15 - f * .25));
  ctx.restore();
}

/** Render particles and ripples after world entities so hits feel connected to impacts. */
function drawEffects() {
  const ctx = context;
  for (const s of game.shockwaves) {
    const f = 1 - s.ttl / s.total;
    ctx.strokeStyle = s.color || 'rgba(255,190,113,' + ((1 - f) * .8) + ')';
    ctx.lineWidth = 3 * (1 - f) + .4;
    circle(ctx, s.x, s.y, s.max * f, true);
  }
  for (const p of game.particles) {
    ctx.globalAlpha = Math.min(1, p.life / .28);
    ctx.fillStyle = p.color;
    circle(ctx, p.x, p.y, p.size);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px system-ui, sans-serif';
  for (const e of game.effects) {
    ctx.globalAlpha = Math.min(1, e.ttl * 1.8);
    ctx.fillStyle = '#ffe5ab'; ctx.fillText(e.text, e.x, e.y - 17);
  }
  ctx.globalAlpha = 1;
}

/** Preview the pending paste without changing any physics or forcing a confirmation click. */
function drawClipboard() {
  if (!running) return;
  const ctx = context;
  const clip = game.clipboard;
  if (clip && pointerCurrent && !pointerStart) {
    ctx.save();
    ctx.globalAlpha = .5;
    ctx.strokeStyle = '#9ceefa'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
    ctx.strokeRect(pointerCurrent.x - clip.width / 2, pointerCurrent.y - clip.height / 2, clip.width, clip.height);
    ctx.setLineDash([]);
    for (const e of clip.items) {
      const x = pointerCurrent.x + e.x, y = pointerCurrent.y + e.y;
      ctx.fillStyle = '#7bdbeb';
      circle(ctx, x, y, e.r);
      if (e.kind !== 'enemy' && e.kind !== 'explosion') {
        const l = Math.hypot(e.vx, e.vy) || 1;
        ctx.strokeStyle = '#c5f9ff'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + e.vx / l * 18, y + e.vy / l * 18);ctx.stroke();
      }
    }
    ctx.restore();
  }
  if (pointerStart && pointerCurrent) {
    const dx = pointerCurrent.x - pointerStart.x;
    const dy = pointerCurrent.y - pointerStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 12 && !clip) {
      ctx.save();ctx.fillStyle = 'rgba(97,213,236,.13)';ctx.strokeStyle = '#8ae9f5';
      ctx.lineWidth = 2;ctx.setLineDash([6, 4]);
      ctx.fillRect(pointerStart.x, pointerStart.y, dx, dy);
      ctx.strokeRect(pointerStart.x, pointerStart.y, dx, dy);
      ctx.restore();
    }
  }
}

/** Draw the full game world at one stable virtual resolution. */
function drawWorld(t) {
  const ctx = context;
  ctx.save();
  if (shake > .1) {
    ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
    shake *= .85;
  }
  drawBackground(t);
  for (const e of game.entities) {
    if (e.dead) continue;
    if (e.kind === 'enemy') drawEnemy(e, t);
    else if (e.kind === 'explosion') drawExplosion(e);
    else drawProjectile(e);
  }
  drawCore(t);
  drawEffects();
  drawClipboard();
  ctx.restore();
}

/** Draw circles with a single helper that supports fill or outline. */
function circle(ctx, x, y, radius, stroke = false) {
  ctx.beginPath();ctx.arc(x, y, Math.max(.1, radius), 0, Math.PI * 2);
  if (stroke) ctx.stroke(); else ctx.fill();
}

/** Draw a rounded rectangle on older and newer canvas implementations. */
function roundRect(ctx, x, y, w, h, radius) {
  const r = Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();ctx.moveTo(x + r, y);ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);ctx.closePath();
}

/** Handle tap copy/tap paste and drag-range copy with pointer capture. */
function pointerUp(event) {
  if (!running || !pointerStart) return;
  const end = gamePoint(event);
  const start = pointerStart;
  pointerStart = null;
  pointerCurrent = end;
  if (game.clipboard) {
    pasteRegion(game, end.x, end.y);
    slowUntil = 0;
    processEvents();
    updateUi(true);
    return;
  }
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  if (distance > 14) {
    const x = (start.x + end.x) / 2, y = (start.y + end.y) / 2;
    copyRegion(game, x, y, Math.abs(end.x - start.x), Math.abs(end.y - start.y));
  } else {
    const entity = pickEntity(game, end.x, end.y);
    if (entity) copyEntity(game, entity);
    else hint('敵弾・爆弾・敵本体をタップ', 1.4);
  }
  if (game.clipboard) {
    slowUntil = performance.now() + 1700;
    pointerCurrent = null;
  }
  processEvents();
  updateUi(true);
}

canvas.addEventListener('pointerdown', event => {
  if (!running) return;
  event.preventDefault();
  if (event.isPrimary === false) return;
  pointerStart = gamePoint(event);
  pointerCurrent = pointerStart;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', event => {
  if (!running) return;
  pointerCurrent = gamePoint(event);
});
canvas.addEventListener('pointerup', pointerUp);
canvas.addEventListener('pointercancel', () => { pointerStart = null; pointerCurrent = null; });
canvas.addEventListener('contextmenu', event => event.preventDefault());
overlayButton.addEventListener('click', startGame);
document.getElementById('cancel').addEventListener('click', () => {
  cancelCopy(game);slowUntil = 0;pointerCurrent = null;updateUi(true);
  hint('選択を解除しました', 1);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    cancelCopy(game);slowUntil = 0;pointerCurrent = null;updateUi(true);
  }
  if ((event.key === 'Enter' || event.key === ' ') && !running) startGame();
});
document.addEventListener('visibilitychange', () => { last = performance.now(); });
window.__copyWarDebug = {
  get state() { return game; },
  startGame, copyRegion: (x, y, w, h) => copyRegion(game, x, y, w, h),
  pasteRegion: (x, y) => pasteRegion(game, x, y),
};
requestAnimationFrame(tick);