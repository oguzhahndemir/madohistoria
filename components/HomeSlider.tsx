import React, { useState, useEffect } from 'react';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { translations } from '../translations';
import LoadingSpinner from './LoadingSpinner';
import { useSoundEffects } from '../hooks/useSoundEffects';

const HomeSlider = ({ products, onProductSelect, language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();

    useEffect(() => {
        if (products.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % products.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [products]);

    const handleSelect = (product) => {
        triggerInteraction('medium');
        playInteractionSound();
        onProductSelect(product);
    };

    if (products.length === 0) {
        return React.createElement('div', { className: 'home-slider-loading' }, React.createElement(LoadingSpinner, null));
    }

    const currentProduct = products[currentIndex];

    return React.createElement('div', { className: 'home-slider', onClick: () => handleSelect(currentProduct) },
        React.createElement('div', { className: 'slider-image-container' },
            products.map((p, index) =>
                React.createElement('img', {
                    key: p.id,
                    src: p.image,
                    alt: p.name[language],
                    className: `slider-image ${index === currentIndex ? 'active kenburns-variant-' + ((index % 3) + 1) : ''}`
                })
            )
        ),
        React.createElement('div', { className: 'slider-content', key: currentProduct.id },
            React.createElement('span', { className: 'slider-badge' }, translations.featured[language]),
            React.createElement('div', { className: 'slider-title-mask'}, 
                React.createElement('h2', { className: 'slider-title' }, currentProduct.name[language])
            ),
            React.createElement('p', { className: 'slider-description' }, currentProduct.description[language]),
            React.createElement('button', { className: 'slider-cta' }, translations.discoverNow[language])
        ),
        React.createElement('div', { className: 'slider-dots' },
            products.map((_, index) =>
                React.createElement('span', {
                    key: index,
                    className: `dot ${index === currentIndex ? 'active' : ''}`,
                    onClick: (e) => {
                        e.stopPropagation();
                        playInteractionSound();
                        triggerInteraction('light');
                        setCurrentIndex(index);
                    }
                })
            )
        )
    );
};

export default HomeSlider;