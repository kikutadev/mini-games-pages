/**
 * COPY WAR simulation.
 * All battlefield objects share a snapshot contract so their live state can be pasted elsewhere.
 */
export const WORLD = Object.freeze({ width: 360, height: 600 });
export const MAX_ENTITIES = 320;
export const CLONE_LIFE = 4;

const TAU = Math.PI * 2;

/** A reproducible random generator keeps tests and encounter patterns stable. */
export function createRandom(seed = 107) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Construct the initial playable world and spawn its first attackers. */
export function createGame(seed = 107) {
  const state = {
    time: 0, remaining: 82, core: { x: 180, y: 305, r: 25, hp: 100, maxHp: 100 },
    phase: 'playing', score: 0, kills: 0, combo: 0, comboTime: 0,
    cloneCount: 0, maxChain: 0, nextId: 1, enemiesSpawned: 0,
    spawnTimer: 4.3, clipboard: null, entities: [], particles: [], shockwaves: [],
    effects: [], events: [], rand: createRandom(seed), tutorialStep: 0,
    tutorialTime: 0, bigHit: 0,
  };
  addEnemy(state, 37, 170, 'blaster');
  addEnemy(state, 320, 405, 'blaster');
  addEnemy(state, 182, 42, 'rocket');
  // A conspicuous, slow initial volley lets players learn the action immediately.
  addProjectile(state, 'bolt', 38, 292, 1, 0.04, { speed: 105, parent: null });
  return state;
}

/** Add a type-aware entity without leaking its mutable state into other objects. */
function addEntity(state, data) {
  if (state.entities.length >= MAX_ENTITIES) return null;
  const obj = { id: state.nextId++, cloneUntil: null, generation: 0, ...data };
  state.entities.push(obj);
  return obj;
}

/** Spawn a hostile shooter with explicit visual identity and attack rhythm. */
export function addEnemy(state, x, y, kind = 'blaster') {
  const hp = kind === 'rocket' ? 45 : kind === 'bomber' ? 34 : kind === 'boss' ? 230 : 30;
  return addEntity(state, {
    kind: 'enemy', enemyKind: kind, x, y, vx: 0, vy: 0, r: kind === 'boss' ? 27 : kind === 'rocket' ? 15 : 13,
    hp, maxHp: hp, cooldown: 0.5 + state.rand() * 0.9, attackInterval:
      kind === 'boss' ? 1.05 : kind === 'rocket' ? 3.1 : kind === 'bomber' ? 3.0 : 1.85,
    orbit: state.rand() > 0.5 ? 1 : -1,
    speed: kind === 'boss' ? 12 : kind === 'rocket' ? 12 : 17,
    pulse: 0, flash: 0,
  });
}

/** Spawn a projectile, preserving the caller's chosen speed, fuse, and provenance. */
export function addProjectile(state, kind, x, y, dx, dy, options = {}) {
  const length = Math.hypot(dx, dy) || 1;
  const speed = options.speed ?? (kind === 'rocket' ? 92 : kind === 'bomb' ? 76 : 160);
  return addEntity(state, {
    kind, x, y, vx: dx / length * speed, vy: dy / length * speed,
    r: kind === 'rocket' ? 9 : kind === 'bomb' ? 11 : 6,
    hp: 1, damage: kind === 'rocket' ? 26 : kind === 'bomb' ? 30 : 12,
    ttl: options.ttl ?? (kind === 'bomb' ? 2.25 : 4.5),
    fuse: options.fuse ?? (kind === 'bomb' ? 1.65 : 0),
    parent: options.parent ?? null, generation: options.generation ?? 0,
    trail: [], flash: 0, angle: Math.atan2(dy, dx),
    cloneUntil: options.cloneUntil ?? null,
  });
}

/** An explosion is a short-lived, snapshot-compatible damaging phenomenon. */
export function addExplosion(state, x, y, radius = 34, options = {}) {
  const e = addEntity(state, {
    kind: 'explosion', x, y, vx: 0, vy: 0, r: radius,
    ttl: options.ttl ?? 0.37, totalTtl: options.totalTtl ?? 0.37,
    damage: options.damage ?? 40, hitIds: new Set(options.hitIds ?? []),
    generation: options.generation ?? 0,
    cloneUntil: options.cloneUntil ?? null,
  });
  if (e) emitParticles(state, x, y, 15, '#ffc578', 170);
  state.shockwaves.push({ x, y, r: 1, max: radius * 1.7, ttl: 0.32, total: 0.32 });
  return e;
}

/** Produce lightweight particles for readable, low-cost collision feedback. */
function emitParticles(state, x, y, count, color = '#ffbc72', speed = 120) {
  for (let i = 0; i < count && state.particles.length < 450; i++) {
    const angle = state.rand() * TAU;
    const vel = speed * (0.35 + state.rand() * 0.9);
    state.particles.push({
      x, y, vx: Math.cos(angle) * vel, vy: Math.sin(angle) * vel,
      life: 0.16 + state.rand() * 0.4, max: 0.6, size: 1.5 + state.rand() * 2.5, color,
    });
  }
}

/** Apply damage to an enemy, award feedback once, and remove it when depleted. */
function hitEnemy(state, enemy, damage, fromClone = false) {
  if (enemy.dead || enemy.hp <= 0) return;
  enemy.hp -= damage;
  enemy.flash = 0.13;
  emitParticles(state, enemy.x, enemy.y, 5, '#ff797c', 76);
  if (enemy.hp > 0) return;
  enemy.dead = true;
  state.kills++;
  state.combo++;
  state.comboTime = 3.5;
  state.score += (enemy.enemyKind === 'boss' ? 400 : 45) * Math.min(8, state.combo);
  if (fromClone) state.maxChain = Math.max(state.maxChain, state.combo);
  emitParticles(state, enemy.x, enemy.y, enemy.enemyKind === 'boss' ? 44 : 19, '#ffdc99', 215);
  state.shockwaves.push({ x: enemy.x, y: enemy.y, r: 2, max: enemy.r * 3.3, ttl: 0.38, total: 0.38 });
  state.effects.push({ text: '+' + (enemy.enemyKind === 'boss' ? 400 : 45), x: enemy.x, y: enemy.y, ttl: 0.9 });
  if (enemy.enemyKind === 'boss') state.phase = 'won';
}

/** Fire at the core with a heading fixed at the instant of launch. */
function shoot(state, enemy) {
  const angle = Math.atan2(state.core.y - enemy.y, state.core.x - enemy.x);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const startX = enemy.x + dx * (enemy.r + 8);
  const startY = enemy.y + dy * (enemy.r + 8);
  if (enemy.enemyKind === 'boss') {
    for (const a of [-0.23, 0, 0.23]) addProjectile(state, 'bolt', startX, startY,
      Math.cos(angle + a), Math.sin(angle + a), { speed: 165 });
  } else {
    const kind = enemy.enemyKind === 'rocket' ? 'rocket' : enemy.enemyKind === 'bomber' ? 'bomb' : 'bolt';
    addProjectile(state, kind, startX, startY, dx, dy);
  }
  emitParticles(state, startX, startY, 3, '#ffe8a0', 50);
}

/** Advance enemies and projectiles and resolve core impact and enemy collisions. */
export function updateGame(state, dt) {
  if (state.phase !== 'playing') return;
  dt = Math.min(Math.max(0, dt), 0.05);
  state.time += dt;
  state.remaining = Math.max(0, state.remaining - dt);
  state.bigHit = Math.max(0, state.bigHit - dt);
  if (state.comboTime > 0) state.comboTime -= dt;
  else state.combo = 0;
  if (state.remaining <= 0) {
    state.phase = 'won';
    return;
  }
  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0) {
    const count = state.time > 54 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const angle = state.rand() * TAU;
      const radius = 230 + state.rand() * 70;
      const x = Math.max(20, Math.min(WORLD.width - 20, state.core.x + Math.cos(angle) * radius));
      const y = Math.max(20, Math.min(WORLD.height - 20, state.core.y + Math.sin(angle) * radius));
      const kind = state.time > 35 && state.rand() < 0.2 ? 'bomber' : state.rand() < 0.24 ? 'rocket' : 'blaster';
      addEnemy(state, x, y, kind);
      state.enemiesSpawned++;
    }
    state.spawnTimer = Math.max(1.7, 4.4 - state.time / 38);
  }

  // A finishing boss is a new pressure source rather than a new ability.
  if (!state.bossSpawned && state.remaining < 16) {
    state.bossSpawned = true;
    addEnemy(state, 180, 40, 'boss');
    state.events.push({ type: 'boss' });
  }

  for (const e of state.entities) {
    if (e.dead) continue;
    if (e.cloneUntil !== null && state.time >= e.cloneUntil) {
      e.dead = true;
      emitParticles(state, e.x, e.y, 5, '#8feaff', 55);
      continue;
    }
    e.flash = Math.max(0, (e.flash || 0) - dt);
    if (e.kind === 'enemy') {
      const cx = state.core.x - e.x, cy = state.core.y - e.y;
      const distance = Math.hypot(cx, cy) || 1;
      // Enemies orbit outside the core instead of piling directly over it.
      const radial = distance > 125 ? 1 : distance < 88 ? -1 : 0;
      const moving = e.speed * dt;
      e.x += (cx / distance * radial - cy / distance * 0.28 * e.orbit) * moving;
      e.y += (cy / distance * radial + cx / distance * 0.28 * e.orbit) * moving;
      e.cooldown -= dt;
      if (e.cooldown <= 0) {
        shoot(state, e);
        e.cooldown += e.attackInterval;
      }
    } else if (e.kind === 'explosion') {
      e.ttl -= dt;
      if (e.ttl <= 0) { e.dead = true; continue; }
      // A newly pasted explosion can damage new targets even if the source already hit others.
      const currentR = e.r * (1.2 - e.ttl / e.totalTtl * 0.2);
      for (const other of state.entities) {
        if (other.dead || other.kind !== 'enemy' || e.hitIds.has(other.id)) continue;
        if (Math.hypot(e.x - other.x, e.y - other.y) <= currentR + other.r) {
          e.hitIds.add(other.id);
          hitEnemy(state, other, e.damage, e.generation > 0);
        }
      }
    } else {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.ttl -= dt;
      if (e.kind === 'bomb') {
        e.fuse -= dt;
        e.vx *= 1 - dt * 0.28;
        e.vy *= 1 - dt * 0.28;
        if (e.fuse <= 0) {
          e.dead = true; addExplosion(state, e.x, e.y, 42, { generation: e.generation, cloneUntil: e.cloneUntil }); continue;
        }
      }
      if (e.ttl <= 0 || e.x < -40 || e.x > WORLD.width + 40 || e.y < -40 || e.y > WORLD.height + 40) {
        e.dead = true; continue;
      }
      for (const enemy of state.entities) {
        if (enemy.dead || enemy.kind !== 'enemy') continue;
        if (Math.hypot(e.x - enemy.x, e.y - enemy.y) < e.r + enemy.r) {
          e.dead = true;
          hitEnemy(state, enemy, e.damage, e.generation > 0);
          if (e.kind === 'rocket' || e.kind === 'bomb') addExplosion(state, e.x, e.y, 36, { generation: e.generation, cloneUntil: e.cloneUntil });
          break;
        }
      }
      if (!e.dead && Math.hypot(e.x - state.core.x, e.y - state.core.y) < e.r + state.core.r - 6) {
        e.dead = true;
        const damage = e.kind === 'bolt' ? 1 : e.kind === 'bomb' ? 5 : 3;
        state.core.hp = Math.max(0, state.core.hp - damage);
        state.bigHit = 0.25;
        state.events.push({ type: 'core-hit', hp: state.core.hp });
        emitParticles(state, e.x, e.y, 14, '#7feaff', 125);
        if (e.kind !== 'bolt') addExplosion(state, e.x, e.y, 25, { damage: 0 });
        if (state.core.hp <= 0) state.phase = 'lost';
      }
    }
  }
  state.entities = state.entities.filter(e => !e.dead);
  state.particles = state.particles.filter(p => {
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= 1 - dt * 2.7; p.vy *= 1 - dt * 2.7;
    p.life -= dt;
    return p.life > 0;
  });
  state.shockwaves = state.shockwaves.filter(s => { s.ttl -= dt; return s.ttl > 0; });
  state.effects = state.effects.filter(s => { s.ttl -= dt; s.y -= 20 * dt; return s.ttl > 0; });
  state.tutorialTime += dt;
}

/** Find the nearest clonable object for one-tap copy, with a generous hit radius. */
export function pickEntity(state, x, y) {
  let best = null;
  let bestDistance = 37;
  for (const e of state.entities) {
    if (e.dead) continue;
    const distance = Math.hypot(e.x - x, e.y - y) - e.r;
    if (distance < bestDistance) { bestDistance = distance; best = e; }
  }
  return best;
}

/** Capture objects relative to the selected area center, including live dynamic state. */
export function copyRegion(state, x, y, width = 74, height = 74) {
  if (state.phase !== 'playing') return null;
  const hw = width / 2, hh = height / 2;
  const selected = state.entities.filter(e => !e.dead && Math.abs(e.x - x) <= hw + e.r * .25 && Math.abs(e.y - y) <= hh + e.r * .25);
  if (!selected.length) return null;
  const items = selected.slice(0, 55).map(e => ({
    ...e, x: e.x - x, y: e.y - y,
    hitIds: e.hitIds ? new Set() : undefined,
    trail: [],
    // A cloned item inherits the remaining life of its ancestor.
    remainingClone: e.cloneUntil === null ? CLONE_LIFE : Math.max(0, e.cloneUntil - state.time),
  }));
  state.clipboard = { x, y, width, height, items, count: items.length };
  if (state.tutorialStep === 0) state.tutorialStep = 1;
  state.events.push({ type: 'copy', count: items.length });
  return state.clipboard;
}

/** Make a tap selection include only the chosen entity to avoid surprise bystanders. */
export function copyEntity(state, entity) {
  if (!entity) return null;
  const clip = copyRegion(state, entity.x, entity.y, 1, 1);
  // The region may include other overlapping objects, so enforce the selected identity.
  if (clip) {
    clip.items = clip.items.filter(item => item.id === entity.id);
    clip.count = clip.items.length;
  }
  return clip;
}

/** Paste exact motion/fuse snapshots and enforce inherited four-second clone lifetimes. */
export function pasteRegion(state, x, y) {
  if (state.phase !== 'playing' || !state.clipboard) return 0;
  let added = 0;
  for (const item of state.clipboard.items) {
    if (state.entities.length >= MAX_ENTITIES) break;
    const remaining = item.remainingClone;
    if (remaining <= 0) continue;
    const tx = x + item.x, ty = y + item.y;
    if (tx < 8 || tx > WORLD.width - 8 || ty < 8 || ty > WORLD.height - 8) continue;
    // Protect the core only from direct spawning overlap; clone-fired shots can still hit it.
    if (Math.hypot(tx - state.core.x, ty - state.core.y) < item.r + state.core.r) continue;
    const { id, remainingClone, ...rest } = item;
    const data = {
      ...rest, x: tx, y: ty,
      generation: item.generation + 1, cloneUntil: state.time + remaining,
      hitIds: item.kind === 'explosion' ? new Set() : undefined,
      trail: [], flash: .18, dead: false,
    };
    addEntity(state, data);
    emitParticles(state, tx, ty, 7, '#74e8f8', 88);
    added++;
  }
  state.clipboard = null;
  if (added > 0) {
    state.cloneCount += added;
    state.score += added * 5;
    state.events.push({ type: 'paste', count: added });
    state.shockwaves.push({ x, y, r: 1, max: 42, ttl: .25, total: .25, color: '#8ae7ff' });
    state.tutorialStep = Math.max(state.tutorialStep, 2);
  } else {
    state.events.push({ type: 'invalid-paste' });
  }
  return added;
}

/** Clear a selected snapshot without changing gameplay state. */
export function cancelCopy(state) {
  state.clipboard = null;
}