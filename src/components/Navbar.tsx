import React from 'react';
import { ShoppingBag, Share2, Phone } from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { SwiggyIcon } from './SwiggyIcon';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenShare: () => void;
  activeTab: string;
  onSelectTab: (tab: 'overview' | 'menu' | 'reviews' | 'photos' | 'about') => void;
  onLogoClick?: () => void;
  customLogoUrl?: string;
  isAdmin?: boolean;
  onOpenAdminDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenShare,
  activeTab,
  onSelectTab,
  onLogoClick,
  customLogoUrl,
  isAdmin,
  onOpenAdminDashboard,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with official DF@13 logo */}
        <div className="flex items-center gap-2.5">
          <div 
            onClick={onLogoClick} 
            title="Click logo to open Admin / Owner Portal"
            className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <BrandLogo size={36} customLogoUrl={customLogoUrl} />
          </div>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); onSelectTab('overview'); }}
            className="font-serif-title text-xl font-bold tracking-tight text-stone-900 hover:text-amber-900 transition-colors shrink-0"
          >
            Dessert Factory @13
          </a>
        </div>

        {/* Zone 2: 4-5 clean text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('overview')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'overview' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectTab('menu')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'menu' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => onSelectTab('reviews')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'reviews' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => onSelectTab('photos')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'photos' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => onSelectTab('about')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'about' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            About & Directions
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={PLACE_DETAILS.swiggyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#FC8019] hover:bg-[#e8700f] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
            title="Order online from Dessert Factory @13 on Swiggy"
          >
            <SwiggyIcon size={16} />
            <span>Order on Swiggy</span>
          </a>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Share with friends"
          >
            <Share2 className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
