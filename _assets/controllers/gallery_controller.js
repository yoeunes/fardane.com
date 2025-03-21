import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";

export default class extends Controller {
    connect() {
        // Create a lightbox container if it doesn't exist
        this.createLightboxIfNeeded();
    }

    // Create the lightbox element if it doesn't exist yet
    createLightboxIfNeeded() {
        if (!document.getElementById('lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'fixed inset-0 bg-black/90 z-50 hidden flex items-center justify-center';
            lightbox.innerHTML = `
        <div class="relative max-w-5xl max-h-[90vh] p-4">
          <button id="lightbox-close" class="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center z-10">
            <i class="fas fa-times"></i>
          </button>
          <img id="lightbox-img" class="max-h-[85vh] max-w-full object-contain" src="" alt="">
          <div class="text-white text-center mt-4 font-medium" id="lightbox-caption"></div>
        </div>
      `;
            document.body.appendChild(lightbox);

            // Add close button event listener
            document.getElementById('lightbox-close').addEventListener('click', () => {
                this.hideLightbox();
            });

            // Close on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.hideLightbox();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                    this.hideLightbox();
                }
            });
        }
    }

    showImage(event) {
        // Get the clicked image and details
        const clickedElement = event.currentTarget;
        const img = clickedElement.querySelector('img');
        const caption = clickedElement.querySelector('.absolute.bottom-0 p');

        if (!img) return;

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');

        // Set the image and caption
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : img.alt;

        // Show the lightbox with animation
        lightbox.classList.remove('hidden');
        gsap.from(lightboxImg, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: 'power3.out'
        });

        // Prevent body scrolling when lightbox is open
        document.body.classList.add('overflow-hidden');
    }

    hideLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        // Animate out
        gsap.to(lightboxImg, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                lightbox.classList.add('hidden');
                // Re-enable body scrolling
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
}
