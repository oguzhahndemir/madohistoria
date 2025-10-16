import React from 'react';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';
import StarIcon from './icons/StarIcon';
import LeafIcon from './icons/LeafIcon';
import { translations } from '../translations';

const DietaryBadge = ({ tag }) => {
    let icon = null;
    let title = '';

    switch (tag) {
        case 'vegan':
            icon = React.createElement(LeafIcon, { style: { color: '#2E7D32' } });
            title = 'Vegan';
            break;
        case 'sugar-free':
            // A simple 'S' icon for sugar-free for now
            icon = React.createElement('span', { style: { fontWeight: 'bold', color: '#0277BD' } }, 'S');
            title = 'Şekersiz';
            break;
        // Add more cases for other tags like gluten-free etc.
        default:
            return null;
    }
    return React.createElement('div', { className: 'dietary-badge', title: title }, icon);
};

const ProductCard = ({ product, onSelect, language }) => {
  const { triggerInteraction } = useSensoryFeedback();
  const { playInteractionSound } = useSoundEffects();

  const handleSelect = () => {
    triggerInteraction();
    playInteractionSound();
    onSelect(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(React.createElement(StarIcon, {
            key: i,
            className: `star-icon ${i <= rating ? 'filled' : ''}`,
            width: 16,
            height: 16
        }));
    }
    return stars;
  };

  return React.createElement('div', { className: 'product-card', onClick: handleSelect },
    React.createElement('div', { className: 'product-image-wrapper' },
      React.createElement('img', {
        src: product.image,
        alt: product.name[language],
        className: 'product-image',
        loading: 'lazy'
      }),
      React.createElement('div', { className: 'dietary-badges' }, 
        product.dietaryTags.map(tag => React.createElement(DietaryBadge, { key: tag, tag: tag }))
      )
    ),
    React.createElement('div', { className: 'product-info' },
      React.createElement('h3', { className: 'product-name' }, product.name[language]),
      React.createElement('div', { className: 'product-rating' },
        ...renderStars(product.rating),
        React.createElement('span', { className: 'product-reviews-count' }, `(${product.reviews} ${translations.reviews[language]})`)
      ),
      React.createElement('p', { className: 'product-description' }, product.description[language]),
      React.createElement('div', { className: 'product-price' }, `${product.price.toFixed(2)} ₺`)
    )
  );
};

export default ProductCard;