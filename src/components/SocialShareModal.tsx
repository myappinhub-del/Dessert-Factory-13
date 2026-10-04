import React, { useState, useRef } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Instagram, 
  QrCode, 
  Send, 
  Download, 
  Sparkles,
  MapPin,
  Star,
  Users
} from 'lucide-react';
import { PLACE_DETAILS } from '../data/mockData';
import { 
  getAppShareUrl, 
  createWhatsAppShareUrl, 
  createTwitterShareUrl, 
  createFacebookShareUrl, 
  createTelegramShareUrl, 
  copyToClipboard 
} from '../utils/shareUtils';
import { QRCodeDisplay } from './QRCodeDisplay';
import { BrandLogo } from './BrandLogo';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedItem?: {
    name: string;
    description?: string;
    price?: number;
    image?: string;
  } | null;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  sharedItem
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'instagram' | 'qr' | 'hangout'>('quick');
  const [copied, setCopied] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'pistachio' | 'dark' | 'apricot'>('pistachio');
  const [storyCardImage, setStoryCardImage] = useState<string>(
    sharedItem?.image || "/src/assets/images/dubai_pistachio_chocolate_1791130956868.jpg"
  );
  const storyCanvasRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const appUrl = getAppShareUrl();
  const shareTitle = sharedItem 
    ? `${sharedItem.name} at Dessert Factory @13`
    : `Dessert Factory @13 – MG Road, Vijayawada`;

  const shareText = sharedItem
    ? `Check out the ${sharedItem.name}${sharedItem.price ? ` (₹${sharedItem.price})` : ''} at Dessert Factory @13 in Vijayawada! 🍫 Rated 4.6★ by diners.\n🛵 Order online via Swiggy: ${PLACE_DETAILS.swiggyUrl}`
    : `Check out Dessert Factory @13 on MG Road, Vijayawada! 🍰 Rated 4.6★ with 84 reviews. Famous for viral Dubai Pistachio Chocolate, Apricot Delight, & gourmet desserts.\n🛵 Order online via Swiggy: ${PLACE_DETAILS.swiggyUrl}`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(appUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const instagramCaption = sharedItem
    ? `Satisfying my dessert cravings with ${sharedItem.name} at @DessertFactory13 on MG Road, Vijayawada! 🍨✨ Rated 4.6★ for a reason. Highly recommend checking them out!\n\n#DessertFactory13 #VijayawadaFoodies #DubaiChocolate #ApricotDelight #VijayawadaDesserts #Labbipet #SweetTooth`
    : `Visited Dessert Factory @13 in Labbipet, Vijayawada! 🍰 From viral Dubai Pistachio Kunafa chocolates to legendary Apricot Delight and cheesecakes, this spot is a must-visit! 🌟\n\n📍 MG Rd, beside Crocs, Vijayawada\n⭐ 4.6 / 5 (84 reviews)\n\n#DessertFactory13 #VijayawadaFoodies #VijayawadaEats #DubaiChocolate #ApricotDelight #DessertLovers #Labbipet`;

  const handleCopyCaption = async () => {
    const success = await copyToClipboard(instagramCaption);
    if (success) {
      setCaptionCopied(true);
      setTimeout(() => setCaptionCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: appUrl,
        });
      } catch (err) {
        console.log("Native share dismissed", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleHangoutInvite = () => {
    const inviteText = `Hey! Let's go to Dessert Factory @13 today! 🍨 They have the viral Dubai Kunafa Chocolate and authentic Apricot Delight. \n\n📍 MG Rd, beside Crocs, Labbipet, Vijayawada\n⏰ Open till 11 PM\nCheck their menu here: ${appUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(inviteText)}`, '_blank');
  };

  // Story card background styling based on theme
  const getThemeStyles = () => {
    switch (selectedTheme) {
      case 'pistachio':
        return 'from-emerald-950 via-teal-950 to-stone-950 border-emerald-500/30 text-emerald-50';
      case 'dark':
        return 'from-stone-950 via-neutral-900 to-amber-950 border-amber-500/30 text-amber-50';
      case 'apricot':
        return 'from-amber-950 via-orange-950 to-yellow-950 border-amber-400/40 text-orange-50';
      default:
        return 'from-stone-900 to-stone-950 border-stone-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbf9f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 leading-tight">
                {sharedItem ? `Share "${sharedItem.name}"` : 'Share Dessert Factory @13'}
              </h2>
              <p className="text-xs text-stone-500">Spread the sweetness with friends & social media</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Tab Controls */}
        <div className="px-6 pt-3 pb-1 border-b border-stone-100 bg-white">
          <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('quick')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                activeTab === 'quick' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Quick Share
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                activeTab === 'instagram' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Insta Story
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                activeTab === 'qr' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              QR Code
            </button>
            <button
              onClick={() => setActiveTab('hangout')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                activeTab === 'hangout' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Plan Hangout
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TAB 1: QUICK SHARE */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900">
                <p className="font-semibold text-amber-950 mb-0.5">Preview Message:</p>
                <p className="line-clamp-2 text-stone-700">{shareText}</p>
              </div>

              {/* Native share button if supported */}
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Open System Share Sheet</span>
                </button>
              )}

              {/* Social Channels Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* WhatsApp */}
                <a
                  href={createWhatsAppShareUrl(shareText, appUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-stone-800 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-xs font-semibold">WhatsApp</span>
                  <span className="text-[10px] text-stone-500">Direct message</span>
                </a>

                {/* Twitter / X */}
                <a
                  href={createTwitterShareUrl(shareText, appUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl text-stone-800 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                    <span className="font-bold text-sm">𝕏</span>
                  </div>
                  <span className="text-xs font-semibold">X (Twitter)</span>
                  <span className="text-[10px] text-stone-500">Post tweet</span>
                </a>

                {/* Facebook */}
                <a
                  href={createFacebookShareUrl(appUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 rounded-xl text-stone-800 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                    <span className="font-bold text-base">f</span>
                  </div>
                  <span className="text-xs font-semibold">Facebook</span>
                  <span className="text-[10px] text-stone-500">Share feed</span>
                </a>

                {/* Telegram */}
                <a
                  href={createTelegramShareUrl(shareText, appUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 rounded-xl text-stone-800 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <span className="text-xs font-semibold">Telegram</span>
                  <span className="text-[10px] text-stone-500">Send chat</span>
                </a>
              </div>

              {/* Copy Direct Link */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Direct Link</label>
                <div className="flex items-center gap-2 p-1.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 bg-transparent px-2.5 text-xs text-stone-700 outline-hidden font-mono"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      copied 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTAGRAM STORY STUDIO */}
          {activeTab === 'instagram' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Choose Aesthetic Theme:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedTheme('pistachio')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedTheme === 'pistachio' ? 'bg-emerald-900 text-emerald-100 font-semibold' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Pistachio
                  </button>
                  <button
                    onClick={() => setSelectedTheme('apricot')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedTheme === 'apricot' ? 'bg-amber-800 text-amber-100 font-semibold' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Apricot
                  </button>
                  <button
                    onClick={() => setSelectedTheme('dark')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedTheme === 'dark' ? 'bg-stone-900 text-white font-semibold' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Velvet Dark
                  </button>
                </div>
              </div>

              {/* Live Story Card Preview */}
              <div 
                ref={storyCanvasRef}
                className={`relative w-full aspect-[9/14] rounded-2xl overflow-hidden p-5 flex flex-col justify-between shadow-xl bg-gradient-to-b ${getThemeStyles()}`}
              >
                {/* Background Image with Scrim */}
                <img
                  src={storyCardImage}
                  alt="Dessert Story Card"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Vijayawada Must-Visit</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/40 text-amber-300 text-xs font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>4.6 · 84 Reviews</span>
                  </div>
                </div>

                {/* Center Content */}
                <div className="relative z-10 text-center my-auto py-4 flex flex-col items-center">
                  <div className="mb-2 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                    <BrandLogo size={56} />
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-amber-200/90 mb-1">Dessert Shop & Cafe</p>
                  <h3 className="font-serif-title text-2xl font-bold tracking-tight text-white mb-2 leading-tight">
                    {sharedItem ? sharedItem.name : PLACE_DETAILS.name}
                  </h3>
                  <p className="text-xs text-stone-300 max-w-xs mx-auto line-clamp-2">
                    {sharedItem?.description || "Famous for viral Dubai Pistachio Kunafa chocolate, authentic Apricot Delight, baked cheesecakes, burgers & pizzas."}
                  </p>
                  {sharedItem?.price && (
                    <div className="mt-3 inline-block px-3 py-1 bg-amber-500 text-stone-950 rounded-full text-xs font-bold shadow-md">
                      ₹{sharedItem.price}
                    </div>
                  )}
                </div>

                {/* Bottom Address Lockup */}
                <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-stone-300">
                  <div className="text-left">
                    <p className="font-semibold text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>MG Road, Labbipet</span>
                    </p>
                    <p className="text-[10px] text-stone-400">Beside Crocs & Balaji Towers</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-400/30">
                      Open till 11 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo Selector for Story */}
              <div>
                <span className="text-xs text-stone-500 block mb-1.5">Change Featured Photo:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Dubai Bar', url: '/src/assets/images/dubai_pistachio_chocolate_1791130956868.jpg' },
                    { name: 'Apricot', url: '/src/assets/images/apricot_delight_dessert_1791130974213.jpg' },
                    { name: 'Cheesecake', url: '/src/assets/images/lotus_biscoff_cheesecake_1791130986909.jpg' },
                    { name: 'Cafe Vibe', url: '/src/assets/images/dessert_cafe_ambience_1791131003996.jpg' },
                  ].map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStoryCardImage(img.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        storyCardImage === img.url ? 'border-amber-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-0 inset-x-0 bg-stone-950/70 text-[9px] text-white py-0.5 truncate text-center">
                        {img.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Instagram Caption Button */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCopyCaption}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-95 text-white font-medium text-xs rounded-xl shadow-xs transition-opacity cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{captionCopied ? 'Caption Copied!' : 'Copy Instagram Caption & Tags'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: QR CODE */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-stone-600">
                Show this QR code to friends or scan at the table to explore the complete menu & directions.
              </p>
              
              <div className="flex justify-center">
                <QRCodeDisplay value={appUrl} size={180} />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 text-left space-y-1">
                <p className="font-semibold text-stone-900">Dessert Factory @13 Quick Access</p>
                <p>• Plus Code: <span className="font-mono text-stone-800 font-medium">{PLACE_DETAILS.plusCode}</span></p>
                <p>• Direct Contact: <span className="font-mono text-stone-800 font-medium">{PLACE_DETAILS.phone}</span></p>
              </div>
            </div>
          )}

          {/* TAB 4: PLAN HANGOUT */}
          {activeTab === 'hangout' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>Invite Friends for a Dessert Run</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Send a prefilled WhatsApp hangout invite to your group chat with cafe details, location on MG Road, and closing time!
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs font-sans text-stone-700 italic">
                  "Hey! Let's go to Dessert Factory @13 today! 🍨 They have the viral Dubai Kunafa Chocolate and authentic Apricot Delight. MG Rd, beside Crocs. Open till 11 PM..."
                </div>
              </div>

              <button
                onClick={handleHangoutInvite}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Hangout Invite on WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
