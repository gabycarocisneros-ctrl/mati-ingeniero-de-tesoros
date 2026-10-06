/* Chiptune Game Boy style: 2 canales cuadrados + triángulo + ruido. Sin archivos de audio. */
window.MQ_AUDIO = (function () {
  let ctx = null, master = null, muted = false, current = null, timer = null, unlocked = false;
  const BPM = { title: 128, mundo1: 104, mundo2: 150, mundo3: 118, mundo4: 78, final: 96 };
  const N = (n) => { // "C4" -> Hz, "-" -> silencio
    if (n === '-' || n == null) return 0;
    const m = /^([A-G])(#?)(\d)$/.exec(n); const idx = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] ? 1 : 0);
    return 440 * Math.pow(2, (idx + (parseInt(m[3]) + 1) * 12 - 69) / 12);
  };
  // Cada canción: canales con secuencia de [nota, pasos] (1 paso = corchea)
  const S = (s) => s.trim().split(/\s+/).map((t) => { const [n, d] = t.split(':'); return [n, d ? parseInt(d) : 1]; });
  const SONGS = {
    title: {
      lead: S('C5:2 E5:2 G5:2 E5:1 C5:1 D5:2 F5:2 A5:2 F5:1 D5:1 E5:2 G5:2 C6:3 B5:1 A5:2 G5:2 E5:4 F5:2 A5:2 G5:2 E5:1 D5:1 C5:6 -:2'),
      harm: S('E4:2 G4:2 C5:2 G4:2 F4:2 A4:2 C5:2 A4:2 G4:2 B4:2 E5:3 D5:1 C5:2 B4:2 G4:4 A4:2 C5:2 B4:2 G4:2 E4:6 -:2'),
      bass: S('C3:1 C3:1 G2:1 C3:1 C3:1 C3:1 G2:1 C3:1 F2:1 F2:1 C3:1 F2:1 F2:1 F2:1 C3:1 F2:1 G2:1 G2:1 D3:1 G2:1 G2:1 G2:1 D3:1 G2:1 F2:1 F2:1 C3:1 F2:1 C3:1 C3:1 G2:1 C3:1'),
      drum: S('K:1 -:1 H:1 -:1 S:1 -:1 H:1 -:1 K:1 -:1 H:1 -:1 S:1 -:1 H:1 H:1 K:1 -:1 H:1 -:1 S:1 -:1 H:1 -:1 K:1 -:1 H:1 -:1 S:1 -:1 S:1 S:1'),
    },
    mundo1: { // Pueblo Origen: cálido
      lead: S('F4:2 A4:2 C5:3 A4:1 G4:2 F4:2 E4:4 D4:2 F4:2 A4:3 G4:1 F4:2 E4:2 C4:4 F4:2 A4:2 C5:3 D5:1 C5:2 A4:2 G4:4 A4:2 G4:2 F4:3 E4:1 F4:6 -:2'),
      harm: S('-:8 -:8 -:8 -:8 A3:2 C4:2 F4:4 E4:2 C4:2 E4:4 F4:2 E4:2 D4:4 C4:2 A3:2 C4:6 -:2'),
      bass: S('F2:2 C3:2 F2:2 C3:2 C2:2 G2:2 C2:2 G2:2 D2:2 A2:2 D2:2 A2:2 C2:2 G2:2 C2:2 G2:2 F2:2 C3:2 F2:2 C3:2 G2:2 D3:2 G2:2 D3:2 A2:2 E3:2 F2:2 C3:2 F2:4 F2:4'),
      drum: S('K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 H:2 K:2 H:2 S:2 S:2'),
    },
    mundo2: { // Estadio: rápido
      lead: S('E5:1 E5:1 G5:1 E5:1 D5:1 E5:2 B4:1 E5:1 E5:1 G5:1 A5:1 G5:1 E5:2 D5:1 C5:1 C5:1 E5:1 C5:1 B4:1 C5:2 G4:1 B4:1 B4:1 D5:1 B4:1 A4:1 B4:3 -:1'),
      harm: S('B4:1 B4:1 E5:1 B4:1 B4:1 B4:2 G4:1 B4:1 B4:1 E5:1 E5:1 E5:1 B4:2 B4:1 A4:1 A4:1 C5:1 A4:1 G4:1 A4:2 E4:1 G4:1 G4:1 B4:1 G4:1 F4:1 G4:3 -:1'),
      bass: S('E2:1 E2:1 E3:1 E2:1 E2:1 E3:1 E2:1 E3:1 E2:1 E2:1 E3:1 E2:1 E2:1 E3:1 E2:1 E3:1 A2:1 A2:1 A3:1 A2:1 A2:1 A3:1 A2:1 A3:1 B2:1 B2:1 B3:1 B2:1 B2:1 B3:1 B2:1 B3:1'),
      drum: S('K:1 H:1 S:1 H:1 K:1 H:1 S:1 H:1 K:1 H:1 S:1 H:1 K:1 K:1 S:1 H:1 K:1 H:1 S:1 H:1 K:1 H:1 S:1 H:1 K:1 H:1 S:1 S:1 K:1 S:1 S:1 S:1'),
    },
    mundo3: { // Embajada: aire español (frigio)
      lead: S('E5:2 F5:1 E5:1 D5:2 C5:2 B4:2 C5:1 D5:1 E5:4 F5:2 E5:1 D5:1 C5:2 B4:2 A4:2 B4:1 C5:1 B4:4 E5:2 F5:1 G5:1 F5:2 E5:2 D5:2 C5:1 B4:1 C5:4 D5:2 C5:1 B4:1 A4:2 G4:2 F4:2 G4:1 F4:1 E4:4'),
      harm: S('C5:2 D5:1 C5:1 B4:2 A4:2 G4:2 A4:1 B4:1 C5:4 D5:2 C5:1 B4:1 A4:2 G4:2 F4:2 G4:1 A4:1 G4:4 C5:2 D5:1 E5:1 D5:2 C5:2 B4:2 A4:1 G4:1 A4:4 B4:2 A4:1 G4:1 F4:2 E4:2 D4:2 E4:1 D4:1 E4:4'),
      bass: S('E2:2 E3:2 E2:2 E3:2 F2:2 F3:2 F2:2 F3:2 E2:2 E3:2 E2:2 E3:2 D2:2 D3:2 D2:2 D3:2 E2:2 E3:2 E2:2 E3:2 F2:2 F3:2 F2:2 F3:2 G2:2 G3:2 F2:2 F3:2 E2:2 E3:2 E2:2 E3:2'),
      drum: S('K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:2 S:2 K:2 S:1 S:1 K:1 K:1 S:1 S:1'),
    },
    mundo4: { // Base Central: lento, emotivo
      lead: S('A4:4 C5:2 E5:2 D5:4 C5:2 B4:2 C5:4 A4:2 G4:2 A4:8 F4:4 A4:2 C5:2 B4:4 A4:2 G4:2 A4:4 G4:2 E4:2 E4:8'),
      harm: S('E4:4 A4:2 C5:2 A4:4 G4:2 G4:2 E4:4 E4:2 E4:2 E4:8 C4:4 F4:2 A4:2 G4:4 F4:2 E4:2 E4:4 D4:2 C4:2 B3:8'),
      bass: S('A2:4 A2:4 F2:4 F2:4 C3:4 C3:4 A2:4 A2:4 F2:4 F2:4 G2:4 G2:4 A2:4 A2:4 E2:4 E2:4'),
      drum: S('-:64'),
    },
    final: { // Foto: título, calmo
      lead: S('C5:4 E5:4 G5:4 E5:2 C5:2 D5:4 F5:4 A5:6 G5:2 E5:4 G5:4 C6:6 B5:2 A5:4 G5:4 E5:8 F5:4 A5:4 G5:4 E5:2 D5:2 C5:12 -:4'),
      harm: S('E4:4 G4:4 C5:4 G4:2 E4:2 F4:4 A4:4 C5:6 B4:2 G4:4 B4:4 E5:6 D5:2 C5:4 B4:4 G4:8 A4:4 C5:4 B4:4 G4:2 F4:2 E4:12 -:4'),
      bass: S('C3:8 C3:8 F2:8 F2:8 G2:8 G2:8 E2:8 E2:8 F2:8 F2:8 C3:8 C3:8 F2:8 G2:8 C3:8 C3:8'),
      drum: S('-:128'),
    },
  };
  const WAVE = { lead: 'square', harm: 'square', bass: 'triangle' };
  const GAIN = { lead: 0.09, harm: 0.05, bass: 0.13 };
  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination); return ctx;
  }
  function unlock() { if (unlocked) return; const c = ensure(); if (!c) return; if (c.state === 'suspended') c.resume(); unlocked = true; if (pending) { const s = pending; pending = null; play(s); } }
  let pending = null;
  function tone(freq, t, dur, type, gain, ch) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    if (ch === 'lead') { o.setPeriodicWave(pulse(0.25)); }
    g.gain.setValueAtTime(gain, t); g.gain.setValueAtTime(gain, t + dur * 0.7); g.gain.linearRampToValueAtTime(0.0001, t + dur * 0.95);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur);
  }
  let pulseWave = null;
  function pulse(duty) {
    if (pulseWave) return pulseWave;
    const n = 32, real = new Float32Array(n), imag = new Float32Array(n);
    for (let i = 1; i < n; i++) { real[i] = (2 / (i * Math.PI)) * Math.sin(i * Math.PI * duty); }
    pulseWave = ctx.createPeriodicWave(real, imag); return pulseWave;
  }
  function drum(kind, t) {
    if (kind === 'K') { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.12); g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14); o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.15); return; }
    const len = kind === 'S' ? 0.12 : 0.04, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    src.buffer = buf; f.type = 'highpass'; f.frequency.value = kind === 'S' ? 1800 : 6000; g.gain.value = kind === 'S' ? 0.12 : 0.05;
    src.connect(f); f.connect(g); g.connect(master); src.start(t);
  }
  function play(name) {
    if (!SONGS[name]) return;
    if (!unlocked) { pending = name; return; }
    stop(); ensure(); current = name;
    const song = SONGS[name], step = 60 / BPM[name] / 2; // corchea
    const pos = {}; const idx = {}; for (const ch in song) { pos[ch] = 0; idx[ch] = 0; }
    let base = ctx.currentTime + 0.05, cursor = 0; const len = Math.max(...Object.values(song).map((s) => s.reduce((a, n) => a + n[1], 0)));
    const schedule = () => {
      while (cursor < ctx.currentTime - base + 0.4) {
        for (const ch in song) {
          const seq = song[ch]; let off = 0; let k = 0;
          // encontrar nota que empieza en cursor (en pasos)
          const stepIdx = Math.round(cursor / step) % len; let acc = 0, found = null;
          for (const n of seq) { if (acc === stepIdx) { found = n; break; } acc += n[1]; if (acc > stepIdx) break; }
          if (found) {
            const t = base + cursor;
            if (ch === 'drum') { if (found[0] !== '-') drum(found[0], t); }
            else { const f = N(found[0]); if (f) tone(f, t, found[1] * step, WAVE[ch], GAIN[ch], ch); }
          }
        }
        cursor += step;
      }
    };
    schedule(); timer = setInterval(schedule, 120);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; current = null; }
  // Efectos
  function sfx(kind) {
    if (!unlocked || !ctx) return; const t = ctx.currentTime;
    const blip = (f1, f2, d, g = 0.08, type = 'square') => { const o = ctx.createOscillator(), gn = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f1, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d); gn.gain.setValueAtTime(g, t); gn.gain.exponentialRampToValueAtTime(0.001, t + d); o.connect(gn); gn.connect(master); o.start(t); o.stop(t + d + 0.01); };
    if (kind === 'text') blip(880, 0, 0.03, 0.03);
    if (kind === 'confirm') { blip(660, 0, 0.06); setTimeout(() => blip(990, 0, 0.08), 60); }
    if (kind === 'bump') blip(120, 80, 0.08, 0.06, 'triangle');
    if (kind === 'treasure') [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0, 0.14, 0.09), i * 90));
    if (kind === 'power') [392, 523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => blip(f, 0, 0.18, 0.09), i * 80));
    if (kind === 'door') blip(300, 900, 0.25, 0.07);
    if (kind === 'win') [523, 523, 523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0, 0.15, 0.09), i * 110));
    if (kind === 'lose') [392, 370, 349, 330].forEach((f, i) => setTimeout(() => blip(f, 0, 0.22, 0.08), i * 160));
    if (kind === 'bark') { blip(700, 400, 0.07, 0.1); setTimeout(() => blip(650, 380, 0.07, 0.1), 110); }
    if (kind === 'pong') blip(1200, 0, 0.04, 0.06);
  }
  function toggleMute() { muted = !muted; if (master) master.gain.value = muted ? 0 : 1; try { localStorage.setItem('mq_mute', muted ? '1' : '0'); } catch (e) { /* nada */ } return muted; }
  try { muted = localStorage.getItem('mq_mute') === '1'; } catch (e) { /* nada */ }
  return { play, stop, sfx, unlock, toggleMute, get muted() { return muted; }, get current() { return current; } };
})();
