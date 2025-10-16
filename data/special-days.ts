// data/special-days.ts
// ============================================
// 🎯 MADO ÖZEL GÜNLER VERİTABANI - 2025/2026
// Akıllı Menü Sistemi için Gelişmiş Yapı
// ============================================

// ============================================
// 🇹🇷 TÜRKİYE RESMİ TATİLLER VE ÖZEL GÜNLER - 2025
// ============================================

export const SPECIAL_DAYS_2025 = [
  {
    id: 'yilbasi-2025',
    name: {
      tr: 'Yılbaşı',
      en: "New Year's Day",
      ar: 'رأس السنة الميلادية',
      ru: 'Новый год'
    },
    date: '2025-01-01',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🎉',
    menuSuggestions: {
      featuredCategories: ['pastalar', 'sicak-icecekler'],
      specialProducts: ['MADO-017'],
      discountPercentage: 10,
      specialMessage: {
        tr: 'Yeni yıla tatlı bir başlangıç yapın! Pastalarda %10 indirim sizi bekliyor.',
        en: 'Start the new year with a sweet treat! Enjoy a 10% discount on cakes.',
        ar: 'ابدأ العام الجديد بحلوى لذيذة! استمتع بخصم 10٪ على الكيك.',
        ru: 'Начните новый год со сладкого угощения! Скидка 10% на торты.'
      }
    }
  },
  {
    id: 'ramazan-bayrami-2025',
    name: {
      tr: 'Ramazan Bayramı',
      en: 'Ramadan Feast',
      ar: 'عيد الفطر',
      ru: 'Рамадан Байрам'
    },
    date: '2025-03-30',
    endDate: '2025-04-01',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🌙',
    menuSuggestions: {
      featuredCategories: ['serbetli-tatlilar', 'dovme-dondurmalar'],
      specialProducts: ['MADO-004', 'MADO-005'],
      discountPercentage: 15,
      specialMessage: {
        tr: 'Ramazan Bayramınız mübarek olsun! Geleneksel tatlılarımızda %15 indirimle bayram sofralarınızı tatlandırın.',
        en: 'Happy Ramadan Feast! Sweeten your celebrations with a 15% discount on our traditional desserts.',
        ar: 'عيد فطر مبارك! حَلّوا احتفالاتكم بخصم 15٪ على حلوياتنا التقليدية.',
        ru: 'С праздником Рамадан Байрам! Подсластите ваши праздники скидкой 15% на наши традиционные десерты.'
      }
    }
  },
  {
    id: 'ulusal-egemenlik-2025',
    name: {
        tr: 'Ulusal Egemenlik ve Çocuk Bayramı',
        en: 'National Sovereignty and Children\'s Day',
        ar: 'السيادة الوطنية وعيد الطفولة',
        ru: 'День национального суверенитета и детей'
    },
    date: '2025-04-23',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🇹🇷',
    menuSuggestions: {
        featuredCategories: ['atistirmalik-dondurma', 'dondurmali-pastalar'],
        specialProducts: ['MADO-012', 'MADO-014'],
        specialMessage: {
            tr: '23 Nisan kutlu olsun! Çocuk menülerimizde sürprizler sizi bekliyor.',
            en: 'Happy April 23rd! Surprises await in our kids\' menus.',
            ar: 'عيد 23 أبريل سعيد! مفاجآت تنتظركم في قوائم الأطفال.',
            ru: 'С 23 апреля! Сюрпризы ждут в нашем детском меню.'
        }
    }
  },
  {
    id: 'emek-dayanisma-2025',
    name: {
        tr: 'Emek ve Dayanışma Günü',
        en: 'Labour and Solidarity Day',
        ar: 'يوم العمل والتضامن',
        ru: 'День труда и солидарности'
    },
    date: '2025-05-01',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🛠️'
  },
  {
    id: 'genclik-spor-2025',
    name: {
        tr: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı',
        en: 'Commemoration of Atatürk, Youth and Sports Day',
        ar: 'إحياء ذكرى أتاتورك وعيد الشباب والرياضة',
        ru: 'День памяти Ататюрка, молодежи и спорта'
    },
    date: '2025-05-19',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🏃‍♂️',
    menuSuggestions: {
        featuredCategories: ['soguk-icecekler', 'burgerler'],
        specialProducts: ['MADO-008'],
        specialMessage: {
            tr: '19 Mayıs Gençlik ve Spor Bayramı\'nı enerji dolu lezzetlerle kutla!',
            en: 'Celebrate May 19th Youth and Sports Day with energy-filled flavors!',
            ar: 'احتفل بيوم 19 مايو للشباب والرياضة بنكهات مليئة بالطاقة!',
            ru: 'Отметьте 19 мая День молодежи и спорта с полными энергии вкусами!'
        }
    }
  },
  {
    id: 'kurban-bayrami-2025',
    name: {
      tr: 'Kurban Bayramı',
      en: 'Sacrifice Feast',
      ar: 'عيد الأضحى',
      ru: 'Курбан-байрам'
    },
    date: '2025-06-06',
    endDate: '2025-06-09',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🐑',
    menuSuggestions: {
      featuredCategories: ['serbetli-tatlilar', 'etli-ana-yemekler'],
      specialProducts: ['MADO-004'],
      discountPercentage: 10,
      specialMessage: {
        tr: 'Kurban Bayramı\'nızı kutlarız! Bayram sofralarınıza özel lezzetler Mado\'da.',
        en: 'Happy Sacrifice Feast! Special flavors for your feast table are at Mado.',
        ar: 'عيد أضحى مبارك! نكهات خاصة لمائدة عيدكم في مادو.',
        ru: 'Поздравляем с Курбан-байрамом! Специальные блюда для вашего праздничного стола в Мадо.'
      }
    }
  },
  {
    id: 'demokrasi-gunu-2025',
    name: {
        tr: 'Demokrasi ve Milli Birlik Günü',
        en: 'Democracy and National Unity Day',
        ar: 'يوم الديمقراطية والوحدة الوطنية',
        ru: 'День демократии и национального единства'
    },
    date: '2025-07-15',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🇹🇷'
  },
  {
    id: 'zafer-bayrami-2025',
    name: {
        tr: 'Zafer Bayramı',
        en: 'Victory Day',
        ar: 'عيد النصر',
        ru: 'День Победы'
    },
    date: '2025-08-30',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🎖️'
  },
  {
    id: 'cumhuriyet-bayrami-2025',
    name: {
        tr: 'Cumhuriyet Bayramı',
        en: 'Republic Day',
        ar: 'عيد الجمهورية',
        ru: 'День Республики'
    },
    date: '2025-10-29',
    category: 'public-holiday',
    isPublicHoliday: true,
    emojiIcon: '🇹🇷'
  }
];

// ============================================
// 🇹🇷 TÜRKİYE RESMİ TATİLLER VE ÖZEL GÜNLER - 2026
// ============================================

export const SPECIAL_DAYS_2026 = [
    {
        id: 'yilbasi-2026',
        name: { tr: 'Yılbaşı', en: "New Year's Day", ar: 'رأس السنة الميلادية', ru: 'Новый год' },
        date: '2026-01-01',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🎉'
    },
    {
        id: 'ramazan-bayrami-2026',
        name: { tr: 'Ramazan Bayramı', en: 'Ramadan Feast', ar: 'عيد الفطر', ru: 'Рамадан Байрам' },
        date: '2026-03-20',
        endDate: '2026-03-22',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🌙'
    },
    {
        id: 'ulusal-egemenlik-2026',
        name: { tr: 'Ulusal Egemenlik ve Çocuk Bayramı', en: 'National Sovereignty and Children\'s Day', ar: 'السيادة الوطنية وعيد الطفولة', ru: 'День национального суверенитета и детей' },
        date: '2026-04-23',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🇹🇷'
    },
    {
        id: 'emek-dayanisma-2026',
        name: { tr: 'Emek ve Dayanışma Günü', en: 'Labour and Solidarity Day', ar: 'يوم العمل والتضامن', ru: 'День труда и солидарности' },
        date: '2026-05-01',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🛠️'
    },
    {
        id: 'genclik-spor-2026',
        name: { tr: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', en: 'Commemoration of Atatürk, Youth and Sports Day', ar: 'إحياء ذكرى أتاتورك وعيد الشباب والرياضة', ru: 'День памяти Ататюрка, молодежи и спорта' },
        date: '2026-05-19',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🏃‍♂️'
    },
    {
        id: 'kurban-bayrami-2026',
        name: { tr: 'Kurban Bayramı', en: 'Sacrifice Feast', ar: 'عيد الأضحى', ru: 'Курбан-байрам' },
        date: '2026-05-27',
        endDate: '2026-05-30',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🐑'
    },
    {
        id: 'demokrasi-gunu-2026',
        name: { tr: 'Demokrasi ve Milli Birlik Günü', en: 'Democracy and National Unity Day', ar: 'يوم الديمقراطية والوحدة الوطنية', ru: 'День демократии и национального единства' },
        date: '2026-07-15',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🇹🇷'
    },
    {
        id: 'zafer-bayrami-2026',
        name: { tr: 'Zafer Bayramı', en: 'Victory Day', ar: 'عيد النصر', ru: 'День Победы' },
        date: '2026-08-30',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🎖️'
    },
    {
        id: 'cumhuriyet-bayrami-2026',
        name: { tr: 'Cumhuriyet Bayramı', en: 'Republic Day', ar: 'عيد الجمهورية', ru: 'День Республики' },
        date: '2026-10-29',
        category: 'public-holiday',
        isPublicHoliday: true,
        emojiIcon: '🇹🇷'
    }
];


// ============================================
// 🌍 DÜNYA GÜNLERİ VE TEKRARLAYAN ETKİNLİKLER
// ============================================

export const WORLD_DAYS = [
    {
        id: 'sevgililer-gunu',
        name: { tr: 'Sevgililer Günü', en: 'Valentine\'s Day', ar: 'عيد الحب', ru: 'День святого Валентина' },
        date: 'every-02-14',
        category: 'special-event',
        isPublicHoliday: false,
        emojiIcon: '❤️',
        menuSuggestions: {
            featuredCategories: ['pastalar', 'dondurmali-pastalar', 'atistirmalik-dondurma'],
            specialProducts: ['MADO-013', 'MADO-015', 'MADO-017'],
            discountPercentage: 15,
            specialMessage: {
                tr: 'Aşkınızı Mado\'da kutlayın! Kalp şeklindeki pastalarımızda %15 indirim.',
                en: 'Celebrate your love at Mado! 15% off on our heart-shaped cakes.',
                ar: 'احتفلوا بالحب في مادو! خصم 15٪ على كيكاتنا على شكل قلب.',
                ru: 'Отпразднуйте свою любовь в Мадо! Скидка 15% на наши торты в форме сердца.'
            }
        }
    },
    {
        id: 'anneler-gunu',
        name: { tr: 'Anneler Günü', en: 'Mother\'s Day', ar: 'عيد الأم', ru: 'День матери' },
        date: 'every-05-11', // Approximation for 2nd Sunday of May
        category: 'special-event',
        isPublicHoliday: false,
        emojiIcon: '💐',
        menuSuggestions: {
            featuredCategories: ['pastalar', 'sutlu-tatlilar'],
            specialProducts: ['MADO-015', 'MADO-017'],
            specialMessage: {
                tr: 'Canım anneniz için en tatlı hediye Mado\'da!',
                en: 'The sweetest gift for your dear mother is at Mado!',
                ar: 'أحلى هدية لأمك الغالية في مادو!',
                ru: 'Самый сладкий подарок для вашей дорогой мамы в Мадо!'
            }
        }
    },
    {
        id: 'babalar-gunu',
        name: { tr: 'Babalar Günü', en: 'Father\'s Day', ar: 'عيد الأب', ru: 'День отца' },
        date: 'every-06-15', // Approximation for 3rd Sunday of June
        category: 'special-event',
        isPublicHoliday: false,
        emojiIcon: '👨‍👧‍👦',
        menuSuggestions: {
            featuredCategories: ['serbetli-tatlilar', 'etli-ana-yemekler'],
            specialProducts: ['MADO-004'],
            specialMessage: {
                tr: 'Babalar Günü\'nü en lezzetli tatlılarla kutlayın!',
                en: 'Celebrate Father\'s Day with the most delicious desserts!',
                ar: 'احتفل بعيد الأب بألذ الحلويات!',
                ru: 'Отпразднуйте День отца самыми вкусными десертами!'
            }
        }
    },
    {
        id: 'dunya-dondurma-gunu',
        name: { tr: 'Dünya Dondurma Günü', en: 'World Ice Cream Day', ar: 'اليوم العالمي للآيس كريم', ru: 'Всемирный день мороженого' },
        date: 'every-07-21', // Example date, fixed for consistency
        category: 'world-day',
        isPublicHoliday: false,
        emojiIcon: '🍦',
        menuSuggestions: {
            featuredCategories: ['dovme-dondurmalar', 'kesme-dondurmalar', 'vegan-dondurma', 'atistirmalik-dondurma'],
            discountPercentage: 20,
            specialMessage: {
                tr: '🍦 Dünya Dondurma Günü\'ne özel tüm dondurmalarımızda %20 indirim!',
                en: '🍦 Special for World Ice Cream Day, 20% off on all our ice creams!',
                ar: '🍦 خاص باليوم العالمي للآيس كريم، خصم 20٪ على جميع أنواع الآيس كريم لدينا!',
                ru: '🍦 Специально ко Всемирному дню мороженого, скидка 20% на всё наше мороженое!'
            }
        }
    },
    {
        id: 'dunya-kahve-gunu',
        name: { tr: 'Dünya Kahve Günü', en: 'World Coffee Day', ar: 'اليوم العالمي للقهوة', ru: 'Всемирный день кофе' },
        date: 'every-10-01',
        category: 'world-day',
        isPublicHoliday: false,
        emojiIcon: '☕',
        menuSuggestions: {
            featuredCategories: ['sicak-icecekler'],
            specialProducts: ['MADO-004'], // Pairs well with coffee
            specialMessage: {
                tr: 'Kahve Günü\'ne özel, kahvenizin yanında Havuç Dilimi Dondurma %50 indirimli!',
                en: 'For Coffee Day, get 50% off a Carrot Slice Ice Cream with your coffee!',
                ar: 'بمناسبة يوم القهوة، احصل على خصم 50٪ على آيس كريم شريحة الجزر مع قهوتك!',
                ru: 'В День кофе получите скидку 50% на морковное мороженое к вашему кофе!'
            }
        }
    },
    {
        id: 'dunya-vegan-gunu',
        name: { tr: 'Dünya Vegan Günü', en: 'World Vegan Day', ar: 'اليوم العالمي للنباتيين', ru: 'Всемирный день вегана' },
        date: 'every-11-01',
        category: 'world-day',
        isPublicHoliday: false,
        emojiIcon: '🌱',
        menuSuggestions: {
            featuredCategories: ['vegan-dondurma'],
            specialProducts: ['MADO-008'],
            discountPercentage: 25,
            specialMessage: {
                tr: '🌱 Dünya Vegan Günü\'nü kutluyoruz! Vegan dondurmalarımızda %25 indirim.',
                en: '🌱 Celebrating World Vegan Day! 25% off on our vegan ice creams.',
                ar: '🌱 نحتفل باليوم العالمي للنباتيين! خصم 25٪ على الآيس كريم النباتي.',
                ru: '🌱 Празднуем Всемирный день вегана! Скидка 25% на наше веганское мороженое.'
            }
        }
    },
    {
        id: 'dunya-diyabet-gunu',
        name: { tr: 'Dünya Diyabet Günü', en: 'World Diabetes Day', ar: 'اليوم العالمي للسكري', ru: 'Всемирный день диабета' },
        date: 'every-11-14',
        category: 'world-day',
        isPublicHoliday: false,
        emojiIcon: '💙',
        menuSuggestions: {
            featuredCategories: ['diyabetik-dondurma', 'seker-ilavesiz-dondurma', 'sekersiz-dondurma'],
            specialProducts: ['MADO-009'],
            discountPercentage: 20,
            specialMessage: {
                tr: 'Sağlıklı seçimler Mado\'da! Diyabetik dondurmamız bugün %20 indirimli.',
                en: 'Healthy choices at Mado! Our diabetic ice cream is 20% off today.',
                ar: 'خيارات صحية في مادو! آيس كريم مرضى السكري بخصم 20٪ اليوم.',
                ru: 'Здоровый выбор в Мадо! Наше диабетическое мороженое сегодня со скидкой 20%.'
            }
        }
    }
];
