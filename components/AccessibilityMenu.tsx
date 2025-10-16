import React from 'react';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import SettingsIcon from './icons/SettingsIcon';
import CloseIcon from './icons/CloseIcon';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import VolumeUpIcon from './icons/VolumeUpIcon';
import { useSoundEffects } from '../hooks/useSoundEffects';
import TypeIcon from './icons/TypeIcon';
import ContrastIcon from './icons/ContrastIcon';
import ZapOffIcon from './icons/ZapOffIcon';

const AccessibilityMenu = (props) => {
    const { 
        isOpen, onToggle, 
        darkMode, setDarkMode, 
        isTtsEnabled, toggleTts,
        fontSize, setFontSize,
        highContrast, setHighContrast,
        reduceMotion, setReduceMotion
    } = props;
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();
    
    const handleButtonClick = (action) => {
        triggerInteraction();
        playInteractionSound();
        action();
    }
    
    const cycleFontSize = () => {
        if (fontSize === 'normal') setFontSize('large');
        else if (fontSize === 'large') setFontSize('small');
        else setFontSize('normal');
    }

    return React.createElement('div', { className: `accessibility-drawer ${isOpen ? 'open' : ''}` },
        React.createElement('button', {
            className: 'accessibility-toggle-btn',
            onClick: () => handleButtonClick(onToggle),
            'aria-label': 'Accessibility Settings'
        }, isOpen ? React.createElement(CloseIcon, null) : React.createElement(SettingsIcon, null)),
        React.createElement('div', { className: 'accessibility-panel' },
            React.createElement('button', {
                className: `accessibility-btn ${darkMode ? 'active' : ''}`,
                onClick: () => handleButtonClick(() => setDarkMode(!darkMode)),
                'aria-label': darkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
                title: darkMode ? "Light Mode" : "Dark Mode"
            }, darkMode ? React.createElement(SunIcon, null) : React.createElement(MoonIcon, null)),
            React.createElement('button', {
                className: `accessibility-btn ${isTtsEnabled ? 'active' : ''}`,
                onClick: () => handleButtonClick(toggleTts),
                'aria-label': isTtsEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech",
                title: "Text-to-Speech"
            }, React.createElement(VolumeUpIcon, null)),
            React.createElement('button', {
                className: 'accessibility-btn',
                onClick: () => handleButtonClick(cycleFontSize),
                'aria-label': 'Cycle Font Size',
                title: 'Change Font Size'
            }, React.createElement(TypeIcon, { fontSizeState: fontSize })),
            React.createElement('button', {
                className: `accessibility-btn ${highContrast ? 'active' : ''}`,
                onClick: () => handleButtonClick(() => setHighContrast(!highContrast)),
                'aria-label': 'Toggle High Contrast',
                title: 'High Contrast Mode'
            }, React.createElement(ContrastIcon, null)),
            React.createElement('button', {
                className: `accessibility-btn ${reduceMotion ? 'active' : ''}`,
                onClick: () => handleButtonClick(() => setReduceMotion(!reduceMotion)),
                'aria-label': 'Toggle Animations',
                title: 'Reduce Animations'
            }, React.createElement(ZapOffIcon, null))
        )
    );
};

export default AccessibilityMenu;