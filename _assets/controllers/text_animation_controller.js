import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";
import {splitText} from "../utils/text-splitter";

export default class extends Controller {
    static targets = ["title", "subtitle", "buttons", "social"];

    connect() {
        // Create a timeline for the animations
        const tl = gsap.timeline();

        // Animate the title with our custom text splitter
        if (this.hasTitleTarget) {
            const splitTitle = splitText(this.titleTarget, {type: 'chars'});

            tl.from(splitTitle.chars, {
                opacity: 0,
                y: 50,
                rotationX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }

        // Animate the title without SplitText - simple animation
        if (this.hasTitleTarget) {
            tl.from(this.titleTarget, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }

        // Animate the subtitle
        if (this.hasSubtitleTarget) {
            tl.from(this.subtitleTarget, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4");
        }

        // Animate the buttons
        if (this.hasButtonsTarget) {
            tl.from(this.buttonsTarget.children, {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.4");
        }

        // Animate the social icons
        if (this.hasSocialTarget) {
            tl.from(this.socialTarget.children, {
                opacity: 0,
                scale: 0.5,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.2");
        }
    }
}
