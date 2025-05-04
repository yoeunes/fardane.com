import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["mobileMenu", "menuButton", "hamburgerLine"];

    connect() {
        this.highlightCurrentPage();
    }

    disconnect() {}

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
        const links = this.element.querySelectorAll("nav a[href]");

        links.forEach(link => {
            const href = link.getAttribute("href");
            let isActive = false;

            if (href === currentPath) {
                isActive = true;
            } else if (href !== '/' && currentPath.startsWith(href)) {
                isActive = true;
            }

            link.classList.remove("active-nav", "font-semibold");
            const underline = link.querySelector("div");
            if (underline) {
                underline.classList.remove("w-full");
                underline.classList.add("w-0");
            }

            if (isActive) {
                link.classList.add("active-nav", "font-semibold");
                if (underline) {
                    underline.classList.add("w-full");
                    underline.classList.remove("w-0");
                }
            }
        });

        const homeLink = this.element.querySelector('nav a[href="/"]');
        if (homeLink && currentPath !== '/') {
            homeLink.classList.remove("active-nav", "font-semibold");
            const homeUnderline = homeLink.querySelector("div");
            if (homeUnderline) {
                homeUnderline.classList.remove("w-full");
                homeUnderline.classList.add("w-0");
            }
        } else if (homeLink && currentPath === '/') {
            homeLink.classList.add("active-nav", "font-semibold");
            const homeUnderline = homeLink.querySelector("div");
            if (homeUnderline) {
                homeUnderline.classList.add("w-full");
                homeUnderline.classList.remove("w-0");
            }
        }
    }
}
