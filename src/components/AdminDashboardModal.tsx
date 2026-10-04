import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  MapPin, 
  Camera, 
  ShoppingBag, 
  Image as ImageIcon, 
  RotateCcw, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Search,
  Key,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldAlert
} from 'lucide-react';
import { MenuItem, PhotoItem, PlaceDetails } from '../types';
import { BrandLogo } from './BrandLogo';
import { SwiggyIcon } from './SwiggyIcon';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeDetails: PlaceDetails;
  onUpdatePlaceDetails: (updated: PlaceDetails) => void;
  menuItems: MenuItem[];
  onUpdateMenuItems: (updated: MenuItem[]) => void;
  photos: PhotoItem[];
  onUpdatePhotos: (updated: PhotoItem[]) => void;
  onResetDefaults: () => void;
  onLogout: () => void;
  customLogoUrl?: string;
  onUpdateCustomLogoUrl?: (url: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  placeDetails,
  onUpdatePlaceDetails,
  menuItems,
  onUpdateMenuItems,
  photos,
  onUpdatePhotos,
  onResetDefaults,
  onLogout,
  customLogoUrl,
  onUpdateCustomLogoUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'items' | 'photos' | 'branding' | 'security'>('items');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Admin ID & Password local state
  const [currentId, setCurrentId] = useState<string>(() => {
    try {
      return localStorage.getItem('df13_admin_id') || 'dessertfacttory@13';
    } catch {
      return 'dessertfacttory@13';
    }
  });

  const [newAdminId, setNewAdminId] = useState(currentId);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);

  // Shop details local form state
  const [localPlace, setLocalPlace] = useState<PlaceDetails>(placeDetails);

  // Items local state
  const [localItems, setLocalItems] = useState<MenuItem[]>(menuItems);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [itemSearch, setItemSearch] = useState('');

  // New item form
  const [newItemForm, setNewItemForm] = useState<Partial<MenuItem>>({
    name: '',
    category: 'cool-cakes',
    price: 399,
    description: '',
    rating: 4.5,
    reviewCount: 1,
    image: '/src/assets/images/cool_cake_celebration_1791132683933.jpg',
    isBestseller: false,
    isVegetarian: true,
    tags: ['Cool cake'],
    swiggyUrl: placeDetails.swiggyUrl,
  });

  // Photos local state
  const [localPhotos, setLocalPhotos] = useState<PhotoItem[]>(photos);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhotoForm, setNewPhotoForm] = useState({
    title: '',
    url: '/src/assets/images/cool_cake_celebration_1791132683933.jpg',
    category: 'food',
    author: 'Dessert Factory @13 Team',
  });

  // Branding local state
  const [localLogoUrl, setLocalLogoUrl] = useState(customLogoUrl || '');

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Save Shop Details
  const handleSaveShopDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePlaceDetails(localPlace);
    triggerToast('Shop location & details updated successfully!');
  };

  // Add Item
  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.name || !newItemForm.price) return;

    const created: MenuItem = {
      id: `item-custom-${Date.now()}`,
      name: newItemForm.name,
      category: newItemForm.category || 'cool-cakes',
      price: Number(newItemForm.price),
      description: newItemForm.description || '',
      rating: 4.8,
      reviewCount: 1,
      image: newItemForm.image || '/src/assets/images/cool_cake_celebration_1791132683933.jpg',
      isBestseller: !!newItemForm.isBestseller,
      isVegetarian: newItemForm.isVegetarian !== false,
      tags: newItemForm.tags || ['Dessert'],
      swiggyUrl: newItemForm.swiggyUrl || localPlace.swiggyUrl,
    };

    const updated = [created, ...localItems];
    setLocalItems(updated);
    onUpdateMenuItems(updated);
    setIsAddingNewItem(false);
    setNewItemForm({
      name: '',
      category: 'cool-cakes',
      price: 399,
      description: '',
      rating: 4.5,
      reviewCount: 1,
      image: '/src/assets/images/cool_cake_celebration_1791132683933.jpg',
      isBestseller: false,
      isVegetarian: true,
      tags: ['Cool cake'],
      swiggyUrl: localPlace.swiggyUrl,
    });
    triggerToast(`Added "${created.name}" to menu!`);
  };

  // Delete Item
  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      const updated = localItems.filter((i) => i.id !== id);
      setLocalItems(updated);
      onUpdateMenuItems(updated);
      triggerToast(`Removed "${name}" from menu.`);
    }
  };

  // Update existing item field
  const handleUpdateItemField = (id: string, field: keyof MenuItem, val: any) => {
    const updated = localItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setLocalItems(updated);
    onUpdateMenuItems(updated);
  };

  // Add Photo
  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoForm.url || !newPhotoForm.title) return;

    const created: PhotoItem = {
      id: `photo-custom-${Date.now()}`,
      title: newPhotoForm.title,
      url: newPhotoForm.url,
      category: newPhotoForm.category as any,
      author: newPhotoForm.author || 'Dessert Factory Staff',
    };

    const updated = [created, ...localPhotos];
    setLocalPhotos(updated);
    onUpdatePhotos(updated);
    setIsAddingPhoto(false);
    setNewPhotoForm({
      title: '',
      url: '/src/assets/images/cool_cake_celebration_1791132683933.jpg',
      category: 'food',
      author: 'Dessert Factory @13 Team',
    });
    triggerToast('Added new photo to gallery!');
  };

  // Delete Photo
  const handleDeletePhoto = (id: string) => {
    const updated = localPhotos.filter((p) => p.id !== id);
    setLocalPhotos(updated);
    onUpdatePhotos(updated);
    triggerToast('Photo deleted.');
  };

  // Save Branding
  const handleSaveBranding = () => {
    if (onUpdateCustomLogoUrl) {
      onUpdateCustomLogoUrl(localLogoUrl);
    }
    triggerToast('Branding updated!');
  };

  // Update Credentials (Admin ID & Password)
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(null);

    const storedPass = localStorage.getItem('df13_admin_password') || 'dessertfactory@13';

    if (currentPassInput.trim() !== storedPass) {
      setSecurityError('Current Password is incorrect. Please re-enter.');
      return;
    }

    const trimmedNewId = newAdminId.trim();
    if (!trimmedNewId || trimmedNewId.length < 3) {
      setSecurityError('Admin ID must be at least 3 characters.');
      return;
    }

    if (newPassInput) {
      if (newPassInput.length < 4) {
        setSecurityError('New Password must be at least 4 characters.');
        return;
      }
      if (newPassInput !== confirmPassInput) {
        setSecurityError('New Password and Confirm Password do not match.');
        return;
      }
      localStorage.setItem('df13_admin_password', newPassInput.trim());
    }

    localStorage.setItem('df13_admin_id', trimmedNewId);
    setCurrentId(trimmedNewId);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setSecuritySuccess('Admin credentials updated! Please use your new ID and Password on your next login.');
    triggerToast('Credentials updated successfully!');
  };

  const filteredItems = localItems.filter(
    (i) =>
      i.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      i.description.toLowerCase().includes(itemSearch.toLowerCase()) ||
      i.category.toLowerCase().includes(itemSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      {/* Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-60 bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Dialog */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Bar Header */}
        <div className="p-4 sm:px-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white/10 rounded-full">
              <BrandLogo size={36} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Admin Management Console</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-md border border-emerald-500/30">
                  Authorized Owner
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Logged in as <span className="text-amber-300 font-mono font-bold">{currentId}</span> · Dessert Factory @13
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Log Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 border-b border-stone-200 bg-stone-50 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'items', label: `Menu Items (${localItems.length})`, icon: ShoppingBag },
            { id: 'shop', label: 'Shop Location & Details', icon: MapPin },
            { id: 'photos', label: `Gallery Photos (${localPhotos.length})`, icon: Camera },
            { id: 'branding', label: 'Logo & Branding', icon: ImageIcon },
            { id: 'security', label: 'Change ID & Password', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-amber-600 text-amber-900 bg-white font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/40">
          {/* TAB 1: MENU ITEMS MANAGER */}
          {activeTab === 'items' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <button
                  onClick={() => setIsAddingNewItem(!isAddingNewItem)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingNewItem ? 'Close Form' : 'Add New Item'}</span>
                </button>
              </div>

              {/* Add New Item Form Drawer */}
              {isAddingNewItem && (
                <form
                  onSubmit={handleCreateItem}
                  className="p-5 bg-white border-2 border-amber-500/30 rounded-2xl shadow-md space-y-4 animate-fade-in"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Add Item to Swiggy / In-App Menu</span>
                    </h4>
                    <span className="text-[11px] text-stone-400">All fields customizable</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Item Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mango Cool Cake One Kg"
                        value={newItemForm.name}
                        onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                      <select
                        value={newItemForm.category}
                        onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      >
                        <option value="cool-cakes">Cool cakes</option>
                        <option value="milk-cakes">Dessert Milk Cake</option>
                        <option value="special-items">Special Items</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Price (₹ INR) *</label>
                      <input
                        type="number"
                        required
                        placeholder="399"
                        value={newItemForm.price}
                        onChange={(e) => setNewItemForm({ ...newItemForm, price: Number(e.target.value) })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                      <input
                        type="text"
                        placeholder="Short mouthwatering description..."
                        value={newItemForm.description}
                        onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        placeholder="/src/assets/images/... or https://"
                        value={newItemForm.image}
                        onChange={(e) => setNewItemForm({ ...newItemForm, image: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                      <input
                        type="checkbox"
                        checked={newItemForm.isVegetarian}
                        onChange={(e) => setNewItemForm({ ...newItemForm, isVegetarian: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Pure Veg / Eggless</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                      <input
                        type="checkbox"
                        checked={newItemForm.isBestseller}
                        onChange={(e) => setNewItemForm({ ...newItemForm, isBestseller: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Mark as Bestseller</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewItem(false)}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                    >
                      Save & Add to Menu
                    </button>
                  </div>
                </form>
              )}

              {/* Items Table List */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-700">
                    <thead className="bg-stone-100 text-stone-600 text-[11px] uppercase tracking-wider font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">Item & Image</th>
                        <th className="py-3 px-3">Diet</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Price</th>
                        <th className="py-3 px-3">Bestseller</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                                onError={(e) => {
                                  e.currentTarget.src = '/src/assets/images/hero_dessert_factory_1791130942756.jpg';
                                }}
                              />
                              <div className="space-y-0.5 max-w-xs">
                                <span className="font-semibold text-stone-900 block leading-tight">
                                  {item.name}
                                </span>
                                <p className="text-[11px] text-stone-500 line-clamp-1">{item.description}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <button
                              onClick={() => handleUpdateItemField(item.id, 'isVegetarian', !item.isVegetarian)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer ${
                                item.isVegetarian
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}
                              title="Click to toggle Veg / Non-Veg"
                            >
                              {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                            </button>
                          </td>

                          <td className="py-3 px-3">
                            <select
                              value={item.category}
                              onChange={(e) => handleUpdateItemField(item.id, 'category', e.target.value)}
                              className="text-xs bg-stone-50 border border-stone-200 rounded-lg p-1"
                            >
                              <option value="cool-cakes">Cool cakes</option>
                              <option value="milk-cakes">Dessert Milk Cake</option>
                              <option value="special-items">Special Items</option>
                            </select>
                          </td>

                          <td className="py-3 px-3 font-mono font-bold text-stone-900">
                            <div className="flex items-center gap-1">
                              <span>₹</span>
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleUpdateItemField(item.id, 'price', Number(e.target.value))}
                                className="w-16 p-1 bg-stone-50 border border-stone-200 rounded text-xs font-mono font-bold"
                              />
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <input
                              type="checkbox"
                              checked={!!item.isBestseller}
                              onChange={(e) => handleUpdateItemField(item.id, 'isBestseller', e.target.checked)}
                              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                              title="Toggle Bestseller"
                            />
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHOP LOCATION & DETAILS */}
          {activeTab === 'shop' && (
            <form onSubmit={handleSaveShopDetails} className="space-y-5 max-w-3xl bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-stone-900">Shop Location & Contact Details</h3>
                <p className="text-xs text-stone-500">
                  These changes instantly update the Google Place card, directions, and footer info.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Shop / Business Name</label>
                  <input
                    type="text"
                    required
                    value={localPlace.name}
                    onChange={(e) => setLocalPlace({ ...localPlace, name: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={localPlace.phone}
                    onChange={(e) => setLocalPlace({ ...localPlace, phone: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Address</label>
                <input
                  type="text"
                  required
                  value={localPlace.fullAddress}
                  onChange={(e) => setLocalPlace({ ...localPlace, fullAddress: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Landmarks</label>
                  <input
                    type="text"
                    value={localPlace.landmark}
                    onChange={(e) => setLocalPlace({ ...localPlace, landmark: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Area / Locality</label>
                  <input
                    type="text"
                    value={localPlace.area}
                    onChange={(e) => setLocalPlace({ ...localPlace, area: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Plus Code</label>
                  <input
                    type="text"
                    value={localPlace.plusCode}
                    onChange={(e) => setLocalPlace({ ...localPlace, plusCode: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Operating Hours String</label>
                  <input
                    type="text"
                    value={localPlace.hoursToday}
                    onChange={(e) => setLocalPlace({ ...localPlace, hoursToday: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price Range Label</label>
                  <input
                    type="text"
                    value={localPlace.priceRange}
                    onChange={(e) => setLocalPlace({ ...localPlace, priceRange: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Swiggy Order Page URL */}
              <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-orange-950 flex items-center gap-1.5">
                  <SwiggyIcon size={18} />
                  <span>Swiggy Online Ordering Link</span>
                </label>
                <input
                  type="url"
                  required
                  value={localPlace.swiggyUrl}
                  onChange={(e) => setLocalPlace({ ...localPlace, swiggyUrl: e.target.value })}
                  className="w-full p-2 bg-white border border-orange-300 rounded-xl text-xs font-mono"
                />
                <p className="text-[11px] text-stone-500">
                  All "Order on Swiggy" buttons connect to this link.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Location & Details</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: GALLERY PHOTOS MANAGER */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-stone-900">Manage Photos & Vibe Media</h3>
                  <p className="text-xs text-stone-500">Add interior, dessert, or 360° showcase images.</p>
                </div>
                <button
                  onClick={() => setIsAddingPhoto(!isAddingPhoto)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingPhoto ? 'Close' : 'Add Photo'}</span>
                </button>
              </div>

              {/* Add Photo Form */}
              {isAddingPhoto && (
                <form
                  onSubmit={handleCreatePhoto}
                  className="p-5 bg-white border border-amber-500/30 rounded-2xl shadow-md space-y-4"
                >
                  <h4 className="font-semibold text-stone-900 text-sm">Add New Photo to Gallery</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Photo Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fresh Strawberry Cool Cake Showcase"
                        value={newPhotoForm.title}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, title: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                      <select
                        value={newPhotoForm.category}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, category: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      >
                        <option value="food">Food & Drink</option>
                        <option value="vibe">Vibe & Seating</option>
                        <option value="menu">Menu</option>
                        <option value="owner">By Owner</option>
                        <option value="360">Street View & 360°</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        required
                        placeholder="/src/assets/images/... or https://"
                        value={newPhotoForm.url}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, url: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsAddingPhoto(false)}
                      className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
                    >
                      Upload & Add Photo
                    </button>
                  </div>
                </form>
              )}

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {localPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] uppercase font-mono">
                          {photo.category}
                        </span>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1.5 bg-rose-600 hover:bg-rose-700 rounded-lg text-white transition-colors cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <p className="text-xs font-semibold line-clamp-1">{photo.title}</p>
                        <p className="text-[10px] text-stone-300">By {photo.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BRANDING & LOGO */}
          {activeTab === 'branding' && (
            <div className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-stone-900">Logo & Visual Brand Assets</h3>
                <p className="text-xs text-stone-500">
                  Update the official DF@13 logo graphic or custom brand image link.
                </p>
              </div>

              {/* Current Active Logo Preview */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-5">
                <div className="p-2 bg-stone-900 rounded-2xl shadow-inner">
                  <BrandLogo size={72} />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Official DF@13 Dessert Factory Emblem
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Crisp vector logo with the red circular badge, cupcake icon above '@', and 'DESSERT FACTORY' lettering.
                  </p>
                </div>
              </div>

              {/* Custom Logo URL Override */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700">
                  Custom Logo URL (Optional Override)
                </label>
                <input
                  type="text"
                  placeholder="https://... or /src/assets/images/..."
                  value={localLogoUrl}
                  onChange={(e) => setLocalLogoUrl(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                />
                <p className="text-[11px] text-stone-400">
                  Leave blank to use the official vectorized DF@13 logo.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveBranding}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Branding</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: CHANGE ADMIN ID & PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-600" />
                  <span>Change Admin ID & Password</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update the secret login credentials used to unlock this Owner & Admin portal.
                </p>
              </div>

              {/* Status Banner */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-900 font-semibold block">
                      Current Active ID
                    </span>
                    <span className="text-sm font-mono font-bold text-stone-900">
                      {currentId}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secured</span>
                </span>
              </div>

              {/* Success / Error Alerts */}
              {securityError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{securityError}</span>
                </div>
              )}

              {securitySuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{securitySuccess}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                {/* Current Password Verification */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-800">
                    Current Password * <span className="font-normal text-stone-400">(Required to make changes)</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      required
                      placeholder="Enter current password..."
                      value={currentPassInput}
                      onChange={(e) => {
                        setCurrentPassInput(e.target.value);
                        setSecurityError(null);
                      }}
                      className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-4">
                  {/* New Admin ID */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-stone-800">
                      New Admin ID / Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. dessertfacttory@13 or mynewid"
                        value={newAdminId}
                        onChange={(e) => {
                          setNewAdminId(e.target.value);
                          setSecurityError(null);
                        }}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* New Password & Confirmation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-stone-800">
                        New Password <span className="font-normal text-stone-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          placeholder="Leave blank to keep current"
                          value={newPassInput}
                          onChange={(e) => {
                            setNewPassInput(e.target.value);
                            setSecurityError(null);
                          }}
                          className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-stone-800">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          placeholder="Repeat new password"
                          value={confirmPassInput}
                          onChange={(e) => {
                            setConfirmPassInput(e.target.value);
                            setSecurityError(null);
                          }}
                          disabled={!newPassInput}
                          className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white font-mono disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Reset admin credentials back to default (dessertfacttory@13 / dessertfactory@13)?")) {
                        localStorage.removeItem('df13_admin_id');
                        localStorage.removeItem('df13_admin_password');
                        setCurrentId('dessertfacttory@13');
                        setNewAdminId('dessertfacttory@13');
                        setSecuritySuccess("Credentials restored to default: dessertfacttory@13 / dessertfactory@13");
                        triggerToast("Credentials reset to defaults");
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Reset Credentials to Default
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Save New Credentials</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
