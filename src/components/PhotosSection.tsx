import React, { useState } from 'react';
import { Camera, Eye, Share2, X, Sparkles, Video, Compass } from 'lucide-react';
import { PhotoItem } from '../types';
import { PHOTOS_LIST } from '../data/mockData';
import { IMAGES, resolveImagePath } from '../assets/images';
import { createWhatsAppShareUrl, getAppShareUrl } from '../utils/shareUtils';

interface PhotosSectionProps {
  onSharePhoto?: (photo: PhotoItem) => void;
  photos?: PhotoItem[];
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({ 
  onSharePhoto,
  photos = PHOTOS_LIST,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'vibe', label: 'Vibe & Seating' },
    { id: 'menu', label: 'Menu' },
    { id: 'owner', label: 'By Owner' },
    { id: '360', label: 'Street View & 360°' },
  ];

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleShareCurrentPhoto = (photo: PhotoItem) => {
    const text = `Look at this delicious treat from Dessert Factory @13 in Vijayawada: "${photo.title}"! 🍰\nMG Rd, beside Crocs, Labbipet.`;
    window.open(createWhatsAppShareUrl(text, getAppShareUrl()), '_blank');
  };

  return (
    <section id="photos" className="space-y-6">
      {/* Header & Filter Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="font-semibold text-stone-900 text-base">Photos & Videos</h2>
              <p className="text-xs text-stone-500">Visual highlights from diners, guides & staff</p>
            </div>
          </div>
          <span className="text-xs text-stone-500">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-stone-100 pt-3">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer shadow-2xs hover:shadow-md transition-all"
          >
            <img
              src={resolveImagePath(photo.url)}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = IMAGES.hero;
              }}
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
                <p className="text-[10px] text-stone-300">By {photo.author || 'Visitor'}</p>
              </div>
            </div>

            {/* 360 Badge */}
            {photo.category === '360' && (
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] rounded flex items-center gap-1 font-mono">
                <Compass className="w-3 h-3 text-amber-300" />
                <span>360°</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col">
            {/* Lightbox header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 text-white">
              <div>
                <h4 className="text-sm font-semibold">{selectedPhoto.title}</h4>
                <p className="text-xs text-stone-400">Dessert Factory @13 · {selectedPhoto.author}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image display */}
            <div className="max-h-[65vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={resolveImagePath(selectedPhoto.url)}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = IMAGES.hero;
                }}
              />
            </div>

            {/* Footer with share */}
            <div className="p-4 border-t border-stone-800 flex items-center justify-between bg-stone-950">
              <span className="text-xs text-stone-400">
                MG Rd, beside Crocs, Labbipet, Vijayawada
              </span>
              <button
                onClick={() => handleShareCurrentPhoto(selectedPhoto)}
                className="flex items-center gap-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share this Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
