import { useEffect } from 'react';

const AntiCopy = () => {
  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
    
    const style = document.createElement('style');
    style.innerHTML = `body { -webkit-user-select: none; -ms-user-select: none; user-select: none; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default AntiCopy;
