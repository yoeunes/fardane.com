import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="water-clock"
export default class extends Controller {
  static targets = ["level", "statusText", "toggleBtn", "typePanel", "typeBtn"];

  connect() {
    this.level = 90;
    this.running = true;
    this.direction = "drain";
    this._timer = null;
    this.startAnimation();
    this.showPanel("clepsydra");
  }

  disconnect() {
    if (this._timer) cancelAnimationFrame(this._timer);
  }

  startAnimation() {
    let lastTs = null;
    const step = (ts) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (this.running) {
        if (this.direction === "drain") {
          this.level -= dt * 6;
          if (this.level <= 4) {
            this.level = 4;
            this.direction = "fill";
            if (this.hasStatusTextTarget) this.statusTextTarget.textContent = "الإناء يُملأ من جديد...";
          }
        } else {
          this.level += dt * 6;
          if (this.level >= 90) {
            this.level = 90;
            this.direction = "drain";
            if (this.hasStatusTextTarget) this.statusTextTarget.textContent = "الماء يتسرّب...";
          }
        }
        if (this.hasLevelTarget) {
          this.levelTarget.style.height = this.level + "%";
          this.levelTarget.style.backgroundColor =
            this.level < 25 ? "#fbbf24" : "#93c5fd";
        }
      }

      this._timer = requestAnimationFrame(step);
    };
    this._timer = requestAnimationFrame(step);
  }

  togglePause() {
    this.running = !this.running;
    if (this.hasToggleBtnTarget) {
      this.toggleBtnTarget.textContent = this.running ? "⏸ إيقاف" : "▶ تشغيل";
    }
    if (!this.running && this.hasStatusTextTarget) {
      this.statusTextTarget.textContent = "متوقف";
    } else if (this.running && this.hasStatusTextTarget) {
      this.statusTextTarget.textContent =
        this.direction === "drain" ? "الماء يتسرّب..." : "الإناء يُملأ من جديد...";
    }
  }

  switchType(event) {
    const typeId = event.params.typePanelId;
    this.typeBtnTargets.forEach((btn) => {
      const isActive = btn.dataset.waterClockTypePanelIdParam === typeId;
      btn.classList.toggle("bg-amber-700", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("border-amber-700", isActive);
      btn.classList.toggle("bg-stone-100", !isActive);
      btn.classList.toggle("text-stone-700", !isActive);
      btn.classList.toggle("border-stone-200", !isActive);
    });
    this.showPanel(typeId);
  }

  showPanel(typeId) {
    this.typePanelTargets.forEach((p) => {
      p.classList.toggle("hidden", p.dataset.panelId !== typeId);
    });
  }
}
