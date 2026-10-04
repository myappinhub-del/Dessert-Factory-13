import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Share2, Check, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { createWhatsAppShareUrl, getAppShareUrl } from '../utils/shareUtils';
import { PLACE_DETAILS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { SwiggyIcon } from './SwiggyIcon';

interface OrderCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  defaultOrderType?: 'takeaway' | 'dinein';
}

export const OrderCartDrawer: React.FC<OrderCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  defaultOrderType = 'takeaway'
}) => {
  const [orderType, setOrderType] = useState<'takeaway' | 'dinein'>(defaultOrderType);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('04');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [splitCount, setSplitCount] = useState(2);
  const [showSplitCalculator, setShowSplitCalculator] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const packingFee = orderType === 'takeaway' ? (subtotal > 0 ? 30 : 0) : 0;
  const total = subtotal + gst + packingFee;
  const perPerson = Math.ceil(total / Math.max(1, splitCount));

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrderId = `DF-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);
    setIsOrdered(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleShareOrderBill = () => {
    const itemsList = cartItems.map(c => `• ${c.quantity}x ${c.item.name} - ₹${c.item.price * c.quantity}`).join('\n');
    const text = `🧁 Dessert Factory @13 Order Split (${orderType.toUpperCase()}):\n${itemsList}\n\nTotal Bill: ₹${total}\nSplit for ${splitCount} people: ₹${perPerson} each.\n\n📍 MG Rd, beside Crocs, Labbipet, Vijayawada`;
    window.open(createWhatsAppShareUrl(text, getAppShareUrl()), '_blank');
  };

  const handleDone = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#fcfaf7]">
            <div className="flex items-center gap-3">
              <BrandLogo size={36} />
              <div>
                <h2 className="text-base font-semibold text-stone-900 leading-tight">Your Dessert Bag</h2>
                <p className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} · Dessert Factory @13
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {isOrdered ? (
              <div className="py-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-1.5 bg-stone-100 rounded-full shadow-inner">
                    <BrandLogo size={64} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Order Confirmed</span>
                  </span>
                  <h3 className="text-xl font-serif-title font-bold text-stone-900 mt-1">Order #{orderId}</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {orderType === 'takeaway'
                      ? 'Preparing your takeaway box at Dessert Factory @13, MG Road!'
                      : `Preparing fresh treats for Table #${tableNumber}!`}
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                  <div className="flex justify-between font-semibold text-stone-900 border-b border-stone-200 pb-2">
                    <span>Summary</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="text-stone-600 space-y-1">
                    {cartItems.map((ci) => (
                      <div key={ci.item.id} className="flex justify-between">
                        <span>{ci.quantity}x {ci.item.name}</span>
                        <span>₹{ci.item.price * ci.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                    Pickup Location: {PLACE_DETAILS.fullAddress}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={handleShareOrderBill}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Receipt & Split with Friends</span>
                  </button>
                  <button
                    onClick={handleDone}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Close Bag
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 text-base">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                    Treat yourself to our viral Dubai Kunafa Chocolate, Apricot Delight, or fresh baked cheesecakes!
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={PLACE_DETAILS.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FC8019] hover:bg-[#e8700f] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <SwiggyIcon size={18} />
                    <span>Order Online for Delivery on Swiggy</span>
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Delivery on Swiggy Notice */}
                <div className="p-3 bg-orange-50/70 border border-orange-200/80 rounded-xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <SwiggyIcon size={20} className="shrink-0" />
                    <span className="text-xs text-orange-950 font-medium">
                      Want doorstep delivery?
                    </span>
                  </div>
                  <a
                    href={PLACE_DETAILS.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#FC8019] hover:text-[#d76508] transition-colors whitespace-nowrap"
                  >
                    Order on Swiggy ↗
                  </a>
                </div>

                {/* Order Type Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Order Mode
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 rounded-lg text-center transition-all cursor-pointer ${
                        orderType === 'takeaway' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Takeaway / Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('dinein')}
                      className={`py-2 rounded-lg text-center transition-all cursor-pointer ${
                        orderType === 'dinein' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Dine-in Cafe
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Selected Treats
                  </label>
                  {cartItems.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">{item.name}</h4>
                        <p className="text-xs text-stone-500 font-mono">₹{item.price} each</p>
                        <p className="text-xs font-bold text-amber-900 mt-0.5">₹{item.price * quantity}</p>
                      </div>
                      
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 min-w-4 text-center tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Split Bill Accordion */}
                <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50">
                  <div 
                    onClick={() => setShowSplitCalculator(!showSplitCalculator)}
                    className="flex items-center justify-between cursor-pointer text-xs font-medium text-stone-800"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>Split Bill with Friends?</span>
                    </div>
                    <span className="text-amber-700 font-semibold">
                      {showSplitCalculator ? 'Hide' : 'Calculate'}
                    </span>
                  </div>

                  {showSplitCalculator && (
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600">Number of people:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                            className="w-6 h-6 rounded bg-stone-200 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold text-stone-900 w-4 text-center">{splitCount}</span>
                          <button
                            type="button"
                            onClick={() => setSplitCount(splitCount + 1)}
                            className="w-6 h-6 rounded bg-stone-200 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <span>Each person pays:</span>
                        <span className="font-mono text-sm text-amber-950 font-bold">₹{perPerson}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleShareOrderBill}
                        className="w-full py-1.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-stone-800 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Send Split on WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {orderType === 'dinein' && (
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Table Number</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Table # on your booth"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                      />
                    </div>
                  )}

                  {/* Bill Breakdown */}
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>GST (5%)</span>
                      <span className="font-mono">₹{gst}</span>
                    </div>
                    {orderType === 'takeaway' && (
                      <div className="flex justify-between text-stone-600">
                        <span>Eco Takeaway Packaging</span>
                        <span className="font-mono">₹{packingFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-stone-950 text-sm pt-2 border-t border-stone-200">
                      <span>Grand Total</span>
                      <span className="font-mono">₹{total}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Place {orderType === 'takeaway' ? 'Takeaway Order' : 'Dine-in Order'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
