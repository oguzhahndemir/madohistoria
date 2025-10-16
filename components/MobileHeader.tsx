import React from 'react';
import MenuIcon from './icons/MenuIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

const MobileHeader = ({ onMenuClick, onCartClick, cartItemCount }) => {
    return React.createElement('header', { className: 'mobile-header' },
        React.createElement('button', { onClick: onMenuClick, className: 'mobile-menu-btn', 'aria-label': 'Open menu' },
            React.createElement(MenuIcon, null)
        ),
        React.createElement('img', { src: "https://madohistoria.bisce.com.tr/mado-mavi.png", alt: "MADO Logo", className: 'mobile-logo' }),
        React.createElement('button', { className: 'cart-button', onClick: onCartClick, 'aria-label': 'Open Cart' },
          React.createElement(ShoppingCartIcon, null),
          cartItemCount > 0 && React.createElement('span', { className: 'cart-item-count' }, cartItemCount)
        )
    );
};

export default MobileHeader;