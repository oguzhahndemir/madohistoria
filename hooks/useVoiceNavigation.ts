

import { useState, useCallback, useEffect, useRef } from 'react';

// Access browser-specific speech recognition APIs
// FIX: Cast `window` to `any` to access non-standard SpeechRecognition APIs.
const SpeechRecognitionApi =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useVoiceRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!SpeechRecognitionApi) {
            console.warn("Speech Recognition API is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognitionApi();
        recognition.continuous = false;
        recognition.lang = 'tr-TR';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const currentTranscript = event.results[0][0].transcript;
            setTranscript(currentTranscript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setTranscript('');
            } catch (error) {
                console.error("Could not start speech recognition:", error);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    return { isListening, transcript, startListening, stopListening, hasRecognitionSupport: !!SpeechRecognitionApi };
};