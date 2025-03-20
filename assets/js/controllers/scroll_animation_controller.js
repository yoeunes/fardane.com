import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    static targets = ["parallax"];

    connect() {
        this.initializeParallaxElements();
        this.initializeScrollEffects();
    }

    disconnect() {
        // Clean up scroll triggers when controller is disconnected
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    initializeParallaxElements() {
        if (this.hasParallaxTarget) {
            this.parallaxTargets.forEach(element => {
                // Get the speed attribute or default to 0.5
                const speed = element.dataset.speed || 0.5;

                gsap.to(element, {
                    y: () => `${ScrollTrigger.maxScroll(window) * speed * -1}px`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: element.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }
    }

    initializeScrollEffects() {
        // Add fade-in effect to main sections when scrolled into view
        const mainSections = document.querySelectorAll('main > section');

        mainSections.forEach(section => {
            // Only apply to sections without specific animation controllers
            if (!section.hasAttribute('data-controller')) {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }
        });

        // Animate the header background on scroll
        const header = document.querySelector('header');
        if (header) {
            ScrollTrigger.create({
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    // Add scroll progress as a CSS variable for potential effects
                    document.documentElement.style.setProperty('--scroll-progress', self.progress.toFixed(2));
                }
            });
        }
    }
}
