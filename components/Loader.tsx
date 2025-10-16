import React from 'react';

const Loader = () => {
  const style = `
    @keyframes animate-svg-stroke-loader {
      0% { stroke-dashoffset: 1338; stroke-dasharray: 1338; }
      100% { stroke-dashoffset: 2676; stroke-dasharray: 1338; }
    }
    @keyframes animate-svg-fill-loader {
      0% { fill: transparent; }
      100% { fill: var(--mado-gold); }
    }
    .animated-logo-path-loader {
      fill: transparent;
      stroke: var(--mado-gold);
      stroke-miterlimit: 10;
      stroke-width: 1px;
      animation: 
        animate-svg-stroke-loader 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.2s both,
        animate-svg-fill-loader 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both;
    }
    .progress-bar-container {
      width: 250px; height: 8px; background-color: rgba(255, 255, 255, 0.1);
      border-radius: 9999px; overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%; width: 0%; background: var(--mado-gold);
      border-radius: 9999px; animation: fill-progress 2.3s ease-out forwards;
      animation-delay: 0.2s;
    }
    @keyframes fill-progress { from { width: 0%; } to { width: 100%; } }
  `;

  return React.createElement('div', {
    style: {
      position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '2rem',
      zIndex: 9999, background: 'radial-gradient(circle, var(--mado-blue) 0%, var(--mado-dark) 70%)'
    }
  },
    React.createElement('style', null, style),
    React.createElement('svg', { width: "254", height: "71", viewBox: "0 0 254 71" },
      React.createElement('path', {
        className: "animated-logo-path-loader",
        d: "M247.04,14.87C237.46,1.39,222.87.1,219.68.1c-24.91-1.08-34.46,24.55-34.46,24.55C178.29.07,157.69.88,155.52.95c-.21,0-22.1,0-22.1,0v58.35L107.03,2.17h-1.86l-29.3,60.66L63.29.96l-24.97,44.74L14.6.1.26,69.64h11.86l6.81-37.34,19.6,37.14,18.98-36.93,7.02,37.34,22.08-.21,7.22-18.16h23.11l7.22,18.36h28.32c5.13,0,10.23-1.01,14.88-3.18,13-6.07,16.52-17.39,17.87-18.9,9.28,24.97,33.63,23.13,33.63,23.13,15.57-.63,24.36-7.88,29.33-15.71,7.84-12.36,7.32-28.38-1.15-40.31ZM98.98,40.75l6.4-15.47,6.81,15.47h-13.2ZM151.08,58.52c-1.63,0-3.21-.17-4.75-.49V12.97c1.53-.32,3.12-.49,4.75-.49,12.71,0,23.02,10.31,23.02,23.02s-10.31,23.02-23.02,23.02ZM241.66,37.45c-.73,11.59-10.14,21-21.73,21.73-14.06.89-25.65-10.7-24.76-24.76.73-11.59,10.14-21,21.73-21.73,14.06-.89,25.65,10.7,24.76,24.76Z"
      })
    ),
    React.createElement('div', { className: 'progress-bar-container' },
      React.createElement('div', { className: 'progress-bar-fill' })
    )
  );
};

export default Loader;
