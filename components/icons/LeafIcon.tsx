import React from 'react';

const LeafIcon = (props) => (
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
    React.createElement('path', { d: "M20.4 10.3c.5-2.4-2.2-4-4.6-4.1-2.3-.2-4.1 2-4.6 4.4" }),
    React.createElement('path', { d: "M10.7 15.3c-2.3.2-4.6-1.5-4.6-4.1 0-2.3 1.6-4.4 3.9-4.5" }),
    React.createElement('path', { d: "M14.1 6.3c-2.3.2-4.3 1.9-4.5 4.4" }),
    React.createElement('path', { d: "M11.9 14.2c-2.3.2-4.3 2-4.5 4.4" }),
    React.createElement('path', { d: "M18 11.2c-2.3.2-4.3 2-4.5 4.4" }),
    React.createElement('path', { d: "M14.8 17.8c-2.3.2-4.3 2-4.5 4.4" }),
    React.createElement('path', { d: "M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8" }),
    React.createElement('path', { d: "M4 12a8 8 0 0 0 8 8" })
  )
);

export default LeafIcon;
