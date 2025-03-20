import {Controller} from '@hotwired/stimulus';
import {gsap} from 'gsap';

export default class extends Controller {
    static targets = ['menu', 'mobileMenu', 'scrollBg', 'navLink', 'menuButton'];
    static values = {
        threshold: {type: Number, default: 20}
    }

    connect() {
        this.lastScrollTop = 0;
        this.isMenuOpen = false;

        // Set initial state based on scroll position
        this.handleScroll();

        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Set active link
        this.setActiveLink();

        // Initialize animations
        this.initAnimations();
    }

    disconnect() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    initAnimations() {
        // Animate nav links on page load
        gsap.from(this.navLinkTargets, {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out"
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const scrollingDown = scrollY > this.lastScrollTop;
        this.lastScrollTop = scrollY;

        // Apply styles based on scroll position
        if (scrollY > this.thresholdValue) {
            // Scrolled down - add background and shadow
            if (!this.scrollBgTarget.classList.contains('bg-sand-50')) {
                this.scrollBgTarget.classList.add('bg-sand-50/90', 'backdrop-blur-sm', 'shadow-md');
                this.scrollBgTarget.classList.remove('bg-transparent');

                // Animate the background change
                gsap.fromTo(this.scrollBgTarget,
                    {backgroundColor: 'rgba(252, 249, 241, 0)'},
                    {backgroundColor: 'rgba(252, 249, 241, 0.9)', duration: 0.3}
                );
            }

            // Auto-hide header when scrolling down (optional)
            if (scrollingDown && scrollY > 300 && !this.isMenuOpen) {
                gsap.to(this.scrollBgTarget, {y: -100, duration: 0.3, ease: "power3.out"});
            } else {
                gsap.to(this.scrollBgTarget, {y: 0, duration: 0.3, ease: "power3.out"});
            }
        } else {
            // At the top - transparent background
            this.scrollBgTarget.classList.remove('bg-sand-50/90', 'backdrop-blur-sm', 'shadow-md');
            this.scrollBgTarget.classList.add('bg-transparent');

            // Animate the background change
            gsap.fromTo(this.scrollBgTarget,
                {backgroundColor: 'rgba(252, 249, 241, 0.9)'},
                {backgroundColor: 'rgba(252, 249, 241, 0)', duration: 0.3}
            );
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            // Open menu animation
            this.mobileMenuTarget.classList.remove('translate-x-full');
            this.mobileMenuTarget.classList.add('translate-x-0');

            // Animate hamburger to X
            if (this.hasMenuButtonTarget) {
                this.menuButtonTarget.classList.add('is-active');
            }

            // Animate menu items
            const menuItems = this.mobileMenuTarget.querySelectorAll('li');
            gsap.from(menuItems, {
                opacity: 0,
                x: 20,
                stagger: 0.1,
                duration: 0.4,
                ease: "power3.out"
            });

            // Prevent body scrolling
            document.body.classList.add('overflow-hidden');
        } else {
            // Close menu animation
            this.mobileMenuTarget.classList.add('translate-x-full');
            this.mobileMenuTarget.classList.remove('translate-x-0');

            // Animate hamburger back
            if (this.hasMenuButtonTarget) {
                this.menuButtonTarget.classList.remove('is-active');
            }

            // Re-enable body scrolling
            document.body.classList.remove('overflow-hidden');
        }
    }

    setActiveLink() {
        const currentPath = window.location.pathname;

        this.navLinkTargets.forEach(link => {
            const linkPath = link.getAttribute('href');

            if (linkPath === currentPath ||
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('text-amber-600', 'font-bold');
                link.classList.remove('text-stone-700');

                // Add highlight effect
                gsap.fromTo(link,
                    {backgroundSize: '0% 2px'},
                    {
                        backgroundSize: '100% 2px',
                        duration: 0.6,
                        ease: "power3.out"
                    }
                );
            }
        });
    }
}
