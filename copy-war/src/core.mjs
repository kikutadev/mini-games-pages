import { isBoss } from './bosses.mjs';
import { WORLD_HEIGHT, CHAPTERS, gateForStage, stagesForChapter } from './progression.mjs';
/**
 * COPY WAR — enemy-to-ally cloning battle simulator.
 * Rules are independent of rendering and pointer events to support repeatable combat tests.
 */
export const SIZE = Object.freeze({ width: 360, height: 600 });
export const UNIT_LIMIT = 170;

export const TYPES = Object.freeze({
  sword:  { label: '剣士', color: '#ee806b', hp: 60, speed: 49, radius: 12, range: 21, damage: 15, interval: .88, windup: .15 },
  archer: { label: '弓兵', color: '#f4a475', hp: 46, speed: 42, radius: 11, range: 138, damage: 13, interval: 1.33, windup: .24 },
  guardian: { label: '巨兵', color: '#c86d78', hp: 210, speed: 28, radius: 21, range: 37, damage: 48, interval: 3.25, windup: .66 },
  mage: { label: '魔導士', color: '#d58adf', hp: 70, speed: 37, radius: 13, range: 154, damage: 34, interval: 2.75, windup: .55 },
  healer: { label: '治癒士', color: '#e6b472', hp: 63, speed: 40, radius: 12, range: 120, damage: 6, interval: 2.6, windup: .42 },
  titan: { label: '巨神', color: '#db8d58', hp: 420, speed: 24, radius: 28, range: 65, damage: 88, interval: 4.0, windup: .96 },
  raider: { label: '突撃兵', color: '#ff976a', hp: 75, speed: 81, radius: 12, range: 67, damage: 29, interval: 2.1, windup: .20 },
  flier: { label: '飛行兵', color: '#bba3e9', hp: 51, speed: 64, radius: 12, range: 116, damage: 16, interval: 1.4, windup: .17 },
  cannon: { label: '砲兵', color: '#c99869', hp: 96, speed: 27, radius: 16, range: 220, damage: 55, interval: 3.1, windup: .65 },
  summoner: { label: '召喚士', color: '#ac75dd', hp: 76, speed: 31, radius: 15, range: 125, damage: 0, interval: 4.6, windup: .7 },
  earthlord: {label:'裂地の巨王',color:'#d6a26f',hp:680,speed:20,radius:33,range:65,damage:98,interval:4.1,windup:1.05},
  thunderbird: {label:'雷翼獣',color:'#af92ff',hp:500,speed:47,radius:28,range:175,damage:35,interval:3.1,windup:.7},
  fortress: {label:'鉄砲巨城',color:'#e1aa7d',hp:760,speed:19,radius:34,range:205,damage:49,interval:4.1,windup:.95},
  mirrorlord: {label:'原初の複製王',color:'#d69cf5',hp:880,speed:25,radius:33,range:150,damage:0,interval:5.1,windup:1.05},
});

/** Seeded RNG ensures simulated comparisons are not dependent on Math.random(). */
export function randomGenerator(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/** Create a 3-sector battlefield with persistent units and stage-specific enemy defenders. */
export function createBattle(seed = 19, options = {}) {
  const chapter = Math.max(0, Math.min(CHAPTERS.length - 1, Math.trunc(options.chapter ?? 0)));
  const upgrades = {
    amplifier:Math.max(0,Math.min(5,Math.trunc(options.upgrades?.amplifier ?? 0))),
    vanguard:Math.max(0,Math.min(4,Math.trunc(options.upgrades?.vanguard ?? 0))),
    resonance:Math.max(0,Math.min(3,Math.trunc(options.upgrades?.resonance ?? 0))),
    dominion:Math.max(0,Math.min(4,Math.trunc(options.upgrades?.dominion ?? 0))),
  };
  const battle = {
    time: 0, timeLimit: 220, result: 'playing', seed, rand: randomGenerator(seed),
    chapter, chapterStages:stagesForChapter(chapter), upgrades,
    nextId: 1, units: [], projectiles: [], effects: [], floating: [], events: [],
    lastClone: null, copied: 0, kills: { blue: 0, red: 0 }, wave: 1,
    stage: 0, gates: Array.from({length:3}, (_, i) => gateForStage(chapter*3+i)),
    cameraY: WORLD_HEIGHT - SIZE.height,
    gateBlue: { x: 180, y: WORLD_HEIGHT - 56, hp: 640, maxHp: 640, radius: 31 },
    gateRed: null,
    enemyTimer: 12, allyTimer: 8.0, actionCount: 0, synergy: 0,
    secured: [], explored: 0, commandMorale: 100, moraleWarning: false,
    capturedBosses: [], bossDefeated: [],
  };
  battle.gateRed = battle.gates[0];
  addUnit(battle, 'blue', 'sword', 136, 1945);
  addUnit(battle, 'blue', 'sword', 181, 1960);
  addUnit(battle, 'blue', 'sword', 228, 1945);
  addUnit(battle, 'blue', 'archer', 165, 2010);
  const startingSupport=['archer','mage','guardian','healer'];
  for(let i=0;i<upgrades.vanguard;i++)
    addUnit(battle,'blue',startingSupport[i],110+i*37,1978+i*10);
  if(chapter===0) {
    // First encounter always teaches how a giant can be copied.
    for(const [type,x,y] of [['guardian',175,1740],['sword',108,1786],['sword',251,1783],
      ['archer',113,1680],['archer',251,1690],['mage',180,1595]]) addUnit(battle,'red',type,x,y);
  } else {
    const initial=battle.chapterStages[0].defenders;
    initial.forEach((type,i)=>addUnit(battle,'red',type,
      78+(i%3)*101+(battle.rand()-.5)*22,1650+Math.floor(i/3)*76+battle.rand()*28));
  }
  return battle;
}

/** Create a team-owned combat unit with immutable class configuration. */
export function addUnit(battle, side, type, x, y, overrides = {}) {
  if (!(type in TYPES) || !['blue', 'red'].includes(side)) return null;
  if (battle.units.length >= UNIT_LIMIT) return null;
  const stats = TYPES[type];
  const unit = {
    id: battle.nextId++, side, type, x, y, radius: stats.radius,
    hp: stats.hp, maxHp: stats.hp, powerScale:1, attackTimer: battle.rand() * .35,
    windup: 0, attackTargetId: null, flash: 0, hurtPulse: 0,
    attackPulse: 0, spawnGlow: .5,
    facing: side === 'blue' ? -1 : 1, step: battle.rand() * 8,
    copyGeneration: 0, sourceId: null, dead: false, ...overrides,
  };
  battle.units.push(unit);
  return unit;
}

/** Return a live unit within a forgiving finger-sized hit target. */
export function findCopyTarget(battle, x, y, radius = 27) {
  let selected = null, score = radius;
  for (const unit of battle.units) {
    if (unit.dead || unit.side !== 'red') continue;
    const candidate = distance(unit, { x, y }) - unit.radius * .75;
    if (candidate < score) { score = candidate; selected = unit; }
  }
  return selected;
}

/**
 * Duplicate a living enemy as a permanent allied unit.
 * Preserve the combat class and charged wind-up, but give the new ally full health;
 * the source remains a living hostile object.
 */
export function copyEnemy(battle, sourceId, x, y) {
  if (battle.result !== 'playing') return { ok: false, reason: 'ended' };
  const source = battle.units.find(u => u.id === sourceId && !u.dead && u.side === 'red');
  if (!source) return { ok: false, reason: 'missing' };
  const position = fitDeployment(battle, x, y, source.radius);
  const bossBoost = isBoss(source.type) ? 1 + battle.upgrades.dominion * .20 : 1;
  const copy = addUnit(battle, 'blue', source.type, position.x, position.y, {
    attackTimer: source.windup > 0 ? 0 : Math.min(source.attackTimer, .18),
    windup: source.windup > 0 ? Math.max(.1, source.windup) : 0,
    copyGeneration: source.copyGeneration + 1,
    sourceId: source.id, facing: -1, spawnGlow: .9,
    hp:TYPES[source.type].hp*(1+battle.upgrades.amplifier*.12)*bossBoost,
    maxHp:TYPES[source.type].hp*(1+battle.upgrades.amplifier*.12)*bossBoost,
    powerScale:(1+battle.upgrades.amplifier*.10)*bossBoost,
  });
  if (!copy) return { ok: false, reason: 'limit' };
  battle.copied++;
  battle.actionCount++;
  if (isBoss(source.type) && !battle.capturedBosses.includes(source.type)) {
    battle.capturedBosses.push(source.type);
    battle.events.push({ kind:'boss-captured', type:source.type });
  }
  battle.lastClone = { type: copy.type, x: copy.x, y: copy.y, time: battle.time };
  emitRing(battle, copy.x, copy.y, 'copy', 42);
  battle.effects.push({kind:'arrival',x:copy.x,y:copy.y,
    radius:copy.radius+19,life:.46,totalLife:.46,color:'#b4f9ff'});
  emitParticles(battle, copy.x, copy.y, 19, '#8cf4ff', 100);
  triggerArrival(battle, copy);
  const frequency=7-battle.upgrades.resonance;
  if(battle.upgrades.resonance>0 && battle.copied%frequency===0){
    slam(battle, copy, copy, 28+battle.upgrades.resonance*15, 75+battle.upgrades.resonance*12, false);
    battle.events.push({kind:'resonance',x:copy.x,y:copy.y});
  }
  const baseScore = source.type === 'titan' ? 4 : source.type === 'guardian' ? 3 : 1;
  battle.synergy += baseScore;
  battle.events.push({ kind: 'clone', type: source.type, x: copy.x, y: copy.y });
  return { ok: true, unit: copy };
}

/** Each copied class arrives with a distinct tactical consequence.
 * Even a healer or bowman can decisively reverse the situation in one gesture.
 * Permanent unit strength remains identical to the source's class.
 */
function triggerArrival(b, copy) {
  if (isBoss(copy.type)) {
    // A stolen commander immediately demonstrates the actual power the player won.
    performBossAttack(b, copy, true);
    return;
  }
  if (copy.type === 'guardian' || copy.type === 'titan') {
    slam(b, copy, copy, copy.type === 'titan' ? 86 : 65,
      copy.type === 'titan' ? 132 : 105, false);
    return;
  }
  if (copy.type === 'healer') {
    let healed = 0;
    for (const ally of b.units) {
      if (ally.dead || ally.side !== 'blue' || distance(copy, ally) > 150) continue;
      const restored = Math.min(52, ally.maxHp - ally.hp);
      if (restored <= 0) continue;
      ally.hp += restored;
      healed++;
      emitRing(b, ally.x, ally.y, 'copy', ally.radius + 20);
      emitParticles(b, ally.x, ally.y, 6, '#b8fbd4', 75);
    }
    if (healed) b.events.push({ kind:'burst-heal', targets:healed, x:copy.x, y:copy.y });
    return;
  }
  // Choose threats near the deployment. A remote target must not produce wasted shots.
  if (copy.type === 'summoner') {
    // The player sees the copied enemy's defining trick immediately.
    for (let i=0;i<2;i++) addUnit(b,'blue',i===0?'sword':'raider',
      clamp(copy.x+(i?27:-27),20,340),clamp(copy.y+32+i*12,80,WORLD_HEIGHT-80),
      {powerScale:copy.powerScale,spawnGlow:.8});
    emitRing(b,copy.x,copy.y,'copy',54);
    return;
  }
  const threats = b.units
    .filter(e => !e.dead && e.side === 'red' && distance(e, copy) < 380)
    .sort((a, c) => distance(a, copy) - distance(c, copy));
  if (!threats.length) return;
  if (copy.type === 'archer') {
    const flyers = threats.filter(e => e.type === 'flier');
    const primary = flyers[0] ?? threats[0];
    for (let i = 0; i < 3; i++) {
      const target = flyers[i] ?? threats[i] ?? primary;
      shoot(b, copy, target, { damage: 15, kind:'arrow', speed: 330,
        angleOffset: (i - 1) * .045 });
    }
    b.events.push({ kind:'volley', x:copy.x, y:copy.y, targetType:primary.type });
  } else if (copy.type === 'mage') {
    shoot(b, copy, threats[0], { damage: 42, splash: 50, kind:'orb', speed: 200 });
  } else if (copy.type === 'cannon') {
    shoot(b, copy, threats[0], { damage: 54, splash: 70, kind:'orb', speed: 225 });
  } else if (copy.type === 'flier') {
    const priority = threats.find(u => ['healer','archer','mage'].includes(u.type)) ?? threats[0];
    for (const angleOffset of [-.09,.09]) {
      shoot(b, copy, priority, { damage: 15, kind:'spark', speed: 270, angleOffset });
    }
  } else if (copy.type === 'raider' && distance(copy, threats[0]) < 165) {
    performAttack(b, copy);
    // The next action still uses the source's regular cooldown.
    copy.attackTimer = TYPES.raider.interval;
  }
}

/** Create a particle burst that signals hit impact without spawning game objects. */
/** Return the exact future copy position for the drag ghost and the game engine. */
export function previewCopyLocation(b, sourceId, x, y) {
  const source = b.units.find(u => u.id === sourceId && !u.dead && u.side === 'red');
  return source ? fitDeployment(b, x, y, source.radius) : null;
}

/** Prefer the gesture's location while preventing fort and allied-unit overlap. */
function fitDeployment(b, x, y, radius) {
  const minY = b.cameraY + 65, maxY = b.cameraY + SIZE.height - 60;
  const original = { x: clamp(x, 21, 339), y: clamp(y, minY, maxY) };
  const friends = b.units.filter(u => u.side === 'blue' && !u.dead);
  function freeOfFort(x, y) {
    const point = { x: clamp(x, 21, 339), y: clamp(y, minY, maxY) };
    for (const fortress of [b.gateBlue, b.gateRed]) {
      const minDistance = fortress.radius + radius + 9;
      const dx = point.x - fortress.x;
      const dy = point.y - fortress.y;
      const d = Math.hypot(dx, dy);
      if (d >= minDistance) continue;
      const nx = d < .001 ? 0 : dx / d;
      const ny = d < .001 ? (fortress === b.gateBlue ? -1 : 1) : dy / d;
      point.x = clamp(fortress.x + nx * minDistance, 21, 339);
      point.y = clamp(fortress.y + ny * minDistance, minY, maxY);
    }
    return point;
  }
  let best = null, bestScore = Infinity;
  for (const spread of [0, 26, 50, 73]) {
    for (let direction = 0; direction < (spread ? 10 : 1); direction++) {
      const angle = direction * Math.PI * 2 / 10;
      const candidate = freeOfFort(original.x + Math.cos(angle)*spread,
        original.y + Math.sin(angle)*spread);
      let overlap = 0;
      for (const ally of friends) {
        const width = Math.max(0, radius + ally.radius + 3 - distance(candidate, ally));
        overlap += width * width;
      }
      const score = overlap + spread * .07;
      if (score < bestScore) { bestScore = score; best = candidate; }
      if (overlap === 0) return candidate;
    }
  }
  return best;
}

function emitParticles(b, x, y, amount, color, speed = 85) {
  for (let i = 0; i < amount && b.effects.length < 650; i++) {
    const theta = b.rand() * Math.PI * 2;
    const magnitude = (0.25 + b.rand() * .75) * speed;
    b.effects.push({
      kind: 'particle', x, y, vx: Math.cos(theta) * magnitude,
      vy: Math.sin(theta) * magnitude, life: .22 + b.rand() * .4,
      totalLife: .62, color, r: 1.3 + b.rand() * 3.0,
    });
  }
}

/** Emit a geometric impact circle sized according to the underlying gameplay event. */
function emitRing(b, x, y, kind, radius) {
  b.effects.push({
    kind: 'ring', x, y, radius, life: .44, totalLife: .44,
    color: kind === 'copy' ? '#8cf1ff' : kind === 'shield' ? '#f4c17d' : kind === 'red' ? '#ffaf82' : '#a9edfa',
  });
}

/** Apply direct damage to a unit exactly once per hit, with death feedback. */
function damageUnit(b, unit, damage, side) {
  if (!unit || unit.dead || damage <= 0) return;
  unit.hp = Math.max(0, unit.hp - damage);
  unit.flash = .16;
  unit.hurtPulse = .26;
  emitParticles(b, unit.x, unit.y, damage >= 35 ? 9 : 4,
    unit.side === 'blue' ? '#80e6fa' : '#ffb989', damage >= 35 ? 155 : 85);
  if (unit.hp > 0) return;
  unit.dead = true;
  b.kills[side]++;
  // Keep a short visual-only defeat pose after the unit leaves combat.
  b.effects.push({kind:'death',x:unit.x,y:unit.y,
    radius:unit.radius,side:unit.side,life:.54,totalLife:.54});
  emitRing(b, unit.x, unit.y, side, unit.radius * 3);
  emitParticles(b, unit.x, unit.y, 13 + Math.ceil(unit.radius * .6),
    unit.side === 'blue' ? '#8df0ff' : '#ffb280', 165);
  if (isBoss(unit.type)) {
    b.bossDefeated.push(unit.type);
    b.events.push({kind:'boss-down',type:unit.type,side:unit.side});
  }
  if (unit.type === 'titan') {
    b.events.push({ kind: 'titan-down', side, x: unit.x, y: unit.y });
  }
}

/** Damage an opposing gate when a victorious squad breaks through the frontline. */
function damageGate(b, side, damage, x, y) {
  if (b.result !== 'playing' || side === 'red') return;
  const gate = side === 'blue' ? b.gateRed : b.gateBlue;
  const livingBoss=b.units.some(u=>!u.dead && u.side==='red' && isBoss(u.type));
  if(livingBoss) {
    emitRing(b,gate.x,gate.y,'shield',54);
    if(b.time-(b.lastShieldMessage??-100)>6){
      b.lastShieldMessage=b.time;
      b.events.push({kind:'boss-shield'});
    }
    return;
  }
  // No tedious post-battle drilling: an undefended fortress falls rapidly.
  const defendersRemaining = b.units.some(u => u.side === 'red' && !u.dead &&
    Math.abs(u.y - gate.y) < 235);
  const siegeDamage = defendersRemaining ? damage : damage * 2.4;
  gate.hp = Math.max(0, gate.hp - siegeDamage);
  emitRing(b, x, y, side, 23);
  if (gate.hp > 0) return;
  {
    const clearedStage = b.stage;
    b.secured.push(clearedStage);
    if (clearedStage >= b.chapterStages.length - 1) {
      b.result = 'won';
      b.events.push({ kind: 'end', result: b.result });
    } else {
      b.stage++;
      b.gateRed = b.gates[b.stage];
      b.enemyTimer = 7.5;
      b.allyTimer = Math.min(b.allyTimer, 3);
      deployDefenders(b, b.stage);
      deployCapturedReinforcements(b, gate.y);
      b.commandMorale = Math.min(100, b.commandMorale + 38);
      b.events.push({ kind: 'checkpoint', stage: b.stage, label: b.chapterStages[b.stage].name });
      // A scroll preview brings the next adversary into view instead of a hard scene cut.
    }
  }
  emitParticles(b, gate.x, gate.y, 70, side === 'blue' ? '#b3f6ff' : '#ffba8c', 240);
}

/** Find the nearest opposing target based on actual battlefield coordinates. */
function acquireTarget(b, u) {
  let target = null, best = Infinity;
  for (const opponent of b.units) {
    if (opponent.dead || opponent.side === u.side) continue;
    const dx = opponent.x - u.x, dy = opponent.y - u.y;
    const d2 = dx * dx + dy * dy;
    // Ground melee never chases a flying unit that it cannot hit.
    if (['flier','thunderbird'].includes(opponent.type) && ['sword', 'guardian', 'titan', 'raider','earthlord','fortress','mirrorlord'].includes(u.type) && u.type!=='fortress') continue;
    // Flyers bypass the front to pressure archers/healers; archers counter flyers.
    const priority = u.type === 'archer' && ['flier','thunderbird'].includes(opponent.type) ? .10
      : u.type === 'flier' && ['healer','archer','mage'].includes(opponent.type) ? .28
      : 1;
    const weighted = d2 * priority;
    if (weighted < best) { target = opponent; best = weighted; }
  }
  const opposingGate = u.side === 'blue' ? b.gateRed : b.gateBlue;
  // The enemy is a defending army, not a unit rushing an offscreen home base.
  if (u.side === 'red' && (!target || Math.sqrt(best) > 310)) {
    return { x: u.x, y: Math.max(b.gateRed.y + 130, Math.min(b.gateRed.y + 230, u.y)), radius: 0, rally: true };
  }
  const gateDistance = distance(u, opposingGate);
  // Nearby enemies are prioritized over buildings, preventing backdoor spawning exploits.
  if (target && (Math.sqrt(best) < 210 || gateDistance > 90)) return target;
  if (gateDistance < 120 && !target) return { ...opposingGate, gate: true, side: u.side === 'blue' ? 'red' : 'blue' };
  if (target && gateDistance <= 110 && Math.sqrt(best) > 150) {
    return { ...opposingGate, gate: true, side: u.side === 'blue' ? 'red' : 'blue' };
  }
  return target ?? { ...opposingGate, gate: true, side: u.side === 'blue' ? 'red' : 'blue' };
}

/** Locate the nearest injured teammate to support; healers still move with their army. */
function acquireHealTarget(b, healer) {
  let target = null, best = Infinity;
  for (const unit of b.units) {
    if (unit.dead || unit.side !== healer.side || unit.id === healer.id ||
        unit.hp >= unit.maxHp - 4) continue;
    const d = distance(unit, healer);
    if (d < best && d < 175) { best = d; target = unit; }
  }
  return target;
}

/** Choose the combat target for an already started attack without stale references. */
function resolveTarget(b, unit, targetId) {
  if (targetId === 'gate') return { ...(unit.side === 'blue' ? b.gateRed : b.gateBlue), gate: true };
  return b.units.find(u => u.id === targetId && !u.dead) ?? acquireTarget(b, unit);
}

/** Begin a timed physical attack that can be cloned while charging. */
function beginAttack(unit, target) {
  unit.attackTargetId = target.gate ? 'gate' : target.id;
  unit.windup = TYPES[unit.type].windup;
  unit.attackTimer = TYPES[unit.type].interval;
}

/** Fire a projectile that travels through the battle rather than hitting instantly. */
function shoot(b, u, target, opts = {}) {
  const angle = Math.atan2(target.y - u.y, target.x - u.x) + (opts.angleOffset ?? 0);
  const speed = opts.speed ?? 210;
  b.projectiles.push({
    id: b.nextId++, x: u.x, y: u.y, vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed, side: u.side,
    kind: opts.kind ?? 'arrow', damage: (opts.damage ?? 12) * (opts.alreadyScaled ? 1 : (u.powerScale ?? 1)), splash: opts.splash ?? 0,
    radius: opts.kind === 'shell' ? 10 : opts.kind === 'orb' ? 7 : 4, ttl: 2.1, sourceType: u.type,
  });
  emitParticles(b, u.x, u.y, 3, u.side === 'blue' ? '#bff9ff' : '#ffd19f', 45);
}

/** Inflict an area strike with damage, knockback and deterministic event feedback. */
function slam(b, u, target, damage, radius, damageFortress = true) {
  damage *= (u.powerScale ?? 1);
  const x = clamp(target.x, 0, SIZE.width), y = clamp(target.y, 0, WORLD_HEIGHT);
  let hits = 0;
  for (const opponent of b.units) {
    if (opponent.dead || opponent.side === u.side) continue;
    const d = distance(opponent, { x, y });
    if (d <= radius + opponent.radius) {
      const aerialResist = opponent.type === 'flier' ? .055 : 1;
      damageUnit(b, opponent, damage * aerialResist * (1 - Math.min(.38, d / (radius * 2.5))), u.side);
      hits++;
      const dir = Math.atan2(opponent.y - y, opponent.x - x);
      if (opponent.type !== 'flier') {
        opponent.x = clamp(opponent.x + Math.cos(dir) * 13, 16, 344);
        opponent.y = clamp(opponent.y + Math.sin(dir) * 13, 66, WORLD_HEIGHT - 65);
      }
    }
  }
  const defendingGate = u.side === 'blue' ? b.gateRed : b.gateBlue;
  if (damageFortress && distance({ x, y }, defendingGate) <= radius + defendingGate.radius) {
    damageGate(b, u.side, damage * .85, x, y);
  }
  emitRing(b, x, y, u.side, radius * 1.18);
  if (damage >= 46 && radius >= 60)
    b.effects.push({kind:'impact',x,y,radius:radius*.9,life:.4,totalLife:.4,
      color:u.side==='blue'?'#aeebff':'#ffd49a'});
  emitParticles(b, x, y, 15 + Math.min(24, hits * 4), u.side === 'blue' ? '#b5f9ff' : '#ffc18d', 165);
  b.events.push({ kind: 'slam', side: u.side, hits, x, y, power: damage });
}

/** These skills work identically for the hostile commander and its copied ally. */
function performBossAttack(b,u,arrival=false){
  const foes=b.units.filter(e=>!e.dead&&e.side!==u.side&&distance(e,u)<350)
    .sort((a,c)=>distance(a,u)-distance(c,u));
  const otherGate=u.side==='blue'?b.gateRed:b.gateBlue;
  if(u.type==='earthlord'){
    const epicenter=arrival?u:foes[0]??u;
    slam(b,u,epicenter,arrival?105:95,arrival?135:130,!arrival);
    b.effects.push({kind:'fissure',x:epicenter.x,y:epicenter.y,
      radius:arrival?123:113,angle:u.id*.47,
      life:.62,totalLife:.62,color:u.side==='blue'?'#9eeafa':'#ffd49f'});
    b.events.push({kind:'boss-skill',type:u.type,x:epicenter.x,y:epicenter.y,side:u.side});
  }else if(u.type==='thunderbird'){
    // Visible chained lightning strikes multiple independent targets.
    const hits=foes.slice(0,arrival?5:4);
    let from={x:u.x,y:u.y};
    hits.forEach((target,i)=>{
      damageUnit(b,target,(arrival?40:37)*(1-i*.16)*(u.powerScale??1),u.side);
      b.effects.push({kind:'arc',x:from.x,y:from.y,tx:target.x,ty:target.y,
        life:.42,totalLife:.42,color:u.side==='blue'?'#aafaff':'#e2a4ff'});
      from=target;
    });
    if(!hits.length && u.side==='blue' && distance(u,otherGate)<250)
      damageGate(b,u.side,36*(u.powerScale??1),otherGate.x,otherGate.y);
    b.events.push({kind:'boss-skill',type:u.type,x:u.x,y:u.y,side:u.side});
  }else if(u.type==='fortress'){
    const target=foes[0]??otherGate;
    for(const angleOffset of [-.24,0,.24])
      shoot(b,u,target,{damage:arrival?58:47,splash:arrival?76:64,kind:'shell',
        speed:200,angleOffset});
    for(const dx of [-18,0,18])
      b.effects.push({kind:'muzzle',x:u.x+dx,y:u.y-38,radius:37,
        life:.27,totalLife:.27,color:u.side==='blue'?'#cbfbff':'#ffe4a8'});
    b.events.push({kind:'boss-skill',type:u.type,x:u.x,y:u.y,side:u.side});
  }else if(u.type==='mirrorlord'){
    const allowed=foes.filter(e=>!isBoss(e.type));
    const templates=allowed.sort((a,c)=>TYPES[c.type].hp+TYPES[c.type].damage - TYPES[a.type].hp-TYPES[a.type].damage)
      .slice(0,arrival?3:2);
    // If the enemy army lacks templates, the king still contributes a new army.
    const types=templates.length?templates.map(e=>e.type):['guardian','mage'];
    for(let i=0;i<types.length;i++){
      const type=types[i];
      const unit=addUnit(b,u.side,type,clamp(u.x+(i-(types.length-1)/2)*38,30,330),
        clamp(u.y+(u.side==='red'?45:-45),70,WORLD_HEIGHT-70),
        {powerScale:u.powerScale,spawnGlow:1});
      if(unit){
        emitRing(b,unit.x,unit.y,u.side,unit.radius+27);
        b.effects.push({kind:'portal',x:unit.x,y:unit.y,
          radius:unit.radius+27,life:.64,totalLife:.64,
          color:u.side==='blue'?'#9cefff':'#eec8ff'});
      }
    }
    b.events.push({kind:'boss-skill',type:u.type,x:u.x,y:u.y,side:u.side});
  }
}

/** Execute an attack after its visually telegraphed wind-up ends. */
function performAttack(b, u) {
  u.attackPulse = .36;
  const stats = TYPES[u.type];
  const target = resolveTarget(b, u, u.attackTargetId);
  if (!target) return;
  if (isBoss(u.type)) {
    performBossAttack(b,u);
  } else if (u.type === 'healer') {
    const friend = acquireHealTarget(b, u);
    if (friend) {
      friend.hp = Math.min(friend.maxHp, friend.hp + 28);
      emitRing(b, friend.x, friend.y, 'copy', 26);
      b.events.push({ kind: 'heal', x: friend.x, y: friend.y, side: u.side });
      return;
    }
    // A healer without wounded allies is weak, but is not permanently inert.
    shoot(b, u, target, { damage: 5, kind: 'spark', speed: 170 });
  } else if (u.type === 'guardian') {
    slam(b, u, target, stats.damage, 64);
  } else if (u.type === 'titan') {
    slam(b, u, target, stats.damage, 85);
  } else if (u.type === 'mage') {
    shoot(b, u, target, { damage: stats.damage, splash: 42, kind: 'orb', speed: 155 });
  } else if (u.type === 'raider') {
    // A charge cuts through a defensive front, striking an area behind the first line.
    const angle = Math.atan2(target.y - u.y, target.x - u.x);
    u.x = clamp(u.x + Math.cos(angle) * 75, u.radius, SIZE.width-u.radius);
    u.y = clamp(u.y + Math.sin(angle) * 75, 65+u.radius, WORLD_HEIGHT-65-u.radius);
    slam(b, u, { x:u.x, y:u.y }, 33, 32);
  } else if (u.type === 'cannon') {
    shoot(b,u,target,{damage:stats.damage,splash:65,kind:'orb',speed:190});
  } else if (u.type === 'summoner') {
    const dir=u.side==='blue'?-1:1;
    for (let i=0;i<2;i++) addUnit(b,u.side,i===0?'sword':'raider',
      clamp(u.x+(i?18:-18),25,335),clamp(u.y+dir*(26+i*9),80,WORLD_HEIGHT-80),
      {powerScale:u.powerScale,spawnGlow:.65});
    emitRing(b,u.x,u.y,u.side,44);
    b.events.push({kind:'summon',side:u.side});
  } else if (u.type === 'flier') {
    shoot(b, u, target, { damage: stats.damage, kind: 'spark', speed: 230 });
  } else if (u.type === 'archer') {
    shoot(b, u, target, { damage: stats.damage, kind: 'arrow', speed: 250 });
  } else if (target.type === 'flier') {
    // Melee weapons cannot strike enemies in the air; archers and mages have a job.
    return;
  } else if (target.gate) {
    damageGate(b, u.side, stats.damage * (u.powerScale ?? 1), target.x, target.y);
    b.effects.push({kind:'slash',x:target.x,y:target.y,angle:0,
      color:u.side==='blue'?'#b1faff':'#ffe1aa',life:.18,totalLife:.18});
  } else {
    damageUnit(b, target, stats.damage * (u.powerScale ?? 1), u.side);
    emitRing(b, target.x, target.y, u.side, 21);
    b.effects.push({kind:'slash',x:target.x,y:target.y,
      angle:(u.id%5-2)*.25,color:u.side==='blue'?'#b1faff':'#ffe1aa',
      life:.21,totalLife:.21});
  }
}

/** Simulate a single soldier, including collision spacing, movement, and attacks. */
function updateUnit(b, u, dt) {
  const stats = TYPES[u.type];
  u.flash = Math.max(0, u.flash - dt);
  u.hurtPulse = Math.max(0, (u.hurtPulse??0) - dt);
  u.attackPulse = Math.max(0, (u.attackPulse??0) - dt);
  u.spawnGlow = Math.max(0, u.spawnGlow - dt);
  u.step += dt * stats.speed / 10;
  u.attackTimer = Math.max(0, u.attackTimer - dt);
  if (u.windup > 0) {
    u.windup -= dt;
    if (u.windup <= 0) {
      u.windup = 0;
      performAttack(b, u);
    }
    return;
  }

  const friend = u.type === 'healer' ? acquireHealTarget(b, u) : null;
  const target = friend ?? acquireTarget(b, u);
  if (!target) return;
  const d = distance(u, target) || 1;
  if (target.rally && d < 28) return;
  const reach = friend ? 117 : stats.range + (target.radius ?? 0);
  if (friend && u.attackTimer <= 0 && d <= 132) {
    beginAttack(u, friend);
    return;
  }
  if (!target.rally && d <= reach && u.attackTimer <= 0) {
    beginAttack(u, target);
    return;
  }
  let move = d > reach * .79 ? 1 : 0;
  if (['archer','mage','healer'].includes(u.type) && d < reach * .42) move = -.52;
  if (move !== 0) {
    // March briskly through empty space; slow down on entering weapon range.
    const advanceBoost = u.side === 'blue' && d > 270 ? 1.8 : 1;
    let vx = (target.x - u.x) / d * stats.speed * dt * move * advanceBoost;
    let vy = (target.y - u.y) / d * stats.speed * dt * move * advanceBoost;
    u.x += vx;
    u.y += vy;
    // Spread the army into readable lanes instead of stacking at the same center point.
    // Calculate one bounded impulse rather than pushing the unit once per neighbor.
    let separateX = 0, separateY = 0, neighbors = 0;
    for (const ally of b.units) {
      if (ally.dead || ally.id === u.id || ally.side !== u.side) continue;
      let dx = u.x - ally.x, dy = u.y - ally.y;
      let d = Math.hypot(dx, dy);
      const space = u.radius + ally.radius + 6;
      if (d >= space) continue;
      if (d < .5) {
        const angle = (u.id * 2.399963 + ally.id * .51);
        dx = Math.cos(angle); dy = Math.sin(angle); d = 1;
      }
      const pressure = (space - d) / space;
      separateX += dx/d * pressure;
      separateY += dy/d * pressure;
      neighbors++;
    }
    if (neighbors) {
      u.x += clamp(separateX * 7, -6, 6);
      u.y += clamp(separateY * 7, -6, 6);
    }
    u.x = clamp(u.x, u.radius, SIZE.width - u.radius);
    u.y = clamp(u.y, 66 + u.radius, WORLD_HEIGHT - 67 - u.radius);
    if (u.side === 'blue' && b.gateRed.hp > 0) {
      u.y = Math.max(u.y, b.gateRed.y + b.gateRed.radius + u.radius + 5);
    }
    if (Math.abs(vy) > .1) u.facing = Math.sign(vy);
  }
}

/** Detect a projectile's first impact, including explosive blast radius. */
function updateProjectile(b, p, dt) {
  p.ttl -= dt;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  if (p.ttl <= 0 || p.x < -25 || p.x > SIZE.width + 25 || p.y < -30 || p.y > WORLD_HEIGHT + 30) {
    p.dead = true;
    return;
  }
  let impact = null;
  for (const unit of b.units) {
    if (unit.dead || unit.side === p.side) continue;
    if (distance(unit, p) <= unit.radius + p.radius + 1) {
      impact = unit; break;
    }
  }
  const gate = p.side === 'blue' ? b.gateRed : b.gateBlue;
  if (!impact && distance(p, gate) < gate.radius + p.radius) impact = { gate: true, ...gate };
  if (!impact) return;
  p.dead = true;
  if (p.splash > 0) {
    slam(b, { side: p.side, type: p.sourceType }, impact, p.damage, p.splash);
  } else if (impact.gate) {
    damageGate(b, p.side, p.damage, p.x, p.y);
  } else {
    damageUnit(b, impact, p.damage, p.side);
    emitRing(b, impact.x, impact.y, p.side, 18);
  }
}

/** Deploy distinctive defenders beyond a newly captured sector. */
function deployDefenders(b, index) {
  const stage = b.chapterStages[index];
  for (const type of stage.defenders) {
    const x = clamp(75 + b.rand() * 210, 25, 335);
    const y = stage.entry + b.rand() * 130;
    const unit=addUnit(b, 'red', type, x, y);
    if(unit && isBoss(type)) {
      // Spawn the commander centered, close to the direction of advance.
      unit.x=180;unit.y=stage.entry+80;
      unit.attackTimer=1.6;
      b.events.push({kind:'boss-arrived',type});
    }
  }
  emitRing(b, 180, stage.entry, 'red', 72);
}

/** Reinforcement composition depends on territory, not an arbitrary global kill counter. */
function spawnWave(b) {
  b.wave++;
  const stage = b.chapterStages[b.stage];
  const mix = stage.waves[b.wave % stage.waves.length];
  for (const type of mix) {
    if (b.units.length >= UNIT_LIMIT - 8) break;
    addUnit(b, 'red', type, clamp(72 + b.rand() * 216, 18, 342), stage.entry + b.rand() * 82);
  }
  b.events.push({ kind: 'wave', wave:b.wave, stage:b.stage });
}

/** Reinforcement arrives near the visible frontline, not back at an offscreen base. */
function spawnAllySupport(b) {
  if (b.units.length < UNIT_LIMIT - 10) {
    const y = Math.min(WORLD_HEIGHT-110, b.cameraY + SIZE.height - 110);
    addUnit(b, 'blue', b.rand() < .35 ? 'archer' : 'sword', 126 + b.rand()*108, y);
    addUnit(b, 'blue', 'sword', 110 + b.rand()*140, y + 17);
  }
}

/** Capturing a fortified line opens a supply route, visibly helping the army push onward. */
function deployCapturedReinforcements(b, y) {
  const blue=['sword','sword','archer','healer'];
  for (const type of blue) {
    addUnit(b,'blue',type,95 + b.rand()*170,y + 45 + b.rand()*65);
  }
  emitRing(b,180,y+70,'copy',90);
}

/** Camera advances with the living army without teleporting or changing world physics. */
function updateCamera(b, dt) {
  const allies = b.units.filter(u => u.side === 'blue' && !u.dead);
  const front = allies.map(u => u.y).sort((a, c) => a - c);
  const tip = front.length ? front[Math.floor((front.length - 1) * .18)] : b.cameraY + 350;
  const sectorFloor = Math.max(0, b.gateRed.y - 200);
  // Keep the allied frontline lower-middle and next defenders in the upper half.
  // A newly copied forward scout must not yank the camera away from the army.
  const target = Math.max(sectorFloor, clamp(tip - 450, 0, WORLD_HEIGHT - SIZE.height));
  if (target < b.cameraY) b.cameraY += (target - b.cameraY) * Math.min(1, dt * 2.1);
  b.cameraY = clamp(b.cameraY, 0, WORLD_HEIGHT - SIZE.height);
  // The protected command convoy advances with the camera, so threats stay actionable.
  b.gateBlue.y = b.cameraY + SIZE.height - 56;
  b.explored = Math.max(b.explored, WORLD_HEIGHT - SIZE.height - b.cameraY);
}

/** Tick the deterministic battle and clean up dead entities and expired effects. */
export function updateBattle(b, dt) {
  if (b.result !== 'playing') return;
  dt = clamp(dt, 0, .045);
  b.time += dt;
  b.enemyTimer -= dt;
  b.allyTimer -= dt;
  if (b.enemyTimer <= 0) {
    spawnWave(b);
    b.enemyTimer += b.stage === 2 ? 11.5 : 13.5;
  }
  if (b.allyTimer <= 0) {
    spawnAllySupport(b);
    b.allyTimer += 8.5;
  }
  for (const u of b.units) if (!u.dead) updateUnit(b, u, dt);
  for (const p of b.projectiles) if (!p.dead) updateProjectile(b, p, dt);
  updateCamera(b, dt);
  b.units = b.units.filter(u => !u.dead);
  b.projectiles = b.projectiles.filter(p => !p.dead);
  b.effects = b.effects.filter(e => {
    e.life -= dt;
    if (e.kind === 'particle') {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.vx *= 1 - dt * 2;
      e.vy *= 1 - dt * 2;
    }
    return e.life > 0;
  });
  b.floating = b.floating.filter(e => { e.life -= dt; e.y -= dt * 20; return e.life > 0; });
  // Threat comes from losing the frontline, not a hidden/offscreen base's HP.
  const blue = b.units.filter(u => u.side === 'blue');
  const visibleReds = b.units.filter(u => u.side === 'red' &&
    u.y >= b.cameraY - 50 && u.y <= b.cameraY + SIZE.height + 70);
  const strength = units => units.reduce((sum, u) =>
    sum + (u.hp / u.maxHp) * (u.type === 'titan' ? 5
      : u.type === 'guardian' ? 2.8 : u.type === 'mage' ? 1.6 : 1), 0);
  const alliedPower = strength(blue);
  const hostilePower = strength(visibleReds);
  const overwhelmed = alliedPower < 1 || hostilePower > alliedPower * 1.8;
  b.commandMorale = clamp(b.commandMorale + dt * (overwhelmed ? -3.7 : 2.8), 0, 100);
  if (!b.moraleWarning && b.commandMorale < 30) {
    b.moraleWarning = true;
    b.events.push({ kind: 'morale-low' });
  }
  if (b.commandMorale > 60) b.moraleWarning = false;
  if (b.commandMorale <= 0 && b.result === 'playing') {
    b.result = 'lost';
    b.events.push({ kind: 'end', result: b.result });
  }
  if (b.time >= b.timeLimit && b.result === 'playing') {
    b.result = 'lost';
    b.events.push({ kind: 'end', result: b.result });
  }
}