'use client';

import React, { useEffect, useState } from 'react';

export default function AqiWidget() {
  const [aqi, setAqi] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('Detecting...');
  const [locationName, setLocationName] = useState<string>('Scanning Location');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchAqi = async (lat: number, lon: number, name: string) => {
      try {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
        );
        const data = await response.json();
        
        if (data && data.current && typeof data.current.us_aqi === 'number') {
          const fetchedAqi = data.current.us_aqi;
          setAqi(fetchedAqi);
          setLocationName(name);
          determineStatus(fetchedAqi);
        } else {
          // Fallback to mock if API returns malformed data
          setMockAqi(name);
        }
      } catch (err) {
        console.error('Failed to fetch Open-Meteo AQI:', err);
        setMockAqi(name);
      } finally {
        setLoading(false);
      }
    };

    const setMockAqi = (name: string) => {
      const randomMock = Math.floor(Math.random() * 45) + 30; // 30 - 75
      setAqi(randomMock);
      setLocationName(`${name} (Mocked)`);
      determineStatus(randomMock);
    };

    const determineStatus = (aqiValue: number) => {
      if (aqiValue <= 50) setStatus('Good');
      else if (aqiValue <= 100) setStatus('Moderate');
      else if (aqiValue <= 150) setStatus('Sensitive Groups');
      else setStatus('Unhealthy');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: query local coordinates
          fetchAqi(
            position.coords.latitude,
            position.coords.longitude,
            'Local Air'
          );
        },
        (error) => {
          // Denied/Blocked: query default coordinates (New York City)
          console.warn('Geolocation blocked/failed. Falling back to default (NYC).', error);
          fetchAqi(40.7128, -74.0060, 'NYC (Fallback)');
        },
        { timeout: 5000 }
      );
    } else {
      // Geolocation not supported: fallback to default (New York City)
      fetchAqi(40.7128, -74.0060, 'NYC (Fallback)');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl animate-pulse font-mono text-xs text-indigo-400">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
        <span>Locating AQI...</span>
      </div>
    );
  }

  // Color mappings
  let dotColor = 'bg-emerald-400';
  let textColor = 'text-emerald-400';
  if (aqi && aqi > 100) {
    dotColor = 'bg-red-400';
    textColor = 'text-red-400';
  } else if (aqi && aqi > 50) {
    dotColor = 'bg-amber-400';
    textColor = 'text-amber-400';
  }

  return (
    <div
      className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs shadow-inner"
      title={`${locationName}: Status ${status}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      <span className="text-white/60 font-semibold">{locationName}:</span>
      <span className={`font-bold ${textColor}`}>{aqi} AQI</span>
    </div>
  );
}
