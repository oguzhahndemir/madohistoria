import React, { useState, useEffect } from 'react';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useWeather } from '../hooks/useWeather';
import { translations } from '../translations';
import { useSoundEffects } from '../hooks/useSoundEffects';

const flags = {
    tr: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/tr.svg',
    en: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg',
    ar: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/sa.svg',
    ru: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/ru.svg',
};

const getGreeting = (lang) => {
    const hour = new Date().getHours();
    let mainGreetingKey;

    if (hour >= 5 && hour < 12) {
        mainGreetingKey = 'goodMorning';
    } else if (hour >= 12 && hour < 18) {
        mainGreetingKey = 'goodAfternoon';
    } else {
        mainGreetingKey = 'goodEvening';
    }

    return {
        main: translations[mainGreetingKey][lang],
        sub: translations.welcomeToMado[lang],
    };
};

const LockScreen = ({ onUnlock, isExiting }) => {
    const [time, setTime] = useState(new Date());
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();
    const [displayLang] = useState('tr');
    const greeting = getGreeting(displayLang);
    const [ripples, setRipples] = useState([]);
    const { weather, error } = useWeather("Fatih, TR");

    const availableLangs = ['tr', 'en', 'ar', 'ru'];

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000 * 30); // Update time every 30s
        return () => clearInterval(timer);
    }, []);

    const handleUnlockAction = (lang) => {
        if (isExiting) return;
        triggerInteraction('heavy');
        playInteractionSound();
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen().catch(err => console.error(`Tam ekran moduna geçilemedi: ${err.message} (${err.name})`));
        // FIX: Cast element to `any` to access vendor-prefixed `webkitRequestFullscreen` property which is not in the default HTMLElement type.
        } else if ((element as any).webkitRequestFullscreen) { // Safari
            (element as any).webkitRequestFullscreen();
        }
        onUnlock(lang);
    };
    
    const handleScreenClick = (event) => {
        if (isExiting) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const newRipple = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            key: Date.now()
        };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.key !== newRipple.key));
        }, 600);
        handleUnlockAction('tr');
    };

    const weatherWidget = weather ?
        React.createElement('div', { className: 'weather-widget' },
            // FIX: Cast props object to React.HTMLAttributes<HTMLElement> to resolve incorrect type inference by TypeScript.
            React.createElement('i', { className: `weather-icon ${weather.icon}` } as React.HTMLAttributes<HTMLElement>),
            React.createElement('div', { className: 'weather-temp' }, `${weather.temp}°`),
            React.createElement('div', { className: 'weather-details' },
                React.createElement('span', { className: 'weather-city' }, 'İstanbul/Fatih'),
                React.createElement('span', { className: 'weather-desc' }, weather.description)
            )
        ) :
        React.createElement('div', { style: { height: '60px' } }, error && React.createElement('p', { style: { fontSize: '0.8rem', opacity: 0.7 } }, error));

    return React.createElement('div',
        {
            className: `lockscreen-tv-container ${isExiting ? 'exiting' : ''}`,
            onClick: handleScreenClick
        },
        React.createElement('iframe', {
            src: "https://player.vimeo.com/video/1126027136?background=1&autoplay=1&loop=1&autopause=0&muted=1",
            className: "lockscreen-video-bg",
            frameBorder: "0",
            allow: "autoplay; fullscreen",
            title: "background-video"
        }),
        React.createElement('div', { className: 'lockscreen-overlay' }),
        React.createElement('div', { className: 'lockscreen-grid' },
            // FIX: Spread the array returned by .map() to pass children correctly to React.createElement. This resolves the overload error on line 103 for this parent div.
            // FIX: Cast props of div to React.HTMLAttributes<HTMLDivElement> to fix overload error on line 104.
            React.createElement('div', { className: 'lockscreen-lang-area', onClick: e => e.stopPropagation() } as React.HTMLAttributes<HTMLDivElement>,
                ...availableLangs.map(lang =>
                    React.createElement('button', { key: lang, className: 'lang-button', onClick: () => handleUnlockAction(lang) },
                        // FIX: Cast props object to `React.ImgHTMLAttributes<HTMLImageElement>` to resolve incorrect type inference by TypeScript.
                        React.createElement('img', { src: flags[lang], alt: `${lang} flag`, className: 'lang-flag' } as React.ImgHTMLAttributes<HTMLImageElement>),
                        React.createElement('span', null, lang.toUpperCase())
                    )
                )
            ),
            React.createElement('img', { src: "https://madohistoria.bisce.com.tr/mado-beyaz.png", alt: "MADO Logo", className: 'lockscreen-logo' }),
            React.createElement('div', { className: 'lockscreen-greeting-area' },
                React.createElement('h1', { className: 'greeting-main' }, greeting.main),
                React.createElement('p', { className: 'greeting-sub' }, greeting.sub)
            ),
            weatherWidget,
            React.createElement('div', { className: 'lockscreen-time-area' },
                React.createElement('div', { className: 'lockscreen-time' }, time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })),
                React.createElement('div', { className: 'lockscreen-date' }, time.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' }))
            ),
            React.createElement('div', { className: 'qr-code-wrapper' },
                React.createElement('img', { src: "https://madohistoria.bisce.com.tr/QR-min.png", alt: "QR Code for Mobile Menu", className: "qr-code" }),
                React.createElement('p', { className: 'qr-code-label' }, translations.scanForMenu[displayLang])
            ),
            React.createElement('div', { className: 'unlock-prompt' },
                React.createElement('i', { className: 'fas fa-hand-pointer' }),
                React.createElement('span', null, translations.touchForMenu[displayLang])
            )
        ),
        ripples.map(ripple =>
            React.createElement('span', {
                key: ripple.key,
                className: "ripple",
                style: { top: `${ripple.y}px`, left: `${ripple.x}px` }
            })
        )
    );
};

export default LockScreen;