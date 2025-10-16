import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useCart as useCartHook } from '../hooks/useCart';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const { items: cart, addToCart, removeFromCart, updateQuantity, clearCart, total: cartTotal } = useCartHook();
  const [language, setLanguage] = useState('tr');
  const [darkMode, setDarkMode] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const toggleTts = useCallback(() => setIsTtsEnabled(prev => !prev), []);
  
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('font-size-small', 'font-size-large');
    if (fontSize === 'large') html.classList.add('font-size-large');
    if (fontSize === 'small') html.classList.add('font-size-small');
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);
  
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
  }, [reduceMotion]);


  const value = { 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, 
      language, setLanguage, 
      darkMode, setDarkMode,
      isTtsEnabled, toggleTts,
      fontSize, setFontSize,
      highContrast, setHighContrast,
      reduceMotion, setReduceMotion
  };

  return React.createElement(AppContext.Provider, { value }, children);
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};