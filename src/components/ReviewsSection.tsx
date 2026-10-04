import React, { useState } from 'react';
import { Star, Sparkles, ThumbsUp, Share2, Filter, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS_DATA } from '../data/mockData';
import { createWhatsAppShareUrl, getAppShareUrl, copyToClipboard } from '../utils/shareUtils';

interface ReviewsSectionProps {
  onOpenWriteReview: () => void;
  additionalReviews?: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenWriteReview,
  additionalReviews = []
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [reviewsList, setReviewsList] = useState<Review[]>([...additionalReviews, ...REVIEWS_DATA]);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [copiedReviewId, setCopiedReviewId] = useState<string | null>(null);

  // Sync additionalReviews
  React.useEffect(() => {
    setReviewsList([...additionalReviews, ...REVIEWS_DATA]);
  }, [additionalReviews]);

  const filterTags = [
    { name: 'All', count: 84 },
    { name: 'Dubai chocolate', count: 14 },
    { name: 'apricot delight', count: 2 },
    { name: 'cheese cake', count: 3 },
    { name: 'unique experience', count: 2 },
    { name: 'ambience', count: 2 },
    { name: 'burgers & pizzas', count: 4 },
  ];

  const handleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShareReview = async (review: Review) => {
    const text = `Review for Dessert Factory @13 (${review.rating}★ by ${review.author}):\n"${review.content}"\n\nVisit Dessert Factory @13 on MG Road, Vijayawada!`;
    window.open(createWhatsAppShareUrl(text, getAppShareUrl()), '_blank');
  };

  const handleCopyReviewText = async (review: Review) => {
    const text = `"${review.content}" — ${review.author} on Dessert Factory @13 (4.6★, Vijayawada)`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedReviewId(review.id);
      setTimeout(() => setCopiedReviewId(null), 2000);
    }
  };

  // Filter reviews
  const filteredReviews = reviewsList.filter((rev) => {
    if (selectedTag === 'All') return true;
    return rev.tags?.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  return (
    <section id="reviews" className="space-y-6">
      {/* Review summary top block */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-stone-100">
          {/* Big Rating Block */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="text-4xl font-serif-title font-bold text-stone-900 leading-none">4.6</span>
              <div className="flex items-center gap-0.5 text-amber-500 mt-1.5 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= 4 ? 'fill-current' : s === 5 ? 'fill-amber-300' : 'text-stone-300'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-1">84 reviews</p>
            </div>

            {/* Rating distribution breakdown */}
            <div className="space-y-1.5 min-w-[140px] text-xs font-mono text-stone-500 border-l border-stone-200 pl-4">
              {[
                { stars: 5, pct: '82%', count: 68 },
                { stars: 4, pct: '12%', count: 10 },
                { stars: 3, pct: '4%', count: 3 },
                { stars: 2, pct: '1%', count: 1 },
                { stars: 1, pct: '2%', count: 2 },
              ].map(({ stars, pct, count }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-2">{stars}</span>
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div style={{ width: pct }} className="h-full bg-amber-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-stone-400 w-4 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write a review button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={onOpenWriteReview}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Write a review</span>
            </button>
          </div>
        </div>

        {/* AI Gemini Review Summary Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-yellow-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Review summary</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
              Summarized with Gemini · +47
            </span>
          </div>

          <p className="text-xs text-stone-800 leading-relaxed">
            Diners like this cafe's delicious desserts, especially the{" "}
            <span className="font-semibold text-amber-950">Dubai-style options</span>, and also highlight the tasty{" "}
            <span className="font-semibold text-amber-950">burgers and pizzas</span>. They also mention the reasonable prices and good value for money. Guests appreciate the friendly staff and hygienic atmosphere.
          </p>
        </div>

        {/* Filter tags bar (Button segmented controls per design guidelines) */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Sort & Filter Mentions</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterTags.map((tag) => {
              const isSelected = selectedTag === tag.name;
              return (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span>{tag.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                    {tag.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          const isLiked = likedReviews[review.id];
          const isCopied = copiedReviewId === review.id;

          return (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3 transition-all hover:border-amber-200"
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 font-serif-title font-bold text-sm flex items-center justify-center border border-stone-200">
                    {review.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 leading-tight">
                      {review.author}
                    </h4>
                    <p className="text-[11px] text-stone-500">{review.stats}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-400">{review.timeAgo}</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-stone-200'}`}
                  />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                {review.content}
              </p>

              {/* Photos if any */}
              {review.photos && review.photos.length > 0 && (
                <div className="flex gap-2 pt-1 overflow-x-auto pb-1">
                  {review.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt="Diner review attachment"
                      className="w-20 h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}

              {/* Tag mentions */}
              {review.tags && review.tags.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-stone-500 pt-1">
                  <span>Mentions:</span>
                  {review.tags.map((t, idx) => (
                    <span key={idx} className="text-stone-700 font-medium">
                      {t}{idx < (review.tags?.length || 0) - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              )}

              {/* Owner Response if present */}
              {review.responseFromOwner && (
                <div className="mt-3 p-3 bg-stone-50 rounded-xl border-l-3 border-amber-600 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-stone-900">Response from Dessert Factory @13 (Owner)</span>
                    <span className="text-stone-400">{review.responseFromOwner.date}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-normal">{review.responseFromOwner.text}</p>
                </div>
              )}

              {/* Actions Footer: Like, Share Review, Copy text */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    isLiked
                      ? 'bg-amber-50 text-amber-800 font-semibold'
                      : 'hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{review.likes + (isLiked ? 1 : 0)} Likes</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyReviewText(review)}
                    className="flex items-center gap-1 py-1 px-2 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer text-stone-600"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleShareReview(review)}
                    className="flex items-center gap-1 py-1 px-2.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 font-medium transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share review</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
