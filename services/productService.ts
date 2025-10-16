import { menuCategories } from '../data/menuData';
import { products as allProducts } from '../data/products';

let productCache = null;

export const getProducts = async () => {
    if (productCache) {
        return Promise.resolve(productCache);
    }
    // Directly use local data instead of fetching from a URL to prevent network errors
    productCache = allProducts;
    return Promise.resolve(productCache);
};

let categoryCache = null;

export const getCategories = () => {
    return new Promise((resolve) => {
        if (categoryCache) {
            resolve(categoryCache);
            return;
        }
        
        const flattenedCategories = [];
        
        menuCategories.menu_categories.forEach((menuCategory) => {
            if (menuCategory.subcategories && menuCategory.subcategories.length > 0) {
                menuCategory.subcategories.forEach(subCategory => {
                    flattenedCategories.push({
                        id: subCategory.id,
                        name: subCategory.name,
                        icon: menuCategory.icon || ' ',
                    });
                });
            } else {
                 flattenedCategories.push({
                    id: menuCategory.id,
                    name: menuCategory.name,
                    icon: menuCategory.icon || ' ',
                });
            }
        });
        
        categoryCache = flattenedCategories;
        resolve(flattenedCategories);
    });
};


export const getProductById = async (id) => {
    const products = await getProducts();
    return products.find(p => p.id === id);
};
