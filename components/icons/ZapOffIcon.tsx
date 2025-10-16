import React from 'react';

const ZapOffIcon = (props) => (
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
    React.createElement('polyline', { points: "12.41 6.75 13 2 10.57 4.92" }),
    React.createElement('polyline', { points: "18.57 12.91 21 10 15.66 10" }),
    React.createElement('polyline', { points: "8 8 3 14 12 14 11 22 16 16" }),
    React.createElement('line', { x1: "1", y1: "1", x2: "23", y2: "23" })
  )
);

export default ZapOffIcon;