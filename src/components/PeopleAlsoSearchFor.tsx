import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { COMPETITORS } from '../data/mockData';

export const PeopleAlsoSearchFor: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div>
          <h3 className="font-semibold text-stone-900 text-base">People also search for</h3>
          <p className="text-xs text-stone-500">Other popular dessert destinations in Vijayawada</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPETITORS.map((place, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors bg-stone-50/50 flex flex-col justify-between"
          >
            <div>
              <h4 className="font-semibold text-stone-900 text-xs truncate">{place.name}</h4>
              <div className="flex items-center gap-1 text-amber-600 text-xs mt-1 font-semibold">
                <Star className="w-3 h-3 fill-current" />
                <span>{place.rating}</span>
                <span className="text-stone-400 font-normal">({place.reviewCount})</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">{place.category}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-200 flex items-center text-[10px] text-stone-500 gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>Vijayawada Area</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
