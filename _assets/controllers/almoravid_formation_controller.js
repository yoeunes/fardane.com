import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="almoravid-formation"
// Interactive Almoravid army formation diagram with clickable unit types
export default class extends Controller {
  static targets = ["cell", "detailPanel", "unitTitle", "unitBadge", "unitDesc", "unitRole"];

  connect() {
    this._activeId = null;
    this._setupObserver();
  }

  _setupObserver() {
    if (!("IntersectionObserver" in window)) {
      this._animateIn();
      return;
    }
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this._animateIn();
            this._observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    this._observer.observe(this.element);
  }

  _animateIn() {
    this.cellTargets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.75)";
      setTimeout(() => {
        el.style.transition = `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`;
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }, 80);
    });
  }

  selectUnit(event) {
    const btn = event.currentTarget;
    const unitId = btn.dataset.unitId;

    const units = {
      scouts: {
        title: "الكاشفون (الطلائع)",
        badge: "عيون الجيش",
        desc: "تتقدّم الطلائع أمام الجيش بثلاثة أيام على الأقل، ترسم مواقع الآبار والينابيع وتُحدّد كميات المياه المتاحة. يُختارون من أمهر أبناء القبائل الصحراوية في قراءة علامات الأرض وتتبّع الطيور والنباتات الدالّة على الماء الجوفي.",
        role: "الاستطلاع المائي المسبق"
      },
      cavalry: {
        title: "الخيّالة المرابطية",
        badge: "طليعة القتال",
        desc: "صفوف الخيالة تشكّل الجناحين المتحركَين، وهي أول من يتصادم مع العدو. تتميز خيالة المرابطين بالجمال القتالية بجانب الخيل، والجمل قادر على الاستغناء عن الماء لأيام طويلة مقارنة بالحصان، مما يجعله أفضل تكيفاً مع ظروف الصحراء.",
        role: "الهجوم والمناورة السريعة"
      },
      infantry: {
        title: "الرجّالة",
        badge: "قلب الجيش",
        desc: "مشاة المرابطون يشكّلون الكتلة الصلبة في وسط التشكيلة، مجهّزون بالرماح والدروع. يحمل كل محارب قِربة شخصية صغيرة تكفيه لنصف يوم، ويعتمد لما بعد ذلك على السقّاءين من وحدة الماء.",
        role: "الصمود والاختراق الثقيل"
      },
      water: {
        title: "كتيبة السقاية",
        badge: "السلاح الخفي",
        desc: "وحدة الماء المتخصصة تتمركز خلف صفوف القتال ويسارها لتبقى بعيدة عن الضربات المباشرة مع إمكانية الإمداد السريع. تضم السقّاءين الحمّالين وحرّاس الماء المسلّحين وأمراء الماء المسؤولين عن التخطيط والتوزيع.",
        role: "الإمداد المائي المستمر"
      },
      camels: {
        title: "قافلة الجمال",
        badge: "اللوجستيك الحيوي",
        desc: "قافلة الجمال الحاملة للقِرَب والمؤن تسير في مؤخرة الجيش محميةً بحراسة مسلحة. الجمل الواحد يحمل 4-8 قِرَب (80-400 لتر)، ما يكفي لإرواء 30-50 محارباً ليوم كامل في ظروف الصحراء. يُنتخب سائقو الجمال من أهل الخبرة الصحراوية.",
        role: "الخزن الاستراتيجي للماء"
      },
      wells: {
        title: "حفّارو الآبار",
        badge: "المهندسون الخفيون",
        desc: "فرقة متخصصة من الحفّارين تنتشر حين يتوقف الجيش في مكان شحيح المياه. يقرأون لون التربة ودرجة رطوبتها والتشكيلات الصخرية الدالة على الطبقات المائية الجوفية. يستطيعون حفر بئر ميدانية في 3-7 أيام حسب طبيعة التربة.",
        role: "توفير المياه الطارئة"
      }
    };

    const unit = units[unitId];
    if (!unit) return;

    // Update active styling on cells
    this.cellTargets.forEach((el) => {
      const isActive = el.dataset.unitId === unitId;
      el.classList.toggle("ring-2", isActive);
      el.classList.toggle("ring-amber-400", isActive);
      el.classList.toggle("scale-105", isActive);
      el.classList.toggle("shadow-lg", isActive);
    });

    // Fill detail panel
    this.unitTitleTarget.textContent = unit.title;
    this.unitBadgeTarget.textContent = unit.badge;
    this.unitDescTarget.textContent = unit.desc;
    this.unitRoleTarget.textContent = unit.role;

    // Reveal panel with animation
    this.detailPanelTarget.classList.remove("opacity-0", "translate-y-2");
    this.detailPanelTarget.classList.add("opacity-100", "translate-y-0");

    this._activeId = unitId;
  }

  disconnect() {
    if (this._observer) this._observer.disconnect();
  }
}
