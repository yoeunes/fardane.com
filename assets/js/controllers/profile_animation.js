import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";

export default class extends Controller {
    static targets = ["image"];

    connect() {
        // Create a floating animation for the profile image
        gsap.to(this.imageTarget, {
            y: "-20px",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Add a subtle rotation
        gsap.to(this.imageTarget, {
            rotation: 5,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Initial animation
        gsap.from(this.imageTarget, {
            scale: 0.5,
            opacity: 0,
            rotation: -45,
            duration: 1.2,
            delay: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    }
}
