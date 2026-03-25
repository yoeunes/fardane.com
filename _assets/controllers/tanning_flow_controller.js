import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="tanning-flow"
// Animated overhead tannery diagram: vat selection + auto-cycle tour
export default class extends Controller {
  static targets = ["vat", "detail", "detailStage", "detailTitle", "detailDesc", "playBtn", "flowDot"];

  connect() {
    this.stages = {
      liming: {
        stage: "المرحلة الأولى",
        title: "أحواض الجير",
        desc: "تُنقع الجلود النيئة في محلول الجير والماء مدة يومين إلى ثلاثة أيام. الجير القلوي يُزيل الشعر والدهون ويفتح مسام الجلد تمهيداً للمراحل التالية.",
        bg: "bg-stone-200",
        text: "text-stone-800",
      },
      fleshing: {
        stage: "المرحلة الثانية",
        title: "تقشير اللحم",
        desc: "يُكشط الحرفيون بقايا اللحم والدهون الداخلية بشفرات حادة. هذه العملية اليدوية الدقيقة تُنظّف الجانب الداخلي للجلد وتُهيّئه لاستيعاب المواد الدابغة.",
        bg: "bg-amber-100",
        text: "text-amber-900",
      },
      soaking: {
        stage: "المرحلة الثالثة",
        title: "النقع بدرق الحمام",
        desc: "تُنقع الجلود في محلول درق الحمام المخمّر. هذه المادة العضوية تُليّن الألياف وتُرجع للجلد مرونته الطبيعية، وهي خطوة حاسمة قبل الدخول في حمامات الدباغ.",
        bg: "bg-stone-300",
        text: "text-stone-800",
      },
      tanning: {
        stage: "المرحلة الرابعة",
        title: "حمامات الدباغ",
        desc: "تُنقع الجلود في أحواض متتالية من مستخلص قشور الميموزة والبلوط لأسابيع. هذه العملية البطيئة تُحوّل الجلد الخام إلى جلد ثابت ومتين لا يتعفن ولا يتشقق.",
        bg: "bg-amber-700",
        text: "text-white",
      },
      dyeing: {
        stage: "المرحلة الخامسة",
        title: "أحواض الصباغة",
        desc: "تُصبغ الجلود بألوان نباتية طبيعية: الحناء للأحمر، الزعفران للأصفر، النيل للأزرق، قشر الرمان للبني. تبقى الجلود منقوعة حتى تتشرب اللون بعمق وثبات.",
        bg: "bg-orange-600",
        text: "text-white",
      },
      finishing: {
        stage: "المرحلة السادسة",
        title: "التشطيب والتجفيف",
        desc: "يُعالج الجلد بزيت السمك أو الشحم ليكتسب اللمعان والمرونة. ثم يُمدّد على الأسطح ويُجفّف في الشمس قبل القطع والبيع في أسواق الحرف اليدوية.",
        bg: "bg-amber-400",
        text: "text-amber-950",
      },
    };

    this._keys = Object.keys(this.stages);
    this._autoIdx = 0;
    this._autoTimer = null;
    this._playing = false;
    this._currentKey = null;

    // Animate flow dots with staggered delays
    this.flowDotTargets.forEach((dot, i) => {
      dot.style.animationDelay = `${(i * 0.45).toFixed(2)}s`;
    });

    // Show default detail prompt
    this._showPrompt();
  }

  disconnect() {
    this._stopAuto();
  }

  selectVat(event) {
    const key = event.currentTarget.dataset.tanningFlowKeyParam;
    if (!key) return;
    this._activate(key);
    if (this._playing) this._stopAuto();
  }

  togglePlay() {
    if (this._playing) {
      this._stopAuto();
    } else {
      this._startAuto();
    }
  }

  _activate(key) {
    this._currentKey = key;
    const stage = this.stages[key];
    if (!stage) return;

    // Update detail panel
    this.detailStageTarget.textContent = stage.stage;
    this.detailTitleTarget.textContent = stage.title;
    this.detailDescTarget.textContent = stage.desc;
    this.detailTarget.classList.remove("opacity-0", "scale-95");
    this.detailTarget.classList.add("opacity-100", "scale-100");

    // Update vat highlights
    this.vatTargets.forEach((v) => {
      const isActive = v.dataset.tanningFlowKeyParam === key;
      v.classList.toggle("ring-2", isActive);
      v.classList.toggle("ring-amber-500", isActive);
      v.classList.toggle("ring-offset-2", isActive);
      v.classList.toggle("scale-110", isActive);
      v.classList.toggle("shadow-lg", isActive);
    });
  }

  _showPrompt() {
    this.detailStageTarget.textContent = "";
    this.detailTitleTarget.textContent = "اختر حوضاً";
    this.detailDescTarget.textContent = "انقر على أي حوض في الرسم أعلاه لاستكشاف تفاصيل تلك المرحلة من الدباغة.";
    this.detailTarget.classList.remove("opacity-0", "scale-95");
    this.detailTarget.classList.add("opacity-100", "scale-100");
  }

  _startAuto() {
    this._playing = true;
    this._updatePlayBtn(true);
    const step = () => {
      const key = this._keys[this._autoIdx % this._keys.length];
      this._activate(key);
      this._autoIdx++;
      this._autoTimer = setTimeout(step, 2200);
    };
    step();
  }

  _stopAuto() {
    this._playing = false;
    if (this._autoTimer) clearTimeout(this._autoTimer);
    this._updatePlayBtn(false);
  }

  _updatePlayBtn(playing) {
    if (!this.hasPlayBtnTarget) return;
    const btn = this.playBtnTarget;
    // Clear and rebuild with DOM methods to avoid XSS
    btn.textContent = "";
    const icon = document.createElement("i");
    icon.className = playing ? "fas fa-pause ml-1" : "fas fa-play ml-1";
    const label = document.createElement("span");
    label.textContent = playing ? "إيقاف الجولة" : "جولة تلقائية";
    btn.appendChild(icon);
    btn.appendChild(label);
  }
}
