import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import CloseIcon from './icons/CloseIcon';
import VolumeUpIcon from './icons/VolumeUpIcon';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useAppContext } from '../contexts/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import StarIcon from './icons/StarIcon';
import LeafIcon from './icons/LeafIcon';
import ChevronUpIcon from './icons/ChevronUpIcon';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    // FIX: Add type assertion for props with 'className'.
    return React.createElement('div', { className: 'accordion-section' } as React.HTMLAttributes<HTMLDivElement>,
        // FIX: Add type assertion for props with 'className'.
        React.createElement('button', { className: 'accordion-header', onClick: onClick } as React.ButtonHTMLAttributes<HTMLButtonElement>,
            React.createElement('span', null, title),
            React.createElement(ChevronUpIcon, { style: { transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' } })
        ),
        // FIX: Add type assertion for props with 'className'.
        React.createElement('div', { className: `accordion-content ${isOpen ? 'open' : ''}` } as React.HTMLAttributes<HTMLDivElement>, children)
    );
};


const ProductDetail = ({ product, language, onClose }) => {
    const [openAccordion, setOpenAccordion] = useState('description');
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();
    const { isTtsEnabled } = useAppContext();
    const { speak } = useSpeech(language);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleClose = () => {
        triggerInteraction('light');
        playInteractionSound();
        onClose();
    };

    const handleAccordionClick = (id) => {
        setOpenAccordion(prev => (prev === id ? null : id));
    };

    const handleSpeak = () => {
        triggerInteraction('light');
        playInteractionSound();
        const textToSpeak = `${product.name[language]}. ${product.longDescription?.[language] || product.description[language]}`;
        speak(textToSpeak);
    }
    
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(React.createElement(StarIcon, {
                key: i,
                className: `star-icon ${i <= rating ? 'filled' : ''}`,
                width: 20,
                height: 20
            }));
        }
        return stars;
    };

    const DietaryBadge = ({ tag }) => {
        let icon = null;
        let title = '';
    
        switch (tag) {
            case 'vegan':
                icon = React.createElement(LeafIcon, null);
                title = 'Vegan';
                break;
            case 'sugar-free':
                icon = React.createElement('span', {style:{fontWeight:'bold'}}, 'S');
                title = 'Şekersiz';
                break;
             case 'featured':
                icon = React.createElement(StarIcon, {width: 14, height: 14});
                title = 'Öne Çıkan';
                break;
            default:
                return React.createElement('div', { className: 'popup-badge' } as React.HTMLAttributes<HTMLDivElement>, tag);
        }
        return React.createElement('div', { className: 'popup-badge', title: title } as React.HTMLAttributes<HTMLDivElement>, icon, React.createElement('span', null, title));
    };


    // FIX: Add type assertions for props with 'className'.
    return React.createElement('div', { className: 'popup-overlay', onClick: handleClose } as React.HTMLAttributes<HTMLDivElement>,
        React.createElement('div', { className: 'popup-content', onClick: e => e.stopPropagation() } as React.HTMLAttributes<HTMLDivElement>,
            React.createElement('div', { className: 'popup-body' } as React.HTMLAttributes<HTMLDivElement>,
                React.createElement('div', { className: 'popup-image-container' } as React.HTMLAttributes<HTMLDivElement>, 
                    React.createElement('img', { src: product.image, alt: product.name[language], className: 'popup-image' } as React.ImgHTMLAttributes<HTMLImageElement>),
                    React.createElement('button', { className: 'popup-close', onClick: handleClose, 'aria-label': 'Close' } as React.ButtonHTMLAttributes<HTMLButtonElement>,
                        React.createElement(CloseIcon, null)
                    )
                ),
                React.createElement('div', { className: 'popup-info-container' } as React.HTMLAttributes<HTMLDivElement>,
                    React.createElement('h2', { className: 'popup-title' } as React.HTMLAttributes<HTMLElement>, product.name[language]),
                    React.createElement('div', { className: 'popup-rating' } as React.HTMLAttributes<HTMLDivElement>,
                        ...renderStars(product.rating),
                        React.createElement('span', { className: 'product-reviews-count' }, `(${product.reviews} ${translations.reviews[language]})`)
                    ),
                    React.createElement('div', { className: 'popup-price' }, `${product.price.toFixed(2)} ₺`),
                    // FIX: Cast props object to React.HTMLAttributes<HTMLParagraphElement> to resolve incorrect type inference for 'className'.
                    React.createElement('p', { className: 'popup-short-desc' } as React.HTMLAttributes<HTMLParagraphElement>, product.description[language]),
                    React.createElement('div', { className: 'popup-badge-container' } as React.HTMLAttributes<HTMLDivElement>,
                        ...product.tags.map(tag => React.createElement(DietaryBadge, { key: tag, tag: tag })),
                        ...product.dietaryTags.map(tag => React.createElement(DietaryBadge, { key: tag, tag: tag }))
                    ),
                    
                    // FIX: Pass children as a prop to satisfy TypeScript's type checking for the component.
                    React.createElement(AccordionItem, { title: "Ürün Açıklaması", isOpen: openAccordion === 'description', onClick: () => handleAccordionClick('description'), children: 
                        React.createElement('p', null, product.longDescription?.[language] || product.description[language])
                    }),

                    // FIX: Pass children as a prop to satisfy TypeScript's type checking for the component.
                    React.createElement(AccordionItem, { title: translations.ingredients[language], isOpen: openAccordion === 'ingredients', onClick: () => handleAccordionClick('ingredients'), children: 
                        React.createElement('p', null, product.ingredients[language])
                    }),

                    // FIX: Pass children as a prop to satisfy TypeScript's type checking for the component.
                    React.createElement(AccordionItem, { title: translations.allergens[language], isOpen: openAccordion === 'allergens', onClick: () => handleAccordionClick('allergens'), children: 
                        React.createElement('p', null, product.allergens.join(', '))
                    }),
                    
                    // FIX: Pass children as a prop to satisfy TypeScript's type checking for the component.
                    React.createElement(AccordionItem, { title: "Ek Bilgiler", isOpen: openAccordion === 'extra', onClick: () => handleAccordionClick('extra'), children: 
                        React.createElement('ul', {className: 'popup-details-list'} as React.HTMLAttributes<HTMLUListElement>,
                           product.preparationTime && React.createElement('li', null, React.createElement('strong', null, translations.prepTime[language]), React.createElement('span', null, `${product.preparationTime} ${translations.minutes[language]}`)),
                           product.nutritionalInfo?.calories && React.createElement('li', null, React.createElement('strong', null, translations.calories[language]), React.createElement('span', null, `${product.nutritionalInfo.calories} kcal`)),
                           product.weatherPreference?.idealConditions && React.createElement('li', null, React.createElement('strong', null, translations.idealWeather[language]), React.createElement('span', null, product.weatherPreference.idealConditions.join(', '))),
                           product.seasonality?.seasons && React.createElement('li', null, React.createElement('strong', null, translations.bestIn[language]), React.createElement('span', null, product.seasonality.seasons.join(', '))),
                           product.specialEvents?.[0] && React.createElement('li', null, React.createElement('strong', null, translations.specialOccasion[language]), React.createElement('span', null, product.specialEvents[0].name[language]))
                        )
                    })

                )
            )
        )
    );
};

export default ProductDetail;
