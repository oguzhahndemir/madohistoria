import React, { useState, useEffect, useRef } from 'react';
import { createChat } from '../services/geminiService';
import AssistantIcon from './icons/AssistantIcon';
import CloseIcon from './icons/CloseIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import { useVoiceRecognition } from '../hooks/useVoiceNavigation';
import { translations } from '../translations';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';

const MadoMateAssistant = ({ isOpen, onClose, language, allProducts, onSearch, onCategorySelect, onProductSelect }) => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();

    const { isListening, transcript, startListening, hasRecognitionSupport } = useVoiceRecognition();

    useEffect(() => {
        if (isOpen) {
            const newChat = createChat(language, allProducts);
            setChat(newChat);
            setMessages([{ role: 'model', text: translations.assistantWelcome[language] }]);
        }
    }, [isOpen, language, allProducts]);

    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = async () => {
        if (!inputValue.trim() || !chat || isLoading) return;
        triggerInteraction('light');
        playInteractionSound();

        const userMessage = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const responseText = response.text.trim();
            
            if (responseText.startsWith('ACTION::')) {
                const [, action, value] = responseText.split('::');
                switch (action) {
                    case 'SEARCH':
                        onSearch(value);
                        break;
                    case 'CATEGORY':
                        onCategorySelect(value);
                        break;
                    case 'PRODUCT':
                        onProductSelect(value);
                        break;
                    default:
                        console.warn('Unknown AI action:', action);
                }
                onClose(); // Close assistant after performing an action
            } else {
                const modelMessage = { role: 'model', text: responseText };
                setMessages(prev => [...prev, modelMessage]);
            }
        } catch (error) {
            console.error("MadoMate Error:", error);
            const errorMessage = { role: 'model', text: translations.assistantError[language] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return React.createElement('div', { className: 'madomate-container' },
        React.createElement('div', { className: 'madomate-overlay', onClick: onClose }),
        React.createElement('div', { className: 'madomate-chat-window' },
            React.createElement('header', { className: 'madomate-header' },
                React.createElement('h3', null, React.createElement(AssistantIcon, null), ' MadoMate'),
                React.createElement('button', { onClick: onClose, className: 'madomate-close-btn', 'aria-label': 'Close Assistant' }, React.createElement(CloseIcon, null))
            ),
            React.createElement('div', { className: 'madomate-messages' },
                messages.map((msg, index) =>
                    React.createElement('div', { key: index, className: `chat-message ${msg.role}` },
                        React.createElement('div', { className: 'avatar' },
                            msg.role === 'model' ? React.createElement(AssistantIcon, null) : React.createElement('i', { className: 'fas fa-user' })
                        ),
                        React.createElement('div', { className: 'bubble' }, msg.text)
                    )
                ),
                isLoading && React.createElement('div', { className: 'chat-message model loading' },
                    React.createElement('div', { className: 'avatar' }, React.createElement(AssistantIcon, null)),
                    React.createElement('div', { className: 'bubble typing-indicator' },
                        React.createElement('span', null),
                        React.createElement('span', null),
                        React.createElement('span', null)
                    )
                ),
                React.createElement('div', { ref: messagesEndRef })
            ),
            React.createElement('div', { className: 'madomate-input-area' },
                React.createElement('input', {
                    type: 'text',
                    className: 'madomate-input',
                    placeholder: translations.assistantPlaceholder[language],
                    value: inputValue,
                    onChange: (e) => setInputValue(e.target.value),
                    onKeyPress: (e) => e.key === 'Enter' && handleSendMessage(),
                    disabled: isLoading
                }),
                hasRecognitionSupport && React.createElement('button', {
                    className: `madomate-mic-btn ${isListening ? 'listening' : ''}`,
                    onClick: () => { triggerInteraction(); playInteractionSound(); startListening(); },
                    'aria-label': 'Use Voice',
                    disabled: isLoading
                }, React.createElement(MicrophoneIcon, null)),
                React.createElement('button', {
                    className: 'madomate-send-btn',
                    onClick: handleSendMessage,
                    'aria-label': 'Send Message',
                    disabled: isLoading || !inputValue.trim()
                }, React.createElement('i', { className: 'fas fa-paper-plane' }))
            )
        )
    );
};

export default MadoMateAssistant;
