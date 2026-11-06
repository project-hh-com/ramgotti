import React from 'react';
import { CleanResult } from '../types';

interface Props {
  result: CleanResult;
  onClose: () => void;
}

export const CleanReceipt: React.FC<Props> = ({ result, onClose }) => {
  return (
    <div
      onClick={onClose}
      title="클릭하면 닫힙니다"
      className="animate-float-up bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 rounded-full px-3 py-1 shadow-xl text-slate-100 select-none mb-1 cursor-pointer hover:border-cyan-400 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
    >
      <span className="text-xs">✨</span>
      <span className="font-pretendard font-bold text-[11px] text-cyan-300">
        {(result.freedMb / 1024).toFixed(2)} GB 회수!
      </span>
      <span className="font-pixel text-[8px] text-emerald-400">
        +{result.expGained} EXP
      </span>
      <span className="text-[9px] text-slate-400 font-pretendard">
        ({result.discardedTabsCount}탭 동결)
      </span>
    </div>
  );
};
