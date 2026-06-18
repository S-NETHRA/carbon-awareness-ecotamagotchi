'use client';

import React from 'react';
import { LogEntry } from '../hooks/useEcoState';

interface HistoryPanelProps {
  history: LogEntry[];
  resetState: () => void;
}

export default function HistoryPanel({ history, resetState }: HistoryPanelProps) {
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '';
    }
  };

  const getIcon = (type: 'transport' | 'diet' | 'energy' | 'dilemma') => {
    switch (type) {
      case 'transport':
        return '🚴';
      case 'diet':
        return '🥗';
      case 'energy':
        return '⚡';
      case 'dilemma':
        return '🔮';
      default:
        return '📝';
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Ledger</span>
          <h3 className="text-lg font-bold text-white tracking-tight">Eco Action History</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to clear all data and reset the island?')) {
              resetState();
            }
          }}
          className="text-xs text-red-400 hover:text-red-300 font-semibold bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl transition-all active:scale-95 focus:ring-2 focus:outline-none focus:ring-red-400 cursor-pointer"
          aria-label="Reset the island status and clear all history entries"
        >
          Reset Island
        </button>
      </div>

      {/* Log list */}
      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/40">
            <span className="text-4xl mb-2">📜</span>
            <div className="font-semibold text-sm">No actions recorded yet</div>
            <p className="text-xs mt-1 max-w-[240px]">
              Use the "Log Action" drawer or resolve a daily dilemma to write entries.
            </p>
          </div>
        ) : (
          history.map((entry) => {
            const isPositive = entry.scoreChange > 0;
            return (
              <div
                key={entry.id}
                className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <span 
                    aria-hidden="true"
                    className="text-xl bg-white/5 w-9 h-9 rounded-xl flex items-center justify-center border border-white/5"
                  >
                    {getIcon(entry.type)}
                  </span>
                  <div>
                    <div className="font-semibold text-white text-xs">{entry.label}</div>
                    <div className="text-[10px] text-white/45 mt-0.5">{formatTime(entry.timestamp)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                  {entry.scoreChange !== 0 && (
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md ${
                        isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {isPositive ? `+${entry.scoreChange}` : entry.scoreChange}
                    </span>
                  )}
                  {entry.shardChange !== 0 && (
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md ${
                        entry.shardChange > 0 ? 'bg-amber-400/10 text-amber-300' : 'bg-red-500/10 text-red-300'
                      }`}
                    >
                      {entry.shardChange > 0 ? `+${entry.shardChange}` : entry.shardChange} 💎
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
