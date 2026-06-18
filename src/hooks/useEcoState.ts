import { useState, useEffect } from 'react';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'transport' | 'diet' | 'energy' | 'dilemma';
  label: string;
  scoreChange: number;
  shardChange: number;
}

const DEFAULT_SCORE = 50;
const DEFAULT_SHARDS = 10;

export function useEcoState() {
  const [ecoScore, setEcoScore] = useState<number>(DEFAULT_SCORE);
  const [ecoShards, setEcoShards] = useState<number>(DEFAULT_SHARDS);
  const [unlockedUpgrades, setUnlockedUpgrades] = useState<string[]>([]);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [currentDilemmaId, setCurrentDilemmaId] = useState<string | null>(null);
  const [dilemmaCompleted, setDilemmaCompleted] = useState<boolean>(false);
  const [dilemmaChoiceIdx, setDilemmaChoiceIdx] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedScore = localStorage.getItem('eco_score');
      const storedShards = localStorage.getItem('eco_shards');
      const storedUpgrades = localStorage.getItem('eco_upgrades');
      const storedHistory = localStorage.getItem('eco_history');
      const storedDilemmaId = localStorage.getItem('eco_dilemma_id');
      const storedDilemmaCompleted = localStorage.getItem('eco_dilemma_completed');
      const storedDilemmaChoiceIdx = localStorage.getItem('eco_dilemma_choice_idx');

      if (storedScore !== null) setEcoScore(Number(storedScore));
      if (storedShards !== null) setEcoShards(Number(storedShards));
      if (storedUpgrades !== null) setUnlockedUpgrades(JSON.parse(storedUpgrades));
      if (storedHistory !== null) setHistory(JSON.parse(storedHistory));
      if (storedDilemmaId !== null) setCurrentDilemmaId(storedDilemmaId);
      if (storedDilemmaCompleted !== null) setDilemmaCompleted(storedDilemmaCompleted === 'true');
      if (storedDilemmaChoiceIdx !== null) setDilemmaChoiceIdx(Number(storedDilemmaChoiceIdx));
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('eco_score', String(ecoScore));
      localStorage.setItem('eco_shards', String(ecoShards));
      localStorage.setItem('eco_upgrades', JSON.stringify(unlockedUpgrades));
      localStorage.setItem('eco_history', JSON.stringify(history));
      if (currentDilemmaId !== null) {
        localStorage.setItem('eco_dilemma_id', currentDilemmaId);
      } else {
        localStorage.removeItem('eco_dilemma_id');
      }
      localStorage.setItem('eco_dilemma_completed', String(dilemmaCompleted));
      if (dilemmaChoiceIdx !== null) {
        localStorage.setItem('eco_dilemma_choice_idx', String(dilemmaChoiceIdx));
      } else {
        localStorage.removeItem('eco_dilemma_choice_idx');
      }
    } catch (e) {
      console.error('Failed to save state to local storage:', e);
    }
  }, [ecoScore, ecoShards, unlockedUpgrades, history, currentDilemmaId, dilemmaCompleted, dilemmaChoiceIdx, isLoaded]);

  const logAction = (
    type: 'transport' | 'diet' | 'energy' | 'dilemma',
    label: string,
    scoreChange: number,
    shardChange: number
  ) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      type,
      label,
      scoreChange,
      shardChange,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 50)); // Keep last 50 events
    setEcoScore((prev) => Math.max(0, Math.min(100, prev + scoreChange)));
    setEcoShards((prev) => Math.max(0, prev + shardChange));
    return newEntry;
  };

  const purchaseUpgrade = (id: string, cost: number): boolean => {
    if (ecoShards >= cost && !unlockedUpgrades.includes(id)) {
      setEcoShards((prev) => prev - cost);
      setUnlockedUpgrades((prev) => [...prev, id]);
      
      // Log store action
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        type: 'energy',
        label: `Unlocked: ${id.replace('-', ' ')}`,
        scoreChange: 5, // Unlocking upgrades gives a small eco boost!
        shardChange: -cost,
      };
      setHistory((prev) => [newEntry, ...prev]);
      setEcoScore((prev) => Math.max(0, Math.min(100, prev + 5)));
      return true;
    }
    return false;
  };

  const resetState = () => {
    setEcoScore(DEFAULT_SCORE);
    setEcoShards(DEFAULT_SHARDS);
    setUnlockedUpgrades([]);
    setHistory([]);
    setCurrentDilemmaId(null);
    setDilemmaCompleted(false);
    setDilemmaChoiceIdx(null);
    try {
      localStorage.removeItem('eco_score');
      localStorage.removeItem('eco_shards');
      localStorage.removeItem('eco_upgrades');
      localStorage.removeItem('eco_history');
      localStorage.removeItem('eco_dilemma_id');
      localStorage.removeItem('eco_dilemma_completed');
      localStorage.removeItem('eco_dilemma_choice_idx');
    } catch (e) {
      console.error(e);
    }
  };

  return {
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
    setEcoScore, // expose for dev testing
  };
}
