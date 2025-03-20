// Import Tailwind CSS
import '../css/main.css';

// Simple utility functions for basic interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Handle header background on scroll
    const header = document.querySelector('header');
    const scrollThreshold = 20;

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('bg-sand-50', 'shadow-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-sand-50', 'shadow-sm');
            header.classList.add('bg-transparent');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initialize based on initial scroll position

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.replace('opacity-0', 'opacity-100');
            } else {
                backToTopButton.classList.replace('opacity-100', 'opacity-0');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Hide preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('opacity-0');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Active link indication
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath ||
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('text-amber-600', 'font-bold');
            link.classList.remove('text-stone-700');
        }
    });

    // Initialize any carousels using native JavaScript
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
            // Basic carousel functionality can be added here
            // This is a placeholder for native JavaScript carousel
        });
    }
});

// For development - HMR support
if (import.meta.hot) {
    import.meta.hot.accept();
}
