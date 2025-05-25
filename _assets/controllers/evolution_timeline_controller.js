import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['epoch', 'timelineContainer'];

  connect() {
    this.revealEpochs();
  }

  revealEpochs() {
    this.epochTargets.forEach((epoch, index) => {
      // Ensure initial styles for animation are set if not already via CSS
      epoch.style.opacity = '0';
      epoch.style.transform = 'translateY(20px)';
      epoch.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

      setTimeout(() => {
        epoch.style.opacity = '1';
        epoch.style.transform = 'translateY(0)';
      }, index * 300); // Stagger the animation by 300ms for each epoch
    });

    // Optional: If the timeline container itself should animate in
    if (this.hasTimelineContainerTarget) {
      this.timelineContainerTarget.style.opacity = '0';
      this.timelineContainerTarget.style.transition = 'opacity 0.5s ease-in';
      setTimeout(() => {
        this.timelineContainerTarget.style.opacity = '1';
      }, 100); // Slight delay to ensure epochs are ready
    }
  }
}
