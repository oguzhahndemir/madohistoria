
export const formatDate = (date, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

export const formatTime = (date, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};
