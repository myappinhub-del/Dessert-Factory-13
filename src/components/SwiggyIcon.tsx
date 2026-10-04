import React from 'react';

interface SwiggyIconProps {
  className?: string;
  size?: number;
}

export const SwiggyIcon: React.FC<SwiggyIconProps> = ({ className = "", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Swiggy Orange Circle */}
      <circle cx="50" cy="50" r="50" fill="#FC8019" />
      {/* Stylized Swiggy 'S' / food pin marker */}
      <path
        d="M51 22 C37 22 28 31 28 42 C28 50 33 56 40 60 L40 68 C40 70 42 72 44 72 L46 72 C48 72 50 70 50 68 L50 62 C57 60 62 55 62 47 C62 38 55 35 46 33 C39 31 38 29 38 27 C38 24 42 22 47 22 C53 22 57 24 60 27 L66 22 C62 17 56 15 49 15 Z"
        fill="white"
        opacity="0.2"
      />
      <path
        d="M48 20 C36 20 28 29 28 39 C28 47 34 53 42 57 C51 61 54 64 54 69 C54 74 48 78 40 78 C33 78 27 74 24 69 L17 76 C23 83 32 87 41 87 C54 87 64 79 64 68 C64 59 58 53 49 49 C41 45 37 42 37 38 C37 33 42 29 48 29 C54 29 59 32 62 36 L69 29 C64 23 57 20 48 20 Z"
        fill="white"
      />
    </svg>
  );
};
