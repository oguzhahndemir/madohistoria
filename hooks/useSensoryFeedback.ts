import { useCallback } from 'react';

export const useSensoryFeedback = () => {
    const triggerInteraction = useCallback((type = 'light') => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            const intensityMap = {
                light: 5,
                medium: 20,
                heavy: 50
            };
            const vibrationDuration = intensityMap[type];
            if (vibrationDuration) {
                window.navigator.vibrate(vibrationDuration);
            }
        }
    }, []);

    return { triggerInteraction };
};
