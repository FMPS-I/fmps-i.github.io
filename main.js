/* ============================
   FMPS-i · Global JS
   ============================ */

// ── NAVIGATION ──
function buildNav(activePage) {
  const pages = [
    { href: 'index.html',          label: 'Accueil' },
    { href: 'revendications.html', label: 'Revendications' },
    { href: 'droits.html',         label: 'Nos droits' },
    { href: 'elections.html',      label: 'Élections' },
    { href: 'contact.html',        label: 'Délégués',  cta: true },
  ];

  const navEl = document.getElementById('main-nav');
  const mobileEl = document.getElementById('mobile-menu');
  if (!navEl) return;

  const logo = `
    <a href="index.html" class="nav-logo">
      <span class="star">★</span>FMPS-i
      <span class="sub">HUBSAFE</span>
    </a>`;

  const links = pages.map(p => {
    const isActive = p.href === activePage;
    if (p.cta) {
      return `<li class="nav-cta"><a href="${p.href}"${isActive ? ' class="active"' : ''}>${p.label}</a></li>`;
    }
    return `<li><a href="${p.href}"${isActive ? ' class="active"' : ''}>${p.label}</a></li>`;
  }).join('');

  const hamburger = `<button class="hamburger" onclick="toggleMobile()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>`;

  navEl.innerHTML = logo + `<ul class="nav-links">${links}</ul>` + hamburger;

  if (mobileEl) {
    mobileEl.innerHTML = pages.map(p =>
      `<a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a>`
    ).join('');
  }
}

function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ── SCROLL REVEAL ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── COUNTDOWN ──
function initCountdown(targetDate, ids) {
  function tick() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) {
      Object.values(ids).forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '00'; });
      return;
    }
    const vals = {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
    Object.entries(ids).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(vals[key]).padStart(2, '0');
    });
  }
  tick();
  setInterval(tick, 1000);
}

// ── FOOTER ──
function buildFooter() {
  const el = document.getElementById('main-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-logo"><span class="star">★</span>FMPS-i</div>
    <div class="footer-tagline">Force Militante Pour le Social & l'Indépendance</div>
    <nav class="footer-nav">
      <a href="index.html">Accueil</a>
      <a href="revendications.html">Revendications</a>
      <a href="droits.html">Nos droits</a>
      <a href="elections.html">Élections</a>
      <a href="contact.html">Délégués</a>
    </nav>
    <div class="footer-bottom">
      © 2026 FMPS-i · HUBSAFE · CDG · Orly · Le Bourget<br>
      La déclaration d'accident du travail ne vaut pas reconnaissance automatique — la CPAM examine le dossier.
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  buildFooter();
});
