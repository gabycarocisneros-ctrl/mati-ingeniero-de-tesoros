/* Mati Quest — motor base. Phaser 3.80. */
(function () {
  const TOUCH = window.matchMedia('(hover: none) and (pointer: coarse)').matches || ('ontouchstart' in window && navigator.maxTouchPoints > 1);
  const TV = !TOUCH || window.matchMedia('(orientation: landscape) and (min-width: 900px)').matches;
  // En TV el juego corre a resolución nativa con sprites HD (3x) y tiles dibujados a 3x: nítido en pantallas grandes.
  const SCALE = TV ? 3 : 1, ZOOM = 1;
  const TILE = 32 * SCALE;
  const VW = TV ? Math.min(window.innerWidth, 1920) : 480, VH = TV ? Math.min(window.innerHeight, 1080) : 320;
  const SPR = TV ? 1 : 0.75;
  const FS = (n) => `${Math.round(n * SCALE)}px`;
  if (TV) { let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => location.reload(), 400); }); }
  const C = window.MQ_CONTENT;

  /* ---------- Input (D-pad táctil + teclado) ---------- */
  const keys = { up: 0, down: 0, left: 0, right: 0, A: 0, B: 0, start: 0, select: 0 };
  const prev = { ...keys }, latch = {};
  const justPressed = (k) => (keys[k] && !prev[k]) || !!latch[k];
  function snapshotKeys() { for (const k in keys) { prev[k] = keys[k]; latch[k] = 0; } }
  const press = (k) => { if (!keys[k]) latch[k] = 1; keys[k] = 1; };
  const kb = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right', KeyZ: 'A', KeyX: 'B', Space: 'A', Enter: 'start', ShiftLeft: 'select', Escape: 'B' };
  window.addEventListener('keydown', (e) => { const k = kb[e.code]; if (k) { if (!e.repeat) press(k); e.preventDefault(); } });
  window.addEventListener('keyup', (e) => { const k = kb[e.code]; if (k) keys[k] = 0; });
  const AUDIO = window.MQ_AUDIO;
  const unlockAudio = () => AUDIO.unlock();
  window.addEventListener('keydown', unlockAudio); window.addEventListener('pointerdown', unlockAudio, { capture: true });
  const muteBtn = document.getElementById('mute');
  const paintMute = () => { if (muteBtn) muteBtn.textContent = AUDIO.muted ? '♪ off' : '♪ on'; };
  const toggleMute = () => { AUDIO.toggleMute(); paintMute(); };
  if (muteBtn) muteBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMute(); });
  window.addEventListener('keydown', (e) => { if (e.code === 'KeyM') toggleMute(); });
  paintMute();
  window.addEventListener('keydown', (e) => { if (e.code === 'KeyF') { const d = document.documentElement; if (!document.fullscreenElement) (d.requestFullscreen || d.webkitRequestFullscreen)?.call(d); else document.exitFullscreen?.(); } });
  document.querySelectorAll('button[data-k]').forEach((b) => {
    const k = b.dataset.k;
    const on = (e) => { e.preventDefault(); press(k); b.classList.add('on'); };
    const off = (e) => { e.preventDefault(); keys[k] = 0; b.classList.remove('on'); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
  });

  /* ---------- Guardado ---------- */
  const SAVE_KEY = 'matiquest_v1';
  const save = { world: 'mundo1', powers: [], talked: {}, wins: {}, finished: false };
  function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* sin storage */ } }
  function resetSave() { save.world = 'mundo1'; save.powers = []; save.talked = {}; save.wins = {}; save.finished = false; save.read = {}; save.chain = {}; save.items = []; save.maxWorld = 'mundo1'; persist(); }
  function loadSave() { try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s) Object.assign(save, s); } catch (e) { /* nada */ } }

  /* ---------- Diálogo (DOM, nítido) ---------- */
  const dlgEl = document.getElementById('dlg'), screenEl = document.getElementById('screen');
  const lockScroll = () => { screenEl.scrollTop = 0; screenEl.scrollLeft = 0; };
  screenEl.addEventListener('scroll', lockScroll);
  const Dialog = {
    open: false, resolver: null, pages: [], i: 0, name: '', typing: null, opts: null, sel: 0,
    run(pages, name = '') {
      this.pages = pages.filter((p) => p !== '' && p != null); this.i = 0; this.name = name; this.open = true;
      dlgEl.classList.add('show'); lockScroll();
      return new Promise((res) => { this.resolver = res; this.showPage(); });
    },
    ask(prompt, options, name = '') {
      this.open = true; this.opts = options; this.sel = 0; this.name = name;
      dlgEl.classList.add('show');
      return new Promise((res) => { this.resolver = res; this.renderOpts(prompt); });
    },
    renderOpts(prompt) {
      dlgEl.innerHTML = (this.name ? `<div class="name">${this.name}</div>` : '') + `<div>${prompt}</div><div class="opts">` +
        this.opts.map((o, j) => `<div class="${j === this.sel ? 'sel' : ''}">${o}</div>`).join('') + '</div>';
      this._prompt = prompt;
    },
    showPage() {
      const text = this.pages[this.i] ?? '';
      dlgEl.innerHTML = (this.name ? `<div class="name">${this.name}</div>` : '') + `<div class="txt"></div>`;
      const box = dlgEl.querySelector('.txt'); let n = 0; this.full = text;
      clearInterval(this.typing);
      this.typing = setInterval(() => { n += 2; box.textContent = text.slice(0, n); if (n % 6 === 0) AUDIO.sfx('text'); if (n >= text.length) { clearInterval(this.typing); this.typing = null; this.arrow(); } }, 18);
    },
    arrow() { const a = document.createElement('div'); a.className = 'arrow'; a.textContent = '▼'; dlgEl.appendChild(a); },
    key(k) {
      if (!this.open) return;
      if (this.opts) {
        if (k === 'up') { this.sel = (this.sel + this.opts.length - 1) % this.opts.length; this.renderOpts(this._prompt); }
        if (k === 'down') { this.sel = (this.sel + 1) % this.opts.length; this.renderOpts(this._prompt); }
        if (k === 'A') { AUDIO.sfx('confirm'); const r = this.resolver; const s = this.sel; this.opts = null; this.close(); r(s); }
        return;
      }
      if (k !== 'A' && k !== 'B') return;
      if (this.typing) { clearInterval(this.typing); this.typing = null; dlgEl.querySelector('.txt').textContent = this.full; this.arrow(); return; }
      this.i++;
      if (this.i < this.pages.length) this.showPage(); else { const r = this.resolver; this.close(); r(); }
    },
    close() { this.open = false; dlgEl.classList.remove('show'); dlgEl.innerHTML = ''; this.resolver = null; },
  };
  const pumpDialog = () => ['A', 'B', 'up', 'down'].forEach((k) => { if (justPressed(k)) Dialog.key(k); });
  const wrap = (s, n = 110) => {
    if (!s) return []; const out = []; let cur = '';
    s.split(/\s+/).forEach((w) => { if ((cur + ' ' + w).trim().length > n) { out.push(cur.trim()); cur = w; } else cur += ' ' + w; });
    if (cur.trim()) out.push(cur.trim()); return out;
  };

  /* ---------- HUD ---------- */
  const hudW = document.getElementById('hud-world'), hudP = document.getElementById('hud-powers');
  function hud(worldName) { hudW.textContent = worldName; hudP.textContent = '★'.repeat(save.powers.length) + '☆'.repeat(3 - save.powers.length); }

  /* ---------- Datos ---------- */
  let DATA = null, MAPS = null;

  /* ---------- Escena de carga ---------- */
  class Boot extends Phaser.Scene {
    constructor() { super('Boot'); }
    create() {
      DATA = window.MQ_CHARACTERS; MAPS = window.MQ_MAPS;
      DATA.personajes.forEach((p) => {
        const file = TV ? p.sprite.file.replace('sprites/', 'sprites_hd/').replace('sprite_', 'sprite_hd_') : p.sprite.file;
        this.load.spritesheet(p.id, file + '?v=40', { frameWidth: p.sprite.frameWidth * SCALE, frameHeight: p.sprite.frameHeight * SCALE });
      });
      this.load.once('complete', () => {
        DATA.personajes.forEach((p) => {
          ['down', 'left', 'right', 'up'].forEach((d, i) => {
            const b = i * 3;
            this.anims.create({ key: `${p.id}_${d}`, frames: this.anims.generateFrameNumbers(p.id, { frames: [b + 1, b, b + 2, b] }), frameRate: 7, repeat: -1 });
          });
        });
        Object.entries(MAPS.mundos).forEach(([id, m]) => { makeTileset(this, id, m.palette, m.estilo || {}); (m.edificios || []).forEach((e) => makeBuilding(this, id, e, m.palette)); });
        loadSave();
        this.scene.start('Title');
      });
      this.load.start();
    }
  }

  function makeTileset(scene, id, pal, estilo = {}) {
    // Frames: 0 G, 1 P, 2 T, 3 H, 4 W, 5 D, 6 W (frame 2 de agua)
    const kinds = ['G', 'P', 'T', 'H', 'W', 'D', 'W2'];
    const cv = document.createElement('canvas'); cv.width = TILE * kinds.length; cv.height = TILE;
    const g = cv.getContext('2d'); g.scale(SCALE, SCALE); const TILE_ = TILE; // dibujamos en unidades de 32 y el contexto escala
    const hex = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
    const shade = (h, f) => { const [r, gg, b] = hex(h).map((v) => Math.max(0, Math.min(255, v * f))); return `rgb(${r | 0},${gg | 0},${b | 0})`; };
    const px = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
    const rnd = (seed) => { let t = seed; return () => { t = (t * 9301 + 49297) % 233280; return t / 233280; }; };
    kinds.forEach((k, i) => {
      const x = i * 32, key = k === 'W2' ? 'W' : k, col = pal[key], r = rnd(i * 7 + id.length);
      px(x, 0, 32, 32, col);
      if (k === 'G') { // pasto: matas y alguna flor
        for (let j = 0; j < 7; j++) { const tx = x + 2 + ((r() * 28) | 0), ty = 2 + ((r() * 26) | 0); px(tx, ty, 2, 1, shade(col, 0.82)); px(tx + 1, ty - 1, 1, 1, shade(col, 0.82)); }
        for (let j = 0; j < 3; j++) { const tx = x + 2 + ((r() * 28) | 0), ty = 2 + ((r() * 26) | 0); px(tx, ty, 2, 2, shade(col, 1.18)); }
        if (estilo.flores !== false) { px(x + 22, 8, 2, 2, '#f2d94e'); px(x + 7, 21, 2, 2, '#f6f0ff'); }
      }
      if (k === 'P') { // camino: bordes y piedritas
        px(x, 0, 32, 1, shade(col, 0.9)); px(x, 32 - 1, 32, 1, shade(col, 0.85));
        for (let j = 0; j < 4; j++) { const tx = x + 3 + ((r() * 26) | 0), ty = 3 + ((r() * 26) | 0); px(tx, ty, 3, 2, shade(col, 0.86)); px(tx, ty, 1, 1, shade(col, 1.1)); }
      }
      if (k === 'T') {
        if (estilo.T === 'pared') { // pared / gradas / muro
          px(x, 0, 32, 32, shade(col, 0.9));
          for (let yy = 0; yy < 32; yy += 8) for (let xx = 0; xx < 32; xx += 16) { const off = (yy / 8) % 2 ? 8 : 0; px(x + ((xx + off) % 32), yy, 15, 7, shade(col, 1.15)); px(x + ((xx + off) % 32), yy, 15, 1, shade(col, 1.35)); }
        } else { // árbol
          const bg = pal.G || col; px(x, 0, 32, 32, bg);
          px(x + 12, 24, 8, 8, '#5a3a1e'); px(x + 12, 24, 3, 8, '#7a5230');
          g.fillStyle = shade(col, 0.75); g.beginPath(); g.arc(x + 16, 15, 13, 0, 7); g.fill();
          g.fillStyle = col; g.beginPath(); g.arc(x + 14, 13, 10, 0, 7); g.fill();
          g.fillStyle = shade(col, 1.3); g.beginPath(); g.arc(x + 11, 9, 5, 0, 7); g.fill();
          px(x + 20, 18, 2, 2, shade(col, 0.6)); px(x + 8, 19, 2, 2, shade(col, 0.6));
        }
      }
      if (k === 'H') { // edificio: techo, pared, puerta, ventana
        const roof = shade(col, 0.7), wall = shade(col, 1.25);
        px(x, 0, 32, 32, wall); px(x, 0, 32, 11, roof); px(x, 9, 32, 2, shade(col, 0.5));
        for (let xx = 0; xx < 32; xx += 6) px(x + xx, 2, 4, 1, shade(col, 0.85));
        px(x + 5, 15, 7, 7, '#e0f8d0'); px(x + 5, 15, 7, 1, shade(col, 0.5)); px(x + 8, 15, 1, 7, shade(col, 0.5));
        px(x + 19, 15, 7, 7, '#e0f8d0'); px(x + 19, 15, 7, 1, shade(col, 0.5)); px(x + 22, 15, 1, 7, shade(col, 0.5));
        px(x, 30, 32, 2, shade(col, 0.55));
      }
      if (k === 'W' || k === 'W2') {
        if (estilo.W === 'linea') { px(x, 0, 32, 32, pal.G); px(x, 12, 32, 8, col); }
        else if (estilo.W === 'pared') { px(x, 0, 32, 32, shade(col, 0.85)); for (let yy = 0; yy < 32; yy += 8) { px(x, yy, 32, 1, shade(col, 1.4)); px(x, yy + 4, 32, 1, shade(col, 0.6)); } px(x + 14, 10, 4, 4, '#7cf2ff'); }
        else { // agua animada
          const o = k === 'W2' ? 6 : 0;
          px(x + 3 + o, 6, 9, 2, shade(col, 1.35)); px(x + 18 - o, 14, 9, 2, shade(col, 1.35)); px(x + 8 + o, 24, 9, 2, shade(col, 1.35));
          px(x + 5 + o, 8, 5, 1, shade(col, 0.8)); px(x + 20 - o, 16, 5, 1, shade(col, 0.8));
        }
      }
      if (k === 'D') { // puerta al siguiente mundo
        px(x, 0, 32, 32, pal.G); px(x + 6, 4, 20, 28, '#3b2a10'); px(x + 9, 7, 14, 25, col); px(x + 9, 7, 14, 3, '#fff6c0'); px(x + 19, 19, 2, 3, '#3b2a10');
      }
    });
    scene.textures.addSpriteSheet('tiles_' + id, cv, { frameWidth: TILE_, frameHeight: TILE_ });
  }

  /* ---------- Edificios (dibujados por código, en unidades de 32 px por tile) ---------- */
  function makeBuilding(scene, worldId, e, pal) {
    const W = e.w * 32, H = e.h * 32;
    const cv = document.createElement('canvas'); cv.width = W * SCALE; cv.height = H * SCALE;
    const g = cv.getContext('2d'); g.scale(SCALE, SCALE);
    const px = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
    const txt = (t, x, y, size, c) => { g.font = `${size}px "Press Start 2P", monospace`; g.fillStyle = c; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(t, x, y); };
    const win = (x, y, w = 8, h = 8, lit = false) => { px(x, y, w, h, lit ? '#f6e7a8' : '#cfe8f7'); px(x, y, w, 1, '#3a3a3a'); px(x + w / 2 - 0.5, y, 1, h, '#3a3a3a'); };
    if (e.tipo === 'monoblock') {
      px(0, 0, W, H, pal.G); px(4, 2, W - 8, H - 12, '#b9b3a4'); px(4, 2, W - 8, 3, '#8d8677');
      for (let f = 0; f < 3; f++) for (let c = 0; c < e.w * 2 - 1; c++) win(10 + c * 14, 8 + f * 26, 8, 10, (f + c) % 3 === 0);
      px(W / 2 - 8, H - 24, 16, 14, '#5a3a1e'); px(W / 2 - 3, H - 17, 6, 7, '#9bd1ff');
      px(0, H - 10, W, 10, pal.G); px(4, H - 11, W - 8, 2, '#7a7466');
      for (let i = 0; i < e.w; i++) { px(6 + i * 32, H - 8, 10, 6, '#5f8a3a'); }
      txt('CASA', W / 2, H - 4, 5, '#0f380f');
    } else if (e.tipo === 'colegio') {
      px(0, 0, W, H, pal.G);
      // edificio bajo detrás, palmeras, reja verde, cartel
      px(8, 6, W - 16, H - 40, '#d9cdb4'); px(8, 6, W - 16, 3, '#9a8f79');
      for (let c = 0; c < e.w * 2; c++) win(14 + c * 14, 14, 8, 8);
      const palm = (x, y) => { px(x - 1, y, 3, 26, '#7a5230'); g.fillStyle = '#3f7a2e'; [[-14, -2], [10, -2], [-10, -10], [6, -10], [-2, -14]].forEach(([dx, dy]) => { g.beginPath(); g.ellipse(x + dx, y + dy, 9, 4, dx < 0 ? -0.6 : 0.6, 0, 7); g.fill(); }); };
      palm(22, 14); palm(W - 24, 12);
      px(0, H - 22, W, 3, '#2f6b3a'); for (let x = 2; x < W; x += 5) px(x, H - 22, 1, 12, '#2f6b3a'); px(0, H - 11, W, 2, '#2f6b3a');
      px(W / 2 - 52, H - 36, 104, 16, '#f4f4ec'); px(W / 2 - 52, H - 36, 104, 1.5, '#2f6b3a'); px(W / 2 - 52, H - 21.5, 104, 1.5, '#2f6b3a');
      txt('Colegio del Sol', W / 2, H - 28, 5.5, '#2f6b3a');
      px(W / 2 - 8, H - 21, 16, 12, '#8a8f6a');
    } else if (e.tipo === 'campito') {
      px(0, 0, W, H, '#6fae5e'); for (let i = 0; i < 40; i++) px((i * 37) % W, (i * 53) % H, 2, 1, '#5f9a4e');
      px(6, 4, W - 12, H - 8, 'rgba(255,255,255,0)'); g.strokeStyle = '#e8f3d8'; g.lineWidth = 1.5; g.strokeRect(8, 6, W - 16, H - 12); g.beginPath(); g.moveTo(W / 2, 6); g.lineTo(W / 2, H - 6); g.stroke();
      // arcos
      px(8, H / 2 - 12, 2, 24, '#f4f4ec'); px(8, H / 2 - 12, 10, 2, '#f4f4ec'); px(8, H / 2 + 10, 10, 2, '#f4f4ec');
      px(W - 10, H / 2 - 12, 2, 24, '#f4f4ec'); px(W - 18, H / 2 - 12, 10, 2, '#f4f4ec'); px(W - 18, H / 2 + 10, 10, 2, '#f4f4ec');
      g.fillStyle = '#ffffff'; g.beginPath(); g.arc(W / 2 + 18, H / 2 + 6, 3, 0, 7); g.fill(); g.fillStyle = '#222'; g.beginPath(); g.arc(W / 2 + 18, H / 2 + 6, 1.2, 0, 7); g.fill();
      txt('EL CAMPITO', W / 2, 12, 5, '#e8f3d8');
    } else if (e.tipo === 'utn') {
      px(0, 0, W, H, pal.G); px(6, 4, W - 12, H - 14, '#c9c2b2'); px(6, 4, W - 12, 4, '#8c8474');
      for (let f = 0; f < 2; f++) for (let c = 0; c < e.w * 2 - 1; c++) win(14 + c * 14, 14 + f * 22, 8, 10, (f * 3 + c) % 4 === 0);
      px(W / 2 - 14, H - 26, 28, 16, '#7fb2d6'); px(W / 2 - 1, H - 26, 2, 16, '#3a3a3a');
      px(W / 2 - 22, 6, 44, 12, '#1e3d73'); txt('UTN', W / 2, 12, 8, '#ffffff');
      px(0, H - 10, W, 10, pal.G); px(6, H - 11, W - 12, 2, '#7a7466');
    } else if (e.tipo === 'guadarrama') {
      // sierra atrás, casa blanca techo marrón
      px(0, 0, W, H, pal.G); g.fillStyle = '#8fa3b5'; g.beginPath(); g.moveTo(0, 30); g.lineTo(28, 6); g.lineTo(52, 26); g.lineTo(80, 4); g.lineTo(110, 28); g.lineTo(140, 8); g.lineTo(W, 30); g.lineTo(W, 32); g.lineTo(0, 32); g.fill();
      g.fillStyle = '#f4f4f4'; g.beginPath(); g.moveTo(28, 6); g.lineTo(34, 12); g.lineTo(22, 12); g.fill(); g.beginPath(); g.moveTo(80, 4); g.lineTo(87, 11); g.lineTo(73, 11); g.fill();
      px(W / 2 - 40, 34, 80, H - 46, '#f7f3ea'); g.fillStyle = '#7a4a2a'; g.beginPath(); g.moveTo(W / 2 - 46, 36); g.lineTo(W / 2, 18); g.lineTo(W / 2 + 46, 36); g.fill(); px(W / 2 - 46, 34, 92, 4, '#5e3a20');
      win(W / 2 - 30, 44, 10, 10); win(W / 2 + 20, 44, 10, 10); px(W / 2 - 6, H - 30, 12, 18, '#5e3a20'); px(W / 2 - 2, H - 22, 3, 3, '#e2b04a');
      px(0, H - 10, W, 10, pal.G); for (let i = 0; i < 6; i++) px(6 + i * 26, H - 9, 8, 5, '#3f7a2e');
      txt('GUADARRAMA', W / 2, H - 4, 5, '#0f380f');
    } else if (e.tipo === 'padelcit') {
      px(0, 0, W, H, pal.G); px(4, 4, W - 8, H - 12, '#2a6caf'); for (let y = 6; y < H - 10; y += 4) px(4, y, W - 8, 1, '#1e5490');
      g.strokeStyle = '#f5f8ff'; g.lineWidth = 1.5; g.strokeRect(10, 8, W - 20, H - 20); g.beginPath(); g.moveTo(W / 2, 8); g.lineTo(W / 2, H - 12); g.stroke();
      px(10, H / 2 - 4, W - 20, 1, '#f5f8ff'); px(4, 4, W - 8, 8, 'rgba(200,230,250,0.55)'); px(4, 4, W - 8, 1, '#3c4250');
      px(W / 2 - 30, 0, 60, 10, '#0f380f'); txt('PÁDEL CIT', W / 2, 5, 6, '#9bbc0f');
    } else if (e.tipo === 'casa') {
      px(0, 0, W, H, pal.G);
      const c = '#9fe0c8', cd = '#6fbfa3';
      px(12, 20, W - 24, H - 30, c); px(12, 20, W - 24, 2, cd);
      // terraza con baranda arriba
      px(12, 10, W - 24, 10, '#d8f5e9'); for (let x = 14; x < W - 14; x += 6) px(x, 6, 1.5, 6, cd); px(12, 5, W - 24, 1.5, cd);
      px(12, 20, W - 24, 1, cd); px(12, 50, W - 24, 1, cd); px(12, 80, W - 24, 1, cd);
      for (let f = 0; f < 3; f++) for (let k = 0; k < 3; k++) win(24 + k * 48, 26 + f * 30, 12, 12, f === 1);
      px(W / 2 - 9, H - 32, 18, 22, '#5a3a1e'); px(W / 2 + 3, H - 21, 3, 3, '#e2b04a');
      px(0, H - 10, W, 10, pal.G); px(12, H - 11, W - 24, 2, '#7a7466');
      txt('NUESTRA CASA', W / 2, H - 4, 5, '#e0f8d0');
    } else if (e.tipo === 'buzon') {
      px(0, 0, W, H, pal.G);
      px(W / 2 - 3, 24, 6, H - 24, '#5a3a1e');
      px(8, 8, W - 16, 26, '#e2b04a'); px(8, 8, W - 16, 3, '#b8862e'); px(12, 12, W - 24, 18, '#0f380f');
      px(W / 2 - 10, 16, 20, 10, '#e0f8d0'); px(W / 2 - 10, 16, 20, 1, '#0f380f'); px(W / 2 - 1, 16, 2, 10, '#0f380f'); g.strokeStyle = '#0f380f'; g.lineWidth = 1; g.beginPath(); g.moveTo(W / 2 - 10, 16); g.lineTo(W / 2, 22); g.lineTo(W / 2 + 10, 16); g.stroke();
      txt('MENSAJES', W / 2, H - 6, 4.5, '#e0f8d0');
    } else if (e.tipo === 'portal') {
      g.fillStyle = 'rgba(0,0,0,0)'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#8a8fd1'; g.beginPath(); g.ellipse(16, 24, 13, 6, 0, 0, 7); g.fill();
      g.fillStyle = '#c9cdff'; g.beginPath(); g.ellipse(16, 24, 9, 3.5, 0, 0, 7); g.fill();
      g.strokeStyle = '#e0f8d0'; g.lineWidth = 1.5; g.beginPath(); g.arc(16, 12, 8, 0, 7); g.stroke(); g.beginPath(); g.arc(16, 12, 4, 0, 7); g.stroke();
      txt((e.etiqueta || e.nombre).toUpperCase(), 16, 2, 3.5, '#e0f8d0');
    }
    scene.textures.addImage(`bld_${worldId}_${e.id}`, cv);
  }

  /* ---------- Título ---------- */
  class Title extends Phaser.Scene {
    constructor() { super('Title'); }
    create() {
      this.cameras.main.setBackgroundColor('#0f380f');
      this.add.text(VW / 2, VH * 0.22, C.titulo, { fontFamily: '"Press Start 2P"', fontSize: FS(30), color: '#9bbc0f' }).setOrigin(0.5);
      this.add.text(VW / 2, VH * 0.34, C.subtitulo, { fontFamily: '"Press Start 2P"', fontSize: FS(11), color: '#e0f8d0' }).setOrigin(0.5);
      const hero = this.add.sprite(VW / 2 + 10 * SCALE, VH * 0.49, 'PC_MATI', 0).setScale(1.5); hero.play('PC_MATI_down');
      this.add.sprite(VW / 2 - 34 * SCALE, VH * 0.5, 'PET_TOTO', 6).setScale(1.5).play('PET_TOTO_right');
      const p = this.add.text(VW / 2, VH * 0.635, TV ? 'Presioná Z' : 'Presioná A', { fontFamily: '"Press Start 2P"', fontSize: FS(8), color: '#e0f8d0' }).setOrigin(0.5);
      this.tweens.add({ targets: p, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });
      hud(''); this.started = false; AUDIO.play('title');
    }
    async update() {
      if (Dialog.open) { pumpDialog(); snapshotKeys(); return; }
      if (!this.started && (justPressed('start') || justPressed('A'))) {
        this.started = true;
        const hasSave = save.talked && Object.keys(save.talked).length > 0;
        let fresh = !hasSave;
        if (hasSave) {
          const r = await Dialog.ask('Hay una partida guardada.', ['Continuar', 'Empezar de nuevo']);
          if (r === 1) { resetSave(); fresh = true; }
        }
        if (fresh) await Dialog.run(C.intro, 'Gaby');
        this.scene.start('World', { world: save.world });
      }
      snapshotKeys();
    }
  }

  /* ---------- Mundo ---------- */
  class World extends Phaser.Scene {
    constructor() { super('World'); }
    init(d) { this.worldId = d.world; this.spawn = d.spawn || null; }
    create() {
      const m = MAPS.mundos[this.worldId]; this.m = m; save.world = this.worldId; persist();
      this.grid = m.mapa.map((r) => r.split(''));
      this.bld = {}; this.bldAt = {};
      (m.edificios || []).forEach((e) => {
        const img = this.add.image(e.x * TILE, e.y * TILE, `bld_${this.worldId}_${e.id}`).setOrigin(0, 0).setDepth(e.bloquea === false ? 0.5 : e.y + e.h);
        this.bld[e.id] = img;
        save.read = save.read || {};
        if (e.texto && !save.read[`${this.worldId}:${e.id}`]) {
          const mk = this.add.text((e.x + e.w / 2) * TILE, e.y * TILE - 6 * SCALE, '!', { fontFamily: '"Press Start 2P"', fontSize: FS(11), color: '#f2d94e', stroke: '#0f380f', strokeThickness: 3 * SCALE }).setOrigin(0.5, 1).setDepth(60);
          this.tweens.add({ targets: mk, y: mk.y - 6 * SCALE, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' }); img.marker = mk;
        }
        for (let yy = e.y; yy < e.y + e.h; yy++) for (let xx = e.x; xx < e.x + e.w; xx++) this.bldAt[`${xx},${yy}`] = e;
      });
      this.blocked = (x, y) => { const e = this.bldAt[`${x},${y}`]; if (e && e.bloquea !== false) return true; return !this.grid[y] || !this.grid[y][x] || !'GPD'.includes(this.grid[y][x]); };
      const order = MAPS.orden; if (order.indexOf(this.worldId) > order.indexOf(save.maxWorld || 'mundo1')) save.maxWorld = this.worldId;
      this.cameras.main.setBackgroundColor(m.palette.T);
      const kinds = 'GPTHWD';
      this.water = []; this.waterFrame = 0;
      for (let y = 0; y < MAPS.rows; y++) for (let x = 0; x < MAPS.cols; x++) {
        const k = this.grid[y][x];
        const hidden = k === 'D' && m.superpoder && !save.powers.includes(m.superpoder);
        const img = this.add.image(x * TILE + TILE / 2, y * TILE + TILE / 2, 'tiles_' + this.worldId, kinds.indexOf(hidden ? 'G' : k)).setDepth(0);
        if (k === 'D') this.doorImg = img;
        if (this.bldAt[`${x},${y}`] && this.bldAt[`${x},${y}`].bloquea !== false) continue;
        if (k === 'W' && (m.estilo || {}).W !== 'linea' && (m.estilo || {}).W !== 'pared') this.water.push(img);
      }
      // NPCs
      this.npcs = {}; this.occ = {};
      DATA.personajes.filter((p) => p.tipo === 'npc' && p.posicion && p.posicion.mundo === this.worldId).forEach((p) => {
        const s = this.add.sprite(p.posicion.x * TILE + TILE / 2, p.posicion.y * TILE + TILE - 2 * SCALE, p.id, 0).setOrigin(0.5, 1).setScale(SPR);
        s.setDepth(p.posicion.y + 1); s.npc = p; s.gx = p.posicion.x; s.gy = p.posicion.y;
        if ((p.flags || {}).cielo) {
          const halo = this.add.ellipse(s.x, s.y - s.displayHeight / 2, s.displayWidth * 1.6, s.displayHeight * 1.3, 0xfff6c0, 0.35).setDepth(p.posicion.y + 0.5);
          this.tweens.add({ targets: halo, alpha: 0.15, scaleX: 1.08, scaleY: 1.08, duration: 1400, yoyo: true, repeat: -1 });
          this.tweens.add({ targets: s, y: s.y - 3 * SCALE, duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
          s.setAlpha(0.92);
        }
        this.npcs[p.id] = s; this.occ[`${p.posicion.x},${p.posicion.y}`] = s;
      });
      // Jugador
      const st = this.spawn || { x: m.entrada[0], y: m.entrada[1] };
      this.pl = this.add.sprite(0, 0, 'PC_MATI', 0).setOrigin(0.5, 1).setScale(SPR);
      this.pl.gx = st.x; this.pl.gy = st.y; this.pl.dir = 'down'; this.pl.moving = false; this.placeAt(this.pl);
      // Toto
      this.toto = this.add.sprite(0, 0, 'PET_TOTO', 0).setOrigin(0.5, 1).setScale(SPR);
      this.toto.gx = st.x; this.toto.gy = st.y; this.toto.dir = 'down'; this.placeAt(this.toto);
      this.trail = [];
      this.cameras.main.setBounds(0, 0, MAPS.cols * TILE, MAPS.rows * TILE);
      this.cameras.main.startFollow(this.pl, true, 1, 1);
      this.cameras.main.roundPixels = true;
      hud(m.nombre); this.busy = false;
      this.updateMarker(); showZone(m.nombre);
      ((MAPS.pasean || {})[this.worldId] || []).forEach((id) => { const n = this.npcs[id]; if (n) { n.homeX = n.gx; n.homeY = n.gy; n.pasea = true; } });
      this.time.addEvent({ delay: 1400, loop: true, callback: () => {
        if (this.busy) return;
        Object.values(this.npcs).filter((n) => n.pasea && !n.moving && !n.retando).forEach((n) => {
          const dir = Math.random() < 0.5 ? -1 : 1; const nx = n.gx + dir, ny = n.gy;
          if (Math.abs(nx - n.homeX) > 2 || this.blocked(nx, ny) || this.occ[`${nx},${ny}`] || (this.pl.gx === nx && this.pl.gy === ny) || (this.toto.gx === nx && this.toto.gy === ny)) return;
          delete this.occ[`${n.gx},${n.gy}`]; n.gx = nx; n.gy = ny; this.occ[`${nx},${ny}`] = n; n.moving = true; n.dir = dir < 0 ? 'left' : 'right'; n.play(n.npc.id + '_' + n.dir, true);
          this.tweens.add({ targets: n, x: nx * TILE + TILE / 2, duration: 420, onComplete: () => { n.moving = false; n.setDepth(ny + 1); this.idleFrame(n); if (this.qTarget === n) this.updateMarker(); } });
        });
      } });
      if (AUDIO.current !== this.worldId) AUDIO.play(this.worldId);
      this.time.addEvent({ delay: 550, loop: true, callback: () => { this.waterFrame = this.waterFrame ? 0 : 1; this.water.forEach((w) => w.setFrame(this.waterFrame ? 6 : 4)); } });
      this.time.addEvent({ delay: 2200, loop: true, callback: () => { if (this.busy) return; const arr = Object.values(this.npcs); const n = arr[(Math.random() * arr.length) | 0]; if (n && Math.random() < 0.6) { n.dir = ['down', 'left', 'right', 'down'][(Math.random() * 4) | 0]; this.idleFrame(n); } } });
      if (this.worldId === 'mundo4') this.time.delayedCall(900, () => {
        AUDIO.sfx('bark');
        const b = this.add.text(this.toto.x, this.toto.y - this.toto.displayHeight - 4 * SCALE, C.totoLlega || '¡Guau! ¡Quiero jugar!', { fontFamily: '"Press Start 2P"', fontSize: FS(6), color: '#0f380f', backgroundColor: '#e0f8d0', padding: { x: 3 * SCALE, y: 2 * SCALE } }).setOrigin(0.5, 1).setDepth(99);
        this.tweens.add({ targets: b, y: b.y - 6 * SCALE, duration: 500, yoyo: true, repeat: 4 }); this.time.delayedCall(4500, () => b.destroy());
        this.time.delayedCall(1300, () => AUDIO.sfx('bark'));
      });
      if (!save.talked['_intro_' + this.worldId]) {
        save.talked['_intro_' + this.worldId] = 1; persist();
        const pages = [`${m.nombre}.`];
        if (this.worldId === 'mundo1') pages.push(TV ? 'Flechas para moverte. Z para hablar. X para el menú.' : 'Cruceta para moverte. A para hablar. B para el menú.');
        this.runBusy(() => Dialog.run(pages));
      }
    }
    // ---- cadena guiada ----
    chain() { return this.m.cadena || []; }
    chainIdx() { save.chain = save.chain || {}; return save.chain[this.worldId] || 0; }
    chainStep(i) { const c = this.chain(); return c[i] || null; }
    stepName(st) {
      if (!st) return '';
      if (st[0] === 'npc') { const p = DATA.personajes.find((q) => q.id === st[1]); return p ? p.nombre : st[1]; }
      if (st[0] === 'toto') return 'Toto';
      const e = (this.m.edificios || []).find((x) => x.id === st[1]); return e ? e.nombre : st[1];
    }
    isTurn(kind, id) { const st = this.chainStep(this.chainIdx()); return !st || (st[0] === kind && st[1] === id); }
    async advanceChain(kind, id) {
      const st = this.chainStep(this.chainIdx()); if (!st || st[0] !== kind || st[1] !== id) return;
      save.chain[this.worldId] = this.chainIdx() + 1; persist(); this.updateMarker();
      const nx = this.chainStep(this.chainIdx()); const CC = C.cadena;
      const pick = (arr) => arr[(id.length + this.chainIdx()) % arr.length];
      if (!nx) return Dialog.run([CC.ultimo]);
      const msg = nx[0] === 'lugar' ? pick(CC.siguienteLugar) : pick(CC.siguienteNpc);
      return Dialog.run([msg.replace('{n}', this.stepName(nx))]);
    }
    updateMarker() {
      if (this.qmark) { this.qmark.destroy(); this.qmark = null; }
      const st = this.chainStep(this.chainIdx()); if (!st) return;
      let x, y;
      if (st[0] === 'npc') { const n = this.npcs[st[1]]; if (!n) return; x = n.x; y = n.y - n.displayHeight - 4 * SCALE; this.qTarget = n; }
      else if (st[0] === 'toto') { x = this.toto.x; y = this.toto.y - this.toto.displayHeight - 4 * SCALE; this.qTarget = this.toto; }
      else { const e = (this.m.edificios || []).find((q) => q.id === st[1]); if (!e) return; x = (e.x + e.w / 2) * TILE; y = e.y * TILE - 6 * SCALE; this.qTarget = null; }
      this.qmark = this.add.text(x, y, '?', { fontFamily: '"Press Start 2P"', fontSize: FS(11), color: '#ffffff', stroke: '#0f380f', strokeThickness: 3 * SCALE }).setOrigin(0.5, 1).setDepth(61);
      this.tweens.add({ targets: this.qmark, y: y - 6 * SCALE, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    placeAt(s) { s.x = s.gx * TILE + TILE / 2; s.y = s.gy * TILE + TILE - 2 * SCALE; s.setDepth(s.gy + 1); }
    idleFrame(s, id) { s.anims.stop(); s.setFrame({ down: 0, left: 3, right: 6, up: 9 }[s.dir]); }
    async runBusy(fn) { this.busy = true; await fn(); this.busy = false; }
    update() {
      if (this.busy || Dialog.open) {
        if (Dialog.open) pumpDialog();
        snapshotKeys(); return;
      }
      if (justPressed('A')) { this.interact(); snapshotKeys(); return; }
      if (justPressed('B')) { this.bDown = this.time.now; this.bMoved = false; }
      if (keys.B && this.pl.moving) this.bMoved = true;
      if (!keys.B && prev.B && !this.bMoved && this.time.now - (this.bDown || 0) < 400) { this.runBusy(() => this.menu()); snapshotKeys(); return; }
      if (justPressed('start')) { this.runBusy(() => this.menu()); snapshotKeys(); return; }
      if (!this.pl.moving) {
        const d = keys.up ? 'up' : keys.down ? 'down' : keys.left ? 'left' : keys.right ? 'right' : null;
        if (d) this.tryMove(d); else this.idleFrame(this.pl, 'PC_MATI');
      }
      this.checkRival();
      snapshotKeys();
    }
    checkRival() {
      const st = this.chainStep(this.chainIdx()); if (!st || st[0] !== 'npc') return;
      const n = this.npcs[st[1]]; if (!n || !(n.npc.flags || {}).esRival || n.retando || n.moving || this.pl.moving) return;
      const pl = this.pl, dx = pl.gx - n.gx, dy = pl.gy - n.gy;
      if (!((dx === 0 && Math.abs(dy) <= 3 && dy !== 0) || (dy === 0 && Math.abs(dx) <= 3 && dx !== 0))) return;
      const sx = Math.sign(dx), sy = Math.sign(dy);
      for (let k = 1; k < Math.max(Math.abs(dx), Math.abs(dy)); k++) if (this.blocked(n.gx + sx * k, n.gy + sy * k) || this.occ[`${n.gx + sx * k},${n.gy + sy * k}`]) return;
      n.retando = true; this.busy = true; this.idleFrame(pl);
      const ex = this.add.text(n.x, n.y - n.displayHeight - 4 * SCALE, '!', { fontFamily: '"Press Start 2P"', fontSize: FS(11), color: '#c8102e', stroke: '#fff', strokeThickness: 3 * SCALE }).setOrigin(0.5, 1).setDepth(62);
      AUDIO.sfx('confirm');
      const steps = Math.max(Math.abs(dx), Math.abs(dy)) - 1; const tx = n.gx + sx * steps, ty = n.gy + sy * steps;
      n.dir = sx > 0 ? 'right' : sx < 0 ? 'left' : sy > 0 ? 'down' : 'up'; n.play(n.npc.id + '_' + n.dir, true);
      delete this.occ[`${n.gx},${n.gy}`]; n.gx = tx; n.gy = ty; this.occ[`${tx},${ty}`] = n;
      this.time.delayedCall(600, () => {
        this.tweens.add({ targets: n, x: tx * TILE + TILE / 2, y: ty * TILE + TILE - 2 * SCALE, duration: 260 * Math.max(1, steps), onComplete: async () => {
          ex.destroy(); n.setDepth(ty + 1); this.idleFrame(n);
          pl.dir = { right: 'left', left: 'right', down: 'up', up: 'down' }[n.dir]; this.idleFrame(pl);
          await Dialog.run([`¡${n.npc.nombre} te desafía!`], ''); this.busy = false; await this.runBusy(() => this.talk(n.npc, n));
        } });
      });
    }
    tryMove(d) {
      const pl = this.pl; pl.dir = d;
      const dx = { left: -1, right: 1 }[d] || 0, dy = { up: -1, down: 1 }[d] || 0;
      const nx = pl.gx + dx, ny = pl.gy + dy;
      pl.play('PC_MATI_' + d, true);
      if (this.blocked(nx, ny) || this.occ[`${nx},${ny}`]) { if (!this.bumpT || this.time.now - this.bumpT > 350) { this.bumpT = this.time.now; AUDIO.sfx('bump'); } return; }
      pl.moving = true; this.trail.unshift({ x: pl.gx, y: pl.gy, dir: d }); this.trail.length = 2;
      pl.gx = nx; pl.gy = ny;
      const dur = keys.B ? 95 : 170;
      this.tweens.add({ targets: pl, x: nx * TILE + TILE / 2, y: ny * TILE + TILE - 2 * SCALE, duration: dur, onComplete: () => { pl.moving = false; pl.setDepth(ny + 1); this.onStep(nx, ny); } });
      this.moveToto();
    }
    moveToto() {
      const t = this.trail[0]; if (!t) return; const to = this.toto;
      if (to.gx === t.x && to.gy === t.y) return;
      to.dir = to.gx < t.x ? 'right' : to.gx > t.x ? 'left' : to.gy < t.y ? 'down' : 'up';
      to.play('PET_TOTO_' + to.dir, true); to.gx = t.x; to.gy = t.y;
      this.tweens.add({ targets: to, x: t.x * TILE + TILE / 2, y: t.y * TILE + TILE - 2 * SCALE, duration: keys.B ? 95 : 170, onComplete: () => { to.setDepth(t.y + 1); this.idleFrame(to); } });
    }
    onStep(x, y) {
      if (this.grid[y][x] !== 'D') return;
      const order = MAPS.orden, idx = order.indexOf(this.worldId), next = order[idx + 1];
      const need = this.m.superpoder;
      if (need && !save.powers.includes(need)) return; // puerta escondida: sin el superpoder no existe
      if (!next) return;
      AUDIO.sfx('door');
      this.runBusy(async () => { await Dialog.run([`Siguiente: ${MAPS.mundos[next].nombre}.`]); this.cameras.main.fadeOut(300); await new Promise((r) => setTimeout(r, 320)); this.scene.start('World', { world: next }); });
    }
    async travel(w) { AUDIO.sfx('door'); await Dialog.run([`Viajando a ${MAPS.mundos[w].nombre}.`]); this.cameras.main.fadeOut(300); await new Promise((r) => setTimeout(r, 320)); this.scene.start('World', { world: w }); }
    facing() { const pl = this.pl; const dx = { left: -1, right: 1 }[pl.dir] || 0, dy = { up: -1, down: 1 }[pl.dir] || 0; return this.occ[`${pl.gx + dx},${pl.gy + dy}`]; }
    async interact() {
      const npc = this.facing();
      if (!npc) {
        const pl = this.pl, ddx = { left: -1, right: 1 }[pl.dir] || 0, ddy = { up: -1, down: 1 }[pl.dir] || 0;
        const e = this.bldAt[`${pl.gx + ddx},${pl.gy + ddy}`];
        if (e && e.tipo === 'portal') { this.idleFrame(this.pl); return this.runBusy(async () => { const r = await Dialog.ask(`¿Viajar a ${e.nombre}?`, ['Sí', 'No']); if (r === 0) this.travel(e.viaje); }); }
        if (e && e.texto && (e.bloquea !== false || e.tipo === 'campito')) {
          this.idleFrame(this.pl);
          return this.runBusy(async () => {
            const leido = !!save.read[`${this.worldId}:${e.id}`];
            if (!leido && !e.abrirFoto && !this.isTurn('lugar', e.id)) { await Dialog.run([C.cadena.todaviaNo.replace('{n}', this.stepName(this.chainStep(this.chainIdx())))], e.nombre); return; }
            if (e.abrirFoto) { await Dialog.run(leido ? [e.texto[1]] : e.texto, e.nombre); save.read[`${this.worldId}:${e.id}`] = 1; persist(); const img = this.bld[e.id]; if (img.marker) { img.marker.destroy(); img.marker = null; } if (!leido) await this.advanceChain('lugar', e.id); AUDIO.play('final'); showPhoto(this); return; }
            await Dialog.run(leido ? [C.yaLeido || 'Este lugar ya lo conocés.'] : e.texto, e.nombre);
            if (!leido) { save.read[`${this.worldId}:${e.id}`] = 1; persist(); AUDIO.sfx('treasure'); const img = this.bld[e.id]; if (img.marker) { img.marker.destroy(); img.marker = null; } }
            if (e.minijuego === 'construir' && !save.wins.construir) { const r = await Dialog.ask('¿Construimos?', ['Sí', 'Ahora no'], e.nombre); if (r === 0) await this.launchScene('Construir', 'construir', ['Casa construida. Piso por piso, como la de verdad.', '¡Mati obtuvo el trofeo Constructor!'], ['Se cayó un piso. Pero vos ya sabés: se vuelve a empezar.'], 'Constructor'); }
            if (!leido) await this.advanceChain('lugar', e.id);
          });
        }
        const totoCerca = Math.abs(this.toto.gx - pl.gx) + Math.abs(this.toto.gy - pl.gy) <= 1;
        if ((this.toto.gx === pl.gx + ddx && this.toto.gy === pl.gy + ddy) || (this.worldId === 'mundo4' && totoCerca)) {
          AUDIO.sfx('bark'); this.idleFrame(this.pl);
          if (this.worldId === 'mundo4') { await this.runBusy(async () => { const r = await Dialog.ask('Toto trajo la pelotita. ¿Jugamos?', ['Sí', 'Ahora no'], 'Toto'); if (r === 0) { const t = this.toto; t.dir = { up: 'down', down: 'up', left: 'right', right: 'left' }[pl.dir]; await this.totoJuego(); } }); return; }
          await this.runBusy(() => Dialog.run([(C.toto || ['¡Guau!'])[(Math.random() * (C.toto || ['¡Guau!']).length) | 0]], 'Toto'));
        }
        return;
      }
      const p = npc.npc;
      npc.dir = { up: 'down', down: 'up', left: 'right', right: 'left' }[this.pl.dir]; this.idleFrame(npc);
      this.idleFrame(this.pl);
      await this.runBusy(() => this.talk(p, npc));
    }
    async talk(p, npc) {
      const d = p.dialogos, first = !save.talked[p.id];
      if (first && !this.isTurn('npc', p.id)) { await Dialog.run([C.cadena.todaviaNo.replace('{n}', this.stepName(this.chainStep(this.chainIdx())))], p.nombre); return; }
      const pages = first ? [d.saludo] : [C.yaHablado || 'Ya te conté lo mío.'];
      if (!first) { const extra = (C.manas && C.manas[p.id]) || (C.segundaVez && C.segundaVez[(Math.random() * C.segundaVez.length) | 0]); if (extra) pages.push(extra); }
      if (first) {
        const h = p.id.length + p.nombre.length;
        if (d.anecdota) pages.push(C.recuerdoIntro[h % C.recuerdoIntro.length], ...wrap(d.anecdota));
        if (d.cualidad) pages.push(C.admiroIntro[(h + 1) % C.admiroIntro.length], ...wrap(d.cualidad));
        if (d.mensajeFuturo && !(p.flags || {}).esBossFinal) pages.push('Lo que te deseo para lo que viene te lo guardo para el final.');
      }
      await Dialog.run(pages, p.nombre);
      if (first) { save.talked[p.id] = 1; persist(); AUDIO.sfx('treasure'); await Dialog.run([`Tesoro de ${p.nombre} guardado. (${Object.keys(save.talked).filter((k) => !k.startsWith('_')).length}/${DATA.personajes.filter((q) => q.tipo === 'npc').length})`]); }
      const f = p.flags || {};
      if (first && !f.esBossFinal && !f.minijuego && !f.daSuperpoder) await this.advanceChain('npc', p.id);
      if (f.beso && first) { await this.beso(npc); await Dialog.run([C.beso || 'Mi bombón hermoso.'], p.nombre); }
      if (f.esCentroCura) await Dialog.run(['Tus PS están al máximo.'], p.nombre);
      if (f.daSuperpoder && !save.powers.includes(f.daSuperpoder)) {
        save.powers.push(f.daSuperpoder); persist(); hud(this.m.nombre); AUDIO.sfx('power');
        if (this.doorImg) { this.doorImg.setFrame(5); const sp = this.add.text(this.doorImg.x, this.doorImg.y - TILE, '✦', { fontFamily: '"Press Start 2P"', fontSize: FS(10), color: '#f2d94e' }).setOrigin(0.5).setDepth(50); this.tweens.add({ targets: sp, y: sp.y - 10 * SCALE, alpha: 0, duration: 1500, repeat: 3 }); }
        await Dialog.run([`¡Mati obtuvo ${MAPS.superpoderes[f.daSuperpoder]}!`, 'En algún rincón de este mundo apareció una puerta. Si no la encontrás, preguntá: alguien sabe dónde está.'], '');
      }
      if (f.minijuego && !save.wins[f.minijuego]) {
        const r = await Dialog.ask('¿Jugamos?', ['Sí', 'Ahora no'], p.nombre);
        if (r === 0) await this.minigame(f.minijuego, p);
      } else if (f.minijuego && save.wins[f.minijuego]) {
        await Dialog.run(['Ya me ganaste una vez. Con eso me alcanza.'], p.nombre);
      }
      if (f.esBossFinal) await this.finale(p);
      if (first) await this.advanceChain('npc', p.id);
    }
    async beso(npc) {
      const h = this.add.text(this.pl.x, this.pl.y - this.pl.displayHeight - 4 * SCALE, '♥', { fontFamily: '"Press Start 2P"', fontSize: FS(12), color: '#ff4d6d' }).setOrigin(0.5).setDepth(99);
      AUDIO.sfx('treasure');
      await new Promise((res) => this.tweens.add({ targets: h, y: h.y - 24 * SCALE, alpha: 0, duration: 1100, onComplete: () => { h.destroy(); res(); } }));
    }
    launchScene(key, winKey, winPages, losePages, trophy) {
      return new Promise((done) => {
        this.busy = true;
        this.scene.launch(key, { onDone: async (won) => {
          this.scene.stop(key); this.scene.wake('World'); snapshotKeys();
          if (won) { save.wins[winKey] = 1; if (trophy) { save.items = save.items || []; if (!save.items.includes(trophy)) save.items.push(trophy); } persist(); AUDIO.sfx('win'); await Dialog.run(winPages); }
          else { AUDIO.sfx('lose'); await Dialog.run(losePages); }
          done(won);
        } });
        this.scene.sleep('World');
      });
    }
    async minigame(kind, p) {
      if (kind === 'trivia') return this.trivia(p);
      if (kind === 'logica') return this.logica(p);
      if (kind === 'padel') return this.padel(p);
      if (kind === 'callar') return this.callar(p);
      if (kind === 'futbol') return this.launchScene('Futbol', 'futbol', ['Ganaste en el campito. Como cuando teníamos 12.'], ['Revancha cuando quieras. Acá siempre hay pelota.']);
      if (kind === 'pingpong') {
        const rec = (p.flags || {}).recompensa;
        const won = await this.launchScene('Pong', 'pingpong', ['...bueno. Ganaste. Esta vez.', 'Y lo digo en voz alta: me ganaste.'], ['Otra cuando quieras.'], rec);
        if (won && rec) { AUDIO.sfx('power'); await Dialog.run([`¡Mati obtuvo el ${rec}!`, 'Un trofeo que no se compra. Se gana.'], ''); }
        return;
      }
    }
    async callar(p) {
      const L = C.luis; let i = 0, ok = false;
      while (i < L.discurso.length && !ok) {
        await Dialog.run([L.discurso[i]], p.nombre);
        ok = await this.mash(TV ? '¡Apretá Z rápido para interrumpirlo!' : '¡Apretá A rápido para interrumpirlo!', L.toques || 16, L.ms || 2400);
        if (!ok && i < L.discurso.length - 1) await Dialog.run([L.sigue], p.nombre);
        i++;
      }
      if (ok) { save.wins.callar = 1; persist(); AUDIO.sfx('win'); await Dialog.run([L.callado], p.nombre); }
      else { AUDIO.sfx('lose'); await Dialog.run(['...bueno, ya está. Feliz cumple, hijo.'], p.nombre); }
    }
    mash(prompt, need, ms) {
      return new Promise((res) => {
        let n = 0; const t0 = this.time.now; let last = this.time.now; dlgEl.classList.add('show');
        const draw = () => { dlgEl.innerHTML = `<div class="name">${prompt}</div><div>${'█'.repeat(Math.max(0, n))}${'░'.repeat(Math.max(0, need - n))}</div>`; };
        draw();
        const h = () => {
          if (justPressed('A')) { n++; last = this.time.now; AUDIO.sfx('text'); draw(); }
          else if (n > 0 && this.time.now - last > 300) { n--; last = this.time.now; draw(); }
          snapshotKeys();
          if (n >= need || this.time.now - t0 > ms) { this.events.off('update', h); setTimeout(() => { dlgEl.classList.remove('show'); dlgEl.innerHTML = ''; res(n >= need); }, 250); }
        };
        snapshotKeys(); this.events.on('update', h);
      });
    }
    async totoJuego() {
      await Dialog.run(C.toto_juego.intro, 'Toto');
      await this.launchScene('Pelotita', 'toto', [C.toto_juego.gana], [C.toto_juego.pierde]);
      await this.advanceChain('toto', 'toto');
    }
    waitA(prompt) {
      return new Promise((res) => {
        dlgEl.classList.add('show'); dlgEl.innerHTML = `<div class="name">Toto</div><div>${prompt}</div>`;
        const h = () => { if (justPressed('A')) { this.events.off('update', h); dlgEl.classList.remove('show'); dlgEl.innerHTML = ''; res(); } snapshotKeys(); };
        snapshotKeys(); this.events.on('update', h);
      });
    }
    async padel(p) {
      await Dialog.run(['Cinco puntos. Yo te describo la jugada, vos elegís el golpe.', 'Pensá antes de pegar.'], p.nombre);
      let ok = 0;
      for (const j of C.padel) {
        const r = await Dialog.ask(j.q, j.a, p.nombre);
        if (r === j.ok) { ok++; AUDIO.sfx('pong'); await Dialog.run([j.si], p.nombre); } else { AUDIO.sfx('bump'); await Dialog.run([j.no], p.nombre); }
      }
      if (ok >= 3) { save.wins.padel = 1; persist(); AUDIO.sfx('win'); await Dialog.run([`${ok} de ${C.padel.length}. Táctica pura. Ya podés jugar en el CIT.`], p.nombre); }
      else { AUDIO.sfx('lose'); await Dialog.run([`${ok} de ${C.padel.length}. Volvé a pensar y volvé a jugar.`], p.nombre); }
    }
    async trivia(p) {
      let ok = 0;
      for (const q of C.trivia) { const r = await Dialog.ask(q.q, q.a, p.nombre); if (r === q.ok) ok++; }
      const won = ok >= Math.ceil(C.trivia.length * 0.6);
      if (won) { save.wins.trivia = 1; persist(); AUDIO.sfx('win'); await Dialog.run([`${ok} de ${C.trivia.length}. Sabía que las tenías claras.`], p.nombre); }
      else { AUDIO.sfx('lose'); await Dialog.run([`${ok} de ${C.trivia.length}. Pensalo un poco más y volvé.`], p.nombre); }
    }
    async logica(p) {
      const arrows = { up: '▲', down: '▼', left: '◀', right: '▶' }, dirs = Object.keys(arrows);
      await Dialog.run(['Te muestro una secuencia. Repetila con la cruceta.', 'Cada ronda es más larga. Sin apuro: pensá.'], p.nombre);
      for (let r = 0; r < C.logica.rondas; r++) {
        const seq = Array.from({ length: C.logica.largoInicial + r }, () => dirs[(Math.random() * 4) | 0]);
        await Dialog.run([`Ronda ${r + 1}:  ${seq.map((d) => arrows[d]).join('  ')}`], p.nombre);
        const got = await this.readSequence(seq.length, arrows);
        if (got.join() !== seq.join()) { AUDIO.sfx('lose'); await Dialog.run([`Era ${seq.map((d) => arrows[d]).join(' ')}. Volvé cuando quieras.`], p.nombre); return; }
      }
      save.wins.logica = 1; persist(); AUDIO.sfx('win');
      await Dialog.run(['Ahí está. Lógica, paciencia y memoria. Sos vos.'], p.nombre);
    }
    readSequence(n, arrows) {
      return new Promise((res) => {
        const got = []; dlgEl.classList.add('show');
        const draw = () => { dlgEl.innerHTML = `<div class="name">Tu turno</div><div>${got.map((d) => arrows[d]).join('  ')}<span style="opacity:.4">${'  ·'.repeat(n - got.length)}</span></div>`; };
        draw();
        const h = () => {
          for (const d of Object.keys(arrows)) if (justPressed(d)) { got.push(d); draw(); }
          snapshotKeys();
          if (got.length >= n) { this.events.off('update', h); setTimeout(() => { dlgEl.classList.remove('show'); dlgEl.innerHTML = ''; res(got); }, 350); }
        };
        snapshotKeys(); this.events.on('update', h);
      });
    }
    async menu() {
      const talked = DATA.personajes.filter((q) => q.tipo === 'npc' && save.talked[q.id]).length;
      const total = DATA.personajes.filter((q) => q.tipo === 'npc').length;
      const lugares = Object.values(MAPS.mundos).reduce((n, w) => n + (w.edificios || []).filter((e) => e.texto && e.texto.length).length, 0), leidos = Object.keys(save.read || {}).length;
      const trof = (save.items || []).length ? `\nTrofeos: ${(save.items || []).join(', ')}` : '';
      const nx = this.chainStep(this.chainIdx());
      const sig = nx ? `Siguiente: ${nx[0] === 'lugar' ? 'ver ' : 'hablar con '}${this.stepName(nx)}` : 'Siguiente: buscar la puerta';
      const ins = ['escudo_palabra', 'reflejos', 'evolucion'].map((k) => (save.powers.includes(k) ? '◉' : '○')).join(' ');
      const opts = ['Seguir', 'Tesorodex', 'Viajar a...', 'Guardar'].concat(this.worldId === 'mundo4' ? ['Jugar con Toto'] : []).concat(['Volver al título', 'Reiniciar todo']);
      const r0 = await Dialog.ask(`${sig}\nTesoros ${talked}/${total} · Lugares ${leidos}/${lugares}\nInsignias ${ins}${trof}`, opts);
      const name = opts[r0];
      if (name === 'Tesorodex') { showDex(this); return; }
      if (name === 'Guardar') { persist(); AUDIO.sfx('treasure'); await Dialog.run(['Partida guardada.']); return; }
      if (name === 'Jugar con Toto') { await this.totoJuego(); return; }
      const r = { 'Seguir': 0, 'Viajar a...': 1, 'Volver al título': 2, 'Reiniciar todo': 3 }[name];
      if (r === 1) {
        const order = MAPS.orden, maxI = order.indexOf(save.maxWorld || 'mundo1');
        const opts = order.slice(0, maxI + 1).map((w) => MAPS.mundos[w].nombre).concat(['Cancelar']);
        const w = await Dialog.ask('¿A dónde?', opts);
        if (w < opts.length - 1 && order[w] !== this.worldId) this.travel(order[w]);
        return;
      }
      if (r === 2) this.scene.start('Title');
      if (r === 3) { const ok = await Dialog.ask('Se borra todo el progreso. ¿Seguro?', ['No', 'Sí, reiniciar']); if (ok === 1) { resetSave(); this.scene.start('Title'); } }
    }
    async finale(p) {
      const total = DATA.personajes.filter((q) => q.tipo === 'npc' && q.id !== p.id).length;
      const got = DATA.personajes.filter((q) => q.tipo === 'npc' && q.id !== p.id && save.talked[q.id]).length;
      if (got < total) {
        const r = await Dialog.ask(`Te faltan ${total - got} tesoros por juntar.`, ['Volver a buscarlos', 'Ver el final igual'], p.nombre);
        if (r === 0) return;
      }
      await Dialog.run(C.final.gaby, p.nombre);
      save.finished = true; persist();
    }
  }

  /* ---------- Ping-pong (vs Brian) ---------- */
  class Pong extends Phaser.Scene {
    constructor() { super('Pong'); }
    init(d) { this.onDone = d.onDone; }
    create() {
      const g = this.add.graphics(); const S = SCALE; g.fillStyle(0x2f6b3a).fillRect(0, 0, VW, VH); g.fillStyle(0xffffff).fillRect(0, VH / 2 - S, VW, 2 * S); g.lineStyle(2 * S, 0xffffff).strokeRect(20 * S, 20 * S, VW - 40 * S, VH - 40 * S);
      this.me = this.add.rectangle(VW / 2, VH - 34 * S, 44 * S, 6 * S, 0xc8102e); this.ai = this.add.rectangle(VW / 2, 34 * S, 44 * S, 6 * S, 0x4a90d9);
      this.ball = this.add.rectangle(VW / 2, VH / 2, 6 * S, 6 * S, 0xffffff);
      this.add.sprite(VW - 40 * S, 40 * S, 'NPC_BRIAN', 0).setScale(SPR); this.add.sprite(40 * S, VH - 40 * S, 'PC_MATI', 9).setScale(SPR);
      this.s = [0, 0]; this.txt = this.add.text(VW / 2, VH / 2 - 14 * S, '0 - 0', { fontFamily: '"Press Start 2P"', fontSize: FS(10), color: '#fff' }).setOrigin(0.5);
      this.fast = save.powers.includes('reflejos');
      this.serve(1); this.done = false;
      this.add.text(VW / 2, VH - 12 * SCALE, 'Primero a 3', { fontFamily: '"Press Start 2P"', fontSize: FS(7), color: '#e0f8d0' }).setOrigin(0.5);
    }
    serve(dir) { this.ball.setPosition(VW / 2, VH / 2); this.vx = (Math.random() < 0.5 ? -1 : 1) * 1.6 * SCALE; this.vy = dir * 2.4 * SCALE; }
    update() {
      if (this.done) { snapshotKeys(); return; }
      const sp = 3.2 * SCALE * (this.fast ? 1.35 : 1);
      if (keys.left) this.me.x -= sp; if (keys.right) this.me.x += sp;
      this.me.x = Phaser.Math.Clamp(this.me.x, 42 * SCALE, VW - 42 * SCALE);
      this.ai.x += Phaser.Math.Clamp(this.ball.x - this.ai.x, -2.2 * SCALE, 2.2 * SCALE) * (Math.random() < 0.88 ? 1 : 0);
      const b = this.ball; b.x += this.vx; b.y += this.vy;
      if (b.x < 24 * SCALE || b.x > VW - 24 * SCALE) this.vx *= -1;
      const hit = (pad) => Math.abs(b.x - pad.x) < 25 * SCALE && Math.abs(b.y - pad.y) < 6 * SCALE;
      if (hit(this.me) && this.vy > 0) { AUDIO.sfx('pong'); this.vy *= -1.06; this.vx += (b.x - this.me.x) / (12 * SCALE) * SCALE; }
      if (hit(this.ai) && this.vy < 0) { AUDIO.sfx('pong'); this.vy *= -1.06; this.vx += (b.x - this.ai.x) / (12 * SCALE) * SCALE; }
      this.vx = Phaser.Math.Clamp(this.vx, -4 * SCALE, 4 * SCALE); this.vy = Phaser.Math.Clamp(this.vy, -5 * SCALE, 5 * SCALE);
      if (b.y > VH - 20 * SCALE) { this.s[1]++; this.point(-1); } else if (b.y < 20 * SCALE) { this.s[0]++; this.point(1); }
      if (justPressed('B')) this.end(false);
      snapshotKeys();
    }
    point(dir) {
      this.txt.setText(`${this.s[0]} - ${this.s[1]}`);
      if (this.s[0] >= 3) return this.end(true); if (this.s[1] >= 3) return this.end(false);
      this.serve(dir);
    }
    end(won) { this.done = true; this.txt.setText(won ? '¡GANASTE!' : 'Perdiste'); this.time.delayedCall(900, () => this.onDone(won)); }
  }

  /* ---------- Fútbol en el campito (penales vs Cañete) ---------- */
  class Futbol extends Phaser.Scene {
    constructor() { super('Futbol'); }
    init(d) { this.onDone = d.onDone; }
    create() {
      const S = SCALE;
      const g = this.add.graphics(); g.fillStyle(0x6fae5e).fillRect(0, 0, VW, VH);
      for (let y = 0; y < VH; y += 16 * S) g.fillStyle(0x66a356).fillRect(0, y, VW, 8 * S);
      // arco
      const gw = VW * 0.6, gx = (VW - gw) / 2, gy = VH * 0.18, gh = VH * 0.30;
      g.fillStyle(0xf4f4ec).fillRect(gx, gy, 4 * S, gh).fillRect(gx + gw - 4 * S, gy, 4 * S, gh).fillRect(gx, gy, gw, 4 * S);
      g.lineStyle(1 * S, 0xe8f3d8, 0.5); for (let i = 1; i < 6; i++) g.lineBetween(gx + gw * i / 6, gy, gx + gw * i / 6, gy + gh); for (let i = 1; i < 4; i++) g.lineBetween(gx, gy + gh * i / 4, gx + gw, gy + gh * i / 4);
      this.zones = [gx + gw * 0.17, gx + gw * 0.5, gx + gw * 0.83]; this.gy = gy + gh * 0.55;
      this.keeper = this.add.sprite(this.zones[1], gy + gh, 'NPC_CANETE', 0).setOrigin(0.5, 1).setScale(SPR);
      this.me = this.add.sprite(VW / 2, VH - 30 * S, 'PC_MATI', 9).setOrigin(0.5, 1).setScale(SPR);
      this.ball = this.add.circle(VW / 2, VH - 26 * S, 5 * S, 0xffffff).setStrokeStyle(1.5 * S, 0x222222);
      this.txt = this.add.text(VW / 2, 12 * S, '', { fontFamily: '"Press Start 2P"', fontSize: FS(8), color: '#fff' }).setOrigin(0.5);
      this.hint = this.add.text(VW / 2, VH - 8 * S, TV ? '◀ ▼ ▶ elegí el palo · Z patea' : '◀ ▼ ▶ elegí el palo · A patea', { fontFamily: '"Press Start 2P"', fontSize: FS(6), color: '#e0f8d0' }).setOrigin(0.5, 1);
      this.sel = 1; this.shot = 0; this.goals = 0; this.done = false; this.anim = false; this.cursor = this.add.text(this.zones[1], gy + gh + 6 * S, '▲', { fontFamily: '"Press Start 2P"', fontSize: FS(8), color: '#f2d94e' }).setOrigin(0.5, 0);
      this.status();
    }
    status() { this.txt.setText(`Penales ${this.shot}/5   Goles ${this.goals}`); }
    update() {
      if (this.done || this.anim) { snapshotKeys(); return; }
      if (justPressed('left')) this.sel = 0; if (justPressed('down')) this.sel = 1; if (justPressed('right')) this.sel = 2;
      this.cursor.x = this.zones[this.sel];
      if (justPressed('A')) this.kick();
      if (justPressed('B')) this.end(false);
      snapshotKeys();
    }
    kick() {
      this.anim = true; const S = SCALE, dive = (Math.random() * 3) | 0;
      const reflejos = save.powers.includes('reflejos'); // con Reflejos, Cañete adivina menos
      const guess = reflejos && Math.random() < 0.35 ? (dive + 1) % 3 : dive;
      AUDIO.sfx('pong');
      this.tweens.add({ targets: this.keeper, x: this.zones[guess], duration: 380, ease: 'Quad.easeOut' });
      this.tweens.add({ targets: this.ball, x: this.zones[this.sel], y: this.gy, duration: 420, ease: 'Quad.easeOut', onComplete: () => {
        const goal = guess !== this.sel; this.shot++; if (goal) { this.goals++; AUDIO.sfx('treasure'); } else AUDIO.sfx('bump');
        this.txt.setText(goal ? '¡GOOOL!' : 'Atajó.');
        this.time.delayedCall(700, () => {
          this.ball.setPosition(VW / 2, VH - 26 * S); this.keeper.x = this.zones[1]; this.status(); this.anim = false;
          if (this.shot >= 5 || this.goals >= 3 || this.shot - this.goals >= 3) this.end(this.goals >= 3);
        });
      } });
    }
    end(won) { this.done = true; this.txt.setText(won ? '¡GANASTE!' : 'Perdiste'); this.time.delayedCall(900, () => this.onDone(won)); }
  }

  /* ---------- Pelotita con Toto: barra de fuerza, la pelota tiene que caer en la zona ---------- */
  class Pelotita extends Phaser.Scene {
    constructor() { super('Pelotita'); }
    init(d) { this.onDone = d.onDone; }
    create() {
      const S = SCALE; const g = this.add.graphics();
      g.fillStyle(0x6fae5e).fillRect(0, 0, VW, VH); for (let y = 0; y < VH; y += 16 * S) g.fillStyle(0x66a356).fillRect(0, y, VW, 8 * S);
      g.fillStyle(0x9fe0c8).fillRect(0, 0, VW, 26 * S); g.fillStyle(0x6fbfa3).fillRect(0, 26 * S, VW, 3 * S); // pared de la casa
      this.groundY = VH * 0.62;
      this.me = this.add.sprite(40 * S, this.groundY, 'PC_MATI', 6).setOrigin(0.5, 1).setScale(SPR);
      this.toto = this.add.sprite(70 * S, this.groundY + 2 * S, 'PET_TOTO', 6).setOrigin(0.5, 1).setScale(SPR);
      this.zone = this.add.ellipse(0, this.groundY, 60 * S, 16 * S, 0xf2d94e, 0.35).setStrokeStyle(2 * S, 0xf2d94e);
      this.ball = this.add.circle(this.me.x + 10 * S, this.groundY - 24 * S, 4 * S, 0xffffff).setStrokeStyle(1.5 * S, 0x222222);
      this.barBg = this.add.rectangle(VW / 2, VH - 40 * S, 160 * S, 10 * S, 0x0f380f).setStrokeStyle(2 * S, 0xe0f8d0);
      this.bar = this.add.rectangle(VW / 2 - 80 * S, VH - 40 * S, 0, 8 * S, 0x9bbc0f).setOrigin(0, 0.5);
      this.txt = this.add.text(VW / 2, 12 * S, '', { fontFamily: '"Press Start 2P"', fontSize: FS(8), color: '#0f380f' }).setOrigin(0.5);
      this.hint = this.add.text(VW / 2, VH - 20 * S, TV ? 'Z: cargar y soltar' : 'A: cargar y soltar', { fontFamily: '"Press Start 2P"', fontSize: FS(6), color: '#e0f8d0' }).setOrigin(0.5);
      this.round = 0; this.hits = 0; this.state = 'idle'; this.power = 0; this.dirp = 1; this.done = false;
      this.newTarget(); this.status();
    }
    newTarget() { const S = SCALE; this.target = Phaser.Math.Between(VW * 0.45, VW - 40 * S); this.zone.x = this.target; }
    status() { this.txt.setText(`Tiro ${Math.min(this.round + 1, 3)}/3   Atrapadas ${this.hits}`); }
    update(t, dt) {
      if (this.done) { snapshotKeys(); return; }
      const S = SCALE;
      if (this.state === 'idle' && justPressed('A')) { this.state = 'charge'; this.power = 0; this.dirp = 1; }
      else if (this.state === 'charge') {
        this.power += this.dirp * dt / 900; if (this.power >= 1) { this.power = 1; this.dirp = -1; } if (this.power <= 0) { this.power = 0; this.dirp = 1; }
        this.bar.width = 160 * S * this.power;
        if (justPressed('A')) this.throwBall();
      }
      if (justPressed('B')) this.end(false);
      snapshotKeys();
    }
    throwBall() {
      const S = SCALE; this.state = 'fly';
      const land = this.me.x + 20 * S + this.power * (VW - this.me.x - 40 * S);
      const mid = (this.ball.x + land) / 2;
      this.tweens.add({ targets: this.ball, x: land, duration: 700, ease: 'Linear' });
      this.tweens.add({ targets: this.ball, y: this.groundY - 70 * S, duration: 350, ease: 'Quad.easeOut', yoyo: true, onComplete: () => {
        this.ball.y = this.groundY - 4 * S;
        this.toto.play('PET_TOTO_right', true);
        this.tweens.add({ targets: this.toto, x: land - 12 * S, duration: 300 + Math.abs(land - this.toto.x) * 1.2 / S, onComplete: () => {
          const ok = Math.abs(land - this.target) < 32 * S; this.toto.anims.stop(); this.toto.setFrame(0);
          if (ok) { this.hits++; AUDIO.sfx('bark'); this.txt.setText('¡La atrapó!'); } else { AUDIO.sfx('bump'); this.txt.setText(land < this.target - 32 * S ? 'Corta...' : 'Muy larga...'); }
          this.time.delayedCall(800, () => {
            this.round++;
            if (this.round >= 3) return this.end(this.hits >= 2);
            this.toto.setFrame(6); this.tweens.add({ targets: this.toto, x: 70 * S, duration: 400 }); this.ball.setPosition(this.me.x + 10 * S, this.groundY - 24 * S); this.bar.width = 0; this.newTarget(); this.status(); this.state = 'idle';
          });
        } });
      } });
    }
    end(won) { this.done = true; this.txt.setText(won ? '¡GANASTE!' : 'Otra vez será'); this.time.delayedCall(900, () => this.onDone(won)); }
  }

  /* ---------- Construir la casa: apilar pisos (stack) ---------- */
  class Construir extends Phaser.Scene {
    constructor() { super('Construir'); }
    init(d) { this.onDone = d.onDone; }
    create() {
      const S = SCALE; const g = this.add.graphics();
      g.fillStyle(0x3b3f5c).fillRect(0, 0, VW, VH); g.fillStyle(0x2a2d45).fillRect(0, VH - 30 * S, VW, 30 * S); g.fillStyle(0x8a8fd1).fillRect(0, VH - 32 * S, VW, 3 * S);
      this.txt = this.add.text(VW / 2, 12 * S, '', { fontFamily: '"Press Start 2P"', fontSize: FS(8), color: '#e0f8d0' }).setOrigin(0.5);
      this.add.text(VW / 2, VH - 12 * S, TV ? 'Z: soltar el piso' : 'A: soltar el piso', { fontFamily: '"Press Start 2P"', fontSize: FS(6), color: '#e0f8d0' }).setOrigin(0.5);
      this.h = 22 * S; this.floors = []; this.baseY = VH - 32 * S; this.level = 0; this.total = 4; this.done = false;
      this.cur = { x: VW / 2, w: 110 * S, dir: 1, speed: 2.2 * S };
      const base = this.add.rectangle(VW / 2, this.baseY - this.h / 2, 110 * S, this.h, 0x9fe0c8).setStrokeStyle(2 * S, 0x6fbfa3);
      this.floors.push({ x: VW / 2, w: 110 * S, r: base }); this.decorate(base, 0);
      this.moving = this.add.rectangle(this.cur.x, this.baseY - this.h * 1.5, this.cur.w, this.h, 0xd8f5e9).setStrokeStyle(2 * S, 0x6fbfa3);
      this.status();
    }
    decorate(r, lvl) {
      const S = SCALE; const n = Math.max(1, Math.floor(r.width / (28 * S)));
      for (let i = 0; i < n; i++) this.add.rectangle(r.x - r.width / 2 + (i + 0.5) * (r.width / n), r.y, 8 * S, 9 * S, lvl % 2 ? 0xf6e7a8 : 0xcfe8f7).setStrokeStyle(1 * S, 0x3a3a3a);
      if (lvl === 0) this.add.rectangle(r.x, r.y + 4 * S, 10 * S, 12 * S, 0x5a3a1e);
    }
    status() { this.txt.setText(this.level < this.total ? `Piso ${this.level + 1} de ${this.total}` : 'Terraza'); }
    update() {
      if (this.done) { snapshotKeys(); return; }
      const S = SCALE; const c = this.cur;
      c.x += c.dir * c.speed; if (c.x - c.w / 2 < 10 * S || c.x + c.w / 2 > VW - 10 * S) c.dir *= -1;
      this.moving.x = c.x;
      if (justPressed('A')) this.drop();
      if (justPressed('B')) this.end(false);
      snapshotKeys();
    }
    drop() {
      const S = SCALE; const top = this.floors[this.floors.length - 1]; const c = this.cur;
      const left = Math.max(c.x - c.w / 2, top.x - top.w / 2), right = Math.min(c.x + c.w / 2, top.x + top.w / 2);
      const w = right - left;
      if (w <= 8 * S) { AUDIO.sfx('lose'); this.moving.setFillStyle(0xc8102e); return this.end(false); }
      const y = this.baseY - this.h * (this.floors.length + 0.5);
      const isTerrace = this.level + 1 > this.total;
      const r = this.add.rectangle((left + right) / 2, y, w, this.h, isTerrace ? 0xd8f5e9 : 0x9fe0c8).setStrokeStyle(2 * S, 0x6fbfa3);
      if (isTerrace) { for (let x = left + 4 * S; x < right - 2 * S; x += 6 * S) this.add.rectangle(x, y - this.h / 2 - 3 * S, 1.5 * S, 6 * S, 0x6fbfa3); this.add.rectangle((left + right) / 2, y - this.h / 2 - 6 * S, w - 6 * S, 1.5 * S, 0x6fbfa3); }
      else this.decorate(r, this.level + 1);
      this.floors.push({ x: (left + right) / 2, w, r }); AUDIO.sfx('pong');
      this.level++; this.cur = { x: 10 * S + w / 2, w, dir: 1, speed: (2.2 + this.level * 0.5) * S };
      this.moving.width = w; this.moving.y = this.baseY - this.h * (this.floors.length + 0.5);
      if (isTerrace) return this.end(true);
      this.status();
    }
    end(won) { this.done = true; this.moving.setVisible(false); this.txt.setText(won ? '¡CASA CONSTRUIDA!' : 'Se cayó...'); this.time.delayedCall(1000, () => this.onDone(won)); }
  }

  /* ---------- Foto grupal final (DOM) ---------- */
  function showPhoto(scene) {
    const el = document.getElementById('photo');
    const people = DATA.personajes.filter((p) => p.id !== 'PC_MATI');
    el.innerHTML = `<h1>${C.final.fotoTitulo}</h1><div class="hint">${TV ? 'Flechas: elegir · Z: leer · X: volver' : '◀▶▲▼ elegir · A leer · B volver'}</div><div class="grid"></div><div class="msg">Todos acá. Por vos.</div><div class="row"><button class="back">Volver al mapa</button><button class="credits">Créditos</button></div>`;
    el.querySelector('.back').onclick = () => { el.classList.remove('show'); AUDIO.play(scene.worldId); };
    el.querySelector('.credits').onclick = () => showCredits(el);
    const grid = el.querySelector('.grid'), msg = el.querySelector('.msg');
    const all = [DATA.personajes.find((p) => p.id === 'PC_MATI'), ...people];
    all.forEach((p) => {
      const fw = p.sprite.frameWidth * 3, fh = p.sprite.frameHeight * 3;
      const hd = p.sprite.file.replace('sprites/', 'sprites_hd/').replace('sprite_', 'sprite_hd_');
      const b = document.createElement('button'); b.title = p.nombre;
      const d = document.createElement('div'); d.className = 'spr';
      d.style.cssText = `width:${fw}px;height:${fh}px;background:url(${hd}) 0 0 no-repeat;`;
      b.appendChild(d);
      b.onclick = () => {
        const dl = p.dialogos;
        msg.textContent = `${p.nombre}\n\n` + (dl.mensajeFuturo ? dl.mensajeFuturo : (dl.cualidad || dl.anecdota || dl.saludo || ''));
        grid.querySelectorAll('button').forEach((x) => x.classList.toggle('sel', x === b));
      };
      grid.appendChild(b);
    });
    // escala cada sprite al ancho de su celda
    requestAnimationFrame(() => { const cw = grid.querySelector('button').clientWidth; grid.querySelectorAll('.spr').forEach((d) => { d.style.transform = `scale(${cw / 192})`; }); });
    el.classList.add('show');
    // navegación con cruceta / teclado
    const btns = () => Array.from(grid.querySelectorAll('button')); let sel = 0; const cols = 10;
    const focus = () => { btns().forEach((b, i) => b.classList.toggle('sel', i === sel)); btns()[sel].scrollIntoView({ block: 'nearest' }); };
    focus();
    const h = () => {
      if (!el.classList.contains('show')) return;
      const n = btns().length;
      if (justPressed('left')) sel = (sel + n - 1) % n; if (justPressed('right')) sel = (sel + 1) % n;
      if (justPressed('up')) sel = (sel - cols + n) % n; if (justPressed('down')) sel = (sel + cols) % n;
      if (justPressed('left') || justPressed('right') || justPressed('up') || justPressed('down')) focus();
      if (justPressed('A')) btns()[sel].click();
      if (justPressed('B')) { el.querySelector('.back').click(); scene.events.off('update', h); }
      snapshotKeys();
    };
    scene.events.on('update', h);
    const oldBack = el.querySelector('.back').onclick; el.querySelector('.back').onclick = () => { scene.events.off('update', h); oldBack(); };
  }

  function showZone(name) {
    const z = document.getElementById('zona'); if (!z) return;
    z.textContent = name; z.classList.remove('show'); void z.offsetWidth; z.classList.add('show');
    setTimeout(() => z.classList.remove('show'), 2600);
  }
  function showDex(scene) {
    const el = document.getElementById('photo');
    const all = DATA.personajes.filter((p) => p.id !== 'PC_MATI');
    const met = all.filter((p) => save.talked[p.id]).length;
    el.innerHTML = `<h1>Tesorodex · ${met}/${all.length}</h1><div class="hint">${TV ? 'Flechas: elegir · Z: leer · X: volver' : '◀▶▲▼ elegir · A leer · B volver'}</div><div class="grid"></div><div class="msg">Elegí a alguien.</div><div class="row"><button class="back">Volver</button></div>`;
    const grid = el.querySelector('.grid'), msg = el.querySelector('.msg');
    all.forEach((p) => {
      const fw = p.sprite.frameWidth * 3, fh = p.sprite.frameHeight * 3;
      const hd = p.sprite.file.replace('sprites/', 'sprites_hd/').replace('sprite_', 'sprite_hd_');
      const known = !!save.talked[p.id] || p.id === 'PET_TOTO';
      const b = document.createElement('button'); b.title = known ? p.nombre : '???';
      const d = document.createElement('div'); d.className = 'spr'; d.style.cssText = `width:${fw}px;height:${fh}px;background:url(${hd}) 0 0 no-repeat;${known ? '' : 'filter:brightness(0) opacity(.55);'}`;
      b.appendChild(d);
      b.onclick = () => {
        grid.querySelectorAll('button').forEach((x) => x.classList.toggle('sel', x === b));
        if (!known) { msg.textContent = '???\n\nTodavía no hablaste con esta persona.'; return; }
        const dl = p.dialogos;
        msg.textContent = `${p.nombre} · ${p.rol}\n\n` + ([dl.anecdota, dl.cualidad].filter(Boolean).join('\n\n') || dl.saludo);
      };
      grid.appendChild(b);
    });
    requestAnimationFrame(() => { const cw = grid.querySelector('button').clientWidth; grid.querySelectorAll('.spr').forEach((d) => { d.style.transform = `scale(${cw / 192})`; }); });
    el.classList.add('show');
    const btns = () => Array.from(grid.querySelectorAll('button')); let sel = 0; const cols = 10;
    const focus = () => { btns().forEach((b, i) => b.classList.toggle('sel', i === sel)); btns()[sel].scrollIntoView({ block: 'nearest' }); };
    focus();
    const close = () => { scene.events.off('update', h); el.classList.remove('show'); };
    const h = () => {
      if (!el.classList.contains('show')) return;
      const n = btns().length;
      if (justPressed('left')) sel = (sel + n - 1) % n; if (justPressed('right')) sel = (sel + 1) % n;
      if (justPressed('up')) sel = (sel - cols + n) % n; if (justPressed('down')) sel = (sel + cols) % n;
      if (justPressed('left') || justPressed('right') || justPressed('up') || justPressed('down')) focus();
      if (justPressed('A')) btns()[sel].click();
      if (justPressed('B')) close();
      snapshotKeys();
    };
    scene.events.on('update', h); el.querySelector('.back').onclick = close;
  }
  function showCredits(photoEl) {
    const cr = document.getElementById('credits');
    const names = DATA.personajes.filter((p) => p.tipo === 'npc').map((p) => `<div class="n">${p.nombre}<span>${p.rol}</span></div>`).join('');
    cr.innerHTML = `<div class="roll"><h2>${C.titulo}</h2><p>${C.subtitulo}</p><p class="s">${C.creditos.intro}</p>${names}<div class="n">Toto<span>Mascota acompañante</span></div><p class="s">${C.creditos.cierre}</p><p class="big">${C.creditos.final}</p><button class="back">Volver</button></div>`;
    cr.classList.add('show'); photoEl.classList.remove('show');
    cr.querySelector('.back').onclick = () => { cr.classList.remove('show'); photoEl.classList.add('show'); };
  }

  /* ---------- Arranque ---------- */
  const fontReady = document.fonts && document.fonts.load ? document.fonts.load('8px "Press Start 2P"').catch(() => null) : Promise.resolve();
  Promise.race([fontReady, new Promise((r) => setTimeout(r, 1500))]).then(() => {
    window.MQ = { save, Dialog, keys }; window.MQ.game = new Phaser.Game({
      type: Phaser.CANVAS, parent: 'screen', width: VW, height: VH, pixelArt: true, roundPixels: true,
      backgroundColor: '#8bac0f', scale: TV ? { mode: Phaser.Scale.NONE, zoom: 1 } : { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [Boot, Title, World, Pong, Futbol, Pelotita, Construir],
    });
  });
})();
