import React from 'react';
import { X, MapPin, Navigation, Compass, ExternalLink, Share2, Car, Footprints, Bus } from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { createWhatsAppShareUrl, getAppShareUrl } from '../utils/shareUtils';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=Dessert+Factory+@13+MG+Rd+Labbipet+Vijayawada`;

  const handleShareDirections = () => {
    const text = `Directions to Dessert Factory @13:\n📍 ${PLACE_DETAILS.fullAddress}\nPlus Code: ${PLACE_DETAILS.plusCode}\nBeside Crocs & Balaji Towers, MG Rd.\nMap Link: ${mapsQueryUrl}`;
    window.open(createWhatsAppShareUrl(text, getAppShareUrl()), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbf9f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
              <Navigation className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 leading-tight">Directions & Location</h2>
              <p className="text-xs text-stone-500">MG Road, Labbipet, Vijayawada</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Visual Map Snapshot card */}
          <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner flex items-center justify-center">
            {/* Visual stylized map background */}
            <div className="absolute inset-0 bg-[#e5e3df] opacity-80" />
            
            {/* Stylized road grid lines */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-30">
              <div className="h-6 bg-white w-full transform -rotate-6" />
              <div className="h-8 bg-amber-200 w-full" />
              <div className="h-4 bg-white w-full transform rotate-3" />
            </div>
            
            {/* Center Pin Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="px-3 py-1 bg-stone-900 text-white rounded-full text-xs font-semibold shadow-lg mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Dessert Factory @13</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                <MapPin className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1 bg-white/90 px-2 py-0.5 rounded shadow-xs">
                Beside Crocs, MG Rd
              </span>
            </div>

            {/* Quick External Map link button */}
            <a
              href={mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold rounded-lg shadow-sm border border-stone-200 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>

          {/* Landmarks & Location Details */}
          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Key Landmarks</p>
                <p className="text-stone-600">
                  Located directly on MG Road, right beside <span className="font-medium text-stone-900">Crocs Store</span> and adjacent to <span className="font-medium text-stone-900">Balaji Towers</span> in Labbipet.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-center">
                <Car className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span className="block font-medium text-stone-900">Benz Circle</span>
                <span className="text-[10px] text-stone-500">~1.2 km (4 mins)</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-center">
                <Footprints className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span className="block font-medium text-stone-900">PVP Square</span>
                <span className="text-[10px] text-stone-500">~600 m (7 min walk)</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-center">
                <Bus className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span className="block font-medium text-stone-900">Railway Station</span>
                <span className="text-[10px] text-stone-500">~3.5 km (12 mins)</span>
              </div>
            </div>

            {/* Plus Code */}
            <div className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200/60 rounded-lg text-xs">
              <span className="text-stone-700 font-medium">Google Maps Plus Code:</span>
              <span className="font-mono font-bold text-amber-900">{PLACE_DETAILS.plusCode}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <a
              href={mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Navigation</span>
            </a>
            <button
              onClick={handleShareDirections}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm rounded-xl transition-colors cursor-pointer border border-stone-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
