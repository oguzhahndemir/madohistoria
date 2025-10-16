import React, { useState, useEffect } from 'react';

const CategoryHeader = ({ categoryName, productsForCategory, language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const backgroundProducts = productsForCategory.slice(0, 3);

    useEffect(() => {
        if (backgroundProducts.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % backgroundProducts.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [backgroundProducts.length]);

    if (!productsForCategory || productsForCategory.length === 0) {
        return null;
    }

    return React.createElement('div', { className: 'category-header' },
        React.createElement('div', { className: 'category-header-image-container' },
            backgroundProducts.map((p, index) =>
                React.createElement('img', {
                    key: p.id + index,
                    src: p.image,
                    alt: p.name[language],
                    className: `category-header-image ${index === currentIndex ? 'active kenburns-variant-' + ((index % 3) + 1) : ''}`
                })
            )
        ),
        React.createElement('div', { className: 'category-header-overlay' }),
        React.createElement('h2', { className: 'category-header-title' }, categoryName)
    );
};

export default CategoryHeader;