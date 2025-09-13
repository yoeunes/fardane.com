import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="constellation"
// A radically different take from the previous knowledge tree:
// - Astrolabe-inspired radial constellation centered on "الموروث الثقافي".
// - Main concepts are arranged on a circular ring; rays connect to the hub.
// - Timeline lives on an outer rotating band; dates glide gently like celestial markers.
// - Elegant, academic amber/stone palette; Arabic typography; RTL-aware.
// - Interactivity: hover to focus (scale/glow, highlight ray), others dim; scholarly tooltips.
export default class extends Controller {
  static targets = ["svg"]; 

  connect() {
    // SVG host
    this.svg = this.hasSvgTarget ? this.svgTarget : this._createSVG();
    this.element.style.direction = "rtl";
    this.element.style.userSelect = "none";
    this.element.style.position = "relative";

    this._injectStyles();
    this.model = this._buildModel();
    this.layout = this._computeLayout(this.model);
    this._render();
    this._intro();
    this._startLoops();
    this._initTooltip();
  }

  disconnect() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  // ---------------- Data ----------------
  _buildModel() {
    const ids = {
      root: "heritage",
      studies: "historicalStudies",
      society: "societalStructures",
      sources: "medievalSources",
      water: "water",
      trade: "trade",
      ksours: "ksoursKasbahs",
      timeline: "timeline",
      d140: "d140",
      d350: "d350",
      d450: "d450",
    };

    const nodes = {
      [ids.root]: { id: ids.root, title: "الموروث الثقافي", tooltip: "المحور المركزي: تحليل المكونات التاريخية للتراث المادي واللامادي." },
      [ids.studies]: { id: ids.studies, title: "الدراسات التاريخية", tooltip: "منهجيات البحث التاريخي ومسارات تطوّرها في الكتابة المغربية.", parent: ids.root },
      [ids.society]: { id: ids.society, title: "البنى المجتمعية", tooltip: "أدوار اتحادات زناتة وصنهاجة في بناء الهوية السياسية والمجالية.", parent: ids.root },
      [ids.sources]: { id: ids.sources, title: "المصادر الوسطية", tooltip: "قراءة نقدية لمتون ابن حوقل والبكري حول سجلماسة والقبلة.", parent: ids.root },
      [ids.water]: { id: ids.water, title: "الماء", tooltip: "محدد بنيوي للاستقرار والعمران الواحاتي.", parent: ids.root },
      [ids.trade]: { id: ids.trade, title: "التجارة", tooltip: "قاطرة اقتصاد سجلماسة ووسيط العبور عبر الصحراء.", parent: ids.root },
      [ids.ksours]: { id: ids.ksours, title: "القصور والقصبات", tooltip: "شواهد معمارية لحضارة واحاتية متراكمة.", parent: ids.root },
      [ids.timeline]: { id: ids.timeline, title: "الإطار الزمني", tooltip: "تأريخ المنعطفات المفصلية في الجنوب الشرقي المغربي.", parent: ids.root },
      [ids.d140]: { id: ids.d140, title: "", tooltip: "تأسيس سجلماسة مركزاً للتجارة والسلطة.", parent: ids.timeline },
      [ids.d350]: { id: ids.d350, title: "", tooltip: "دخول صنهاجة إلى أوذغست وبسط النفوذ.", parent: ids.timeline },
      [ids.d450]: { id: ids.d450, title: "", tooltip: "إزاحة ممثل زنانة بسجلماسة على يد أتباع عبد الله بن ياسين.", parent: ids.timeline },
    };

    for (const n of Object.values(nodes)) n.children = [];
    for (const n of Object.values(nodes)) if (n.parent) nodes[n.parent].children.push(n.id);

    return { ids, nodes };
  }

  // ---------------- Layout ----------------
  _computeLayout(model) {
    const width = 1100, height = 700;
    const cx = width / 2, cy = height / 2 + 10;

    const positions = {};
    positions[model.ids.root] = { x: cx, y: cy };

    // Ring for primary concepts (7 points including timeline hub)
    const ringR = 220;
    const ringIds = [
      model.ids.studies,
      model.ids.society,
      model.ids.sources,
      model.ids.water,
      model.ids.trade,
      model.ids.ksours,
      model.ids.timeline,
    ];

    // Distribute clockwise, starting near top-right (RTL-friendly aesthetics)
    const startDeg = -20; // degrees
    ringIds.forEach((id, i) => {
      const a = (startDeg + i * (360 / ringIds.length)) * Math.PI / 180;
      positions[id] = { x: cx + ringR * Math.cos(a), y: cy + ringR * Math.sin(a), angle: a };
    });

    // Outer band for timeline dates (rotating group)
    const bandR = 300;
    positions[model.ids.d140] = { band: true, t: 0, r: bandR };
    positions[model.ids.d350] = { band: true, t: 1/3, r: bandR };
    positions[model.ids.d450] = { band: true, t: 2/3, r: bandR };

    return { width, height, center: { x: cx, y: cy }, positions, ringR, bandR };
  }

  // ---------------- Render ----------------
  _render() {
    const { width, height } = this.layout;
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    this.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.svg.classList.add("w-full", "h-auto");

    // defs
    const defs = this._el("defs");
    defs.appendChild(this._glowFilter());
    defs.appendChild(this._softShadow());
    this.svg.appendChild(defs);

    // layers
    this.gridLayer = this._el("g", { class: "grid-layer" });
    this.edgesLayer = this._el("g", { class: "edges-layer" });
    this.nodesLayer = this._el("g", { class: "nodes-layer" });
    this.svg.append(this.gridLayer, this.edgesLayer, this.nodesLayer);

    // Astrolabe circles (grid)
    const { x: cx, y: cy } = this.layout.center;
    const gridRings = [110, this.layout.ringR, this.layout.bandR];
    gridRings.forEach((r, idx) => {
      const c = this._el("circle", {
        cx, cy, r,
        fill: "none",
        stroke: idx === gridRings.length - 1 ? "#e7cba4" : "#edd8b2",
        "stroke-width": idx === 0 ? 1 : 1.2,
        "stroke-dasharray": idx === gridRings.length - 1 ? "6 6" : "2 4",
        opacity: idx === 0 ? 0.7 : 0.9,
        class: idx === gridRings.length - 1 ? "grid-outer spin-dashes" : "grid-ring"
      });
      this.gridLayer.appendChild(c);
    });

    // Decorative compass lines
    for (let i = 0; i < 12; i++) {
      const a = i * (Math.PI / 6);
      const x1 = cx + 90 * Math.cos(a);
      const y1 = cy + 90 * Math.sin(a);
      const x2 = cx + this.layout.bandR * Math.cos(a);
      const y2 = cy + this.layout.bandR * Math.sin(a);
      const line = this._el("line", {
        x1, y1, x2, y2,
        stroke: "#f5e6cc",
        "stroke-width": 0.8,
        "stroke-dasharray": "1 10",
        opacity: 0.6
      });
      this.gridLayer.appendChild(line);
    }

    // Rays from hub to ring nodes
    this._edges = [];
    Object.values(this.model.nodes).forEach(node => {
      if (!node.parent || node.parent !== this.model.ids.root) return;
      const p1 = this._pos(this.model.ids.root);
      const p2 = this._pos(node.id);
      const path = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      const edge = this._el("path", {
        d: path,
        fill: "none",
        stroke: "#9a6a2f",
        "stroke-width": 2.2,
        "stroke-linecap": "round",
        class: "ray",
        filter: "url(#softShadow)"
      });
      const glow = this._el("path", {
        d: path, fill: "none", stroke: "#fbbf24", "stroke-width": 2,
        "stroke-dasharray": "8 160", "stroke-dashoffset": 0, opacity: 0.0, filter: "url(#glow)", class: "ray-glow"
      });
      this.edgesLayer.append(edge);
      this.edgesLayer.append(glow);
      this._edges.push({ id: node.id, parent: node.parent, edge, glow });
    });

    // Hub node
    this._nodeEls = {};
    const hub = this._nodeGroup(this.model.ids.root, { r: 28, halo: 44, font: 22, y: -50 });
    this._nodeEls[this.model.ids.root] = hub;

    // Ring nodes (including the timeline hub)
    const ringIds = [this.model.ids.studies, this.model.ids.society, this.model.ids.sources, this.model.ids.water, this.model.ids.trade, this.model.ids.ksours, this.model.ids.timeline];
    ringIds.forEach((id) => {
      const g = this._nodeGroup(id, { r: 16, halo: 26, font: 18, y: -34 });
      this._nodeEls[id] = g;
    });

    // Timeline rotating band group and satellites
    this.timelineBand = this._el("g", { class: "timeline-band" });
    this.nodesLayer.appendChild(this.timelineBand);

    const tCenter = this.layout.center;
    // Label for timeline on the band (follows rotation)
    const arcLabel = this._el("text", {
      x: tCenter.x,
      y: tCenter.y - this.layout.bandR - 12,
      "text-anchor": "middle",
      fill: "#92400e",
      "font-size": 16,
      "font-weight": 700,
      style: "font-family: 'Tajawal', 'Amiri', 'Scheherazade New', system-ui, sans-serif;"
    }, this.model.nodes[this.model.ids.timeline].title);
    this.timelineBand.appendChild(arcLabel);

    this._satellites = [];
    [this.model.ids.d140, this.model.ids.d350, this.model.ids.d450].forEach(id => {
      const sat = this._satellite(id);
      this._satellites.push(sat);
    });
  }

  _nodeGroup(id, opts) {
    const p = this._pos(id);
    const g = this._el("g", { class: "node-group", transform: `translate(${p.x}, ${p.y}) scale(0.7)`, opacity: 0, "data-node-id": id });
    const circle = this._el("circle", { r: opts.r, fill: "#fff8eb", stroke: "#b45309", "stroke-width": 2.2, filter: "url(#softShadow)", class: "node-circle" });
    const halo = this._el("circle", { r: opts.halo, fill: "none", stroke: "#f59e0b", "stroke-width": 1.2, opacity: 0.25, class: "node-halo pulsate", filter: "url(#glow)" });
    const label = this._el("text", { x: 0, y: opts.y, "text-anchor": "middle", "font-size": opts.font, "font-weight": 700, fill: "#1c1917", style: "font-family: 'Tajawal', 'Amiri', 'Scheherazade New', system-ui, sans-serif;", class: "node-label" }, this.model.nodes[id].title);
    g.append(halo, circle, label);
    this.nodesLayer.appendChild(g);

    // Interactivity
    g.addEventListener("mouseenter", (e) => this._focusNode(id, e));
    g.addEventListener("mouseleave", () => this._resetFocus());
    g.addEventListener("mousemove", (e) => this._moveTooltip(e, this.model.nodes[id]));

    return { id, g, circle, halo, label };
  }

  _satellite(id) {
    const center = this.layout.center;
    const s = this.layout.positions[id];
    const angle = 2 * Math.PI * s.t;
    const x = center.x + s.r * Math.cos(angle);
    const y = center.y + s.r * Math.sin(angle);

    const g = this._el("g", { class: "satellite", transform: `translate(${x}, ${y}) scale(0.6)`, opacity: 0, "data-node-id": id });
    const circle = this._el("circle", { r: 12, fill: "#fffef7", stroke: "#b45309", "stroke-width": 2, filter: "url(#softShadow)", class: "node-circle" });
    const halo = this._el("circle", { r: 20, fill: "none", stroke: "#f59e0b", "stroke-width": 1, opacity: 0.25, class: "node-halo pulsate", filter: "url(#glow)" });
    const label = this._el("text", { x: 0, y: -24, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: "#1c1917", style: "font-family: 'Tajawal', 'Amiri', 'Scheherazade New', system-ui, sans-serif;", class: "node-label" }, this.model.nodes[id].title);
    g.append(halo, circle, label);
    this.timelineBand.appendChild(g);

    // Interactivity
    g.addEventListener("mouseenter", (e) => this._focusNode(id, e));
    g.addEventListener("mouseleave", () => this._resetFocus());
    g.addEventListener("mousemove", (e) => this._moveTooltip(e, this.model.nodes[id]));

    return { id, g, circle, halo, label, t: s.t, r: s.r };
  }

  _pos(id) {
    const p = this.layout.positions[id];
    if (!p) return { ...this.layout.center };
    if (p.band) {
      // current position is handled by rotation; return initial
      const a = 2 * Math.PI * p.t;
      return { x: this.layout.center.x + p.r * Math.cos(a), y: this.layout.center.y + p.r * Math.sin(a) };
    }
    return p;
  }

  // ---------------- Intro & Loops ----------------
  _intro() {
    // Stroke-draw rays
    this._edges.forEach(({ edge }) => {
      const len = edge.getTotalLength();
      edge.style.strokeDasharray = `${len}`;
      edge.style.strokeDashoffset = `${len}`;
      edge.style.animation = "draw 900ms ease-out forwards";
    });

    // Pop hub first
    this._animateIn(this._nodeEls[this.model.ids.root].g, { delay: 150 });

    const ringIds = [this.model.ids.studies, this.model.ids.society, this.model.ids.sources, this.model.ids.water, this.model.ids.trade, this.model.ids.ksours, this.model.ids.timeline];
    ringIds.forEach((id, i) => {
      setTimeout(() => this._animateIn(this._nodeEls[id].g, {}), 400 + i * 180);
    });

    // Satellites
    this._satellites.forEach((s, i) => setTimeout(() => this._animateIn(s.g, { scale: 0.8 }), 1600 + i * 200));
  }

  _startLoops() {
    let glowOffset = 0;
    let rot = 0; // rotation angle for band (deg)

    const tick = () => {
      // Move glow along rays
      glowOffset = (glowOffset + 1.0) % 400;
      this.edgesLayer.querySelectorAll(".ray-glow").forEach(p => {
        p.style.opacity = "0.9";
        p.style.strokeDashoffset = String(glowOffset);
      });

      // Rotate timeline band slowly
      rot = (rot + 0.03) % 360; // gentle rotation
      this.timelineBand.setAttribute("transform", `rotate(${rot} ${this.layout.center.x} ${this.layout.center.y})`);

      // Twinkle effect on grid rings (via CSS animation already)
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  _animateIn(g, opts = {}) {
    const scale = opts.scale || 0.7;
    const delay = opts.delay || 0;
    g.style.transition = `opacity 500ms ease ${delay}ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;
    const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
    const translate = m ? `translate(${m[1]})` : "";
    g.setAttribute("transform", `${translate} scale(${scale})`);
    requestAnimationFrame(() => {
      g.style.opacity = "1";
      g.setAttribute("transform", `${translate} scale(1)`);
    });
  }

  // ---------------- Interactions & Tooltip ----------------
  _focusNode(id, evt) {
    const n = this.model.nodes[id];
    this._showTooltip(n.tooltip, evt);

    // Dim others
    this.edgesLayer.style.opacity = "0.35";
    this.nodesLayer.style.opacity = "0.55";

    const related = new Set([id]);
    if (n.parent) related.add(n.parent);
    n.children.forEach(c => related.add(c));

    // Highlight rays
    this._edges.forEach(({ id: childId, parent, edge, glow }) => {
      const involved = related.has(childId) || related.has(parent);
      if (involved) {
        edge.style.opacity = "1";
        edge.style.stroke = "#b7791f";
        edge.style.strokeWidth = "3.2";
        glow.style.opacity = "1";
      } else {
        edge.style.opacity = "0.25";
        edge.style.strokeWidth = "2.2";
      }
    });

    // Nodes
    const allNodeGroups = Array.from(this.nodesLayer.querySelectorAll(".node-group, .satellite"));
    allNodeGroups.forEach(g => {
      const gid = g.getAttribute("data-node-id");
      const isRelated = related.has(gid);
      if (isRelated) {
        g.style.filter = "url(#glow)";
        g.style.opacity = "1";
        g.style.transform += " scale(1.06)";
      } else {
        g.style.filter = "none";
        g.style.opacity = "0.35";
      }
    });
  }

  _resetFocus() {
    this.edgesLayer.style.opacity = "1";
    this.nodesLayer.style.opacity = "1";

    this._edges.forEach(({ edge, glow }) => {
      edge.style.stroke = "#9a6a2f";
      edge.style.strokeWidth = "2.2";
      glow.style.opacity = "0.9";
    });

    const allNodeGroups = Array.from(this.nodesLayer.querySelectorAll(".node-group, .satellite"));
    allNodeGroups.forEach(g => {
      g.style.filter = "none";
      const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
      const translate = m ? `translate(${m[1]})` : "";
      // keep current rotation of band for satellites via group transform
      if (g.classList.contains("satellite")) {
        // satellites are wrapped by band transform; only scale here
        g.setAttribute("transform", `${g.getAttribute("transform").replace(/ scale\([^)]*\)/, "")} scale(1)`);
      } else {
        g.setAttribute("transform", `${translate} scale(1)`);
      }
      g.style.opacity = "1";
    });

    this._hideTooltip();
  }

  _initTooltip() {
    const tip = document.createElement("div");
    tip.className = "pointer-events-none fixed z-[60] max-w-xs bg-stone-900 text-amber-100 text-sm px-3 py-2 rounded-lg shadow-2xl border border-amber-500/30 opacity-0 transition-opacity duration-150";
    tip.style.willChange = "transform, opacity";
    this.tooltip = tip;
    document.body.appendChild(tip);
  }

  _showTooltip(text, evt) {
    if (!this.tooltip) return;
    this.tooltip.textContent = text || "";
    this.tooltip.style.opacity = "1";
    this._moveTooltip(evt);
  }

  _moveTooltip(evt) {
    if (!this.tooltip) return;
    const pad = 14;
    const x = evt.clientX + pad;
    const y = evt.clientY + pad;
    this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
  }

  _hideTooltip() {
    if (!this.tooltip) return;
    this.tooltip.style.opacity = "0";
  }

  // ---------------- SVG utils ----------------
  _createSVG() {
    const svg = this._el("svg");
    this.element.appendChild(svg);
    return svg;
  }

  _el(name, attrs = {}, text = null) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (text != null) el.textContent = text;
    return el;
  }

  _glowFilter() {
    const f = this._el("filter", { id: "glow" });
    f.appendChild(this._el("feGaussianBlur", { in: "SourceGraphic", stdDeviation: 3, result: "blur" }));
    const merge = this._el("feMerge");
    merge.appendChild(this._el("feMergeNode", { in: "blur" }));
    merge.appendChild(this._el("feMergeNode", { in: "SourceGraphic" }));
    f.appendChild(merge);
    return f;
  }

  _softShadow() {
    const f = this._el("filter", { id: "softShadow", x: "-20%", y: "-20%", width: "140%", height: "140%" });
    f.appendChild(this._el("feDropShadow", { dx: 0, dy: 2, stdDeviation: 2, floodColor: "#000000", floodOpacity: 0.08 }));
    return f;
  }

  _injectStyles() {
    if (this._stylesInjected) return;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes draw { to { stroke-dashoffset: 0; } }
      @keyframes pulse { 0%, 100% { opacity: 0.22; } 50% { opacity: 0.38; } }
      .pulsate { animation: pulse 2400ms ease-in-out infinite; }
      @keyframes dashSpin { to { stroke-dashoffset: -220; } }
      .spin-dashes { animation: dashSpin 20s linear infinite; }
    `;
    document.head.appendChild(style);
    this._stylesInjected = true;
  }
}
