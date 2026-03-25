import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="water-eras"
// Interactive clickable era selector for the history of urban water supply
export default class extends Controller {
  static targets = ["eraBtn", "eraDetail", "progressFill", "eraCounter"];

  connect() {
    this._currentIdx = 0;
    this._setupObserver();
  }

  _setupObserver() {
    if (!("IntersectionObserver" in window)) {
      this._animateIn();
      return;
    }
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this._animateIn();
            this._observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    this._observer.observe(this.element);
  }

  _animateIn() {
    this.eraBtnTargets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(20px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }, 100 + i * 120);
    });
    // Auto-select the first era after animation
    setTimeout(() => {
      if (this.eraBtnTargets.length > 0) {
        this._activate(0);
      }
    }, 200);
  }

  selectEra(event) {
    const idx = parseInt(event.currentTarget.dataset.eraIndex || "0", 10);
    this._activate(idx);
  }

  next() {
    const next = Math.min(this._currentIdx + 1, this.eraBtnTargets.length - 1);
    this._activate(next);
  }

  prev() {
    const prev = Math.max(this._currentIdx - 1, 0);
    this._activate(prev);
  }

  _activate(idx) {
    this._currentIdx = idx;
    const total = this.eraBtnTargets.length;

    // Update button states
    this.eraBtnTargets.forEach((el, i) => {
      const active = i === idx;
      el.classList.toggle("bg-amber-700", active);
      el.classList.toggle("text-white", active);
      el.classList.toggle("ring-2", active);
      el.classList.toggle("ring-amber-400", active);
      el.classList.toggle("bg-white", !active);
      el.classList.toggle("text-stone-700", !active);
    });

    // Show/hide detail panels
    this.eraDetailTargets.forEach((el, i) => {
      const visible = i === idx;
      el.classList.toggle("hidden", !visible);
      if (visible) {
        el.style.opacity = "0";
        el.style.transform = "translateY(8px)";
        requestAnimationFrame(() => {
          el.style.transition = "opacity 0.4s, transform 0.4s";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }
    });

    // Update progress fill
    if (this.hasProgressFillTarget) {
      const pct = ((idx + 1) / total) * 100;
      this.progressFillTarget.style.transition = "width 0.5s ease";
      this.progressFillTarget.style.width = pct + "%";
    }

    // Update counter
    if (this.hasEraCounterTarget) {
      this.eraCounterTarget.textContent = `${idx + 1} / ${total}`;
    }
  }

  disconnect() {
    if (this._observer) this._observer.disconnect();
  }
}
