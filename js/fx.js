/* fx.js — particles, petals, sparkles, music, rakhi art, toast */
window.FX = (() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GOLD = ["#f7d774", "#e9b949", "#c98a2d", "#fff3c9"];
  const FEST = ["#e2536f", "#f7b8cc", "#ffc9a3", "#c9aef0", "#f2cd7a", "#fff6ee"];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  /* ---------- one shared overlay canvas for bursts ---------- */
  let cv, cx, parts = [], rafId = 0;
  function ensureCanvas() {
    if (cv) return;
    cv = document.createElement("canvas");
    cv.id = "fx-burst";
    document.body.appendChild(cv);
    cx = cv.getContext("2d");
    const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
    fit(); addEventListener("resize", fit);
  }
  function spawn(x, y, opts) {
    if (reduced) opts = Object.assign({}, opts, { count: Math.min(10, (opts && opts.count) || 10) });
    ensureCanvas();
    const o = Object.assign({ count: 36, colors: FEST, power: 6, grav: 0.12, petals: false }, opts || {});
    for (let i = 0; i < o.count; i++) {
      const a = rnd(0, Math.PI * 2), sp = rnd(1, o.power);
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - rnd(1, 3),
        g: o.grav, life: 1, decay: rnd(0.012, 0.028), s: rnd(3, 7),
        c: pick(o.colors), rot: rnd(0, 6.3), vr: rnd(-0.2, 0.2), petal: o.petals && i % 2 === 0 });
    }
    if (!rafId) loop();
  }
  function loop() {
    rafId = requestAnimationFrame(loop);
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0);
    if (!parts.length) { cancelAnimationFrame(rafId); rafId = 0; cx.clearRect(0, 0, cv.width, cv.height); return; }
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.life -= p.decay; p.rot += p.vr;
      cx.save(); cx.globalAlpha = Math.max(0, p.life); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.fillStyle = p.c;
      if (p.petal) { cx.beginPath(); cx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.3); cx.fill(); }
      else cx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.7);
      cx.restore();
    }
  }
  const confetti = (x, y) => spawn(x, y, { count: 70, power: 9 });
  const gold = (x, y) => spawn(x, y, { count: 46, colors: GOLD, power: 7, grav: 0.09 });
  const sparkle = (x, y) => spawn(x, y, { count: 7, colors: GOLD, power: 3, grav: 0.05 });
  const bloom = (x, y) => spawn(x, y, { count: 50, power: 8, petals: true });

  let fwTimer = 0;
  function fireworks(ms) {
    if (reduced) { gold(innerWidth / 2, innerHeight * 0.3); return; }
    const end = Date.now() + ms;
    fwTimer = setInterval(() => {
      if (Date.now() > end) { clearInterval(fwTimer); return; }
      spawn(rnd(innerWidth * 0.12, innerWidth * 0.88), rnd(innerHeight * 0.08, innerHeight * 0.38),
        { count: 44, colors: Math.random() > 0.5 ? GOLD : FEST, power: 8, grav: 0.07 });
    }, 480);
  }

  /* ---------- floating petals (always-on, gentle) ---------- */
  function petals() {
    if (reduced) return;
    const pc = document.getElementById("petals"); if (!pc) return;
    const pctx = pc.getContext("2d");
    const fit = () => { pc.width = innerWidth; pc.height = innerHeight; };
    fit(); addEventListener("resize", fit);
    const cols = ["247,184,204", "255,201,163", "201,174,240", "242,205,122"];
    const ps = Array.from({ length: 13 }, () => ({
      x: rnd(0, innerWidth), y: rnd(-innerHeight, 0), vy: rnd(0.25, 0.7),
      sw: rnd(0.4, 1.4), ph: rnd(0, 6.3), s: rnd(4, 9), r: rnd(0, 6.3), vr: rnd(-0.01, 0.01),
      c: pick(cols), a: rnd(0.35, 0.7)
    }));
    (function draw(t) {
      requestAnimationFrame(draw);
      pctx.clearRect(0, 0, pc.width, pc.height);
      for (const p of ps) {
        p.y += p.vy; p.r += p.vr;
        const x = p.x + Math.sin(t / 1400 + p.ph) * 26 * p.sw;
        if (p.y > innerHeight + 20) { p.y = -20; p.x = rnd(0, innerWidth); }
        pctx.save(); pctx.globalAlpha = p.a; pctx.translate(x, p.y); pctx.rotate(p.r);
        pctx.fillStyle = "rgba(" + p.c + ",1)";
        pctx.beginPath(); pctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.3); pctx.fill(); pctx.restore();
      }
    })(0);
  }

  /* ---------- touch sparkles ---------- */
  let lastTap = 0;
  function touchSparkles() {
    if (reduced) return;
    addEventListener("pointerdown", e => {
      const n = Date.now(); if (n - lastTap < 130) return; lastTap = n;
      sparkle(e.clientX, e.clientY);
    }, { passive: true });
  }

  /* ---------- rakhi illustration ---------- */
  function rakhi(size) {
    const cols = ["#e2536f", "#f7b8cc", "#f2cd7a", "#c9aef0"];
    let petalsSvg = "";
    for (let i = 0; i < 12; i++) {
      petalsSvg += `<ellipse cx="60" cy="24" rx="8" ry="17" fill="${cols[i % 4]}" opacity="0.95" transform="rotate(${i * 30} 60 60)"/>`;
    }
    return `<svg class="rakhi" viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true">
      <path d="M0 60 H36 M84 60 H120" stroke="url(#gThread)" stroke-width="4.5" stroke-linecap="round"/>
      <g class="rk-p">${petalsSvg}</g>
      <circle cx="60" cy="60" r="25" fill="#fff6ee" stroke="#d9a441" stroke-width="2.5"/>
      <circle cx="60" cy="60" r="18" fill="#e2536f"/>
      <circle cx="60" cy="60" r="11" fill="url(#gGem)"/>
      <circle cx="60" cy="42" r="1.6" fill="#d9a441"/><circle cx="60" cy="78" r="1.6" fill="#d9a441"/>
      <circle cx="42" cy="60" r="1.6" fill="#d9a441"/><circle cx="78" cy="60" r="1.6" fill="#d9a441"/>
    </svg>`;
  }

  /* ---------- pop flowers into a container ---------- */
  function flowers(host, n) {
    for (let i = 0; i < n; i++) {
      const f = document.createElement("span");
      f.className = "bloom";
      f.style.left = rnd(6, 90) + "%";
      f.style.top = rnd(8, 88) + "%";
      f.style.setProperty("--fd", rnd(0, 0.6) + "s");
      f.style.setProperty("--fs", rnd(0.7, 1.4));
      host.appendChild(f);
      setTimeout(() => f.remove(), 3200);
    }
  }

  /* ---------- toast ---------- */
  let toastT = 0;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 3000);
  }

  /* ---------- music (never autoplays; fine if file missing) ---------- */
  function initMusic() {
    const btn = document.getElementById("music-btn");
    const label = document.getElementById("music-label");
    let audio = null, on = false, broken = false;
    btn.addEventListener("click", () => {
      if (broken) { toast("Add assets/music.mp3 to enable music 🎵"); return; }
      if (!audio) {
        audio = new Audio(CONFIG.music); audio.loop = true;
        audio.addEventListener("error", () => {
          broken = true; on = false;
          btn.classList.remove("on"); btn.setAttribute("aria-pressed", "false");
          label.textContent = "Music"; toast("No music file yet — drop assets/music.mp3 in the folder 🎵");
        });
      }
      if (on) { audio.pause(); on = false; }
      else { audio.play().catch(() => {}); on = true; }
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", String(on));
      label.textContent = on ? "Music ON" : "Music";
    });
  }

  document.addEventListener("DOMContentLoaded", () => { petals(); touchSparkles(); initMusic(); });

  return { reduced, confetti, gold, sparkle, bloom, fireworks, rakhi, flowers, toast };
})();
