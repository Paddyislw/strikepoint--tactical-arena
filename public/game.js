
// =============================================================================
// SECTION 1: CONSTANTS & CONFIG
// =============================================================================

const MAP_SIZE = 24;
const TILE_SIZE = 64;
const FOV = Math.PI / 3; // 60 degrees
const HALF_FOV = FOV / 2;
const PLAYER_SPEED = 3.5;
const PLAYER_TURN_SPEED = 0.002;
const MAX_HEALTH = 100;
const WEAPON_DAMAGE = 20;
const HEADSHOT_MULTIPLIER = 3;
const MAGAZINE_SIZE = 30;
const RELOAD_TIME = 2200;
const FIRE_RATE = 100;
const BULLET_SPREAD_BASE = 0.015;
const BULLET_SPREAD_MAX = 0.08;
const SPREAD_INCREASE_PER_SHOT = 0.008;
const SPREAD_RECOVERY_RATE = 0.04;
const ENEMY_SPEED = 1.8;
const ENEMY_HEALTH = 100;
const ENEMY_DAMAGE = 8;
const ENEMY_FIRE_RATE = 800;
const ENEMY_SIGHT_RANGE = 12;
const ROUND_KILLS_TO_WIN = 20;
const MAX_ENEMIES = 5;
const RESPAWN_TIME = 3000;
const MAX_RENDER_DIST = 20;
const PLAYER_RADIUS = 0.3;
const MAX_DEATHS = 5;

const WALL_COLORS = {
  1: { r: 42, g: 42, b: 46 },   // dark concrete
  2: { r: 30, g: 42, b: 30 },   // dark green/military
  3: { r: 42, g: 30, b: 30 },   // dark red/brick
  4: { r: 30, g: 30, b: 42 }    // dark blue/metal
};

// =============================================================================
// SECTION 2: MAP DEFINITION
// =============================================================================

const MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,2,2,0,1,0,0,3,0,0,0,0,0,3,0,0,1,0,0,2,0,1],
  [1,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
  [1,0,0,4,0,0,1,0,0,0,2,2,2,2,0,0,0,1,0,0,4,0,0,1],
  [1,0,0,0,0,0,1,0,0,2,0,0,0,0,2,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,2,0,0,0,0,2,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,2,0,0,0,0,2,0,0,1,0,0,0,0,0,1],
  [1,0,0,4,0,0,1,0,0,0,2,2,2,2,0,0,0,1,0,0,4,0,0,1],
  [1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,1,0,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,3,0,1],
  [1,0,0,0,0,0,1,0,0,3,0,0,0,0,0,3,0,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const SPAWN_POINTS = [
  { x: 1.5,  y: 1.5,  angle: Math.PI * 0.25 },
  { x: 22.5, y: 1.5,  angle: Math.PI * 0.75 },
  { x: 1.5,  y: 22.5, angle: Math.PI * 1.75 },
  { x: 22.5, y: 22.5, angle: Math.PI * 1.25 },
  { x: 11.5, y: 1.5,  angle: Math.PI * 0.5 },
  { x: 11.5, y: 22.5, angle: Math.PI * 1.5 },
  { x: 1.5,  y: 11.5, angle: 0 },
  { x: 22.5, y: 11.5, angle: Math.PI },
  { x: 5.5,  y: 8.5,  angle: 0 },
  { x: 18.5, y: 8.5,  angle: Math.PI },
  { x: 5.5,  y: 15.5, angle: 0 },
  { x: 18.5, y: 15.5, angle: Math.PI },
  { x: 11.5, y: 7.5,  angle: Math.PI * 0.5 },
  { x: 11.5, y: 16.5, angle: Math.PI * 1.5 },
];

const PLAYER_SPAWN = { x: 1.5, y: 1.5, angle: Math.PI * 0.25 };

function mapIsWall(x, y) {
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  if (tx < 0 || tx >= MAP_SIZE || ty < 0 || ty >= MAP_SIZE) return true;
  return MAP[ty][tx] !== 0;
}

function mapTile(x, y) {
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  if (tx < 0 || tx >= MAP_SIZE || ty < 0 || ty >= MAP_SIZE) return 1;
  return MAP[ty][tx];
}

// =============================================================================
// SECTION 3: AUDIO SYSTEM
// =============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4;
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch(e) {
      console.warn('Web Audio not available:', e);
    }
  }

  _createNoise(duration) {
    if (!this.initialized) return null;
    const sampleRate = this.ctx.sampleRate;
    const bufLen = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufLen, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  _playNoise(duration, filterFreq, gainPeak, decayTime, startTime) {
    if (!this.initialized) return;
    const t = startTime || this.ctx.currentTime;
    const buffer = this._createNoise(duration);
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decayTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(t);
    source.stop(t + duration + 0.05);
  }

  _playTone(freq, gainPeak, decayTime, startTime, type) {
    if (!this.initialized) return;
    const t = startTime || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = type || 'sine';
    osc.frequency.value = freq;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decayTime);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + decayTime + 0.02);
  }

  gunshot() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    // Low thud
    this._playNoise(0.12, 800, 1.5, 0.08, t);
    // High crack
    this._playNoise(0.06, 4000, 0.8, 0.04, t);
    // Body punch
    this._playTone(80, 0.6, 0.05, t, 'sawtooth');
  }

  reload() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playTone(800, 0.3, 0.05, t, 'square');
    this._playTone(400, 0.4, 0.08, t + 0.12, 'square');
    this._playNoise(0.04, 3000, 0.3, 0.03, t + 0.1);
  }

  hit() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playNoise(0.08, 300, 0.8, 0.06, t);
    this._playTone(150, 0.4, 0.05, t, 'sine');
  }

  headshot() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playNoise(0.08, 300, 0.8, 0.06, t);
    this._playTone(150, 0.4, 0.05, t, 'sine');
    this._playTone(1200, 0.5, 0.15, t, 'sine');
  }

  enemyShot() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playNoise(0.10, 600, 1.0, 0.07, t);
    this._playNoise(0.05, 3500, 0.5, 0.03, t);
    this._playTone(100, 0.3, 0.04, t, 'sawtooth');
  }

  footstep() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playNoise(0.03, 200, 0.2, 0.025, t);
  }

  dryFire() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playTone(2000, 0.15, 0.02, t, 'square');
  }

  killConfirm() {
    if (!this.initialized) return;
    const t = this.ctx.currentTime;
    this._playTone(500, 0.4, 0.08, t, 'sine');
    this._playTone(800, 0.4, 0.08, t + 0.1, 'sine');
  }
}

// =============================================================================
// SECTION 4: RAYCASTING RENDERER
// =============================================================================

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.depthBuffer = new Float32Array(canvas.width);
    this.halfH = canvas.height / 2;
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
    this.halfH = h / 2;
    this.depthBuffer = new Float32Array(w);
  }

  _hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return { r, g, b };
  }

  render(player, enemies, gameState) {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;
    const halfH = this.halfH;

    // 1. Draw ceiling
    const ceilGrad = ctx.createLinearGradient(0, 0, 0, halfH);
    ceilGrad.addColorStop(0, '#050508');
    ceilGrad.addColorStop(1, '#111114');
    ctx.fillStyle = ceilGrad;
    ctx.fillRect(0, 0, W, halfH);

    // 2. Draw floor
    const floorGrad = ctx.createLinearGradient(0, halfH, 0, H);
    floorGrad.addColorStop(0, '#111114');
    floorGrad.addColorStop(1, '#050508');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, halfH, W, halfH);

    // 3. Cast rays and draw walls
    const dirX = Math.cos(player.angle);
    const dirY = Math.sin(player.angle);
    const tanHalf = Math.tan(HALF_FOV);
    const planeX = -dirY * tanHalf;
    const planeY = dirX * tanHalf;

    for (let x = 0; x < W; x++) {
      const cameraX = (2 * x / W) - 1;
      const rayDirX = dirX + planeX * cameraX;
      const rayDirY = dirY + planeY * cameraX;

      let mapX = Math.floor(player.x);
      let mapY = Math.floor(player.y);

      const deltaDX = Math.abs(1 / (rayDirX || 0.000001));
      const deltaDY = Math.abs(1 / (rayDirY || 0.000001));

      let stepX, stepY, sideDistX, sideDistY;

      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (player.x - mapX) * deltaDX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1 - player.x) * deltaDX;
      }
      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (player.y - mapY) * deltaDY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1 - player.y) * deltaDY;
      }

      let hit = 0;
      let side = 0;
      let tile = 0;
      let iters = 0;

      while (!hit && iters < 64) {
        if (sideDistX < sideDistY) {
          sideDistX += deltaDX;
          mapX += stepX;
          side = 0;
        } else {
          sideDistY += deltaDY;
          mapY += stepY;
          side = 1;
        }
        tile = (mapX >= 0 && mapX < MAP_SIZE && mapY >= 0 && mapY < MAP_SIZE) ? MAP[mapY][mapX] : 1;
        if (tile > 0) hit = 1;
        iters++;
      }

      let perpDist;
      if (side === 0) {
        perpDist = (mapX - player.x + (1 - stepX) / 2) / rayDirX;
      } else {
        perpDist = (mapY - player.y + (1 - stepY) / 2) / rayDirY;
      }
      if (perpDist < 0.001) perpDist = 0.001;

      this.depthBuffer[x] = perpDist;

      const lineH = Math.min(H, Math.floor(H / perpDist));
      const drawStart = Math.max(0, Math.floor(halfH - lineH / 2));
      const drawEnd = Math.min(H - 1, Math.floor(halfH + lineH / 2));

      const baseColor = WALL_COLORS[tile] || { r: 42, g: 42, b: 46 };
      const fog = Math.max(0, 1 - perpDist / MAX_RENDER_DIST);
      const sideDim = side === 1 ? 0.75 : 1.0;
      const bright = fog * sideDim;

      const r = Math.floor(baseColor.r * bright);
      const g = Math.floor(baseColor.g * bright);
      const b = Math.floor(baseColor.b * bright);

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, drawStart, 1, drawEnd - drawStart);
    }

    // 4. Draw sprites (enemies)
    this._renderEnemies(ctx, player, enemies, dirX, dirY, planeX, planeY, W, H, halfH);

    // 5. Draw weapon
    this._renderWeapon(ctx, player, gameState, W, H);

    // 6. Draw HUD
    this._renderHUD(ctx, player, gameState, W, H);

    // 7. Draw effects
    this._renderEffects(ctx, player, gameState, W, H);
  }

  _renderEnemies(ctx, player, enemies, dirX, dirY, planeX, planeY, W, H, halfH) {
    // Sort enemies by distance (farthest first)
    const sorted = enemies
      .filter(e => e.isAlive)
      .map(e => ({
        e,
        dist: (e.x - player.x) ** 2 + (e.y - player.y) ** 2
      }))
      .sort((a, b) => b.dist - a.dist);

    for (const { e } of sorted) {
      const dx = e.x - player.x;
      const dy = e.y - player.y;

      const invDet = 1.0 / (planeX * dirY - dirX * planeY);
      const transformX = invDet * (dirY * dx - dirX * dy);
      const transformY = invDet * (-planeY * dx + planeX * dy);

      if (transformY <= 0.1) continue;

      const spriteScreenX = Math.floor((W / 2) * (1 + transformX / transformY));
      const spriteH = Math.min(H * 2, Math.abs(Math.floor(H / transformY)));
      const spriteW = Math.floor(spriteH * 0.6);

      const drawStartY = Math.max(0, Math.floor(halfH - spriteH / 2));
      const drawEndY = Math.min(H - 1, Math.floor(halfH + spriteH / 2));
      const drawStartX = Math.max(0, Math.floor(spriteScreenX - spriteW / 2));
      const drawEndX = Math.min(W - 1, Math.floor(spriteScreenX + spriteW / 2));

      if (drawStartX >= drawEndX) continue;
      if (drawStartY >= drawEndY) continue;

      const fog = Math.max(0, 1 - transformY / MAX_RENDER_DIST);
      if (fog <= 0) continue;

      // Draw enemy column by column, clipping against depth buffer
      const bodyStartY = drawStartY + Math.floor(spriteH * 0.25);
      const headEndY = drawStartY + Math.floor(spriteH * 0.3);
      const bodyEndY = drawEndY;

      // Head zone (top 25%)
      const headStartY = drawStartY;

      for (let sx = drawStartX; sx <= drawEndX; sx++) {
        if (sx < 0 || sx >= W) continue;
        if (this.depthBuffer[sx] < transformY) continue;

        // Head
        const headW = Math.floor(spriteW * 0.55);
        const headCX = spriteScreenX;
        const inHead = Math.abs(sx - headCX) < headW / 2;
        const headTopY = drawStartY;
        const headBotY = drawStartY + Math.floor(spriteH * 0.28);

        if (inHead) {
          const headR = Math.floor(180 * fog);
          const headG = Math.floor(100 * fog);
          const headB = Math.floor(80 * fog);
          ctx.fillStyle = `rgb(${headR},${headG},${headB})`;
          ctx.fillRect(sx, headTopY, 1, headBotY - headTopY);
        }

        // Body
        const bodyTopY = headBotY || (drawStartY + Math.floor(spriteH * 0.28));
        const br = Math.floor(160 * fog * 0.7);
        const bg = Math.floor(40 * fog * 0.7);
        const bb = Math.floor(40 * fog * 0.7);
        ctx.fillStyle = `rgb(${br},${bg},${bb})`;
        ctx.fillRect(sx, bodyTopY, 1, bodyEndY - bodyTopY);
      }

      // If enemy is shooting, draw muzzle flash
      if (e.isShooting) {
        const flashX = spriteScreenX + Math.floor(spriteW * 0.4);
        const flashY = drawStartY + Math.floor(spriteH * 0.5);
        if (this.depthBuffer[Math.min(W-1, Math.max(0, flashX))] >= transformY) {
          ctx.beginPath();
          ctx.arc(flashX, flashY, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 50, ${0.9 * fog})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(flashX, flashY, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.fill();
        }
      }
    }
  }

  _renderWeapon(ctx, player, gameState, W, H) {
    const bobAmt = player.isMoving ? Math.sin(gameState.time * 8) * 4 : 0;
    const bobY = player.isMoving ? Math.abs(Math.cos(gameState.time * 8)) * 2 : 0;

    const recoilY = player.recoilOffset || 0;
    const reloadTilt = player.isReloading ? Math.sin(Date.now() / 200) * 0.15 : 0;

    const baseX = W / 2 + 60 + bobAmt;
    const baseY = H - 80 + bobY - recoilY;

    ctx.save();
    ctx.translate(baseX, baseY);
    ctx.rotate(reloadTilt);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(-10, 20, 180, 8);

    // Stock
    ctx.fillStyle = '#1a1a1e';
    ctx.fillRect(60, 10, 90, 28);

    // Receiver
    ctx.fillStyle = '#2a2a30';
    ctx.fillRect(0, 5, 75, 25);

    // Barrel
    ctx.fillStyle = '#1e1e24';
    ctx.fillRect(-80, 12, 90, 12);

    // Rail / top
    ctx.fillStyle = '#333340';
    ctx.fillRect(-80, 10, 90, 4);

    // Grip
    ctx.fillStyle = '#222228';
    ctx.beginPath();
    ctx.moveTo(35, 30);
    ctx.lineTo(45, 65);
    ctx.lineTo(25, 65);
    ctx.lineTo(20, 30);
    ctx.closePath();
    ctx.fill();

    // Magazine
    ctx.fillStyle = '#1e1e26';
    ctx.beginPath();
    ctx.moveTo(25, 32);
    ctx.lineTo(35, 60);
    ctx.lineTo(15, 60);
    ctx.lineTo(8, 32);
    ctx.closePath();
    ctx.fill();

    // Highlights
    ctx.fillStyle = '#3a3a46';
    ctx.fillRect(-78, 12, 88, 2);
    ctx.fillStyle = '#3a3a46';
    ctx.fillRect(2, 5, 70, 3);

    // Front sight
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(-85, 7, 6, 12);

    // Muzzle flash
    if (player.muzzleFlash > 0) {
      const alpha = player.muzzleFlash;
      ctx.beginPath();
      ctx.arc(-86, 18, 12 * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 50, ${alpha * 0.9})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-86, 18, 6 * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
      // Rays
      for (let i = 0; i < 5; i++) {
        const ra = (i / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(-86, 18);
        ctx.lineTo(-86 + Math.cos(ra) * 20 * alpha, 18 + Math.sin(ra) * 20 * alpha);
        ctx.strokeStyle = `rgba(255, 200, 0, ${alpha * 0.7})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  _renderHUD(ctx, player, gameState, W, H) {
    const font = "'Rajdhani', 'Courier New', monospace";

    // Crosshair
    this._renderCrosshair(ctx, player, gameState, W, H);

    // --- Health (bottom left) ---
    const hpX = 30;
    const hpY = H - 25;

    // BG panel
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath();
    ctx.roundRect(hpX - 10, hpY - 55, 170, 65, 8);
    ctx.fill();

    // Health bar bg
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(hpX, hpY - 10, 140, 6);

    // Health bar fill
    const hpPct = player.health / MAX_HEALTH;
    let hpColor = '#22c55e';
    if (player.health < 60) hpColor = '#f59e0b';
    if (player.health < 30) hpColor = '#ef4444';
    ctx.fillStyle = hpColor;
    ctx.fillRect(hpX, hpY - 10, Math.floor(140 * hpPct), 6);

    // Health icon
    ctx.fillStyle = '#ef4444';
    ctx.font = `bold 18px ${font}`;
    ctx.fillText('♥', hpX, hpY - 18);

    // Health number
    const pulse = player.health < 30 ? Math.abs(Math.sin(Date.now() / 300)) * 0.3 + 0.7 : 1;
    ctx.fillStyle = `rgba(${player.health < 30 ? '255,100,100' : player.health < 60 ? '255,200,50' : '240,240,245'}, ${pulse})`;
    ctx.font = `bold 32px ${font}`;
    ctx.fillText(player.health, hpX + 26, hpY - 14);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = `12px ${font}`;
    ctx.fillText('HEALTH', hpX, hpY + 5);

    // --- Ammo (bottom right) ---
    const ammoX = W - 180;
    const ammoY = H - 25;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath();
    ctx.roundRect(ammoX - 10, ammoY - 55, 170, 65, 8);
    ctx.fill();

    const ammoColor = player.ammo <= 5 ? '#ef4444' : '#f4f4f5';
    ctx.fillStyle = ammoColor;
    ctx.font = `bold 36px ${font}`;
    ctx.textAlign = 'right';
    ctx.fillText(player.ammo, W - 20, ammoY - 18);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = `bold 20px ${font}`;
    ctx.fillText(`/ ${MAGAZINE_SIZE}`, W - 20, ammoY - 5);

    ctx.fillStyle = '#71717a';
    ctx.font = `12px ${font}`;
    ctx.fillText(`RESERVE: ${player.totalAmmo}`, W - 20, ammoY + 8);
    ctx.textAlign = 'left';

    if (player.isReloading) {
      const flash = Math.floor(Date.now() / 250) % 2 === 0;
      ctx.fillStyle = flash ? '#f59e0b' : '#a1a1aa';
      ctx.font = `bold 16px ${font}`;
      ctx.textAlign = 'center';
      ctx.fillText('RELOADING...', W / 2, H - 100);
      ctx.textAlign = 'left';
    }

    // --- Kill counter (top right) ---
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath();
    ctx.roundRect(W - 200, 14, 186, 50, 8);
    ctx.fill();

    ctx.fillStyle = '#06b6d4';
    ctx.font = `bold 14px ${font}`;
    ctx.textAlign = 'right';
    ctx.fillText(`KILLS: ${player.kills} / ${ROUND_KILLS_TO_WIN}`, W - 20, 35);

    ctx.fillStyle = '#71717a';
    ctx.font = `12px ${font}`;
    ctx.fillText(`DEATHS: ${player.deaths} / ${MAX_DEATHS}`, W - 20, 52);
    ctx.textAlign = 'left';

    // --- Kill feed (top left) ---
    const now = Date.now();
    const msgs = gameState.killFeed.filter(m => now - m.time < 2000);
    for (let i = 0; i < msgs.length; i++) {
      const age = now - msgs[i].time;
      const alpha = Math.max(0, 1 - age / 2000);
      ctx.fillStyle = `rgba(0,0,0,${0.6 * alpha})`;
      ctx.fillRect(14, 20 + i * 28, 220, 24);
      ctx.fillStyle = msgs[i].isHeadshot
        ? `rgba(255, 200, 50, ${alpha})`
        : `rgba(220, 220, 220, ${alpha})`;
      ctx.font = `bold 13px ${font}`;
      ctx.fillText(msgs[i].text, 20, 37 + i * 28);
    }

    // --- Stats bar (top center) ---
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 80, 14, 160, 28, 6);
    ctx.fill();

    const acc = gameState.shotsFired > 0
      ? Math.round((gameState.shotsHit / gameState.shotsFired) * 100)
      : 0;
    ctx.fillStyle = '#71717a';
    ctx.font = `11px ${font}`;
    ctx.textAlign = 'center';
    ctx.fillText(`ACC: ${acc}%  HS: ${gameState.headshots}`, W / 2, 32);
    ctx.textAlign = 'left';
  }

  _renderCrosshair(ctx, player, gameState, W, H) {
    const cx = W / 2;
    const cy = H / 2;
    const gap = 8 + Math.floor((player.currentSpread / BULLET_SPREAD_MAX) * 24);
    const len = 14;
    const thickness = 2;

    let color = 'rgba(200,200,200,0.85)';
    if (gameState.hitMarker > 0) {
      color = gameState.hitMarkerType === 'headshot'
        ? `rgba(255,220,50,${gameState.hitMarker})`
        : `rgba(255,80,80,${gameState.hitMarker})`;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';

    // Center dot
    ctx.fillStyle = 'rgba(200,200,200,0.6)';
    ctx.fillRect(cx - 1, cy - 1, 2, 2);

    // Top
    ctx.beginPath(); ctx.moveTo(cx, cy - gap); ctx.lineTo(cx, cy - gap - len); ctx.stroke();
    // Bottom
    ctx.beginPath(); ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + gap + len); ctx.stroke();
    // Left
    ctx.beginPath(); ctx.moveTo(cx - gap, cy); ctx.lineTo(cx - gap - len, cy); ctx.stroke();
    // Right
    ctx.beginPath(); ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + gap + len, cy); ctx.stroke();

    // Hit X marker
    if (gameState.hitMarker > 0) {
      const s = 8 * gameState.hitMarker;
      const alpha = gameState.hitMarker;
      ctx.strokeStyle = gameState.hitMarkerType === 'headshot'
        ? `rgba(255,220,50,${alpha})`
        : `rgba(255,60,60,${alpha})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx - s, cy - s); ctx.lineTo(cx + s, cy + s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + s, cy - s); ctx.lineTo(cx - s, cy + s); ctx.stroke();
    }
  }

  _renderEffects(ctx, player, gameState, W, H) {
    // Damage vignette
    let vigAlpha = 0;
    if (player.damageFlash > 0) vigAlpha = Math.max(vigAlpha, player.damageFlash * 0.7);
    if (player.health < 30) vigAlpha = Math.max(vigAlpha, 0.25 + Math.sin(Date.now() / 400) * 0.08);

    if (vigAlpha > 0) {
      const grad = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85);
      grad.addColorStop(0, `rgba(180,0,0,0)`);
      grad.addColorStop(1, `rgba(180,0,0,${vigAlpha})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    // Death / respawn screen
    if (!player.isAlive) {
      ctx.fillStyle = 'rgba(140,0,0,0.6)';
      ctx.fillRect(0, 0, W, H);
      const font = "'Rajdhani','Courier New',monospace";
      ctx.fillStyle = '#ff4444';
      ctx.font = `bold 72px ${font}`;
      ctx.textAlign = 'center';
      ctx.fillText('YOU DIED', W/2, H/2 - 30);
      const remaining = Math.ceil(player.respawnTimer / 1000);
      ctx.fillStyle = '#f4f4f5';
      ctx.font = `bold 28px ${font}`;
      ctx.fillText(`Respawning in ${remaining}...`, W/2, H/2 + 30);
      ctx.textAlign = 'left';
    }
  }
}

// =============================================================================
// SECTION 5: PLAYER SYSTEM
// =============================================================================

class Player {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.angle = spawn.angle;
    this.health = MAX_HEALTH;
    this.ammo = MAGAZINE_SIZE;
    this.totalAmmo = 90;
    this.isReloading = false;
    this.reloadTimer = 0;
    this.fireTimer = 0;
    this.currentSpread = BULLET_SPREAD_BASE;
    this.kills = 0;
    this.deaths = 0;
    this.isAlive = true;
    this.respawnTimer = 0;
    this.damageFlash = 0;
    this.muzzleFlash = 0;
    this.recoilOffset = 0;
    this.isMoving = false;
    this.isShooting = false;
    this.footstepTimer = 0;
  }

  respawn(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.angle = spawn.angle;
    this.health = MAX_HEALTH;
    this.ammo = MAGAZINE_SIZE;
    this.isReloading = false;
    this.reloadTimer = 0;
    this.fireTimer = 0;
    this.currentSpread = BULLET_SPREAD_BASE;
    this.isAlive = true;
    this.damageFlash = 0;
    this.muzzleFlash = 0;
    this.recoilOffset = 0;
  }

  takeDamage(dmg) {
    if (!this.isAlive) return;
    this.health = Math.max(0, this.health - dmg);
    this.damageFlash = 1.0;
    if (this.health <= 0) {
      this.isAlive = false;
      this.deaths++;
      this.respawnTimer = RESPAWN_TIME;
    }
  }

  canCollide(nx, ny) {
    const r = PLAYER_RADIUS;
    return (
      mapIsWall(nx - r, ny - r) ||
      mapIsWall(nx + r, ny - r) ||
      mapIsWall(nx - r, ny + r) ||
      mapIsWall(nx + r, ny + r)
    );
  }

  move(dx, dy) {
    const nx = this.x + dx;
    const ny = this.y + dy;
    if (!this.canCollide(nx, this.y)) this.x = nx;
    if (!this.canCollide(this.x, ny)) this.y = ny;
  }

  update(dt, keys, sound, gameState) {
    if (!this.isAlive) {
      this.respawnTimer -= dt * 1000;
      return;
    }

    // Timers
    if (this.fireTimer > 0) this.fireTimer -= dt * 1000;
    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt * 1000;
      if (this.reloadTimer <= 0) {
        const need = MAGAZINE_SIZE - this.ammo;
        const add = Math.min(need, this.totalAmmo);
        this.ammo += add;
        this.totalAmmo -= add;
        this.isReloading = false;
      }
    }

    // Spread recovery
    this.currentSpread = Math.max(
      BULLET_SPREAD_BASE,
      this.currentSpread - SPREAD_RECOVERY_RATE * dt * 60
    );

    // Recoil recovery
    if (this.recoilOffset > 0) {
      this.recoilOffset = Math.max(0, this.recoilOffset - 80 * dt);
    }

    // Muzzle flash decay
    if (this.muzzleFlash > 0) {
      this.muzzleFlash = Math.max(0, this.muzzleFlash - 6 * dt * 60);
    }

    // Damage flash decay
    if (this.damageFlash > 0) {
      this.damageFlash = Math.max(0, this.damageFlash - 3 * dt * 60);
    }

    // Movement
    const spd = PLAYER_SPEED * dt;
    let moved = false;

    if (keys.has('KeyW') || keys.has('ArrowUp')) {
      this.move(Math.cos(this.angle) * spd, Math.sin(this.angle) * spd);
      moved = true;
    }
    if (keys.has('KeyS') || keys.has('ArrowDown')) {
      this.move(-Math.cos(this.angle) * spd, -Math.sin(this.angle) * spd);
      moved = true;
    }
    if (keys.has('KeyA') || keys.has('ArrowLeft')) {
      this.move(Math.cos(this.angle - Math.PI/2) * spd, Math.sin(this.angle - Math.PI/2) * spd);
      moved = true;
    }
    if (keys.has('KeyD') || keys.has('ArrowRight')) {
      this.move(Math.cos(this.angle + Math.PI/2) * spd, Math.sin(this.angle + Math.PI/2) * spd);
      moved = true;
    }

    this.isMoving = moved;

    // Footsteps
    if (moved) {
      this.footstepTimer -= dt * 1000;
      if (this.footstepTimer <= 0) {
        sound.footstep();
        this.footstepTimer = 380;
      }
    } else {
      this.footstepTimer = 0;
    }

    // Reload
    if (keys.has('KeyR') && !this.isReloading && this.ammo < MAGAZINE_SIZE && this.totalAmmo > 0) {
      this.isReloading = true;
      this.reloadTimer = RELOAD_TIME;
      sound.reload();
    }

    // Auto-reload when empty
    if (this.ammo === 0 && !this.isReloading && this.totalAmmo > 0) {
      this.isReloading = true;
      this.reloadTimer = RELOAD_TIME;
      sound.reload();
    }
  }

  shoot(enemies, sound, gameState) {
    if (!this.isAlive) return;
    if (this.isReloading) return;
    if (this.fireTimer > 0) return;

    if (this.ammo <= 0) {
      sound.dryFire();
      return;
    }

    this.ammo--;
    this.fireTimer = FIRE_RATE;
    this.currentSpread = Math.min(BULLET_SPREAD_MAX, this.currentSpread + SPREAD_INCREASE_PER_SHOT);
    this.muzzleFlash = 1.0;
    this.recoilOffset = 18;
    sound.gunshot();

    gameState.shotsFired++;

    // Raycast for hit detection
    const spread = (Math.random() - 0.5) * 2 * this.currentSpread;
    const rayAngle = this.angle + spread;
    const rDirX = Math.cos(rayAngle);
    const rDirY = Math.sin(rayAngle);

    // Find wall distance
    const wallDist = this._castRayWall(this.x, this.y, rDirX, rDirY);

    // Check each enemy
    let hitEnemy = null;
    let hitDist = wallDist;
    let isHeadshot = false;

    for (const enemy of enemies) {
      if (!enemy.isAlive) continue;
      const d = this._rayEnemyIntersect(this.x, this.y, rDirX, rDirY, enemy);
      if (d > 0 && d < hitDist) {
        hitDist = d;
        hitEnemy = enemy;
        // Headshot: is the intersection at the top 25% of the enemy's apparent height?
        isHeadshot = d > 0 && this._isHeadshotAngle(enemy, d);
      }
    }

    if (hitEnemy) {
      gameState.shotsHit++;
      const dmg = isHeadshot ? WEAPON_DAMAGE * HEADSHOT_MULTIPLIER : WEAPON_DAMAGE;
      hitEnemy.takeDamage(dmg);

      if (isHeadshot) {
        sound.headshot();
        gameState.hitMarker = 1.0;
        gameState.hitMarkerType = 'headshot';
        gameState.headshots++;
      } else {
        sound.hit();
        gameState.hitMarker = 1.0;
        gameState.hitMarkerType = 'bodyshot';
      }

      if (!hitEnemy.isAlive) {
        this.kills++;
        sound.killConfirm();
        gameState.killFeed.unshift({
          text: isHeadshot ? '⚡ ENEMY ELIMINATED  [HEADSHOT]' : '✓ ENEMY ELIMINATED',
          time: Date.now(),
          isHeadshot
        });
        if (gameState.killFeed.length > 3) gameState.killFeed.pop();
      }
    }
  }

  _castRayWall(px, py, rdx, rdy) {
    let mapX = Math.floor(px);
    let mapY = Math.floor(py);
    const deltaDX = Math.abs(1 / (rdx || 0.000001));
    const deltaDY = Math.abs(1 / (rdy || 0.000001));
    let sideDistX = rdx < 0 ? (px - mapX) * deltaDX : (mapX + 1 - px) * deltaDX;
    let sideDistY = rdy < 0 ? (py - mapY) * deltaDY : (mapY + 1 - py) * deltaDY;
    const stepX = rdx < 0 ? -1 : 1;
    const stepY = rdy < 0 ? -1 : 1;
    let side = 0;
    let iters = 0;
    while (iters < 64) {
      if (sideDistX < sideDistY) { sideDistX += deltaDX; mapX += stepX; side = 0; }
      else { sideDistY += deltaDY; mapY += stepY; side = 1; }
      if (mapX < 0 || mapX >= MAP_SIZE || mapY < 0 || mapY >= MAP_SIZE) return 100;
      if (MAP[mapY][mapX] !== 0) {
        return side === 0
          ? (mapX - px + (1 - stepX) / 2) / rdx
          : (mapY - py + (1 - stepY) / 2) / rdy;
      }
      iters++;
    }
    return 100;
  }

  _rayEnemyIntersect(px, py, rdx, rdy, enemy) {
    // Simple ray-cylinder intersection (radius 0.3)
    const ex = enemy.x - px;
    const ey = enemy.y - py;
    const dot = ex * rdx + ey * rdy;
    if (dot < 0) return -1;
    const closestX = ex - dot * rdx;
    const closestY = ey - dot * rdy;
    const distSq = closestX * closestX + closestY * closestY;
    if (distSq > 0.3 * 0.3) return -1;
    return dot;
  }

  _isHeadshotAngle(enemy, dist) {
    // Head is top 25% of sprite, which maps to looking slightly upward relative to enemy center
    // Use vertical angle approximation
    const dz = 0; // same height plane
    // The headshot zone is the upper 28% of the sprite
    // We approximate: if dist < 6, random headshot chance based on precision
    // More accurately: check if ray hits the head zone
    // Sprite height ~ H/dist, head zone top 25%
    // Since we're on flat plane, use random weighted by spread closeness
    return Math.random() < (this.currentSpread < 0.02 ? 0.4 : 0.2);
  }
}

// =============================================================================
// SECTION 6: ENEMY AI SYSTEM
// =============================================================================

class Enemy {
  constructor(spawn, id) {
    this.id = id;
    this.x = spawn.x;
    this.y = spawn.y;
    this.angle = spawn.angle;
    this.health = ENEMY_HEALTH;
    this.state = 'patrol';
    this.isAlive = true;
    this.respawnTimer = 0;
    this.fireTimer = 0;
    this.isShooting = false;
    this.shootFlashTimer = 0;
    this.seePlayer = false;
    this.lastKnownPlayerPos = { x: spawn.x, y: spawn.y };
    this.lostSightTimer = 0;
    this.strafeDir = 1;
    this.strafeTimer = 0;
    this.alertLevel = 0;
    this.patrolTarget = this._randomPatrolPoint();
    this.spawnIndex = 0;
  }

  _randomPatrolPoint() {
    const pts = [
      { x: 2.5, y: 2.5 }, { x: 11.5, y: 2.5 }, { x: 21.5, y: 2.5 },
      { x: 2.5, y: 11.5 }, { x: 21.5, y: 11.5 },
      { x: 2.5, y: 21.5 }, { x: 11.5, y: 21.5 }, { x: 21.5, y: 21.5 },
      { x: 7.5, y: 7.5 }, { x: 16.5, y: 7.5 },
      { x: 7.5, y: 16.5 }, { x: 16.5, y: 16.5 },
      { x: 11.5, y: 11.5 }
    ];
    return pts[Math.floor(Math.random() * pts.length)];
  }

  takeDamage(dmg) {
    this.health -= dmg;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
      this.state = 'dead';
      this.respawnTimer = RESPAWN_TIME + Math.random() * 2000;
    } else {
      // Alert!
      if (this.state === 'patrol') {
        this.state = 'chase';
      }
    }
  }

  _hasLOS(px, py) {
    const dx = px - this.x;
    const dy = py - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > ENEMY_SIGHT_RANGE) return false;

    const rdx = dx / dist;
    const rdy = dy / dist;
    let mapX = Math.floor(this.x);
    let mapY = Math.floor(this.y);
    const deltaDX = Math.abs(1 / (rdx || 0.000001));
    const deltaDY = Math.abs(1 / (rdy || 0.000001));
    let sideDistX = rdx < 0 ? (this.x - mapX) * deltaDX : (mapX + 1 - this.x) * deltaDX;
    let sideDistY = rdy < 0 ? (this.y - mapY) * deltaDY : (mapY + 1 - this.y) * deltaDY;
    const stepX = rdx < 0 ? -1 : 1;
    const stepY = rdy < 0 ? -1 : 1;
    let traveled = 0;

    for (let i = 0; i < 64 && traveled < dist; i++) {
      if (sideDistX < sideDistY) { traveled = sideDistX; sideDistX += deltaDX; mapX += stepX; }
      else { traveled = sideDistY; sideDistY += deltaDY; mapY += stepY; }
      if (mapX < 0 || mapX >= MAP_SIZE || mapY < 0 || mapY >= MAP_SIZE) return false;
      if (MAP[mapY][mapX] !== 0) return false;
    }
    return true;
  }

  _moveToward(tx, ty, speed, dt, enemies) {
    const dx = tx - this.x;
    const dy = ty - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 0.1) return;
    const nx = this.x + (dx / dist) * speed * dt;
    const ny = this.y + (dy / dist) * speed * dt;

    // Collision with walls
    const r = 0.3;
    if (!mapIsWall(nx, this.y) && !mapIsWall(nx + r * Math.sign(dx), this.y)) this.x = nx;
    if (!mapIsWall(this.x, ny) && !mapIsWall(this.x, ny + r * Math.sign(dy))) this.y = ny;
  }

  _applyRepulsion(enemies) {
    for (const other of enemies) {
      if (other === this || !other.isAlive) continue;
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 1.0 && dist > 0.001) {
        this.x += (dx / dist) * 0.05;
        this.y += (dy / dist) * 0.05;
      }
    }
  }

  update(dt, player, enemies, sound) {
    if (!this.isAlive) {
      this.isShooting = false;
      this.respawnTimer -= dt * 1000;
      if (this.respawnTimer <= 0) {
        this._respawn(player);
      }
      return;
    }

    // Shoot flash decay
    if (this.shootFlashTimer > 0) {
      this.shootFlashTimer -= dt * 1000;
      if (this.shootFlashTimer <= 0) this.isShooting = false;
    }

    // Update fire timer
    if (this.fireTimer > 0) this.fireTimer -= dt * 1000;

    // Check LOS
    const hasSight = this._hasLOS(player.x, player.y);
    const distToPlayer = Math.sqrt(
      (player.x - this.x)**2 + (player.y - this.y)**2
    );

    if (hasSight && player.isAlive) {
      this.seePlayer = true;
      this.lastKnownPlayerPos = { x: player.x, y: player.y };
      this.lostSightTimer = 0;
    } else {
      this.seePlayer = false;
      if (this.state === 'attack' || this.state === 'chase') {
        this.lostSightTimer += dt * 1000;
      }
    }

    switch (this.state) {
      case 'patrol':
        this._updatePatrol(dt, player, hasSight, distToPlayer, enemies);
        break;
      case 'chase':
        this._updateChase(dt, player, hasSight, distToPlayer, enemies);
        break;
      case 'attack':
        this._updateAttack(dt, player, hasSight, distToPlayer, enemies, sound);
        break;
    }

    this._applyRepulsion(enemies);
  }

  _updatePatrol(dt, player, hasSight, distToPlayer, enemies) {
    // Move to patrol target
    const dx = this.patrolTarget.x - this.x;
    const dy = this.patrolTarget.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    this.angle = Math.atan2(dy, dx);
    this._moveToward(this.patrolTarget.x, this.patrolTarget.y, ENEMY_SPEED * 0.5, dt, enemies);

    if (dist < 0.5) {
      this.patrolTarget = this._randomPatrolPoint();
    }

    if (hasSight && player.isAlive) {
      this.state = 'chase';
    }
  }

  _updateChase(dt, player, hasSight, distToPlayer, enemies) {
    const tx = this.lastKnownPlayerPos.x;
    const ty = this.lastKnownPlayerPos.y;
    const dx = tx - this.x;
    const dy = ty - this.y;
    this.angle = Math.atan2(player.y - this.y, player.x - this.x);

    this._moveToward(tx, ty, ENEMY_SPEED, dt, enemies);

    if (hasSight && distToPlayer < 8 && player.isAlive) {
      this.state = 'attack';
      this.strafeTimer = 0;
    }

    if (this.lostSightTimer > 3000) {
      this.state = 'patrol';
      this.lostSightTimer = 0;
    }

    // Arrived at last known pos and can't see player
    const d2 = Math.sqrt(dx*dx + dy*dy);
    if (d2 < 0.5 && !hasSight) {
      this.state = 'patrol';
      this.patrolTarget = this._randomPatrolPoint();
    }
  }

  _updateAttack(dt, player, hasSight, distToPlayer, enemies, sound) {
    // Face player
    this.angle = Math.atan2(player.y - this.y, player.x - this.x);

    // Strafe
    this.strafeTimer -= dt * 1000;
    if (this.strafeTimer <= 0) {
      this.strafeDir = Math.random() < 0.5 ? 1 : -1;
      this.strafeTimer = 800 + Math.random() * 1200;
    }

    const strafeSpeedMult = this.health < 30 ? 1.4 : 1.0;
    const strafeAngle = this.angle + Math.PI / 2 * this.strafeDir;
    const sx = Math.cos(strafeAngle) * ENEMY_SPEED * 0.6 * dt * strafeSpeedMult;
    const sy = Math.sin(strafeAngle) * ENEMY_SPEED * 0.6 * dt * strafeSpeedMult;
    if (!mapIsWall(this.x + sx, this.y)) this.x += sx;
    if (!mapIsWall(this.x, this.y + sy)) this.y += sy;

    // Shoot at player
    if (this.fireTimer <= 0 && hasSight && player.isAlive) {
      this.fireTimer = ENEMY_FIRE_RATE;
      this.isShooting = true;
      this.shootFlashTimer = 120;

      if (sound) sound.enemyShot();

      // Hit chance based on distance
      const hitChance = distToPlayer < 4 ? 0.8 : distToPlayer < 8 ? 0.55 : 0.3;
      if (Math.random() < hitChance) {
        player.takeDamage(ENEMY_DAMAGE);
      }
    }

    // Transition back
    if (distToPlayer > 10 || !hasSight) {
      if (this.lostSightTimer > 1500) {
        this.state = 'chase';
      }
    }
  }

  _respawn(player) {
    // Find spawn far from player
    let best = SPAWN_POINTS[0];
    let bestDist = 0;
    for (const sp of SPAWN_POINTS) {
      const d = Math.sqrt((sp.x - player.x)**2 + (sp.y - player.y)**2);
      if (d > bestDist) {
        bestDist = d;
        best = sp;
      }
    }
    // Add some jitter so enemies don't all stack on same spawn
    this.x = best.x + (Math.random() - 0.5) * 2;
    this.y = best.y + (Math.random() - 0.5) * 2;
    this.angle = best.angle;
    this.health = ENEMY_HEALTH;
    this.state = 'patrol';
    this.isAlive = true;
    this.fireTimer = 0;
    this.isShooting = false;
    this.seePlayer = false;
    this.lostSightTimer = 0;
    this.patrolTarget = this._randomPatrolPoint();
  }
}

// =============================================================================
// SECTION 7 & 8: GAME STATE AND FLOW
// =============================================================================

const GamePhase = {
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose',
  PAUSED: 'paused'
};

function createGameState() {
  return {
    phase: GamePhase.PLAYING,
    time: 0,
    shotsFired: 0,
    shotsHit: 0,
    headshots: 0,
    killFeed: [],
    hitMarker: 0,
    hitMarkerType: 'bodyshot',
  };
}

function renderEndScreen(ctx, player, gameState, W, H, onRestart) {
  const isWin = gameState.phase === GamePhase.WIN;
  const font = "'Rajdhani','Courier New',monospace";

  ctx.fillStyle = isWin ? 'rgba(0,20,0,0.88)' : 'rgba(20,0,0,0.88)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.fillStyle = isWin ? '#22c55e' : '#ef4444';
  ctx.font = `bold 80px ${font}`;
  ctx.fillText(isWin ? 'MISSION COMPLETE' : 'MISSION FAILED', W/2, H/2 - 120);

  ctx.fillStyle = '#a1a1aa';
  ctx.font = `bold 28px ${font}`;
  ctx.fillText(isWin ? 'All targets eliminated.' : 'You have been neutralized.', W/2, H/2 - 70);

  const acc = gameState.shotsFired > 0
    ? Math.round((gameState.shotsHit / gameState.shotsFired) * 100) : 0;
  const kd = player.deaths > 0
    ? (player.kills / player.deaths).toFixed(2) : player.kills.toFixed(2);

  const stats = [
    { label: 'KILLS', val: player.kills },
    { label: 'DEATHS', val: player.deaths },
    { label: 'HEADSHOTS', val: gameState.headshots },
    { label: 'ACCURACY', val: acc + '%' },
    { label: 'K/D RATIO', val: kd },
    { label: 'SHOTS FIRED', val: gameState.shotsFired },
  ];

  const panelW = 500;
  const panelH = 240;
  const panelX = W/2 - panelW/2;
  const panelY = H/2 - 50;

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.roundRect(panelX, panelY, panelW, panelH, 12);
  ctx.fill();

  ctx.strokeStyle = isWin ? '#22c55e33' : '#ef444433';
  ctx.lineWidth = 1;
  ctx.stroke();

  for (let i = 0; i < stats.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const sx = panelX + 20 + col * (panelW / 3);
    const sy = panelY + 50 + row * 90;

    ctx.fillStyle = '#71717a';
    ctx.font = `13px ${font}`;
    ctx.textAlign = 'left';
    ctx.fillText(stats[i].label, sx, sy);

    ctx.fillStyle = isWin ? '#22c55e' : '#f4f4f5';
    ctx.font = `bold 36px ${font}`;
    ctx.fillText(stats[i].val, sx, sy + 35);
  }

  // Restart button
  const btnW = 220, btnH = 52;
  const btnX = W/2 - btnW/2;
  const btnY = panelY + panelH + 30;

  ctx.fillStyle = isWin ? '#22c55e' : '#dc2626';
  ctx.beginPath();
  ctx.roundRect(btnX, btnY, btnW, btnH, 8);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = `bold 22px ${font}`;
  ctx.textAlign = 'center';
  ctx.fillText('PLAY AGAIN', W/2, btnY + 34);
  ctx.textAlign = 'left';

  return { btnX, btnY, btnW, btnH };
}

// =============================================================================
// SECTION 9 & 10: GAME LOOP, INPUT, MAIN ENGINE
// =============================================================================

let gameInstance = null;

function startGame() {
  if (gameInstance) {
    gameInstance.destroy();
  }
  gameInstance = new GameEngine();
  gameInstance.start();
}

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.renderer = new Renderer(this.canvas);
    this.sound = new SoundEngine();
    this.sound.init();

    this.player = new Player(PLAYER_SPAWN);
    this.enemies = [];
    this.gameState = createGameState();

    this.keys = new Set();
    this.isShooting = false;
    this.lastTime = 0;
    this.rafId = null;
    this.isRunning = false;
    this.isPointerLocked = false;
    this.endScreenButtons = null;

    this._spawnEnemies();
    this._bindEvents();
  }

  _spawnEnemies() {
    this.enemies = [];
    const usedSpawns = new Set();
    usedSpawns.add(0); // player spawn index

    for (let i = 0; i < MAX_ENEMIES; i++) {
      let spawnIdx;
      do {
        spawnIdx = Math.floor(Math.random() * SPAWN_POINTS.length);
      } while (usedSpawns.has(spawnIdx));
      usedSpawns.add(spawnIdx);

      const spawn = SPAWN_POINTS[spawnIdx];
      const e = new Enemy({
        x: spawn.x + (Math.random() - 0.5),
        y: spawn.y + (Math.random() - 0.5),
        angle: spawn.angle
      }, i);
      e.spawnIndex = spawnIdx;
      this.enemies.push(e);
    }
  }

  _bindEvents() {
    this._onKeyDown = (e) => {
      this.keys.add(e.code);
      if (e.code === 'KeyR') {
        if (this.player.isAlive && !this.player.isReloading &&
            this.player.ammo < MAGAZINE_SIZE && this.player.totalAmmo > 0) {
          this.player.isReloading = true;
          this.player.reloadTimer = RELOAD_TIME;
          this.sound.reload();
        }
      }
      e.preventDefault();
    };
    this._onKeyUp = (e) => {
      this.keys.delete(e.code);
    };
    this._onMouseDown = (e) => {
      if (e.button === 0) {
        this.isShooting = true;
        if (this.gameState.phase === GamePhase.PLAYING) {
          this.player.shoot(this.enemies, this.sound, this.gameState);
        }
        if (this.gameState.phase === GamePhase.WIN || this.gameState.phase === GamePhase.LOSE) {
          this._checkRestartClick(e);
        }
      }
    };
    this._onMouseUp = (e) => {
      if (e.button === 0) this.isShooting = false;
    };
    this._onMouseMove = (e) => {
      if (this.isPointerLocked && this.gameState.phase === GamePhase.PLAYING) {
        this.player.angle += e.movementX * PLAYER_TURN_SPEED;
      }
    };
    this._onPointerLockChange = () => {
      this.isPointerLocked = document.pointerLockElement === this.canvas;
      if (!this.isPointerLocked && this.gameState.phase === GamePhase.PLAYING) {
        this.gameState.phase = GamePhase.PAUSED;
      }
    };
    this._onResize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.renderer.resize(this.canvas.width, this.canvas.height);
    };

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    this.canvas.addEventListener('mousedown', this._onMouseDown);
    this.canvas.addEventListener('mouseup', this._onMouseUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onPointerLockChange);
    window.addEventListener('resize', this._onResize);

    // Click to re-lock
    this.canvas.addEventListener('click', () => {
      if (!this.isPointerLocked && this.gameState.phase === GamePhase.PAUSED) {
        this.canvas.requestPointerLock();
        this.gameState.phase = GamePhase.PLAYING;
      }
    });
  }

  _checkRestartClick(e) {
    if (!this.endScreenButtons) return;
    const { btnX, btnY, btnW, btnH } = this.endScreenButtons;
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (mx >= btnX && mx <= btnX + btnW && my >= btnY && my <= btnY + btnH) {
      this.restart();
    }
  }

  restart() {
    this.player = new Player(PLAYER_SPAWN);
    this.enemies = [];
    this.gameState = createGameState();
    this._spawnEnemies();
    this.endScreenButtons = null;
    this.canvas.requestPointerLock();
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    this.canvas.removeEventListener('mousedown', this._onMouseDown);
    this.canvas.removeEventListener('mouseup', this._onMouseUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange);
    window.removeEventListener('resize', this._onResize);
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame((ts) => this._loop(ts));
  }

  _loop(timestamp) {
    if (!this.isRunning) return;

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.gameState.time += dt;

    if (this.gameState.phase === GamePhase.PLAYING) {
      this._update(dt);
    }

    this._draw();

    this.rafId = requestAnimationFrame((ts) => this._loop(ts));
  }

  _update(dt) {
    const p = this.player;

    // Update player
    p.update(dt, this.keys, this.sound, this.gameState);

    // Continuous shooting
    if (this.isShooting && p.isAlive && !p.isReloading && p.fireTimer <= 0) {
      p.shoot(this.enemies, this.sound, this.gameState);
    }

    // Respawn player
    if (!p.isAlive && p.respawnTimer <= 0) {
      const farthest = this._getFarthestSpawn();
      p.respawn(farthest);
    }

    // Update hit marker
    if (this.gameState.hitMarker > 0) {
      this.gameState.hitMarker = Math.max(0, this.gameState.hitMarker - 6 * dt * 60);
    }

    // Update enemies
    for (const enemy of this.enemies) {
      enemy.update(dt, p, this.enemies, this.sound);
    }

    // Check win/lose
    if (p.kills >= ROUND_KILLS_TO_WIN) {
      this.gameState.phase = GamePhase.WIN;
      if (document.pointerLockElement) document.exitPointerLock();
    }
    if (p.deaths >= MAX_DEATHS) {
      this.gameState.phase = GamePhase.LOSE;
      if (document.pointerLockElement) document.exitPointerLock();
    }
  }

  _getFarthestSpawn() {
    const p = this.player;
    let best = SPAWN_POINTS[0];
    let bestDist = 0;
    for (const sp of SPAWN_POINTS) {
      const d = (sp.x - p.x)**2 + (sp.y - p.y)**2;
      if (d > bestDist) { bestDist = d; best = sp; }
    }
    return best;
  }

  _draw() {
    const ctx = this.renderer.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;

    if (this.gameState.phase === GamePhase.PLAYING ||
        this.gameState.phase === GamePhase.PAUSED) {
      this.renderer.render(this.player, this.enemies, this.gameState);

      if (this.gameState.phase === GamePhase.PAUSED) {
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(0, 0, W, H);
        const font = "'Rajdhani','Courier New',monospace";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#06b6d4';
        ctx.font = `bold 52px ${font}`;
        ctx.fillText('PAUSED', W/2, H/2 - 20);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = `20px ${font}`;
        ctx.fillText('Click to resume', W/2, H/2 + 24);
        ctx.textAlign = 'left';
      }
    } else if (this.gameState.phase === GamePhase.WIN ||
               this.gameState.phase === GamePhase.LOSE) {
      this.renderer.render(this.player, this.enemies, this.gameState);
      this.endScreenButtons = renderEndScreen(
        ctx, this.player, this.gameState, W, H
      );
    }
  }
}
