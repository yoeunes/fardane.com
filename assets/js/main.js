// Import Tailwind CSS
import '../css/main.css';

// Import Stimulus JS
import { Application } from '@hotwired/stimulus';

// Initialize Stimulus application
const application = Application.start();

// HMR for development
if (import.meta.hot) {
  import.meta.hot.accept();
}

console.log('Fardane.com - Website initialized');
