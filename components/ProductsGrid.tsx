import React from 'react';
import ProductCard from './ProductCard';
import { translations } from '../translations';

const ProductsGrid = ({ products, onProductSelect, language, viewMode = 'grid' }) => {
    if (products.length === 0) {
        return React.createElement('div', { className: 'text-center py-20', role: 'status' },
            React.createElement('div', { className: 'text-6xl mb-4', role: 'img', 'aria-label': 'Arama ikonu' }, '🔍'),
            React.createElement('h3', { className: 'text-2xl font-semibold mb-2', style: { color: 'var(--mado-dark)' } }, 'Ürün bulunamadı'),
            React.createElement('p', { className: 'text-gray-400' }, 'Farklı bir kategori veya filtre seçin.')
        );
    }
    
    const viewClass = viewMode === 'list' ? 'list-view' : viewMode === 'compact-grid' ? 'compact-grid-view' : '';

    return React.createElement('div', { className: `products-grid ${viewClass}` },
        products.map(product =>
            React.createElement(ProductCard, {
                key: product.id,
                product: product,
                onSelect: onProductSelect,
                language: language
            })
        )
    );
};

export default ProductsGrid;