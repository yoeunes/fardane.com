import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="mineral-springs"
// Interactive tabbed comparison of Morocco's three main mineral water springs
export default class extends Controller {
  static targets = ["tab", "panel", "mineralBar", "mineralValue"];

  connect() {
    this._activeIdx = 0;
    this._barsAnimated = false;
    this._activateTab(0);
    this._setupObserver();
  }

  _setupObserver() {
    if (!("IntersectionObserver" in window)) {
      this._animateBars();
      return;
    }
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !this._barsAnimated) {
            this._animateBars();
            this._barsAnimated = true;
          }
        });
      },
      { threshold: 0.25 }
    );
    this._observer.observe(this.element);
  }

  selectTab(event) {
    const idx = parseInt(event.currentTarget.dataset.tabIndex || "0", 10);
    this._activateTab(idx);
    // Re-animate bars for the newly active panel
    setTimeout(() => this._animateBars(), 60);
  }

  _activateTab(idx) {
    this._activeIdx = idx;

    this.tabTargets.forEach((t, i) => {
      const active = i === idx;
      t.classList.toggle("bg-amber-700", active);
      t.classList.toggle("text-white", active);
      t.classList.toggle("shadow-md", active);
      t.classList.toggle("bg-stone-100", !active);
      t.classList.toggle("text-stone-700", !active);
    });

    this.panelTargets.forEach((p, i) => {
      p.classList.toggle("hidden", i !== idx);
    });
  }

  _animateBars() {
    // Only animate bars in visible panels
    this.panelTargets.forEach((panel, panelIdx) => {
      if (panelIdx !== this._activeIdx) return;
      panel.querySelectorAll("[data-mineral-bar]").forEach((bar) => {
        const target = parseInt(bar.dataset.targetWidth || "0", 10);
        bar.style.width = "0%";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.transition = "width 1.1s cubic-bezier(0.4,0,0.2,1)";
            bar.style.width = target + "%";
          });
        });
      });
    });
  }

  disconnect() {
    if (this._observer) this._observer.disconnect();
  }
}
