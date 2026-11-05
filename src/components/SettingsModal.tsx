import React from 'react';
import { CharacterItem, AppSettings } from '../types';

export const CHARACTERS: CharacterItem[] = [
  {
    id: 'mochi',
    name: '몽글 픽셀 램',
    subtitle: '반짝이는 눈망울과 황금빛 뿔을 가진 솜사탕 양',
    image: '/characters/mochi.png',
    badge: '인기 1위',
    tag: 'PIXEL',
  },
  {
    id: 'beanie',
    name: '비니 쓴 청소양',
    subtitle: '노란 털비니를 쓰고 미니 빗자루를 든 아기양',
    image: '/characters/beanie.png',
    badge: '귀여움 폭발',
    tag: 'CHIBI',
  },
  {
    id: 'marshmallow',
    name: '마시멜로 구름양',
    subtitle: '램 위기 시 땀을 삐질 흘리는 말랑 발광 구름',
    image: '/characters/marshmallow.png',
    badge: '모찌모찌',
    tag: 'SOFT',
  },
  {
    id: 'vector',
    name: '레트로 도트 양',
    subtitle: '화면 위 가볍고 깔끔한 오리지널 벡터 램고치',
    image: '/assets/ramgotti-preview.svg',
    badge: '클래식',
    tag: 'RETRO',
  },
];

interface Props {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-float-up select-none">
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl w-full max-w-sm p-4 shadow-2xl text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <div>
              <h2 className="font-pretendard font-bold text-sm text-slate-100">램고치 환경설정</h2>
              <p className="text-[10px] text-slate-400">나만의 펫과 청소 옵션을 설정해보세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          {/* Section 1: Character Selector */}
          <div>
            <label className="text-[11px] font-pixel text-cyan-400 block mb-2">
              🎨 램고치 캐릭터 선택
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CHARACTERS.map((char) => {
                const isSelected = settings.selectedCharacterId === char.id;
                return (
                  <div
                    key={char.id}
                    onClick={() =>
                      onUpdateSettings({ ...settings, selectedCharacterId: char.id })
                    }
                    className={`relative p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {/* Badge */}
                    <span
                      className={`absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded-full font-pretendard font-bold ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isSelected ? '장착됨' : char.badge}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-slate-950/60 p-1 flex items-center justify-center mb-1.5 overflow-hidden">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>

                    <span className="font-pretendard font-bold text-xs text-slate-200">
                      {char.name}
                    </span>
                    <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                      {char.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Alert Threshold */}
          <div>
            <label className="text-[11px] font-pixel text-amber-400 block mb-2">
              🚨 땀 삐질 위기 감지 기준
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[75, 80, 85].map((percent) => (
                <button
                  key={percent}
                  onClick={() =>
                    onUpdateSettings({ ...settings, panicThresholdPercent: percent })
                  }
                  className={`py-1.5 rounded-lg text-xs font-pretendard font-bold transition-all border ${
                    settings.panicThresholdPercent === percent
                      ? 'border-amber-400 bg-amber-950/50 text-amber-300'
                      : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  RAM {percent}%
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              설정한 메모리 점유율을 초과하면 램고치가 팝업되어 싹 쓸기를 제안합니다.
            </p>
          </div>

          {/* Section 3: Sound & Auto Clean Toggle */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-pretendard">🔊 8비트 레트로 효과음</span>
              <button
                onClick={() =>
                  onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })
                }
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    settings.soundEnabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-pretendard">⚡ 위기 시 자동 싹 쓸기</span>
              <button
                onClick={() =>
                  onUpdateSettings({
                    ...settings,
                    autoCleanEnabled: !settings.autoCleanEnabled,
                  })
                }
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  settings.autoCleanEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    settings.autoCleanEnabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-pretendard font-bold text-xs shadow-lg transition-transform active:scale-95"
          >
            설정 저장 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
