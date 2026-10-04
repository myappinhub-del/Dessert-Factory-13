import React, { useState } from 'react';
import { Clock, Info, Activity } from 'lucide-react';
import { POPULAR_HOURS_DATA } from '../data/mockData';

export const PopularTimes: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Sundays');
  const [activeHourIndex, setActiveHourIndex] = useState<number | null>(14); // 8 PM default peak

  const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-700" />
          <h3 className="font-semibold text-stone-900 text-base">Popular times</h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-amber-600"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live status badge */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live: Less busy than usual</span>
        </div>
        <span className="text-stone-400">·</span>
        <span className="text-stone-500">Usually a little wait between 7:30 PM – 9:00 PM</span>
      </div>

      {/* Hourly Bar Chart */}
      <div className="pt-4">
        <div className="h-32 flex items-end justify-between gap-1 sm:gap-2 px-1 pb-2 border-b border-stone-200">
          {POPULAR_HOURS_DATA.map((item, idx) => {
            const isHovered = activeHourIndex === idx;
            const isPeak = item.percentage >= 80;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveHourIndex(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 bg-stone-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                    <span className="font-semibold">{item.time}</span>: {item.percentage}% ({item.label})
                  </div>
                )}
                
                {/* Bar */}
                <div
                  style={{ height: `${Math.max(4, item.percentage)}%` }}
                  className={`w-full max-w-[14px] rounded-t-sm transition-all duration-200 ${
                    isHovered
                      ? 'bg-amber-600'
                      : isPeak
                      ? 'bg-amber-500'
                      : item.percentage > 30
                      ? 'bg-amber-300'
                      : 'bg-stone-200'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Time X-Axis Markers matching the prompt: 6a, 9a, 12p, 3p, 6p, 9p */}
        <div className="flex justify-between text-[11px] text-stone-400 pt-2 px-2 font-mono">
          <span>6a</span>
          <span>9a</span>
          <span>12p</span>
          <span>3p</span>
          <span>6p</span>
          <span>9p</span>
          <span>11p</span>
        </div>
      </div>

      {/* Selected Hour Details */}
      {activeHourIndex !== null && (
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between text-stone-600">
          <div>
            <span className="font-semibold text-stone-900">{POPULAR_HOURS_DATA[activeHourIndex].time}</span>:{" "}
            <span>{POPULAR_HOURS_DATA[activeHourIndex].label}</span>
          </div>
          <span className="text-[11px] text-stone-400">People typically spend 35–50 min here</span>
        </div>
      )}
    </div>
  );
};
