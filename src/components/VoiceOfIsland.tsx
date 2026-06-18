'use client';

import React, { useEffect, useState } from 'react';
import { LogEntry } from '../hooks/useEcoState';

interface VoiceOfIslandProps {
  ecoScore: number;
  history: LogEntry[];
}

export default function VoiceOfIsland({ ecoScore, history }: VoiceOfIslandProps) {
  const [speech, setSpeech] = useState<string>('Welcome to your island! Let\'s log some actions to save our climate.');
  const [avatarExpression, setAvatarExpression] = useState<string>('😊');
  const [bubbleColor, setBubbleColor] = useState<string>('border-indigo-500/20 bg-indigo-950/20 text-indigo-200');

  useEffect(() => {
    // Determine tone based on score
    const isHigh = ecoScore >= 70;
    const isLow = ecoScore < 40;

    // Pick avatar face
    if (isHigh) {
      setAvatarExpression('👑🌱');
      setBubbleColor('border-emerald-500/20 bg-emerald-950/20 text-emerald-200');
    } else if (isLow) {
      setAvatarExpression('💀💨');
      setBubbleColor('border-red-500/20 bg-red-950/20 text-red-200');
    } else {
      setAvatarExpression('🤔🍃');
      setBubbleColor('border-amber-500/20 bg-amber-950/20 text-amber-200');
    }

    // Evaluate based on the latest history action
    const latestAction = history[0];

    if (latestAction) {
      const label = latestAction.label.toLowerCase();
      
      // Response logic for specific actions
      if (label.includes('cycle')) {
        setSpeech('A bicycle commute! Look at you, saving the glaciers one pedal at a time. The air feels cleaner already.');
      } else if (label.includes('metro')) {
        setSpeech('Electric Metro: efficient, clean, and you don\'t have to find parking. Excellent choice!');
      } else if (label.includes('car')) {
        setSpeech('Solo car drive? I hope that AC was worth the smog. The polar bears are packing their bags as we speak.');
      } else if (label.includes('vegan')) {
        setSpeech('A vegan meal! Somewhere, a happy cow is grazing, and the atmosphere thanks you for the lack of methane.');
      } else if (label.includes('dairy')) {
        setSpeech('Dairy products... well, at least it isn\'t a double cheeseburger, but those cows still have a carbon footprint, you know.');
      } else if (label.includes('meat')) {
        setSpeech('A red meat feast! The carbon footprint of that plate could power my wind turbine for a week. Disappointed but not surprised.');
      } else if (label.includes('eco mode')) {
        setSpeech('Crank that thermostat to Eco Mode! Tiny actions make a huge difference. Appreciate the conservation.');
      } else if (label.includes('devices')) {
        setSpeech('Leaving devices on standby... Are we trying to heat the room using vampire electricity? Turn them off!');
      } else if (label.includes('unlocked')) {
        setSpeech(`Ooh, a new ${latestAction.label.replace('Unlocked: ', '')} upgrade! The island looks gorgeous. Thank you for the investment!`);
      } else {
        // Fallback to score-based comments
        generateScoreComment(ecoScore, isHigh, isLow);
      }
    } else {
      // No history yet
      generateScoreComment(ecoScore, isHigh, isLow);
    }
  }, [ecoScore, history]);

  const generateScoreComment = (score: number, isHigh: boolean, isLow: boolean) => {
    if (isHigh) {
      const positivePool = [
        'Oh wow, look at Captain Planet over here! The air is pristine and the trees are literally singing.',
        'An eco score of ' + score + '? You\'re putting other human beings to absolute shame. Keep it up!',
        'The island is thriving. I might actually start growing rare flowers if you keep this up.'
      ];
      setSpeech(positivePool[Math.floor(Math.random() * positivePool.length)]);
    } else if (isLow) {
      const roastPool = [
        'Are you trying to make this island go extinct? The smog is so thick I can\'t see my own pixels.',
        'Eco score: ' + score + '. I have seen charcoal piles with a healthier atmosphere. Go log a bicycle ride, immediately!',
        'I\'m pretty sure I saw a vulture circling my bare trees. Help!'
      ];
      setSpeech(roastPool[Math.floor(Math.random() * roastPool.length)]);
    } else {
      const neutralPool = [
        'Ecosystem status: Moderate. We\'re surviving, but the planet isn\'t exactly throwing us a parade.',
        'A score of ' + score + ' is the equivalent of a C+ in environment class. Try a vegan lunch to boost it up!',
        'Average effort, average results. Come on, we can turn those bare hills into forests!'
      ];
      setSpeech(neutralPool[Math.floor(Math.random() * neutralPool.length)]);
    }
  };

  return (
    <div className="w-full flex gap-4 items-center rounded-3xl bg-slate-900/40 border border-white/10 p-5 backdrop-blur-md shadow-lg">
      {/* Avatar Container */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-3xl shadow-inner animate-bounce" style={{ animationDuration: '3s' }}>
          {avatarExpression.split('')[0]}
        </div>
        <span className="absolute -bottom-1 -right-1 bg-slate-800 border border-white/10 px-1 py-0.5 rounded-md text-[8px] text-white/75 font-semibold uppercase tracking-wider">
          Oasis
        </span>
      </div>

      {/* Bubble */}
      <div className={`relative flex-1 border rounded-2xl p-4 text-sm leading-relaxed ${bubbleColor} transition-all duration-500`}>
        {/* Triangle pointer */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-current opacity-20" />
        
        <div className="font-bold text-[10px] uppercase tracking-widest opacity-60 mb-1">
          Spirit of the Island
        </div>
        <p className="italic">"{speech}"</p>
      </div>
    </div>
  );
}
