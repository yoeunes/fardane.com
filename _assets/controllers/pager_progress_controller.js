import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="pager-progress"
// Animated progress visualization for PAGER rural water access expansion (1995→2024)
export default class extends Controller {
  static targets = ["bar", "counter", "milestone"];

  connect() {
    this._animated = false;
    this._setupObserver();
  }

  _setupObserver() {
    if (!("IntersectionObserver" in window)) {
      this._animate();
      return;
    }
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !this._animated) {
            this._animated = true;
            this._animate();
            this._observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    this._observer.observe(this.element);
  }

  _animate() {
    // Animate progress bars
    this.barTargets.forEach((bar, i) => {
      const target = parseFloat(bar.dataset.targetValue || "0");
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.transition = `width 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 120}ms`;
        bar.style.width = target + "%";
      }, 100);
    });

    // Animate counters
    this.counterTargets.forEach((el, i) => {
      const target = parseFloat(el.dataset.targetValue || "0");
      const suffix = el.dataset.suffix || "%";
      const duration = 1400 + i * 120;
      setTimeout(() => {
        this._countUp(el, 0, target, duration, suffix);
      }, 200 + i * 120);
    });

    // Stagger milestone reveals
    this.milestoneTargets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 400 + i * 180);
    });
  }

  _countUp(el, start, end, duration, suffix) {
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (end - start) * eased;
      const display = Number.isInteger(end) ? Math.round(value) : value.toFixed(1);
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  disconnect() {
    if (this._observer) this._observer.disconnect();
  }
}
