import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const descriptionPrompts = {
    tr: `MADO menüsünde yer alan "{categoryName}" kategorisindeki "{productName}" ürünü için iştah açıcı, kısa ve pazarlama odaklı bir ürün açıklaması yaz. Açıklama Türkçe olmalı ve 1-2 cümleyi geçmemelidir. Geleneksel lezzetlere vurgu yap.`,
    en: `Write a tempting, short, and marketing-focused product description for the item "{productName}" in the "{categoryName}" category from the MADO menu. The description should be in English, no longer than 1-2 sentences, and emphasize traditional flavors.`,
    ar: `اكتب وصفًا تسويقيًا جذابًا وقصيرًا للمنتج "{productName}" ضمن فئة "{categoryName}" في قائمة MADO. يجب أن يكون الوصف باللغة العربية، لا يتجاوز جملة أو جملتين، ويركز على النكهات التقليدية.`,
    ru: `Напишите аппетитное, краткое и маркетинговое описание продукта «{productName}» из категории «{categoryName}» в меню MADO. Описание должно быть на русском языке, не длиннее 1-2 предложений и подчеркивать традиционные вкусы.`
};

const fallbackDescriptions = {
    tr: `Bu, {categoryName} kategorisinden lezzetli bir {productName}. Geleneksel tariflerle hazırlanmış, eşsiz bir lezzet deneyimi sunar.`,
    en: `This is a delicious {productName} from the {categoryName} category. Prepared with traditional recipes, it offers a unique taste experience.`,
    ar: `هذا {productName} لذيذ من فئة {categoryName}. محضر بالوصفات التقليدية، يقدم تجربة طعم فريدة.`,
    ru: `Это вкусный {productName} из категории {categoryName}. Приготовлено по традиционным рецептам, предлагает уникальные вкусовые ощущения.`
}

export const generateProductDescription = async (productName, categoryName, language) => {
  console.log(`Generating description for ${productName} in ${categoryName} (${language})`);
  
  const prompt = descriptionPrompts[language]
      .replace('{productName}', productName)
      .replace('{categoryName}', categoryName);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating product description:", error);
    return fallbackDescriptions[language]
        .replace('{productName}', productName)
        .replace('{categoryName}', categoryName);
  }
};

export const generateProductImage = async (productName, description) => {
    console.log(`Generating image for ${productName} with description: ${description}`);
    
    const prompt = `A professional, photorealistic image of a traditional Turkish dessert from MADO called "${productName}". The dessert is described as: "${description}". It should be presented beautifully on a clean, elegant plate, with a slightly blurred background of a cozy, traditional Turkish cafe. The lighting should be warm and inviting, highlighting the texture of the food. High resolution, food photography style.`;

    try {
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return { base64: base64ImageBytes };
      }
      return { base64: '' };
    } catch (error) {
      console.error("Error generating product image:", error);
      return { base64: '' };
    }
};

export const createChat = (language, allProducts) => {
    const productList = allProducts.map(p => `- ${p.name[language]} (ID: ${p.id}, Category ID: ${p.categoryId})`).join('\n');
    const categoryList = Array.from(new Set(allProducts.map(p => p.categoryId))).join(', ');

    const systemInstruction = `You are MadoMate, a friendly, cheerful, and helpful AI assistant for the Mado digital menu. Your primary goal is to help customers explore the menu.
Current Language: ${language}.

Available Categories: ${categoryList}
Available Products:
${productList}

RULES:
1.  **Action Commands**: When the user's intent is to navigate the menu, you MUST respond with ONLY an action command. Do not add any conversational text around it.
    -   **Search**: If the user wants to see a type of product (e.g., "show me ice creams", "do you have baklava?"), respond with: \`ACTION::SEARCH::[search term]\`. Example: \`ACTION::SEARCH::ice cream\`.
    -   **Category**: If the user asks for a specific category by name, respond with: \`ACTION::CATEGORY::[category_id]\`. You must use the exact ID from the list. Example: \`ACTION::CATEGORY::dovme-dondurmalar\`.
    -   **Product Details**: If the user asks for details about a specific product by name (e.g., "tell me about Spesiyal Kesme Dondurma"), respond with: \`ACTION::PRODUCT::[product_id]\`. Find the correct ID from the list. Example: \`ACTION::PRODUCT::MADO-001\`.
2.  **Recommendations**: If the user asks for a recommendation based on a craving (e.g., "I want something with chocolate", "what's good for a hot day?"), identify keywords and suggest 1 to 3 relevant product names from the list. DO NOT use action commands for recommendations. Just list the names in a friendly, conversational manner.
3.  **General Conversation**: For greetings, questions about you, or anything not related to the menu, respond naturally and conversationally. Keep responses concise and engaging.`;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    return chat;
};
