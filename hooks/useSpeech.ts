import { useState, useCallback, useEffect } from 'react';

export const useSpeech = (lang) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

    const speak = useCallback((text) => {
        if (synth && text) {
            // Cancel any previous speech to prevent overlap
            if (synth.speaking) {
                synth.cancel();
            }
            
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                // Map language codes to supported voice URI's if necessary
                utterance.lang = lang === 'ar' ? 'ar-SA' : lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'tr-TR';
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = (e) => {
                    console.error("Speech synthesis error", e);
                    setIsSpeaking(false);
                };
                synth.speak(utterance);
            }, 100); // A small delay can help prevent race conditions
        }
    }, [synth, lang]);

    const cancel = useCallback(() => {
        if (synth) {
            synth.cancel();
            setIsSpeaking(false);
        }
    }, [synth]);

    useEffect(() => {
        // Cleanup on component unmount to stop any ongoing speech
        return () => {
            if (synth) {
                synth.cancel();
            }
        };
    }, [synth]);

    return { speak, cancel, isSpeaking, hasSpeechSupport: !!synth };
};
