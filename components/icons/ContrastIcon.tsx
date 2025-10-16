import React from 'react';

const ContrastIcon = (props) => (
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
    React.createElement('path', { d: "M12 18a6 6 0 0 0 0-12v12z" })
  )
);

export default ContrastIcon;