/**
 * Dessert Factory @13
 * Vijayawada's Premier Dessert Shop & Social Experience
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { PopularTimes } from './components/PopularTimes';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { PhotosSection } from './components/PhotosSection';
import { AboutSection } from './components/AboutSection';
import { PeopleAlsoSearchFor } from './components/PeopleAlsoSearchFor';
import { SocialShareModal } from './components/SocialShareModal';
import { SendToPhoneModal } from './components/SendToPhoneModal';
import { DirectionsModal } from './components/DirectionsModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { OrderCartDrawer } from './components/OrderCartDrawer';
import { PLACE_DETAILS, MENU_ITEMS, PHOTOS_LIST } from './data/mockData';
import { MenuItem, CartItem, Review, PlaceDetails, PhotoItem } from './types';
import { IMAGES, resolveImagePath } from './assets/images';
import { Share2, Navigation, ShoppingBag, Bookmark, Heart, Sparkles, MapPin, Phone, ShieldCheck, Settings } from 'lucide-react';
import { SwiggyIcon } from './components/SwiggyIcon';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'reviews' | 'photos' | 'about'>('overview');
  
  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedItem, setSharedItem] = useState<MenuItem | null>(null);
  const [isSendToPhoneOpen, setIsSendToPhoneOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  
  // Admin & Secret Login state
  const [isSecretLoginOpen, setIsSecretLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('df13_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Dynamic Editable Data (persisted in localStorage, auto-sanitizing image URLs for production)
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>(() => {
    try {
      const saved = localStorage.getItem('df13_place_details');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          heroImage: resolveImagePath(parsed.heroImage || IMAGES.hero),
        };
      }
      return PLACE_DETAILS;
    } catch {
      return PLACE_DETAILS;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('df13_menu_items');
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          image: resolveImagePath(item.image),
        }));
      }
      return MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  const [photosList, setPhotosList] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('df13_photos');
      if (saved) {
        const parsed: PhotoItem[] = JSON.parse(saved);
        return parsed.map((photo) => ({
          ...photo,
          url: resolveImagePath(photo.url),
        }));
      }
      return PHOTOS_LIST;
    } catch {
      return PHOTOS_LIST;
    }
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('df13_custom_logo') || '';
    } catch {
      return '';
    }
  });

  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'takeaway' | 'dinein'>('takeaway');

  // Bookmarking / Save state
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('df13_saved') === 'true';
    } catch {
      return false;
    }
  });

  // Additional reviews submitted in session
  const [additionalReviews, setAdditionalReviews] = useState<Review[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogoClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
      showToast("Opened Owner & Admin Console");
    } else {
      setIsSecretLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem('df13_admin_auth', 'true');
    } catch {}
    setIsAdminDashboardOpen(true);
    showToast("Welcome back, Admin! You can now edit the website.");
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('df13_admin_auth');
    } catch {}
    setIsAdminDashboardOpen(false);
    showToast("Logged out of Admin Portal.");
  };

  const handleUpdatePlaceDetails = (updated: PlaceDetails) => {
    setPlaceDetails(updated);
    try {
      localStorage.setItem('df13_place_details', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateMenuItems = (updated: MenuItem[]) => {
    setMenuItems(updated);
    try {
      localStorage.setItem('df13_menu_items', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdatePhotos = (updated: PhotoItem[]) => {
    setPhotosList(updated);
    try {
      localStorage.setItem('df13_photos', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateCustomLogoUrl = (url: string) => {
    setCustomLogoUrl(url);
    try {
      localStorage.setItem('df13_custom_logo', url);
    } catch {}
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all customizations back to factory store defaults?")) {
      setPlaceDetails(PLACE_DETAILS);
      setMenuItems(MENU_ITEMS);
      setPhotosList(PHOTOS_LIST);
      setCustomLogoUrl('');
      try {
        localStorage.removeItem('df13_place_details');
        localStorage.removeItem('df13_menu_items');
        localStorage.removeItem('df13_photos');
        localStorage.removeItem('df13_custom_logo');
      } catch {}
      showToast("Reset all site details back to original defaults.");
    }
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    try {
      localStorage.setItem('df13_saved', String(next));
    } catch {}
    showToast(next ? "Saved to your bookmarked places!" : "Removed from saved places.");
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenShareForItem = (item: MenuItem) => {
    setSharedItem(item);
    setIsShareModalOpen(true);
  };

  const handleOpenGeneralShare = () => {
    setSharedItem(null);
    setIsShareModalOpen(true);
  };

  const handleOpenOrder = (type: 'takeaway' | 'dinein') => {
    setOrderType(type);
    setIsCartOpen(true);
  };

  const handleReviewSubmitted = (newReview: Review) => {
    setAdditionalReviews((prev) => [newReview, ...prev]);
    showToast("Review submitted successfully! Thank you.");
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-body selection:bg-amber-200">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg border border-stone-800 flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Mode Header Ribbon when Logged In */}
      {isAdminLoggedIn && (
        <div className="bg-stone-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-amber-500/40 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-amber-300">Owner & Admin Mode:</span>
            <span className="text-stone-300 hidden sm:inline">
              Edit menu items, photos, shop location, or logo.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShare={handleOpenGeneralShare}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogoClick={handleLogoClick}
        customLogoUrl={customLogoUrl}
        isAdmin={isAdminLoggedIn}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero & Google Place Overview Lockup */}
        <HeroOverview
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenDirections={() => setIsDirectionsOpen(true)}
          onOpenSendToPhone={() => setIsSendToPhoneOpen(true)}
          onOpenShare={handleOpenGeneralShare}
          onOpenOrder={handleOpenOrder}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onLogoClick={handleLogoClick}
          customLogoUrl={customLogoUrl}
          placeDetails={placeDetails}
        />

        {/* View Switcher: Show selected tab or comprehensive overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Swiggy Bestsellers Spotlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Apricot Delight */}
              <div className="bg-gradient-to-br from-amber-900 to-stone-900 rounded-2xl p-6 text-white border border-amber-800/40 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-2 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-200 rounded-full text-xs font-semibold border border-amber-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Swiggy Bestseller · Pure Veg</span>
                  </div>
                  <h3 className="font-serif-title text-2xl font-bold tracking-tight text-white">
                    Apricot Delight
                  </h3>
                  <p className="text-xs text-stone-200 leading-relaxed max-w-md">
                    A sweet treat packed with the natural goodness of apricots, perfect for a bite. Vijayawada's absolute favorite signature delicacy.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between relative z-10 border-t border-amber-800/60">
                  <div>
                    <span className="font-serif-title text-xl font-bold text-amber-300">₹216</span>
                    <span className="text-[10px] text-stone-300 block">Costs: 216 rupees</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={PLACE_DETAILS.swiggyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#FC8019] hover:bg-[#e8700f] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      title="Order Apricot Delight on Swiggy"
                    >
                      <SwiggyIcon size={14} />
                      <span>Order Swiggy</span>
                    </a>
                    <button
                      onClick={() => handleAddToCart({
                        id: 'item-apricot-delight',
                        name: 'Apricot Delight',
                        price: 216,
                        category: 'special-items',
                        description: 'A sweet treat packed with the natural goodness of apricots, perfect for a bite.',
                        rating: 4.9,
                        reviewCount: 56,
                        image: IMAGES.apricotDelight,
                        isVegetarian: true,
                        tags: ['Special Item', 'Bestseller', 'Apricot Delight', 'Veg']
                      })}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Pineapple One Kg Cool Cake */}
              <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl p-6 text-white border border-stone-800 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-2 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cool Cake Bestseller · 4.1★ (6)</span>
                  </div>
                  <h3 className="font-serif-title text-2xl font-bold tracking-tight text-white">
                    Pineapple one kg cool cake
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed max-w-md">
                    Soft and creamy pineapple cake, perfect for celebrations and sharing. Freshly made with luscious tropical layers.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between relative z-10 border-t border-stone-800">
                  <div>
                    <span className="font-serif-title text-xl font-bold text-amber-400">₹399</span>
                    <span className="text-[10px] text-stone-400 block">Costs: 399 rupees</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={PLACE_DETAILS.swiggyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#FC8019] hover:bg-[#e8700f] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      title="Order Pineapple Cool Cake on Swiggy"
                    >
                      <SwiggyIcon size={14} />
                      <span>Order Swiggy</span>
                    </a>
                    <button
                      onClick={() => handleAddToCart({
                        id: 'item-pineapple-1kg-bestseller',
                        name: 'Pineapple one kg cool cake',
                        price: 399,
                        category: 'cool-cakes',
                        description: 'Soft and creamy pineapple cake, perfect for celebrations and sharing.',
                        rating: 4.1,
                        reviewCount: 6,
                        image: IMAGES.coolCake,
                        isVegetarian: false,
                        isBestseller: true,
                        tags: ['Cool cake', '1 Kg', 'Bestseller', 'Non-veg']
                      })}
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Times interactive chart */}
            <PopularTimes />

            {/* Featured Menu items */}
            <MenuSection
              items={menuItems}
              placeDetails={placeDetails}
              onAddToCart={handleAddToCart}
              onShareItem={handleOpenShareForItem}
            />

            {/* Reviews Section */}
            <ReviewsSection
              onOpenWriteReview={() => setIsWriteReviewOpen(true)}
              additionalReviews={additionalReviews}
            />

            {/* Photos & Ambiance preview */}
            <PhotosSection
              photos={photosList}
              onSharePhoto={(photo) => {
                const text = `Check out this photo of "${photo.title}" at ${placeDetails.name} in Vijayawada!`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
              }}
            />

            {/* About & Location details */}
            <AboutSection
              placeDetails={placeDetails}
              customLogoUrl={customLogoUrl}
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenShare={handleOpenGeneralShare}
            />

            {/* Competitor / Similar Search Places */}
            <PeopleAlsoSearchFor />
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-8">
            <MenuSection
              items={menuItems}
              placeDetails={placeDetails}
              onAddToCart={handleAddToCart}
              onShareItem={handleOpenShareForItem}
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <ReviewsSection
              onOpenWriteReview={() => setIsWriteReviewOpen(true)}
              additionalReviews={additionalReviews}
            />
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-8">
            <PhotosSection photos={photosList} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8">
            <AboutSection
              placeDetails={placeDetails}
              customLogoUrl={customLogoUrl}
              onOpenDirections={() => setIsDirectionsOpen(true)}
              onOpenShare={handleOpenGeneralShare}
            />
            <PopularTimes />
            <PeopleAlsoSearchFor />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-10 border-t border-stone-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <span className="font-serif-title text-lg font-bold text-white tracking-tight">
                {placeDetails.name}
              </span>
              <p className="text-stone-400 text-xs mt-1">
                {placeDetails.fullAddress}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenGeneralShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Friends</span>
              </button>
              <button
                onClick={() => setIsDirectionsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
            <p>© {new Date().getFullYear()} {placeDetails.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Open Daily: {placeDetails.hoursToday}</span>
              <span aria-hidden="true">·</span>
              <span>Tel: {placeDetails.phone}</span>
              <span aria-hidden="true">·</span>
              <span>Plus Code: {placeDetails.plusCode}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick Bar for Mobile (compliant with 15% sticky height limit) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3.5 py-2 flex items-center justify-between shadow-lg">
        <button
          onClick={() => setIsDirectionsOpen(true)}
          className="flex items-center gap-1 text-xs font-semibold text-stone-700 py-1"
        >
          <Navigation className="w-4 h-4 text-blue-600" />
          <span>Directions</span>
        </button>

        <a
          href={placeDetails.swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FC8019] text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          <SwiggyIcon size={14} />
          <span>Order Swiggy</span>
        </a>

        <button
          onClick={handleOpenGeneralShare}
          className="flex items-center gap-1 text-xs font-semibold text-stone-700 py-1"
        >
          <Share2 className="w-4 h-4 text-amber-600" />
          <span>Share</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag {totalCartCount > 0 ? `(${totalCartCount})` : ''}</span>
        </button>
      </div>

      {/* Modals and Drawers */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        sharedItem={sharedItem}
      />

      <SendToPhoneModal
        isOpen={isSendToPhoneOpen}
        onClose={() => setIsSendToPhoneOpen(false)}
      />

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleReviewSubmitted}
      />

      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        defaultOrderType={orderType}
      />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={isSecretLoginOpen}
        onClose={() => setIsSecretLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Dashboard Management Console */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        placeDetails={placeDetails}
        onUpdatePlaceDetails={handleUpdatePlaceDetails}
        menuItems={menuItems}
        onUpdateMenuItems={handleUpdateMenuItems}
        photos={photosList}
        onUpdatePhotos={handleUpdatePhotos}
        onResetDefaults={handleResetDefaults}
        onLogout={handleLogout}
        customLogoUrl={customLogoUrl}
        onUpdateCustomLogoUrl={handleUpdateCustomLogoUrl}
      />
    </div>
  );
}
