const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => (/^https?:\/\//i.test(u) ? esc(u) : "#");
const groupUrl = (g) => `#group-${g.id}`;

const ICONS = {
  info: '<circle cx="24" cy="24" r="18"/><path d="M24 22v12M24 14v2"/>',
  chart: '<path d="M6 42h36M6 42V6"/><path d="M12 34l8-10 7 5 13-17"/>',
  planet: '<circle cx="24" cy="24" r="11"/><ellipse cx="24" cy="24" rx="21" ry="6" transform="rotate(-20 24 24)"/>',
  atom: '<circle cx="24" cy="24" r="2.5"/><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/>',
  cell: '<path d="M14 5c0 10 20 10 20 19s-20 9-20 19M34 5c0 10-20 10-20 19s20 9 20 19"/><path d="M17 11h14M17 37h14"/>',
  sigma: '<path d="M38 10V6H10l15 18-15 18h28v-4"/>',
  dots: '<circle cx="11" cy="12" r="3"/><circle cx="26" cy="9" r="3"/><circle cx="38" cy="18" r="3"/><circle cx="18" cy="24" r="3"/><circle cx="32" cy="30" r="3"/><circle cx="10" cy="37" r="3"/><circle cx="24" cy="39" r="3"/>',
  mic: '<rect x="17" y="5" width="14" height="24" rx="7"/><path d="M10 22a14 14 0 0 0 28 0M24 36v7M16 43h16"/>',
};

const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

function renderHeader(page) {
  const link = (href, label, key) => `<a class="nav-link${page === key ? " is-current" : ""}" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`;
  document.getElementById("header").innerHTML = `
  <header class="site-header">
    <a class="logo" href="#top"><img src="assets/ksw-logo.png" width="1000" height="393" alt="Komaba Science Workshop"></a>
    <button class="menu-button" id="menu-button" aria-expanded="false" aria-controls="nav" aria-label="メニュー">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
    <nav class="nav" id="nav" aria-label="メインメニュー">
      ${link("#top", "トップ", "top")}
      ${link("#about", "このイベントについて", "about")}
      ${link("#lectures", "ポスター発表", "lectures")}
    </nav>
  </header>`;

  const menuBtn = document.getElementById("menu-button");
  const nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

function renderFooter() {
  const sns = SITE.sns.label ? `<tr><th>SNS</th><td><a href="${safeUrl(SITE.sns.url)}" target="_blank" rel="noopener noreferrer">${esc(SITE.sns.label)}</a></td></tr>` : "";
  document.getElementById("footer").innerHTML = `
  <footer class="site-footer">
    <table><tbody>${sns}<tr><th>Mail</th><td>${esc(SITE.mail)}</td></tr></tbody></table>
    <p>Copyright&copy; ${esc(SITE.name)} All Rights Reserved.</p>
  </footer>`;
}

function shareButton() {
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent(document.title);
  const tag = encodeURIComponent(SITE.hashtag);
  return `<a class="share" target="_blank" rel="noopener noreferrer" href="https://x.com/intent/post?url=${url}&text=${text}&hashtags=${tag}">Xで共有</a>`;
}

function card({ href, title, sub, ic }) {
  return `<a class="card" href="${href}">
    <div class="card-visual"><div class="card-top"><span>${esc(title)}</span>${icon(ic)}</div><div class="card-bottom">${esc(sub)}</div></div>
    <div class="card-title">${esc(title)}</div>
  </a>`;
}

const TT_START_HOUR = 9;
const TT_HOURS = 10;

function timetableEvents() {
  return '<p class="tt-empty">調整中です</p>';
}

function timetable() {
  const ticks = Array.from({ length: TT_HOURS }, (_, i) => `<div class="tt-hour">${TT_START_HOUR + i}:00</div>`).join("");
  return `
  <div class="timetable">
    <div class="tt-tabs" role="tablist" aria-label="開催日">
      ${DAYS.map((d, i) => `<button role="tab" id="tt-tab-${i}" aria-controls="tt-panel" aria-selected="${i === 0}" class="tt-tab">${esc(d)}</button>`).join("")}
    </div>
    <div class="tt-body">
      <div class="tt-hours">${ticks}</div>
      <div class="tt-panel" id="tt-panel" role="tabpanel" aria-labelledby="tt-tab-0" style="height:${TT_HOURS * 60}px">${timetableEvents(0)}</div>
    </div>
  </div>`;
}

function bindTimetable() {
  const panel = document.getElementById("tt-panel");
  const tabs = [...document.querySelectorAll(".tt-tab")];
  tabs.forEach((tab, day) => tab.addEventListener("click", () => {
    tabs.forEach((t, i) => t.setAttribute("aria-selected", i === day));
    panel.setAttribute("aria-labelledby", `tt-tab-${day}`);
    panel.innerHTML = timetableEvents(day);
  }));
}

const PAGES = {
  top() {
    const html = PAGES.about();
    document.title = SITE.name;
    return html;
  },

  about() {
    document.title = `このイベントについて - ${SITE.name}`;
    return `
    <h1>${esc(SITE.name)} とは</h1><hr>
    <p>${esc(SITE.intro)}</p>
    ${shareButton()}
    <h2>展示について</h2>
    <p>${esc(SITE.room)}でポスター発表と展示を行います。作成者が会場で解説しますので、気になることがあればお気軽にご質問ください。</p>
    <h2>展示会場</h2>
    <p>${esc(SITE.venue)}</p>
    <ul class="plain-list">${GROUPS.map((g) => `<li><a href="${groupUrl(g)}">${esc(g.name)}</a></li>`).join("")}</ul>
    <h2>ポスター発表会場</h2>
    <p>${esc(TALK.place)}で<a href="#lectures">ポスター発表</a>を行います。</p>
    <h2>開催日</h2>
    <p>${esc(SITE.dates)}</p>
    <p class="note">${esc(SITE.footerNote)}</p>`;
  },

  group(id) {
    const g = GROUPS.find((x) => x.id === id);
    if (!g) return PAGES.top();
    document.title = `${g.name} - ${SITE.name}`;
    return `
    <h1>${esc(g.name)}</h1><hr>
    ${g.summary ? `<p>${esc(g.summary)}</p>` : ""}
    <p><strong>展示場所:</strong>${esc(g.place)}</p>
    ${shareButton()}
    <h2>展示内容</h2>
    <div class="topics">${g.topics.map(([t, d]) => `<section class="topic"><h3>${esc(t)}</h3><p>${esc(d)}</p></section>`).join("")}</div>`;
  },

  lectures() {
    document.title = `ポスター発表 - ${SITE.name}`;
    return `
    <h1>ポスター発表</h1><hr>
    <p>${esc(TALK.place)}にて、ポスター発表を行います。</p>
    ${shareButton()}
    ${DAYS.map((d, i) => `<h2>${i + 1}日目(${esc(d)})</h2><p class="note">調整中です。</p>`).join("")}
    <h2>注意事項</h2>
    <p class="note">${esc(SITE.footerNote)}</p>`;
  },
};

// #group-astrophysics → ページ "group"、引数 "astrophysics"
function route() {
  const [name, ...rest] = location.hash.slice(1).split("-");
  const page = Object.hasOwn(PAGES, name) ? name : "top";
  const arg = rest.join("-");
  renderHeader(page);
  document.getElementById("main").innerHTML = PAGES[page](arg);
  if (document.getElementById("tt-panel")) bindTimetable();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);

renderFooter();
route();
