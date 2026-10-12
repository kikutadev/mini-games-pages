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

/** Initialize two autonomous armies and deliberately expose a dangerous early giant. */
export function createBattle(seed = 19) {
  const battle = {
    time: 0, timeLimit: 100, result: 'playing', seed, rand: randomGenerator(seed),
    nextId: 1, units: [], projectiles: [], effects: [], floating: [], events: [],
    lastClone: null, copied: 0, kills: { blue: 0, red: 0 }, wave: 1,
    gateBlue: { x: 180, y: 565, hp: 430, maxHp: 430, radius: 31 },
    gateRed: { x: 180, y: 35, hp: 620, maxHp: 620, radius: 31 },
    enemyTimer: 6.5, allyTimer: 8.0, bossSpawned: false, actionCount: 0,
    synergy: 0,
  };
  addUnit(battle, 'blue', 'sword', 136, 463);
  addUnit(battle, 'blue', 'sword', 181, 470);
  addUnit(battle, 'blue', 'sword', 228, 463);
  addUnit(battle, 'blue', 'archer', 165, 512);
  addUnit(battle, 'red', 'guardian', 175, 225);
  addUnit(battle, 'red', 'sword', 108, 271);
  addUnit(battle, 'red', 'sword', 251, 273);
  addUnit(battle, 'red', 'archer', 113, 159);
  addUnit(battle, 'red', 'archer', 251, 162);
  addUnit(battle, 'red', 'mage', 180, 110);
  return battle;
}

/** Create a team-owned combat unit with immutable class configuration. */
export function addUnit(battle, side, type, x, y, overrides = {}) {
  if (!(type in TYPES) || !['blue', 'red'].includes(side)) return null;
  if (battle.units.length >= UNIT_LIMIT) return null;
  const stats = TYPES[type];
  const unit = {
    id: battle.nextId++, side, type, x, y, radius: stats.radius,
    hp: stats.hp, maxHp: stats.hp, attackTimer: battle.rand() * .35,
    windup: 0, attackTargetId: null, flash: 0, spawnGlow: .5,
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
  const position = { x: clamp(x, 21, 339), y: clamp(y, 75, 526) };
  if (distance(position, battle.gateBlue) < battle.gateBlue.radius + source.radius + 8 ||
      distance(position, battle.gateRed) < battle.gateRed.radius + source.radius + 8) {
    return { ok: false, reason: 'blocked' };
  }
  const copy = addUnit(battle, 'blue', source.type, position.x, position.y, {
    attackTimer: source.windup > 0 ? 0 : Math.min(source.attackTimer, .18),
    windup: source.windup > 0 ? Math.max(.1, source.windup) : 0,
    copyGeneration: source.copyGeneration + 1,
    sourceId: source.id, facing: -1, spawnGlow: .9,
  });
  if (!copy) return { ok: false, reason: 'limit' };
  battle.copied++;
  battle.actionCount++;
  battle.lastClone = { type: copy.type, x: copy.x, y: copy.y, time: battle.time };
  emitRing(battle, copy.x, copy.y, 'copy', 42);
  emitParticles(battle, copy.x, copy.y, 19, '#8cf4ff', 100);
  // Large copied soldiers crash into the field as immediate, visible reinforcements.
  // The shockwave uses the same damage/knockback rule as their ordinary area attack.
  if (copy.type === 'guardian' || copy.type === 'titan') {
    slam(battle, copy, { x: copy.x, y: copy.y },
      copy.type === 'titan' ? 86 : 65,
      copy.type === 'titan' ? 132 : 105);
  }
  const baseScore = source.type === 'titan' ? 4 : source.type === 'guardian' ? 3 : 1;
  battle.synergy += baseScore;
  battle.events.push({ kind: 'clone', type: source.type, x: copy.x, y: copy.y });
  return { ok: true, unit: copy };
}

/** Create a particle burst that signals hit impact without spawning game objects. */
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
    color: kind === 'copy' ? '#8cf1ff' : kind === 'red' ? '#ffaf82' : '#a9edfa',
  });
}

/** Apply direct damage to a unit exactly once per hit, with death feedback. */
function damageUnit(b, unit, damage, side) {
  if (!unit || unit.dead || damage <= 0) return;
  unit.hp = Math.max(0, unit.hp - damage);
  unit.flash = .16;
  emitParticles(b, unit.x, unit.y, damage >= 35 ? 9 : 4,
    unit.side === 'blue' ? '#80e6fa' : '#ffb989', damage >= 35 ? 155 : 85);
  if (unit.hp > 0) return;
  unit.dead = true;
  b.kills[side]++;
  emitRing(b, unit.x, unit.y, side, unit.radius * 3);
  emitParticles(b, unit.x, unit.y, 13 + Math.ceil(unit.radius * .6),
    unit.side === 'blue' ? '#8df0ff' : '#ffb280', 165);
  if (unit.type === 'titan') {
    b.events.push({ kind: 'titan-down', side, x: unit.x, y: unit.y });
  }
}

/** Damage an opposing gate when a victorious squad breaks through the frontline. */
function damageGate(b, side, damage, x, y) {
  if (b.result !== 'playing') return;
  const gate = side === 'blue' ? b.gateRed : b.gateBlue;
  gate.hp = Math.max(0, gate.hp - damage);
  emitRing(b, x, y, side, 23);
  if (gate.hp <= 0) {
    b.result = side === 'blue' ? 'won' : 'lost';
    b.events.push({ kind: 'end', result: b.result });
    emitParticles(b, gate.x, gate.y, 90, side === 'blue' ? '#b3f6ff' : '#ffba8c', 250);
  }
}

/** Find the nearest opposing target based on actual battlefield coordinates. */
function acquireTarget(b, u) {
  const stats = TYPES[u.type];
  let target = null, best = Infinity;
  for (const opponent of b.units) {
    if (opponent.dead || opponent.side === u.side) continue;
    const dx = opponent.x - u.x, dy = opponent.y - u.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < best) { target = opponent; best = d2; }
  }
  const opposingGate = u.side === 'blue' ? b.gateRed : b.gateBlue;
  const gateDistance = distance(u, opposingGate);
  // Nearby enemies are prioritized over buildings, preventing backdoor spawning exploits.
  if (target && (Math.sqrt(best) < 155 || gateDistance > 82)) return target;
  if (gateDistance < 105 && !target) return { ...opposingGate, gate: true, side: u.side === 'blue' ? 'red' : 'blue' };
  if (target && gateDistance <= 100 && Math.sqrt(best) > 125) {
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
  const angle = Math.atan2(target.y - u.y, target.x - u.x);
  const speed = opts.speed ?? 210;
  b.projectiles.push({
    id: b.nextId++, x: u.x, y: u.y, vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed, side: u.side,
    kind: opts.kind ?? 'arrow', damage: opts.damage ?? 12, splash: opts.splash ?? 0,
    radius: opts.kind === 'orb' ? 7 : 4, ttl: 2.1, sourceType: u.type,
  });
  emitParticles(b, u.x, u.y, 3, u.side === 'blue' ? '#bff9ff' : '#ffd19f', 45);
}

/** Inflict an area strike with damage, knockback and deterministic event feedback. */
function slam(b, u, target, damage, radius) {
  const x = clamp(target.x, 0, SIZE.width), y = clamp(target.y, 0, SIZE.height);
  let hits = 0;
  for (const opponent of b.units) {
    if (opponent.dead || opponent.side === u.side) continue;
    const d = distance(opponent, { x, y });
    if (d <= radius + opponent.radius) {
      damageUnit(b, opponent, damage * (1 - Math.min(.38, d / (radius * 2.5))), u.side);
      hits++;
      const dir = Math.atan2(opponent.y - y, opponent.x - x);
      opponent.x = clamp(opponent.x + Math.cos(dir) * 13, 16, 344);
      opponent.y = clamp(opponent.y + Math.sin(dir) * 13, 75, 526);
    }
  }
  const defendingGate = u.side === 'blue' ? b.gateRed : b.gateBlue;
  if (distance({ x, y }, defendingGate) <= radius + defendingGate.radius) {
    damageGate(b, u.side, damage * .85, x, y);
  }
  emitRing(b, x, y, u.side, radius * 1.18);
  emitParticles(b, x, y, 15 + Math.min(24, hits * 4), u.side === 'blue' ? '#b5f9ff' : '#ffc18d', 165);
  b.events.push({ kind: 'slam', side: u.side, hits, x, y, power: damage });
}

/** Execute an attack after its visually telegraphed wind-up ends. */
function performAttack(b, u) {
  const stats = TYPES[u.type];
  const target = resolveTarget(b, u, u.attackTargetId);
  if (!target) return;
  if (u.type === 'healer') {
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
  } else if (u.type === 'archer') {
    shoot(b, u, target, { damage: stats.damage, kind: 'arrow', speed: 250 });
  } else if (target.gate) {
    damageGate(b, u.side, stats.damage, target.x, target.y);
  } else {
    damageUnit(b, target, stats.damage, u.side);
    emitRing(b, target.x, target.y, u.side, 21);
  }
}

/** Simulate a single soldier, including collision spacing, movement, and attacks. */
function updateUnit(b, u, dt) {
  const stats = TYPES[u.type];
  u.flash = Math.max(0, u.flash - dt);
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

  const target = acquireTarget(b, u);
  if (!target) return;
  const d = distance(u, target) || 1;
  const reach = stats.range + (target.radius ?? 0);
  if (u.type === 'healer') {
    const friend = acquireHealTarget(b, u);
    if (friend && u.attackTimer <= 0 && distance(u, friend) <= 132) {
      beginAttack(u, friend);
      return;
    }
  }
  if (d <= reach && u.attackTimer <= 0) {
    beginAttack(u, target);
    return;
  }
  let move = d > reach * .79 ? 1 : 0;
  if (['archer','mage','healer'].includes(u.type) && d < reach * .42) move = -.52;
  if (move !== 0) {
    let vx = (target.x - u.x) / d * stats.speed * dt * move;
    let vy = (target.y - u.y) / d * stats.speed * dt * move;
    u.x += vx;
    u.y += vy;
    // Soldiers softly repel allied bodies, preserving readability of formations.
    for (const ally of b.units) {
      if (ally.dead || ally.id === u.id || ally.side !== u.side) continue;
      const dx = u.x - ally.x, dy = u.y - ally.y;
      const radius = u.radius + ally.radius;
      const d2 = dx * dx + dy * dy;
      if (d2 > 1 && d2 < radius * radius) {
        const factor = (radius - Math.sqrt(d2)) * .055;
        u.x += dx / Math.sqrt(d2) * factor;
        u.y += dy / Math.sqrt(d2) * factor;
      }
    }
    u.x = clamp(u.x, u.radius, SIZE.width - u.radius);
    u.y = clamp(u.y, 67 + u.radius, SIZE.height - 67 - u.radius);
    if (Math.abs(vy) > .1) u.facing = Math.sign(vy);
  }
}

/** Detect a projectile's first impact, including explosive blast radius. */
function updateProjectile(b, p, dt) {
  p.ttl -= dt;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  if (p.ttl <= 0 || p.x < -25 || p.x > SIZE.width + 25 || p.y < -30 || p.y > SIZE.height + 30) {
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

/** Spawn successive enemy mixes that introduce classes without tutorial screens. */
function spawnWave(b) {
  b.wave++;
  const types = b.time < 17 ? ['sword','sword','archer']
    : b.time < 35 ? ['sword','guardian','healer','archer']
    : b.time < 62 ? ['guardian','mage','sword','archer']
    : ['guardian','mage','healer','archer','sword'];
  for (const type of types) {
    if (b.units.length >= UNIT_LIMIT - 8) break;
    addUnit(b, 'red', type, clamp(90 + b.rand() * 180, 20, 340), 91 + b.rand() * 58);
  }
  emitRing(b, b.gateRed.x, 89, 'red', 62);
  b.events.push({ kind: 'wave', wave: b.wave });
}

/** Sustain a modest allied force, so copying remains the decisive source of strength. */
function spawnAllySupport(b) {
  if (b.units.length < UNIT_LIMIT - 6) {
    const x = 110 + b.rand() * 140;
    addUnit(b, 'blue', b.rand() < .25 ? 'archer' : 'sword', x, 510);
  }
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
    b.enemyTimer += b.time > 55 ? 7.8 : 9.5;
  }
  if (b.allyTimer <= 0) {
    spawnAllySupport(b);
    b.allyTimer += 6.8;
  }
  if (!b.bossSpawned && (b.time >= 12 || b.gateRed.hp < 470)) {
    b.bossSpawned = true;
    addUnit(b, 'red', 'titan', 180, 122, { attackTimer: .8 });
    b.events.push({ kind: 'boss' });
  }
  for (const u of b.units) if (!u.dead) updateUnit(b, u, dt);
  for (const p of b.projectiles) if (!p.dead) updateProjectile(b, p, dt);
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
  if (b.time >= b.timeLimit && b.result === 'playing') {
    b.result = 'lost';
    b.events.push({ kind: 'end', result: b.result });
  }
}