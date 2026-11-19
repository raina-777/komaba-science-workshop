const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// http(s) の URL か、サイト内の相対パス(assets/posters/1.pdf など)だけを許可
const safeUrl = (u) => (/^https?:\/\//i.test(u) || /^\w[\w./-]*$/.test(u) ? esc(u) : "#");

const ICONS = {
  chart: '<path d="M6 42h36M6 42V6"/><path d="M12 34l8-10 7 5 13-17"/>',
  planet: '<circle cx="24" cy="24" r="11"/><ellipse cx="24" cy="24" rx="21" ry="6" transform="rotate(-20 24 24)"/>',
  atom: '<circle cx="24" cy="24" r="2.5"/><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/>',
  cell: '<path d="M14 5c0 10 20 10 20 19s-20 9-20 19M34 5c0 10-20 10-20 19s20 9 20 19"/><path d="M17 11h14M17 37h14"/>',
  sigma: '<path d="M38 10V6H10l15 18-15 18h28v-4"/>',
  dots: '<circle cx="11" cy="12" r="3"/><circle cx="26" cy="9" r="3"/><circle cx="38" cy="18" r="3"/><circle cx="18" cy="24" r="3"/><circle cx="32" cy="30" r="3"/><circle cx="10" cy="37" r="3"/><circle cx="24" cy="39" r="3"/>',
};

const icon = (name) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.dots}</svg>`;

function renderHeader() {
  document.getElementById("header").innerHTML = `
  <header class="site-header">
    <a class="logo" href="#top"><img src="assets/ksw-logo.png" width="1000" height="393" alt="${esc(SITE.name)}"></a>
  </header>`;
}

function renderFooter() {
  const sns = SITE.sns.label ? `<tr><th>SNS</th><td><a href="${safeUrl(SITE.sns.url)}" target="_blank" rel="noopener noreferrer">${esc(SITE.sns.label)}</a></td></tr>` : "";
  document.getElementById("footer").innerHTML = `
  <footer class="site-footer">
    <table><tbody>${sns}<tr><th>Mail</th><td>${esc(SITE.mail)}</td></tr></tbody></table>
    <p>Copyright&copy; ${esc(SITE.name)} All Rights Reserved.</p>
  </footer>`;
}

function poster(p, i) {
  const thumb = p.image ? `<img src="${safeUrl(p.image)}" alt="" width="96" height="96">` : icon(p.icon);
  const title = p.pdf
    ? `<a href="${safeUrl(p.pdf)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}<span class="pdf-tag">PDF</span></a>`
    : esc(p.title);
  const labels = p.labels.length
    ? `<ul class="labels" aria-label="ラベル">${p.labels.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`
    : "";
  return `
  <details class="poster" id="poster-${i + 1}">
    <summary>
      <span class="poster-thumb">${thumb}</span>
      <span class="poster-name">${esc(p.title)}</span>
      <svg class="poster-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.2 7.2a.75.75 0 0 1 1.1 0l3.7 4 3.7-4a.75.75 0 1 1 1.1 1l-4.3 4.6a.75.75 0 0 1-1 0L5.2 8.3a.75.75 0 0 1 0-1z"/></svg>
    </summary>
    <div class="poster-body">
      <h3>${title}</h3>
      ${labels}
      <p class="summary"><strong>概要:</strong>${p.summary ? esc(p.summary) : '<span class="note">準備中です。</span>'}</p>
    </div>
  </details>`;
}

function renderMain() {
  document.title = SITE.name;
  const f = SITE.festival;
  document.getElementById("main").innerHTML = `
  <h1>${esc(SITE.name)}</h1>

  <section>
    <h2>企画概要</h2>
    <p>${esc(SITE.intro)}</p>
  </section>

  <section>
    <h2>企画情報</h2>
    <dl class="info">
      <dt>開催日</dt><dd>${esc(SITE.dates)}</dd>
      <dt>会場</dt><dd>${esc(SITE.venue)}</dd>
      <dt>駒場祭 website</dt><dd><a href="${safeUrl(f.url)}" target="_blank" rel="noopener noreferrer">${esc(f.label)}</a></dd>
    </dl>
  </section>

  <section>
    <h2>ポスター一覧</h2>
    <div class="posters">${POSTERS.map(poster).join("")}</div>
  </section>`;
}

renderHeader();
renderMain();
renderFooter();
