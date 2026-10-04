import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Wifi, 
  Wind, 
  Users, 
  Heart,
  Share2,
  Edit3,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { PlaceDetails } from '../types';
import { createWhatsAppShareUrl, getAppShareUrl } from '../utils/shareUtils';
import { BrandLogo } from './BrandLogo';

interface AboutSectionProps {
  onOpenDirections: () => void;
  onOpenShare: () => void;
  placeDetails?: PlaceDetails;
  customLogoUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenDirections, 
  onOpenShare,
  placeDetails = PLACE_DETAILS,
  customLogoUrl,
}) => {
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  const amenities = [
    { icon: Wind, label: "Air-Conditioned Dining" },
    { icon: Wifi, label: "Free High-Speed Wi-Fi" },
    { icon: CreditCard, label: "Cards, UPI & GPay Accepted" },
    { icon: ShieldCheck, label: "Hygienic Kitchen & Staff" },
    { icon: Users, label: "Seating for Friends & Family" },
    { icon: Heart, label: "Pure Vegetarian Options" },
  ];

  return (
    <section id="about" className="space-y-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <BrandLogo size={48} customLogoUrl={customLogoUrl} />
          <div>
            <h2 className="font-serif-title text-2xl font-bold text-stone-900 tracking-tight">
              About {placeDetails.name}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Vijayawada's premier dessert destination on MG Road
            </p>
          </div>
        </div>

        {/* Key Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address & Landmark */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-stone-900 block">Address</span>
                <p className="text-xs text-stone-700 leading-relaxed mt-0.5">
                  {placeDetails.fullAddress}
                </p>
                <p className="text-[11px] text-amber-800 font-medium mt-1">
                  Landmarks: {placeDetails.landmark}
                </p>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <button
                onClick={onOpenDirections}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Get directions</span>
                <Navigation className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-mono text-stone-500">{placeDetails.plusCode}</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-stone-900 block">Operating Hours</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-emerald-700">Open Now</span>
                  <span className="text-xs text-stone-600">· {placeDetails.hoursToday}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">Monday – Sunday: 11:00 AM – 11:00 PM</p>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <span className="text-[11px] text-stone-500">Service: Dine-in & Takeaway</span>
              <a
                href={`tel:${placeDetails.phone.replace(/[^0-9]/g, '')}`}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{placeDetails.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Amenities & Atmosphere */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Amenities & Hygiene Highlights
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800"
                >
                  <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Place Management Utility Links (matching Google Place features) */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs text-stone-600">
          <button
            onClick={() => setSavedLabel(savedLabel ? null : 'Favorite Dessert Spot')}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedLabel ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{savedLabel ? `Label: ${savedLabel}` : 'Add a label'}</span>
          </button>

          <button
            onClick={() => setSuggestModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Suggest an edit</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-medium transition-colors cursor-pointer ml-auto"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share place info</span>
          </button>
        </div>
      </div>

      {/* Suggest an Edit Modal */}
      {suggestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-stone-200">
            <h3 className="font-semibold text-stone-900 text-sm">Suggest an Edit</h3>
            <p className="text-xs text-stone-600">
              Is something incorrect about Dessert Factory @13? Let us know:
            </p>
            <textarea
              rows={3}
              placeholder="e.g. Updated phone number, special timings, new landmark..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-hidden focus:border-amber-600"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("Thank you! Your edit suggestion has been noted.");
                  setSuggestModalOpen(false);
                }}
                className="flex-1 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                Submit Suggestion
              </button>
              <button
                onClick={() => setSuggestModalOpen(false)}
                className="py-2 px-3 bg-stone-100 text-stone-700 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
