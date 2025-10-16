import React from 'react';

const AssistantIcon = (props) => (
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
    React.createElement('path', { d: "M12 8V4H8" }),
    React.createElement('rect', { x: "4", y: "12", width: "16", height: "8", rx: "2" }),
    React.createElement('path', { d: "M4 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
    React.createElement('path', { d: "M14 12v-2" }),
    React.createElement('path', { d: "M8 12a2 2 0 1 0 4 0" }),
    React.createElement('path', { d: "M12 18h.01" })
  )
);

export default AssistantIcon;
