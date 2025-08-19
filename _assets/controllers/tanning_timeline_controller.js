import { Controller } from "@hotwired/stimulus";

// Tanning Timeline Controller
// Builds a horizontal, draggable timeline with progress sync, center highlighting,
// and an autoplay sequence that scrolls through steps.
export default class extends Controller {
  static targets = [
    "trackContainer", // scrollable container
    "track",          // flex track that holds steps
    "progress",       // progress bar fill
    "step",           // individual step elements (populated dynamically)
    "animateButton"   // autoplay button
  ];

  connect() {
    // Steps data (11 steps) as specified
    this.steps = [
      { title: "استلام الجلود", icon: "fa-truck", description: "استلام الجلود النيئة من المذابح وتصنيفها." },
      { title: "النقع (أفزاك)", icon: "fa-water", description: "غمر الجلود في ماء نقي لإزالة الأوساخ والدم." },
      { title: "الماء والجير", icon: "fa-flask", description: "نقع الجلود في محلول الماء والجير لإزالة الشعر." },
      { title: "إزالة الشعر", icon: "fa-cut", description: "كشط الشعر والصوف من الجلود بعد مرحلة الجير." },
      { title: "درق الحمام", icon: "fa-feather-alt", description: "نقع الجلود في محلول درق الحمام لتليين الجلد." },
      { title: "الماء والنخالة", icon: "fa-seedling", description: "نقع الجلود في محلول الماء والنخالة (التخمار)." },
      { title: "الدباغ", icon: "fa-vial", description: "نقع الجلود في محلول الميموزة والمواد الدابغة." },
      { title: "التشميس", icon: "fa-sun", description: "تجفيف الجلود في الشمس لإزالة الرطوبة." },
      { title: "التكراط (البشير)", icon: "fa-tools", description: "تنعيم سطح الجلد وإزالة الشوائب المتبقية." },
      { title: "التلوين", icon: "fa-palette", description: "صبغ الجلود بالألوان باستخدام صبغات طبيعية." },
      { title: "التشطيب", icon: "fa-check-circle", description: "المعالجة النهائية للجلود وتجهيزها للبيع." }
    ];

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartScroll = 0;
    this.isAutoPlaying = false;
    this.autoPlayAbort = false;

    this.renderSteps();
    this.boundOnScroll = this.onScroll.bind(this);
    this.trackContainerTarget.addEventListener("scroll", this.boundOnScroll, { passive: true });

    // Drag-to-scroll (desktop)
    this.boundMouseDown = this.onMouseDown.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundMouseUp = this.onMouseUp.bind(this);
    this.trackContainerTarget.addEventListener("mousedown", this.boundMouseDown);
    window.addEventListener("mousemove", this.boundMouseMove);
    window.addEventListener("mouseup", this.boundMouseUp);

    // Touch support
    this.boundTouchStart = this.onTouchStart.bind(this);
    this.boundTouchMove = this.onTouchMove.bind(this);
    this.boundTouchEnd = this.onTouchEnd.bind(this);
    this.trackContainerTarget.addEventListener("touchstart", this.boundTouchStart, { passive: true });
    this.trackContainerTarget.addEventListener("touchmove", this.boundTouchMove, { passive: false });
    this.trackContainerTarget.addEventListener("touchend", this.boundTouchEnd);

    // Initial state
    this.updateProgress();
    this.highlightCenterStep();

    // Recompute on resize
    this.boundResize = this.onResize.bind(this);
    window.addEventListener("resize", this.boundResize);
  }

  disconnect() {
    // Cleanup listeners and abort autoplay if running
    this.trackContainerTarget.removeEventListener("scroll", this.boundOnScroll);

    this.trackContainerTarget.removeEventListener("mousedown", this.boundMouseDown);
    window.removeEventListener("mousemove", this.boundMouseMove);
    window.removeEventListener("mouseup", this.boundMouseUp);

    this.trackContainerTarget.removeEventListener("touchstart", this.boundTouchStart);
    this.trackContainerTarget.removeEventListener("touchmove", this.boundTouchMove);
    this.trackContainerTarget.removeEventListener("touchend", this.boundTouchEnd);

    window.removeEventListener("resize", this.boundResize);

    this.autoPlayAbort = true;
  }

  // Build DOM for steps
  renderSteps() {
    this.trackTarget.innerHTML = "";

    this.steps.forEach((step, index) => {
      const card = document.createElement("div");
      card.dataset.index = index.toString();
      card.setAttribute("data-tanning-timeline-target", "step");
      card.className = [
        "group w-64 shrink-0 rounded-xl border border-stone-200 bg-stone-50",
        "p-4 transition-transform duration-300 ease-out",
        "hover:scale-[1.02]"
      ].join(" ");

      card.innerHTML = `
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center transition-colors duration-300 step-icon">
            <i class="fas ${step.icon} text-lg"></i>
          </div>
          <h4 class="text-amber-900 font-bold text-base">${step.title}</h4>
        </div>
        <p class="text-sm leading-relaxed text-stone-700 step-desc">${step.description}</p>
      `;

      this.trackTarget.appendChild(card);
    });
  }

  // Event: scroll handler for container
  onScroll() {
    this.updateProgress();
    // Use rAF to throttle highlight calculation
    if (this._scrollRaf) return;
    this._scrollRaf = requestAnimationFrame(() => {
      this.highlightCenterStep();
      this._scrollRaf = null;
    });
  }

  // Progress bar width sync
  updateProgress() {
    const el = this.trackContainerTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    this.progressTarget.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
  }

  // Highlight the step closest to the container's center
  highlightCenterStep() {
    const container = this.trackContainerTarget;
    const centerX = container.scrollLeft + container.clientWidth / 2;

    let bestIdx = 0;
    let bestDist = Infinity;
    this.stepTargets.forEach((el, idx) => {
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(elCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    this.stepTargets.forEach((el, idx) => {
      const isActive = idx === bestIdx;
      el.classList.toggle("scale-[1.04]", isActive);
      el.classList.toggle("ring", isActive);
      el.classList.toggle("ring-amber-300", isActive);

      const icon = el.querySelector(".step-icon");
      if (icon) {
        icon.classList.toggle("bg-amber-600", isActive);
        icon.classList.toggle("text-white", isActive);
        icon.classList.toggle("bg-amber-100", !isActive);
        icon.classList.toggle("text-amber-700", !isActive);
      }
    });
  }

  // Drag to scroll (mouse)
  onMouseDown(e) {
    this.isDragging = true;
    this.dragStartX = e.pageX;
    this.dragStartScroll = this.trackContainerTarget.scrollLeft;
    this.trackContainerTarget.style.cursor = "grabbing";
  }

  onMouseMove(e) {
    if (!this.isDragging) return;
    const dx = e.pageX - this.dragStartX;
    this.trackContainerTarget.scrollLeft = this.dragStartScroll - dx;
  }

  onMouseUp() {
    this.isDragging = false;
    this.trackContainerTarget.style.cursor = "grab";
  }

  // Drag to scroll (touch)
  onTouchStart(e) {
    if (e.touches.length !== 1) return;
    this.isDragging = true;
    this.dragStartX = e.touches[0].pageX;
    this.dragStartScroll = this.trackContainerTarget.scrollLeft;
  }

  onTouchMove(e) {
    if (!this.isDragging) return;
    // Prevent native horizontal scroll bounce for smoother drag feel
    e.preventDefault();
    const dx = e.touches[0].pageX - this.dragStartX;
    this.trackContainerTarget.scrollLeft = this.dragStartScroll - dx;
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  onResize() {
    this.highlightCenterStep();
    this.updateProgress();
  }

  // Action: autoplay through steps
  async autoPlay() {
    if (this.isAutoPlaying) return;
    this.isAutoPlaying = true;
    this.autoPlayAbort = false;

    const originalHTML = this.animateButtonTarget.innerHTML;
    this.animateButtonTarget.innerHTML = '<i class="fas fa-spinner fa-spin ml-1"></i><span>جاري عرض المراحل</span>';

    for (let i = 0; i < this.stepTargets.length; i++) {
      if (this.autoPlayAbort) break;
      await this.scrollToStep(i);
      // Pause briefly on step
      await this.sleep(900);
    }

    // Reset button text
    if (!this.autoPlayAbort) {
      this.animateButtonTarget.innerHTML = '<i class="fas fa-redo ml-1"></i><span>إعادة عرض المراحل</span>';
    } else {
      this.animateButtonTarget.innerHTML = originalHTML;
    }

    this.isAutoPlaying = false;
    this.autoPlayAbort = false;
  }

  // Smoothly center a step in the container
  scrollToStep(index) {
    const container = this.trackContainerTarget;
    const el = this.stepTargets[index];
    if (!el) return Promise.resolve();

    const targetLeft = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;

    return new Promise(resolve => {
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
      // Resolve after transition; we also watch for scroll end
      const timeout = setTimeout(() => {
        resolve();
      }, 600);

      const onEnd = () => {
        clearTimeout(timeout);
        container.removeEventListener("scroll", onEnd);
        resolve();
      };
      container.addEventListener("scroll", onEnd, { once: true });
    });
  }

  sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
}
