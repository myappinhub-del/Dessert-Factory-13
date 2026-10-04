import React, { useState } from 'react';
import { X, Smartphone, MessageCircle, Send, Check } from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { getAppShareUrl, createSmsUrl, copyToClipboard } from '../utils/shareUtils';

interface SendToPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendToPhoneModal: React.FC<SendToPhoneModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendMethod, setSendMethod] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const appUrl = getAppShareUrl();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=Dessert+Factory+@13+MG+Rd+Labbipet+Vijayawada`;
  
  const textMessage = `Dessert Factory @13\n📍 ${PLACE_DETAILS.fullAddress}\n🕒 ${PLACE_DETAILS.hoursToday}\n📞 ${PLACE_DETAILS.phone}\n🗺️ Maps: ${mapsLink}\n🧁 Menu: ${appUrl}`;

  const handleSend = () => {
    if (!phoneNumber.trim()) {
      alert("Please enter a valid phone number");
      return;
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    if (sendMethod === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(textMessage)}`, '_blank');
    } else {
      window.open(createSmsUrl(phoneNumber, textMessage), '_self');
    }

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbf9f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 leading-tight">Send to phone</h2>
              <p className="text-xs text-stone-500">Get directions & shop info sent directly to your phone</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {sentSuccess ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-stone-900">Details Sent!</h3>
              <p className="text-xs text-stone-500">Check your phone messaging app for directions and details.</p>
            </div>
          ) : (
            <>
              {/* Method choice */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">Deliver via:</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setSendMethod('whatsapp')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                      sendMethod === 'whatsapp' ? 'bg-[#25D366] text-white font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSendMethod('sms')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                      sendMethod === 'sms' ? 'bg-stone-900 text-white font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>SMS Message</span>
                  </button>
                </div>
              </div>

              {/* Phone number input */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="77994 38013"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  We'll send the location pin, operating hours, and full address on MG Road.
                </p>
              </div>

              {/* Info summary */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-900">Dessert Factory @13</p>
                <p className="text-stone-500">{PLACE_DETAILS.fullAddress}</p>
                <p className="text-stone-500">📞 {PLACE_DETAILS.phone} · {PLACE_DETAILS.hoursToday}</p>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSend}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <span>Send to My Phone</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
