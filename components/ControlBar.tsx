import React from 'react';
import { translations } from '../translations';
import SearchIcon from './icons/SearchIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import GridIcon from './icons/GridIcon';
import CompactGridIcon from './icons/CompactGridIcon';
import ListIcon from './icons/ListIcon';
import FilterIcon from './icons/FilterIcon';
import { useVoiceRecognition } from '../hooks/useVoiceNavigation';
import ShoppingCartIcon from './icons/ShoppingCartIcon';


const ControlBar = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterClick,
  language,
  onCartClick,
  cartItemCount
}) => {
    const { isListening, transcript, startListening } = useVoiceRecognition();

    React.useEffect(() => {
      if (transcript) {
          onSearchChange(transcript);
      }
  }, [transcript, onSearchChange]);

  return React.createElement(
    'div',
    { className: 'control-bar' } as React.HTMLAttributes<HTMLDivElement>,
    React.createElement(
      'div',
      { className: 'search-bar-wrapper' } as React.HTMLAttributes<HTMLDivElement>,
      React.createElement(SearchIcon, { style: { color: 'var(--color-text-muted)', flexShrink: 0 } }),
      React.createElement('input', {
        type: 'text',
        placeholder: translations.searchPlaceholder[language],
        value: searchTerm,
        onChange: (e) => onSearchChange(e.target.value),
        className: 'search-input',
      } as React.InputHTMLAttributes<HTMLInputElement>),
       React.createElement('button', {
              className: `voice-search-btn ${isListening ? 'listening' : ''}`,
              onClick: startListening,
              'aria-label': translations.voiceSearch[language]
            } as React.ButtonHTMLAttributes<HTMLButtonElement>, React.createElement(MicrophoneIcon, null))
    ),
    React.createElement(
      'div',
      { className: 'control-bar-actions' } as React.HTMLAttributes<HTMLDivElement>,
      React.createElement(
        'select',
        {
          className: 'sort-select',
          value: sortOption,
          onChange: (e) => onSortChange(e.target.value),
          'aria-label': 'Sort products',
        } as React.SelectHTMLAttributes<HTMLSelectElement>,
        React.createElement('option', { value: 'featured' }, 'Öne Çıkan'),
        React.createElement('option', { value: 'price-asc' }, 'Fiyat: Artan'),
        React.createElement('option', { value: 'price-desc' }, 'Fiyat: Azalan'),
        React.createElement('option', { value: 'name-asc' }, 'İsim: A-Z'),
        React.createElement('option', { value: 'name-desc' }, 'İsim: Z-A')
      ),
      // FIX: Added type assertion to resolve 'className' does not exist in type 'Attributes' error.
      React.createElement(
        'div',
        { className: 'view-toggle' } as React.HTMLAttributes<HTMLDivElement>,
        React.createElement(
          'button',
          {
            className: `view-btn ${viewMode === 'grid' ? 'active' : ''}`,
            onClick: () => onViewModeChange('grid'),
            'aria-label': 'Grid View',
          } as React.ButtonHTMLAttributes<HTMLButtonElement>,
          React.createElement(GridIcon, { width: 20, height: 20 })
        ),
        React.createElement(
          'button',
          {
            className: `view-btn ${viewMode === 'compact-grid' ? 'active' : ''}`,
            onClick: () => onViewModeChange('compact-grid'),
            'aria-label': 'Compact Grid View',
          } as React.ButtonHTMLAttributes<HTMLButtonElement>,
          React.createElement(CompactGridIcon, { width: 20, height: 20 })
        ),
        React.createElement(
          'button',
          {
            className: `view-btn ${viewMode === 'list' ? 'active' : ''}`,
            onClick: () => onViewModeChange('list'),
            'aria-label': 'List View',
          } as React.ButtonHTMLAttributes<HTMLButtonElement>,
          React.createElement(ListIcon, { width: 20, height: 20 })
        )
      ),
       React.createElement('button', {
            className: 'filter-btn-mobile',
            onClick: onFilterClick,
            'aria-label': translations.filter[language]
        } as React.ButtonHTMLAttributes<HTMLButtonElement>, React.createElement(FilterIcon, null)),
       React.createElement('button', { className: 'cart-button cart-button-desktop', onClick: onCartClick, 'aria-label': 'Open Cart' } as React.ButtonHTMLAttributes<HTMLButtonElement>,
          React.createElement(ShoppingCartIcon, null),
          cartItemCount > 0 && React.createElement('span', { className: 'cart-item-count' }, cartItemCount)
        )
    )
  );
};

export default ControlBar;