// Import Tailwind CSS
import '../css/main.css';

// Import Stimulus
import {Application} from "@hotwired/stimulus";
import {definitionsFromContext} from "@hotwired/stimulus-webpack-helpers";

// Import GSAP and its plugins
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

window.gsap = gsap;

// Import controllers
import HeaderController from "./controllers/header_controller";
import TextAnimationController from "./controllers/text_animation_controller";
// import ProfileAnimationController from "./controllers/profile_animation_controller";
import RevealAnimationController from "./controllers/reveal_animation_controller";
import CounterController from "./controllers/counter_controller";
import GalleryController from "./controllers/gallery_controller";
import TimelineController from "./controllers/timeline_controller";
import ContactFormController from "./controllers/contact_form_controller";
import ScrollAnimationController from "./controllers/scroll_animation_controller";

// Import third-party libraries
import Swiper from 'swiper';
import {Navigation, Pagination, Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import particles.js
// import 'particles.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Stimulus application
const application = Application.start();

// Register controllers manually
application.register("header", HeaderController);
application.register("text-animation", TextAnimationController);
// application.register("profile-animation", ProfileAnimationController);
application.register("reveal-animation", RevealAnimationController);
application.register("counter", CounterController);
application.register("gallery", GalleryController);
application.register("timeline", TimelineController);
application.register("contact-form", ContactFormController);
application.register("scroll-animation", ScrollAnimationController);

// Initialize particles.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles on the background element
    // Initialize particles on the background element
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        setTimeout(() => {
            try {
                particlesJS("particles-js", {
                    particles: {
                        number: {
                            value: 50,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#f59e0b"
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#000000"
                            }
                        },
                        opacity: {
                            value: 0.3,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: 5,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 2,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#d97706",
                            opacity: 0.2,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "bubble"
                            },
                            onclick: {
                                enable: true,
                                mode: "push"
                            },
                            resize: true
                        },
                        modes: {
                            bubble: {
                                distance: 200,
                                size: 6,
                                duration: 2,
                                opacity: 0.8,
                                speed: 3
                            },
                            push: {
                                particles_nb: 4
                            }
                        }
                    },
                    retina_detect: true
                });
            } catch (e) {
                console.warn("Error initializing particles.js:", e);
            }
        }, 100); // Small delay to ensure DOM is ready
    }

    // Initialize mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize back-to-top functionality
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

    // Hide preloader after page loads
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('opacity-0');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // If page already loaded, hide preloader immediately
        if (document.readyState === 'complete') {
            preloader.classList.add('opacity-0');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // Initialize any swipers on the page
    const swiperElements = document.querySelectorAll('.swiper');
    if (swiperElements.length > 0) {
        swiperElements.forEach(element => {
            const pagination = element.querySelector('.swiper-pagination');
            const prevButton = element.querySelector('.swiper-button-prev');
            const nextButton = element.querySelector('.swiper-button-next');

            new Swiper(element, {
                modules: [Navigation, Pagination, Autoplay, EffectFade],
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: pagination ? {
                    el: pagination,
                    clickable: true,
                } : false,
                navigation: (prevButton && nextButton) ? {
                    prevEl: prevButton,
                    nextEl: nextButton,
                } : false,
                effect: element.dataset.effect || 'slide',
                speed: 1000,
            });
        });
    }
});

// For development - HMR support
if (import.meta.hot) {
    import.meta.hot.accept();
}
