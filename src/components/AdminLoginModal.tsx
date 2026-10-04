import React, { useState } from 'react';
import { Lock, User, Key, Eye, EyeOff, X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const getStoredAdminId = () => {
    try {
      return localStorage.getItem('df13_admin_id') || 'dessertfacttory@13';
    } catch {
      return 'dessertfacttory@13';
    }
  };

  const getStoredAdminPass = () => {
    try {
      return localStorage.getItem('df13_admin_password') || 'dessertfactory@13';
    } catch {
      return 'dessertfactory@13';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const trimmedId = adminId.trim();
    const trimmedPass = password.trim();

    setTimeout(() => {
      const storedId = getStoredAdminId();
      const storedPass = getStoredAdminPass();

      // Check credentials:
      const validId = 
        (storedId === 'dessertfacttory@13' && (trimmedId === 'dessertfacttory@13' || trimmedId === 'dessertfactory@13')) ||
        trimmedId === storedId;
      const validPass = trimmedPass === storedPass;

      if (validId && validPass) {
        setIsSubmitting(false);
        onLoginSuccess();
        onClose();
        setAdminId('');
        setPassword('');
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid Admin ID or Password. Please check credentials.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={onClose} 
        className="absolute inset-0" 
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-stone-900 to-stone-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md">
              <BrandLogo size={56} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-semibold">
                Secret Access Portal
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white mt-0.5">
                Owner & Admin Login
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-xs">
                Manage Dessert Factory @13 menu items, store location, photos, and live links.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Admin ID */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700">
              Admin ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                autoFocus
                autoComplete="off"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) => {
                  setAdminId(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="off"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Authenticating...' : 'Log In'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
