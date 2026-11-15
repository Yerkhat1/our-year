(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- little bears (original drawings) ---------- */
  const OUT = "#6b4a3a";
  const COL = {
    white: { fur: "#fffdfb", ear: "#f9c3d1" },
    brown: { fur: "#cf9b6f", ear: "#a8744c", muzzle: "#f0d9bd" },
  };
  function heart(x, y, size = 14, color = "#f28aab", cls = "") {
    const k = size / 14;
    return `<g transform="translate(${x} ${y}) scale(${k})"><g class="${cls}"><path d="M0 -3 C-6 -13 -19 -6 -12 5 L0 15 L12 5 C19 -6 6 -13 0 -3Z" fill="${color}" stroke="${OUT}" stroke-width="${2 / k}" stroke-linejoin="round"/></g></g>`;
  }
  function face(kind, c) {
    const st = `stroke="${OUT}" stroke-width="3" fill="none" stroke-linecap="round"`;
    const blush = `<ellipse cx="-27" cy="4" rx="8" ry="5" fill="#f7a8bd" opacity=".75"/><ellipse cx="27" cy="4" rx="8" ry="5" fill="#f7a8bd" opacity=".75"/>`;
    if (kind === "happy") {
      return `<path d="M-25 -9 q7 -9 14 0" ${st}/><path d="M11 -9 q7 -9 14 0" ${st}/>
        <path d="M-7 3 q7 12 14 0z" fill="#e8708f" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>${blush}`;
    }
    const muzzle = c === "brown" ? `<ellipse cx="0" cy="8" rx="16" ry="12" fill="${COL.brown.muzzle}"/>` : "";
    const eyes = `<circle cx="-17" cy="-9" r="4.8" fill="#3b2a22"/><circle cx="17" cy="-9" r="4.8" fill="#3b2a22"/>
      <circle cx="-15.4" cy="-10.8" r="1.6" fill="#fff"/><circle cx="18.6" cy="-10.8" r="1.6" fill="#fff"/>`;
    const nose = `<ellipse cx="0" cy="3" rx="5.5" ry="4" fill="#3b2a22"/>`;
    if (kind === "sad") {
      return `${muzzle}${eyes}${nose}<path d="M-5 13 q5 -5 10 0" ${st}/>
        <path d="M-22 -1 q-4 7 0 9 q4 -2 0 -9z" fill="#a9d6f2" stroke="${OUT}" stroke-width="1.5"/>`;
    }
    return `${muzzle}${eyes}${nose}<path d="M-5 9 q5 5 10 0" ${st}/>${kind === "blush" ? blush : ""}`;
  }
  function bear({ x, y, s = 1, c = "white", f = "happy", r = 0, wave = false, cls = "" }) {
    const col = COL[c];
    const o = `stroke="${OUT}" stroke-width="3"`;
    const armR = wave
      ? `<ellipse cx="34" cy="14" rx="9" ry="14" transform="rotate(35 34 14)" fill="${col.fur}" ${o}/>`
      : `<ellipse cx="23" cy="42" rx="9" ry="12" transform="rotate(25 23 42)" fill="${col.fur}" ${o}/>`;
    return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><g class="${cls}">
      <ellipse cx="-17" cy="68" rx="14" ry="9" fill="${col.fur}" ${o}/>
      <ellipse cx="17" cy="68" rx="14" ry="9" fill="${col.fur}" ${o}/>
      <ellipse cx="0" cy="42" rx="34" ry="30" fill="${col.fur}" ${o}/>
      <ellipse cx="-23" cy="42" rx="9" ry="12" transform="rotate(-25 -23 42)" fill="${col.fur}" ${o}/>
      ${armR}
      <circle cx="-31" cy="-38" r="13" fill="${col.fur}" ${o}/><circle cx="31" cy="-38" r="13" fill="${col.fur}" ${o}/>
      <circle cx="-31" cy="-38" r="6" fill="${col.ear}"/><circle cx="31" cy="-38" r="6" fill="${col.ear}"/>
      <ellipse cx="0" cy="-8" rx="45" ry="38" fill="${col.fur}" ${o}/>
      ${face(f, c)}
    </g></g>`;
  }
  const txt = (x, y, t, size = 20, rot = 0, col = "#c95a7c") =>
    `<text x="${x}" y="${y}" transform="rotate(${rot} ${x} ${y})" font-family="Caveat, cursive" font-weight="700" font-size="${size}" fill="${col}" text-anchor="middle">${t}</text>`;
  const ground = `<ellipse cx="150" cy="190" rx="130" ry="8" fill="#f6b9cb" opacity=".35"/>`;

  const SCENES = {
    hug: () => `${ground}
      ${bear({ x: 178, y: 108, c: "brown", f: "blush", cls: "wob" })}
      ${bear({ x: 122, y: 112, c: "white", f: "happy", r: -14, cls: "wob" })}
      <ellipse cx="172" cy="128" rx="10" ry="17" transform="rotate(62 172 128)" fill="#fffdfb" stroke="${OUT}" stroke-width="3"/>
      ${heart(92, 30, 16, "#f28aab", "beat")}${heart(214, 18, 12, "#f6b9cb", "beat")}${heart(152, 6, 9, "#f28aab")}`,
    peek: () => `${ground}
      ${bear({ x: 82, y: 112, c: "white", f: "happy", cls: "wob" })}
      ${bear({ x: 222, y: 112, c: "brown", f: "dot", wave: true })}
      <rect x="128" y="120" width="46" height="32" rx="4" fill="#fff" stroke="${OUT}" stroke-width="3"/>
      <rect x="120" y="150" width="62" height="8" rx="3" fill="#f6b9cb" stroke="${OUT}" stroke-width="3"/>
      ${txt(151, 142, "проект", 15, 0, "#8a6670")}${txt(222, 14, "привет", 22, -6)}`,
    study: () => `${ground}
      ${bear({ x: 92, y: 112, c: "brown", f: "dot", wave: true })}
      ${bear({ x: 210, y: 112, c: "white", f: "happy", cls: "wob" })}
      ${txt(150, 30, "x² + 2x + 1", 24, -4)}${txt(40, 24, "SAT", 20, -10, "#ee8fab")}${txt(262, 28, "IELTS", 20, 8, "#ee8fab")}
      ${txt(150, 70, "= (x+1)²", 20, 3, "#8a6670")}`,
    apart: () => `${ground}
      ${bear({ x: 70, y: 112, c: "white", f: "blush", r: -5 })}
      ${bear({ x: 230, y: 112, c: "brown", f: "blush", r: 5 })}
      ${txt(150, 110, "• • •", 26, 0, "#8a6670")}${heart(150, 46, 12, "#f6b9cb", "beat")}
      ${txt(68, 18, "просто", 20, -8)}${txt(232, 18, "просто", 20, 8)}`,
    fence: () => `${ground}
      ${bear({ x: 66, y: 112, c: "white", f: "blush" })}
      ${bear({ x: 234, y: 112, c: "brown", f: "blush" })}
      <g stroke="${OUT}" stroke-width="3" fill="#fff4e8" stroke-linejoin="round">
        <rect x="118" y="112" width="64" height="9" rx="2"/><rect x="118" y="146" width="64" height="9" rx="2"/>
        <path d="M124 186 v-80 l8 -10 l8 10 v80z"/><path d="M146 186 v-80 l8 -10 l8 10 v80z"/><path d="M168 186 v-80 l8 -10 l8 10 v80z"/>
      </g>${heart(150, 54, 15, "#f28aab", "beat")}`,
    sad: () => `${ground}
      ${bear({ x: 150, y: 112, c: "brown", f: "sad" })}
      <g fill="#fff" stroke="${OUT}" stroke-width="3"><path d="M205 40 a14 14 0 0 1 22 -12 a16 16 0 0 1 30 6 a12 12 0 0 1 0 24 h-50 a10 10 0 0 1 -2 -18z"/></g>
      <g stroke="#a9d6f2" stroke-width="3" stroke-linecap="round"><path d="M218 70 v8"/><path d="M234 74 v8"/><path d="M250 70 v8"/></g>
      ${txt(70, 40, "как дела?", 22, -8, "#8a6670")}`,
    heart: (label = "давай встречаться?") => `${ground}
      ${bear({ x: 92, y: 112, c: "white", f: "happy", wave: true, cls: "wob" })}
      ${bear({ x: 226, y: 112, c: "brown", f: "blush" })}
      ${heart(156, 74, 34, "#f28aab", "beat")}${txt(156, 22, label, 22, -3)}`,
  };
  const scene = (k, arg) => `<div class="scene"><svg viewBox="0 0 300 200" aria-hidden="true">${(SCENES[k] || SCENES.hug)(arg)}</svg></div>`;

  /* ---------- scale to the screen ---------- */
  function fit() {
    const w = innerWidth, h = innerHeight;
    const z = w >= 820 ? Math.max(1, Math.min(w / 600, h / 540, 1.75)) : 1;
    document.documentElement.style.setProperty("--z", z.toFixed(3));
    document.documentElement.style.setProperty("--zn", Math.max(1, z * 0.85).toFixed(3));
  }
  fit();
  addEventListener("resize", fit);

  /* ---------- floating hearts + tap hearts ---------- */
  const sky = $("#sky");
  for (let i = 0; i < 16; i++) {
    const h = document.createElement("span");
    h.className = "fh";
    h.textContent = "♥";
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = 10 + Math.random() * 16 + "px";
    h.style.animationDuration = 11 + Math.random() * 12 + "s";
    h.style.animationDelay = -Math.random() * 20 + "s";
    sky.appendChild(h);
  }
  function pop(x, y, n = 3) {
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "pop";
      p.textContent = "♥";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--dx", (Math.random() * 60 - 30).toFixed(0) + "px");
      p.style.fontSize = 14 + Math.random() * 16 + "px";
      p.style.animationDelay = i * 0.08 + "s";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
  }
  document.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button, input, .pol, #lightbox, .no")) return;
    pop(e.clientX, e.clientY);
  });

  /* ---------- lock ---------- */
  $("#lockBears").innerHTML = `<svg viewBox="0 0 300 200" aria-hidden="true">${SCENES.hug()}</svg>`;
  fetch("hint.txt").then((r) => (r.ok ? r.text() : "")).then((t) => { if (t.trim()) $("#hint").textContent = t.trim(); }).catch(() => {});

  let encrypted = null;
  const getData = () => (encrypted ||= fetch("data.enc", { cache: "no-store" }).then((r) => r.text()));

  async function decrypt(pass) {
    const d = JSON.parse(await getData());
    const u8 = (t) => Uint8Array.from(atob(t), (c) => c.charCodeAt(0));
    const norm = pass.trim().toLowerCase().replace(/\s+/g, "");
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(norm), "PBKDF2", false, ["deriveKey"]);
    const k = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: u8(d.s), iterations: 250000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    for (const w of d.w) {
      let raw;
      try { raw = await crypto.subtle.decrypt({ name: "AES-GCM", iv: u8(w.i) }, k, u8(w.c)); } catch { continue; }
      const ck = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["decrypt"]);
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: u8(d.i) }, ck, u8(d.c));
      return JSON.parse(new TextDecoder().decode(pt));
    }
    throw new Error("wrong");
  }

  const wrongMsgs = ["не то. подумай ещё ♥", "неа. ты точно знаешь", "почти? нет, не почти", "я верю в тебя"];
  let wrong = 0;
  $("#lockForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const pass = $("#pass").value;
    if (!pass.trim()) return;
    $("#unlockBtn").disabled = true;
    $("#unlockBtn").textContent = "...";
    try {
      const data = await decrypt(pass);
      store.set("our-year-k", pass);
      start(data);
    } catch {
      const card = $(".lock-card");
      card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
      $("#err").textContent = wrongMsgs[wrong++ % wrongMsgs.length];
      $("#unlockBtn").disabled = false;
      $("#unlockBtn").textContent = "Открыть";
    }
  });
  const saved = store.get("our-year-k");
  if (saved) decrypt(saved).then(start).catch(() => {});

  /* ---------- story ---------- */
  let D, slidesEl = [], cur = 0;
  const ROT = [-3.5, 2.5, -1.5, 3, -2.5, 1.5];

  let peekN = 0;
  const peek = () => `<svg class="peek-bear" viewBox="-60 -56 120 84" aria-hidden="true">${bear({ x: 0, y: 0, c: peekN++ % 2 ? "white" : "brown", f: peekN % 3 ? "blush" : "happy" })}</svg>`;
  function photosHTML(list) {
    const items = list.map((p, i) => `<figure class="pol" style="--r:${ROT[i % ROT.length]}deg" data-k="${esc(p.k)}" data-c="${esc(p.c || "")}">
      <img src="${D.images[p.k]}" alt="${esc(p.c || "")}" loading="lazy"><figcaption>${esc(p.c || "")}</figcaption>${i === 0 ? peek(list.length) : ""}</figure>`).join("");
    return `<div class="photos n${list.length}">${items}</div>`;
  }
  const verse = (t) => esc(t).replace(/~([^~]+)~/g, "<s>$1</s>");
  const versesHTML = (keys) => `<div class="verse">${keys.map((k) => `<p>${verse(D.stanzas[k])}</p>`).join("")}</div>`;
  const prose = (arr) => `<div class="prose">${arr.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;

  function slideHTML(s) {
    if (s.kind === "intro") {
      return `<div class="inner intro"><div class="eyebrow">${esc(s.eyebrow)}</div><h2>${esc(s.title)}</h2>${scene(s.bear)}${prose(s.text)}</div>`;
    }
    if (s.kind === "poem") {
      const keys = Object.keys(D.stanzas);
      const mark = (i) => (i === keys.length - 1 ? " last" : i % 5 === 2 ? " doodle" : i % 7 === 4 ? " star" : "");
      const st = `<div class="paper">${keys.map((k, i) => `<p class="st${mark(i)}">${verse(D.stanzas[k])}</p>`).join("")}</div>`;
      return `<div class="inner poem"><div class="eyebrow" style="text-align:center">стих, который я обещал</div><h2>${esc(D.poemTitle)}</h2>
        <p class="sub">читай медленно. можно вслух.</p>${st}<p class="divider">♥ ♥ ♥</p><p class="sign">твой</p><p class="big-tip">и ещё кое-что →</p></div>`;
    }
    if (s.kind === "question") {
      return `<div class="inner question">${scene("heart", "ещё один год?")}<h2>И последнее</h2>
        <p class="q-text">Ты останешься со мной ещё на один год?<br>И на все, которые будут после?</p>
        <div class="q-zone"><button class="no" data-stage="0"><span>Нет</span>
          <svg class="cracks" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 L46 9 L53 15 L48 22"/><path d="M48 22 L40 27 L43 34 L37 40"/><path d="M53 15 L64 12 L70 18 L82 15"/>
            <path d="M48 22 L58 26 L62 34 L71 37"/><path d="M40 27 L28 24 L20 29 L8 26"/><path d="M64 12 L67 3 L75 0 M20 29 L16 37 M70 18 L76 27 L92 30"/>
          </svg></button>
          <button class="yes" hidden>Да ♥</button></div>
        <p class="q-msg" aria-live="polite"></p></div>`;
    }
    const media = s.photos && s.photos.length ? photosHTML(s.photos) : scene(s.bear);
    return `<div class="inner"><div class="eyebrow">${esc(s.eyebrow)}</div><h2>${esc(s.title)}</h2>${media}${prose(s.text)}${versesHTML(s.verse)}${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}</div>`;
  }

  function start(data) {
    if (D) return;
    D = data;
    $("#lock").classList.add("hidden");
    $("#envelope").classList.remove("hidden");
    const r = $("#envBtn").getBoundingClientRect();
    pop(r.left + r.width / 2, r.top + r.height / 2, 6);
  }

  $("#envBtn").addEventListener("click", () => {
    const env = $("#envBtn");
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    const r = env.getBoundingClientRect();
    pop(r.left + r.width / 2, r.top, 8);
    setTimeout(() => { $("#envelope").classList.add("hidden"); buildStory(); }, 1500);
  });

  function buildStory() {
    const track = $("#track");
    track.innerHTML = D.slides.map((s) => `<section class="slide">${slideHTML(s)}</section>`).join("");
    slidesEl = [...track.children];
    $("#progress").innerHTML = slidesEl.map(() => "<i></i>").join("");
    $("#story").classList.remove("hidden");
    setupPoem();
    setupQuestion();
    go(0);
    setTimeout(() => $("#swipeTip").classList.add("hidden"), 6000);
  }

  function go(i) {
    const n = slidesEl.length;
    i = Math.max(0, Math.min(n - 1, i));
    if (i !== cur) $("#swipeTip").classList.add("hidden");
    cur = i;
    $("#track").style.transform = `translateX(${-i * 100}%)`;
    slidesEl.forEach((el, j) => el.classList.toggle("active", j === i));
    slidesEl[i].scrollTop = 0;
    [...$("#progress").children].forEach((el, j) => el.classList.toggle("on", j <= i));
    $("#count").textContent = `${i + 1} / ${n}`;
    $("#prev").disabled = i === 0;
    $("#next").disabled = i === n - 1;
  }
  $("#prev").addEventListener("click", () => go(cur - 1));
  $("#next").addEventListener("click", () => go(cur + 1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("#lightbox").classList.add("hidden");
    if ($("#story").classList.contains("hidden") || !$("#finale").classList.contains("hidden") || !$("#lightbox").classList.contains("hidden")) return;
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
  });
  let sx = 0, sy = 0, tracking = false;
  $("#track").addEventListener("touchstart", (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; tracking = true; }, { passive: true });
  $("#track").addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });

  function setupPoem() {
    const poemSlide = slidesEl[D.slides.findIndex((s) => s.kind === "poem")];
    if (!poemSlide) return;
    const sts = [...poemSlide.querySelectorAll(".st")];
    const reveal = () => sts.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 0.88) el.classList.add("seen"); });
    poemSlide.addEventListener("scroll", reveal, { passive: true });
    poemSlide.addEventListener("transitionend", reveal);
    addEventListener("resize", reveal);
    setInterval(() => { if (poemSlide.classList.contains("active")) reveal(); }, 400);
  }

  /* ---------- the only button is "no": it grows, cracks, breaks, and "yes" falls out ---------- */
  function setupQuestion() {
    const slide = slidesEl[D.slides.findIndex((s) => s.kind === "question")];
    if (!slide) return;
    const zone = $(".q-zone", slide), yes = $(".yes", slide), no = $(".no", slide), msg = $(".q-msg", slide);
    const cracks = [...no.querySelectorAll(".cracks path")];
    const meme = document.createElement("div");
    meme.className = "meme";
    meme.innerHTML = `<img alt="">`;
    document.body.appendChild(meme);
    const LAST = 7;
    const lines = ["", "в смысле, нет?", "оно не нажимается", "кнопке это не нравится", "она злится и растёт", "ты её доводишь", "она сейчас лопнет...", ""];
    let stage = 0, last = 0, memeTimer, broken = false;
    function showMeme(k) {
      meme.querySelector("img").src = D.images[k];
      meme.classList.add("show");
      clearTimeout(memeTimer);
      memeTimer = setTimeout(() => meme.classList.remove("show"), 1800);
    }
    function hit(e) {
      if (e) e.preventDefault();
      if (broken) return;
      const now = Date.now();
      if (now - last < 280) return; // one tap = one try, even though pointerdown and click both fire
      last = now;
      stage++;
      navigator.vibrate?.(25 + stage * 10);
      no.dataset.stage = stage;
      no.style.setProperty("--g", 1 + stage * 0.2);
      no.style.setProperty("--x", (Math.random() * 40 - 20).toFixed(0) + "px");
      no.style.setProperty("--y", (Math.random() * 24 - 12).toFixed(0) + "px");
      cracks.forEach((p, i) => p.classList.toggle("on", i < stage - 1));
      no.classList.remove("hit"); void no.offsetWidth; no.classList.add("hit");
      msg.textContent = lines[stage] || "";
      if (stage === 2) showMeme(D.memes.no);
      if (stage === 5) showMeme(D.memes.angry);
      if (stage >= LAST) shatter();
    }
    function shatter() {
      broken = true;
      no.classList.add("dying");
      setTimeout(() => {
        const r = no.getBoundingClientRect();
        for (let i = 0; i < 16; i++) {
          const sh = document.createElement("span");
          sh.className = "shard";
          const w = r.width / 4, h = r.height / 2;
          sh.style.cssText = `left:${r.left + (i % 4) * w}px;top:${r.top + Math.floor(i / 8) * h}px;width:${w}px;height:${h}px;`;
          const pts = Array.from({ length: 3 }, () => `${(Math.random() * 100).toFixed(0)}% ${(Math.random() * 100).toFixed(0)}%`);
          sh.style.clipPath = `polygon(0 0, 100% 0, ${pts.join(",")}, 0 100%)`;
          document.body.appendChild(sh);
          const ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 200;
          sh.animate([
            { transform: "translate(0,0) rotate(0)", opacity: 1 },
            { transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist + 160}px) rotate(${Math.random() * 540 - 270}deg)`, opacity: 0 },
          ], { duration: 1100 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" }).onfinish = () => sh.remove();
        }
        no.hidden = true;
        yes.hidden = false;
        yes.classList.add("born");
        msg.textContent = "ой. а под ней было вот это";
        const z = zone.getBoundingClientRect();
        pop(z.left + z.width / 2, z.top + z.height / 2, 10);
        navigator.vibrate?.([40, 30, 80]);
      }, 450);
    }
    no.addEventListener("pointerdown", hit);
    no.addEventListener("click", hit);
    no.addEventListener("contextmenu", (e) => e.preventDefault());
    yes.addEventListener("click", finale);
  }

  function finale() {
    const f = $("#finale");
    const t = D.finale.text;
    f.innerHTML = `<div class="inner">${scene("hug")}<h2>${esc(D.finale.title)}</h2>${prose(t.slice(0, -1))}
      <div><p class="love">${esc(t[t.length - 1])} ♥</p><div class="row"><button class="btn" id="again">перечитать стих</button><button class="btn ghost" id="restart">с самого начала</button></div></div></div>`;
    f.classList.remove("hidden");
    f.scrollTop = 0;
    let n = 0;
    const iv = setInterval(() => {
      pop(Math.random() * innerWidth, innerHeight * (0.3 + Math.random() * 0.6), 2);
      if (++n > 22) clearInterval(iv);
    }, 70);
    $("#again").onclick = () => { f.classList.add("hidden"); go(D.slides.findIndex((s) => s.kind === "poem")); };
    $("#restart").onclick = () => { f.classList.add("hidden"); go(0); };
  }

  /* ---------- lightbox ---------- */
  document.addEventListener("click", (e) => {
    const p = e.target.closest(".pol");
    const lb = $("#lightbox");
    if (p) {
      $("img", lb).src = D.images[p.dataset.k];
      $("p", lb).textContent = p.dataset.c;
      lb.classList.remove("hidden");
    } else if (e.target.closest("#lightbox")) lb.classList.add("hidden");
  });
})();
