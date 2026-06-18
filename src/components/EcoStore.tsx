'use client';

import React, { useState } from 'react';

interface StoreItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
  description: string;
  effect: string;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: 'lush-forest',
    name: 'Lush Forest Area',
    cost: 15,
    icon: '🌳',
    description: 'Grow a cluster of ancient trees to increase oxygen production and absorb carbon.',
    effect: 'Paints more green trees on the island background. Gives +5 Eco Score.',
  },
  {
    id: 'wind-turbine',
    name: 'Miniature Wind Turbine',
    cost: 25,
    icon: '💨',
    description: 'Erect an elegant, high-efficiency wind turbine on the island cliff.',
    effect: 'Mounts a spinning wind turbine. Speed scales with score. Gives +5 Eco Score.',
  },
  {
    id: 'solar-panel',
    name: 'Solar Panel Array',
    cost: 40,
    icon: '☀️',
    description: 'Lay down a modern grid of photovoltaics capturing daily sunbeams.',
    effect: 'Mounts clean solar panels with pulsing highlights. Gives +5 Eco Score.',
  },
  {
    id: 'eco-dome',
    name: 'Eco-Dome Shield',
    cost: 60,
    icon: '🛡️',
    description: 'Surround the island in a shimmering containment shield to block pollution.',
    effect: 'Encloses the island in a pulsing protective dome. Gives +5 Eco Score.',
  },
];

interface EcoStoreProps {
  ecoShards: number;
  unlockedUpgrades: string[];
  purchaseUpgrade: (id: string, cost: number) => boolean;
}

export default function EcoStore({ ecoShards, unlockedUpgrades, purchaseUpgrade }: EcoStoreProps) {
  const [alertInfo, setAlertInfo] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const handlePurchase = (id: string, cost: number, name: string) => {
    const success = purchaseUpgrade(id, cost);
    if (success) {
      setAlertInfo({ message: `Successfully purchased and installed ${name}!`, type: 'success' });
      setTimeout(() => setAlertInfo(null), 4000);
    } else {
      setAlertInfo({
        message: `Insufficient shards! "${name}" costs ${cost} 💎 but you only have ${ecoShards} 💎. Fulfill daily dilemmas or log carbon actions to earn shards.`,
        type: 'error',
      });
      setTimeout(() => setAlertInfo(null), 5000);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Virtual Shop</span>
          <h3 className="text-lg font-bold text-white tracking-tight">Eco Upgrade Store</h3>
        </div>
        <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-2xl shadow-lg">
          <span className="text-xl">💎</span>
          <div className="flex flex-col items-start leading-none">
            <span className="text-lg font-extrabold text-amber-300 font-mono">{ecoShards}</span>
            <span className="text-[8px] text-white/50 uppercase tracking-widest font-semibold mt-0.5">Eco-Shards</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {alertInfo && (
        <div
          role="alert"
          className={`mb-6 p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs leading-relaxed transition-all duration-300 ${
            alertInfo.type === 'error'
              ? 'border-red-500/25 bg-red-500/10 text-red-300'
              : 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
          }`}
        >
          <div className="flex gap-2.5 items-center">
            <span className="text-lg leading-none shrink-0">
              {alertInfo.type === 'error' ? '⚠️' : '🎉'}
            </span>
            <div>{alertInfo.message}</div>
          </div>
          <button
            type="button"
            onClick={() => setAlertInfo(null)}
            className="text-white/40 hover:text-white/70 font-bold ml-2 shrink-0 cursor-pointer text-sm focus:ring-2 focus:outline-none focus:ring-red-400"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      )}

      {/* Grid items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STORE_ITEMS.map((item) => {
          const isUnlocked = unlockedUpgrades.includes(item.id);
          
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 ${
                isUnlocked
                  ? 'border-emerald-500/35 bg-emerald-950/10'
                  : 'border-white/5 bg-white/5'
              }`}
            >
              <div>
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-2">
                  <span 
                    role="img" 
                    aria-label={`${item.name} icon`}
                    className="text-2xl bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center border border-white/5"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-[9px] text-amber-300 font-bold font-mono">
                      Cost: {item.cost} 💎
                    </span>
                  </div>
                </div>

                <p className="text-white/60 text-xs leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="text-[10px] text-white/40 italic mb-4 leading-normal">
                  Effect: {item.effect}
                </div>
              </div>

              {/* Action Button */}
              {isUnlocked ? (
                <div 
                  className="w-full text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-xl"
                  aria-label={`${item.name} is unlocked and active`}
                >
                  ✓ Installed & Active
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePurchase(item.id, item.cost, item.name)}
                  className="w-full text-center text-xs font-bold py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-lg shadow-amber-400/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:ring-2 focus:outline-none focus:ring-amber-400 cursor-pointer"
                  aria-label={`Purchase ${item.name} upgrade for ${item.cost} gems`}
                >
                  Purchase Upgrade
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
