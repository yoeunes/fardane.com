# 📚 دليل إدارة الموقع الإلكتروني

<div dir="rtl">

## 📋 جدول المحتويات

- [مقدمة](#مقدمة)
- [إدارة الشخصيات التاريخية](#إدارة-الشخصيات-التاريخية)
  - [إضافة شخصية جديدة](#إضافة-شخصية-جديدة)
  - [تعديل معلومات شخصية](#تعديل-معلومات-شخصية)
  - [حذف شخصية](#حذف-شخصية)

## مقدمة

مرحباً بك في دليل إدارة الموقع الإلكتروني. هذا الدليل سيساعدك في إدارة محتوى موقعك بسهولة وفعالية.

## 🏛️ إدارة الشخصيات التاريخية

### إضافة شخصية جديدة

#### المرحلة الأولى: رفع الصورة

1. قم بتحضير صورة الشخصية:

   - قم بتحميل الصورة من الإنترنت أو من مصادرك الخاصة
   - احفظ الصورة باسم مناسب باللغة الإنجليزية (مثال: `al-masudi.jpg`)
     > ⚠️ ملاحظة: تأكد من أن اسم الملف يحتوي على حروف إنجليزية صغيرة وشرطات فقط

2. لرفع الصورة:
   - انقر على [هذا الرابط](https://github.com/yoeunes/fardane.com/upload/main/assets/img/people)
   - اسحب الصورة إلى المنطقة المخصصة أو انقر لاختيار الملف
   - اكتب رسالة وصفية مثل "إضافة صورة [اسم الشخصية]"
   - انقر على زر "Commit changes" باللون الأخضر

#### المرحلة الثانية: إضافة معلومات الشخصية

1. انتقل إلى [صفحة الشخصيات](https://github.com/yoeunes/fardane.com/edit/main/_pages/people.md)
2. أضف المعلومات التالية في نهاية الملف (قبل السطر الأخير):

```yaml
- image: اسم-الصورة.jpg # مثال: al-masudi.jpg
  page_url: اسم-الرابط # مثال: al-masudi
  name: اسم الشخصية # مثال: أبو الحسن المسعودي
  description: >
    وصف مختصر للشخصية (يمكن أن يمتد لعدة أسطر)
```

#### المرحلة الثالثة: إنشاء صفحة الشخصية

1. انتقل إلى [صفحة إنشاء ملف جديد](https://github.com/yoeunes/fardane.com/new/main/_pages/people)
2. أدخل اسم الملف: `اسم-الرابط.md` (مثال: `al-masudi.md`)
3. انسخ والصق النموذج التالي:

```yaml
---
layout: default
permalink: /people/اسم-الرابط
title: العنوان الكامل للشخصية
description: وصف مختصر للشخصية
---

# معلومات عن الشخصية

## السيرة الذاتية
هنا يمكنك كتابة السيرة الذاتية للشخصية...

## الإنجازات
- إنجاز 1
- إنجاز 2
- إنجاز 3

## المؤلفات
- كتاب 1
- كتاب 2
```

### تعديل معلومات شخصية

#### تعديل المعلومات الأساسية:

1. انتقل إلى [صفحة الشخصيات](https://github.com/yoeunes/fardane.com/edit/main/_pages/people.md)
2. ابحث عن معلومات الشخصية المراد تعديلها
3. قم بتعديل المعلومات المطلوبة
4. انقر على "Commit changes" لحفظ التعديلات

#### تعديل الصفحة التفصيلية:

1. انتقل إلى [مجلد الشخصيات](https://github.com/yoeunes/fardane.com/tree/main/_pages/people)
2. افتح ملف الشخصية المراد تعديلها (مثال: `al-masudi.md`)
3. انقر على رمز القلم للتعديل
4. قم بإجراء التعديلات المطلوبة
5. انقر على "Commit changes" لحفظ التعديلات

### حذف شخصية

1. حذف الصورة:

   - انتقل إلى [مجلد الصور](https://github.com/yoeunes/fardane.com/tree/main/assets/img/people)
   - ابحث عن الصورة المراد حذفها
   - انقر على الصورة ثم على رمز سلة المهملات

2. حذف المعلومات الأساسية:

   - انتقل إلى [صفحة الشخصيات](https://github.com/yoeunes/fardane.com/edit/main/_pages/people.md)
   - احذف الأسطر المتعلقة بالشخصية
   - احفظ التغييرات

3. حذف الصفحة التفصيلية:
   - انتقل إلى [مجلد الشخصيات](https://github.com/yoeunes/fardane.com/tree/main/_pages/people)
   - ابحث عن ملف الشخصية
   - انقر على الملف ثم على رمز سلة المهملات

## نصائح مهمة

- تأكد دائماً من حفظ التغييرات بالضغط على زر "Commit changes"
- استخدم أسماء ملفات باللغة الإنجليزية وبحروف صغيرة
- احرص على إضافة وصف مناسب لكل تغيير تقوم به
- في حال واجهتك أي مشكلة، يمكنك التواصل مع المسؤول التقني

</div>
