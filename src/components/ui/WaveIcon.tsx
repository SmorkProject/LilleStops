import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const WaveIcon: React.FC = () => (
  <Svg width={10} height={10} viewBox="0 0 200 200">
    <Path
      d="M0 100 Q25 50, 50 100 T100 100 Q125 50, 150 100 T200 100 L200 200 L0 200 Z"
      fill="#76c7f2"
      opacity={0.5}
    />
  </Svg>
);
