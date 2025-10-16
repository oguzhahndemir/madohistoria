
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './contexts/AppContext';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // FIX: Corrected property access for service worker registration.
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      AppProvider,
      null,
      React.createElement(App, null)
    )
  )
);