import {Controller} from "@hotwired/stimulus";
import {gsap} from "gsap";

export default class extends Controller {
    static values = {
        value: Number,
        duration: {type: Number, default: 2},
        decimal: {type: Number, default: 0}
    }

    initialize() {
        this.currentValue = 0;
    }

    connect() {
        // Optionally listen for an event to start counting
        this.element.addEventListener('startCount', this.startCounter.bind(this));

        // Check if we should auto-start the counter
        if (this.hasAutoStartValue && this.autoStartValue) {
            this.startCounter();
        }
    }

    startCounter() {
        // Reset current value
        this.currentValue = 0;
        this.updateDisplay();

        // Use GSAP for smooth counting animation
        gsap.to(this, {
            currentValue: this.valueValue,
            duration: this.durationValue,
            ease: "power2.out",
            onUpdate: () => this.updateDisplay()
        });
    }

    updateDisplay() {
        // Format the number and update the display
        const formattedValue = this.currentValue.toFixed(this.decimalValue);
        this.element.textContent = this.hasLocaleValue
            ? Number(formattedValue).toLocaleString(this.localeValue)
            : formattedValue;
    }
}
