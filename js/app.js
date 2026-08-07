/* ============================================================================
   app.js — renders the whole site from content/portfolio.js
   No framework, no build step. Everything is a string of HTML built from data.
   ========================================================================== */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  if (!D) { console.error("portfolio.js did not load"); return; }

  /* ---------- helpers ---------------------------------------------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  /* rich() allows the small inline tag set used in content copy */
  function rich(s) { return String(s == null ? "" : s); }

  function img(m, sizes, cls, ratio) {
    if (!m) return "";
    var ws = m.widths || [1000];
    var mid = ws[Math.min(1, ws.length - 1)];
    var srcset = ws.map(function (w) {
      return "assets/images/" + m.stem + "-" + w + ".webp " + w + "w";
    }).join(", ");
    return '<img src="assets/images/' + m.stem + "-" + mid + '.webp"' +
      ' srcset="' + srcset + '"' +
      ' sizes="' + (sizes || "100vw") + '"' +
      ' alt="' + esc(m.alt || "") + '"' +
      (cls ? ' class="' + cls + '"' : "") +
      (ratio ? ' style="aspect-ratio:' + ratio + '"' : "") +
      ' loading="lazy" decoding="async">';
  }

  function dim(label) {
    return '<div class="dim rise"><span class="dim-tick"></span><span class="dim-line"></span>' +
      '<span class="label dim-label">' + esc(label) + "</span>" +
      '<span class="dim-line"></span><span class="dim-tick"></span></div>';
  }

  function sectionHead(id, label) { return '<section id="' + id + '">' + dim(label); }

  var AWARD_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M8 3h8v5.5a4 4 0 0 1-8 0Z"/>' +
    '<path d="M8 4.5H5.5V7A3.5 3.5 0 0 0 9 10.5M16 4.5h2.5V7A3.5 3.5 0 0 1 15 10.5"/>' +
    '<path d="M12 12.5V17m-3.5 4h7l-1-4h-5Z"/></svg>';

  /* ---------- hero ------------------------------------------------------- */
  function hero() {
    var m = D.meta;
    var facts = (D.facts || []).map(function (f) {
      return "<div><dt class=\"label\">" + esc(f.k) + "</dt><dd" +
        (f.mono ? ' class="mono"' : "") + ">" + esc(f.v) + "</dd></div>";
    }).join("");
    var resume = m.resume ? '<a class="btn pri" href="' + esc(m.resume) +
      '" download>Download resume</a>' : "";
    var li = (m.links || []).filter(function (l) { return l.url && l.label === "LinkedIn"; })[0];
    return '<header class="hero" id="top"><div class="wrap">' +
      '<div class="hero-grid">' +
        '<div data-stagger>' +
          (m.site ? '<p class="doc-link" style="animation-delay:.02s">' + esc(m.site.replace(/^https?:\/\//,'').replace(/\/$/,'')) + '</p>' : '') +
          '<div class="eyebrow" style="animation-delay:.05s"><span class="label">' +
            esc(m.role) + " &middot; " + esc(m.credential || m.subtitle) + "</span></div>" +
          '<h1 class="name" style="animation-delay:.12s">' + esc(m.firstName) +
            "<em>" + esc(m.lastName) + "</em></h1>" +
          '<p class="lede tagline" style="animation-delay:.24s">' + rich(m.tagline) + "</p>" +
          (m.heroAward ? '<div class="hero-award" style="animation-delay:.3s">' + AWARD_ICON + '<div><strong>' + rich(m.heroAward.text) + '</strong>' + (m.heroAward.sub ? '<span>' + rich(m.heroAward.sub) + '</span>' : '') + '</div></div>' : '') +
          '<div class="hero-cta" style="animation-delay:.34s">' +
            '<a class="btn" href="#projects">See the work</a>' + resume +
            (li ? '<a class="btn" href="' + esc(li.url) + '" target="_blank" rel="noopener">LinkedIn</a>' : "") +
          "</div>" +
        "</div>" +
        '<figure class="portrait" data-stagger>' +
          img(m.portrait, "(max-width:860px) 60vw, 340px", null, null).replace('loading="lazy"', 'loading="eager"').replace("<img", '<img style="animation-delay:.3s"') +
          '<figcaption class="fig label" style="animation-delay:.42s">Fig. 1 &mdash; ' +
            esc(m.name) + "</figcaption>" +
        "</figure>" +
      "</div>" +
      '<dl class="facts rise">' + facts + "</dl>" +
      "</div></header>";
  }

  /* ---------- project blocks -------------------------------------------- */
  function block(b, pi) {
    switch (b.t) {
      case "h":
        return '<div class="subhead rise">' +
          (b.n ? '<span class="n">' + esc(b.n) + "</span>" : "") +
          "<h3>" + rich(b.text) + '</h3><span class="r"></span></div>';
      case "p":
        return '<p class="rise">' + rich(b.text) + "</p>";
      case "cols":
        return '<div class="cols rise">' + b.groups.map(function (g) {
          return "<ul>" + g.map(function (li) { return "<li>" + rich(li) + "</li>"; }).join("") + "</ul>";
        }).join("") + "</div>";
      case "units":
        return '<div class="units rise">' + b.items.map(function (u) {
          return '<div class="unit"><span class="label">' + esc(u.label) + "</span><h4>" +
            esc(u.title) + "</h4><p>" + rich(u.text) + "</p></div>";
        }).join("") + "</div>";
      case "code":
        var code = esc(b.code);
        (b.kw || []).forEach(function (k) {
          code = code.replace(new RegExp("(^|\\n|\\s|\\()(" + k.replace(/ /g, "\\s") + ")(?=\\s|$)", "g"),
            function (_, pre, kw) { return pre + '<span class="kw">' + kw + "</span>"; });
        });
        return '<figure class="code rise">' +
          (b.lang ? '<span class="tag">' + esc(b.lang) + "</span>" : "") +
          "<pre><code>" + code + "</code></pre>" +
          (b.caption ? '<figcaption><span class="label">' + esc(b.caption) + "</span></figcaption>" : "") +
          "</figure>";
      case "table":
        return '<div class="rise"><div class="table-wrap"><table class="impact"><thead><tr>' +
          b.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          b.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + rich(c) + "</td>"; }).join("") + "</tr>";
          }).join("") +
          "</tbody></table></div>" +
          (b.note ? '<p class="fnote">' + rich(b.note) + "</p>" : "") + "</div>";
      case "svg":
        return '<figure class="schematic rise" data-svg="' + esc(b.src) + '">' +
          '<div class="svg-slot"></div><figcaption>' +
          '<span class="label">Fig. 2 &mdash; ' + esc(b.caption || "") + "</span>" +
          '<span class="label">Scale: ' + esc(b.scale || "N.T.S.") + "</span>" +
          "</figcaption></figure>";
      case "gallery":
        return '<div class="gallery rise">' + b.media.map(function (x) {
          var span = ' style="--span:' + (x.span || 6) + (x.ratio ? ";aspect-ratio:" + x.ratio : "") + '"';
          if (x.type === "video") {
            return '<figure class="shot"' + span + ">" +
              '<video src="' + esc(x.src) + '" poster="' + esc(x.poster || "") +
              '" controls playsinline preload="metadata"' +
              (x.portrait ? ' style="object-fit:contain"' : "") + "></video>" +
              (x.caption ? "<figcaption>" + esc(x.caption) + "</figcaption>" : "") + "</figure>";
          }
          var full = "assets/images/" + x.stem + "-" + x.widths[x.widths.length - 1] + ".webp";
          return '<figure class="shot zoom" data-full="' + full + '" data-cap="' +
            esc(x.caption || "") + '"' + span + " tabindex=\"0\" role=\"button\" aria-label=\"Enlarge: " +
            esc(x.alt || "") + "\">" +
            img(x, "(max-width:760px) 100vw, " + Math.round((x.span || 6) / 12 * 100) + "vw") +
            (x.caption ? "<figcaption>" + esc(x.caption) + "</figcaption>" : "") + "</figure>";
        }).join("") + "</div>";
      case "cad":
        return cadBlock(b, pi);
      default:
        return "";
    }
  }

  function cadBlock(b, pi) {
    var id = "cad-" + pi;
    return '<div class="cad rise" data-cad="' + esc(b.file) + '" data-units="' +
      esc(b.units || "mm") + '" id="' + id + '">' +
      '<div class="cad-head"><h4>' + esc(b.label || "3D model") + "</h4>" +
        '<span class="label">Interactive &mdash; drag to rotate, scroll to zoom</span></div>' +
      '<div class="cad-stage">' +
        '<div class="cad-state"><div><p class="label">Interactive 3D</p>' +
          "<p>" + esc(b.note || "") + '</p><button class="cad-btn" data-cad-load style="margin-top:1rem">Load model</button>' +
          '<div class="cad-bar" hidden><i></i></div></div></div>' +
        '<div class="cad-hud" hidden></div>' +
      "</div>" +
      '<div class="cad-tools" hidden>' +
        '<button class="cad-btn" data-cad-view="fit">Fit</button>' +
        '<button class="cad-btn" data-cad-mode="shaded" aria-pressed="true">Shaded</button>' +
        '<button class="cad-btn" data-cad-mode="edges">Edges</button>' +
        '<button class="cad-btn" data-cad-mode="wire">Wireframe</button>' +
        '<button class="cad-btn" data-cad-units>mm / in</button>' +
        '<button class="cad-btn" data-cad-shot>Snapshot</button>' +
        '<a class="cad-btn" href="' + esc(b.file) + '" download>Download</a>' +
        '<label class="cad-slice">Section' +
          '<input type="range" min="0" max="100" value="100" data-cad-slice></label>' +
      "</div>" +
      (b.note ? '<p class="cad-note">' + rich(b.note) + "</p>" : "") +
      "</div>";
  }

  /* ---------- one project ----------------------------------------------- */
  function project(p, i, asPage) {
    var n = String(i + 1).padStart(2, "0");
    var metrics = (p.metrics || []).map(function (m) {
      return '<div class="callout"><span class="callout-v">' + rich(m.v) + "</span>" +
        '<span class="callout-lead"></span><span class="callout-k">' + esc(m.k) +
        (m.note ? "<small>" + esc(m.note) + "</small>" : "") + "</span></div>";
    }).join("");
    var tb = [
      ["Project", p.title, false], ["Discipline", (p.categories || []).join(" / "), false],
      ["Year", p.year, true], ["Setting", p.setting, true],
      ["Role", p.role, true], ["Status", p.status, true]
    ].map(function (r, idx) {
      return '<div class="tb' + (idx < 3 ? " top" : "") + (idx % 3 === 0 ? " row-start" : "") +
        '"><span class="tb-k">' + esc(r[0]) + '</span><span class="tb-v' +
        (r[2] ? " small" : "") + '">' + esc(r[1] || "&mdash;") + "</span></div>";
    }).join("") +
      '<div class="tb row-start span2"><span class="tb-k">Stack</span>' +
      '<span class="tb-v small">' + (p.tools || []).join(" &middot; ") + "</span></div>" +
      '<div class="tb"><span class="tb-k">Recognition</span><span class="tb-v small">' +
      (p.award ? "People&rsquo;s Choice Award" : "&mdash;") + "</span></div>";

    var chips = (p.tools || []).map(function (t, ci) {
      var hot = ci < (p.hot || 0);
      var parts = t.split(" · ");
      return '<span class="chip' + (hot ? " hot" : "") + '"><b>' + esc(parts[0]) + "</b>" +
        (parts[1] ? " &middot; " + esc(parts[1]) : "") + "</span>";
    }).join("");

    var award = p.award ? '<div class="award rise">' + AWARD_ICON + "<div><h4>" +
      esc(p.award.title) + "</h4><p>" + rich(p.award.text) +
      (p.award.link ? ' <a href="' + esc(p.award.link) + '" target="_blank" rel="noopener">' +
        esc(p.award.linkLabel || "Source") + "</a>." : "") + "</p></div></div>" : "";

    // wordy blocks collapse behind a toggle; visuals (gallery/cad/svg) stay visible
    var VISUAL = { gallery: 1, cad: 1, svg: 1 };
    var hasDetail = !asPage && (p.blocks || []).some(function (b) { return !VISUAL[b.t]; });
    var bodyHtml = (p.blocks || []).map(function (b) {
      var html = block(b, p.id);
      return (VISUAL[b.t] || asPage) ? html : html.replace('class="', 'class="pd ', 1);
    }).join("");
    var seeMore = hasDetail
      ? '<button class="see-more" type="button" data-toggle-project aria-expanded="false">' +
          '<span class="see-more-txt">See project details</span>' +
          '<span class="see-more-ico" aria-hidden="true"></span></button>'
      : "";

    return '<article class="project' + (hasDetail ? " collapsed" : "") +
      '" id="p-' + esc(p.id) + '" data-cats="' +
      esc((p.categories || []).join("|")) + '">' +
      (i && !asPage ? dim("Next project").replace('dim rise', 'dim rise proj-div') : "") +
      '<div class="p-head"><div class="rise">' +
        '<div class="p-num">' + n + "</div>" +
        '<p class="p-sub">' + esc((p.categories || []).join(" \u00b7 ")) + "</p>" +
        '<h2 class="p-title">' + esc(p.title) + "</h2>" +
        '<p class="lede">' + rich(p.summary) + "</p>" +
      '</div><div class="rise"><div class="rail">' + metrics + "</div></div></div>" +
      award +
      '<div class="tblock rise">' + tb + "</div>" +
      '<div class="body-col">' + bodyHtml + seeMore + "</div>" +
      '<div class="chips rise">' + chips + "</div>" +
      "</article>";
  }

  /* ---------- register index: thumbnail + row + page wrapper ----------- */
  function projThumb(p) {
    var img = null, hasVid = false;
    var hasCad = (p.blocks || []).some(function (b) { return b.t === "cad"; });
    var g = (p.blocks || []).filter(function (b) { return b.t === "gallery"; })[0];
    if (g) {
      (g.media || []).forEach(function (m) {
        if (m.type === "image" && !img) img = m;
        if (m.type === "video") hasVid = true;
      });
    }
    var badge = hasCad ? "3D" : (hasVid ? "VIDEO" : "");
    var inner = img
      ? '<img src="assets/images/' + esc(img.stem) + "-" + (img.widths || [800])[0] +
          '.webp" alt="" loading="lazy" decoding="async">'
      : '<span class="reg-noimg">no preview</span>';
    return '<span class="reg-thumb">' + inner +
      (badge ? '<span class="reg-badge">' + badge + "</span>" : "") + "</span>";
  }

  function regRow(p, i) {
    var sheet = "P-" + String(i + 1).padStart(3, "0");
    var cat0 = (p.categories || [])[0] || "";
    var sub = (p.tools || []).slice(0, 3).map(function (t) {
      return t.split(" \u00b7 ")[0].split(" / ")[0];
    });
    if (!sub.length) sub = (p.categories || []).slice(1);
    var field = (cat0 ? '<span class="reg-tag">' + esc(cat0) + "</span>" : "") +
      (sub.length ? '<span class="reg-sub">' + esc(sub.join(" \u00b7 ")) + "</span>" : "");
    return '<a class="reg-row rise" href="#project=' + esc(p.id) + '" data-cats="' +
      esc((p.categories || []).join("|")) + '" aria-label="' + esc(p.title) + '">' +
      '<span class="reg-sheet mono">' + sheet + "</span>" +
      projThumb(p) +
      '<span class="reg-main"><span class="reg-title">' + esc(p.title) + "</span>" +
        '<span class="reg-scope">' + rich(p.summary) + "</span></span>" +
      '<span class="reg-field">' + field + "</span>" +
      '<span class="reg-year mono">' + esc(p.year || "") + "</span>" +
      '<span class="reg-go" aria-hidden="true">&rarr;</span>' +
      "</a>";
  }

  function projectPage(p, i) {
    var prev = (D.projects || [])[i - 1], next = (D.projects || [])[i + 1];
    var sheet = "P-" + String(i + 1).padStart(3, "0");
    var flip = '<nav class="pv-flip" aria-label="Project navigation">' +
      (prev ? '<a href="#project=' + esc(prev.id) + '"><span class="label">Previous</span>' +
        '<span class="pv-flip-t">' + esc(prev.title) + "</span></a>" : "<span></span>") +
      (next ? '<a class="nx" href="#project=' + esc(next.id) + '"><span class="label">Next</span>' +
        '<span class="pv-flip-t">' + esc(next.title) + "</span></a>" : "<span></span>") +
      "</nav>";
    return '<div class="wrap pv-wrap"><div class="pv-top">' +
        '<a class="pv-back" href="#projects"><span aria-hidden="true">&larr;</span> All projects</a>' +
        '<span class="pv-sheet mono">' + sheet + " / " + String((D.projects || []).length).padStart(3, "0") + "</span>" +
      "</div>" +
      project(p, i, true) +
      flip + "</div>";
  }

  function projects() {
    var cats = {};
    (D.projects || []).forEach(function (p) {
      (p.categories || []).forEach(function (c) { cats[c] = (cats[c] || 0) + 1; });
    });
    var fb = '<div class="filters rise"><span class="label">Filter</span>' +
      '<button class="fbtn" data-cat="*" aria-pressed="true">All</button>' +
      Object.keys(cats).sort().map(function (c) {
        return '<button class="fbtn" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("") +
      '<span class="fcount" data-fcount></span></div>';
    var head = '<div class="reg-head" aria-hidden="true">' +
      "<span>Sheet</span><span>View</span><span>Title &amp; scope</span>" +
      "<span>Field</span><span>Year</span><span></span></div>";
    var rows = (D.projects || []).map(function (p, i) { return regRow(p, i); }).join("");
    return sectionHead("projects", "Selected projects") +
      '<div class="wrap">' + fb + '<div class="reg">' + head + rows + "</div></div></section>";
  }

  /* ---------- about ------------------------------------------------------ */
  function about() {
    var a = D.about || {};
    var hl = (a.highlights || []).map(function (h) {
      return "<div><b>" + esc(h.v) + "</b><span>" + rich(h.k) + "</span></div>";
    }).join("");
    return sectionHead("about", a.heading || "About") +
      '<div class="wrap"><div class="about">' +
        '<div class="rise"><p class="lede">' + rich(a.pitch) + "</p>" +
          '<div class="about-body">' + (a.body || []).map(function (p) {
            return "<p>" + rich(p) + "</p>";
          }).join("") + "</div></div>" +
        '<div class="rise"><div class="hl">' + hl + "</div>" +
          '<figure class="bleed">' + img(D.meta.bleed, "(max-width:900px) 100vw, 40vw") +
          "</figure></div>" +
      "</div></div></section>";
  }

  /* ---------- experience ------------------------------------------------- */
  function experience() {
    var items = (D.experience || []).map(function (e) {
      return '<div class="tl-item rise"><span class="tl-per">' + esc(e.period) + "</span>" +
        '<h3 class="tl-org">' + esc(e.org) + "</h3>" +
        '<p class="tl-role">' + esc(e.title) + "</p>" +
        '<p class="tl-loc">' + esc(e.location) + "</p>" +
        "<ul>" + (e.bullets || []).map(function (b) { return "<li>" + rich(b) + "</li>"; }).join("") +
        "</ul></div>";
    }).join("");
    return sectionHead("experience", "Experience") +
      '<div class="wrap"><div class="tl">' + items + "</div></div></section>";
  }

  /* ---------- skills ----------------------------------------------------- */
  function skills() {
    var groups = (D.skills || []).map(function (g) {
      return '<div class="sk rise"><h3>' + esc(g.group) + "</h3><ul>" +
        g.items.map(function (i) {
          return "<li>" + esc(i.name) + (i.note ? "<em>" + esc(i.note) + "</em>" : "") + "</li>";
        }).join("") + "</ul></div>";
    }).join("");
    return sectionHead("skills", "Skills & tools") +
      '<div class="wrap"><div class="skills">' + groups + "</div></div></section>";
  }

  /* ---------- education, certifications, coursework ---------------------- */
  function education() {
    var edu = (D.education || []).map(function (e) {
      return '<div class="rise"><h3 class="edu-degree">' + esc(e.degree) + "</h3>" +
        '<p class="tl-role">' + esc(e.school) + "</p>" +
        '<p class="tl-loc">' + esc(e.period) + " &middot; " + esc(e.location) +
        (e.detail ? " &middot; " + esc(e.detail) : "") + "</p></div>";
    }).join("");
    var certs = (D.certifications || []).map(function (c) {
      return "<div><strong>" + esc(c.name) + "</strong><span>" + esc(c.issuer) +
        " &middot; " + esc(c.year) + "</span></div>";
    }).join("");
    var course = (D.coursework || []).map(function (c) {
      return '<span class="chip">' + esc(c) + "</span>";
    }).join("");
    return sectionHead("education", "Education & certifications") +
      '<div class="wrap"><div class="two-col">' +
        "<div>" + edu +
          (certs ? '<h3 class="label rise" style="margin:2rem 0 .5rem">Certifications</h3>' +
            '<div class="cert rise">' + certs + "</div>" : "") +
        "</div>" +
        '<div class="rise"><h3 class="label" style="margin-bottom:.9rem">Relevant coursework</h3>' +
          '<div class="chips" style="margin-top:0">' + course + "</div></div>" +
      "</div></div></section>";
  }

  /* ---------- hobbies ---------------------------------------------------- */
  function hobbies() {
    var h = D.hobbies;
    if (!h || !h.items || !h.items.length) return "";
    var items = h.items.map(function (i) {
      return '<article class="rise">' + (i.media ? img(i.media, "(max-width:760px) 100vw, 33vw") : "") +
        "<h3>" + esc(i.title) + "</h3><p>" + rich(i.text) + "</p></article>";
    }).join("");
    return sectionHead("hobbies", h.heading || "Away from the bench") +
      '<div class="wrap"><div class="hob">' + items + "</div></div></section>";
  }

  /* ---------- contact + footer ------------------------------------------- */
  function contact() {
    var c = D.contact || {}, m = D.meta;
    var links = (m.links || []).filter(function (l) { return l.url; }).map(function (l) {
      var ext = l.url.indexOf("http") === 0;
      return '<a href="' + esc(l.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") +
        ">" + esc(l.label) + "</a>";
    }).join("");
    if (m.resume) links += '<a href="' + esc(m.resume) + '" download>Resume (PDF)</a>';
    if (m.showPhone && m.phone) links += '<a href="tel:' + esc(m.phone.replace(/[^0-9+]/g, "")) +
      '">' + esc(m.phone) + "</a>";
    return sectionHead("contact", c.heading || "Contact") +
      '<div class="wrap"><div class="contact">' +
        '<div class="rise"><p class="lede">' + rich(c.text) + "</p>" +
          '<a class="btn pri" href="mailto:' + esc(m.email) + '">' + esc(c.cta || "Email me") + "</a>" +
          '<button class="btn" data-copy="' + esc(m.email) + '" style="margin-left:.5rem">Copy address</button>' +
        "</div>" +
        '<div class="contact-links rise">' + links + "</div>" +
      "</div>" +
      '<footer class="foot"><span class="label">' + esc(m.name) + " &mdash; " +
        esc(m.role) + " &mdash; " + new Date().getFullYear() + "</span>" +
        "<nav>" + links + "</nav></footer>" +
      "</div></section>";
  }

  function nav() {
    var items = [["projects","Projects"],["about","About"],["experience","Experience"],
      ["skills","Skills"],["education","Education"],["contact","Contact"]];
    return '<nav class="nav" id="nav" aria-label="Sections">' +
      '<a class="nav-name" href="#top">' + esc(D.meta.name) + "</a>" +
      '<div class="nav-links">' + items.map(function (i) {
        return '<a href="#' + i[0] + '" data-nav="' + i[0] + '">' + i[1] + "</a>";
      }).join("") + "</div>" +
      '<button class="tbtn" id="themeBtn" aria-label="Switch colour theme">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/>' +
        '<path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.9 1.9' +
        'M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9"/></svg>' +
        '<span id="themeLabel">Night</span></button>' +
      "</nav>";
  }

  /* ---------- mount ------------------------------------------------------ */
  document.title = D.meta.seo.title;
  var root = document.getElementById("app");
  root.innerHTML = nav() + hero() +
    '<main id="main">' + projects() + about() + experience() + skills() +
    education() + hobbies() + contact() + "</main>" +
    '<div id="project-view" hidden></div>' +
    '<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Enlarged image">' +
      '<button class="lb-close" data-lb-close>Close &times;</button>' +
      '<figure style="margin:0"><img alt=""><figcaption></figcaption></figure></div>' +
    '<div class="frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';

  /* ---------- theme ------------------------------------------------------ */
  (function () {
    var el = document.documentElement, btn = document.getElementById("themeBtn"),
        lab = document.getElementById("themeLabel"), saved = null;
    try { saved = localStorage.getItem("bc-theme"); } catch (e) {}
    el.dataset.theme = saved || (D.theme && D.theme.mode) || "light";
    function sync() { lab.textContent = el.dataset.theme === "dark" ? "Day" : "Night"; }
    sync();
    btn.addEventListener("click", function () {
      el.dataset.theme = el.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("bc-theme", el.dataset.theme); } catch (e) {}
      sync();
    });
  })();

  /* ---------- scroll reveals -------------------------------------------- */
  var risers = [].slice.call(document.querySelectorAll(".rise"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    risers.forEach(function (el) { io.observe(el); });
  } else {
    risers.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- sticky nav + active section ------------------------------- */
  (function () {
    var navEl = document.getElementById("nav"), last = 0;
    function onScroll() {
      var y = window.scrollY || 0;
      navEl.classList.toggle("show", y > 320);
      last = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if ("IntersectionObserver" in window) {
      var links = {};
      [].slice.call(document.querySelectorAll("[data-nav]")).forEach(function (a) {
        links[a.dataset.nav] = a;
      });
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var a = links[e.target.id];
          if (a) a.setAttribute("aria-current", e.isIntersecting ? "true" : "false");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(links).forEach(function (id) {
        var s = document.getElementById(id); if (s) so.observe(s);
      });
    }
  })();

  /* ---------- project filters (register rows) --------------------------- */
  (function () {
    var btns = [].slice.call(document.querySelectorAll("[data-cat]")),
        rows = [].slice.call(document.querySelectorAll(".reg-row")),
        count = document.querySelector("[data-fcount]");
    function apply(cat) {
      var shown = 0;
      rows.forEach(function (a) {
        var ok = cat === "*" || (a.dataset.cats || "").split("|").indexOf(cat) > -1;
        a.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown + " of " + rows.length + " shown";
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.cat === cat));
      });
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.cat); });
    });
    apply("*");
  })();

  /* ---------- lightbox --------------------------------------------------- */
  (function () {
    var lb = document.getElementById("lb"), im = lb.querySelector("img"),
        cap = lb.querySelector("figcaption"), opener = null;
    function open(el) {
      opener = el;
      im.src = el.dataset.full;
      im.alt = el.querySelector("img") ? el.querySelector("img").alt : "";
      cap.textContent = el.dataset.cap || "";
      lb.classList.add("open");
      lb.querySelector("[data-lb-close]").focus();
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }
    document.addEventListener("click", function (e) {
      var z = e.target.closest ? e.target.closest(".shot.zoom") : null;
      if (z) { open(z); return; }
      if (e.target.closest && e.target.closest("[data-lb-close]")) { close(); return; }
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) close();
      if ((e.key === "Enter" || e.key === " ") && e.target.classList &&
          e.target.classList.contains("zoom")) { e.preventDefault(); open(e.target); }
    });
  })();

  /* ---------- copy email ------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-copy]") : null;
    if (!b || !navigator.clipboard) return;
    navigator.clipboard.writeText(b.dataset.copy).then(function () {
      var t = b.textContent; b.textContent = "Copied";
      setTimeout(function () { b.textContent = t; }, 1600);
    });
  });

  /* ---------- project details: collapse / expand ----------------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-toggle-project]") : null;
    if (!btn) return;
    var art = btn.closest(".project");
    if (!art) return;
    var open = art.classList.toggle("collapsed") === false;
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector(".see-more-txt").textContent =
      open ? "Hide details" : "See project details";
    if (open) {
      // force revealed blocks to their shown state (IntersectionObserver never fired while hidden)
      [].slice.call(art.querySelectorAll(".pd")).forEach(function (el) {
        el.classList.add("in");
        [].slice.call(el.querySelectorAll(".rise")).forEach(function (r) { r.classList.add("in"); });
      });
    } else {
      // scroll the project header back into view when collapsing
      var top = art.getBoundingClientRect().top;
      if (top < 0) art.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* ---------- inline SVG diagrams (scoped, idempotent) ----------------- */
  function inlineSvgs(scope) {
    [].slice.call((scope || document).querySelectorAll("[data-svg]")).forEach(function (fig) {
      if (fig.dataset.svgLoaded) return;
      fig.dataset.svgLoaded = "1";
      fetch(fig.dataset.svg).then(function (r) { return r.ok ? r.text() : ""; })
        .then(function (t) { if (t) fig.querySelector(".svg-slot").innerHTML = t; })
        .catch(function () {});
    });
  }

  /* ---------- CAD viewer: load on demand (scoped) ---------------------- */
  var _cadLoaded = new WeakSet();
  function bootCad(scope) {
    var blocks = [].slice.call((scope || document).querySelectorAll("[data-cad]"));
    if (!blocks.length) return;
    function boot(el) {
      if (_cadLoaded.has(el)) return;
      _cadLoaded.add(el);
      import("./viewer.js").then(function (m) { m.mount(el); })
        .catch(function (err) {
          console.error("viewer failed", err);
          var s = el.querySelector(".cad-state");
          s.hidden = false;
          s.querySelector("p:last-of-type").textContent =
            "The 3D viewer could not load. The model file is still downloadable below.";
        });
    }
    blocks.forEach(function (el) {
      var btn = el.querySelector("[data-cad-load]");
      if (btn && !btn.dataset.wired) { btn.dataset.wired = "1"; btn.addEventListener("click", function () { boot(el); }); }
    });
    if ("IntersectionObserver" in window) {
      var vo = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { vo.unobserve(e.target); boot(e.target); }
        });
      }, { rootMargin: "200px" });
      blocks.forEach(function (el) { vo.observe(el); });
    }
  }
  inlineSvgs(document);
  bootCad(document);

  /* ---------- hash router: index <-> dedicated project pages ----------- */
  (function () {
    var main = document.getElementById("main"),
        heroEl = document.querySelector(".hero"),
        pv = document.getElementById("project-view"),
        SECTIONS = { top: 1, projects: 1, about: 1, experience: 1, skills: 1, education: 1, contact: 1 };
    function idxOf(id) {
      var found = -1;
      (D.projects || []).forEach(function (p, i) { if (p.id === id) found = i; });
      return found;
    }
    function showIndex(scrollId) {
      pv.hidden = true; pv.innerHTML = "";
      main.hidden = false; if (heroEl) heroEl.hidden = false;
      document.title = D.meta.seo.title;
      if (scrollId) {
        var el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ block: "start" });
      }
    }
    function showProject(i) {
      var p = D.projects[i];
      pv.innerHTML = projectPage(p, i);
      main.hidden = true; if (heroEl) heroEl.hidden = true; pv.hidden = false;
      [].slice.call(pv.querySelectorAll(".rise")).forEach(function (el) { el.classList.add("in"); });
      inlineSvgs(pv); bootCad(pv);
      window.scrollTo(0, 0);
      document.title = p.title + " \u2014 " + D.meta.name;
    }
    function route() {
      var h = location.hash || "";
      var m = h.match(/^#project=(.+)$/);
      if (m) {
        var i = idxOf(decodeURIComponent(m[1]));
        if (i >= 0) { showProject(i); return; }
      }
      var id = h.replace(/^#/, "");
      showIndex(SECTIONS[id] ? id : null);
    }
    window.addEventListener("hashchange", route);
    route();
  })();
})();
