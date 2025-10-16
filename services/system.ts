
// services/system.ts
// This file contains the DynamicMenuBuilder, which is used in MainMenu.tsx
// to create context-aware menu layouts.

import { SPECIAL_DAYS_2025, SPECIAL_DAYS_2026, WORLD_DAYS } from '../data/special-days';

export class DynamicMenuBuilder {
  // FIX: Declare class property 'allSpecialDays' to resolve access errors.
  allSpecialDays: any[];
  constructor() {
    this.allSpecialDays = [...SPECIAL_DAYS_2025, ...SPECIAL_DAYS_2026, ...WORLD_DAYS];
  }
  
  getCurrentSpecialDay(context) {
    const today = context.currentDate;
    const todayStr = today.toISOString().split('T')[0];
    const todayMonthDay = `every-${todayStr.substring(5)}`;

    return this.allSpecialDays.find(day => {
      if (day.endDate) {
        return todayStr >= day.date && todayStr <= day.endDate;
      }
      return day.date === todayStr || day.date === todayMonthDay;
    });
  }

  buildMenu(allProducts, context) {
    let featuredProducts = [];
    let regularProducts = [...allProducts];
    let specialDayMessage;
    let weatherMessage;

    const specialDay = this.getCurrentSpecialDay(context);
    if (specialDay?.menuSuggestions?.specialMessage) {
      specialDayMessage = specialDay.menuSuggestions.specialMessage[context.locale] || specialDay.menuSuggestions.specialMessage.en;
    }
    
    if (context.currentWeather) {
        const { temperature, condition } = context.currentWeather;
        const lang = context.locale;
        const messages = {
            hot: {
                tr: 'Hava çok sıcak! Serinletici dondurmalarımıza ve soğuk içeceklerimize göz atın.',
                en: 'It\'s hot outside! Check out our refreshing ice creams and cold drinks.',
                ar: 'الجو حار! تفضلوا بتصفح آيس كريمنا المنعش ومشروباتنا الباردة.',
                ru: 'На улице жарко! Посмотрите наше освежающее мороженое и холодные напитки.',
            },
            cold: {
                tr: 'Soğuk havada içinizi ısıtacak sıcak içeceklerimiz ve tatlılarımız sizi bekliyor.',
                en: 'Our hot drinks and desserts are waiting to warm you up in this cold weather.',
                ar: 'مشروباتنا الساخنة وحلوياتنا في انتظاركم لتدفئتكم في هذا الطقس البارد.',
                ru: 'Наши горячие напитки и десерты ждут, чтобы согреть вас в эту холодную погоду.',
            }
        };

        if (temperature > 28 && condition === 'sunny') {
            weatherMessage = messages.hot[lang] || messages.hot.en;
        } else if (temperature < 10) {
            weatherMessage = messages.cold[lang] || messages.cold.en;
        }
    }

    const featuredIds = new Set();

    if (specialDay?.menuSuggestions?.specialProducts) {
      specialDay.menuSuggestions.specialProducts.forEach(id => featuredIds.add(id));
    }

    allProducts.filter(p => p.isFeatured).forEach(p => featuredIds.add(p.id));

    featuredProducts = allProducts.filter(p => featuredIds.has(p.id));
    
    // Ensure no duplicates between featured and regular
    regularProducts = allProducts.filter(p => !featuredIds.has(p.id));

    return {
      featuredProducts,
      regularProducts,
      specialDayMessage,
      weatherMessage,
    };
  }
}