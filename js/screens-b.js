/* screens-b.js — envelopes, puzzle, quiz, thread connect, reasons */

/* ---------- SCREEN 7 · secret envelopes ---------- */
function initEnvelopes() {
  const grid = document.getElementById("env-grid");
  const sheet = document.getElementById("sheet");
  const opened = new Set();
  const lockIdx = CONFIG.envelopes.findIndex(e => e.lock);

  CONFIG.envelopes.forEach((env, i) => {
    const b = document.createElement("button");
    b.className = "env-card reveal" + (env.lock ? " locked" : "");
    b.setAttribute("data-testid", "envelope-" + i);
    b.innerHTML = `<span class="env-title">${env.title}</span>
      <span class="env-sub">${env.lock ? "sealed · open last" : "tap to open"}</span>
      ${env.lock ? '<span class="lock-tag">🔒</span>' : ""}`;
    b.addEventListener("click", () => {
      if (env.lock && opened.size < CONFIG.envelopes.length - 1) {
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
        FX.toast("This one opens last 💌 read the others first");
        return;
      }
      if (env.lock) { const tag = b.querySelector(".lock-tag"); if (tag) tag.remove(); b.classList.remove("locked"); }
      const first = !opened.has(i);
      opened.add(i); b.classList.add("opened");
      b.querySelector(".env-sub").textContent = "opened · tap to re-read";
      document.getElementById("sheet-title").textContent = env.title;
      document.getElementById("sheet-letter").textContent = env.message;
      sheet.hidden = false;
      if (first) {
        const r = b.getBoundingClientRect();
        FX.gold(r.left + r.width / 2, r.top + r.height / 2);
      }
      if (opened.size === CONFIG.envelopes.length) {
        const next = document.getElementById("env-next");
        setTimeout(() => {
          next.hidden = false; next.classList.add("pop-in");
          FX.confetti(innerWidth / 2, innerHeight * 0.35);
        }, 600);
      }
    });
    grid.appendChild(b);
  });

  const close = () => { sheet.hidden = true; };
  document.getElementById("sheet-close").addEventListener("click", close);
  sheet.querySelector("[data-sheet-close]").addEventListener("click", close);
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---------- SCREEN 8 · puzzle (tap two tiles to swap) ---------- */
function initPuzzle() {
  const grid = document.getElementById("puz-grid");
  const msg = document.getElementById("puz-msg");
  let order = [0, 1, 2, 3, 4, 5, 6, 7, 8], sel = null, solved = false;

  do { order.sort(() => Math.random() - 0.5); } while (order.every((v, i) => v === i));

  function artPos(home) {
    return ((home % 3) * 50) + "% " + (Math.floor(home / 3) * 50) + "%";
  }
  function render() {
    grid.innerHTML = "";
    order.forEach((home, slot) => {
      const t = document.createElement("button");
      t.className = "puz-tile" + (sel === slot ? " sel" : "");
      t.setAttribute("data-testid", "puzzle-tile-" + slot);
      t.setAttribute("aria-label", "Puzzle piece " + (slot + 1));
      t.innerHTML = `<span class="pz-art" style="background-position:${artPos(home)}"></span>`;
      t.addEventListener("click", () => tap(slot));
      grid.appendChild(t);
    });
  }
  function tap(slot) {
    if (solved) return;
    if (sel === null) { sel = slot; render(); return; }
    if (sel === slot) { sel = null; render(); return; }
    [order[sel], order[slot]] = [order[slot], order[sel]];
    sel = null; render();
    if (order.every((v, i) => v === i)) {
      solved = true;
      grid.classList.add("solved");
      msg.textContent = "You solved it! 🥹";
      const r = grid.getBoundingClientRect();
      FX.confetti(r.left + r.width / 2, r.top + r.height / 2);
      FX.flowers(grid, 6);
      const next = document.getElementById("puz-next");
      setTimeout(() => { next.hidden = false; next.classList.add("pop-in"); }, 900);
    } else {
      msg.textContent = ["hmm…", "getting warmer ✨", "you've got this", "so close!"][Math.floor(Math.random() * 4)];
    }
  }
  render();
}

/* ---------- SCREEN 9 · quiz ---------- */
function initQuiz() {
  const box = document.getElementById("quiz-box");
  let qi = 0;

  function renderQ() {
    const q = CONFIG.quiz[qi];
    box.innerHTML = `<p class="quiz-meta">question ${qi + 1} / ${CONFIG.quiz.length}</p>
      <p class="quiz-q">${q.q}</p>` +
      q.options.map((o, i) =>
        `<button class="quiz-opt" data-testid="quiz-option-${qi}-${i}" style="animation-delay:${0.1 + i * 0.12}s">${o.t}</button>`).join("") +
      `<p class="quiz-react" data-testid="quiz-reaction"></p>`;
    box.querySelectorAll(".quiz-opt").forEach((btn, i) =>
      btn.addEventListener("click", () => {
        const r = btn.getBoundingClientRect();
        FX.sparkle(r.left + r.width / 2, r.top + r.height / 2);
        box.querySelector(".quiz-react").textContent = q.options[i].r;
        box.querySelectorAll(".quiz-opt").forEach(b => b.disabled = true);
        setTimeout(() => { qi++; qi < CONFIG.quiz.length ? renderQ() : result(); }, 1100);
      }));
  }

  function result() {
    const res = CONFIG.quizResult;
    box.innerHTML = `<div class="quiz-result" data-testid="quiz-result">
      <p class="quiz-meta">official result</p>
      <p class="quiz-pct"><span id="quiz-pct-num">0</span>%</p>
      <p class="quiz-line">${res.line}</p>
      <p class="quiz-twist">${res.twist}</p></div>`;
    const numEl = document.getElementById("quiz-pct-num");
    const t0 = performance.now();
    (function count(t) {
      const k = Math.min(1, (t - t0) / 1500);
      numEl.textContent = Math.round(res.percent * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(count);
      else {
        FX.confetti(innerWidth / 2, innerHeight * 0.35);
        const next = document.getElementById("quiz-next");
        next.hidden = false; next.classList.add("pop-in");
      }
    })(t0);
  }
  renderQ();
}

/* ---------- SCREEN 10 · thread connect ---------- */
function initThread() {
  const stage = document.getElementById("thread-stage");
  const svg = document.getElementById("thread-svg");
  const line = document.getElementById("thread-line");
  document.getElementById("thread-rakhi").innerHTML = FX.rakhi(96);
  let dragging = false, connected = false;

  const center = el => {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
  };
  const toLocal = e => {
    const s = stage.getBoundingClientRect();
    return { x: e.clientX - s.left, y: e.clientY - s.top };
  };
  function draw(a, p) {
    const mx = (a.x + p.x) / 2, my = Math.max(a.y, p.y) + 46;
    line.setAttribute("d", `M ${a.x} ${a.y} Q ${mx} ${my} ${p.x} ${p.y}`);
  }
  function connect() {
    connected = true; dragging = false;
    const a = center(document.getElementById("node-me"));
    const b = center(document.getElementById("node-di"));
    draw(a, b);
    stage.classList.add("connected");
    [0.25, 0.5, 0.75].forEach((k, i) => setTimeout(() => {
      const s = stage.getBoundingClientRect();
      FX.gold(s.left + a.x + (b.x - a.x) * k, s.top + (a.y + b.y) / 2 + 20);
    }, i * 260));
    FX.flowers(stage, 7);
    const next = document.getElementById("thread-next");
    setTimeout(() => { next.hidden = false; next.classList.add("pop-in"); }, 2400);
  }
  stage.addEventListener("pointerdown", e => {
    if (connected) return;
    dragging = true;
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    draw(center(document.getElementById("node-me")), toLocal(e));
  });
  stage.addEventListener("pointermove", e => {
    if (!dragging || connected) return;
    const p = toLocal(e);
    draw(center(document.getElementById("node-me")), p);
    const b = center(document.getElementById("node-di"));
    if (Math.hypot(p.x - b.x, p.y - b.y) < 56) connect();
  });
  ["pointerup", "pointercancel"].forEach(ev => stage.addEventListener(ev, () => {
    if (!connected) { dragging = false; line.setAttribute("d", ""); }
  }));
  document.getElementById("node-di").addEventListener("click", () => { if (!connected) FX.toast("Drag the glowing thread from “Me” all the way to “Di” ✨"); });
  document.getElementById("node-me").addEventListener("click", () => { if (!connected) FX.toast("Press, hold and drag toward Di →"); });
}

/* ---------- SCREEN 11 · reasons ---------- */
function initReasons() {
  const card = document.getElementById("reason-card");
  let bag = [];
  document.getElementById("reason-btn").addEventListener("click", e => {
    if (!bag.length) bag = CONFIG.reasons.slice().sort(() => Math.random() - 0.5);
    const reason = bag.pop();
    card.classList.remove("pop"); void card.offsetWidth;
    card.querySelector("p").textContent = reason;
    card.classList.add("pop");
    FX.sparkle(e.clientX, e.clientY);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEnvelopes(); initPuzzle(); initQuiz(); initThread(); initReasons();
});
