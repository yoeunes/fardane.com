// Import Tailwind CSS
import '../css/main.css';

// Utility for simple animations
const animateElement = (element, animationClass, delay = 0) => {
  setTimeout(() => {
    element.classList.add(animationClass);
  }, delay);
};

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Form validation
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Add simple validation here
      let valid = true;
      const inputs = form.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('border-red-500');
        } else {
          input.classList.remove('border-red-500');
        }
      });

      if (valid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-md';
        successMessage.textContent = 'تم إرسال رسالتك بنجاح، سنتواصل معك في أقرب وقت.';
        form.appendChild(successMessage);

        // Reset form
        form.reset();

        // Remove message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } else {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'mt-4 p-3 bg-red-100 text-red-700 rounded-md';
        errorMessage.textContent = 'يرجى ملء جميع الحقول المطلوبة.';
        form.appendChild(errorMessage);

        // Remove message after 3 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      }
    });
  });
});

// Handle dark/light mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const htmlElement = document.documentElement;

if (localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && prefersDarkMode)) {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

// For development - HMR support
if (import.meta.hot) {
  import.meta.hot.accept();
}
