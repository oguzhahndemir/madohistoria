

import { useCallback } from 'react';

// This hook centralizes the logic for playing UI sound effects.
// It uses the Web Audio API to generate a simple, clean "click" sound
// which is more performant and consistent than playing audio files.

export const useSoundEffects = () => {
    const playInteractionSound = useCallback(() => {
        try {
            // Check for AudioContext support
            // FIX: Cast `window` to `any` to access the vendor-prefixed `webkitAudioContext` property.
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const audioContext = new AudioContext();

            // Create an oscillator (for the sound wave) and a gain node (for volume)
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            // Connect the nodes: oscillator -> gain -> destination (speakers)
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Configure the sound
            oscillator.type = 'sine'; // A smooth, clean wave
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime); // A mid-high pitch
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Start at a low volume

            // Create a very short fade-out to make it sound like a "click"
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);

            // Play the sound now and stop it almost immediately
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);

        } catch (e) {
            // Log errors silently without disturbing the user
            console.error("Could not play interaction sound:", e);
        }
    }, []);

    return { playInteractionSound };
};