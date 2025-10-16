import React from 'react';

const AccessibilityIcon = (props) => (
  React.createElement('svg',
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props
    },
    React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
    React.createElement('path', { d: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" }),
    React.createElement('path', { d: "M12 1v2" }),
    React.createElement('path', { d: "M12 21v2" }),
    React.createElement('path', { d: "m4.2 4.2 1.4 1.4" }),
    React.createElement('path', { d: "m18.4 18.4 1.4 1.4" }),
    React.createElement('path', { d: "M1 12h2" }),
    React.createElement('path', { d: "M21 12h2" }),
    React.createElement('path', { d: "m4.2 19.8 1.4-1.4" }),
    React.createElement('path', { d: "m18.4 5.6-1.4 1.4" })
  )
);

export default AccessibilityIcon;
