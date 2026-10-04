import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Bookmark, 
  Compass, 
  Smartphone, 
  Share2, 
  ShoppingBag, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { PlaceDetails } from '../types';
import { IMAGES, resolveImagePath } from '../assets/images';
import { BrandLogo } from './BrandLogo';
import { SwiggyIcon } from './SwiggyIcon';

interface HeroOverviewProps {
  activeTab: 'overview' | 'menu' | 'reviews' | 'about' | 'photos';
  onTabChange: (tab: 'overview' | 'menu' | 'reviews' | 'about' | 'photos') => void;
  onOpenDirections: () => void;
  onOpenSendToPhone: () => void;
  onOpenShare: () => void;
  onOpenOrder: (type: 'takeaway' | 'dinein') => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onLogoClick?: () => void;
  customLogoUrl?: string;
  placeDetails?: PlaceDetails;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  activeTab,
  onTabChange,
  onOpenDirections,
  onOpenSendToPhone,
  onOpenShare,
  onOpenOrder,
  isSaved,
  onToggleSave,
  onLogoClick,
  customLogoUrl,
  placeDetails = PLACE_DETAILS,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Top Visual Showcase / Hero Banner */}
      <div className="relative h-64 md:h-84 w-full overflow-hidden bg-stone-900">
        <img
          src={resolveImagePath(placeDetails.heroImage || IMAGES.hero)}
          alt="Dessert Factory @13 artisanal desserts spread"
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = IMAGES.hero;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vijayawada's Viral Dessert Destination</span>
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold rounded-xl shadow-md transition-colors cursor-pointer backdrop-blur-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Share Spot</span>
          </button>
        </div>

        {/* Bottom Banner Title Lockup with Official DF@13 Logo */}
        <div className="absolute bottom-5 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
          <div className="flex items-center gap-4">
            <div 
              onClick={onLogoClick}
              title="Click logo to open Owner Portal"
              className="p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <BrandLogo size={68} customLogoUrl={customLogoUrl} />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300/90 font-semibold">
                Dessert Shop · Vijayawada
              </span>
              <h1 className="font-serif-title text-3xl md:text-4xl font-bold tracking-tight text-white mt-0.5">
                {placeDetails.name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-200">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <span>{placeDetails.rating}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-stone-400">·</span>
                <button 
                  onClick={() => onTabChange('reviews')}
                  className="hover:underline text-stone-200 cursor-pointer"
                >
                  ({placeDetails.reviewCount} reviews)
                </button>
                <span className="text-stone-400">·</span>
                <span className="text-stone-300">{placeDetails.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-lg text-xs font-semibold backdrop-blur-xs">
              {placeDetails.hoursToday}
            </span>
          </div>
        </div>
      </div>

      {/* Main Place Info & Quick Action Grid */}
      <div className="p-6 space-y-6">
        {/* Navigation Tabs (Overview, Menu, Reviews, About, Photos) */}
        <div className="flex items-center gap-1 border-b border-stone-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'menu', label: 'Menu & Highlights' },
            { id: 'reviews', label: 'Reviews (84)' },
            { id: 'photos', label: 'Photos & Vibe' },
            { id: 'about', label: 'About & Location' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as any)}
                className={`py-3 px-4 text-xs font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons Row matching prompt */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {/* Directions */}
          <button
            onClick={onOpenDirections}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Navigation className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Directions</span>
          </button>

          {/* Save */}
          <button
            onClick={onToggleSave}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Bookmark className={`w-5 h-5 mb-1 group-hover:scale-110 transition-transform ${isSaved ? 'text-amber-600 fill-amber-600' : 'text-stone-600'}`} />
            <span className="text-xs font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Nearby */}
          <button
            onClick={onOpenDirections}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Compass className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Nearby</span>
          </button>

          {/* Send to phone */}
          <button
            onClick={onOpenSendToPhone}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Smartphone className="w-5 h-5 text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Send to phone</span>
          </button>

          {/* Share */}
          <button
            onClick={onOpenShare}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Share2 className="w-5 h-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Share</span>
          </button>

          {/* Order online via Swiggy */}
          <a
            href={PLACE_DETAILS.swiggyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all text-orange-950 cursor-pointer group shadow-2xs"
            title="Order online from Dessert Factory @13 on Swiggy"
          >
            <SwiggyIcon size={22} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Order online</span>
            <span className="text-[10px] text-orange-700 font-medium">via Swiggy</span>
          </a>

          {/* Takeaway / Dine-in Bag */}
          <button
            onClick={() => onOpenOrder('takeaway')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <PackageCheck className="w-5 h-5 text-teal-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Takeaway</span>
            <span className="text-[10px] text-stone-400 font-normal">Self-pickup</span>
          </button>

          {/* Call */}
          <a
            href={`tel:${PLACE_DETAILS.phone.replace(/[^0-9]/g, '')}`}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-stone-800 cursor-pointer group"
          >
            <Phone className="w-5 h-5 text-rose-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Call</span>
          </a>
        </div>

        {/* Location & Details Quick Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50/80 rounded-xl border border-stone-200 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900 leading-tight">
                MG Rd, beside Crocs, Beside Balaji Towers
              </p>
              <p className="text-stone-500 mt-0.5">Labbipet, Vijayawada, AP 520010</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900 leading-tight">
                {PLACE_DETAILS.hoursToday}
              </p>
              <p className="text-stone-500 mt-0.5">Dine-in · Takeaway · No-contact delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900 leading-tight">
                {PLACE_DETAILS.phone}
              </p>
              <p className="font-mono text-stone-500 mt-0.5">{PLACE_DETAILS.plusCode}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
