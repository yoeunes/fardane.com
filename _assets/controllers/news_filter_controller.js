import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["item", "container", "noResults"];

    connect() {
        this.activeFilter = "all";
        this.filterButtons = this.element.querySelectorAll('.filter-btn');
    }

    filter(event) {
        const category = event.params.category;
        this.activeFilter = category;
        let hasResults = false;

        // Update active button style
        this.filterButtons.forEach(btn => {
            if (btn.dataset.newsFilterCategoryParam === category) {
                btn.classList.add('active', 'bg-amber-700', 'text-white');
                btn.classList.remove('bg-white', 'text-stone-700');
            } else {
                btn.classList.remove('active', 'bg-amber-700', 'text-white');
                btn.classList.add('bg-white', 'text-stone-700');
            }
        });

        // Show/hide items
        this.itemTargets.forEach(item => {
            const itemCategory = item.dataset.category;
            if (this.activeFilter === 'all' || itemCategory === this.activeFilter) {
                item.style.display = 'flex';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Show or hide the "no results" message
        if (hasResults) {
            this.noResultsTarget.classList.add('hidden');
        } else {
            this.noResultsTarget.classList.remove('hidden');
        }
    }
}
