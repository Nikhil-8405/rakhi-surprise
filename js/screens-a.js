/* screens-a.js — intro, welcome, ceremony, gallery, timeline, unsaid cards */

/* ---------- SCREEN 1 · intro ---------- */
function initIntro() {
  document.getElementById("intro-rakhi").innerHTML = FX.rakhi(74);
  let starTaps = 0;
  document.getElementById("egg-star").addEventListener("click", e => {
    FX.sparkle(e.clientX, e.clientY);
    if (++starTaps === 3) FX.toast("You found the first secret ✦ there are more hiding…");
  });
}

/* ---------- SCREEN 2 · welcome ---------- */
function initWelcome() {
  document.getElementById("welcome-rakhi").innerHTML = FX.rakhi(150);
  document.getElementById("welcome-title").innerHTML =
    "Happy Raksha Bandhan, <em>" + CONFIG.sisterName + "</em>";
  const okay = document.getElementById("welcome-okay");
  const no = document.getElementById("welcome-no");
  const banter = document.getElementById("welcome-banter");
  let okayClicks = 0, noClicks = 0;
  const noLines = [
    "Please open it na 🥺",
    "That button was only a test. Try the nice one 😌",
    "Not interested? I spent actual time on this 😂",
    "Okay, I will wait right here… dramatically."
  ];
  no.addEventListener("click", e => {
    noClicks++;
    banter.textContent = noLines[Math.min(noClicks - 1, noLines.length - 1)];
    no.classList.remove("shake"); void no.offsetWidth; no.classList.add("shake");
    FX.sparkle(e.clientX, e.clientY);
  });
  okay.addEventListener("click", e => {
    okayClicks++;
    if (okayClicks === 1) {
      okay.textContent = "Okay okay… open it 😌";
      okay.classList.add("welcome-okay-ready");
      banter.textContent = "One more click. I promise this time it is worth it 👀";
      FX.sparkle(e.clientX, e.clientY);
      return;
    }
    window.go("#s-ceremony");
  });
}

/* ---------- SCREEN 3 · ceremony (press & hold) ---------- */
function initCeremony() {
  const btn = document.getElementById("ceremony-rakhi");
  const ring = document.getElementById("hold-ring");
  const stage = document.getElementById("ceremony-stage");
  btn.innerHTML = FX.rakhi(140);
  const C = 2 * Math.PI * 52;
  ring.style.strokeDasharray = C;
  ring.style.strokeDashoffset = C;
  let prog = 0, holding = false, raf = 0, done = false, taps = 0;

  function tick() {
    prog = Math.max(0, Math.min(1, prog + (holding ? 1 / 70 : -1 / 45)));
    ring.style.strokeDashoffset = C * (1 - prog);
    btn.style.setProperty("--charge", prog);
    if (prog >= 1 && !done) { complete(); return; }
    raf = (holding || prog > 0) ? requestAnimationFrame(tick) : 0;
  }
  btn.addEventListener("pointerdown", e => {
    if (done) { // easter egg: poke the tied rakhi 5 times
      FX.sparkle(e.clientX, e.clientY);
      if (++taps === 5) FX.toast("Okay wow, you really like poking the rakhi 😂 fine — secret: you're my favourite person.");
      return;
    }
    holding = true;
    try { btn.setPointerCapture(e.pointerId); } catch (_) {}
    if (!raf) raf = requestAnimationFrame(tick);
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(ev =>
    btn.addEventListener(ev, () => { holding = false; }));

  function complete() {
    done = true; holding = false;
    stage.classList.add("tied");
    const r = btn.getBoundingClientRect();
    FX.gold(r.left + r.width / 2, r.top + r.height / 2);
    FX.bloom(r.left + r.width / 2, r.top + r.height / 2);
    FX.flowers(stage, 8);
    document.querySelectorAll("#ceremony-msg .cmsg").forEach((el, i) =>
      setTimeout(() => el.classList.add("in"), 500 + i * 750));
    document.getElementById("ceremony-instruction").textContent = "you did it 🥹";
    const next = document.getElementById("ceremony-next");
    setTimeout(() => { next.hidden = false; next.classList.add("pop-in"); }, 2300);
  }
}

/* ---------- SCREEN 4 · gallery + lightbox ---------- */
function placeholder(cls) {
  return `<div class="ph ${cls}">${FX.rakhi(90)}</div>`;
}
function initGallery() {
  const strip = document.getElementById("gallery-strip");
  CONFIG.photos.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "polaroid";
    b.style.setProperty("--r", (i % 2 ? 1 : -1) * (2 + (i % 3)) + "deg");
    b.setAttribute("data-testid", "gallery-photo-" + i);
    b.setAttribute("aria-label", "Open photo: " + p.caption);
    b.innerHTML = `<div class="pol-media">${placeholder("ph-" + (i % 6))}</div>
      <span class="pol-cap"><span>${p.caption}</span><span>${p.date || ""}</span></span>`;
    const img = new Image();
    img.onload = () => { b.querySelector(".pol-media").innerHTML = ""; img.alt = p.caption; b.querySelector(".pol-media").appendChild(img); };
    img.src = p.src;
    b.addEventListener("click", () => openLB(i));
    strip.appendChild(b);
  });

  /* lightbox */
  const lb = document.getElementById("lightbox");
  const media = document.getElementById("lb-media");
  const cap = document.getElementById("lb-caption");
  const dat = document.getElementById("lb-date");
  let cur = 0, touchX = null;

  function render() {
    const p = CONFIG.photos[cur];
    media.innerHTML = placeholder("ph-" + (cur % 6));
    const img = new Image();
    img.onload = () => { media.innerHTML = ""; img.alt = p.caption; media.appendChild(img); };
    img.src = p.src;
    cap.textContent = p.caption; dat.textContent = p.date || "";
  }
  window.openLB = i => {
    cur = i; render();
    lb.hidden = false;
    FX.sparkle(innerWidth / 2, innerHeight / 2);
  };
  function closeLB() { lb.hidden = true; }
  const step = d => { cur = (cur + d + CONFIG.photos.length) % CONFIG.photos.length; render(); FX.sparkle(innerWidth / 2, innerHeight * 0.4); };
  document.getElementById("lb-close").addEventListener("click", closeLB);
  lb.querySelector("[data-lb-close]").addEventListener("click", closeLB);
  document.getElementById("lb-prev").addEventListener("click", () => step(-1));
  document.getElementById("lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("pointerdown", e => { touchX = e.clientX; }, { passive: true });
  lb.addEventListener("pointerup", e => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    if (Math.abs(dx) > 42) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- SCREEN 5 · timeline ---------- */
function initTimeline() {
  const list = document.getElementById("timeline-list");
  CONFIG.timeline.forEach((t, i) => {
    const d = document.createElement("div");
    d.className = "tl-item reveal";
    d.setAttribute("data-testid", "timeline-item-" + i);
    const photo = t.photo ? `<img class="tl-photo" src="${t.photo}" alt="${t.title}" loading="lazy">` : "";
    d.innerHTML = `<p class="tl-era">${t.era}</p><div class="tl-card">${photo}<h3>${t.title}</h3><p>${t.text}</p></div>`;
    const image = d.querySelector(".tl-photo");
    if (image) image.addEventListener("error", () => image.remove());
    list.appendChild(d);
  });
}

/* ---------- SCREEN 6 · unsaid flip cards ---------- */
function initCards() {
  const stack = document.getElementById("cards-stack");
  const count = document.getElementById("cards-count");
  const opened = new Set();
  CONFIG.cards.forEach((msg, i) => {
    const c = document.createElement("button");
    c.className = "flip-card reveal";
    c.setAttribute("data-testid", "flip-card-" + i);
    c.setAttribute("aria-label", "Reveal hidden message " + (i + 1));
    c.innerHTML = `<span class="fc-face fc-front">for you, ${CONFIG.sisterName} ♡</span>
      <span class="fc-face fc-back">${msg}</span>`;
    c.addEventListener("click", () => {
      c.classList.toggle("flipped");
      if (c.classList.contains("flipped")) {
        opened.add(i);
        const r = c.getBoundingClientRect();
        FX.sparkle(r.left + r.width / 2, r.top + r.height / 2);
        count.textContent = opened.size + " of " + CONFIG.cards.length + " opened";
        if (opened.size === CONFIG.cards.length) {
          const next = document.getElementById("cards-next");
          next.hidden = false; next.classList.add("pop-in");
          FX.confetti(innerWidth / 2, innerHeight * 0.4);
        }
      }
    });
    stack.appendChild(c);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIntro(); initWelcome(); initCeremony(); initGallery(); initTimeline(); initCards();
});
