// data/menuData.ts
// This file provides the hierarchical menu structure for the application.

export const menuCategories = {
  "menu_categories": [
    {
      "id": "kahvaltilar",
      "name": {
        "tr": "Kahvaltılar",
        "en": "Breakfasts",
        "ar": "وجبات الإفطار",
        "ru": "Завтраки"
      },
      "description": {
        "tr": "Güne Mado'nun zengin kahvaltıları ve fırından taze çıkmış lezzetleriyle başlayın.",
        "en": "Start your day with Mado's rich breakfasts and freshly baked delicacies.",
        "ar": "ابدأ يومك بوجبات فطور مادو الغنية والأطباق الطازجة.",
        "ru": "Начните свой день с богатых завтраков и свежеиспеченных деликатесов от Мадо."
      },
      "icon": "🍳",
      "image": "https://images.jacca.com/prod/pixlogo/product/e7655d9d-8a72-46ff-bf5d-02d050952f5a.jpg",
      "displayOrder": 1,
      "isActive": true,
      "isFeatured": true,
      "subcategories": [
        { "id": "gun-boyu-kahvaltilar", "name": { "tr": "Serpme Kahvaltılar", "en": "Spread Breakfasts", "ar": "وجبات الإفطار المشكلة", "ru": "Завтраки-ассорти" } },
        { "id": "tek-kisilik-kahvaltilar", "name": { "tr": "Tek Kişilik Kahvaltılar", "en": "Single Breakfasts", "ar": "وجبات إفطار فردية", "ru": "Завтраки на одного" } },
        { "id": "yumurtali-lezzetler", "name": { "tr": "Yumurtalı Lezzetler", "en": "Egg Dishes", "ar": "أطباق البيض", "ru": "Блюда из яиц" } }
      ]
    },
    {
      "id": "hamur_isleri",
      "name": {
        "tr": "Hamur İşleri",
        "en": "Pastries",
        "ar": "المعجنات",
        "ru": "Выпечка"
      },
      "description": {
        "tr": "Geleneksel börek, gözleme ve pideler Mado'nun usta dokunuşuyla.",
        "en": "Traditional börek, gözleme, and pide with Mado's masterful touch.",
        "ar": "البوريك التقليدي والجوزلمه والبيدا بلمسة مادو المتقنة.",
        "ru": "Традиционные бёрек, гёзлеме и пиде с мастерским подходом Мадо."
      },
      "icon": "🥐",
      "image": "https://images.jacca.com/prod/pixlogo/product/2a717f94-2934-4868-9cce-3bcc62ff6411.jpg",
      "displayOrder": 2,
      "isActive": true,
      "isFeatured": false,
      "subcategories": [
        { "id": "borekler", "name": { "tr": "Börekler", "en": "Pastries (Börek)", "ar": "المعجنات (بوريك)", "ru": "Пироги (Бёрек)" } },
        { "id": "gozlemeler", "name": { "tr": "Gözlemeler", "en": "Gözleme", "ar": "الجوزلمة", "ru": "Гёзлеме" } },
        { "id": "tostlar", "name": { "tr": "Tostlar", "en": "Toasts", "ar": "التوست", "ru": "Тосты" } },
        { "id": "kapali-koy-pideleri", "name": { "tr": "Kapalı Köy Pideleri", "en": "Closed Village Pide", "ar": "بيدا القرية المغلقة", "ru": "Закрытое деревенское пиде" }}
      ]
    },
    {
      "id": "ana_yemekler",
      "name": {
        "tr": "Ana Yemekler",
        "en": "Main Courses",
        "ar": "الأطباق الرئيسية",
        "ru": "Основные блюда"
      },
      "description": {
        "tr": "Anadolu ve dünya mutfağının en seçkin lezzetleri.",
        "en": "The most exclusive flavors from Anatolian and world cuisines.",
        "ar": "أفخر النكهات من المطبخ الأناضولي والعالمي.",
        "ru": "Самые изысканные блюда анатолийской и мировой кухни."
      },
      "icon": "🍽️",
      "image": "https://images.jacca.com/prod/pixlogo/product/13c7be85-3a56-498d-905a-6b209b5eaeea.jpg",
      "displayOrder": 3,
      "isActive": true,
      "isFeatured": false,
      "subcategories": [
        { "id": "corbalar", "name": { "tr": "Çorbalar", "en": "Soups", "ar": "الشوربات", "ru": "Супы" }},
        { "id": "atistirmaliklar", "name": { "tr": "Atıştırmalıklar", "en": "Appetizers", "ar": "المقبلات", "ru": "Закуски" }},
        { "id": "salatalar", "name": { "tr": "Salatalar", "en": "Salads", "ar": "السلطات", "ru": "Салаты" }},
        { "id": "yoresel-lezzetler", "name": { "tr": "Yöresel Lezzetler", "en": "Regional Flavors", "ar": "نكهات إقليمية", "ru": "Региональные блюда" }},
        { "id": "etli-ana-yemekler", "name": { "tr": "Etli Ana Yemekler", "en": "Meat Main Courses", "ar": "أطباق اللحوم الرئيسية", "ru": "Мясные основные блюда" }},
        { "id": "tavuklu-ana-yemekler", "name": { "tr": "Tavuklu Ana Yemekler", "en": "Chicken Main Courses", "ar": "أطباق الدجاج الرئيسية", "ru": "Куриные основные блюда" }},
        { "id": "kofteli-ana-yemekler", "name": { "tr": "Köfteli Ana Yemekler", "en": "Meatball Main Courses", "ar": "أطباق الكفتة الرئيسية", "ru": "Основные блюда с фрикадельками" }},
        { "id": "mantilar", "name": { "tr": "Mantılar", "en": "Mantı (Dumplings)", "ar": "المانتي (زلابية)", "ru": "Манты (пельмени)" }},
        { "id": "makarnalar", "name": { "tr": "Makarnalar", "en": "Pastas", "ar": "المعكرونة", "ru": "Паста" }},
        { "id": "burgerler", "name": { "tr": "Burgerler", "en": "Burgers", "ar": "البرجر", "ru": "Бургеры" }},
        { "id": "pizzalar", "name": { "tr": "Pizzalar", "en": "Pizzas", "ar": "البيتزا", "ru": "Пицца" }},
        { "id": "durumler", "name": { "tr": "Dürümler", "en": "Wraps", "ar": "الراب", "ru": "Роллы" }}
      ]
    },
    {
      "id": "dondurmalar",
      "name": {
        "tr": "Dondurmalar",
        "en": "Ice Creams",
        "ar": "الآيس كريم",
        "ru": "Мороженое"
      },
      "description": {
        "tr": "Mado'nun asırlık mirası, keçi sütünün ve salebin en saf hali.",
        "en": "Mado's centuries-old heritage, the purest form of goat's milk and salep.",
        "ar": "تراث مادو العريق، أنقى صور حليب الماعز والسحلب.",
        "ru": "Многовековое наследие Мадо, чистейшая форма козьего молока и салепа."
      },
      "icon": "🍦",
      "image": "https://images.jacca.com/prod/pixlogo/product/22870164-9dd6-4c8f-b7f6-071c32fae0f4.jpg",
      "displayOrder": 4,
      "isActive": true,
      "isFeatured": true,
      "subcategories": [
        { "id": "kesme-dondurmalar", "name": { "tr": "Kesme Dondurmalar", "en": "Cut Ice Creams", "ar": "آيس كريم مقطع", "ru": "Нарезанное мороженое" }},
        { "id": "dovme-dondurmalar", "name": { "tr": "Dövme Dondurmalar", "en": "Beaten Ice Creams", "ar": "آيس كريم تقليدي", "ru": "Традиционное мороженое" }},
        { "id": "atistirmalik-dondurma", "name": { "tr": "Atıştırmalık Dondurmalar", "en": "Snack Ice Creams", "ar": "آيس كريم للوجبات الخفيفة", "ru": "Закусочное мороженое" }},
        { "id": "dondurmali-lezzetler", "name": { "tr": "Dondurmalı Lezzetler", "en": "Flavors with Ice Cream", "ar": "نكهات مع الآيس كريم", "ru": "Блюда с мороженым" }},
        { "id": "spesiyal-kuplar", "name": { "tr": "Spesiyal Kuplar", "en": "Special Sundaes", "ar": "أكواب خاصة", "ru": "Особые десерты" }},
        { "id": "vegan-dondurma", "name": { "tr": "Vegan Dondurma", "en": "Vegan Ice Cream", "ar": "آيس كريم نباتي", "ru": "Веганское мороженое" }},
        { "id": "diyabetik-dondurma", "name": { "tr": "Diyabetik Dondurma", "en": "Diabetic Ice Cream", "ar": "آيس كريم لمرضى السكري", "ru": "Диабетическое мороженое" }},
        { "id": "seker-ilavesiz-dondurma", "name": { "tr": "Şeker İlavesiz", "en": "No Sugar Added", "ar": "بدون سكر مضاف", "ru": "Без добавления сахара" }},
        { "id": "sekersiz-dondurma", "name": { "tr": "Şekersiz Dondurma", "en": "Sugar-Free Ice Cream", "ar": "آيس كريم خالي من السكر", "ru": "Мороженое без сахара" }}
      ]
    },
    {
      "id": "tatlilar_pastalar",
      "name": {
        "tr": "Tatlılar & Pastalar",
        "en": "Desserts & Cakes",
        "ar": "الحلويات والكيك",
        "ru": "Десерты и торты"
      },
      "description": {
        "tr": "Geleneksel şerbetli tatlılardan modern pastalara, Mado'nun tatlı dünyası.",
        "en": "From traditional syrupy desserts to modern cakes, Mado's world of sweets.",
        "ar": "من الحلويات التقليدية بالشيرة إلى الكيكات العصرية، عالم مادو من الحلويات.",
        "ru": "От традиционных десертов в сиропе до современных тортов, мир сладостей Мадо."
      },
      "icon": "🍰",
      "image": "https://images.jacca.com/prod/pixlogo/product/438bee7d-1e51-4846-bd7b-49fd94284343.jpg",
      "displayOrder": 5,
      "isActive": true,
      "isFeatured": true,
      "subcategories": [
        { "id": "fistikli-serbetli-tatlilar", "name": { "tr": "Fıstıklı Şerbetli Tatlılar", "en": "Pistachio Syrupy Desserts", "ar": "حلويات بالشيرة والفستق", "ru": "Десерты в сиропе с фисташками" }},
        { "id": "cevizli-serbetli-tatlilar", "name": { "tr": "Cevizli Şerbetli Tatlılar", "en": "Walnut Syrupy Desserts", "ar": "حلويات بالشيرة والجوز", "ru": "Десерты в сиропе с грецким орехом" }},
        { "id": "soguk-baklavalar", "name": { "tr": "Soğuk Baklavalar", "en": "Cold Baklavas", "ar": "البقلاوة الباردة", "ru": "Холодная пахлава" }},
        { "id": "dondurmali-serbetli-tatli-tabaklari", "name": { "tr": "Dondurmalı Tatlı Tepsileri", "en": "Dessert Platters w/ Ice Cream", "ar": "صواني حلويات مع آيس كريم", "ru": "Десертные ассорти с мороженым" }},
        { "id": "sicak-tatlilar", "name": { "tr": "Sıcak Tatlılar", "en": "Hot Desserts", "ar": "حلويات ساخنة", "ru": "Горячие десерты" }},
        { "id": "sutlu-tatlilar", "name": { "tr": "Sütlü Tatlılar", "en": "Milk Desserts", "ar": "حلويات الحليب", "ru": "Молочные десерты" }},
        { "id": "yeni-nesil-muhallebi", "name": { "tr": "Yeni Nesil Muhallebiler", "en": "New Gen Puddings", "ar": "مهلبية الجيل الجديد", "ru": "Пудинги нового поколения" }},
        { "id": "pastalar", "name": { "tr": "Dilim Pastalar", "en": "Slice Cakes", "ar": "شرائح الكيك", "ru": "Кусочки торта" }},
        { "id": "dondurmali-pastalar", "name": { "tr": "Dondurmalı Pastalar", "en": "Ice Cream Cakes", "ar": "كيك الآيس كريم", "ru": "Торты-мороженое" }},
        { "id": "waffle", "name": { "tr": "Waffle", "en": "Waffle", "ar": "الوافل", "ru": "Вафли" }},
        { "id": "kup-profiteroller", "name": { "tr": "Kup Profiteroller", "en": "Profiterole Sundaes", "ar": "أكواب البروفيترول", "ru": "Профитроли в стакане" }},
        { "id": "dokme-profiterol", "name": { "tr": "Dökme Profiterol", "en": "Poured Profiterole", "ar": "البروفيترول المسكوب", "ru": "Разливные профитроли" }},
        { "id": "ekler-tartoletler", "name": { "tr": "Ekler & Tartoletler", "en": "Éclairs & Tartlets", "ar": "الإكلير والتارتليت", "ru": "Эклеры и тарталетки" }},
        { "id": "madolina", "name": { "tr": "Madolina", "en": "Madolina", "ar": "مادولينا", "ru": "Мадолина" }}
      ]
    },
    {
      "id": "icecekler",
      "name": {
        "tr": "İçecekler",
        "en": "Beverages",
        "ar": "المشروبات",
        "ru": "Напитки"
      },
      "description": {
        "tr": "Sıcak ve soğuk, geleneksel ve modern, her anınıza eşlik edecek içecekler.",
        "en": "Hot and cold, traditional and modern beverages to accompany your every moment.",
        "ar": "مشروبات ساخنة وباردة، تقليدية وعصرية لترافق كل لحظاتك.",
        "ru": "Горячие и холодные, традиционные и современные напитки для любого момента."
      },
      "icon": "🥤",
      "image": "https://images.jacca.com/prod/pixlogo/product/c46e7cb3-91fc-4d4f-b056-ad0d4cc2d2a3.jpg",
      "displayOrder": 6,
      "isActive": true,
      "isFeatured": false,
      "subcategories": [
        { "id": "turk-kahvesi", "name": { "tr": "Türk Kahvesi", "en": "Turkish Coffee", "ar": "القهوة التركية", "ru": "Турецкий кофе" }},
        { "id": "sicak-kahveler", "name": { "tr": "Sıcak Kahveler", "en": "Hot Coffees", "ar": "القهوة الساخنة", "ru": "Горячий кофе" }},
        { "id": "demleme-turk-cayi", "name": { "tr": "Demleme Çay", "en": "Brewed Tea", "ar": "شاي مخمر", "ru": "Заварной чай" }},
        { "id": "bitki-ve-meyve-caylari", "name": { "tr": "Bitki & Meyve Çayları", "en": "Herbal & Fruit Teas", "ar": "شاي الأعشاب والفواكه", "ru": "Травяные и фруктовые чаи" }},
        { "id": "sicak-kis-icecekleri", "name": { "tr": "Sıcak Kış İçecekleri", "en": "Hot Winter Drinks", "ar": "مشروبات شتوية ساخنة", "ru": "Горячие зимние напитки" }},
        { "id": "buzlu-kahveler", "name": { "tr": "Buzlu Kahveler", "en": "Iced Coffees", "ar": "القهوة المثلجة", "ru": "Холодный кофе" }},
        { "id": "limonatalar", "name": { "tr": "Ev Yapımı Limonatalar", "en": "Homemade Lemonades", "ar": "عصير ليمون منزلي", "ru": "Домашние лимонады" }},
        { "id": "milkshake-ve-smoothie", "name": { "tr": "Milkshake & Smoothie", "en": "Milkshake & Smoothie", "ar": "ميلك شيك وسموذي", "ru": "Милкшейки и смузи" }},
        { "id": "vitaminli-dogal-icecekler", "name": { "tr": "Vitamin Bar", "en": "Vitamin Bar", "ar": "بار الفيتامينات", "ru": "Витаминный бар" }},
        { "id": "geleneksel-icecekler", "name": { "tr": "Geleneksel İçecekler", "en": "Traditional Drinks", "ar": "مشروبات تقليدية", "ru": "Традиционные напитки" }},
        { "id": "soguk-salepler", "name": { "tr": "Soğuk Salepler", "en": "Iced Saleps", "ar": "سحلب بارد", "ru": "Холодный салеп" }},
        { "id": "soguk-icecekler", "name": { "tr": "Diğer Soğuk İçecekler", "en": "Other Cold Drinks", "ar": "مشروبات باردة أخرى", "ru": "Другие холодные напитки" }}
      ]
    },
    {
      "id": "ozel_menuler",
      "name": {
        "tr": "Özel Menüler",
        "en": "Special Menus",
        "ar": "قوائم خاصة",
        "ru": "Специальные меню"
      },
      "description": {
        "tr": "Mado'nun paylaşmalık tepsileri ve bölgesel kampanyaları.",
        "en": "Mado's sharing platters and regional offers.",
        "ar": "صواني مادو للمشاركة والعروض الإقليمية.",
        "ru": "Блюда для компаний и региональные предложения от Мадо."
      },
      "icon": "⭐",
      "image": "https://images.jacca.com/prod/pixlogo/product/4124e98b-e94c-4d0c-a25a-ddea4914f942.jpg",
      "displayOrder": 7,
      "isActive": true,
      "isFeatured": false,
      "subcategories": [
        { "id": "sohbet-sinisi", "name": { "tr": "Sohbet Sinisi", "en": "Conversation Platter", "ar": "صينية السمر", "ru": "Блюдо для беседы" }},
        { "id": "egeye-ozel", "name": { "tr": "Ege'ye Özel", "en": "Aegean Specials", "ar": "خاص ببحر إيجة", "ru": "Специально для Эгейского региона" }}
      ]
    }
  ]
};
