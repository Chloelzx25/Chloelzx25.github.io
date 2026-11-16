// Renders the page from content.js. Edit content.js, not this file.
(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);

  // Small helper: create an element with attributes and children.
  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "text") node.textContent = v;
      else if (k === "class") node.className = v;
      else node.setAttribute(k, v);
    }
    for (const kid of kids.flat()) if (kid) node.append(kid);
    return node;
  }

  // Simple text fields
  document.querySelectorAll("[data-text]").forEach((n) => {
    n.textContent = S[n.dataset.text] || "";
  });
  if (S.availability) $(".status").lastElementChild.textContent += " · " + S.availability;
  if (!S.status) $(".status").remove();

  // Resume button
  const resumeBtn = $("#resume-btn");
  if (S.resume) resumeBtn.href = S.resume;
  else resumeBtn.remove();

  // Side links + contact links
  const links = [
    ["Email", S.email && "mailto:" + S.email, "↗"],
    ["GitHub", S.github, "↗"],
    ["LinkedIn", S.linkedin, "↗"],
    ["Resume", S.resume, "PDF"],
  ].filter((l) => l[1]);
  for (const [label, href, hint] of links) {
    const ext = href.startsWith("http");
    $("#side-links").append(
      el("a", { href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null, download: label === "Resume" ? "" : null },
        el("span", { text: label }), el("span", { text: hint }))
    );
    if (label !== "Email") {
      $("#contact-links").append(
        el("a", { class: "btn", href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null, download: label === "Resume" ? "" : null, text: label })
      );
    }
  }
  if (S.email) {
    const ce = $("#contact-email");
    ce.href = "mailto:" + S.email;
    ce.textContent = S.email;
  }

  // About
  S.about.forEach((p) => $("#about-text").append(el("p", { text: p })));
  S.facts.forEach(([k, v]) => $("#facts").append(el("div", {}, el("dt", { text: k }), el("dd", { text: v }))));


  // Placeholder drawings for projects without a screenshot, one per area.
  const motifs = {
    "Data & AI":
      '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 106h192"/><rect x="14" y="62" width="22" height="44"/><rect x="50" y="40" width="22" height="66"/><rect x="86" y="70" width="22" height="36"/><rect x="122" y="22" width="22" height="84"/><rect x="158" y="48" width="22" height="58"/><path d="M25 52 61 30l36 32 36-50 36 28" stroke-dasharray="4 4"/></svg>',
    Backend:
      '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="70" height="26" rx="3"/><rect x="4" y="44" width="70" height="26" rx="3"/><rect x="4" y="80" width="70" height="26" rx="3"/><rect x="126" y="36" width="70" height="40" rx="3"/><path d="M74 21h26v35h26M74 57h52M74 93h26V56"/><circle cx="16" cy="21" r="3"/><circle cx="16" cy="57" r="3"/><circle cx="16" cy="93" r="3"/></svg>',
    Databases:
      '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="80" height="98" rx="3"/><path d="M4 26h80M4 46h80M4 66h80M4 86h80M36 6v98"/><rect x="116" y="6" width="80" height="58" rx="3"/><path d="M116 26h80M116 45h80M148 6v58M84 36h32"/></svg>',
    "Design & UX":
      '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="4" width="54" height="102" rx="8"/><path d="M30 22h34M30 32h22"/><rect x="30" y="44" width="34" height="22" rx="2"/><path d="M30 76h34M30 86h26"/><rect x="118" y="4" width="54" height="102" rx="8"/><path d="M128 22h34"/><circle cx="145" cy="52" r="14"/><path d="M128 82h34M128 92h20M74 55h44" stroke-dasharray="4 4"/></svg>',
    Security:
      '<svg viewBox="0 0 200 110" fill="none" stroke="currentColor" stroke-width="2"><path d="M100 4 60 18v32c0 28 18 46 40 56 22-10 40-28 40-56V18z"/><rect x="84" y="50" width="32" height="26" rx="3"/><path d="M90 50v-8a10 10 0 0 1 20 0v8"/><path d="M4 30h40M4 50h30M4 70h40M156 30h40M166 50h30M156 70h40" stroke-dasharray="3 5"/></svg>',
  };

  function shot(p) {
    const box = el("div", { class: "shot" });
    if (p.img) {
      box.append(el("img", { src: p.img, alt: p.alt || "Screenshot of " + p.title, loading: "lazy", width: "800", height: "500" }));
    } else {
      const ph = el("div", { class: "shot-placeholder", "aria-hidden": "true" },
        el("span", { class: "tag", text: p.area }),
        el("span", { class: "glyph", text: p.short || p.title }));
      ph.insertAdjacentHTML("beforeend", motifs[p.area] || motifs["Data & AI"]);
      box.append(ph);
    }
    return box;
  }

  // ---------- Media blocks: video, chart gallery, auto-advancing slides ----------
  const on = (node, ev, fn) => { node.addEventListener(ev, fn); return node; };

  let lb; // one shared "enlarge image" dialog
  function openLightbox(it) {
    if (!lb) {
      lb = el("dialog", { class: "lightbox", "aria-label": "Enlarged chart" },
        on(el("button", { type: "button", class: "lb-close", text: "Close" }), "click", () => lb.close()),
        el("img", { alt: "" }), el("p", { class: "lb-cap" }));
      on(lb, "click", (e) => { if (e.target === lb) lb.close(); });
      document.body.append(lb);
    }
    const img = lb.querySelector("img");
    img.src = it.src;
    img.alt = it.alt || "";
    lb.querySelector(".lb-cap").textContent = it.title + (it.note ? ". " + it.note : "");
    lb.showModal();
  }

  function video(m) {
    return el("div", { class: "video" },
      el("video", { controls: "", playsinline: "", preload: "none", poster: m.poster, src: m.src, width: "960", height: "600" }),
      m.caption ? el("p", { class: "media-cap", text: m.caption }) : null);
  }

  function gallery(m) {
    return el("div", { class: "gallery" }, m.items.map((it) =>
      el("figure", {},
        on(el("button", { type: "button", class: "gal-img", "aria-label": "Enlarge chart: " + it.title },
          el("img", { src: it.src, alt: it.alt, loading: "lazy", width: "700", height: "420" })), "click", () => openLightbox(it)),
        el("figcaption", {}, el("strong", { text: it.title }), it.note ? el("span", { text: it.note }) : null))));
  }

  function slides(m) {
    const items = m.items, n = items.length;
    let i = 0, timer = null, paused = false, inView = true, held = false;
    const img = el("img", { width: "1000", height: "563", loading: "lazy" });
    const cap = el("p", { class: "slide-cap" });
    const count = el("span", { class: "slide-count" });
    const stage = el("div", { class: "slide-stage" }, img);
    const toggle = el("button", { type: "button", class: "ctl" });
    const dots = items.map((it, k) =>
      on(el("button", { type: "button", class: "dot", "aria-label": "Slide " + (k + 1) + ": " + it.title }), "click", () => go(k)));
    function show() {
      img.src = items[i].src;
      img.alt = items[i].alt;
      cap.textContent = items[i].title;
      count.textContent = i + 1 + " / " + n;
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
      stage.setAttribute("aria-live", paused ? "polite" : "off");
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    }
    // One timer for the life of the page. Each beat it checks whether it should advance.
    function tick() {
      clearInterval(timer);
      timer = setInterval(() => { if (!paused && !held && inView) { i = (i + 1) % n; show(); } }, m.interval || 5000);
    }
    function go(k) { i = (k + n) % n; show(); tick(); }
    const box = el("div", { class: "slides" }, stage,
      el("div", { class: "slide-bar" },
        on(el("button", { type: "button", class: "ctl", text: "Previous" }), "click", () => go(i - 1)),
        on(el("button", { type: "button", class: "ctl", text: "Next" }), "click", () => go(i + 1)),
        on(toggle, "click", () => { paused = !paused; show(); tick(); }),
        count, el("span", { class: "dots" }, dots)),
      cap);
    // Pause only while keyboard focus is inside (so Next/Previous can be used calmly) or the card
    // is scrolled out of view. Hovering with a mouse or tapping does NOT pause it.
    on(box, "focusin", (e) => { try { held = e.target.matches(":focus-visible"); } catch (err) { held = false; } });
    on(box, "focusout", () => { held = false; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => { inView = es[es.length - 1].isIntersecting; }).observe(box);
    }
    tick();
    show();
    return box;
  }

  function media(p) {
    const make = { video, gallery, slides };
    return el("div", { class: "media" }, p.media.filter((m) => make[m.type]).map((m) =>
      el("section", { class: "media-block", "aria-label": m.label },
        el("span", { class: "note-label", text: m.label }), make[m.type](m))));
  }

  function card(p) {
    const body = el("div", { class: "project-body" },
      el("div", { class: "meta" },
        el("span", { class: "area", text: p.area }),
        el("span", { text: p.module }),
        p.date ? el("span", { text: "Completed " + p.date }) : null),
      el("h3", { text: p.title }),
      p.team ? el("p", { class: "team", text: p.team }) : null,
      el("p", { class: "summary", text: p.summary }),
      p.did && p.did.length ? el("ul", { class: "did" }, p.did.map((d) => el("li", { text: d }))) : null,
      ...[["Key decision", p.decision], ["How I checked it", p.checked], ["What I'd do next", p.next]]
        .filter(([, text]) => text)
        .map(([label, text]) => el("div", { class: "note-block" }, el("span", { class: "note-label", text: label }), el("p", { text }))),
      el("ul", { class: "stack", "aria-label": "Tools used" }, (p.stack || []).map((s) => el("li", { text: s }))),
      p.repo || p.live
        ? el("div", { class: "project-links" },
            p.live ? el("a", { href: p.live, target: "_blank", rel: "noopener", text: "Live demo ↗" }) : null,
            p.repo ? el("a", { href: p.repo, target: "_blank", rel: "noopener", text: "Code ↗" }) : null)
        : null
    );
    const numbers = p.featured && p.numbers && p.numbers.length
      ? el("div", { class: "numbers" }, p.numbers.map(([v, l]) => el("div", {}, el("strong", { text: v }), el("span", { text: l }))))
      : null;
    const side = p.featured ? el("div", { class: "feature-side" }, shot(p), numbers) : shot(p);
    return el("article", { class: "project" + (p.featured ? " featured" : "") + (p.media ? " has-media" : ""), id: "project-" + p.id, "data-area": p.area },
      side, body, p.media && p.media.length ? media(p) : null);
  }

  // Projects + filters
  const list = $("#project-list");
  S.projects.forEach((p) => list.append(card(p)));

  const areas = ["All", ...new Set(S.projects.map((p) => p.area))];
  areas.forEach((a) => {
    const n = a === "All" ? S.projects.length : S.projects.filter((p) => p.area === a).length;
    const b = el("button", { type: "button", "aria-pressed": a === "All" ? "true" : "false" },
      a, el("span", { class: "count", text: String(n) }));
    b.addEventListener("click", () => {
      document.querySelectorAll("#filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      list.querySelectorAll(".project").forEach((c) => {
        c.hidden = a !== "All" && c.dataset.area !== a;
      });
    });
    $("#filters").append(b);
  });

  // Skills
  const byId = Object.fromEntries(S.projects.map((p) => [p.id, p]));
  S.skills.forEach((g) => {
    $("#skill-list").append(
      el("div", { class: "skill-group" },
        el("h3", { text: g.group }),
        el("ul", {}, g.items.map((s) =>
          el("li", {},
            el("span", { text: s.name }),
            el("span", { class: "proof" }, (s.proof || []).filter((id) => byId[id]).map((id) =>
              el("a", { href: "#project-" + id, "data-project": id, text: byId[id].short || byId[id].title })))
          ))))
    );
  });
  (S.softSkills || []).forEach(([name, from]) =>
    $("#soft-list").append(el("li", {}, el("strong", { text: name }), el("span", { text: from }))));

  // Clicking a skill's project link: show all projects and highlight that card.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-project]");
    if (!a) return;
    const target = document.getElementById("project-" + a.dataset.project);
    if (target.hidden) document.querySelector("#filters button").click();
    target.classList.remove("flash");
    void target.offsetWidth;
    target.classList.add("flash");
  });

  // Experience + education
  S.experience.forEach((x) => $("#experience-list").append(
    el("div", { class: "entry" },
      el("div", { class: "dates", text: x.dates }),
      el("div", {},
        el("h3", { text: x.title }),
        el("p", { class: "org", text: x.org }),
        el("ul", {}, x.points.map((p) => el("li", { text: p })))))));
  S.education.forEach((x) => $("#education-list").append(
    el("div", { class: "entry" },
      el("div", { class: "dates", text: x.dates }),
      el("div", {},
        el("h3", { text: x.school }),
        el("p", { class: "org", text: x.award }),
        x.note ? el("span", { class: "note", text: x.note }) : null))));
  if (S.certifications && S.certifications.length) {
    $("#cert-wrap").hidden = false;
    S.certifications.forEach(([name, by, year]) =>
      $("#cert-list").append(el("li", {}, el("strong", { text: name }), el("span", { text: [by, year].filter(Boolean).join(" · ") }))));
  }

  $("#year").textContent = new Date().getFullYear();

  // Phone menu
  const menuBtn = $(".menu-btn");
  const nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    $(".side").classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") && nav.classList.contains("open")) menuBtn.click();
  });
  $("#side-links").addEventListener("click", () => {
    if (nav.classList.contains("open")) menuBtn.click();
  });

  // Highlight the nav link for the section in view.
  const navLinks = [...nav.querySelectorAll("a")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
  function setActive() {
    let current = null;
    const line = window.innerHeight * 0.3;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.length - 1;
    navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
