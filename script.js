/* ─────────────────────────────────────────────────────────────
   HomeBrain — script.js  (homepage)
   Lê dados de content.js e renderiza produtos, trilhas,
   categorias e a animação do cérebro neural.
───────────────────────────────────────────────────────────── */

// Aguarda o content.js estar carregado
(function init() {
  if (!window.HB || !window.HB.content) {
    return requestAnimationFrame(init);
  }
  run();
})();

function run() {
  const { products, trails, categories } = window.HB.content;

  // ── HELPERS ────────────────────────────────────────────────
  const TYPE_LABELS = {
    ebook: "eBook", audiobook: "Audiobook",
    video: "Vídeo", curso: "Curso",
  };

  function stars(n) {
    let s = '<span class="hb-stars">';
    for (let i = 1; i <= 5; i++) {
      s += `<span class="hb-star${i > n ? " empty" : ""}">★</span>`;
    }
    s += `<span class="hb-reviews">(${n * 100 - 76})</span>`;
    return s + "</span>";
  }

  // ── PRODUTOS (homepage) ───────────────────────────────────
  const productsRow = document.getElementById("productsRow");
  if (productsRow) {
    const featured = products.filter(p => p.featured);
    productsRow.innerHTML = featured.map(p => `
      <article class="hb-product-card" onclick="window.location='produto.html?id=${p.id}'" style="cursor:pointer" tabindex="0">
        <div class="hb-product-thumb" style="background-image:url('${p.image}')">
          <span class="hb-type-badge">${TYPE_LABELS[p.type] || p.type}</span>
        </div>
        <div class="hb-product-body">
          <div class="hb-product-title">${p.title}</div>
          <div class="hb-product-desc">${p.description}</div>
          ${stars(p.rating)}
          <div class="hb-price">${p.priceFormatted}</div>
          <button class="hb-buy-btn" onclick="event.stopPropagation();window.location='produto.html?id=${p.id}'">Acessar grátis</button>
        </div>
      </article>
    `).join("");

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () =>
        productsRow.scrollBy({ left: 210, behavior: "smooth" })
      );
    }
  }

  // ── TRILHAS (homepage) ────────────────────────────────────
  const trailsGrid = document.getElementById("trailsGrid");
  if (trailsGrid) {
    trailsGrid.innerHTML = trails.slice(0, 4).map(t => {
      const pct = Math.round((t.completed / t.lessons) * 100);
      return `
        <article class="hb-trail-card" onclick="window.location='trilhas.html'" style="cursor:pointer;background-image:url('${t.image}')">
          <div class="hb-trail-overlay">
            <div class="hb-trail-label">Trilha</div>
            <div class="hb-trail-title">${t.title}</div>
            <div class="hb-trail-aulas">${t.completed}/${t.lessons} aulas</div>
            <div class="hb-trail-bar">
              <div class="hb-trail-progress" style="width:${pct}%"></div>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // ── CATEGORIAS (sidebar homepage) ────────────────────────
  const categoryList = document.getElementById("categoryList");
  if (categoryList) {
    categoryList.innerHTML = categories.map(c => `
      <li class="hb-cat-item" onclick="window.location='categorias.html'" style="cursor:pointer">
        <div class="hb-cat-dot" style="background:${c.color}22;overflow:hidden;border-radius:9px">
          <img src="${c.image}" alt="${c.name}" style="width:100%;height:100%;object-fit:cover;opacity:.8" loading="lazy"/>
        </div>
        <div class="hb-cat-info">
          <div class="hb-cat-name">${c.name}</div>
          <div class="hb-cat-count">${products.filter(p => p.category === c.name).length} produtos</div>
        </div>
        <svg class="hb-cat-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </li>
    `).join("");
  }
}

// ── BRAIN CANVAS ─────────────────────────────────────────────
(function () {
  const canvas = document.getElementById("brainCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0;

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    initParticles();
  }

  function makeBrainPath() {
    const cx = W / 2, cy = H / 2;
    const rx = W * 0.42, ry = H * 0.42;
    const p = new Path2D();
    p.moveTo(cx, cy - ry * 0.9);
    p.bezierCurveTo(cx - rx * 0.25, cy - ry, cx - rx * 0.85, cy - ry * 0.75, cx - rx * 0.92, cy - ry * 0.25);
    p.bezierCurveTo(cx - rx * 1.0,  cy + ry * 0.15, cx - rx * 0.88, cy + ry * 0.55, cx - rx * 0.55, cy + ry * 0.72);
    p.bezierCurveTo(cx - rx * 0.35, cy + ry * 0.82, cx - rx * 0.1,  cy + ry * 0.85, cx, cy + ry * 0.8);
    p.bezierCurveTo(cx + rx * 0.1,  cy + ry * 0.85, cx + rx * 0.35, cy + ry * 0.82, cx + rx * 0.55, cy + ry * 0.72);
    p.bezierCurveTo(cx + rx * 0.88, cy + ry * 0.55, cx + rx * 1.0,  cy + ry * 0.15, cx + rx * 0.92, cy - ry * 0.25);
    p.bezierCurveTo(cx + rx * 0.85, cy - ry * 0.75, cx + rx * 0.25, cy - ry, cx, cy - ry * 0.9);
    p.closePath();
    return p;
  }

  const TOTAL = 130;
  let particles = [];

  function initParticles() {
    particles = [];
    const path = makeBrainPath();
    const cx = W / 2, cy = H / 2;
    const rx = W * 0.42, ry = H * 0.42;
    let attempts = 0;
    while (particles.length < TOTAL && attempts < 8000) {
      attempts++;
      const x = cx + (Math.random() * 2 - 1) * rx;
      const y = cy + (Math.random() * 2 - 1) * ry;
      if (ctx.isPointInPath(path, x, y)) {
        particles.push({
          ox: x, oy: y, x, y,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.022 + 0.008,
          ampX: Math.random() * 5 + 1,
          ampY: Math.random() * 5 + 1,
          r: Math.random() > 0.75 ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.5,
          bright: Math.random() > 0.75,
          hue: Math.random() > 0.5 ? 215 : 260,
        });
      }
    }
  }

  function drawHouse(cx, cy, size) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(120,180,255,0.9)";
    ctx.shadowBlur = 18;
    ctx.strokeStyle = "rgba(200,220,255,0.85)";
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.52);
    ctx.lineTo(cx - size * 0.48, cy - size * 0.06);
    ctx.lineTo(cx + size * 0.48, cy - size * 0.06);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(cx - size * 0.36, cy - size * 0.06, size * 0.72, size * 0.58);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(cx - size * 0.12, cy + size * 0.18, size * 0.24, size * 0.34);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const path = makeBrainPath();
    const cx = W / 2, cy = H / 2;

    ctx.save();
    ctx.clip(path);
    const grd = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy, W * 0.45);
    grd.addColorStop(0,   "rgba(80,90,200,0.22)");
    grd.addColorStop(0.5, "rgba(50,60,160,0.12)");
    grd.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "rgba(80,140,255,0.7)";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "rgba(90,150,255,0.55)";
    ctx.lineWidth = 1.5;
    ctx.stroke(path);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - H * 0.36);
    ctx.lineTo(cx, cy + H * 0.36);
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = "rgba(100,150,255,0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    particles.forEach(p => {
      p.phase += p.speed;
      p.x = p.ox + Math.sin(p.phase * 1.2 + 1) * p.ampX;
      p.y = p.oy + Math.cos(p.phase) * p.ampY;
    });

    const CONN = Math.min(W, H) * 0.2;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN) {
          const a = (1 - d / CONN) * 0.38;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(${particles[i].hue},80%,65%,${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      const pulse = 0.72 + Math.sin(p.phase) * 0.28;
      const r = p.r * pulse;
      if (p.bright) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0,   `hsla(${p.hue},90%,80%,0.9)`);
        g.addColorStop(0.4, `hsla(${p.hue},70%,60%,0.35)`);
        g.addColorStop(1,   "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.bright ? `hsla(${p.hue},90%,85%,0.95)` : `hsla(${p.hue},75%,70%,0.6)`;
      ctx.fill();
    });

    drawHouse(cx, cy + H * 0.06, Math.min(W, H) * 0.26);
    requestAnimationFrame(draw);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();
  draw();
})();
