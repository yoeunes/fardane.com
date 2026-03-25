import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="flood-timeline"
export default class extends Controller {
  static targets = ["body", "icon"];

  connect() {
    // Show first event body by default
    if (this.hasBodyTarget) {
      this.bodyTargets[0]?.classList.remove("hidden");
    }
    if (this.hasIconTarget) {
      this.iconTargets[0]?.classList.add("rotate-180");
    }
  }

  toggle(event) {
    const wrapper = event.currentTarget.parentElement;
    const body = wrapper.querySelector("[data-flood-timeline-target='body']");
    const icon = event.currentTarget.querySelector("[data-flood-timeline-target='icon']");

    if (!body) return;

    const isHidden = body.classList.contains("hidden");

    // Close all
    this.bodyTargets.forEach((b) => b.classList.add("hidden"));
    this.iconTargets.forEach((i) => i.classList.remove("rotate-180"));

    // Open clicked one if it was closed
    if (isHidden) {
      body.classList.remove("hidden");
      icon?.classList.add("rotate-180");
    }
  }
}
