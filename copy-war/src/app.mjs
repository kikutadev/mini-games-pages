import { drawBattlefield, drawFortress } from './battlefield-art.mjs';
import { drawCharacter } from './character-art.mjs';
import { BOSSES, isBoss } from './bosses.mjs';
import { STAGES, CHAPTERS } from './progression.mjs';
import { SAVE_KEY, UPGRADES, newProgress, sanitizeProgress, buyUpgrade,
  upgradeCost, settleExpedition } from './meta.mjs';
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
  cannon:'着地直後に砲撃、密集した敵を撃破',
  summoner:'倒されるまで新しい兵士を召喚',
  earthlord:'大地を割り敵陣を吹き飛ばす',
  thunderbird:'連鎖雷撃で空から複数の敵を焼く',
  fortress:'三連の爆裂砲で戦線を崩す',
  mirrorlord:'敵の能力を自動で複製し、軍勢を増殖',
  frostqueen:'氷の衝撃波で敵集団を凍結',
  hivequeen:'敵を上回る速度で兵士を大量孵化',
  cometlord:'複数の敵陣に流星を連続投下',
  eclipseking:'敵軍を吸い寄せ巨大爆発で制圧',
});

function readProgress(){
  try { return sanitizeProgress(JSON.parse(localStorage.getItem(SAVE_KEY))); }
  catch { return newProgress(); }
}
function saveProgress(){
  try { localStorage.setItem(SAVE_KEY,JSON.stringify(progress)); }
  catch { /* The game remains playable when storage is disabled. */ }
}
let progress = readProgress();
let battle = createBattle(19,{chapter:progress.selectedChapter,upgrades:progress.levels});
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
const landing=document.querySelector('#landing');
const workshop=document.querySelector('#workshop');
const chapterContainer=document.querySelector('#chapters');
for(let i=0;i<CHAPTERS.length;i++){
  const chapterButton=document.createElement('button');
  chapterButton.type='button';
  chapterButton.dataset.chapter=i;
  chapterContainer.append(chapterButton);
}
const chapterButtons=[...chapterContainer.querySelectorAll('[data-chapter]')];
const workshopButton=document.querySelector('#show-upgrades');
const upgradeList=document.querySelector('#upgrade-list');

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

/** Main between-run menu: three-stage expeditions and deliberately small permanent upgrades. */
function renderMeta(){
  document.querySelector('#crystals').textContent=progress.crystals;
  document.querySelector('#crystals-workshop').textContent=progress.crystals;
  document.querySelector('#chapter-subtitle').textContent=
    CHAPTERS[progress.selectedChapter].subtitle+' · 3ステージ';
  chapterButtons.forEach((button,i)=>{
    const unlocked=i<=progress.unlockedChapter;
    button.disabled=!unlocked;
    button.classList.toggle('chosen',progress.selectedChapter===i);
    button.classList.toggle('completed',progress.completed.includes(i));
    button.textContent=(unlocked ? progress.completed.includes(i)?'✓':'◆' : '🔒')
      +' 第'+(i+1)+'章 '+CHAPTERS[i].name;
  });
  document.querySelector('#boss-dna').textContent='獲得したボス因子 '+progress.bossDNA.length+'/'+CHAPTERS.length;
  upgradeList.replaceChildren();
  for(const spec of UPGRADES){
    const rank=progress.levels[spec.id];
    const cost=upgradeCost(spec,rank);
    const needsDNA=spec.id==='dominion' && rank>=progress.bossDNA.length;
    const card=document.createElement('div');
    card.className='upgrade-card';
    const info=document.createElement('div');
    info.className='upgrade-info';
    const title=document.createElement('strong');
    title.textContent=spec.name+'　Lv '+rank+'/'+spec.max;
    const description=document.createElement('small');
    description.textContent=spec.detail;
    info.append(title,description);
    const action=document.createElement('button');
    action.type='button';
    action.textContent=cost===null?'MAX':needsDNA?'DNA不足':'◆ '+cost;
    action.disabled=cost===null||progress.crystals<cost||needsDNA;
    action.dataset.upgrade=spec.id;
    card.append(info,action);
    upgradeList.append(card);
  }
}
function openWorkshop(){
  landing.hidden=true;workshop.hidden=false;
  renderMeta();
}
function closeWorkshop(){
  workshop.hidden=true;landing.hidden=false;
  renderMeta();
}
chapterButtons.forEach(button=>button.addEventListener('click',()=>{
  const chapter=Number(button.dataset.chapter);
  if(chapter>progress.unlockedChapter)return;
  progress.selectedChapter=chapter;
  saveProgress();renderMeta();
}));
workshopButton.addEventListener('click',openWorkshop);
document.querySelector('#back').addEventListener('click',closeWorkshop);
document.querySelector('#workshop-done').addEventListener('click',closeWorkshop);
upgradeList.addEventListener('click',event=>{
  const button=event.target.closest('button[data-upgrade]');
  if(!button)return;
  const purchase=buyUpgrade(progress,button.dataset.upgrade);
  if(!purchase.ok)return;
  progress=purchase.progress;saveProgress();renderMeta();
  beep(540,.15,.04,'triangle',1.5);
});
renderMeta();

/** Reset the scene and begin the autonomous fight without a separate tutorial level. */
function start() {
  unlockAudio();
  battle = createBattle(Math.floor(Math.random() * 10000) + 1,
    {chapter:progress.selectedChapter,upgrades:progress.levels});
  running = true;
  drag = null;
  pendingSourceId = null;
  hovered = null;
  overlay.hidden = true;
  lastTime = performance.now();
  uiTime = -1;
  updateHud(true);
  notify(battle.chapter===0?'巨兵を掴んでコピーしよう！':'敵の軍勢をコピーして突破！',2.4);
  beep(350, .12, .06, 'triangle', 1.6);
}

/** End the fight with the achieved result and immediately available retry. */
function finish() {
  running = false;
  pendingSourceId = null;
  drag = null;
  const won = battle.result === 'won';
  const settlement=settleExpedition(progress,battle);
  progress=settlement.progress;
  saveProgress();
  document.querySelector('#overlay-title').innerHTML = won
    ? battle.chapter===CHAPTERS.length-1
      ? '全'+STAGES.length+'ステージ<br><em>完全制覇！</em>'
      : '第'+(battle.chapter+1)+'章<br><em>突破！</em>'
    : '進軍失敗…<br><em>再挑戦しよう。</em>';
  document.querySelector('#overlay-description').innerHTML =
    '突破 ' + battle.secured.length + '/3　／　コピー ' + battle.copied + '体<br>' +
    '◆ 結晶 +'+settlement.reward+' 獲得'+
    (settlement.newBosses.length ? '　ボス因子 '+settlement.newBosses.length+'個獲得！' : '')+
    (won && battle.chapter<CHAPTERS.length-1 ? '　次の章が解放！' : '');
  button.innerHTML = '選んだ章へ出撃 <span>→</span>';
  renderMeta();
  overlay.hidden = false;
  beep(won ? 540 : 150, .42, .09, 'sawtooth', won ? 2 : .3);
}

/** Reflect the actual teams' size, gates and remaining time in a compact header. */
function updateHud(force = false) {
  const stamp = Math.floor(battle.time * 10);
  if (stamp === uiTime && !force) return;
  uiTime = stamp;
  timeText.textContent = Math.max(0, Math.ceil(battle.timeLimit - battle.time));
  const globalStage=battle.chapter*3+battle.stage;
  const boss=battle.units.find(u=>u.side==='red'&&!u.dead&&isBoss(u.type));
  const bossVisible=!!boss && boss.y>battle.cameraY+15 && boss.y<battle.cameraY+SIZE.height-25;
  const headline=document.querySelector('#red-label');
  headline.classList.toggle('boss-heading',bossVisible);
  headline.textContent=bossVisible
    ? (globalStage+1)+'/'+STAGES.length+' ★ BOSS '+BOSSES[boss.type].label
    : (globalStage+1)+'/'+STAGES.length+'・'+STAGES[globalStage].name;
  document.querySelector('.hp-bar.enemy').classList.toggle('boss-hp',bossVisible);
  document.querySelector('#stage-progress').style.width = `${((battle.chapter*3+battle.secured.length) / STAGES.length) * 100}%`;
  const alliedUnits = battle.units.filter(u => u.side === 'blue').length;
  allyHealth.style.width = battle.commandMorale + '%';
  allyHealth.classList.toggle('low', battle.commandMorale < 30);
  const targetHealth=bossVisible ? boss : battle.gateRed;
  enemyHealth.style.width = Math.max(0,targetHealth.hp / targetHealth.maxHp * 100) + '%';
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
    } else if (event.kind === 'boss-arrived') {
      notify('★ '+BOSSES[event.type].label+' の力を奪え！',1.8);
      beep(100,.55,.09,'sawtooth',.68);
    } else if (event.kind === 'boss-captured') {
      notify('ボスの力を奪取！リザルトでDNA獲得',1.9);
      beep(280,.35,.10,'triangle',2.1);
    } else if (event.kind === 'boss-down') {
      shake=6;
      beep(90,.48,.10,'sawtooth',.45);
    } else if (event.kind === 'boss-skill') {
      shake=Math.max(shake,['earthlord','cometlord','eclipseking'].includes(event.type)?4.5:1.9);
      beep(event.type==='thunderbird'?920:125,.24,.062,'sawtooth',1.35);
    } else if (event.kind === 'resonance') {
      notify('共鳴衝撃！コピーがさらに強くなる',1.4);
      beep(300,.3,.075,'triangle',2.1);
    } else if (event.kind === 'summon' && event.side === 'blue') {
      beep(450,.2,.04,'triangle',1.25);
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
      notify('突破！ 次は '+event.label, 1.4);
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
  if (moved >= 12) attemptCopy(source, pt.x, pt.y);
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

/** Chapter-specific battlefield art scrolls with the same world as the combat. */
function drawTerrain(t) { drawBattlefield(ctx,battle,t); }
function circle(x,y,r,fill=true) {
  ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,Math.PI*2);
  fill?ctx.fill():ctx.stroke();
}
/** Command center, now a layered fortified core instead of a flat token. */
function drawGate(gate,side,t) { drawFortress(ctx,gate,side,t,battle); }

/** Each unit's equipment, face and action now share a dedicated animated vector model. */
function drawUnit(u,t,ghost=false) {
  drawCharacter(ctx,u,t,ghost);
}

/** Velocity streaks make arrows, shells and spells directional at 1x. */
function drawProjectile(p,t) {
  const angle=Math.atan2(p.vy,p.vx),friendly=p.side==='blue';
  const color=friendly?'#a9f3ff':'#ffcc97';
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(angle);
  if(p.kind==='orb'||p.kind==='shell'){
    const r=p.kind==='shell'?9:6;
    ctx.shadowBlur=15;ctx.shadowColor=color;
    const glow=ctx.createRadialGradient(0,0,1,0,0,r+13);
    glow.addColorStop(0,friendly?'#d5ffff':'#fff3cb');
    glow.addColorStop(.35,p.kind==='shell'?'#ffb265':'#bba8f9');
    glow.addColorStop(1,'#ffffff00');
    ctx.fillStyle=glow;circle(0,0,r+13);ctx.shadowBlur=0;
    ctx.fillStyle=p.kind==='shell'?'#fff0c0':'#e4dcff';circle(0,0,r*.72);
    ctx.strokeStyle=color;ctx.lineWidth=p.kind==='shell'?4:3;
    ctx.beginPath();ctx.moveTo(-r-27,0);ctx.lineTo(-r*.4,0);ctx.stroke();
  }else{
    ctx.shadowBlur=8;ctx.shadowColor=color;
    ctx.strokeStyle=color;ctx.lineWidth=p.kind==='spark'?3.8:2;
    ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(2,0);ctx.stroke();
    ctx.shadowBlur=0;ctx.fillStyle='#ffffff';
    ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(-2,-4);ctx.lineTo(-2,4);ctx.closePath();ctx.fill();
    if(p.kind==='arrow'){
      ctx.strokeStyle='#d4f5ffbb';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(-17,-5);ctx.lineTo(-8,0);ctx.lineTo(-17,5);ctx.stroke();
    }
  }
  ctx.restore();
}

/** Draw particle trails and expanding rings above the characters. */
function drawEffects() {
  for (const e of battle.effects) {
    if(e.y < battle.cameraY-180 || e.y > battle.cameraY+SIZE.height+180)continue;
    const alpha = Math.min(1,e.life/e.totalLife);
    if (e.kind === 'shot') {
      ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.angle);
      ctx.globalAlpha=alpha*.8;ctx.shadowColor=e.color;ctx.shadowBlur=7;
      ctx.strokeStyle=e.color;ctx.lineCap='round';
      const radius=e.radius*(.65+(1-alpha)*.45);
      if(e.role==='archer'){
        ctx.lineWidth=2*alpha;
        ctx.beginPath();ctx.moveTo(-radius*.8,-radius*.8);
        ctx.lineTo(-radius*.2,0);ctx.lineTo(-radius*.8,radius*.8);ctx.stroke();
      }else {
        const petals=e.role==='cannon'||e.role==='fortress'?6:4;
        ctx.lineWidth=2.3*alpha+.3;
        for(let j=0;j<petals;j++){
          const ang=j*Math.PI*2/petals;
          ctx.beginPath();ctx.moveTo(Math.cos(ang)*radius*.20,Math.sin(ang)*radius*.20);
          ctx.lineTo(Math.cos(ang)*radius,Math.sin(ang)*radius);ctx.stroke();
        }
        ctx.fillStyle=e.color;circle(0,0,2+radius*.18*alpha);
      }
      ctx.restore();
    }else if (e.kind === 'footfall') {
      ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=alpha*.23;
      ctx.strokeStyle=e.color;ctx.lineWidth=1.2;
      const radius=e.radius*(.35+1.05*(1-alpha));
      ctx.beginPath();ctx.ellipse(0,0,radius,radius*.35,0,0,Math.PI*2);
      ctx.stroke();
      ctx.restore();
    }else if (e.kind === 'death') {
      ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=Math.min(1,alpha*1.4);
      const r=e.radius;
      const flatten=1-alpha;
      ctx.fillStyle=e.side==='blue'?'#3996b5':'#cb6a78';
      ctx.strokeStyle=e.side==='blue'?'#c0f7ff':'#ffe0c2';
      ctx.lineWidth=2;
      ctx.beginPath();ctx.ellipse(0,r*.6+flatten*6,r*(.8+flatten*.5),
        r*(.59-flatten*.43),0,0,Math.PI*2);
      ctx.fill();ctx.stroke();
      // A readable X-eyed defeated pose that collapses to a splash.
      ctx.strokeStyle='#f6f5ec';ctx.lineWidth=Math.max(1.2,r*.1);
      for(const ox of [-r*.3,r*.3]) {
        ctx.beginPath();ctx.moveTo(ox-r*.13,-r*.05);ctx.lineTo(ox+r*.13,r*.17);
        ctx.moveTo(ox+r*.13,-r*.05);ctx.lineTo(ox-r*.13,r*.17);
        ctx.stroke();
      }
      ctx.restore();
    } else if (e.kind === 'dash') {
      ctx.save();ctx.globalAlpha=alpha*.9;
      const angle=Math.atan2(e.ty-e.y,e.tx-e.x);
      const dist=Math.hypot(e.tx-e.x,e.ty-e.y);
      ctx.translate(e.x,e.y);ctx.rotate(angle);
      ctx.shadowColor=e.color;ctx.shadowBlur=9;ctx.strokeStyle=e.color;
      for(let i=0;i<4;i++) {
        ctx.lineWidth=(1.3+i*.5)*alpha;
        const off=(i-1.5)*9;
        ctx.beginPath();ctx.moveTo(-14-i*12,off);
        ctx.lineTo(dist+(1-alpha)*18,off*.3);ctx.stroke();
      }
      ctx.restore();
    } else if (e.kind === 'slash') {
      ctx.save();ctx.globalAlpha=alpha;
      const angle=e.angle??0;
      const tx=e.x,ty=e.y;
      const sx=e.fromX??tx,sy=e.fromY??ty;
      const distance=Math.hypot(tx-sx,ty-sy);
      const length=Math.min(49,Math.max(22,distance*.64));
      ctx.translate(tx,ty);ctx.rotate(angle+Math.PI/2);
      const progress=1-alpha;
      const radius=16+9*progress;
      ctx.strokeStyle=e.color;ctx.shadowColor=e.color;ctx.shadowBlur=12;
      ctx.lineWidth=6*alpha+1;
      ctx.beginPath();ctx.arc(0,0,radius,Math.PI*.85+progress*.7,
        Math.PI*2.13+progress*.65);ctx.stroke();
      ctx.strokeStyle='#ffffffeb';ctx.lineWidth=1.6*alpha+.5;
      ctx.beginPath();ctx.arc(0,0,radius+4,Math.PI*.93+progress*.68,
        Math.PI*1.98+progress*.65);ctx.stroke();
      // The stroke travels from the actual sword hand, never detached at target.
      ctx.restore();
      if(distance>15){
        ctx.save();ctx.globalAlpha=alpha*.6;
        ctx.strokeStyle=e.color;ctx.lineWidth=1.8+alpha;
        ctx.shadowColor=e.color;ctx.shadowBlur=8;
        ctx.beginPath();ctx.moveTo(sx,sy);
        ctx.quadraticCurveTo((sx+tx)/2+Math.sin(angle)*length*.5,
          (sy+ty)/2-Math.cos(angle)*length*.5,tx,ty);ctx.stroke();
        ctx.restore();
      }
    } else if (e.kind === 'fissure') {
      ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.angle||0);ctx.globalAlpha=alpha;
      const growth=Math.min(1,(1-alpha)*4);
      for(let ray=0;ray<7;ray++){
        ctx.save();ctx.rotate(ray*Math.PI*2/7);
        ctx.strokeStyle='#19263cc9';ctx.lineWidth=8*alpha+1;
        ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(e.radius*.34*growth,-7);
        ctx.lineTo(e.radius*.66*growth,8);ctx.lineTo(e.radius*growth,-5);ctx.stroke();
        ctx.strokeStyle=e.color;ctx.lineWidth=2.5*alpha+1;
        ctx.stroke();ctx.restore();
      }
      ctx.strokeStyle=e.color;ctx.lineWidth=3*alpha+1;
      ctx.beginPath();ctx.ellipse(0,0,e.radius*growth,e.radius*.55*growth,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    } else if (e.kind === 'muzzle') {
      ctx.save();ctx.translate(e.x,e.y);
      ctx.globalAlpha=alpha;ctx.rotate((e.x%7)*.33);
      ctx.fillStyle=e.color;ctx.shadowBlur=18;ctx.shadowColor=e.color;
      const extent=e.radius*(.35+(1-alpha));
      for(let i=0;i<8;i++){
        const angle=i*Math.PI/4;
        ctx.beginPath();ctx.moveTo(Math.cos(angle)*2,Math.sin(angle)*2);
        ctx.lineTo(Math.cos(angle-.13)*extent,Math.sin(angle-.13)*extent);
        ctx.lineTo(Math.cos(angle+.13)*extent,Math.sin(angle+.13)*extent);
        ctx.fill();
      }
      ctx.restore();
    } else if (e.kind === 'portal') {
      ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=alpha;
      ctx.rotate((1-alpha)*Math.PI*.7);
      ctx.strokeStyle=e.color;ctx.lineWidth=3*alpha+1;ctx.shadowBlur=12;ctx.shadowColor=e.color;
      for(const radius of [e.radius*.7,e.radius*1.1]){
        ctx.beginPath();ctx.ellipse(0,0,radius*(1-alpha*.3),radius*.47,0,0,Math.PI*2);ctx.stroke();
      }
      for(let i=0;i<6;i++){
        const ang=i*Math.PI/3;ctx.beginPath();
        ctx.moveTo(Math.cos(ang)*(e.radius*.78),Math.sin(ang)*(e.radius*.4));
        ctx.lineTo(Math.cos(ang)*(e.radius*1.18),Math.sin(ang)*(e.radius*.58));ctx.stroke();
      }
      ctx.restore();
    } else if (e.kind === 'arrival') {
      ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=alpha;
      ctx.fillStyle=e.color;ctx.shadowBlur=11;ctx.shadowColor=e.color;
      const ext=e.radius*(1.05+(1-alpha)*.55);
      for(let i=0;i<7;i++){
        const ang=i*Math.PI*2/7+(e.x+e.y)*.01;
        const rr=ext*.85;
        ctx.save();ctx.translate(Math.cos(ang)*rr,Math.sin(ang)*rr);ctx.rotate(ang);
        ctx.fillRect(-2,-5,6+12*(1-alpha),3);ctx.restore();
      }
      ctx.restore();
    } else if (e.kind === 'impact') {
      ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=alpha*.65;
      ctx.strokeStyle=e.color;ctx.lineWidth=3*alpha+1;
      const rr=e.radius*(1-alpha*.75);
      ctx.beginPath();ctx.ellipse(0,0,rr,rr*.66,0,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(0,0,rr*.58,rr*.37,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    } else if (e.kind === 'arc') {
      ctx.save();ctx.globalAlpha=alpha;ctx.shadowBlur=15;ctx.shadowColor=e.color;
      ctx.strokeStyle=e.color;ctx.lineWidth=2+3*alpha;
      ctx.beginPath();ctx.moveTo(e.x,e.y);
      for(let i=1;i<7;i++){
        const f=i/7;
        const jitter=Math.sin(i*17+e.x*.09+e.ty*.07)*12*alpha;
        ctx.lineTo(e.x+(e.tx-e.x)*f+jitter,e.y+(e.ty-e.y)*f-jitter);
      }
      ctx.lineTo(e.tx,e.ty);ctx.stroke();ctx.restore();
    } else if (e.kind === 'ring') {
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
  if (!running || battle.copied > 0 || drag || pendingSourceId !== null || battle.time > 10 || battle.chapter!==0) return;
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
    if (gate.index < battle.chapter*3 + battle.stage) {
      ctx.save();ctx.globalAlpha=.24;
      drawGate(gate,'red',t);ctx.restore();
    }
  }
  // Character y-order preserves obvious physical layering.
  // Units in other sectors still simulate; cull them only from expensive vector art.
  const sorted=battle.units
    .filter(u=>u.y>battle.cameraY-86 && u.y<battle.cameraY+SIZE.height+88)
    .sort((a,b)=>a.y-b.y);
  for (const unit of sorted) drawUnit(unit,t);
  for (const projectile of battle.projectiles) drawProjectile(projectile,t);
  drawEffects();
  drawPrompt(t);
  drawDrag();
  ctx.restore();
  ctx.restore();
}

/** Use the in-game vector models for an animated, honest preview on the title card. */
function drawIntroSquad(t) {
  if (overlay.hidden || landing.hidden) return;
  const canvas=document.querySelector('#intro-squad');
  if(!canvas)return;
  const c=canvas.getContext('2d');
  c.clearRect(0,0,300,92);
  const x1=64,x2=239,y=53;
  c.save();c.lineCap='round';
  const progress=(Math.sin(t*1.6)+1)/2;
  c.setLineDash([7,6]);c.lineDashOffset=-t*28;
  c.strokeStyle='#a3f9ffb5';c.lineWidth=2.5;
  c.beginPath();c.moveTo(x1+26,y-7);c.bezierCurveTo(120,3,179,83,x2-26,y-3);c.stroke();
  c.setLineDash([]);
  const sparkleX=x1+29+(x2-x1-58)*progress;
  const sparkleY=53-19*Math.sin(progress*Math.PI);
  c.shadowBlur=15;c.shadowColor='#9ff7ff';c.fillStyle='#eaffff';
  c.beginPath();c.moveTo(sparkleX,sparkleY-8);c.lineTo(sparkleX+3,sparkleY-2);
  c.lineTo(sparkleX+9,sparkleY);c.lineTo(sparkleX+3,sparkleY+2);
  c.lineTo(sparkleX,sparkleY+8);c.lineTo(sparkleX-3,sparkleY+2);
  c.lineTo(sparkleX-8,sparkleY);c.lineTo(sparkleX-3,sparkleY-2);
  c.closePath();c.fill();c.shadowBlur=0;
  for (let side=0;side<2;side++) {
    const ally=side===1;
    drawCharacter(c,{id:side+301,x:ally?x2:x1,y,
      type:'guardian',side:ally?'blue':'red',radius:22,
      hp:210,maxHp:210,step:t*.72,windup:0,
      attackPulse:0,hurtPulse:0,spawnGlow:ally?.6+progress*.3:0,
      flash:0,powerScale:ally?1.3:1},t);
  }
  c.fillStyle='#dceef9';c.textAlign='center';c.font='bold 11px -apple-system,sans-serif';
  c.fillText('敵',x1,90);c.fillText('味方',x2,90);
  c.restore();
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
  drawIntroSquad(now/1000);
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