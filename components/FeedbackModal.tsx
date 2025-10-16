import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { translations } from '../translations';
import LoadingSpinner from './LoadingSpinner';
import CheckCircleIcon from './icons/CheckCircleIcon';

const FeedbackModal = ({ onClose, language }) => {
    const [feedbackType, setFeedbackType] = useState('suggestion'); // suggestion, complaint, compliment
    const [topic, setTopic] = useState('');
    const [rating, setRating] = useState(0);
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { triggerInteraction } = useSensoryFeedback();
    const { playInteractionSound } = useSoundEffects();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!details.trim()) return;

        triggerInteraction('heavy');
        playInteractionSound();
        setIsSubmitting(true);

        console.log('Feedback Submitted:', { feedbackType, topic, rating, details });
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000); // Close modal after 3 seconds
        }, 1500);
    };

    const topics = {
        foodQuality: translations.foodQuality[language],
        serviceSpeed: translations.serviceSpeed[language],
        cleanliness: translations.cleanliness[language],
        staffAttitude: translations.staffAttitude[language],
        other: translations.other[language],
    };

    const renderForm = () => (
        React.createElement('form', { onSubmit: handleSubmit },
            React.createElement('div', { className: 'feedback-form-group' },
                React.createElement('label', null, translations.feedbackType[language]),
                React.createElement('div', { className: 'feedback-type-selector' },
                    React.createElement('button', { type: 'button', className: feedbackType === 'suggestion' ? 'active' : '', onClick: () => setFeedbackType('suggestion') }, translations.suggestion[language]),
                    React.createElement('button', { type: 'button', className: feedbackType === 'complaint' ? 'active' : '', onClick: () => setFeedbackType('complaint') }, translations.complaint[language]),
                    React.createElement('button', { type: 'button', className: feedbackType === 'compliment' ? 'active' : '', onClick: () => setFeedbackType('compliment') }, translations.compliment[language])
                )
            ),
            React.createElement('div', { className: 'feedback-form-group' },
                React.createElement('label', null, translations.feedbackTopic[language]),
                // FIX: Add type assertion for props with 'className' and 'value'.
                React.createElement('select', { value: topic, onChange: e => setTopic(e.target.value), className: 'sort-select', style: {width: '100%'} } as React.SelectHTMLAttributes<HTMLSelectElement>,
                    React.createElement('option', { value: '', disabled: true } as React.OptionHTMLAttributes<HTMLOptionElement>, 'Konu seçin...'),
                    ...Object.entries(topics).map(([key, value]) => React.createElement('option', { key: key, value: key } as React.OptionHTMLAttributes<HTMLOptionElement>, value))
                )
            ),
            React.createElement('div', { className: 'feedback-form-group' },
                React.createElement('label', null, translations.rating[language]),
                React.createElement('div', { className: 'star-rating' },
                    ...[5,4,3,2,1].map(starValue => 
                        // FIX: Replaced React.Fragment with a 'div' to resolve a complex type inference issue that was causing an overload error on the input element.
                        React.createElement('div', { key: starValue },
                            React.createElement('input', { type: 'radio', id: `star${starValue}`, name: 'rating', value: String(starValue), checked: rating === starValue, onChange: () => setRating(starValue) } as React.InputHTMLAttributes<HTMLInputElement>),
                            React.createElement('label', { htmlFor: `star${starValue}` } as React.LabelHTMLAttributes<HTMLLabelElement>, '★')
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'feedback-form-group' },
                React.createElement('label', { htmlFor: 'feedback-details' }, translations.yourFeedback[language]),
                React.createElement('textarea', {
                    id: 'feedback-details',
                    className: 'feedback-textarea',
                    placeholder: 'Lütfen görüşlerinizi buraya yazın...',
                    value: details,
                    onChange: (e) => setDetails(e.target.value),
                    required: true
                })
            ),
            React.createElement('button', {
                type: 'submit',
                className: 'feedback-submit-btn',
                disabled: isSubmitting || !details.trim()
            }, isSubmitting ? React.createElement(LoadingSpinner, { size: 'sm' }) : translations.submit[language])
        )
    );

    const renderSuccessMessage = () => (
        // FIX: Add type assertion for props with 'className'.
        React.createElement('div', { className: 'feedback-success-message' } as React.HTMLAttributes<HTMLDivElement>,
            React.createElement(CheckCircleIcon, null),
            React.createElement('h3', null, translations.submitSuccessTitle[language]),
            React.createElement('p', null, translations.submitSuccessMessage[language])
        )
    );

    // FIX: Add type assertion for props with 'className' to resolve overload error. The error message on child elements pointed here.
    return React.createElement('div', { className: 'feedback-modal-overlay', onClick: onClose } as React.HTMLAttributes<HTMLDivElement>,
        React.createElement('div', { className: 'feedback-modal-content', onClick: e => e.stopPropagation() } as React.HTMLAttributes<HTMLDivElement>,
            React.createElement('div', { className: 'feedback-modal-header' },
                React.createElement('h2', null, translations.feedbackTitle[language]),
                !isSuccess && React.createElement('button', { onClick: onClose, className: 'cart-close-btn' } as React.ButtonHTMLAttributes<HTMLButtonElement>, React.createElement(CloseIcon, null))
            ),
            isSuccess ? renderSuccessMessage() : renderForm()
        )
    );
};

export default FeedbackModal;