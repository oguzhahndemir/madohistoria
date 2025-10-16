import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import LockScreen from './components/LockScreen';
import MainMenu from './components/MainMenu';
import AntiCopy from './components/AntiCopy';
import { useAppContext } from './contexts/AppContext';

function App() {
  const [appState, setAppState] = useState('loading'); // loading, locked, main
  const [isExitingLock, setIsExitingLock] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const { setLanguage } = useAppContext();

  const handleUnlock = (selectedLang) => {
    setLanguage(selectedLang);
    setIsExitingLock(true);
    setTimeout(() => {
      setAppState('main');
    }, 800); // Must match animation duration
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    const timer = setTimeout(() => {
      if (appState === 'main') {
        setAppState('locked');
        setIsExitingLock(false); // Reset animation state when returning to lock screen
      }
    }, 300000); // 5 minutes
    
    setInactivityTimer(timer);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setAppState('locked');
    }, 2500); // Loader duration

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (appState === 'main') {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      events.forEach(event => {
        window.addEventListener(event, resetInactivityTimer);
      });
      resetInactivityTimer();

      return () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        events.forEach(event => {
          window.removeEventListener(event, resetInactivityTimer);
        });
      };
    }
  }, [appState]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(AntiCopy, null),
    React.createElement(
      'div',
      { className: `app-container ${appState === 'main' ? 'fade-in' : ''}` },
      appState === 'loading' && React.createElement(Loader, null),
      (appState === 'locked' || isExitingLock) && React.createElement(LockScreen, { onUnlock: handleUnlock, isExiting: isExitingLock }),
      appState === 'main' && React.createElement(MainMenu, null)
    )
  );
}

export default App;
