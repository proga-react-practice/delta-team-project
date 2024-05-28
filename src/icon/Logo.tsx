import { FC } from 'react';

interface LogoProps {
  color: string;
  width?: string | number;
  height?: string | number;
}

const Logo: FC<LogoProps> = ({ color, width = 512, height = 512 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0,512) scale(0.1,-0.1)" fill={color} stroke="none">
        <path d="M2390 5098 c-6 -13 -68 -165 -138 -338 l-129 -315 118 -290 c65 -159 471 -1158 903 -2220 l785 -1930 436 -3 c413 -2 436 -1 431 15 -3 10 -471 1161 -1039 2558 l-1033 2540 -162 3 c-160 2 -162 2 -172 -20z"/>
        <path d="M1947 4010 c-58 -139 -1627 -4001 -1627 -4005 0 -3 738 -5 1640 -5 902 0 1640 3 1640 8 0 4 -26 71 -57 149 l-58 143 -1360 2 -1361 3 663 1630 c365 897 670 1650 679 1675 l16 45 -80 195 -81 195 -14 -35z"/>
      </g>
    </svg>
  );
};

export default Logo;