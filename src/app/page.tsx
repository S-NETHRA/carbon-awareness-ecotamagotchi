'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useEcoState } from '@/hooks/useEcoState';
import VirtualIsland from '@/components/VirtualIsland';
import LoggingDrawer from '@/components/LoggingDrawer';
import DilemmaCard from '@/components/DilemmaCard';
import EcoStore from '@/components/EcoStore';
import VoiceOfIsland from '@/components/VoiceOfIsland';
import HistoryPanel from '@/components/HistoryPanel';
import AqiWidget from '@/components/AqiWidget';

// Dynamically import AnalyticsChart to avoid SSR hydration warnings (since Recharts measures DOM elements)
const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] flex items-center justify-center bg-slate-900/40 rounded-3xl border border-white/10 p-6 backdrop-blur-md">
      <div className="text-white/40 text-xs tracking-wider animate-pulse uppercase font-semibold">
        Generating Analytics Engine...
      </div>
    </div>
  ),
});

export default function Home() {
  const {
    ecoScore,
    ecoShards,
    unlockedUpgrades,
    history,
    currentDilemmaId,
    dilemmaCompleted,
    dilemmaChoiceIdx,
    isLoaded,
    logAction,
    purchaseUpgrade,
    setCurrentDilemmaId,
    setDilemmaCompleted,
    setDilemmaChoiceIdx,
    resetState,
  } = useEcoState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <span className="text-sm font-semibold tracking-wider text-white/60 uppercase animate-pulse">
            Syncing Ecosystem...
          </span>
        </div>
      </div>
    );
  }

  const isHigh = ecoScore >= 70;
  const isLow = ecoScore < 40;

  // Global background depending on score status
  let bgClass = 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950';
  if (isHigh) {
    bgClass = 'bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950';
  } else if (isLow) {
    bgClass = 'bg-gradient-to-b from-slate-950 via-amber-950/30 to-slate-950';
  }

  return (
    <div className={`min-h-screen text-slate-100 ${bgClass} transition-colors duration-1000 pb-16`}>
      {/* Navbar Header */}
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">🏝️</span>
            <div>
              <h1 className="font-extrabold text-white leading-none tracking-tight text-sm sm:text-base">EcoTamagotchi</h1>
              <span className="text-[9px] text-white/40 tracking-wider font-semibold uppercase mt-0.5 block">
                Gamified Carbon Keeper
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Shard widget */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs text-amber-300">
              <span>💎</span>
              <span className="font-bold">{ecoShards}</span>
            </div>

            {/* Dynamic Real-Time AQI Fetch Component */}
            <AqiWidget />

            {/* CTA action */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2 px-3 sm:px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:ring-2 focus:outline-none focus:ring-emerald-400"
              aria-label="Open emission logging drawer"
            >
              + Log
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left column - Visual Island & AI Agent */}
          <div className="lg:col-span-7 space-y-6">
            {/* Ecosystem Island Canvas */}
            <VirtualIsland ecoScore={ecoScore} unlockedUpgrades={unlockedUpgrades} />

            {/* AI Voice Bubble */}
            <VoiceOfIsland ecoScore={ecoScore} history={history} />
          </div>

          {/* Right column - Store, RPG Dilemma, Logs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daily Dilemma Game Card */}
            <DilemmaCard
              currentDilemmaId={currentDilemmaId}
              dilemmaCompleted={dilemmaCompleted}
              dilemmaChoiceIdx={dilemmaChoiceIdx}
              setCurrentDilemmaId={setCurrentDilemmaId}
              setDilemmaCompleted={setDilemmaCompleted}
              setDilemmaChoiceIdx={setDilemmaChoiceIdx}
              logAction={logAction}
            />

            {/* Eco Store */}
            <EcoStore
              ecoShards={ecoShards}
              unlockedUpgrades={unlockedUpgrades}
              purchaseUpgrade={purchaseUpgrade}
            />

            {/* Logs History Panel */}
            <HistoryPanel history={history} resetState={resetState} />
          </div>
        </div>

        {/* Analytics Section - Responsive Recharts LineChart */}
        <div className="w-full">
          <AnalyticsChart history={history} />
        </div>
      </main>

      {/* Side Slide-out Logging Drawer */}
      <LoggingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        logAction={logAction}
      />
    </div>
  );
}

