import React from 'react';
import { translations } from '../translations';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';
import HomeIcon from './icons/HomeIcon';

const flags = {
    tr: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/tr.svg',
    en: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg',
    ar: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/sa.svg',
    ru: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/ru.svg',
};
const availableLangs = ['tr', 'en', 'ar', 'ru'];

const SideNav = ({ 
    menuCategories, 
    selectedCategory, 
    onCategorySelect, 
    openMainCategory,
    setOpenMainCategory,
    language, 
    setLanguage,
    isCollapsed, 
    onToggleCollapse, 
    isMobile, 
    isOpenOnMobile, 
    onOpenFeedback, 
    darkMode 
}) => {
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();

    const handleMainCategoryClick = (id) => {
        triggerInteraction('light');
        playInteractionSound();
        setOpenMainCategory(prev => (prev === id ? null : id));
        onCategorySelect(id);
    };
    
    const handleSubCategoryClick = (id) => {
        triggerInteraction('medium');
        playInteractionSound();
        onCategorySelect(id);
    };

    const handleLangChange = (lang) => {
        triggerInteraction('light');
        playInteractionSound();
        setLanguage(lang);
    }

    const feedbackItem = React.createElement('li', {
            className: 'side-nav-feedback-btn',
            onClick: onOpenFeedback,
            key: 'feedback'
        },
        React.createElement(MessageSquareIcon, { className: 'side-nav-icon' }),
        React.createElement('span', { className: 'item-text' }, translations.feedbackTitle[language])
    );

    const homeMenuItem = React.createElement('li', { key: 'home-menu' },
        React.createElement('div', {
                className: `side-nav-main-item`,
                onClick: () => onCategorySelect('all')
            },
            React.createElement('div', { className: 'item-content' },
                React.createElement(HomeIcon, { className: 'side-nav-icon' }),
                React.createElement('span', null, translations.anaMenu[language])
            )
        )
    );

    return React.createElement('nav', { className: `side-nav ${isCollapsed ? 'collapsed' : ''} ${isMobile && isOpenOnMobile ? 'open' : ''}` },
        React.createElement('div', { className: 'side-nav-header' },
            React.createElement('div', { className: 'lang-switcher'},
                ...availableLangs.map(lang => 
                    React.createElement('button', {
                        key: lang,
                        className: `lang-switcher-btn ${language === lang ? 'active' : ''}`,
                        onClick: () => handleLangChange(lang)
                    }, React.createElement('img', { src: flags[lang], alt: `${lang} flag`}))
                )
            ),
            React.createElement('div', { className: 'side-nav-logo-container', onClick: () => onCategorySelect('all') },
              React.createElement('img', { 
                  src: darkMode ? "https://madohistoria.bisce.com.tr/mado-beyaz.png" : "https://madohistoria.bisce.com.tr/mado-mavi.png", 
                  alt: "MADO", 
                  className: 'side-nav-logo' 
              })
            )
        ),
        React.createElement('ul', { className: 'side-nav-list' },
            homeMenuItem,
            ...menuCategories.map(mainCat => 
                React.createElement('li', { key: mainCat.id },
                    React.createElement('div', {
                            className: `side-nav-main-item ${openMainCategory === mainCat.id ? 'open' : ''}`,
                            onClick: () => handleMainCategoryClick(mainCat.id)
                        },
                        React.createElement('div', { className: 'item-content' },
                            React.createElement('span', { className: 'side-nav-icon' }, mainCat.icon),
                            React.createElement('span', null, mainCat.name[language])
                        ),
                        mainCat.subcategories && mainCat.subcategories.length > 0 &&
                            React.createElement(ChevronRightIcon, { className: 'sub-list-toggle-icon' })
                    ),
                    mainCat.subcategories && mainCat.subcategories.length > 0 &&
                        React.createElement('ul', { className: `side-nav-sub-list ${openMainCategory === mainCat.id ? 'open' : ''}`},
                            ...mainCat.subcategories.map(subCat => 
                                React.createElement('li', {
                                        key: subCat.id,
                                        className: `side-nav-sub-item ${selectedCategory === subCat.id ? 'active' : ''}`,
                                        onClick: (e) => { e.stopPropagation(); handleSubCategoryClick(subCat.id); }
                                    },
                                    subCat.name[language]
                                )
                            )
                        )
                )
            )
        ),
        React.createElement('div', { className: 'side-nav-footer' },
            React.createElement('ul', { className: 'side-nav-list', style: { padding: 0 } }, feedbackItem),
            !isMobile && React.createElement('button', {
                className: 'collapse-btn',
                onClick: onToggleCollapse,
                'aria-label': isCollapsed ? "Expand Menu" : "Collapse Menu"
            }, isCollapsed ? React.createElement(ChevronRightIcon, null) : React.createElement(ChevronLeftIcon, null))
        )
    );
};

export default SideNav;