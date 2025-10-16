import React from 'react';

const RobotIcon = (props) => (
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
    React.createElement('rect', { x: '4', y: '12', width: '16', height: '10', rx: '2' }),
    React.createElement('path', { d: 'M17.5 12V8A5.5 5.5 0 0 0 12 2.5h0A5.5 5.5 0 0 0 6.5 8v4' }),
    React.createElement('path', { d: 'M8 18h.01' }),
    React.createElement('path', { d: 'M16 18h.01' }),
    React.createElement('path', { d: 'M12 12a2 2 0 1 0 4 0v-2' })
  )
);

export default RobotIcon;