'use client';

import React from 'react';

interface LoggingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logAction: (
    type: 'transport' | 'diet' | 'energy' | 'dilemma',
    label: string,
    scoreChange: number,
    shardChange: number
  ) => void;
}

interface ActivityTag {
  label: string;
  scoreChange: number;
  shardChange: number;
  icon: string;
  desc: string;
}

interface TagCategory {
  categoryName: string;
  type: 'transport' | 'diet' | 'energy';
  colorClass: string;
  items: ActivityTag[];
}

export default function LoggingDrawer({ isOpen, onClose, logAction }: LoggingDrawerProps) {
  const categories: TagCategory[] = [
    {
      categoryName: 'Transport',
      type: 'transport',
      colorClass: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
      items: [
        { label: 'Cycle Commute', scoreChange: 10, shardChange: 5, icon: '🚴', desc: 'Pedal powered travel' },
        { label: 'Electric Metro', scoreChange: 5, shardChange: 3, icon: '🚇', desc: 'Clean public transport' },
        { label: 'Solo Car Drive', scoreChange: -15, shardChange: 0, icon: '🚗', desc: 'High carbon footprint' },
      ],
    },
    {
      categoryName: 'Diet & Food',
      type: 'diet',
      colorClass: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
      items: [
        { label: 'Vegan Meal', scoreChange: 8, shardChange: 4, icon: '🌱', desc: '100% plant-based' },
        { label: 'Dairy Consumption', scoreChange: -2, shardChange: 1, icon: '🧀', desc: 'Moderate carbon food' },
        { label: 'Red Meat Dish', scoreChange: -12, shardChange: 0, icon: '🥩', desc: 'High methane emission' },
      ],
    },
    {
      categoryName: 'Energy Habits',
      type: 'energy',
      colorClass: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
      items: [
        { label: 'Eco Mode AC', scoreChange: 6, shardChange: 3, icon: '🌡️', desc: 'Energy saver thermostat' },
        { label: 'Left Devices On', scoreChange: -10, shardChange: 0, icon: '🔌', desc: 'Vampire power draw' },
      ],
    },
  ];

  const handleTagClick = (categoryType: 'transport' | 'diet' | 'energy', item: ActivityTag) => {
    logAction(categoryType, item.label, item.scoreChange, item.shardChange);
    // Visual feedback could go here (e.g. dynamic toast)
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900/90 border-l border-white/10 backdrop-blur-xl z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/45">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Log Carbon Action</h2>
            <p className="text-xs text-white/50 mt-1">Select an action to update your Eco Score & shards</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-white/40">
                {cat.categoryName}
              </h3>
              <div className="grid gap-3">
                {cat.items.map((item, itemIdx) => {
                  const isPositive = item.scoreChange > 0;
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleTagClick(cat.type, item)}
                      className="group text-left border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex items-center justify-between transition-all active:scale-95 duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-white/45 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1 font-mono">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isPositive
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/15 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {isPositive ? `+${item.scoreChange}` : item.scoreChange} Score
                        </span>
                        {item.shardChange > 0 && (
                          <span className="text-xs text-amber-300 flex items-center gap-0.5">
                            +{item.shardChange} 💎
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-950/45 text-center text-xs text-white/30">
          Your entries are written directly to the island's memory logs.
        </div>
      </div>
    </>
  );
}
