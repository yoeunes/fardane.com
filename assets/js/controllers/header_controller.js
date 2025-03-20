import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['menu', 'mobileMenu', 'scrollBg', 'navLink'];

    connect() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Set active link
        this.setActiveLink();
    }

    disconnect() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        if (window.scrollY > 20) {
            this.scrollBgTarget.classList.add('bg-sand-50', 'shadow-md');
            this.scrollBgTarget.classList.remove('bg-transparent');
        } else {
            this.scrollBgTarget.classList.remove('bg-sand-50', 'shadow-md');
            this.scrollBgTarget.classList.add('bg-transparent');
        }
    }

    toggleMenu() {
        this.mobileMenuTarget.classList.toggle('translate-x-full');
        this.mobileMenuTarget.classList.toggle('translate-x-0');
    }

    setActiveLink() {
        const currentPath = window.location.pathname;

        this.navLinkTargets.forEach(link => {
            const linkPath = link.getAttribute('href');

            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
                link.classList.add('text-amber-600', 'font-bold');
                link.classList.remove('text-stone-700');
            }
        });
    }
}
