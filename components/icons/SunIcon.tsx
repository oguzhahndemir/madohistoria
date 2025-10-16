import React from 'react';

const SunIcon = (props) => (
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
    React.createElement('circle', { cx: "12", cy: "12", r: "5" }),
    React.createElement('line', { x1: "12", y1: "1", x2: "12", y2: "3" }),
    React.createElement('line', { x1: "12", y1: "21", x2: "12", y2: "23" }),
    React.createElement('line', { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
    React.createElement('line', { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
    React.createElement('line', { x1: "1", y1: "12", x2: "3", y2: "12" }),
    React.createElement('line', { x1: "21", y1: "12", x2: "23", y2: "12" }),
    React.createElement('line', { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
    React.createElement('line', { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
  )
);

export default SunIcon;
