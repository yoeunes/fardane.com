import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="atlas-cross-section"
// Animated geological cross-section of Atlas Mountains water cycle
export default class extends Controller {
  static targets = ["infoPanel", "infoTitle", "infoText", "zoneBtn"];

  connect() {
    this.zoneData = {
      precipitation: {
        title: "التساقطات — البنك المائي الطبيعي للأطلس",
        text: 'تستقبل قمم الأطلس الكبير (توبقال 4167م) كميات هائلة من الثلوج بين أكتوبر وأبريل، إضافةً إلى الأمطار الموسمية على المنحدرات الوسطى. تُخزَّن هذه الثلوج طبيعياً ليُطلق الجبلُ مياهه تدريجياً في الربيع والصيف حين يشتد الطلب الزراعي. يقول الحكيم الأمازيغي: «أوسيل ن أدرار، أنوال ن إمارن» — أي ثلج الجبل خبز السهل.',
      },
      rivers: {
        title: "الأنهار الكبرى — شرايين المغرب من الجبل إلى البحر",
        text: "تتفرع من سلاسل الأطلس خمسة أنهار كبرى تروي السهول والواحات: سبو وملوية من الأطلس المتوسط، وأم الربيع وتانسيفت من الأطلس الكبير شمالاً، وسوس من الأطلس الكبير والأطلس الصغير جنوباً. تنحدر هذه المياه بالجاذبية من القمم الثلجية عبر الوديان إلى السهول الخصبة والمحيط.",
      },
      aquifer: {
        title: "الفرشات الجوفية — الخزان الباطني غير المرئي",
        text: "تتسرب المياه الجبلية عبر الطبقات الصخرية المسامية لتشكّل فرشات جوفية عميقة تحت السهول والواحات. من هذا الخزان الباطني تستمد الخطارات والآبار مياهها في الواحات البعيدة. يبلغ طول شبكة الخطارات المرصودة في المغرب أكثر من 28000 كيلومتر — كلها تستقي من هذا الخزان الجوفي الذي يغذّيه الجبل.",
      },
      springs: {
        title: "الينابيع والعيون — حيث يعود الماء إلى النور",
        text: "حيث تلتقي الفرشة الجوفية بالسطح عند سفوح الجبال وحافات الوديان، تنبثق الينابيع والعيون. كانت هذه المصادر الطبيعية في التاريخ مواضع تأسيس المدن والقصبات: مراكش عند سفح الأطلس الكبير، وفاس عند عيون الأطلس المتوسط، وأكادير جنوباً. تبقى هذه الينابيع اليوم مؤشراً حيّاً لصحة الفرشة الجوفية.",
      },
      plains: {
        title: "السهول والواحات — وجهة الماء الحضارية",
        text: "تصل مياه الأطلس إلى سهول الحوز والشاوية وعبدة شمالاً، وواحات تافيلالت ودرعة وسوس جنوباً. على هذه السهول المرويّة بمياه الجبل نشأت الحضارات المغربية الكبرى وطوّرت الخطارات والسواقي لتوزيع الماء بدقة ونظام على الحقول والواحات.",
      },
    };

    this.showZone("precipitation");
    this.updateButtons("precipitation");
  }

  highlight(event) {
    const zone = event.params.zone;
    this.showZone(zone);
    this.updateButtons(zone);
  }

  showZone(zone) {
    const d = this.zoneData[zone];
    if (!d) return;
    this.infoTitleTarget.textContent = d.title;
    this.infoTextTarget.textContent = d.text;
    this.infoPanelTarget.classList.remove("opacity-0", "translate-y-2");
    this.infoPanelTarget.classList.add("opacity-100", "translate-y-0");
  }

  updateButtons(activeZone) {
    this.zoneBtnTargets.forEach((btn) => {
      const active = btn.dataset.zone === activeZone;
      btn.classList.toggle("bg-amber-700", active);
      btn.classList.toggle("text-white", active);
      btn.classList.toggle("border-amber-600", active);
      btn.classList.toggle("ring-2", active);
      btn.classList.toggle("ring-amber-500", active);
      btn.classList.toggle("bg-white", !active);
      btn.classList.toggle("text-stone-700", !active);
      btn.classList.toggle("border-stone-200", !active);
    });
  }
}
