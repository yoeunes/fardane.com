import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["mobileMenu", "menuButton", "hamburgerLine"];

    connect() {
        // Handle header background on scroll
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.handleScroll);
        this.handleScroll(); // Set initial state

        // Setup current page highlighting
        this.highlightCurrentPage();
    }

    disconnect() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY > 20) {
            this.element.classList.add("bg-white/95", "backdrop-blur-sm", "shadow-md");
        } else {
            this.element.classList.remove("bg-white/95", "backdrop-blur-sm", "shadow-md");
        }
    }

    toggleMenu() {
        const isOpen = !this.mobileMenuTarget.classList.contains("invisible");

        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        // Show mobile menu with animation
        this.mobileMenuTarget.classList.remove("invisible");

        // Add small delay to ensure visibility before animating
        setTimeout(() => {
            this.mobileMenuTarget.classList.remove("opacity-0", "-translate-y-full");
            document.body.classList.add("overflow-hidden");

            // Transform hamburger to X
            this.animateHamburgerToX(true);
        }, 10);
    }

    closeMenu() {
        // Hide mobile menu with animation
        this.mobileMenuTarget.classList.add("opacity-0", "-translate-y-full");

        // Reset hamburger
        this.animateHamburgerToX(false);

        // Delay setting invisible until animation completes
        setTimeout(() => {
            this.mobileMenuTarget.classList.add("invisible");
            document.body.classList.remove("overflow-hidden");
        }, 500); // Match the duration in the CSS
    }

    animateHamburgerToX(toX) {
        if (toX) {
            // Animate to X
            this.hamburgerLineTargets[0].classList.add("rotate-45", "translate-y-2.5");
            this.hamburgerLineTargets[1].classList.add("opacity-0");
            this.hamburgerLineTargets[2].classList.add("-rotate-45", "-translate-y-2.5");
        } else {
            // Revert to hamburger
            this.hamburgerLineTargets[0].classList.remove("rotate-45", "translate-y-2.5");
            this.hamburgerLineTargets[1].classList.remove("opacity-0");
            this.hamburgerLineTargets[2].classList.remove("-rotate-45", "-translate-y-2.5");
        }
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const links = this.element.querySelectorAll("a[href]");

        links.forEach(link => {
            const href = link.getAttribute("href");

            // Check if this link matches the current path
            if (href === currentPath ||
                (currentPath === "/" && href === "/") ||
                (currentPath.includes(href) && href !== "/")) {

                // Add active styles
                link.classList.add("text-amber-700", "font-semibold");

                // Find and show the underline element if it exists
                const underline = link.querySelector("div");
                if (underline) {
                    underline.classList.add("w-full");
                    underline.classList.remove("w-0");
                }
            }
        });
    }
}
