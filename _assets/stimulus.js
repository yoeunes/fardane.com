import { Application } from '@hotwired/stimulus';
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers';

// Initialize Stimulus application
const application = Application.start();

// Register all controllers from the controllers directory
const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));

// Debug info for development
if (process.env.NODE_ENV === 'development') {
  console.log('Stimulus controllers loaded:', context.keys());
}

// Export application for potential external uses
export { application };
