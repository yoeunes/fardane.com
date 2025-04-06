import './main.pcss';
import './stimulus';

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

    // Add JavaScript to handle the scroll button functionality
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    if (seeMoreBtn) {
        // Smooth scroll to the next section
        seeMoreBtn.addEventListener('click', () => {
            const heroSection = document.querySelector('section');
            const nextSection = heroSection.nextElementSibling;
            
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide button when scrolled past hero section
        window.addEventListener('scroll', () => {
            const heroHeight = document.querySelector('section').offsetHeight;
            
            if (window.scrollY > heroHeight * 0.5) {
                seeMoreBtn.classList.add('opacity-0', 'pointer-events-none');
            } else {
                seeMoreBtn.classList.remove('opacity-0', 'pointer-events-none');
            }
        });
    }

    // Add a special effect for the text animation elements
    const textRevealElements = document.querySelectorAll('.text-reveal, .text-reveal-delayed, .text-reveal-slower');
    
    setTimeout(() => {
        textRevealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.8s ease-out ${index * 0.15}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
    }, 300);
});

// For development - HMR support
if (import.meta.hot) {
    import.meta.hot.accept();
}
