// app.ts - Kullanım Örneği
// ============================================
// 🚀 MADO AI MENÜ SİSTEMİ - KULLANIM ÖRNEĞİ
// ============================================

import { menuCategories as MENU_CATEGORIES } from './data/menuData';
import { products as PRODUCTS } from './data/products';
import { AIRecommendationEngine } from './services/aiRecommendationEngine';

// ════════════════════════════════════════
// 1️⃣ SİSTEM BAŞLATMA
// ════════════════════════════════════════

console.log("🎯 MADO AI Menü Sistemi Başlatılıyor...\n");

// AI Recommendation Engine'i başlat
const aiEngine = new AIRecommendationEngine(PRODUCTS);
console.log("✅ AI Recommendation Engine hazır");
console.log(`📦 ${PRODUCTS.length} ürün yüklendi`);
console.log(`🗂️ ${MENU_CATEGORIES.menu_categories.length} ana kategori aktif\n`);

// ════════════════════════════════════════
// 2️⃣ KULLANICI PROFİLİ OLUŞTURMA
// ════════════════════════════════════════

console.log("👤 Örnek Kullanıcı Profili Oluşturuluyor...\n");

const exampleUser = {
  userId: "demo-user-001",
  
  // Son 7 gündeki görüntülemeler
  viewHistory: [
    {
      productId: "MADO-001",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
      duration: 45,
      addedToCart: true,
      purchased: true
    },
    {
      productId: "MADO-002",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 gün önce
      duration: 30,
      addedToCart: false,
      purchased: false
    }
  ],
  
  // Geçmiş siparişler
  purchaseHistory: [
    {
      productId: "MADO-001",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      quantity: 1,
      rating: 5
    }
  ],
  
  // Arama geçmişi
  searchHistory: [
    {
      query: "dondurma",
      timestamp: new Date(),
      resultsClicked: ["MADO-001"]
    }
  ],
  
  // Kullanıcı tercihleri
  preferences: {
    favoriteCategories: ["kesme-dondurmalar"],
    dietaryRestrictions: [], // Boş = kısıtlama yok
    allergens: ["Fındık"], // Fındık alerjisi var
    priceRange: { min: 0, max: 500 },
    flavorProfile: {
      sweet: 9,    // Çok tatlı seviyor
      savory: 2,   // Tuzlu pek sevmiyor
      spicy: 0,    // Acı sevmiyor
      bitter: 5    // Orta seviyede bitter
    }
  },
  
  // Demografik bilgiler
  demographics: {
    ageGroup: "25-34",
    location: "Istanbul",
    visitFrequency: "weekly"
  },
  
  // Sadakat programı
  loyaltyTier: "gold",
  totalSpending: 2450,
  lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
};

console.log("✅ Kullanıcı Profili:");
console.log(`   👤 ID: ${exampleUser.userId}`);
console.log(`   🏆 Seviye: ${exampleUser.loyaltyTier?.toUpperCase()}`);
console.log(`   💰 Toplam Harcama: ${exampleUser.totalSpending} TL`);
console.log(`   📊 Geçmiş Sipariş: ${exampleUser.purchaseHistory.length}`);
console.log(`   👁️ Ürün Görüntüleme: ${exampleUser.viewHistory.length}\n`);

// ════════════════════════════════════════
// 3️⃣ BAĞLAMSAL BİLGİLER (CONTEXT)
// ════════════════════════════════════════

console.log("🌍 Anlık Bağlam Bilgileri:\n");

const currentContext = {
  locale: 'tr',
  currentDate: new Date(),
  timeOfDay: "afternoon", // Öğleden sonra
  dayOfWeek: "saturday",
  isWeekend: true,
  isHoliday: false,
  specialOccasion: undefined,
  
  // Hava durumu (gerçek uygulamada API'den gelir)
  currentWeather: {
    temperature: 32, // °C
    condition: "sunny",
    humidity: 45
  },
  
  // Lokasyon bilgisi
  location: {
    type: "dine-in", // Restoranda yemek
    tableNumber: "A-15"
  },
  
  // Grup bilgisi
  groupSize: 2, // 2 kişi
  withChildren: false,
  
  // Finansal
  averageOrderValue: 425
};

console.log(`   📅 Tarih: ${currentContext.currentDate.toLocaleDateString("tr-TR")}`);
console.log(`   ⏰ Zaman: ${currentContext.timeOfDay} (${currentContext.currentDate.toLocaleTimeString("tr-TR")})`);
console.log(`   🌤️ Hava: ${currentContext.currentWeather?.temperature}°C, ${currentContext.currentWeather?.condition}`);
console.log(`   📍 Lokasyon: ${currentContext.location?.type} (Masa: ${currentContext.location?.tableNumber})`);
console.log(`   👥 Grup: ${currentContext.groupSize} kişi\n`);

// ════════════════════════════════════════
// 4️⃣ AI ÖNERİLER ALMA
// ════════════════════════════════════════

console.log("🤖 AI Öneriler Hesaplanıyor...\n");

const recommendations = aiEngine.getRecommendations(
  exampleUser,
  currentContext,
  {
    limit: 5,
    minScore: 60
  }
);

console.log("✨ EN İYİ 5 ÖNERİ:\n");
console.log("═══════════════════════════════════════════════════════\n");

recommendations.forEach((rec, index) => {
  console.log(`${index + 1}. ${rec.product.name.tr}`);
  console.log(`   💰 Fiyat: ${rec.product.price} ${rec.product.currency}`);
  console.log(`   ⭐ Rating: ${rec.product.rating}/5.0 (${rec.product.reviews} yorum)`);
  console.log(`   🎯 AI Skoru: ${rec.score.totalScore.toFixed(1)}/100`);
  console.log(`   📊 Güven: ${(rec.score.confidence * 100).toFixed(1)}%`);
  console.log(`   🔖 Etiketler: ${rec.tags.join(", ")}`);
  console.log(`   💡 Sebepler:`);
  rec.score.reasons.forEach(reason => {
    console.log(`      • ${reason}`);
  });
  console.log(`\n   📈 Detaylı Skorlar:`);
  console.log(`      Collaborative: ${rec.score.scores.collaborative.toFixed(1)}`);
  console.log(`      Content-Based: ${rec.score.scores.contentBased.toFixed(1)}`);
  console.log(`      Contextual: ${rec.score.scores.contextual.toFixed(1)}`);
  console.log(`      Popularity: ${rec.score.scores.popularity.toFixed(1)}`);
  console.log(`      Personalized: ${rec.score.scores.personalized.toFixed(1)}`);
  console.log(`      Cross-Sell: ${rec.score.scores.crossSell.toFixed(1)}`);
  console.log(`      Novelty: ${rec.score.scores.novelty.toFixed(1)}`);
  console.log("\n───────────────────────────────────────────────────────\n");
});

// ════════════════════════════════════════
// 5️⃣ FARKLI SENARYOLAR
// ════════════════════════════════════════

console.log("\n🎭 FARKLI SENARYO TESTLERİ\n");
console.log("═══════════════════════════════════════════════════════\n");

// SENARYO 1: Soğuk Kış Günü
console.log("❄️ SENARYO 1: Soğuk Bir Kış Günü (-5°C, Karlı)\n");

const winterContext = {
  ...currentContext,
  currentWeather: {
    temperature: -5,
    condition: "snowy",
    humidity: 80
  }
};

const winterRecommendations = aiEngine.getRecommendations(
  exampleUser,
  winterContext,
  { limit: 3 }
);

console.log("Top 3 Kış Önerileri:");
winterRecommendations.forEach((rec, i) => {
  console.log(`  ${i + 1}. ${rec.product.name.tr} (Skor: ${rec.score.totalScore.toFixed(1)})`);
  console.log(`     💡 ${rec.score.reasons[0]}\n`);
});

// SENARYO 2: Özel Gün (Sevgililer Günü)
console.log("\n💕 SENARYO 2: Sevgililer Günü Özel\n");

const valentinesContext = {
  ...currentContext,
  specialOccasion: "valentines",
  groupSize: 2
};

const valentinesRecommendations = aiEngine.getRecommendations(
  exampleUser,
  valentinesContext,
  { limit: 3 }
);

console.log("Top 3 Sevgililer Günü Önerileri:");
valentinesRecommendations.forEach((rec, i) => {
  console.log(`  ${i + 1}. ${rec.product.name.tr} (Skor: ${rec.score.totalScore.toFixed(1)})`);
  console.log(`     💡 ${rec.score.reasons[0]}\n`);
});

// SENARYO 3: Vegan Kullanıcı
console.log("\n🌱 SENARYO 3: Vegan Diyet Kısıtlaması\n");

const veganUser = {
  ...exampleUser,
  preferences: {
    ...exampleUser.preferences,
    dietaryRestrictions: ["vegan"]
  }
};

const veganRecommendations = aiEngine.getRecommendations(
  veganUser,
  currentContext,
  { limit: 3 }
);

console.log("Top 3 Vegan Önerileri:");
veganRecommendations.forEach((rec, i) => {
  console.log(`  ${i + 1}. ${rec.product.name.tr} (Skor: ${rec.score.totalScore.toFixed(1)})`);
  console.log(`     🌱 Vegan: ${rec.product.isVegan ? "✓" : "✗"}`);
  console.log(`     💡 ${rec.score.reasons[0]}\n`);
});

// ════════════════════════════════════════
// 6️⃣ A/B TEST VARYANTLARI
// ════════════════════════════════════════

console.log("\n🧪 A/B TEST VARYANTLARI\n");
console.log("═══════════════════════════════════════════════════════\n");

const abTestVariants = aiEngine.generateABTestVariants(
  exampleUser,
  currentContext,
  3
);

abTestVariants.forEach(variant => {
  console.log(`${variant.variant} Varyantı - ${variant.strategy}:`);
  console.log(`  En İyi 3 Ürün:`);
  variant.recommendations.slice(0, 3).forEach((rec, i) => {
    console.log(`    ${i + 1}. ${rec.product.name.tr} (${rec.score.totalScore.toFixed(1)})`);
  });
  console.log("");
});

// ════════════════════════════════════════
// 7️⃣ PERFORMANS ANALİZİ SİMÜLASYONU
// ════════════════════════════════════════

console.log("\n📊 PERFORMANS ANALİZİ (Simülasyon)\n");
console.log("═══════════════════════════════════════════════════════\n");

// Simüle edilmiş kullanıcı davranışı
const simulatedClicks = [
  recommendations.length > 0 ? recommendations[0].product.id : '', // 1. öneriyi tıkladı
  recommendations.length > 1 ? recommendations[1].product.id : ''  // 2. öneriyi tıkladı
].filter(Boolean);

const simulatedPurchases = [
  recommendations.length > 0 ? recommendations[0].product.id : '' // 1. öneriyi satın aldı
].filter(Boolean);

const performance = aiEngine.analyzeRecommendationPerformance(
  recommendations,
  simulatedClicks,
  simulatedPurchases
);

console.log(`📈 Click-Through Rate (CTR): ${performance.clickThroughRate}%`);
console.log(`💰 Conversion Rate: ${performance.conversionRate}%`);
console.log(`🎯 Relevance Score: ${performance.relevanceScore}%`);

console.log("\n✅ Sistem Başarıyla Test Edildi!\n");

// ════════════════════════════════════════
// 8️⃣ ÖZETİ
// ════════════════════════════════════════

console.log("\n📋 SİSTEM ÖZETİ\n");
console.log("═══════════════════════════════════════════════════════\n");

console.log("✨ Özellikler:");
console.log("   ✓ 7 farklı AI algoritması (Collaborative, Content-Based, vb.)");
console.log("   ✓ Hava durumu bazlı öneriler");
console.log("   ✓ Özel gün kampanyaları");
console.log("   ✓ Kişiselleştirilmiş filtreleme");
console.log("   ✓ A/B test desteği");
console.log("   ✓ Performans analizi");
console.log("   ✓ Çok dilli destek (TR, EN, AR, RU)");

console.log("\n📊 İstatistikler:");
console.log(`   • ${PRODUCTS.length} aktif ürün`);
console.log(`   • ${MENU_CATEGORIES.menu_categories.length} kategori`);
if(recommendations.length > 0){
    console.log(`   • ${recommendations.length} öneri üretildi`);
    console.log(`   • Ortalama skor: ${(recommendations.reduce((sum, r) => sum + r.score.totalScore, 0) / recommendations.length).toFixed(1)}/100`);
    console.log(`   • Ortalama güven: ${(recommendations.reduce((sum, r) => sum + r.score.confidence, 0) / recommendations.length * 100).toFixed(1)}%`);
}


console.log("\n🚀 Sistem Hazır!\n");

// ════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════

export {
  aiEngine,
  exampleUser,
  currentContext,
  recommendations,
  MENU_CATEGORIES,
  PRODUCTS
};
