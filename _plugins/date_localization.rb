module Jekyll
  module DateLocalization
    MONTHS = {
      "January" => "يناير",
      "February" => "فبراير",
      "March" => "مارس",
      "April" => "أبريل",
      "May" => "مايو",
      "June" => "يونيو",
      "July" => "يوليو",
      "August" => "أغسطس",
      "September" => "سبتمبر",
      "October" => "أكتوبر",
      "November" => "نوفمبر",
      "December" => "ديسمبر"
    }

    def localize_date(date)
      date_str = date.strftime("%d %B %Y")
      MONTHS.each do |en, ar|
        date_str.gsub!(en, ar)
      end
      date_str
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateLocalization)
