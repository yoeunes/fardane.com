import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['grid', 'detailPanel', 'termTitle', 'termIcon', 'termName', 'termDescription', 'termQuote', 'filterButton'];

  connect() {
    if (!this.hasGridTarget) return; // Guard for pages without this controller

    this.activeFilter = 'all';
    this.termCards = this.gridTarget.querySelectorAll('.term-card');
    this.closeDetailButton = this.detailPanelTarget.querySelector('#close-term-detail');
    
    this.termCards.forEach(card => {
      card.addEventListener('click', this.showTermDetails.bind(this, card));
    });

    if (this.closeDetailButton) {
      this.closeDetailButton.addEventListener('click', this.hideTermDetails.bind(this));
    }

    this.filterButtons = this.element.querySelectorAll('#terms-filter button');
    this.filterButtons.forEach(button => {
      button.addEventListener('click', this.filterTerms.bind(this, button));
    });
  }

  showTermDetails(card) {
    const details = JSON.parse(card.dataset.termDetails);

    this.termTitleTarget.classList.remove(...this.termTitleTarget.classList);
    this.termTitleTarget.classList.add('text-xl', 'font-bold', details.color, 'flex', 'items-center');

    this.termIconTarget.className = details.icon + ' ml-2'; // Font Awesome icon
    this.termNameTarget.textContent = details.title;
    this.termDescriptionTarget.textContent = details.description;
    this.termQuoteTarget.textContent = details.quote;

    this.detailPanelTarget.classList.remove('hidden');
    this.detailPanelTarget.classList.add('opacity-100', 'translate-y-0');
    // Scroll to the details panel if it's out of view, smoothly
    this.detailPanelTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  hideTermDetails() {
    this.detailPanelTarget.classList.add('hidden');
    this.detailPanelTarget.classList.remove('opacity-100', 'translate-y-0');
  }

  filterTerms(button) {
    const category = button.dataset.category;
    this.activeFilter = category;

    this.filterButtons.forEach(btn => {
      btn.classList.remove('bg-amber-600', 'text-white');
      btn.classList.add('bg-white', 'text-amber-800', 'hover:bg-amber-50', 'border', 'border-amber-200');
    });

    button.classList.add('bg-amber-600', 'text-white');
    button.classList.remove('bg-white', 'text-amber-800', 'hover:bg-amber-50', 'border', 'border-amber-200');

    this.termCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  disconnect() {
    this.termCards.forEach(card => {
      card.removeEventListener('click', this.showTermDetails.bind(this, card));
    });
    if (this.closeDetailButton) {
      this.closeDetailButton.removeEventListener('click', this.hideTermDetails.bind(this));
    }
    this.filterButtons.forEach(button => {
      button.removeEventListener('click', this.filterTerms.bind(this, button));
    });
  }
}
