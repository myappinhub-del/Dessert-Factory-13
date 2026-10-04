import React from 'react';

interface BrandLogoProps {
  size?: number | string;
  className?: string;
  withText?: boolean;
  onClick?: () => void;
  customLogoUrl?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 40, 
  className = "",
  withText = false,
  onClick,
  customLogoUrl,
}) => {
  return (
    <div 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? "Click to open Owner Portal" : undefined}
      className={`inline-flex items-center gap-2.5 ${onClick ? 'cursor-pointer hover:opacity-95 select-none' : ''} ${className}`}
    >
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="Dessert Factory @13 Logo"
          style={{ width: size, height: size }}
          className="rounded-full object-cover shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-200"
        />
      ) : (
        /* SVG rendering of the official DF@13 Dessert Factory red circular emblem */
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-200"
        >
        {/* Scarlet Red Circle */}
        <circle cx="100" cy="100" r="96" fill="#E31E24" />
        
        {/* Subtle inner ring highlight */}
        <circle cx="100" cy="100" r="94" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* DF@13 Custom Typographic Graphics */}
        <g fill="#FFFFFF">
          {/* 'D' */}
          <path
            d="M52 79 C52 74 56 71 63 71 C74 71 82 76 82 89 C82 101 73 113 59 113 C53 113 52 109 52 105 Z M60.5 80.5 L60.5 103 C64 103 72.5 98.5 72.5 89 C72.5 81.5 67 80.5 60.5 80.5 Z"
            fillRule="evenodd"
          />

          {/* 'F' */}
          <path
            d="M82.5 72 C82.5 69.5 85 68 89.5 68 L104 68 C106.5 68 108 69.5 108 71.5 C108 73.5 106.5 75 104 75 L91 75 L91 85.5 L101.5 85.5 C103.5 85.5 105 87 105 89 C105 91 103.5 92.5 101.5 92.5 L91 92.5 L91 110 C91 112.5 89.5 114 87 114 C84.5 114 82.5 112.5 82.5 110 Z"
          />

          {/* Cupcake / Soft-Serve Swirl Topper above '@' */}
          <g transform="translate(105, 50) scale(0.65)">
            {/* Swirl flame/cherry on top */}
            <path d="M18 4 C18 1 20 0 21 0 C22 2 21 5 19 6 Z" fill="#FFFFFF" />
            {/* Top Swirl */}
            <path d="M12 9 C15 6 23 6 25 9 C27 12 24 14 20 14 C15 14 10 12 12 9 Z" fill="#FFFFFF" />
            {/* Middle Swirl Tier */}
            <path d="M8 15 C13 13 27 13 31 16 C33 19 28 22 20 22 C11 22 6 18 8 15 Z" fill="#FFFFFF" />
            {/* Bottom Swirl Tier */}
            <path d="M5 23 C11 20 30 20 34 23 C36 26 31 29 20 29 C8 29 3 26 5 23 Z" fill="#FFFFFF" />
            {/* Cupcake Liner */}
            <path d="M8 30 L11 41 L28 41 L31 30 Z" fill="#FFFFFF" opacity="0.9" />
            {/* Liner ribs */}
            <path d="M14 31 L15 40 M20 31 L20 40 M25 31 L24 40" stroke="#E31E24" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* '@' Symbol Loop */}
          <path
            d="M110 93 C110 84 116 78 124 78 C132 78 138 84 138 92.5 C138 99 135 105 129 105 C125.5 105 123 103 122.5 100 C120 104 115.5 105.5 112 105.5 C107 105.5 104 102 104 97 C104 90 108 84 115 84 C118 84 121 85.5 122 88 L122.5 83 L129 83 L127 96 C126.5 98 128 99.5 130 99.5 C133 99.5 134.5 96 134.5 92 C134.5 86 130 81.5 124 81.5 C117.5 81.5 113.5 87 113.5 93.5 C113.5 100 117.5 104.5 123 104.5 C124.5 104.5 126 104 127 103 L128 106.5 C126.5 107.5 124.5 108 122.5 108 C115 108 110 102 110 93 Z M116.5 95 C116.5 98 118 99.5 120 99.5 C122.5 99.5 124.5 97 124.5 93 C124.5 90 123 88.5 121 88.5 C118.5 88.5 116.5 91 116.5 95 Z"
          />

          {/* '1' */}
          <path
            d="M136 78 L142 75 L144 75 L144 113 L136 113 Z"
          />

          {/* '3' */}
          <path
            d="M149 75 L166 75 C168.5 75 170 76.5 170 78.5 C170 82 165 87 159 90 C166 92.5 171 97 171 103 C171 110 164.5 114 156 114 C150 114 146 112 144 109.5 L148.5 104.5 C150.5 106.5 153 108 156.5 108 C160.5 108 163.5 105.5 163.5 102 C163.5 97.5 159 95.5 154 95.5 L151.5 95.5 L151.5 90 L156 90 C160 90 163 87.5 163 84 C163 81 160.5 79.5 157 79.5 L150 79.5 Z"
          />
        </g>

        {/* 'DESSERT FACTORY' Text in clean sans-serif */}
        <text
          x="100"
          y="138"
          fill="#FFFFFF"
          textAnchor="middle"
          fontSize="14.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.8"
        >
          DESSERT FACTORY
        </text>
      </svg>
      )}

      {withText && (
        <div className="flex flex-col">
          <span className="font-serif-title font-bold text-stone-900 leading-none text-base">
            Dessert Factory @13
          </span>
          <span className="text-[10px] text-amber-800 font-semibold tracking-wide uppercase mt-0.5">
            DF@13 · Vijayawada
          </span>
        </div>
      )}
    </div>
  );
};
