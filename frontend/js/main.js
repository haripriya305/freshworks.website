/* ===========================================================
   FreshWorks — Global behaviors: theme, nav render, footer
=========================================================== */

(function initTheme(){
  const saved = localStorage.getItem('fw_theme');
  const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fw_theme', next);
  const btn = document.querySelector('.theme-toggle');
  if(btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

function renderNav(activeHref){
  const mount = document.getElementById('site-nav');
  if(!mount || typeof SITE_DATA === 'undefined') return;
  const links = SITE_DATA.nav.map(l =>
    `<a href="${l.href}" class="${l.href === activeHref ? 'active' : ''}">${l.label}</a>`
  ).join('');
  let user = null;
  try { user = JSON.parse(localStorage.getItem('fw_user') || 'null'); } catch(e){}
  const authLinks = (user && localStorage.getItem('fw_token'))
    ? `<a class="btn btn-outline btn-sm" href="dashboard.html">Dashboard</a>
       ${user.role === 'admin' ? '<a class="btn btn-outline btn-sm" href="admin.html">Admin</a>' : ''}
       <button class="btn btn-primary btn-sm" id="nav-logout">Log out</button>`
    : `<a class="btn btn-outline btn-sm" href="login.html">Log in</a>
       <a class="btn btn-primary btn-sm" href="register.html">Start free trial</a>`;

  mount.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo"><span class="dot"></span>${SITE_DATA.brand.name}</a>
      <nav class="nav-links" id="nav-links">${links}</nav>
      <div class="nav-actions">
        ${authLinks}
        <button class="theme-toggle" aria-label="Toggle dark mode">${document.documentElement.getAttribute('data-theme')==='dark'?'☀️':'🌙'}</button>
        <button class="nav-burger" aria-label="Menu">☰</button>
      </div>
    </div>`;

  mount.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  mount.querySelector('.nav-burger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });
  const logoutBtn = mount.querySelector('#nav-logout');
  if(logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('fw_token');
    localStorage.removeItem('fw_user');
    window.location.href = 'index.html';
  });
}

function renderFooter(){
  const mount = document.getElementById('site-footer');
  if(!mount || typeof SITE_DATA === 'undefined') return;
  const b = SITE_DATA.brand;
  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="logo" style="margin-bottom:12px;"><span class="dot"></span>${b.name}</div>
          <p class="muted" style="max-width:260px;">${b.tagline}.</p>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <a href="features.html">Features</a>
          <a href="pricing.html">Pricing</a>
          <a href="blog.html">Blog</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Get in touch</h4>
          <a href="mailto:${b.email}">${b.email}</a>
          <a href="tel:${b.phone}">${b.phone}</a>
          <a href="#">${b.address}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${b.name}. All rights reserved.</span>
        <span>Built with a unified inbox, naturally.</span>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  renderNav(path);
  renderFooter();
});
