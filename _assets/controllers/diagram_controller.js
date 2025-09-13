import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="diagram"
// This controller renders an animated SVG "knowledge tree" summarizing key concepts
// from Dr. Aziz Fardane's talk on the cultural heritage of Southeastern Morocco.
// It features:
// - Growing branches (stroke-draw animation)
// - Nodes that fade/scale in when their branch reaches them
// - A Timeline node with three orbiting satellite dates
// - Subtle continuous glow/pulse
// - Interactive hover: focus, branch highlight, tooltip near cursor
export default class extends Controller {
  static targets = ["svg"];

  connect() {
    // Prepare SVG root
    this.svg = this.hasSvgTarget ? this.svgTarget : this._createSVG();

    // Make container RTL friendly and neutralize text selection
    this.element.style.direction = "rtl";
    this.element.style.userSelect = "none";
    this.element.style.position = "relative";

    // Build style sheet for animations and filters
    this._injectStyles();

    // Build data model
    this.model = this._buildModel();

    // Precompute layout
    this.layout = this._computeLayout(this.model);

    // Render diagram
    this._renderDiagram();

    // Play intro sequence
    this._playIntro();

    // Start continuous animations (glow runners and orbits)
    this._startContinuousEffects();

    // Tooltip
    this._initTooltip();
  }

  disconnect() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  // ---------------------
  // Data model
  // ---------------------
  _buildModel() {
    // Node identifiers
    const ids = {
      root: "heritage",
      pillars: {
        studies: "historicalStudies",
        society: "societalStructures",
        sources: "medievalSources",
      },
      drivers: {
        water: "water",
        trade: "trade",
      },
      outcomes: {
        ksours: "ksoursKasbahs",
      },
      timeline: {
        node: "timeline",
        d140: "d140",
        d350: "d350",
        d450: "d450",
      },
    };

    // Nodes with labels and tooltips
    const nodes = {
      [ids.root]: {
        id: ids.root,
        title: "الموروث الثقافي",
        tooltip: "المحور المركزي: تحليل المكونات التاريخية للتراث المادي واللامادي.",
      },
      [ids.pillars.studies]: {
        id: ids.pillars.studies,
        title: "الدراسات التاريخية",
        tooltip: "منهجيات البحث التاريخي ومسارات تطوّرها في الكتابة المغربية.",
        parent: ids.root,
      },
      [ids.pillars.society]: {
        id: ids.pillars.society,
        title: "البنى المجتمعية",
        tooltip: "أدوار اتحادات زناتة وصنهاجة في بناء الهوية السياسية والمجالية.",
        parent: ids.root,
      },
      [ids.pillars.sources]: {
        id: ids.pillars.sources,
        title: "المصادر الوسطية",
        tooltip: "قراءة نقدية معمّقة لمتون ابن حوقل والبكري حول سجلماسة والقبلة.",
        parent: ids.root,
      },
      [ids.drivers.water]: {
        id: ids.drivers.water,
        title: "الماء",
        tooltip: "محدد بنيوي للاستقرار والعمران الواحاتي.",
        parent: ids.root,
      },
      [ids.drivers.trade]: {
        id: ids.drivers.trade,
        title: "التجارة",
        tooltip: "قاطرة اقتصاد سجلماسة ووسيط العبور عبر الصحراء.",
        parent: ids.root,
      },
      [ids.outcomes.ksours]: {
        id: ids.outcomes.ksours,
        title: "القصور والقصبات",
        tooltip: "شواهد معمارية لحضارة واحاتية متراكمة.",
        parent: ids.root,
      },
      [ids.timeline.node]: {
        id: ids.timeline.node,
        title: "الإطار الزمني",
        tooltip: "تأريخ المنعطفات المفصلية في الجنوب الشرقي المغربي.",
        parent: ids.root,
      },
      [ids.timeline.d140]: {
        id: ids.timeline.d140,
        title: "140هـ",
        tooltip: "تأسيس سجلماسة مركزاً للتجارة والسلطة.",
        parent: ids.timeline.node,
      },
      [ids.timeline.d350]: {
        id: ids.timeline.d350,
        title: "350هـ",
        tooltip: "دخول صنهاجة إلى أوذغست وبسط النفوذ.",
        parent: ids.timeline.node,
      },
      [ids.timeline.d450]: {
        id: ids.timeline.d450,
        title: "450هـ",
        tooltip: "إزاحة ممثل زنانة بسجلماسة على يد أتباع عبد الله بن ياسين.",
        parent: ids.timeline.node,
      },
    };

    // Build children arrays
    for (const n of Object.values(nodes)) n.children = [];
    for (const n of Object.values(nodes)) {
      if (n.parent) nodes[n.parent].children.push(n.id);
    }

    return { ids, nodes };
  }

  // ---------------------
  // Layout
  // ---------------------
  _computeLayout(model) {
    // Viewbox size
    const width = 1100;
    const height = 700;

    const cx = width / 2;
    const cy = height / 2 + 10;

    const positions = {};

    // Place root
    positions[model.ids.root] = { x: cx, y: cy };

    // Arrange main branches around root (clockwise, RTL aesthetic)
    const radius = 210;
    const mainNodes = [
      model.ids.pillars.studies,
      model.ids.pillars.society,
      model.ids.pillars.sources,
      model.ids.drivers.water,
      model.ids.drivers.trade,
      model.ids.outcomes.ksours,
      model.ids.timeline.node,
    ];

    const angles = [
      -20 * Math.PI / 180,
      15 * Math.PI / 180,
      50 * Math.PI / 180,
      160 * Math.PI / 180,
      200 * Math.PI / 180,
      240 * Math.PI / 180,
      -110 * Math.PI / 180,
    ];

    mainNodes.forEach((id, i) => {
      const a = angles[i];
      positions[id] = {
        x: cx + radius * Math.cos(a),
        y: cy + radius * Math.sin(a),
      };
    });

    // Timeline satellites: define orbit parameters; initial angles staggered
    const orbitR = 74;
    positions[model.ids.timeline.d140] = { orbit: true, angle: 0, r: orbitR };
    positions[model.ids.timeline.d350] = { orbit: true, angle: 120 * Math.PI / 180, r: orbitR };
    positions[model.ids.timeline.d450] = { orbit: true, angle: 240 * Math.PI / 180, r: orbitR };

    return { width, height, positions, center: { x: cx, y: cy } };
  }

  // ---------------------
  // Rendering helpers
  // ---------------------
  _renderDiagram() {
    const { width, height } = this.layout;

    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    this.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.svg.classList.add("w-full", "h-auto");

    // Defs: filters and glow gradient
    const defs = this._el("defs");
    defs.appendChild(this._glowFilter());
    defs.appendChild(this._softShadow());
    this.svg.appendChild(defs);

    // Layers (so we can dim non-focused elements)
    this.edgesLayer = this._el("g", { class: "edges-layer" });
    this.glowLayer = this._el("g", { class: "glow-layer", opacity: 0.0 });
    this.nodesLayer = this._el("g", { class: "nodes-layer" });
    this.labelsLayer = this._el("g", { class: "labels-layer" });

    this.svg.append(this.edgesLayer, this.glowLayer, this.nodesLayer, this.labelsLayer);

    // Render edges (branches) from parent to child with curved paths
    this._edges = [];
    Object.values(this.model.nodes).forEach(node => {
      if (!node.parent) return;
      // Skip satellites (they orbit; drawn separately later)
      if (this.layout.positions[node.id]?.orbit) return;
      const parentPos = this._pos(node.parent);
      const childPos = this._pos(node.id);
      const path = this._branchPath(parentPos, childPos);

      const edge = this._el("path", {
        d: path,
        fill: "none",
        stroke: "#9a6a2f",
        "stroke-width": 2.5,
        "stroke-linecap": "round",
        class: "edge grow-edge",
        filter: "url(#softShadow)",
      });

      // For the moving glow, create a thin dashed overlay per edge
      const glow = this._el("path", {
        d: path,
        fill: "none",
        stroke: "#fbbf24",
        "stroke-width": 2,
        "stroke-linecap": "round",
        class: "edge-glow",
        "stroke-dasharray": "6 180",
        "stroke-dashoffset": "0",
        opacity: 0.0,
        filter: "url(#glow)",
      });

      this.edgesLayer.appendChild(edge);
      this.glowLayer.appendChild(glow);
      this._edges.push({ id: node.id, parent: node.parent, edge, glow });
    });

    // Render nodes (excluding satellites for now)
    this._nodeEls = {};
    Object.values(this.model.nodes).forEach(node => {
      const isSatellite = !!this.layout.positions[node.id]?.orbit;
      if (isSatellite) return;

      const p = this._pos(node.id);
      const g = this._el("g", {
        class: "node-group",
        transform: `translate(${p.x}, ${p.y}) scale(0.7)`,
        opacity: 0,
        "data-node-id": node.id,
      });

      // Circle with subtle gradient-like stroke
      const circle = this._el("circle", {
        r: 18,
        fill: "#fff8eb",
        stroke: "#b45309",
        "stroke-width": 2.5,
        filter: "url(#softShadow)",
        class: "node-circle",
      });

      // Halo
      const halo = this._el("circle", {
        r: 28,
        fill: "none",
        stroke: "#f59e0b",
        "stroke-width": 1.2,
        opacity: 0.25,
        class: "node-halo pulsate",
        filter: "url(#glow)",
      });

      // Label (Arabic)
      const label = this._el("text", {
        x: 0,
        y: -38,
        "text-anchor": "middle",
        "font-size": 19,
        "font-weight": 700,
        fill: "#1c1917",
        style: "font-family: 'Tajawal', 'Amiri', 'Scheherazade New', system-ui, sans-serif;",
        class: "node-label",
      }, node.title);

      // Emphasize the root node visually
      if (node.id === this.model.ids.root) {
        circle.setAttribute("r", 22);
        halo.setAttribute("r", 36);
        label.setAttribute("font-size", 21);
        label.setAttribute("y", -44);
        g.classList.add("root-node");
      }

      g.append(halo, circle, label);
      this.nodesLayer.appendChild(g);
      this._nodeEls[node.id] = { g, circle, halo, label, node };

      // Interactivity
      g.addEventListener("mouseenter", e => this._focusNode(node.id, e));
      g.addEventListener("mouseleave", () => this._resetFocus());
      g.addEventListener("mousemove", e => this._moveTooltip(e, node));
    });

    // Render timeline satellites
    this._timeline = this._nodeEls[this.model.ids.timeline.node];
    this._satellites = [];
    [this.model.ids.timeline.d140, this.model.ids.timeline.d350, this.model.ids.timeline.d450].forEach(id => {
      const sat = this._renderSatellite(id);
      this._satellites.push(sat);
    });

    // Orbit guide circle
    const tPos = this._pos(this.model.ids.timeline.node);
    this.orbitGuide = this._el("circle", {
      cx: tPos.x,
      cy: tPos.y,
      r: this.layout.positions[this.model.ids.timeline.d140].r,
      fill: "none",
      stroke: "#e7cba4",
      "stroke-width": 1,
      "stroke-dasharray": "4 6",
      opacity: 0.7,
      class: "orbit-guide",
    });
    this.edgesLayer.appendChild(this.orbitGuide);
  }

  _renderSatellite(id) {
    const tPos = this._pos(this.model.ids.timeline.node);
    const satLayout = this.layout.positions[id];

    const g = this._el("g", {
      class: "satellite-group",
      opacity: 0,
      transform: `translate(${tPos.x + satLayout.r}, ${tPos.y}) scale(0.6)`,
      "data-node-id": id,
    });

    const circle = this._el("circle", {
      r: 12,
      fill: "#fffef7",
      stroke: "#b45309",
      "stroke-width": 2,
      filter: "url(#softShadow)",
      class: "node-circle",
    });

    const halo = this._el("circle", {
      r: 20,
      fill: "none",
      stroke: "#f59e0b",
      "stroke-width": 1,
      opacity: 0.25,
      class: "node-halo pulsate",
      filter: "url(#glow)",
    });

    const label = this._el("text", {
      x: 0,
      y: -24,
      "text-anchor": "middle",
      "font-size": 16,
      "font-weight": 700,
      fill: "#1c1917",
      style: "font-family: 'Tajawal', 'Amiri', 'Scheherazade New', system-ui, sans-serif;",
      class: "node-label",
    }, this.model.nodes[id].title);

    g.append(halo, circle, label);
    this.nodesLayer.appendChild(g);

    // Interactivity
    g.addEventListener("mouseenter", e => this._focusNode(id, e));
    g.addEventListener("mouseleave", () => this._resetFocus());
    g.addEventListener("mousemove", e => this._moveTooltip(e, this.model.nodes[id]));

    return { id, g, circle, halo, label, layout: satLayout, angle: satLayout.angle };
  }

  _branchPath(p1, p2) {
    // Smooth cubic Bezier branch from p1 to p2
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const c1 = { x: p1.x + dx * 0.35, y: p1.y + dy * 0.05 };
    const c2 = { x: p1.x + dx * 0.75, y: p1.y + dy * 0.95 };
    return `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }

  _pos(id) {
    const p = this.layout.positions[id];
    if (p?.orbit) {
      const t = this._pos(this.model.ids.timeline.node);
      return { x: t.x + p.r * Math.cos(p.angle), y: t.y + p.r * Math.sin(p.angle) };
    }
    return p;
  }

  // ---------------------
  // Intro animation sequence
  // ---------------------
  _playIntro() {
    // Prepare edge draw animations
    this._edges.forEach(({ edge }) => {
      const len = edge.getTotalLength();
      edge.style.strokeDasharray = `${len}`;
      edge.style.strokeDashoffset = `${len}`;
      edge.style.animation = "none";
    });

    // Sequence timings
    const seq = [];
    const order = [
      this.model.ids.pillars.studies,
      this.model.ids.pillars.society,
      this.model.ids.pillars.sources,
      this.model.ids.drivers.water,
      this.model.ids.drivers.trade,
      this.model.ids.outcomes.ksours,
      this.model.ids.timeline.node,
    ];

    // Root node pop-in first
    const root = this._nodeEls[this.model.ids.root].g;
    this._animateIn(root, { delay: 150 });

    // Branches and nodes in order
    order.forEach((id, i) => {
      const edgeObj = this._edges.find(e => e.id === id);
      if (!edgeObj) return;
      const nodeG = this._nodeEls[id].g;

      const delay = 500 + i * 300;
      // draw branch
      setTimeout(() => this._drawEdge(edgeObj.edge), delay);
      // pop node slightly after
      setTimeout(() => this._animateIn(nodeG), delay + 220);
    });

    // Satellites appear after timeline
    setTimeout(() => {
      this._satellites.forEach((s, idx) => this._animateIn(s.g, { scale: 0.8, delay: idx * 180 }));
      // Show orbit guide subtly
      this.orbitGuide.style.transition = "opacity 1200ms ease";
      this.orbitGuide.style.opacity = "1";
    }, 500 + order.length * 300 + 300);
  }

  _drawEdge(edge) {
    const len = edge.getTotalLength();
    edge.style.strokeDasharray = `${len}`;
    edge.style.strokeDashoffset = `${len}`;
    edge.style.animation = "draw 800ms ease-out forwards";
  }

  _animateIn(g, opts = {}) {
    const scale = opts.scale || 0.7;
    const delay = opts.delay || 0;
    g.style.transition = `opacity 500ms ease ${delay}ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;
    // Extract existing translate
    const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
    const translate = m ? `translate(${m[1]})` : "";
    g.setAttribute("transform", `${translate} scale(${scale})`);
    requestAnimationFrame(() => {
      g.style.opacity = "1";
      g.setAttribute("transform", `${translate} scale(1)`);
    });
  }

  // ---------------------
  // Continuous effects
  // ---------------------
  _startContinuousEffects() {
    // Subtle moving glow along branches
    let glowOffset = 0;
    const tick = (t) => {
      glowOffset = (glowOffset + 0.8) % 400;
      this.glowLayer.querySelectorAll("path").forEach(p => {
        p.style.opacity = "0.9";
        p.style.strokeDashoffset = String(glowOffset);
      });

      // Update satellites orbit
      const timelinePos = this._pos(this.model.ids.timeline.node);
      const omega = 0.0008; // radians per ms
      const now = performance.now();
      this._satellites.forEach((s, idx) => {
        s.angle += omega * 16.67; // approximate per frame
        const x = timelinePos.x + s.layout.r * Math.cos(s.angle);
        const y = timelinePos.y + s.layout.r * Math.sin(s.angle);
        s.g.setAttribute("transform", `translate(${x}, ${y}) scale(0.9)`);
      });

      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  // ---------------------
  // Hover focus and tooltip
  // ---------------------
  _focusNode(id, evt) {
    const n = this.model.nodes[id];

    // Tooltip
    this._showTooltip(n.tooltip, evt);

    // Dim all layers
    this.edgesLayer.style.opacity = "0.35";
    this.nodesLayer.style.opacity = "0.5";

    // Emphasize connected edge(s)
    const related = new Set([id]);
    // include parent and children
    if (n.parent) related.add(n.parent);
    n.children.forEach(c => related.add(c));

    // Highlight edges
    this._edges.forEach(({ id: childId, parent, edge, glow }) => {
      const involved = related.has(childId) || related.has(parent);
      if (involved) {
        edge.style.opacity = "1";
        edge.style.stroke = "#b7791f";
        edge.style.strokeWidth = "3.5";
        glow.style.opacity = "1";
      } else {
        edge.style.opacity = "0.25";
        edge.style.strokeWidth = "2";
      }
    });

    // Highlight nodes
    Object.values(this._nodeEls).forEach(({ g, circle, halo, node }) => {
      const isRelated = related.has(node.id);
      if (isRelated) {
        g.style.opacity = "1";
        g.style.filter = "url(#glow)";
        g.style.transformOrigin = "center";
        g.style.transform += " scale(1.06)";
      } else {
        g.style.opacity = "0.35";
        g.style.filter = "none";
      }
    });

    // Satellites
    this._satellites.forEach(s => {
      const isRelated = id === s.id || id === this.model.ids.timeline.node;
      s.g.style.opacity = isRelated ? "1" : "0.35";
      s.g.style.filter = isRelated ? "url(#glow)" : "none";
      s.g.style.transform += isRelated ? " scale(1.06)" : "";
    });
  }

  _resetFocus() {
    // Restore layers
    this.edgesLayer.style.opacity = "1";
    this.nodesLayer.style.opacity = "1";

    // Reset edges
    this._edges.forEach(({ edge, glow }) => {
      edge.style.stroke = "#9a6a2f";
      edge.style.strokeWidth = "2.5";
      glow.style.opacity = "0.9";
    });

    // Reset nodes
    Object.values(this._nodeEls).forEach(({ g }) => {
      g.style.filter = "none";
      // Keep transform translate+scale(1)
      const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
      const translate = m ? `translate(${m[1]})` : "";
      g.setAttribute("transform", `${translate} scale(1)`);
      g.style.opacity = "1";
    });

    // Satellites
    this._satellites.forEach(s => {
      s.g.style.filter = "none";
      s.g.style.opacity = "1";
    });

    // Tooltip
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

  _moveTooltip(evt, node) {
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

  // ---------------------
  // SVG utilities & defs
  // ---------------------
  _createSVG() {
    const svg = this._el("svg");
    this.element.appendChild(svg);
    return svg;
  }

  _el(name, attrs = {}, text = null) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    if (text != null) el.textContent = text;
    return el;
  }

  _glowFilter() {
    const f = this._el("filter", { id: "glow" });
    f.appendChild(this._el("feGaussianBlur", { in: "SourceGraphic", stdDeviation: 3, result: "blur" }));
    f.appendChild(this._el("feMerge", {}));
    const merge = f.querySelector("feMerge");
    merge.appendChild(this._el("feMergeNode", { in: "blur" }));
    merge.appendChild(this._el("feMergeNode", { in: "SourceGraphic" }));
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
      @keyframes pulse {
        0%, 100% { opacity: 0.22; r: 30px; }
        50% { opacity: 0.38; r: 36px; }
      }
      .pulsate { animation: pulse 2400ms ease-in-out infinite; }
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .root-node .node-circle {
        transform-box: fill-box;
        transform-origin: center;
        animation: breathe 5800ms ease-in-out infinite;
      }
      @keyframes dashRotate { to { stroke-dashoffset: -200; } }
      .orbit-guide { animation: dashRotate 14s linear infinite; }
    `;
    document.head.appendChild(style);
    this._stylesInjected = true;
  }
}
