import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    connect() {
        this.animateTimeline();
    }

    animateTimeline() {
        // Get all timeline items
        const timelineItems = this.element.querySelectorAll('.timeline-item');

        // Exit if no items found
        if (!timelineItems.length) return;

        // Create a timeline for the animation sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.element,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        // Staggered animation of timeline items
        tl.from(timelineItems, {
            opacity: 0,
            x: 50,
            stagger: 0.4,
            duration: 0.8,
            ease: "power3.out"
        });

        // Animate the connection line after items appear
        const connector = this.element.querySelector('.timeline-connector');
        if (connector) {
            tl.from(connector, {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1.5,
                ease: "power3.inOut"
            }, "-=1");
        }
    }
}
