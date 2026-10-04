import React, { useState } from 'react';
import { X, Star, Upload, Check, Share2, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Review } from '../types';
import { createWhatsAppShareUrl, getAppShareUrl } from '../utils/shareUtils';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<Review | null>(null);

  if (!isOpen) return null;

  const availableTags = [
    "apricot delight",
    "cheese cake",
    "Dubai chocolate",
    "unique experience",
    "ambience",
    "burgers & pizzas",
    "sizzling brownie",
    "friendly staff"
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) {
      alert("Please provide your name and a brief review!");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      badge: "Customer Review",
      stats: "1 review · Verified diner",
      rating,
      timeAgo: "Just now",
      content: reviewContent.trim(),
      likes: 1,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setLastSubmittedReview(newReview);
    setIsSubmitted(true);
    onSubmitReview(newReview);
  };

  const handleShareReview = () => {
    if (!lastSubmittedReview) return;
    const text = `I just rated Dessert Factory @13 in Vijayawada ${lastSubmittedReview.rating}★! "${lastSubmittedReview.content}" 🍰 Check them out at MG Road!`;
    window.open(createWhatsAppShareUrl(text, getAppShareUrl()), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbf9f6]">
          <div>
            <h2 className="text-base font-semibold text-stone-900 leading-tight">
              {isSubmitted ? 'Review Published!' : 'Write a Review'}
            </h2>
            <p className="text-xs text-stone-500">Dessert Factory @13 · Labbipet, Vijayawada</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-serif-title font-bold text-stone-900">Thank you for your review!</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  Your feedback helps fellow dessert lovers in Vijayawada discover the best treats on MG Road.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-1 max-w-md mx-auto">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < (lastSubmittedReview?.rating || 5) ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                  <span className="font-semibold text-stone-800 ml-1">{lastSubmittedReview?.author}</span>
                </div>
                <p className="text-stone-700 italic">"{lastSubmittedReview?.content}"</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleShareReview}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Share My Review on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star rating selector */}
              <div className="text-center py-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Your Overall Rating
                </label>
                <div className="flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-115 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800 mt-1 block">
                  {rating === 5 ? 'Exceptional! 💖' : rating === 4 ? 'Very Good! 🍰' : rating === 3 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>

              {/* Author name */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravani Rao"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                />
              </div>

              {/* Tag Selection */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">What did you enjoy most?</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white font-medium shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Experience</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details of your experience, flavor notes on Apricot Delight or Dubai Chocolate, the ambiance, service..."
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 focus:bg-white leading-relaxed resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Publish Review</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
