import { Controller } from "@hotwired/stimulus";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Connects to data-controller="khaldun-concepts"
// Interactive tabbed explorer for the four stages of Ibn Khaldun's civilization cycle
export default class extends Controller {
  static targets = ["tab", "panel"];

  connect() {
    gsap.from(this.element, {
      scrollTrigger: {
        trigger: this.element,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
    this.showConcept(0);
  }

  select(event) {
    this.showConcept(parseInt(event.currentTarget.dataset.index));
  }

  showConcept(index) {
    this.tabTargets.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("bg-amber-700", active);
      tab.classList.toggle("text-white", active);
      tab.classList.toggle("border-amber-600", active);
      tab.classList.toggle("shadow-md", active);
      tab.classList.toggle("bg-stone-50", !active);
      tab.classList.toggle("text-stone-700", !active);
      tab.classList.toggle("border-stone-200", !active);
      tab.classList.toggle("hover:border-amber-400", !active);
    });

    this.panelTargets.forEach((panel, i) => {
      if (i === index) {
        panel.classList.remove("hidden");
        gsap.fromTo(
          panel,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      } else {
        panel.classList.add("hidden");
      }
    });
  }
}
