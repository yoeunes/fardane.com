import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";

export default class extends Controller {
    static targets = ["name", "email", "subject", "message", "success", "error"];

    connect() {
        // Initialize form animations
        this.initFormAnimations();
    }

    initFormAnimations() {
        // Animate inputs on focus
        const inputs = [this.nameTarget, this.emailTarget, this.subjectTarget, this.messageTarget];

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    borderColor: '#b45309', // amber-700
                    duration: 0.3
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(input, {
                        borderColor: '#d1d5db', // stone-300
                        duration: 0.3
                    });
                }
            });
        });
    }

    submit(event) {
        event.preventDefault();

        // Validate the form
        if (this.validateForm()) {
            // Simulate form submission (in a real app, you'd send data to a server)
            this.simulateFormSubmission();
        } else {
            this.showError();
        }
    }

    validateForm() {
        // Basic validation - check if all fields are filled
        return (
            this.nameTarget.value.trim() !== '' &&
            this.emailTarget.value.trim() !== '' &&
            this.validateEmail(this.emailTarget.value) &&
            this.subjectTarget.value.trim() !== '' &&
            this.messageTarget.value.trim() !== ''
        );
    }

    validateEmail(email) {
        // Basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    simulateFormSubmission() {
        // Hide any previous messages
        this.hideMessages();

        // Show loading state
        const submitButton = this.element.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> جاري الإرسال...';
        submitButton.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            // Show success message
            this.showSuccess();

            // Reset form
            this.element.reset();

            // Reset button
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
        }, 1500);
    }

    showSuccess() {
        // Hide any visible error message
        if (this.hasErrorTarget) {
            this.errorTarget.classList.add('hidden');
        }

        // Show success message with animation
        if (this.hasSuccessTarget) {
            this.successTarget.classList.remove('hidden');
            gsap.from(this.successTarget, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out"
            });

            // Auto-hide after a delay
            setTimeout(() => {
                gsap.to(this.successTarget, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power3.in",
                    onComplete: () => {
                        this.successTarget.classList.add('hidden');
                        this.successTarget.style.opacity = 1;
                        this.successTarget.style.transform = 'none';
                    }
                });
            }, 5000);
        }
    }

    showError() {
        // Hide any visible success message
        if (this.hasSuccessTarget) {
            this.successTarget.classList.add('hidden');
        }

        // Show error message with animation
        if (this.hasErrorTarget) {
            this.errorTarget.classList.remove('hidden');
            gsap.from(this.errorTarget, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out"
            });

            // Auto-hide after a delay
            setTimeout(() => {
                gsap.to(this.errorTarget, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power3.in",
                    onComplete: () => {
                        this.errorTarget.classList.add('hidden');
                        this.errorTarget.style.opacity = 1;
                        this.errorTarget.style.transform = 'none';
                    }
                });
            }, 4000);
        }

        // Highlight empty inputs
        if (this.nameTarget.value.trim() === '') {
            this.highlightInvalidInput(this.nameTarget);
        }

        if (this.emailTarget.value.trim() === '' || !this.validateEmail(this.emailTarget.value)) {
            this.highlightInvalidInput(this.emailTarget);
        }

        if (this.subjectTarget.value.trim() === '') {
            this.highlightInvalidInput(this.subjectTarget);
        }

        if (this.messageTarget.value.trim() === '') {
            this.highlightInvalidInput(this.messageTarget);
        }
    }

    highlightInvalidInput(input) {
        gsap.to(input, {
            borderColor: '#ef4444', // red-500
            duration: 0.3
        });

        gsap.to(input, {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true
        });

        // Reset border after a delay
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                gsap.to(input, {
                    borderColor: '#d1d5db', // stone-300
                    duration: 0.3
                });
            }
        }, {once: true});
    }

    hideMessages() {
        if (this.hasSuccessTarget) {
            this.successTarget.classList.add('hidden');
        }

        if (this.hasErrorTarget) {
            this.errorTarget.classList.add('hidden');
        }
    }
}
