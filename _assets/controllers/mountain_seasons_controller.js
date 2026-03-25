import { Controller } from "@hotwired/stimulus";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Connects to data-controller="mountain-seasons"
// Interactive seasonal selector showing how Atlas mountains drive Morocco's water cycle
export default class extends Controller {
  static targets = ["btn", "panel"];

  connect() {
    gsap.from(this.element, {
      scrollTrigger: {
        trigger: this.element,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out"
    });
    this.selectSeason(0);
  }

  select(event) {
    this.selectSeason(parseInt(event.currentTarget.dataset.seasonIndex));
  }

  selectSeason(index) {
    this.btnTargets.forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("bg-amber-700", active);
      btn.classList.toggle("text-white", active);
      btn.classList.toggle("shadow-md", active);
      btn.classList.toggle("border-amber-600", active);
      btn.classList.toggle("bg-white", !active);
      btn.classList.toggle("text-stone-600", !active);
      btn.classList.toggle("border-stone-200", !active);
      btn.classList.toggle("hover:border-amber-400", !active);
    });

    this.panelTargets.forEach((panel, i) => {
      if (i === index) {
        panel.classList.remove("hidden");
        gsap.fromTo(
          panel,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      } else {
        panel.classList.add("hidden");
      }
    });
  }
}
