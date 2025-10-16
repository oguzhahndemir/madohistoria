import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
  };
  const sizeClass = sizeMap[size] || sizeMap['md'];

  return React.createElement('div', { className: `animate-spin rounded-full border-t-2 border-b-2 border-white ${sizeClass}` });
};

export default LoadingSpinner;
