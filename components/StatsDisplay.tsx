
import React from 'react';
import { type Stats, StatId } from '../types.ts';
import { STAT_ICONS } from './icons.tsx';

interface StatsDisplayProps {
  stats: Stats;
}

const getBarColor = (statId: StatId, value: number): string => {
  const percentage = value / 100;
  if (statId === StatId.FUNGOS) {
    if (percentage > 0.7) return 'bg-red-500';
    if (percentage > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  }
  
  if (percentage < 0.3) return 'bg-red-500';
  if (percentage < 0.6) return 'bg-yellow-500';
  return 'bg-green-500';
};

const StatBar: React.FC<{ statId: StatId; value: number }> = ({ statId, value }) => {
  const Icon = STAT_ICONS[statId];
  const color = getBarColor(statId, value);
  const isFungus = statId === StatId.FUNGOS;
  const tooltipText = isFungus ? "Quanto menor, melhor!" : "Quanto maior, melhor!";
  
  return (
    <div className="relative flex items-center gap-2 group">
      <Icon className="w-6 h-6 text-white" />
      <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-white font-semibold w-8 text-right">{value}</span>
      <div className="absolute left-0 -top-8 w-max px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {statId}: {tooltipText}
      </div>
    </div>
  );
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-700">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {(Object.keys(stats) as StatId[]).map((statId) => (
          <StatBar key={statId} statId={statId} value={stats[statId]} />
        ))}
      </div>
    </div>
  );
};

export default StatsDisplay;