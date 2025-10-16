import React, { useState, useMemo } from 'react';
import CloseIcon from './icons/CloseIcon';
import { translations } from '../translations';

const tagGroups = {
  'Öne Çıkanlar': ['featured', 'best-seller', 'signature', 'mado-special', 'exclusive', 'popular', 'trendy', 'special-offer'],
  'Diyet & Sağlık': ['vegan', 'healthy-choice', 'diabetic', 'sugar-free', 'light', 'all-natural', 'pure', 'fit', 'low-carb', 'healthy', 'wellness', 'superfood'],
  'Lezzet Profili': ['spicy', 'sweet-spice', 'rich-flavor', 'intense-flavor', 'smoky-flavor', 'fruity', 'berry-blast', 'zesty', 'aromatic', 'floral', 'exotic', 'bold-flavor', 'coffee-lovers', 'chocoholic', 'sweet-creamy'],
  'Deneyim & Sunum': ['sharable', 'fun', 'interactive', 'instagrammable', 'elegant', 'artistic', 'gourmet', 'celebration', 'regional-specialty', 'unique-presentation', 'manti-style', 'tasting-plate'],
  'Klasikler': ['classic', 'traditional', 'authentic', 'timeless-classic', 'homemade-style', 'classic-turkish', 'ottoman-classic', 'regional-delicacy'],
};

const tagDisplayNames = {
    'featured': 'Öne Çıkan', 'best-seller': 'Çok Satan', 'signature': 'İmza Lezzeti', 'mado-special': 'Mado Özel', 'exclusive': 'Sadece Mado\'da', 'popular': 'Popüler',
    'vegan': 'Vegan', 'healthy-choice': 'Sağlıklı Seçim', 'diabetic': 'Diyabetik', 'sugar-free': 'Şekersiz', 'light': 'Hafif', 'fit': 'Fit', 'healthy': 'Sağlıklı',
    'spicy': 'Acılı', 'fruity': 'Meyveli', 'aromatic': 'Aromatik', 'classic': 'Klasik', 'traditional': 'Geleneksel', 'sharable': 'Paylaşımlık', 'fun': 'Eğlenceli', 'gourmet': 'Gurme',
    'hot-and-cold': 'Sıcak & Soğuk', 'comfort-food': 'Huzur Veren', 'authentic': 'Otantik'
};


const FilterModal = ({ isOpen, onClose, allTags, activeTags, setActiveTags, language }) => {
    const [localActiveTags, setLocalActiveTags] = useState(new Set(activeTags));

    if (!isOpen) return null;

    const handleTagClick = (tag) => {
        const newTags = new Set(localActiveTags);
        if (newTags.has(tag)) {
            newTags.delete(tag);
        } else {
            newTags.add(tag);
        }
        setLocalActiveTags(newTags);
    };

    const handleApply = () => {
        setActiveTags(localActiveTags);
        onClose();
    };

    const handleClear = () => {
        setLocalActiveTags(new Set());
    };

    const renderedGroups = useMemo(() => {
        const availableTags = new Set(allTags);
        return Object.entries(tagGroups).map(([groupTitle, groupTags]) => {
            const tagsInGroup = groupTags.filter(tag => availableTags.has(tag));
            if (tagsInGroup.length === 0) return null;

            return React.createElement('div', { key: groupTitle, className: 'filter-group' },
                React.createElement('h3', { className: 'filter-group-title' }, groupTitle),
                React.createElement('div', { className: 'filter-tags-container' },
                    ...tagsInGroup.map(tag =>
                        React.createElement('button', {
                            key: tag,
                            className: `filter-tag ${localActiveTags.has(tag) ? 'active' : ''}`,
                            onClick: () => handleTagClick(tag)
                        }, tagDisplayNames[tag] || tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
                    )
                )
            );
        }).filter(Boolean);
    }, [allTags, localActiveTags]);

    // FIX: Add type assertion for props with 'className'.
    return React.createElement('div', { className: 'filter-modal-overlay', onClick: onClose } as React.HTMLAttributes<HTMLDivElement>,
        React.createElement('div', { className: 'filter-modal-content', onClick: e => e.stopPropagation() } as React.HTMLAttributes<HTMLDivElement>,
            React.createElement('div', { className: 'filter-modal-header' },
                React.createElement('h2', null, translations.filterProducts[language]),
                React.createElement('button', { onClick: onClose, className: 'cart-close-btn' }, React.createElement(CloseIcon, null))
            ),
            renderedGroups,
            React.createElement('div', { className: 'filter-modal-footer' },
                React.createElement('button', { className: 'filter-modal-btn filter-clear-btn', onClick: handleClear }, translations.clearFilters[language]),
                React.createElement('button', { className: 'filter-modal-btn filter-apply-btn', onClick: handleApply }, translations.apply[language])
            )
        )
    );
};

export default FilterModal;