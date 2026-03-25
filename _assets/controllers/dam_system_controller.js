import { Controller } from "@hotwired/stimulus";

// Dam data: each entry is a real Moroccan dam with geo-schematic position
const DAMS = [
  { id: "mohV",        name: "سد محمد الخامس",           basin: "حوض ملوية",       cap: 730,  fill: 37,  era: 1967, x: 310, y: 112, r: 11, fc: "#a8a29e" },
  { id: "moulay",      name: "سد مولاي يوسف",             basin: "حوض أم الربيع",   cap: 177,  fill: 58,  era: 1974, x: 165, y: 215, r:  8, fc: "#78716c" },
  { id: "hassanD",     name: "سد الحسن الداخل",           basin: "حوض الزيز",       cap: 1050, fill: 38,  era: 1974, x: 272, y: 208, r: 11, fc: "#a8a29e" },
  { id: "mansour",     name: "سد منصور الذهبي",           basin: "حوض درعة",        cap: 460,  fill: 45,  era: 1974, x: 228, y: 275, r:  9, fc: "#78716c" },
  { id: "ibnyoussef",  name: "سد يوسف بن تاشفين",         basin: "حوض سوس",         cap: 270,  fill: 62,  era: 1974, x:  95, y: 300, r:  9, fc: "#d97706" },
  { id: "idris",       name: "سد إدريس الأول",            basin: "حوض سبو",         cap: 800,  fill: 71,  era: 1974, x: 240, y: 105, r: 11, fc: "#d97706" },
  { id: "smba",        name: "سد سيدي محمد بن عبد الله", basin: "حوض أبي رقراق",   cap: 1100, fill: 99,  era: 1974, x: 158, y: 122, r: 13, fc: "#b45309" },
  { id: "ibnbattouta", name: "سد ابن بطوطة",              basin: "حوض اللوكوس",     cap: 434,  fill: 100, era: 1986, x: 182, y:  72, r:  9, fc: "#b45309" },
  { id: "wahda",       name: "سد الوحدة",                 basin: "حوض سبو",         cap: 3800, fill: 66,  era: 1997, x: 210, y: 118, r: 14, fc: "#d97706" },
  { id: "ghiss",       name: "سد غيس",                   basin: "حوض ملوية",       cap:  93,  fill: 80,  era: 2026, x: 268, y:  52, r:  7, fc: "#b45309" },
];

// Decade milestones for the timeline
const ERAS = [
  { year: 1967, dams: 13,  cap: 2.4,  desc: "الإرث الاستعماري" },
  { year: 1974, dams: 22,  cap: 7.0,  desc: "موجة التأسيس"     },
  { year: 1986, dams: 55,  cap: 12.0, desc: "التسارع الكبير"   },
  { year: 1997, dams: 100, cap: 15.0, desc: "المليون هكتار"    },
  { year: 2026, dams: 153, cap: 20.8, desc: "الواقع الراهن"    },
];

// Connects to data-controller="dam-system"
export default class extends Controller {
  static targets = [
    "decadeBtn", "eraDesc",
    "damCount", "capacity",
    "detailPanel", "hint",
    "detailName", "detailBasin", "detailCap", "detailEra",
    "fillPct", "waterBody",
  ];

  connect() {
    this._started = false;
    this._activeEraYear = null;

    // Lazy-init on scroll-into-view
    this._observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this._init(); },
      { threshold: 0.15 }
    );
    this._observer.observe(this.element);
  }

  disconnect() {
    if (this._observer) this._observer.disconnect();
  }

  // Called when a decade button is clicked
  selectEra(event) {
    const year = parseInt(event.currentTarget.dataset.year, 10);
    this._activateEra(year);
  }

  // Called when a dam node is clicked on the SVG map
  selectDam(event) {
    // Walk up to find the group with data-dam-id
    let el = event.target;
    while (el && !el.dataset.damId) el = el.parentElement;
    if (!el) return;

    const dam = DAMS.find(d => d.id === el.dataset.damId);
    if (!dam) return;

    // Show detail, hide hint
    if (this.hasDetailPanelTarget) this.detailPanelTarget.classList.remove("hidden");
    if (this.hasHintTarget) this.hintTarget.classList.add("hidden");

    // Populate text fields
    if (this.hasDetailNameTarget)  this.detailNameTarget.textContent  = dam.name;
    if (this.hasDetailBasinTarget) this.detailBasinTarget.textContent = dam.basin;
    if (this.hasDetailCapTarget)   this.detailCapTarget.textContent   =
      dam.cap >= 1000 ? (dam.cap / 1000).toFixed(1) + " مليار م³" : dam.cap + " مليون م³";
    if (this.hasDetailEraTarget)   this.detailEraTarget.textContent   = dam.era;
    if (this.hasFillPctTarget)     this.fillPctTarget.textContent     = dam.fill + "٪";

    // Animate water level: reset to 0 then animate to fill%
    if (this.hasWaterBodyTarget) {
      const wb = this.waterBodyTarget;
      wb.style.transition = "none";
      wb.style.height = "0%";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        wb.style.transition = "height 1.2s ease-out";
        wb.style.height = dam.fill + "%";
      }));
    }

    // Update fill-% color
    if (this.hasFillPctTarget) {
      const fp = this.fillPctTarget;
      fp.style.color = dam.fill >= 80 ? "#92400e" : dam.fill >= 50 ? "#78350f" : "#57534e";
    }

    // Highlight selected dam ring on SVG, reset others
    this.element.querySelectorAll(".ds-ring").forEach(ring => {
      ring.setAttribute("stroke", "#92400e");
      ring.setAttribute("stroke-width", "1.5");
    });
    const selectedRing = this.element.querySelector(`[data-dam-id="${dam.id}"] .ds-ring`);
    if (selectedRing) {
      selectedRing.setAttribute("stroke", "#fbbf24");
      selectedRing.setAttribute("stroke-width", "3.5");
    }
  }

  // ── Private ────────────────────────────────────────────────

  _init() {
    if (this._started) return;
    this._started = true;
    this._observer.disconnect();
    // Stagger the first reveal slightly so the element is fully visible
    setTimeout(() => this._activateEra(1967), 350);
  }

  _activateEra(year) {
    this._activeEraYear = year;
    const era = ERAS.find(e => e.year === year);
    if (!era) return;

    // Decade button active states
    this.decadeBtnTargets.forEach(btn => {
      const active = parseInt(btn.dataset.year, 10) === year;
      btn.classList.toggle("bg-amber-700",   active);
      btn.classList.toggle("text-white",     active);
      btn.classList.toggle("ring-2",         active);
      btn.classList.toggle("ring-amber-400", active);
      btn.classList.toggle("bg-stone-700",   !active);
      btn.classList.toggle("text-stone-300", !active);
      btn.classList.toggle("ring-0",         !active);
    });

    // Era description label
    if (this.hasEraDescTarget) this.eraDescTarget.textContent = era.desc;

    // Animate stat counters
    this._countTo(this.damCountTarget, era.dams, 0, 0.9);
    this._countTo(this.capacityTarget, era.cap, 1, 0.9);

    // Reveal / hide dam nodes on the SVG map
    DAMS.forEach(dam => {
      const node = this.element.querySelector(`[data-dam-id="${dam.id}"]`);
      if (!node) return;

      const visible = dam.era <= year;
      const alreadyRevealed = node.dataset.dsRevealed === "1";
      const isNew = dam.era === year && !alreadyRevealed;

      if (visible) {
        node.dataset.dsRevealed = "1";
        node.style.opacity = "1";

        if (isNew) {
          // Pop-in bounce: scale 0 → 1 with spring
          node.style.transition = "none";
          node.style.transform  = "scale(0)";
          requestAnimationFrame(() => requestAnimationFrame(() => {
            node.style.transition = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s";
            node.style.transform  = "scale(1)";
          }));
        } else {
          node.style.transition = "opacity 0.4s, transform 0.4s";
          node.style.transform  = "scale(1)";
        }
      } else {
        node.dataset.dsRevealed = "";
        node.style.transition = "opacity 0.4s, transform 0.4s";
        node.style.opacity = "0.1";
        node.style.transform = "scale(0.5)";
      }
    });
  }

  // Smooth numeric counter animation
  _countTo(el, target, decimals, duration) {
    if (!el) return;
    const start = parseFloat(el.textContent.replace(/[^\d.]/g, "")) || 0;
    const t0 = performance.now();
    const ms = duration * 1000;
    const step = now => {
      const t    = Math.min((now - t0) / ms, 1);
      const ease = 1 - (1 - t) ** 3; // cubic ease-out
      const val  = start + (target - start) * ease;
      el.textContent = decimals ? val.toFixed(decimals) : Math.round(val);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
