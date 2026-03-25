import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="caravan-route"
// Animated Almoravid water logistics route: Mauritania → Sahara → Morocco → Andalusia
export default class extends Controller {
  static targets = [
    "routePath", "camel", "waypoint",
    "detailPanel", "stationName", "stationBadge", "stationDesc",
    "progressFill"
  ];

  connect() {
    this._animating = false;
    this._camelAnimId = null;
    this._setupObserver();
  }

  _setupObserver() {
    if (!("IntersectionObserver" in window)) {
      this._startAnimation();
      return;
    }
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !this._animating) {
            this._animating = true;
            this._startAnimation();
            this._observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    this._observer.observe(this.element);
  }

  _startAnimation() {
    // 1. Draw the route path with stroke-dasharray animation
    if (this.hasRoutePathTarget) {
      const path = this.routePathTarget;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.getBoundingClientRect(); // force layout reflow
      path.style.transition = "stroke-dashoffset 3.2s cubic-bezier(0.4, 0, 0.2, 1)";
      path.style.strokeDashoffset = "0";
    }

    // 2. Reveal waypoints staggered
    this.waypointTargets.forEach((wp, i) => {
      wp.style.opacity = "0";
      setTimeout(() => {
        wp.style.transition = "opacity 0.5s ease";
        wp.style.opacity = "1";
        // Animate inner dot pop
        const dot = wp.querySelector("[data-dot]");
        if (dot) {
          dot.style.transition = "r 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      }, 700 + i * 420);
    });

    // 3. Start camel animation after path draws
    setTimeout(() => this._animateCamel(), 3600);
  }

  _animateCamel() {
    if (!this.hasCamelTarget || !this.hasRoutePathTarget) return;

    const path = this.routePathTarget;
    const camel = this.camelTarget;
    const duration = 8000;
    const startTime = performance.now();

    camel.style.opacity = "1";

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      // Ease in-out cubic
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      try {
        const totalLen = path.getTotalLength();
        const pt = path.getPointAtLength(eased * totalLen);
        camel.setAttribute("transform", `translate(${pt.x - 13}, ${pt.y - 13})`);
      } catch (_) {}

      if (this.hasProgressFillTarget) {
        this.progressFillTarget.style.width = `${Math.round(eased * 100)}%`;
      }

      if (t < 1) {
        this._camelAnimId = requestAnimationFrame(tick);
      } else {
        // Pause at destination then loop
        setTimeout(() => {
          if (this.hasProgressFillTarget) {
            this.progressFillTarget.style.transition = "none";
            this.progressFillTarget.style.width = "0%";
            // Re-enable transition after reset
            setTimeout(() => {
              if (this.hasProgressFillTarget) {
                this.progressFillTarget.style.transition = "width 0.08s linear";
              }
            }, 50);
          }
          this._animateCamel();
        }, 2800);
      }
    };

    if (this.hasProgressFillTarget) {
      this.progressFillTarget.style.transition = "width 0.08s linear";
    }
    this._camelAnimId = requestAnimationFrame(tick);
  }

  selectStation(event) {
    const btn = event.currentTarget;
    const id = btn.dataset.stationId;

    const data = {
      ribat: {
        name: "رباط الريح — موريتانيا",
        badge: "نقطة الانطلاق (1039م)",
        desc: "مهد الحركة المرابطية على نهر السنغال. أسّس هنا عبد الله بن ياسين أول رباط، وتجمّعت قبائل صنهاجة الصحراوية. كان أول قوانين الرباط المطبَّقة بصرامة هو ضبط توزيع الماء والمؤن. من هذه النقطة انطلقت رحلة 2500 كم."
      },
      oudghast: {
        name: "أودغشت — قلب الصحراء المغربية",
        badge: "واحة الإمداد الأولى (1059م)",
        desc: "واحة استراتيجية في قلب الصحراء استولى عليها المرابطون عام 1059م. وظّفوها محطةً كبرى لملء القِرَب وتجهيز قوافل الجمال. تبعد بينها وبين أقرب واحة أكثر من 300 كم من الصحراء القاحلة."
      },
      sijilmasa: {
        name: "سجلماسة — تافيلالت، المغرب",
        badge: "بوابة الشمال (1054م)",
        desc: "أهم عقدة في طرق التجارة الصحراوية، تقع على واد زيز مما يجعلها خزاناً مائياً طبيعياً. استولى عليها المرابطون عام 1054م وحوّلوها إلى قاعدة إمداد رئيسية لكل الحملات شمالاً وجنوباً."
      },
      marrakech: {
        name: "مراكش — العاصمة المرابطية",
        badge: "قاعدة الانطلاق الكبرى (1070م)",
        desc: "بنيت عام 1070م على نظام الخطارات المائية المغربية. كانت مراكش مركز التجهيز اللوجستي الأكبر لحملة الزلاقة: هنا تجمّع الجيش وآلاف الجمال الحاملة للماء والمؤن قبيل العبور إلى الأندلس."
      },
      ceuta: {
        name: "سبتة / الجزيرة الخضراء",
        badge: "نقطة العبور البحري",
        desc: "ميناء العبور عبر مضيق جبل طارق. تجمّع الجيش هنا وأُعيد تجهيزه بالمياه قبيل العبور. كانت العملية اللوجستية البحرية — نقل الخيل والجمال والقِرَب — تحدياً غير مسبوق في تاريخ المرابطين."
      },
      zallaqa: {
        name: "الزلاقة — بطليوس، الأندلس",
        badge: "ساحة الانتصار الكبرى (1086م)",
        desc: "على سهل الزلاقة في 23 أكتوبر 1086م انتصر يوسف بن تاشفين على ألفونسو السادس. كانت كتيبة السقاية تعمل حتى في وسط المعركة، توزّع الماء بين الكتائب القاتلة. هذا الانتصار كان ثمرة منظومة ماء امتدت 2500 كم."
      }
    };

    const s = data[id];
    if (!s) return;

    // Highlight active waypoint ring
    this.waypointTargets.forEach((wp) => {
      const active = wp.dataset.stationId === id;
      const ring = wp.querySelector("[data-ring]");
      if (ring) ring.setAttribute("opacity", active ? "1" : "0");
    });

    this.stationNameTarget.textContent = s.name;
    this.stationBadgeTarget.textContent = s.badge;
    this.stationDescTarget.textContent = s.desc;

    this.detailPanelTarget.classList.remove("opacity-0", "translate-y-2");
    this.detailPanelTarget.classList.add("opacity-100", "translate-y-0");
  }

  disconnect() {
    if (this._camelAnimId) cancelAnimationFrame(this._camelAnimId);
    if (this._observer) this._observer.disconnect();
  }
}
