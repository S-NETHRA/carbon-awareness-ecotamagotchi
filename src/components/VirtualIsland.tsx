'use client';

import React from 'react';

interface VirtualIslandProps {
  ecoScore: number;
  unlockedUpgrades: string[];
}

export default function VirtualIsland({ ecoScore, unlockedUpgrades }: VirtualIslandProps) {
  // Determine state thresholds
  const isHigh = ecoScore >= 70;
  const isLow = ecoScore < 40;

  // Sky Gradients & Backgrounds
  // High: Cyan to Emerald
  // Medium: Sunny Sky Blue
  // Low: Hazy Smog Gray to Muted Amber
  let skyGradientStart = 'from-sky-400';
  let skyGradientEnd = 'to-blue-500';
  if (isHigh) {
    skyGradientStart = 'from-teal-400';
    skyGradientEnd = 'to-emerald-500';
  } else if (isLow) {
    skyGradientStart = 'from-gray-600';
    skyGradientEnd = 'to-amber-800/80';
  }

  // Water color
  let waterColor = 'fill-cyan-400/80';
  if (isHigh) {
    waterColor = 'fill-emerald-400/80';
  } else if (isLow) {
    waterColor = 'fill-amber-950/70';
  }

  // Island base color (sides of the floating chunk)
  let landSideColor = '#8B5A2B'; // Brown
  let landTopColor = '#4CAF50'; // Green
  if (isHigh) {
    landTopColor = '#10B981'; // Vibrant Emerald
    landSideColor = '#065F46'; // Deep Emerald Green
  } else if (isLow) {
    landTopColor = '#848677'; // Dry grayish green
    landSideColor = '#4B4D43'; // Muted dark clay
  }

  // Wind turbine rotation speed
  let turbineAnimationClass = 'animate-spin-slow';
  if (isHigh) {
    turbineAnimationClass = 'animate-spin-fast';
  } else if (isLow) {
    turbineAnimationClass = 'animate-spin-sluggish';
  }

  const hasWindTurbine = unlockedUpgrades.includes('wind-turbine');
  const hasSolarPanel = unlockedUpgrades.includes('solar-panel');
  const hasLushForest = unlockedUpgrades.includes('lush-forest');
  const hasEcoDome = unlockedUpgrades.includes('eco-dome');

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/10 p-6 flex flex-col items-center">
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute -inset-10 opacity-30 blur-3xl transition-all duration-1000 -z-10 bg-gradient-to-tr ${skyGradientStart} ${skyGradientEnd}`}
      />

      {/* Header Info */}
      <div className="w-full flex justify-between items-center mb-4 z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-white/60 font-semibold">Ecosystem Island</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isHigh ? 'Thriving Haven' : isLow ? 'Degraded Wasteland' : 'Struggling Oasis'}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-white/60 font-semibold">Eco Score</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-extrabold transition-colors duration-500 ${isHigh ? 'text-emerald-400' : isLow ? 'text-red-400' : 'text-amber-400'}`}>
              {ecoScore}
            </span>
            <span className="text-white/60 text-sm">/100</span>
          </div>
        </div>
      </div>

      {/* Score Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden border border-white/5">
        <div
          className={`h-full transition-all duration-1000 ease-out ${
            isHigh ? 'bg-emerald-400' : isLow ? 'bg-red-500' : 'bg-amber-400'
          }`}
          style={{ width: `${ecoScore}%` }}
        />
      </div>

      {/* Virtual Island Graphic Canvas */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-slate-900">
        {/* SVG Drawing */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover transition-all duration-1000"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Interactive representation of the Virtual Ecosystem Island. Current status: ${isHigh ? 'Thriving Haven' : isLow ? 'Degraded Wasteland' : 'Struggling Oasis'}.`}
        >
          <title>Virtual Ecosystem Island</title>
          <desc>
            A 3D-styled floating island rendering trees, clean energy installations, or smog depending on the current eco-score.
          </desc>
          {/* DEFINITIONS FOR GRADIENTS AND FILTERS */}
          <defs>
            {/* Sky Gradients */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={`transition-all duration-1000`} stopColor={isHigh ? '#06b6d4' : isLow ? '#374151' : '#38bdf8'} />
              <stop offset="60%" className={`transition-all duration-1000`} stopColor={isHigh ? '#10b981' : isLow ? '#78350f' : '#60a5fa'} />
              <stop offset="100%" className={`transition-all duration-1000`} stopColor={isHigh ? '#047857' : isLow ? '#451a03' : '#93c5fd'} />
            </linearGradient>

            {/* Floating Island Gradient */}
            <linearGradient id="islandBaseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={landSideColor} />
              <stop offset="100%" stopColor="#2D1A0A" />
            </linearGradient>

            {/* Cloud Gradients */}
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="smogGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4b5563" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#9ca3af" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4b5563" stopOpacity="0.1" />
            </linearGradient>

            {/* Glowing Effects */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. SKY BACKGROUND */}
          <rect width="800" height="600" fill="url(#skyGrad)" className="transition-all duration-1000" />

          {/* 2. DYNAMIC CLOUDS (BOBBING / DRIFTING) */}
          {!isLow && (
            <g className="opacity-80">
              {/* Cloud 1 */}
              <path
                d="M 120,150 Q 140,110 180,120 Q 220,100 260,130 Q 300,120 310,150 Z"
                fill="url(#cloudGrad)"
                className="animate-pulse"
                style={{ animationDuration: '6s' }}
              />
              {/* Cloud 2 */}
              <path
                d="M 520,120 Q 550,80 600,100 Q 640,80 680,110 Q 720,100 730,130 Q 740,160 710,170 Q 690,180 520,160 Z"
                fill="url(#cloudGrad)"
                className="animate-pulse"
                style={{ animationDuration: '8s' }}
              />
            </g>
          )}

          {/* Sun / Dead Star */}
          <circle
            cx="400"
            cy="140"
            r={isHigh ? '55' : isLow ? '35' : '45'}
            fill={isHigh ? '#FCD34D' : isLow ? '#F59E0B' : '#FDE047'}
            opacity={isLow ? '0.4' : '0.85'}
            filter={isHigh ? 'url(#glow)' : ''}
            className="transition-all duration-1000"
          />

          {/* 3. BACKGROUND OCEAN */}
          <rect x="0" y="420" width="800" height="180" className={`${waterColor} transition-all duration-1000`} />
          
          {/* Animated Waves */}
          <g className="opacity-40">
            <path d="M 0,430 C 150,425 250,435 400,430 C 550,425 650,435 800,430 L 800,450 L 0,450 Z" className={`${waterColor} animate-bob`} />
            <path d="M 0,450 C 100,455 300,445 450,450 C 600,455 700,445 800,450 L 800,480 L 0,480 Z" className={`${waterColor} animate-bob-slow`} />
          </g>

          {/* 4. THE FLOATING ISLAND PLATFORM */}
          <g transform="translate(0, 100)" className="transition-all duration-1000">
            {/* Dark soil base / cliff depth */}
            <path
              d="M 150,280 L 400,360 L 650,280 L 650,340 C 650,390 580,410 400,410 C 220,410 150,390 150,340 Z"
              fill="url(#islandBaseGrad)"
              className="transition-all duration-1000"
            />
            {/* Grassy island surface */}
            <path
              d="M 150,280 C 150,240 220,200 400,200 C 580,200 650,240 650,280 C 650,320 580,360 400,360 C 220,360 150,320 150,280 Z"
              fill={landTopColor}
              className="transition-all duration-1000"
            />
            
            {/* Surface details / paths */}
            {!isLow && (
              <path
                d="M 320,280 Q 400,310 480,270 Q 400,290 320,280 Z"
                fill="#D1A153"
                opacity="0.6"
              />
            )}

            {/* 5. NATIVE VEGETATION (TREES / FLOWERS) */}
            {/* Left Tree Base */}
            <g transform="translate(200, 240)" className="transition-all duration-500">
              <rect x="-6" y="0" width="12" height="35" fill="#5C4033" />
              {/* Foliage */}
              <circle cx="0" cy="-15" r={isLow ? '18' : '28'} fill={isLow ? '#78716c' : '#15803d'} className="transition-all duration-1000 animate-sway" />
              <circle cx="-15" cy="-5" r={isLow ? '12' : '20'} fill={isLow ? '#57534e' : '#166534'} className="transition-all duration-1000 animate-sway-slow" />
              <circle cx="15" cy="-5" r={isLow ? '12' : '20'} fill={isLow ? '#57534e' : '#1f9d55'} className="transition-all duration-1000 animate-sway" />
            </g>

            {/* Right Tree Base */}
            <g transform="translate(580, 235)" className="transition-all duration-500">
              <rect x="-4" y="0" width="8" height="30" fill="#5C4033" />
              {/* Foliage */}
              <circle cx="0" cy="-12" r={isLow ? '15' : '24'} fill={isLow ? '#78716c' : '#16a34a'} className="transition-all duration-1000 animate-sway-slow" />
              <circle cx="-12" cy="-2" r={isLow ? '10' : '16'} fill={isLow ? '#57534e' : '#14532d'} className="transition-all duration-1000 animate-sway" />
              <circle cx="12" cy="-2" r={isLow ? '10' : '16'} fill={isLow ? '#57534e' : '#22c55e'} className="transition-all duration-1000 animate-sway-slow" />
            </g>

            {/* 6. LUSH FOREST UPGRADE */}
            {hasLushForest && !isLow && (
              <g className="transition-opacity duration-1000">
                {/* Back forest clusters */}
                <g transform="translate(320, 215)">
                  <rect x="-3" y="0" width="6" height="20" fill="#4A3B32" />
                  <circle cx="0" cy="-10" r="16" fill="#047857" className="animate-sway" />
                </g>
                <g transform="translate(460, 210)">
                  <rect x="-3" y="0" width="6" height="20" fill="#4A3B32" />
                  <circle cx="0" cy="-10" r="18" fill="#065f46" className="animate-sway-slow" />
                </g>
                <g transform="translate(390, 220)">
                  <rect x="-4" y="0" width="8" height="25" fill="#4A3B32" />
                  <circle cx="0" cy="-12" r="20" fill="#059669" className="animate-sway" />
                </g>
              </g>
            )}

            {/* 7. SOLAR PANEL UPGRADE */}
            {hasSolarPanel && (
              <g transform="translate(270, 270)" className="transition-opacity duration-1000">
                {/* Stand */}
                <rect x="-2" y="10" width="4" height="25" fill="#475569" />
                <polygon points="-5,10 5,10 2,22 -2,22" fill="#334155" />
                {/* Panels (isometric tilt) */}
                <polygon
                  points="-30,-15 30,-20 40,10 -20,15"
                  fill="#1e293b"
                  stroke="#64748b"
                  strokeWidth="2"
                />
                {/* Panel lines */}
                <line x1="-15" y1="-2" x2="25" y2="-7" stroke="#475569" strokeWidth="1" />
                <line x1="0" y1="5" x2="35" y2="0" stroke="#475569" strokeWidth="1" />
                <line x1="-5" y1="-17" x2="10" y2="-3" stroke="#475569" strokeWidth="1" />
                <line x1="10" y1="-19" x2="25" y2="-5" stroke="#475569" strokeWidth="1" />
                {/* Glow effect on solar panel for high score */}
                {isHigh && (
                  <polygon
                    points="-30,-15 30,-20 40,10 -20,15"
                    fill="#38bdf8"
                    opacity="0.2"
                    className="animate-pulse"
                  />
                )}
              </g>
            )}

            {/* 8. WIND TURBINE UPGRADE */}
            {hasWindTurbine && (
              <g transform="translate(500, 230)" className="transition-opacity duration-1000">
                {/* Tower */}
                <path d="M -5,60 L -2,0 L 2,0 L 5,60 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                {/* Rotating Blades */}
                <g className={turbineAnimationClass} style={{ transformOrigin: '0px 0px' }}>
                  <circle cx="0" cy="0" r="4" fill="#94a3b8" />
                  {/* Blade 1 */}
                  <path d="M 0,0 L -6,-45 C -3,-48 3,-48 6,-45 Z" fill="#f8fafc" opacity="0.9" />
                  {/* Blade 2 */}
                  <path d="M 0,0 L 42,15 C 45,12 43,5 38,3 Z" fill="#f8fafc" opacity="0.9" />
                  {/* Blade 3 */}
                  <path d="M 0,0 L -36,30 C -41,27 -41,19 -36,16 Z" fill="#f8fafc" opacity="0.9" />
                </g>
              </g>
            )}

            {/* 9. ECO-DOME SHIELD UPGRADE */}
            {hasEcoDome && (
              <g transform="translate(400, 280)" className="transition-opacity duration-1000 pointer-events-none">
                {/* Dome border and glow */}
                <path
                  d="M -300,40 A 300,250 0 0,1 300,40 Z"
                  fill="radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.2) 100%)"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse opacity-60"
                  filter="url(#glow)"
                />
                <path
                  d="M -300,40 A 300,250 0 0,1 300,40 Z"
                  fill="#10b981"
                  fillOpacity="0.05"
                  className="animate-pulse"
                />
              </g>
            )}
          </g>

          {/* 10. SMOG CLOUD OVERLAY (LOW SCORE STATE) */}
          {isLow && (
            <g className="transition-opacity duration-1000">
              {/* Smog Path 1 */}
              <path
                d="M -100,280 C 100,240 300,320 500,280 C 700,240 900,300 1000,280 L 1000,380 C 800,400 600,340 400,380 C 200,420 0,360 -100,380 Z"
                fill="url(#smogGrad)"
                className="animate-smog"
              />
              {/* Smog Path 2 */}
              <path
                d="M -50,150 C 150,180 350,120 550,150 C 750,180 850,140 950,150 L 950,250 C 800,230 650,270 450,240 C 250,210 100,250 -50,230 Z"
                fill="url(#smogGrad)"
                className="animate-smog-slow"
              />
            </g>
          )}
        </svg>

        {/* Smog Cloud Overlay Warning UI (HTML) */}
        {isLow && (
          <div className="absolute inset-0 bg-amber-950/10 backdrop-grayscale-[40%] pointer-events-none flex items-center justify-center">
            <div className="bg-black/75 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse uppercase tracking-wider font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Smog Alert: Environmental Decline Active
            </div>
          </div>
        )}
      </div>

      {/* Quick Visual Status Tags */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xs text-white/50">Forestry</div>
          <div className="font-bold text-white text-sm mt-0.5">
            {hasLushForest ? 'Dense & Green' : isLow ? 'Withered' : 'Sparse'}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xs text-white/50">Air Quality</div>
          <div className={`font-bold text-sm mt-0.5 ${isHigh ? 'text-emerald-400' : isLow ? 'text-red-400' : 'text-amber-400'}`}>
            {isHigh ? 'Pristine (AQI 12)' : isLow ? 'Hazardous (AQI 280)' : 'Moderate (AQI 85)'}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xs text-white/50">Clean Energy</div>
          <div className="font-bold text-white text-sm mt-0.5">
            {hasWindTurbine && hasSolarPanel ? '100% Active' : hasWindTurbine || hasSolarPanel ? 'Partial Grid' : '0% (Fossil Fuels)'}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xs text-white/50">Eco Shield</div>
          <div className="font-bold text-white text-sm mt-0.5">
            {hasEcoDome ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
    </div>
  );
}
