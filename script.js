/* =====================================================
   DATA ANDA — ubah bagian ini saja
   Semua daftar di bawah masih KOSONG. Tambahkan isi dengan menyalin
   contoh format di komentar, lalu hapus tanda // di depannya.
   Selama kosong, tab menampilkan pesan "Segera hadir".
   ===================================================== */
const PROFILE = {
  roles: ["Mahasiswi Fisika UPI", "Pemodelan Matematika", "Analisis Strategi Bisnis"],
  email: "nadiranurdiani06@student.upi.edu",
};

// PROJECTS — studi kasus / proyek analitis
// demo = tautan laporan, slide, atau Drive (boleh kosong); image = "images/nama.png" (boleh kosong)
const PROJECTS = [
  // {
  //   title: "Judul Project",
  //   desc: "Deskripsi singkat (1-2 kalimat).",
  //   long: "Penjelasan lebih panjang untuk jendela detail.",
  //   features: ["Poin utama 1", "Poin utama 2"],
  //   tech: ["Pemodelan Matematika", "Analisis Data"],
  //   demo: "", repo: "", image: "",
  // },
];

// SERTIFIKAT
const CERTIFICATES = [
  // { title: "Nama Sertifikat", issuer: "Penerbit", year: "2025", image: "" },
];

// SKILLS — [ikon, nama]
const SKILLS = [
  // ["∑", "Pemodelan Matematika"],
];

// LOMBA — rank contoh: "Juara 1", "Finalis", "Peserta"
const LOMBA = [
  // { title: "Nama Lomba", organizer: "Penyelenggara", year: "2025", rank: "Finalis", desc: "Ringkasan singkat.", link: "", image: "" },
];

// ORGANISASI
const ORGANISASI = [
  // { title: "Nama Organisasi", subtitle: "Jabatan", period: "2024 - sekarang", desc: "Peran dan capaian." },
];

// EXPERIENCE — magang, kerja, volunteer, dll.
const EXPERIENCE = [
  // { title: "Posisi", subtitle: "Perusahaan / Lembaga", period: "Jun 2025 - Agu 2025", desc: "Tugas dan capaian." },
];

const PROJECTS_VISIBLE = 6;

/* =====================================================
   KODE — biasanya tidak perlu diubah
   ===================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Splash
window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 1800);
});

// Footer year
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$("#menu a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

// Typing effect
(function typing() {
  const el = $("#typed");
  let r = 0, i = 0, del = false;
  function tick() {
    const word = PROFILE.roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; r = (r + 1) % PROFILE.roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 80);
  }
  tick();
})();

// Helpers
function emptyState(text) {
  return `<aside class="empty"><span>✦</span><p>${esc(text)}</p><small>Segera hadir</small></aside>`;
}
function fill(el, items, renderItem, emptyText) {
  el.innerHTML = items.length ? items.map(renderItem).join("") : emptyState(emptyText);
  el.classList.toggle("is-empty", !items.length);
}
function thumb(item, fallbackText) {
  return item.image
    ? `<div class="thumb"><img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy"></div>`
    : `<div class="thumb">${esc(fallbackText)}</div>`;
}

// Projects
const grid = $("#project-grid"), moreBtn = $("#see-more");
let expanded = false;
function renderProjects() {
  const list = expanded ? PROJECTS : PROJECTS.slice(0, PROJECTS_VISIBLE);
  fill(grid, list, (p, i) => `
    <article class="card">
      ${thumb(p, p.title.charAt(0))}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc || "")}</p>
      <div class="row">
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Lihat ↗</a>` : `<span></span>`}
        <button data-i="${i}">Details →</button>
      </div>
    </article>`, "Project belum ditambahkan.");
  moreBtn.hidden = PROJECTS.length <= PROJECTS_VISIBLE;
  moreBtn.textContent = expanded ? "See Less ⌃" : "See More ⌄";
}
moreBtn.addEventListener("click", () => { expanded = !expanded; renderProjects(); });
renderProjects();

// Project detail dialog
const dlg = $("#detail");
grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-i]");
  if (!btn) return;
  const p = PROJECTS[btn.dataset.i];
  $("#detail-body").innerHTML = `
    <h3 class="grad">${esc(p.title)}</h3>
    ${thumb(p, p.title.charAt(0))}
    <p class="muted" style="margin-top:14px">${esc(p.long || p.desc || "")}</p>
    ${p.features?.length ? `<h4>Poin Utama</h4><ul class="feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${p.tech?.length ? `<h4>Metode &amp; Fokus</h4><div class="tags">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
    <div class="actions">
      ${p.demo ? `<a class="btn primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Lihat ↗</a>` : ""}
      ${p.repo ? `<a class="btn ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">Sumber</a>` : ""}
    </div>`;
  dlg.showModal();
});
$("#detail-close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

// Sertifikat
fill($("#cert-grid"), CERTIFICATES, (c) => `
  <article class="card cert">
    ${c.image
      ? `<div class="thumb"><img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy"></div>`
      : `<div class="thumb"><b>${esc(c.title)}</b><small>${esc(c.issuer || "")} ${c.year ? "· " + esc(c.year) : ""}</small></div>`}
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.issuer || "")} ${c.year ? "· " + esc(c.year) : ""}</p>
  </article>`, "Sertifikat belum ditambahkan.");

// Skills
fill($("#tech-grid"), SKILLS, ([icon, name]) =>
  `<div><span class="ico">${esc(icon)}</span>${esc(name)}</div>`, "Skills belum ditambahkan.");

// Lomba
fill($("#lomba-grid"), LOMBA, (l) => `
  <article class="card">
    ${l.image ? `<div class="thumb"><img src="${esc(l.image)}" alt="${esc(l.title)}" loading="lazy"></div>` : `<div class="thumb">🏆</div>`}
    ${l.rank ? `<span class="rank">${esc(l.rank)}</span>` : ""}
    <h3>${esc(l.title)}</h3>
    <p class="one">${esc(l.organizer || "")} ${l.year ? "· " + esc(l.year) : ""}</p>
    ${l.desc ? `<p>${esc(l.desc)}</p>` : ""}
    ${l.link ? `<div class="row"><a href="${esc(l.link)}" target="_blank" rel="noopener">Lihat ↗</a><span></span></div>` : ""}
  </article>`, "Lomba belum ditambahkan.");

// Organisasi & Experience (timeline)
const timelineItem = (t) => `
  <article class="tl-item">
    <h3>${esc(t.title)}</h3>
    <div class="meta">${esc(t.subtitle || "")}${t.subtitle && t.period ? " · " : ""}${esc(t.period || "")}</div>
    ${t.desc ? `<p>${esc(t.desc)}</p>` : ""}
  </article>`;
fill($("#org-list"), ORGANISASI, timelineItem, "Pengalaman organisasi belum ditambahkan.");
fill($("#exp-list"), EXPERIENCE, timelineItem, "Experience belum ditambahkan.");

// Tabs
function openTab(id) {
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
  $$(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + id));
}
$$(".tab").forEach((t) => t.addEventListener("click", () => openTab(t.dataset.tab)));
$$("[data-tab-go]").forEach((a) => a.addEventListener("click", () => openTab(a.dataset.tabGo)));

// Stats (hitung otomatis dari data)
function countUp(el, to) {
  const t0 = performance.now();
  (function step(t) {
    const k = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(to * k);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
const targets = { "stat-projects": PROJECTS.length, "stat-certs": CERTIFICATES.length, "stat-lomba": LOMBA.length };
const statObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    Object.entries(targets).forEach(([id, n]) => countUp(document.getElementById(id), n));
    statObs.disconnect();
  });
}, { threshold: 0.4 });
statObs.observe($(".stats"));

// Reveal on scroll
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("show"); revObs.unobserve(e.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => revObs.observe(el));

// Active nav link
const links = $$("#menu a");
const secObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach((s) => secObs.observe(s));

// Contact form -> membuka aplikasi email
$("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent("Pesan dari portofolio: " + f.get("nama"));
  const body = encodeURIComponent(`${f.get("pesan")}\n\n— ${f.get("nama")} (${f.get("email")})`);
  location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
});
