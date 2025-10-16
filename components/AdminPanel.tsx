import React from 'react';

const AdminPanel = () => {
    return React.createElement('div', { style: { padding: '2rem', color: '#333', background: '#fff', height: '100vh' } },
        React.createElement('h1', null, 'Admin Panel'),
        React.createElement('p', null, 'This is a placeholder for the admin panel. In a real application, you could manage products, categories, and view analytics here.')
    );
};

export default AdminPanel;
