import React from 'react';

const CloseIcon = (props) => (
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
    React.createElement('line', { x1: "18", y1: "6", x2: "6", y2: "18" }),
    React.createElement('line', { x1: "6", y1: "6", x2: "18", y2: "18" })
  )
);

export default CloseIcon;
