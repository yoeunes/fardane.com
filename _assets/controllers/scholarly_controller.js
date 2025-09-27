import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scholarly"
// Academic, minimally animated schematic for Dr. Aziz Fardane's concepts.
// Design goals:
// - Sober two-column layout (pillars on the left; drivers/outcomes on the right)
// - Root hub centered above a discrete bottom timeline band
// - One-time fade/scale intro, no infinite loops
// - Scholarly tooltips and focused hover highlight
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
    this._initTooltip();
    
    // Add resize listener for responsive behavior
    this.boundResize = this.onResize.bind(this);
    window.addEventListener("resize", this.boundResize);
  }

  disconnect() {
    // Clean up resize listener
    if (this.boundResize) {
      window.removeEventListener("resize", this.boundResize);
    }
  }

  onResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Recalculate layout and re-render
      this.layout = this._computeLayout(this.model);
      this.svg.innerHTML = '';
      this._render();
      this._initTooltip();
    }, 150);
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
      [ids.studies]: { id: ids.studies, title: "الدراسات التاريخية", tooltip: "سيرورة الدرس التاريخي ومناهجه في التأريخ المغربي.", parent: ids.root },
      [ids.society]: { id: ids.society, title: "البنى المجتمعية", tooltip: "أدوار اتحادات زناتة وصنهاجة في بناء الهوية والسلطة.", parent: ids.root },
      [ids.sources]: { id: ids.sources, title: "المصادر الوسطية", tooltip: "قراءة نقدية لمتون ابن حوقل والبكري حول سجلماسة والقبلة.", parent: ids.root },
      [ids.water]: { id: ids.water, title: "الماء", tooltip: "محدد بنيوي للاستقرار والعمران الواحاتي.", parent: ids.root },
      [ids.trade]: { id: ids.trade, title: "التجارة", tooltip: "قاطرة اقتصاد سجلماسة ووسيط العبور عبر الصحراء.", parent: ids.root },
      [ids.ksours]: { id: ids.ksours, title: "القصور والقصبات", tooltip: "شواهد معمارية لحضارة واحاتية متراكمة.", parent: ids.root },
      [ids.timeline]: { id: ids.timeline, title: "الإطار الزمني", tooltip: "منعطفات مفصلية في تاريخ الجنوب الشرقي المغربي.", parent: ids.root },
      [ids.d140]: { id: ids.d140, title: "140هـ", tooltip: "تأسيس سجلماسة مركزاً للتجارة والسلطة.", parent: ids.timeline },
      [ids.d350]: { id: ids.d350, title: "350هـ", tooltip: "دخول صنهاجة إلى أوذغست وبسط النفوذ.", parent: ids.timeline },
      [ids.d450]: { id: ids.d450, title: "450هـ", tooltip: "إزاحة ممثل زنانة بسجلماسة على يد أتباع عبد الله بن ياسين.", parent: ids.timeline },
    };

    for (const n of Object.values(nodes)) n.children = [];
    for (const n of Object.values(nodes)) if (n.parent) nodes[n.parent].children.push(n.id);

    return { ids, nodes };
  }

  // ---------------- Layout ----------------
  _computeLayout(model) {
    // Responsive dimensions based on screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    const width = isMobile ? 350 : (isTablet ? 600 : 1100);
    const height = isMobile ? 400 : (isTablet ? 500 : 700);
    const cx = width / 2, cy = isMobile ? 120 : (isTablet ? 180 : 260);

    const positions = {};
    positions[model.ids.root] = { x: cx, y: cy };

    // Scale positions based on screen size
    const scale = width / 1100;
    const fontSize = isMobile ? 12 : (isTablet ? 14 : 16);
    
    // Left column (pillars) - adjust for mobile
    const xL = isMobile ? cx - 100 : cx - (300 * scale);
    const yRows = isMobile ? [80, 160, 240] : [170 * scale, 260 * scale, 350 * scale];
    positions[model.ids.studies] = { x: xL, y: cy + yRows[0] - cy };
    positions[model.ids.society] = { x: xL, y: cy + yRows[1] - cy };
    positions[model.ids.sources] = { x: xL, y: cy + yRows[2] - cy };

    // Right column (drivers & outcomes) - adjust for mobile
    const xR = isMobile ? cx + 100 : cx + (300 * scale);
    positions[model.ids.water] = { x: xR, y: cy + yRows[0] - cy };
    positions[model.ids.trade] = { x: xR, y: cy + yRows[1] - cy };
    positions[model.ids.ksours] = { x: xR, y: cy + yRows[2] - cy };

    // Timeline band at bottom - adjust for mobile
    const tY = height - (isMobile ? 80 : 140 * scale);
    positions[model.ids.timeline] = { x: cx, y: tY - (isMobile ? 20 : 40) };
    const txs = [width * 0.25, width * 0.5, width * 0.75];
    positions[model.ids.d140] = { x: txs[0], y: tY };
    positions[model.ids.d350] = { x: txs[1], y: tY };
    positions[model.ids.d450] = { x: txs[2], y: tY };

    return { width, height, center: { x: cx, y: cy }, positions, tY, fontSize, scale };
  }

  // ---------------- Render ----------------
  _render() {
    const { width, height, tY } = this.layout;
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

    // Subtle parchment-like band for the timeline
    const band = this._el("rect", {
      x: 60, y: tY - 18, width: width - 120, height: 60, rx: 10, ry: 10,
      fill: "#fff8eb", stroke: "#e7cba4", "stroke-width": 1
    });
    this.gridLayer.appendChild(band);

    // Horizontal axis for dates
    const axis = this._el("line", { x1: 100, y1: tY, x2: width - 100, y2: tY, stroke: "#d6ad7b", "stroke-width": 1.5, "stroke-dasharray": "4 6" });
    this.gridLayer.appendChild(axis);

    // Edges from root to left/right columns
    this._edges = [];
    const children = [this.model.ids.studies, this.model.ids.society, this.model.ids.sources, this.model.ids.water, this.model.ids.trade, this.model.ids.ksours, this.model.ids.timeline];
    children.forEach(id => this._addEdge(this.model.ids.root, id));

    // Edges from timeline hub to dates
    [this.model.ids.d140, this.model.ids.d350, this.model.ids.d450].forEach(id => this._addEdge(this.model.ids.timeline, id));

    // Nodes
    this._nodeEls = {};
    // Root (slightly larger)
    this._nodeEls[this.model.ids.root] = this._nodeGroup(this.model.ids.root, { r: 22, halo: 32, font: 20, dy: -36, strong: true });

    // Left column
    [this.model.ids.studies, this.model.ids.society, this.model.ids.sources].forEach(id => {
      this._nodeEls[id] = this._nodeGroup(id, { r: 16, halo: 24, font: 18, dy: -30 });
    });
    // Right column
    [this.model.ids.water, this.model.ids.trade, this.model.ids.ksours].forEach(id => {
      this._nodeEls[id] = this._nodeGroup(id, { r: 16, halo: 24, font: 18, dy: -30 });
    });
    // Timeline hub and dates
    this._nodeEls[this.model.ids.timeline] = this._nodeGroup(this.model.ids.timeline, { r: 16, halo: 24, font: 18, dy: -34 });
    [this.model.ids.d140, this.model.ids.d350, this.model.ids.d450].forEach(id => {
      this._nodeEls[id] = this._nodeGroup(id, { r: 12, halo: 18, font: 16, dy: -24 });
    });
  }

  _addEdge(parentId, childId) {
    const p1 = this._pos(parentId);
    const p2 = this._pos(childId);
    const path = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    const edge = this._el("path", {
      d: path, fill: "none", stroke: "#9a6a2f", "stroke-width": 2.2, "stroke-linecap": "round", class: "edge", filter: "url(#softShadow)"
    });
    this.edgesLayer.appendChild(edge);
    this._edges.push({ id: childId, parent: parentId, edge });
  }

  _nodeGroup(id, opts) {
    const p = this._pos(id);
    const g = this._el("g", { class: "node-group", transform: `translate(${p.x}, ${p.y}) scale(0.9)`, opacity: 0, "data-node-id": id });
    const circle = this._el("circle", { r: opts.r, fill: "#fffef7", stroke: "#b45309", "stroke-width": 2.2, filter: "url(#softShadow)", class: "node-circle" });
    const halo = this._el("circle", { r: opts.halo, fill: "none", stroke: "#f59e0b", "stroke-width": 1, opacity: 0.22, class: "node-halo" });
    const label = this._el("text", { x: 0, y: opts.dy, "text-anchor": "middle", "font-size": opts.font, "font-weight": opts.strong ? 800 : 700, fill: "#1c1917", style: "font-family: 'Amiri', 'Scheherazade New', 'Tajawal', system-ui, sans-serif;" }, this.model.nodes[id].title);
    g.append(halo, circle, label);
    this.nodesLayer.appendChild(g);

    g.addEventListener("mouseenter", (e) => this._focusNode(id, e));
    g.addEventListener("mouseleave", () => this._resetFocus());
    g.addEventListener("mousemove", (e) => this._moveTooltip(e, this.model.nodes[id]));

    return { id, g, circle, halo, label };
  }

  _pos(id) { return this.layout.positions[id]; }

  // ---------------- Intro ----------------
  _intro() {
    // Fade in edges subtly
    this._edges.forEach(({ edge }, i) => {
      edge.style.opacity = "0";
      edge.style.transition = `opacity 500ms ease ${100 + i * 60}ms`;
      requestAnimationFrame(() => { edge.style.opacity = "1"; });
    });

    // Pop nodes in columns, then timeline
    const order = [
      this.model.ids.root,
      this.model.ids.studies, this.model.ids.society, this.model.ids.sources,
      this.model.ids.water, this.model.ids.trade, this.model.ids.ksours,
      this.model.ids.timeline, this.model.ids.d140, this.model.ids.d350, this.model.ids.d450
    ];
    order.forEach((id, i) => this._animateIn(this._nodeEls[id].g, { delay: 150 + i * 90 }));
  }

  _animateIn(g, opts = {}) {
    const delay = opts.delay || 0;
    g.style.transition = `opacity 420ms ease ${delay}ms, transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;
    const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
    const translate = m ? `translate(${m[1]})` : "";
    g.setAttribute("transform", `${translate} scale(0.9)`);
    requestAnimationFrame(() => {
      g.style.opacity = "1";
      g.setAttribute("transform", `${translate} scale(1)`);
    });
  }

  // ---------------- Interactions & Tooltip ----------------
  _focusNode(id, evt) {
    const n = this.model.nodes[id];
    this._showTooltip(n.tooltip, evt);

    // deemphasize others
    this.edgesLayer.style.opacity = "0.6";
    this.nodesLayer.style.opacity = "0.88";

    // Related nodes (parent + children)
    const related = new Set([id]);
    if (n.parent) related.add(n.parent);
    n.children.forEach(c => related.add(c));

    // Edges highlight
    this._edges.forEach(({ id: childId, parent, edge }) => {
      const involved = related.has(childId) || related.has(parent);
      edge.style.stroke = involved ? "#b7791f" : "#9a6a2f";
      edge.style.strokeWidth = involved ? "3.2" : "2.2";
      edge.style.opacity = involved ? "1" : "0.35";
    });

    // Nodes highlight
    Object.values(this._nodeEls).forEach(({ g, label, circle }) => {
      const gid = g.getAttribute("data-node-id");
      const isRelated = related.has(gid);
      if (isRelated) {
        g.style.filter = "url(#glow)";
        g.style.opacity = "1";
        g.style.transform += " scale(1.04)";
        label.setAttribute("fill", "#0c0a09");
        circle.setAttribute("stroke", "#b45309");
      } else {
        g.style.filter = "none";
        g.style.opacity = "0.45";
        label.setAttribute("fill", "#44403c");
      }
    });
  }

  _resetFocus() {
    this.edgesLayer.style.opacity = "1";
    this.nodesLayer.style.opacity = "1";

    this._edges.forEach(({ edge }) => {
      edge.style.stroke = "#9a6a2f";
      edge.style.strokeWidth = "2.2";
      edge.style.opacity = "1";
    });

    Object.values(this._nodeEls).forEach(({ g, label, circle }) => {
      g.style.filter = "none";
      const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
      const translate = m ? `translate(${m[1]})` : "";
      g.setAttribute("transform", `${translate} scale(1)`);
      g.style.opacity = "1";
      label.setAttribute("fill", "#1c1917");
      circle.setAttribute("stroke", "#b45309");
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
    const pad = 14; const x = evt.clientX + pad; const y = evt.clientY + pad;
    this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
  }

  _hideTooltip() { if (this.tooltip) this.tooltip.style.opacity = "0"; }

  // ---------------- SVG utils ----------------
  _createSVG() { const svg = this._el("svg"); this.element.appendChild(svg); return svg; }
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
      /* Minimal, scholarly styling */
      .edges-layer path.edge { transition: stroke 200ms ease, stroke-width 200ms ease, opacity 200ms ease; }
      .nodes-layer .node-group { transition: opacity 200ms ease, filter 200ms ease; }
    `;
    document.head.appendChild(style);
    this._stylesInjected = true;
  }
}
