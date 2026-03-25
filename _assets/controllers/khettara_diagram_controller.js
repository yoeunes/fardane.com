import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="khettara-diagram"
export default class extends Controller {
  static targets = ["stage", "infoPanel", "infoTitle", "infoText"];

  connect() {
    this.partData = {
      source: {
        title: "منطقة الاستقبال — المنبع الجبلي",
        text: "تُختار مواقع الخطارات بعناية في سفوح الجبال والهضاب، حيث تتجمع المياه الجوفية فوق طبقة صخرية غير نافذة. يُجري المُسَاح (الخبير التقليدي بالمياه) فحصاً دقيقاً للتربة والصخور لتحديد عمق الطبقة المائية ومعدل تدفقها، قبل الشروع في الحفر.",
      },
      mother_well: {
        title: "البئر الأم — نقطة الولادة",
        text: "أعمق نقطة في الخطارة، تُحفر مباشرةً فوق الطبقة المائية الجوفية. يصل عمقها في بعض الخطارات إلى 60 متراً. هي مصدر الماء ونقطة الانطلاق؛ منها تبدأ القناة مُتجهةً نحو السطح وفق ميل هندسي محسوب بدقة استثنائية.",
      },
      tunnel: {
        title: "القناة الباطنية — سرٌّ تحت الأرض",
        text: "قناةٌ أفقية تحت أرضية بارتفاع 60-150 سم وعرض 40-80 سم. تنحدر بميل بالغ الدقة (1-3 ملم لكل متر) يقل دائماً عن ميل سطح الأرض الخارجي — هذا الفرق الدقيق هو الذي يدفع الماء تدريجياً نحو السطح بمحض الجاذبية، دون أي مضخة أو طاقة.",
      },
      shafts: {
        title: "آبار التنفيس — نوافذ إلى الأعماق",
        text: "ثقوبٌ عمودية تُحفر كل 10-30 متراً على امتداد مسار القناة. وظائفها متعددة: التهوية لمنع تراكم الغازات، إخراج مخلفات الحفر والصيانة، إتاحة الفحص الدوري، وتحديد موقع القناة على السطح. فوقها يظهر مسار الخطارة كصف من التلال الصغيرة — الشخاشيخ أو الكديات.",
      },
      oasis: {
        title: "منطقة المصبّ — حين يبلغ الماء السطح",
        text: "يخرج الماء إلى السطح عبر الجزء السطحي من القناة (الساقية)، ويتوزع على الحقول والبساتين وفق نظام توزيع اجتماعي دقيق. لكل مُلاك حصةٌ زمنية محددة (النوبة) تُقاس بالطاسة النحاسية، وتُدار باجتماع الجماعة، وتُوثَّق في عقود تراثية تمتد أحياناً لقرون.",
      },
    };

    // Auto-highlight tunnel as default on connect
    this.showInfo("tunnel");
  }

  select(event) {
    const key = event.params.key;
    this.showInfo(key);

    this.stageTargets.forEach((s) => {
      s.classList.remove("ring-2", "ring-amber-500", "bg-amber-100", "shadow-lg", "border-amber-500");
      s.classList.add("bg-white", "border-stone-200");
    });
    event.currentTarget.classList.add("ring-2", "ring-amber-500", "bg-amber-100", "shadow-lg", "border-amber-500");
    event.currentTarget.classList.remove("bg-white", "border-stone-200");
  }

  showInfo(key) {
    const d = this.partData[key];
    if (!d) return;
    this.infoTitleTarget.textContent = d.title;
    this.infoTextTarget.textContent = d.text;
    this.infoPanelTarget.classList.remove("opacity-0", "translate-y-2");
    this.infoPanelTarget.classList.add("opacity-100", "translate-y-0");
  }
}
