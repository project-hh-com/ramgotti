import React from 'react';
import { MemoryStats } from '../types';

interface Props {
  stats: MemoryStats;
  onClean: () => void;
  isCleaning: boolean;
}

export const PanicBubble: React.FC<Props> = ({ stats, onClean, isCleaning }) => {
  return (
    <div
      onClick={onClean}
      title="클릭하면 메모리를 청소합니다"
      className="animate-float-up bg-slate-900/95 backdrop-blur-md border border-red-500/60 rounded-full px-3 py-1 shadow-xl text-slate-100 select-none mb-1 cursor-pointer hover:border-red-400 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
    >
      <div className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span className="font-pixel text-[9px] text-red-400">RAM {stats.usedPercent}% 위기!</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClean();
        }}
        disabled={isCleaning}
        className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm active:scale-90 transition-transform"
      >
        <span>🧹</span>
        <span>{isCleaning ? '정리중...' : '싹 쓸기'}</span>
      </button>
    </div>
  );
};
