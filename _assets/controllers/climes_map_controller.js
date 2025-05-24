import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "infoPanel", "infoTitle", "infoCentury", "infoGeography",
    "infoCharacteristics", "infoPlaces", "infoQuote", "climeShape"
  ];

  static values = {
    activeClimeClasses: { type: Array, default: ["bg-amber-200", "shadow-lg", "ring-2", "ring-amber-500"] },
    inactiveClimeClasses: { type: Array, default: ["bg-amber-50", "hover:bg-amber-100"] }
  }

  connect() {
    this.climeData = {
      1: {
        title: "الإقليم الأول",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يمتد من خط الاستواء إلى عرض 23.5 درجة شمالاً تقريباً. يشمل المناطق شديدة الحرارة والرطوبة في أقاصي الجنوب المعروف.",
        characteristics: "مناخ حار جداً ورطب، قلة العمران المنتظم والكبير، وفرة الذهب والتوابل النادرة، حيوانات ضخمة وغريبة، سكانه بدائيون حسب وصفه.",
        places: "بلاد السودان، منابع النيل (حسب تصورات معاصرة له)، جزر الواق واق الأسطورية، بلاد الزنج.",
        quote: "وهو الإقليم الذي ليس بعده في الجنوب عمارة إلا القليل، وهو قليل المياه والنبات، وأهله متوحشون."
      },
      2: {
        title: "الإقليم الثاني",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يشمل المناطق الواقعة شمال الإقليم الأول، ويمتد عبر أجزاء واسعة من أفريقيا جنوب الصحراء الكبرى.",
        characteristics: "مناخ حار وجاف في معظمه، به بعض الواحات ومجاري الأنهار الموسمية، بداية ظهور مدن وتجمعات سكانية أكثر تنظيماً.",
        places: "بلاد غانا، بلاد التكرور، أجزاء من الحبشة، بعض مناطق النوبة.",
        quote: "وهذا الإقليم أعدل من الأول وأكثر مياهاً وعمارة، وفيه مدن وقرى كثيرة."
      },
      3: {
        title: "الإقليم الثالث",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يغطي شمال أفريقيا من المحيط الأطلسي إلى مصر، بما في ذلك المغرب الأقصى، الجزائر، تونس، ليبيا.",
        characteristics: "مناخ معتدل في الشمال وصحراوي في الجنوب، كثافة سكانية عالية في المناطق الساحلية والخصبة، مدن مزدهرة ومراكز تجارية هامة.",
        places: "المغرب، الأندلس (الجزء الجنوبي منه حسب التقسيم)، صقلية، مصر السفلى، بلاد البربر.",
        quote: "وهو إقليم كثير الخيرات، واسع المزارع، وفيه مدن عظيمة وحصون منيعة."
      },
      4: {
        title: "الإقليم الرابع",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يعتبر الإقليم الأوسط والأعدل، يمر بوسط العالم المعروف آنذاك، ويشمل مناطق واسعة من الشام والعراق وفارس وآسيا الصغرى.",
        characteristics: "مناخ متنوع ومعتدل بشكل عام، يعتبر مركز الحضارات الكبرى، غني بالموارد الطبيعية والزراعية، شبكة طرق تجارية حيوية.",
        places: "الشام، العراق، فارس، أجزاء من آسيا الصغرى، الجزيرة العربية.",
        quote: "وهو أعدل الأقاليم هواءً وتربة، وأكثرها عمراناً، وفيه معادن العلوم والصنائع."
      },
      5: {
        title: "الإقليم الخامس",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يشمل جنوب أوروبا، بما في ذلك أجزاء من الأندلس، جنوب فرنسا، إيطاليا، والبلقان.",
        characteristics: "مناخ معتدل وبارد نسبياً، أراضي خصبة ومثمرة، مدن ساحلية هامة، تفاعل ثقافي وتجاري مع العالم الإسلامي.",
        places: "الأندلس (الجزء الشمالي)، جنوب فرنسا، إيطاليا، بلاد الروم (بيزنطة)، جزر البحر المتوسط.",
        quote: "وهذا الإقليم كثير الجبال والأنهار، وفيه مدن عامرة وأمم مختلفة الألسنة."
      },
      6: {
        title: "الإقليم السادس",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يغطي مناطق شمال أوروبا وشرقها، بما في ذلك بلاد الصقالبة (السلاف) وأجزاء من روسيا وشمال آسيا.",
        characteristics: "مناخ بارد، غابات كثيفة، أنهار متجمدة في الشتاء، شعوب أقل تحضراً مقارنة بالأقاليم الجنوبية، تجارة الفراء والعنبر.",
        places: "بلاد الصقالبة، روسيا، شمال جرمانيا، أجزاء من اسكندنافيا.",
        quote: "وهو إقليم بارد جداً، كثير الثلوج، وأهله ذوو بأس وقوة، ويجلب منه الفراء النفيس."
      },
      7: {
        title: "الإقليم السابع",
        century: "القرن الثاني عشر الميلادي (548 هـ / 1154 م)",
        geography: "يمثل أقاصي الشمال المعروف، ويشمل المناطق القطبية الشمالية أو القريبة منها.",
        characteristics: "مناخ شديد البرودة، ظلام طويل في الشتاء، قلة السكان والعمران، حيوانات متكيفة مع البرد القارس.",
        places: "أقصى شمال أوروبا وآسيا، جزر محيط الظلمات الشمالي (المحيط المتجمد الشمالي).",
        quote: "وهو الإقليم الذي لا تكاد الشمس تظهر فيه أياماً كثيرة من السنة لشدة البرد، وليس فيه عمارة تذكر."
      }
    };
    // Optionally, display the first clime's info by default
    // this.showClimeInfo({ params: { climeId: "1" }, currentTarget: this.climeShapeTargets[0] });
  }

  showClimeInfo(event) {
    const climeId = event.params.climeId;
    const climeButton = event.currentTarget;
    const data = this.climeData[climeId];

    if (data) {
      this.infoTitleTarget.textContent = data.title || "غير متوفر";
      this.infoCenturyTarget.textContent = data.century || "غير متوفر";
      this.infoGeographyTarget.innerHTML = data.geography ? this.highlightTerms(data.geography) : "غير متوفر";
      this.infoCharacteristicsTarget.innerHTML = data.characteristics ? this.highlightTerms(data.characteristics) : "غير متوفر";
      this.infoPlacesTarget.innerHTML = data.places ? this.highlightTerms(data.places, true) : "غير متوفر";
      this.infoQuoteTarget.innerHTML = data.quote ? `"${this.highlightTerms(data.quote)}"` : "لا يوجد اقتباس";
      
      this.infoPanelTarget.classList.remove("opacity-0", "-translate-y-4");
      this.infoPanelTarget.classList.add("opacity-100", "translate-y-0");

      // Update button styles
      this.climeShapeTargets.forEach(button => {
        button.classList.remove(...this.activeClimeClassesValue);
        button.classList.add(...this.inactiveClimeClassesValue);
      });
      climeButton.classList.remove(...this.inactiveClimeClassesValue);
      climeButton.classList.add(...this.activeClimeClassesValue);

    } else {
      this.infoTitleTarget.textContent = "معلومات غير متوفرة";
      this.infoCenturyTarget.textContent = "";
      this.infoGeographyTarget.textContent = "الرجاء اختيار إقليم صالح.";
      this.infoCharacteristicsTarget.textContent = "";
      this.infoPlacesTarget.textContent = "";
      this.infoQuoteTarget.textContent = "";
    }
  }

  highlightTerms(text, isPlaces = false) {
    if (!text) return "";
    const terms = [
      "الإقليم الأول", "الإقليم الثاني", "الإقليم الثالث", "الإقليم الرابع", "الإقليم الخامس", "الإقليم السادس", "الإقليم السابع",
      "خط الاستواء", "شمالاً", "جنوباً", "شرقاً", "غرباً",
      "حار جداً ورطب", "قلة العمران", "الذهب", "التوابل", "حيوانات ضخمة", "بلاد السودان", "منابع النيل", "جزر الواق واق", "بلاد الزنج",
      "حار وجاف", "واحات", "أنهار موسمية", "بلاد غانا", "بلاد التكرور", "الحبشة", "النوبة",
      "شمال أفريقيا", "المحيط الأطلسي", "مصر", "المغرب الأقصى", "الجزائر", "تونس", "ليبيا", "معتدل", "صحراوي", "كثافة سكانية", "مدن مزدهرة", "المغرب", "الأندلس", "صقلية", "مصر السفلى", "بلاد البربر",
      "الأوسط والأعدل", "الشام", "العراق", "فارس", "آسيا الصغرى", "متنوع ومعتدل", "الحضارات الكبرى", "موارد طبيعية", "شبكة طرق تجارية", "الجزيرة العربية",
      "جنوب أوروبا", "فرنسا", "إيطاليا", "البلقان", "معتدل وبارد نسبياً", "أراضي خصبة", "مدن ساحلية", "بلاد الروم", "بيزنطة", "جزر البحر المتوسط",
      "شمال أوروبا", "شرقها", "بلاد الصقالبة", "السلاف", "روسيا", "شمال آسيا", "بارد", "غابات كثيفة", "أنهار متجمدة", "الفراء", "العنبر", "شمال جرمانيا", "اسكندنافيا",
      "أقاصي الشمال", "المناطق القطبية", "ظلام طويل", "البرد القارس", "محيط الظلمات الشمالي", "المحيط المتجمد الشمالي"
    ];
    
    let highlightedText = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'g');
      if (isPlaces) {
         highlightedText = highlightedText.replace(regex, '<span class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded-sm">$1</span>');
      } else {
         highlightedText = highlightedText.replace(regex, '<strong class="font-semibold text-amber-800">$1</strong>');
      }
    });
    return highlightedText;
  }
}
