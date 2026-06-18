'use client';

import React, { useEffect, useState } from 'react';

interface DilemmaOption {
  text: string;
  subtext: string;
  scoreChange: number;
  shardChange: number;
  label: string;
}

interface Dilemma {
  id: string;
  title: string;
  scenario: string;
  icon: string;
  options: DilemmaOption[];
}

const DILEMMAS: Dilemma[] = [
  {
    id: 'commute',
    title: 'The Rain Commute',
    icon: '🌧️',
    scenario: 'Dark rain clouds gather just as you leave for work. Your bus stop is a 10-minute walk away, while a taxi can pick you up right at your doorstep.',
    options: [
      {
        text: 'Walk & take the bus',
        subtext: 'Get slightly damp but support shared green transit.',
        scoreChange: 12,
        shardChange: 8,
        label: 'Resolved Dilemma: Chose Bus in Rain',
      },
      {
        text: 'Call a private taxi',
        subtext: 'Stay perfectly dry but add emissions from a solo ride.',
        scoreChange: -10,
        shardChange: 0,
        label: 'Resolved Dilemma: Chose Taxi in Rain',
      },
    ],
  },
  {
    id: 'protein',
    title: 'Protein Shopping',
    icon: '🛒',
    scenario: 'You are planning dinner. A locally-grown organic lentil pack sits on the shelf next to a premium cuts steak marked down 30% on clearance.',
    options: [
      {
        text: 'Buy the organic lentils',
        subtext: 'A zero-emission plant protein feast.',
        scoreChange: 10,
        shardChange: 6,
        label: 'Resolved Dilemma: Lentils for Dinner',
      },
      {
        text: 'Buy the clearance steak',
        subtext: 'High methane footprints, but a juicy markdown price.',
        scoreChange: -12,
        shardChange: 0,
        label: 'Resolved Dilemma: Steak Dinner',
      },
    ],
  },
  {
    id: 'office-temp',
    title: 'The Office Chill',
    icon: '🥶',
    scenario: 'The office thermostat is reading 19°C, and you feel chilly. You can crank up the central heating or grab the wool sweater sitting in your backpack.',
    options: [
      {
        text: 'Wear the wool sweater',
        subtext: 'Insulate naturally without carbon-intensive heat.',
        scoreChange: 8,
        shardChange: 5,
        label: 'Resolved Dilemma: Sweater Over Heater',
      },
      {
        text: 'Turn up the thermostat',
        subtext: 'Instant warmth at the cost of electricity load.',
        scoreChange: -8,
        shardChange: 0,
        label: 'Resolved Dilemma: Cranked Office Heater',
      },
    ],
  },
  {
    id: 'takeout',
    title: 'Takeout Cutlery',
    icon: '🥡',
    scenario: 'You order takeout food. The delivery app prompts you with a checkbox: "Include single-use plastic cutlery and wet wipes for free?".',
    options: [
      {
        text: 'Decline single-use plastics',
        subtext: 'Use your washable metal forks at home.',
        scoreChange: 6,
        shardChange: 4,
        label: 'Resolved Dilemma: Refused Plastic Cutlery',
      },
      {
        text: 'Include the cutlery pack',
        subtext: 'Convenience of no washing, but adds landfill plastic.',
        scoreChange: -6,
        shardChange: 0,
        label: 'Resolved Dilemma: Accepted Plastic Cutlery',
      },
    ],
  },
];

interface DilemmaCardProps {
  currentDilemmaId: string | null;
  dilemmaCompleted: boolean;
  dilemmaChoiceIdx: number | null;
  setCurrentDilemmaId: (id: string | null) => void;
  setDilemmaCompleted: (completed: boolean) => void;
  setDilemmaChoiceIdx: (idx: number | null) => void;
  logAction: (
    type: 'transport' | 'diet' | 'energy' | 'dilemma',
    label: string,
    scoreChange: number,
    shardChange: number
  ) => void;
}

export default function DilemmaCard({
  currentDilemmaId,
  dilemmaCompleted,
  dilemmaChoiceIdx,
  setCurrentDilemmaId,
  setDilemmaCompleted,
  setDilemmaChoiceIdx,
  logAction,
}: DilemmaCardProps) {
  const [dilemma, setDilemma] = useState<Dilemma | null>(null);

  // Load current dilemma
  useEffect(() => {
    if (!currentDilemmaId) {
      // Pick random
      const randomDilemma = DILEMMAS[Math.floor(Math.random() * DILEMMAS.length)];
      setCurrentDilemmaId(randomDilemma.id);
      setDilemma(randomDilemma);
      setDilemmaCompleted(false);
      setDilemmaChoiceIdx(null);
    } else {
      const found = DILEMMAS.find((d) => d.id === currentDilemmaId);
      if (found) {
        setDilemma(found);
      } else {
        // Fallback
        setDilemma(DILEMMAS[0]);
      }
    }
  }, [currentDilemmaId, setCurrentDilemmaId, setDilemmaCompleted, setDilemmaChoiceIdx]);

  const handleSelectOption = (idx: number) => {
    if (dilemmaCompleted || !dilemma) return;
    
    setDilemmaChoiceIdx(idx);
    const option = dilemma.options[idx];
    
    // Log the choice
    logAction('dilemma', option.label, option.scoreChange, option.shardChange);
    setDilemmaCompleted(true);
  };

  const handleNextDilemma = () => {
    // Pick a different dilemma
    const currentIdx = DILEMMAS.findIndex((d) => d.id === currentDilemmaId);
    let nextIdx = (currentIdx + 1) % DILEMMAS.length;
    if (nextIdx === -1) nextIdx = 0;
    
    const nextDilemma = DILEMMAS[nextIdx];
    setCurrentDilemmaId(nextDilemma.id);
    setDilemma(nextDilemma);
    setDilemmaCompleted(false);
    setDilemmaChoiceIdx(null);
  };

  if (!dilemma) return null;

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center border border-indigo-500/15">
          {dilemma.icon}
        </span>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">Daily RPG Dilemma</span>
          <h3 className="text-lg font-bold text-white leading-tight">{dilemma.title}</h3>
        </div>
      </div>

      <p className="text-white/75 text-sm leading-relaxed mb-6">
        {dilemma.scenario}
      </p>

      <div className="space-y-3">
        {dilemma.options.map((opt, idx) => {
          const isSelected = dilemmaChoiceIdx === idx;
          const isPositive = opt.scoreChange > 0;
          
          return (
            <button
              key={idx}
              disabled={dilemmaCompleted}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                dilemmaCompleted
                  ? isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                    : 'border-white/5 bg-white/5 opacity-40 text-white/50'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 text-white'
              }`}
            >
              <div className="pr-4">
                <div className="font-bold text-sm">{opt.text}</div>
                <div className="text-xs text-white/50 mt-1">{opt.subtext}</div>
              </div>
              <div className="flex flex-col items-end gap-1 font-mono shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isPositive ? `+${opt.scoreChange}` : opt.scoreChange} Score
                </span>
                {opt.shardChange > 0 && (
                  <span className="text-xs text-amber-300">+{opt.shardChange} 💎</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {dilemmaCompleted && (
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in">
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Dilemma completed! Shards awarded.
          </div>
          <button
            onClick={handleNextDilemma}
            className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            Load Next Dilemma ➔
          </button>
        </div>
      )}
    </div>
  );
}
