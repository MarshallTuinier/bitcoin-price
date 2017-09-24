import React from 'react';
import { LinePath } from '@vx/shape';

const MaxPrice = ({ data, label, yText, yScale, xScale, x, y }) => {
  return (
    <g>
      <LinePath
        data={data}
        yScale={yScale}
        xScale={xScale}
        x={x}
        y={y}
        strokeDasharray="4,4"
        strokeOpacity="0.4"
      />
      <text fill="#6086D6" dy="1.3em" dx="1em" y={yText} fontSize="12">
        {label}
      </text>
    </g>
  );
};

export default MaxPrice;
