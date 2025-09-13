import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="circle-diagram"
// Static, non-interactive circular diagram (academic style)
// - Central root: "الموروث الثقافي"
// - Six core concepts arranged evenly on a ring
// - No historical timeline/dates
// - No mouse/hover/click actions (pointer-events: none)
export default class extends Controller {
  static targets = ["svg"]; 

  connect() {
    // Host SVG
    this.svg = this.hasSvgTarget ? this.svgTarget : this._createSVG();
    this.element.style.direction = "rtl";
    this.element.style.userSelect = "none";
    this.element.style.position = "relative";

    // Prevent any mouse interaction
    this.svg.style.pointerEvents = "none";

    this._injectStyles();
    this.model = this._buildModel();
    this.layout = this._computeLayout(this.model);
    this._render();
    this._intro();
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
    };

    const nodes = {
      [ids.root]: { id: ids.root, title: "الموروث الثقافي" },
      [ids.studies]: { id: ids.studies, title: "الدراسات التاريخية", parent: ids.root },
      [ids.society]: { id: ids.society, title: "البنى المجتمعية", parent: ids.root },
      [ids.sources]: { id: ids.sources, title: "المصادر الوسطية", parent: ids.root },
      [ids.water]: { id: ids.water, title: "الماء", parent: ids.root },
      [ids.trade]: { id: ids.trade, title: "التجارة", parent: ids.root },
      [ids.ksours]: { id: ids.ksours, title: "القصور والقصبات", parent: ids.root },
    };

    return { ids, nodes };
  }

  // ---------------- Layout ----------------
  _computeLayout(model) {
    const width = 1100, height = 600;
    const cx = width / 2, cy = height / 2 + 6;

    const positions = {};
    positions[model.ids.root] = { x: cx, y: cy };

    const ringIds = [
      model.ids.studies,
      model.ids.society,
      model.ids.sources,
      model.ids.water,
      model.ids.trade,
      model.ids.ksours,
    ];

    const ringR = 220;
    const startDeg = -20; // aesthetically balanced start
    ringIds.forEach((id, i) => {
      const a = (startDeg + i * (360 / ringIds.length)) * Math.PI / 180;
      positions[id] = { x: cx + ringR * Math.cos(a), y: cy + ringR * Math.sin(a), angle: a };
    });

    return { width, height, center: { x: cx, y: cy }, positions, ringR };
  }

  // ---------------- Render ----------------
  _render() {
    const { width, height } = this.layout;
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    this.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.svg.classList.add("w-full", "h-auto");

    // defs
    const defs = this._el("defs");
    defs.appendChild(this._softShadow());
    this.svg.appendChild(defs);

    // layers
    this.gridLayer = this._el("g", { class: "grid-layer" });
    this.nodesLayer = this._el("g", { class: "nodes-layer" });
    this.edgesLayer = this._el("g", { class: "edges-layer" });
    this.svg.append(this.gridLayer, this.edgesLayer, this.nodesLayer);

    const { x: cx, y: cy } = this.layout.center;

    // Background faint ring
    const ring = this._el("circle", {
      cx, cy, r: this.layout.ringR,
      fill: "none",
      stroke: "#edd8b2",
      "stroke-width": 1.2,
      "stroke-dasharray": "2 6",
      opacity: 0.9
    });
    this.gridLayer.appendChild(ring);

    // Center hub
    const hubG = this._el("g", { transform: `translate(${cx}, ${cy}) scale(0.85)`, opacity: 0 });
    const hubCircle = this._el("circle", { r: 28, fill: "#fff8eb", stroke: "#b45309", "stroke-width": 2.2, filter: "url(#softShadow)" });
    const hubHalo = this._el("circle", { r: 44, fill: "none", stroke: "#f59e0b", "stroke-width": 1.2, opacity: 0.22 });
    const hubLabel = this._el("text", {
      x: 0, y: -50, "text-anchor": "middle",
      "font-size": 22, "font-weight": 800, fill: "#1c1917",
      style: "font-family: 'Tajawal','Amiri','Scheherazade New',system-ui,sans-serif;"
    }, this.model.nodes[this.model.ids.root].title);
    hubG.append(hubHalo, hubCircle, hubLabel);
    this.nodesLayer.appendChild(hubG);
    this.hubG = hubG;

    // Rays (thin, discreet)
    const ringIds = [this.model.ids.studies, this.model.ids.society, this.model.ids.sources, this.model.ids.water, this.model.ids.trade, this.model.ids.ksours];
    ringIds.forEach(id => {
      const p = this._pos(id);
      const line = this._el("line", { x1: cx, y1: cy, x2: p.x, y2: p.y, stroke: "#d9c3a0", "stroke-width": 1.2, opacity: 0.8 });
      this.edgesLayer.appendChild(line);
    });

    // Ring nodes
    this.nodeGroups = [];
    ringIds.forEach(id => {
      const p = this._pos(id);
      const g = this._el("g", { transform: `translate(${p.x}, ${p.y}) scale(0.8)`, opacity: 0 });
      const c = this._el("circle", { r: 16, fill: "#fffef7", stroke: "#b45309", "stroke-width": 2, filter: "url(#softShadow)" });
      const halo = this._el("circle", { r: 26, fill: "none", stroke: "#f59e0b", "stroke-width": 1, opacity: 0.18 });
      const label = this._el("text", { x: 0, y: -34, "text-anchor": "middle", "font-size": 18, "font-weight": 700, fill: "#1c1917", style: "font-family: 'Tajawal','Amiri','Scheherazade New',system-ui,sans-serif;" }, this.model.nodes[id].title);
      g.append(halo, c, label);
      this.nodesLayer.appendChild(g);
      this.nodeGroups.push(g);
    });
  }

  _intro() {
    // One-time gentle fade/scale in
    const pop = (g, delay = 0, startScale = 0.85) => {
      g.style.transition = `opacity 600ms ease ${delay}ms, transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;
      const m = /translate\(([^)]+)\)/.exec(g.getAttribute("transform"));
      const translate = m ? `translate(${m[1]})` : "";
      g.setAttribute("transform", `${translate} scale(${startScale})`);
      requestAnimationFrame(() => {
        g.style.opacity = "1";
        g.setAttribute("transform", `${translate} scale(1)`);
      });
    };

    pop(this.hubG, 100, 0.85);
    this.nodeGroups.forEach((g, i) => pop(g, 250 + i * 120, 0.8));
  }

  // ---------------- Utils ----------------
  _pos(id) {
    return this.layout.positions[id] || { ...this.layout.center };
  }

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

  _softShadow() {
    const f = this._el("filter", { id: "softShadow", x: "-20%", y: "-20%", width: "140%", height: "140%" });
    f.appendChild(this._el("feDropShadow", { dx: 0, dy: 2, stdDeviation: 2, floodColor: "#000000", floodOpacity: 0.08 }));
    return f;
  }

  _injectStyles() {
    if (this._stylesInjected) return;
    const style = document.createElement("style");
    style.textContent = `
      /* quiet academic tone; no looping effects */
    `;
    document.head.appendChild(style);
    this._stylesInjected = true;
  }
}
