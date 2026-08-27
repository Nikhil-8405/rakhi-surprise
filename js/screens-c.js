/* screens-c.js — gift box, letter, finale, memory wall, easter eggs */

/* ---------- SCREEN 12 · gift box (4 taps) ---------- */
function initGift() {
  const gift = document.getElementById("gift-box");
  const hint = document.getElementById("gift-hint");
  const hints = ["tap the gift…", "again! it can feel you 🎀", "one more…", "NOW. OPEN IT."];
  let taps = 0, open = false;
  gift.addEventListener("click", () => {
    if (open) return;
    taps++;
    if (taps < 4) {
      gift.classList.remove("t1", "t2", "t3"); void gift.offsetWidth;
      gift.classList.add("t" + taps);
      hint.textContent = hints[taps];
      const r = gift.getBoundingClientRect();
      FX.sparkle(r.left + r.width / 2, r.top + r.height / 2);
      return;
    }
    open = true;
    gift.classList.remove("t1", "t2", "t3");
    gift.classList.add("open");
    hint.textContent = "it's open. it's always been you.";
    const r = gift.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    FX.confetti(x, y); FX.gold(x, y - 40); FX.bloom(x, y);
    setTimeout(() => FX.confetti(x - 90, y - 80), 250);
    setTimeout(() => FX.confetti(x + 90, y - 60), 450);
    document.getElementById("gift-msg").classList.add("show");
    const next = document.getElementById("gift-next");
    setTimeout(() => { next.hidden = false; next.classList.add("pop-in"); }, 1400);
  });
}

/* ---------- SCREEN 13 · final letter ---------- */
function initLetter() {
  const wrap = document.getElementById("letter-lines");
  CONFIG.letter.forEach(line => {
    const p = document.createElement("p");
    p.className = "letter-line";
    p.textContent = line;
    wrap.appendChild(p);
  });
  const sign = document.getElementById("letter-sign");
  sign.textContent = CONFIG.letterSign;

  watchOnce(document.getElementById("s-letter"), () => {
    const lines = wrap.querySelectorAll(".letter-line");
    lines.forEach((l, i) => setTimeout(() => l.classList.add("write"), 500 + i * 950));
    setTimeout(() => sign.classList.add("write"), 500 + lines.length * 950);
    const next = document.getElementById("letter-next");
    setTimeout(() => { next.hidden = false; next.classList.add("pop-in"); }, 800 + (lines.length + 1) * 950);
  });

  /* easter egg: long-press the signature */
  let pressT = 0;
  sign.addEventListener("pointerdown", () => {
    pressT = setTimeout(() => FX.toast("psst… you reading this twice means you liked it ❤️"), 900);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev =>
    sign.addEventListener(ev, () => clearTimeout(pressT)));
}

/* ---------- SCREEN 14 · finale ---------- */
function initFinale() {
  document.getElementById("finale-rakhi").innerHTML = FX.rakhi(150);
  document.getElementById("finale-4").innerHTML = "Happy Raksha Bandhan, <em>" + CONFIG.sisterName + "</em>";
  const f = i => document.getElementById("finale-" + i);
  watchOnce(document.getElementById("s-finale"), () => {
    if (FX.reduced) {
      [f(2), f(3), f(4)].forEach(el => el.classList.add("in"));
      document.getElementById("finale-rakhi").classList.add("in");
      document.getElementById("finale-next").classList.add("in");
      FX.gold(innerWidth / 2, innerHeight * 0.3);
      return;
    }
    const steps = [
      [400,  () => f(1).classList.add("in")],
      [2100, () => f(1).classList.add("out")],
      [2600, () => f(2).classList.add("in")],
      [4500, () => f(2).classList.add("out")],
      [5100, () => { document.getElementById("finale-rakhi").classList.add("in"); FX.fireworks(6000); }],
      [6400, () => f(3).classList.add("in")],
      [7600, () => f(4).classList.add("in")],
      [8800, () => document.getElementById("finale-next").classList.add("in")]
    ];
    steps.forEach(([t, fn]) => setTimeout(fn, t));
  });
}

/* ---------- SCREEN 15 · draggable memory wall ---------- */
function initWall() {
  const board = document.getElementById("wall-board");
  let z = 10;
  CONFIG.wall.forEach((w, i) => {
    const el = document.createElement(w.type === "photo" ? "figure" : "div");
    el.className = "wall-item " + (w.type === "photo" ? "wall-photo" : "wall-note");
    el.setAttribute("data-testid", "wall-item-" + i);
    el.style.left = w.x + "%";
    el.style.top = w.y + "%";
    el.style.transform = `rotate(${w.rot}deg)`;
    if (w.type === "photo") {
      el.innerHTML = `<div class="pol-media">${placeholder("ph-" + (i % 6))}</div>
        <figcaption><span>${w.caption}</span><span>${w.date || ""}</span></figcaption>`;
      const img = new Image();
      img.onload = () => { el.querySelector(".pol-media").innerHTML = ""; img.alt = w.caption; el.querySelector(".pol-media").appendChild(img); };
      img.addEventListener("error", () => img.remove());
      img.src = w.src;
    } else {
      el.textContent = w.text;
    }
    board.appendChild(el);

    el.addEventListener("pointerdown", e => {
      e.preventDefault();
      el.classList.add("dragging");
      el.style.zIndex = ++z;
      const b = board.getBoundingClientRect();
      const startL = el.offsetLeft, startT = el.offsetTop;
      const sx = e.clientX, sy = e.clientY;
      const move = ev => {
        const nx = Math.max(-20, Math.min(b.width - el.offsetWidth + 20, startL + ev.clientX - sx));
        const ny = Math.max(-10, Math.min(b.height - el.offsetHeight + 10, startT + ev.clientY - sy));
        el.style.left = nx + "px"; el.style.top = ny + "px";
      };
      const up = () => {
        el.classList.remove("dragging");
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
        removeEventListener("pointercancel", up);
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
      addEventListener("pointercancel", up);
    });
  });
  document.getElementById("footer-line").textContent =
    "made with far too much love (and a little code) by " + CONFIG.myName;
}

/* ---------- global easter eggs ---------- */
function initEggs() {
  /* type "love" anywhere */
  let buf = "";
  addEventListener("keydown", e => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === "love") {
      FX.gold(innerWidth / 2, innerHeight / 2);
      FX.toast("love you too, " + CONFIG.sisterName + " ❤️ (yes, the website heard that)");
      buf = "";
    }
  });
  /* tap the marigold 3 times */
  let ft = 0;
  document.getElementById("egg-flower").addEventListener("click", () => {
    if (++ft === 3) { FX.toast("The flower says: you smell nice today. Don't make it weird 😂"); ft = 0; }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGift(); initLetter(); initFinale(); initWall(); initEggs();
});
