/* journey.js — smooth scroll, gated screen reveals, progress, IO reveals */
window.JOURNEY = (() => {
  const reduced = FX.reduced;
  let lenis = null;

  function initScroll() {
    if (window.Lenis && !reduced) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { offset: -12, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  window.go = sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (el.hidden) {
      el.hidden = false;
      el.classList.add("just-unlocked");
      observeReveals(el);
      requestAnimationFrame(() => {
        el.querySelectorAll(".reveal:not(.in)").forEach((reveal, i) => {
          setTimeout(() => reveal.classList.add("in"), i * 120);
        });
      });
    }
    if (lenis && lenis.resize) lenis.resize();
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToEl(el)));
    setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight * 0.85 || r.bottom < 0) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }, 950);
  };

  /* every [data-next] button (delegated so JS-built buttons work too) */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-next]");
    if (!b) return;
    const r = b.getBoundingClientRect();
    FX.gold(r.left + r.width / 2, r.top + r.height / 2);
    go(b.getAttribute("data-next"));
  });

  /* scroll-triggered reveals */
  const io = new IntersectionObserver(entries => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });

  window.observeReveals = root => {
    (root || document).querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  };

  window.watchOnce = (el, cb) => {
    const o = new IntersectionObserver(ens => {
      for (const en of ens) if (en.isIntersecting) { o.disconnect(); cb(); }
    }, { threshold: 0.35 });
    o.observe(el);
  };

  /* progress thread */
  function progress() {
    const fill = document.getElementById("progress-fill");
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - innerHeight;
      fill.style.width = (max > 0 ? (h.scrollTop || window.scrollY) / max * 100 : 0) + "%";
    };
    addEventListener("scroll", update, { passive: true });
    if (lenis) lenis.on("scroll", update);
  }

  /* slow editorial marquee */
  function marquee() {
    const txt = "tied with love&nbsp;&nbsp;✦&nbsp;&nbsp;रक्षा बंधन&nbsp;&nbsp;✦&nbsp;&nbsp;since forever&nbsp;&nbsp;✦&nbsp;&nbsp;partners in crime&nbsp;&nbsp;✦&nbsp;&nbsp;";
    ["marquee-1", "marquee-2"].forEach(id => {
      const t = document.getElementById(id);
      if (t) t.innerHTML = `<span>${txt.repeat(4)}</span><span aria-hidden="true">${txt.repeat(4)}</span>`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScroll(); progress(); marquee(); observeReveals(document);
  });

  return { go, scrollToEl };
})();
