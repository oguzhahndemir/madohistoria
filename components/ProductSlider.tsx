import React from 'react';
import ProductCard from './ProductCard';

const ProductSlider = ({ title, products, language, onProductSelect }) => {
    return React.createElement('div', { className: 'product-slider-container' },
        React.createElement('h2', { className: 'slider-section-title' }, title),
        React.createElement('div', { className: 'product-slider-scroll' },
            products.map(product =>
                React.createElement('div', { className: 'product-slider-item', key: product.id },
                    React.createElement(ProductCard, {
                        product: product,
                        onSelect: onProductSelect,
                        language: language
                    })
                )
            )
        )
    );
};

export default ProductSlider;
