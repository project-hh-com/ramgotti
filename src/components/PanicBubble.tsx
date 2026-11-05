import React from 'react';
import { MemoryStats } from '../types';

interface Props {
  stats: MemoryStats;
  onClean: () => void;
  isCleaning: boolean;
}

export const PanicBubble: React.FC<Props> = ({ stats, onClean, isCleaning }) => {
  return (
    <div className="animate-float-up bg-slate-900/95 backdrop-blur-md border border-red-500/50 rounded-2xl p-3 shadow-2xl text-slate-100 w-64 select-none mb-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-pixel text-[10px] text-red-400">RAM {stats.usedPercent}% 위기!</span>
        </div>
        <span className="text-[11px] text-slate-400 font-pretendard">숨차요...🥵</span>
      </div>

      {/* Culprit list */}
      <div className="text-[11px] font-pretendard text-slate-300 space-y-1 mb-2.5">
        <div className="flex items-center justify-between text-slate-400">
          <span>🌐 크롬 백그라운드 탭</span>
          <span className="text-red-400 font-mono font-bold">~2.4 GB</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>💻 VS Code TS 서버</span>
          <span className="text-amber-400 font-mono font-bold">~1.3 GB</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onClean}
        disabled={isCleaning}
        className={`w-full py-2 px-3 rounded-xl font-pretendard font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95 ${
          isCleaning
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 animate-pulse'
        }`}
      >
        <span>🧹</span>
        <span>{isCleaning ? '빗자루 돌리는 중...' : '작업 보존 싹 쓸기'}</span>
      </button>
    </div>
  );
};
