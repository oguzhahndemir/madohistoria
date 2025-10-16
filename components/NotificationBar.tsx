import React from 'react';
import InfoIcon from './icons/InfoIcon';

const NotificationBar = ({ specialMessage, weatherMessage }) => {
    const message = specialMessage || weatherMessage;

    if (!message) {
        return null;
    }

    return React.createElement('div', {
        style: {
            background: 'var(--mado-blue)',
            color: 'white',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(0,35,97,0.2)'
        }
    },
        React.createElement('style', null, `
            .dark-mode .notification-bar {
                background: var(--mado-gold);
                color: var(--mado-dark);
                box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
            }
        `),
        React.createElement(InfoIcon, { style: { flexShrink: 0 } }),
        React.createElement('span', null, message)
    );
};

export default NotificationBar;
