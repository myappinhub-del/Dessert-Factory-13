import React, { useState } from 'react';
import { Search, Plus, Share2, Star, Sparkles, Check, ExternalLink } from 'lucide-react';
import { MenuItem, PlaceDetails } from '../types';
import { MENU_ITEMS, PLACE_DETAILS, SWIGGY_ORDER_URL } from '../data/mockData';
import { SwiggyIcon } from './SwiggyIcon';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onShareItem: (item: MenuItem) => void;
  items?: MenuItem[];
  placeDetails?: PlaceDetails;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  onAddToCart, 
  onShareItem,
  items = MENU_ITEMS,
  placeDetails = PLACE_DETAILS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: `All Items (${items.length})` },
    { id: 'cool-cakes', label: `Cool cakes (${items.filter(i => i.category === 'cool-cakes').length})` },
    { id: 'milk-cakes', label: `Dessert Milk Cake (${items.filter(i => i.category === 'milk-cakes').length})` },
    { id: 'special-items', label: `Special Items (${items.filter(i => i.category === 'special-items').length})` },
  ];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet = 
      dietFilter === 'all' || 
      (dietFilter === 'veg' && item.isVegetarian) || 
      (dietFilter === 'nonveg' && !item.isVegetarian);
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesDiet && matchesQuery;
  });

  return (
    <section id="menu" className="space-y-6">
      {/* Menu Header with Search */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-title text-2xl font-bold text-stone-900 tracking-tight">
              Dessert Factory @13 Menu
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Cool Cakes · Dessert Milk Cakes · Special Delights · Live on Swiggy
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search cool cake, milk cake, apricot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Category & Diet Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Diet Filter (Veg / Non-Veg) */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                dietFilter === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                dietFilter === 'veg' ? 'bg-white text-emerald-800 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Veg / Eggless</span>
            </button>
            <button
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                dietFilter === 'nonveg' ? 'bg-white text-rose-800 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Swiggy Direct Order Live Banner */}
        <div className="p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <SwiggyIcon size={30} className="shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900 flex items-center gap-2">
                <span>Order Dessert Factory @13 on Swiggy</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-semibold">
                  Live in Vijayawada
                </span>
              </p>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Fast doorstep delivery across Governorpet, Labbipet & Vijayawada city.
              </p>
            </div>
          </div>
          <a
            href={placeDetails.swiggyUrl || SWIGGY_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FC8019] hover:bg-[#e8700f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Open Swiggy Menu</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isJustAdded = addedItemIds[item.id];
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/src/assets/images/hero_dessert_factory_1791130942756.jpg";
                    }}
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {item.isBestseller && (
                      <span className="px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                        <span>Bestseller</span>
                      </span>
                    )}

                    {/* Standard Indian Veg / Non-Veg Indicator */}
                    {item.isVegetarian ? (
                      <span className="w-4 h-4 bg-white/95 rounded-sm flex items-center justify-center border border-emerald-600 p-0.5 shadow-xs" title="Pure Veg / Eggless">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 bg-white/95 rounded-sm flex items-center justify-center border border-rose-600 p-0.5 shadow-xs" title="Non-Veg">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      </span>
                    )}
                  </div>

                  {/* Quick Share Button on Card Image */}
                  <button
                    onClick={() => onShareItem(item)}
                    title={`Share ${item.name}`}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-amber-800 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer backdrop-blur-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-800">
                      {item.tags[0] || 'Dessert'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.rating}</span>
                      <span className="text-stone-400 font-normal">({item.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-base font-serif-title font-bold text-stone-900 tabular-nums">
                      ₹{item.price}
                    </span>
                    <span className="block text-[10px] text-stone-400">Costs: {item.price} rupees</span>
                  </div>

                  {/* Actions: Direct Swiggy Order Button + Add to In-App Bag */}
                  <div className="flex items-center gap-1.5">
                    {/* Direct Swiggy Connect button */}
                    <a
                      href={item.swiggyUrl || SWIGGY_ORDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#FC8019] hover:bg-[#e8700f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
                      title={`Order ${item.name} directly on Swiggy`}
                    >
                      <SwiggyIcon size={14} />
                      <span className="hidden sm:inline">Swiggy</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* In-app Bag button */}
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                      title="Add to Takeaway / Dine-in Bag"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Bag</span>
                        </>
                      )}
                    </button>

                    {/* Share button */}
                    <button
                      onClick={() => onShareItem(item)}
                      className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Share dish"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

