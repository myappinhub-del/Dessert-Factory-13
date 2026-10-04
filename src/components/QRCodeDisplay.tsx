import React from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 180 }) => {
  // Use a reliable SVG matrix generator or canvas representation
  // We can render a clean crisp QR graphic with store branding in the center
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    value
  )}&color=2e1065&bgcolor=faf8f5&margin=1`;

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
      <img
        src={qrApiUrl}
        alt={`QR code for ${value}`}
        width={size}
        height={size}
        className="rounded-lg object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if offline
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div 
        style={{ display: 'none', width: size, height: size }} 
        className="flex-col items-center justify-center bg-amber-50 text-amber-900 rounded-lg p-3 text-center text-xs"
      >
        <span className="font-semibold mb-1">Dessert Factory @13</span>
        <span>Scan or visit:</span>
        <span className="text-[10px] break-all text-amber-700 mt-1">{value}</span>
      </div>
      <p className="mt-2 text-[11px] text-stone-500 font-medium">Scan with camera to view & share</p>
    </div>
  );
};
