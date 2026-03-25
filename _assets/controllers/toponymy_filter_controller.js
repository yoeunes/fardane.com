import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="toponymy-filter"
export default class extends Controller {
  static targets = ["card", "btn"];

  connect() {
    this.active = "all";
  }

  filter(event) {
    this.active = event.params.cat;

    this.btnTargets.forEach((btn) => {
      const isActive = btn.dataset.toponymyFilterCatParam === this.active;
      btn.classList.toggle("bg-amber-700", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("border-amber-700", isActive);
      btn.classList.toggle("bg-white", !isActive);
      btn.classList.toggle("text-stone-700", !isActive);
      btn.classList.toggle("border-stone-300", !isActive);
    });

    this.cardTargets.forEach((card) => {
      const visible = this.active === "all" || card.dataset.cat === this.active;
      card.classList.toggle("hidden", !visible);
    });
  }
}
