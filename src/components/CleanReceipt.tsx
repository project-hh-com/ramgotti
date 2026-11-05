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
      className="animate-float-up bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-3 shadow-2xl text-slate-100 w-64 select-none mb-2 cursor-pointer hover:border-cyan-400 transition-colors"
    >
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">✨</span>
          <span className="font-pretendard font-bold text-xs text-cyan-400">후아 살았다!</span>
        </div>
        <span className="font-pixel text-[9px] text-emerald-400">+{result.expGained} EXP</span>
      </div>

      <div className="space-y-1 text-[11px] font-pretendard text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">회수된 총 메모리</span>
          <span className="font-mono font-bold text-emerald-400">
            {(result.freedMb / 1024).toFixed(2)} GB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">절전 동결 탭</span>
          <span className="font-mono text-cyan-300">{result.discardedTabsCount}개</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">TS 언어 서버</span>
          <span className="font-mono text-cyan-300">핫 리셋 완료</span>
        </div>
      </div>
    </div>
  );
};
