'use client';

import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { LogEntry } from '../hooks/useEcoState';

interface AnalyticsChartProps {
  history: LogEntry[];
}

export default function AnalyticsChart({ history }: AnalyticsChartProps) {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Calculate today's carbon adjustment based on history logged today
    let todayCarbonOffset = 0;
    
    // Scan history for items logged today (within the last 24h or calendar day)
    const today = new Date().toDateString();
    const todayLogs = history.filter(
      (entry) => new Date(entry.timestamp).toDateString() === today
    );

    todayLogs.forEach((log) => {
      // Carbon-intensive activities add emissions
      if (log.label.includes('Solo Car')) todayCarbonOffset += 22;
      else if (log.label.includes('Red Meat')) todayCarbonOffset += 14;
      else if (log.label.includes('Devices On')) todayCarbonOffset += 10;
      else if (log.label.includes('Dairy')) todayCarbonOffset += 4;
      
      // Green actions keep emissions lower
      else if (log.label.includes('Cycle')) todayCarbonOffset -= 12;
      else if (log.label.includes('Metro')) todayCarbonOffset -= 6;
      else if (log.label.includes('Vegan')) todayCarbonOffset -= 8;
      else if (log.label.includes('Eco Mode')) todayCarbonOffset -= 4;
    });

    // Baseline standard user carbon footprint: 45 kg CO2/day
    // Ensure we don't drop below a minimum lower bound of 10 kg CO2
    const calculatedTodayVal = Math.max(10, 45 + todayCarbonOffset);

    // Mock 7-day dataset with today calculated dynamically
    const mockData = [
      { day: 'Mon', 'Your Footprint': 42, Baseline: 50 },
      { day: 'Tue', 'Your Footprint': 68, Baseline: 50 }, // Drove solo, ate steak
      { day: 'Wed', 'Your Footprint': 35, Baseline: 50 }, // Cycle & vegan streak
      { day: 'Thu', 'Your Footprint': 58, Baseline: 50 },
      { day: 'Fri', 'Your Footprint': 46, Baseline: 50 },
      { day: 'Sat', 'Your Footprint': 63, Baseline: 50 },
      { day: 'Sun (Today)', 'Your Footprint': calculatedTodayVal, Baseline: 50 },
    ];

    setChartData(mockData);
  }, [history, mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center bg-slate-900/40 rounded-3xl border border-white/10 p-6 backdrop-blur-md">
        <div className="text-white/40 text-xs tracking-wider animate-pulse uppercase font-semibold">
          Generating Analytics Engine...
        </div>
      </div>
    );
  }

  // Custom tooltips for glassmorphism layout
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const footprint = payload[0].value;
      const baseline = payload[1].value;
      const difference = footprint - baseline;
      
      return (
        <div className="bg-slate-950/90 border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-xl text-xs space-y-1.5 font-sans">
          <p className="font-bold text-white mb-1">{payload[0].payload.day}</p>
          <p className="text-amber-400">Your Footprint: <span className="font-bold font-mono">{footprint} kg CO₂</span></p>
          <p className="text-indigo-400">Baseline Limit: <span className="font-bold font-mono">{baseline} kg CO₂</span></p>
          <div className="pt-1.5 border-t border-white/5 mt-1">
            {difference > 0 ? (
              <p className="text-red-400 font-semibold">+{difference} kg over baseline threshold</p>
            ) : (
              <p className="text-emerald-400 font-semibold">{-difference} kg under baseline limit</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">Carbon Accounting</span>
          <h3 className="text-lg font-bold text-white tracking-tight">7-Day Carbon Footprint</h3>
        </div>
        <div className="text-[10px] text-white/50 border border-white/10 bg-white/5 px-2.5 py-1 rounded-xl">
          Metric: kg CO₂ equivalent / day
        </div>
      </div>

      <div className="w-full h-[250px] font-sans text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-white/60 text-xs">{value}</span>}
            />
            
            {/* Sustainability Target Baseline */}
            <Line
              name="Sustainability Baseline"
              type="monotone"
              dataKey="Baseline"
              stroke="#6366f1"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
            />
            
            {/* User Footprint Line */}
            <Line
              name="Your Daily Footprint"
              type="monotone"
              dataKey="Your Footprint"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#0f172a' }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#f59e0b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-white/45 mt-4 leading-normal">
        * Sustainability baseline is mapped to target global caps. Your footprint fluctuates in real-time as carbon activities are logged today.
      </p>
    </div>
  );
}
