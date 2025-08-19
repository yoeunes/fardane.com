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
    "animateButton",  // autoplay button
    "status",         // status/counter label
    "pauseButton",    // pause/resume button
    "restartButton"   // restart button
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
    this.isPaused = false;
    this._resumeResolve = null;
    this.hasStartedOnce = false;
    this.userInteracted = false;

    this.renderSteps();
    // Bind handlers
    this.boundOnScroll = this.onScroll.bind(this);
    this.boundOnStepClick = this.onStepClick.bind(this);
    this.boundWheel = this.onWheel.bind(this);
    // Listeners
    this.trackContainerTarget.addEventListener("scroll", this.boundOnScroll, { passive: true });
    this.trackContainerTarget.addEventListener("wheel", this.boundWheel, { passive: true });
    // Step click listeners
    this.stepTargets.forEach((el) => el.addEventListener("click", this.boundOnStepClick));

    // Intro reveal animations & hint
    this.setupIntroReveal();

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
    this.currentActiveIndex = 0;
    this.updateStatus(0);
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
        "hover:scale-[1.02] cursor-pointer"
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

    // Update status if index changed
    if (this.currentActiveIndex !== bestIdx) {
      this.currentActiveIndex = bestIdx;
      this.updateStatus(bestIdx);
    }
  }

  // Update status/counter display
  updateStatus(index) {
    if (!this.hasStatusTarget) return;
    const total = this.stepTargets.length;
    const current = index != null ? index + 1 : (this.currentActiveIndex ?? 1);
    this.statusTarget.textContent = `الخطوة ${current} من ${total}`;
  }

  // Convert western digits to Arabic-Indic numerals
  toArNum(value) {
    const s = String(value);
    const map = { '0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩' };
    return s.replace(/[0-9]/g, d => map[d] || d);
  }

  // Drag to scroll (mouse)
  onMouseDown(e) {
    this.isDragging = true;
    this.dragStartX = e.pageX;
    this.dragStartScroll = this.trackContainerTarget.scrollLeft;
    this.trackContainerTarget.style.cursor = "grabbing";
    if (this.isAutoPlaying) {
      this.autoPlayAbort = true;
      this.isAutoPlaying = false;
      this.isPaused = false;
      if (this.hasPauseButtonTarget) {
        this.pauseButtonTarget.classList.add('hidden');
        this.setPauseButton(false);
      }
      if (this.hasAnimateButtonTarget) {
        this.animateButtonTarget.innerHTML = '<i class="fas fa-play ml-1"></i><span>عرض مراحل الدباغة</span>';
      }
    }
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
    if (this.isAutoPlaying) {
      this.autoPlayAbort = true;
      this.isAutoPlaying = false;
      this.isPaused = false;
      if (this.hasPauseButtonTarget) {
        this.pauseButtonTarget.classList.add('hidden');
        this.setPauseButton(false);
      }
      if (this.hasAnimateButtonTarget) {
        this.animateButtonTarget.innerHTML = '<i class="fas fa-play ml-1"></i><span>عرض مراحل الدباغة</span>';
      }
    }
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
    this.isPaused = false;
    this.hasStartedOnce = true;
 
    const originalHTML = this.animateButtonTarget.innerHTML;
    this.animateButtonTarget.innerHTML = '<i class="fas fa-spinner fa-spin ml-1"></i><span>جاري عرض المراحل</span>';
 
    if (this.hasPauseButtonTarget) {
      this.setPauseButton(false);
      this.pauseButtonTarget.classList.remove('hidden');
    }
    if (this.hasRestartButtonTarget) {
      this.restartButtonTarget.classList.remove('hidden');
    }

    for (let i = 0; i < this.stepTargets.length; i++) {
      if (this.autoPlayAbort) break;
      await this.scrollToStep(i);
      if (this.autoPlayAbort) break;
      // Update status explicitly during autoplay
      this.updateStatus(i);
      // Pause-aware dwell for readability
      await this.sleepWithPause(1600);
    }

    if (this.hasPauseButtonTarget) {
      this.pauseButtonTarget.classList.add('hidden');
      this.setPauseButton(false);
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
      }, 800);

      const onEnd = () => {
        clearTimeout(timeout);
        container.removeEventListener("scroll", onEnd);
        resolve();
      };
      container.addEventListener("scroll", onEnd, { once: true });
    });
  }

  sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Pause-aware sleep utility used during autoplay dwell
  async sleepWithPause(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      if (this.autoPlayAbort) return;
      if (this.isPaused) {
        await this.waitUntilResumed();
        continue;
      }
      const remaining = end - Date.now();
      await this.sleep(Math.min(150, remaining));
    }
  }

  waitUntilResumed() {
    if (!this.isPaused) return Promise.resolve();
    return new Promise((resolve) => {
      this._resumeResolve = resolve;
    });
  }

  // Action: toggle pause/resume
  togglePause() {
    if (!this.isAutoPlaying) return;
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.setPauseButton(true);
    } else {
      this.setPauseButton(false);
      if (this._resumeResolve) {
        const r = this._resumeResolve;
        this._resumeResolve = null;
        r();
      }
    }
  }

  // Update pause button UI
  setPauseButton(paused) {
    if (!this.hasPauseButtonTarget) return;
    if (paused) {
      this.pauseButtonTarget.innerHTML = '<i class="fas fa-play ml-1"></i><span>استئناف</span>';
    } else {
      this.pauseButtonTarget.innerHTML = '<i class="fas fa-pause ml-1"></i><span>إيقاف مؤقت</span>';
    }
  }

  // Action: restart autoplay from the beginning
  restart() {
    if (this.isAutoPlaying) {
      this.autoPlayAbort = true;
      this.isAutoPlaying = false;
    }
    this.isPaused = false;
    if (this._resumeResolve) {
      const r = this._resumeResolve;
      this._resumeResolve = null;
      r();
    }

    // Reset UI
    if (this.hasPauseButtonTarget) {
      this.pauseButtonTarget.classList.add('hidden');
      this.setPauseButton(false);
    }

    // Scroll to the first step and reset status
    this.scrollToStep(0).then(() => {
      this.updateStatus(0);
      this.updateProgress();
      if (this.hasAnimateButtonTarget) {
        this.animateButtonTarget.innerHTML = '<i class="fas fa-play ml-1"></i><span>عرض مراحل الدباغة</span>';
      }
      // Start autoplay again
      this.autoPlay();
    });
  }
}
