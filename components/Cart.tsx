import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { translations } from '../translations';
import CloseIcon from './icons/CloseIcon';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Cart = ({ isOpen, onClose }) => {
    const { cart: items, removeFromCart, updateQuantity, cartTotal: total, language } = useAppContext();
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();

    if (!isOpen) return null;

    const handleClose = () => {
        triggerInteraction('light');
        playInteractionSound();
        onClose();
    };

    const handleRemove = (id) => {
        triggerInteraction('medium');
        playInteractionSound();
        removeFromCart(id);
    };
    
    const handleCheckout = () => {
        triggerInteraction('heavy');
        playInteractionSound();
        // Add checkout logic here
    };

    return React.createElement('div', { className: 'cart-overlay', onClick: handleClose },
        // FIX: Add type assertion for props with 'className' to resolve overload error.
        React.createElement('div', { className: 'cart-panel', onClick: e => e.stopPropagation() } as React.HTMLAttributes<HTMLDivElement>,
            React.createElement('div', { className: 'cart-header' },
                React.createElement('h2', null, translations.myCart[language]),
                React.createElement('button', { onClick: handleClose, className: 'cart-close-btn' }, React.createElement(CloseIcon, null))
            ),
            React.createElement('div', { className: 'cart-body' },
                items.length === 0 ?
                    React.createElement('p', { className: 'cart-empty-message' }, translations.cartEmpty[language]) :
                    // FIX: Spread the array returned by .map() to pass children correctly to React.createElement.
                    React.createElement('ul', { className: 'cart-item-list' } as React.HTMLAttributes<HTMLUListElement>,
                        ...items.map(item =>
                            // FIX: Add type assertion for props with 'className'.
                            React.createElement('li', { key: item.id, className: 'cart-item' } as React.LiHTMLAttributes<HTMLLIElement>,
                                // FIX: Cast props object to `React.ImgHTMLAttributes<HTMLImageElement>` to resolve incorrect type inference by TypeScript.
                                React.createElement('img', { src: item.image, alt: item.name[language], className: 'cart-item-image' } as React.ImgHTMLAttributes<HTMLImageElement>),
                                React.createElement('div', { className: 'cart-item-details' },
                                    React.createElement('p', { className: 'cart-item-name' }, item.name[language]),
                                    React.createElement('span', { className: 'cart-item-price' }, `${item.price.toFixed(2)} ₺`)
                                ),
                                React.createElement('div', { className: 'cart-item-actions' },
                                    // FIX: The value of an input should be a string. Converted item.quantity to string.
                                    React.createElement('input', {
                                        type: 'number',
                                        className: 'cart-item-quantity',
                                        value: item.quantity.toString(),
                                        onChange: (e) => updateQuantity(item.id, parseInt(e.target.value, 10)),
                                        min: '1'
                                    } as React.InputHTMLAttributes<HTMLInputElement>),
                                    React.createElement('button', { onClick: () => handleRemove(item.id), className: 'cart-item-remove' }, '×')
                                )
                            )
                        )
                    )
            ),
            items.length > 0 && React.createElement('div', { className: 'cart-footer' },
                React.createElement('div', { className: 'cart-total' },
                    React.createElement('span', null, translations.total[language]),
                    React.createElement('span', null, `${total.toFixed(2)} ₺`)
                ),
                React.createElement('button', { className: 'checkout-button', onClick: handleCheckout },
                    translations.checkout[language]
                )
            )
        )
    );
};

export default Cart;