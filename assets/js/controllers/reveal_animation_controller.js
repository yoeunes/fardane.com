import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    static targets = ["heading", "content", "quote", "stats"];

    connect() {
        // Create animations for each section when scrolled into view
        this.initializeHeadingAnimations();
        this.initializeContentAnimations();
        this.initializeSpecialElements();

        // Set up general reveal animation for any elements with reveal-item class
        this.setupRevealItems();
    }

    disconnect() {
        // Clean up scroll triggers when controller is disconnected
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    initializeHeadingAnimations() {
        if (this.hasHeadingTarget) {
            // Create animation for section headings
            this.headingTargets.forEach(heading => {
                gsap.from(heading, {
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });
        }
    }

    initializeContentAnimations() {
        if (this.hasContentTarget) {
            // Create staggered animations for content sections
            this.contentTargets.forEach(content => {
                // Look for reveal items inside the content
                const revealItems = content.querySelectorAll('.reveal-item');

                if (revealItems.length > 0) {
                    gsap.from(revealItems, {
                        scrollTrigger: {
                            trigger: content,
                            start: "top 75%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 30,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                } else {
                    // If no specific reveal items, animate the content itself
                    gsap.from(content, {
                        scrollTrigger: {
                            trigger: content,
                            start: "top 75%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                }
            });
        }
    }

    initializeSpecialElements() {
        // Quotes with special animation
        if (this.hasQuoteTarget) {
            this.quoteTargets.forEach(quote => {
                gsap.from(quote, {
                    scrollTrigger: {
                        trigger: quote,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    scale: 0.95,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // Stats with counter animation
        if (this.hasStatsTarget) {
            this.statsTargets.forEach(statsContainer => {
                gsap.from(statsContainer.children, {
                    scrollTrigger: {
                        trigger: statsContainer,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out",
                    onComplete: () => {
                        // Start counter animations when stats become visible
                        const counterElements = statsContainer.querySelectorAll('[data-controller="counter"]');
                        counterElements.forEach(el => {
                            const event = new Event('startCount');
                            el.dispatchEvent(event);
                        });
                    }
                });
            });
        }
    }

    setupRevealItems() {
        // General reveal animation for any standalone items with reveal-item class
        const standaloneItems = this.element.querySelectorAll('.reveal-item:not([data-reveal-animation-target] .reveal-item)');

        if (standaloneItems.length > 0) {
            standaloneItems.forEach(item => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });
        }
    }
}
