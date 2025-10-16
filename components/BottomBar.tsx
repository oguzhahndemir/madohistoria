import React from 'react';
import { translations } from '../translations';
import SearchIcon from './icons/SearchIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import FilterIcon from './icons/FilterIcon';

const BottomBar = ({ searchTerm, onSearchChange, onFilterClick, onVoiceSearchClick, isListening }) => {
    
    return React.createElement('div', { className: 'bottom-bar' },
        React.createElement('div', { className: 'bottom-search-bar' },
            React.createElement(SearchIcon, { style: { color: 'var(--color-text-muted)', flexShrink: 0 } }),
            React.createElement('input', {
                type: 'text',
                className: 'bottom-search-input',
                placeholder: translations.searchPlaceholder['tr'],
                value: searchTerm,
                onChange: e => onSearchChange(e.target.value)
            }),
            React.createElement('button', {
              className: `bottom-bar-btn ${isListening ? 'listening' : ''}`,
              onClick: onVoiceSearchClick,
              'aria-label': translations.voiceSearch['tr']
            }, React.createElement(MicrophoneIcon, null))
        ),
        React.createElement('button', {
            className: 'bottom-bar-btn',
            onClick: onFilterClick,
            'aria-label': translations.filter['tr']
        }, React.createElement(FilterIcon, null))
    );
};

export default BottomBar;
