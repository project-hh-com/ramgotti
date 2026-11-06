import { useState, useEffect } from 'react';
import { PetState, MemoryStats, CleanResult, PetEvolution, AppSettings } from './types';
import { RamgottiPet } from './components/RamgottiPet';
import { PanicBubble } from './components/PanicBubble';
import { CleanReceipt } from './components/CleanReceipt';
import { SettingsModal, CHARACTERS } from './components/SettingsModal';
import { fetchMemoryStats, triggerCleanMemory, resizeWindow } from './lib/tauri-bridge';
import { sfx } from './lib/sfx';

const DEFAULT_SETTINGS: AppSettings = {
  selectedCharacterId: 'mochi', // 기본값: 몽글 픽셀 램
  panicThresholdPercent: 80,
  soundEnabled: true,
  autoCleanEnabled: false,
};

export function App() {
  const [stats, setStats] = useState<MemoryStats | null>(null);
  const [petState, setPetState] = useState<PetState>('sleep');
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanResult, setCleanResult] = useState<CleanResult | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings with localStorage persistence
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('ramgotti_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('ramgotti_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  };

  const currentChar =
    CHARACTERS.find((c) => c.id === settings.selectedCharacterId) ?? CHARACTERS[0];

  // Gamification state
  const [evolution, setEvolution] = useState<PetEvolution>({
    level: 1,
    exp: 0,
    nextExp: 3000,
    title: currentChar.name,
    avatarStage: 1,
    totalFreedMb: 0,
  });

  // Polling memory telemetry
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const poll = async () => {
      const current = await fetchMemoryStats();
      setStats(current);

      if (!isCleaning && !cleanResult) {
        if (current.usedPercent >= settings.panicThresholdPercent) {
          if (petState !== 'panic') {
            if (settings.soundEnabled) sfx.playPanic();
          }
          setPetState('panic');

          // Auto-clean if enabled
          if (settings.autoCleanEnabled) {
            handleClean();
          }
        } else if (current.usedPercent >= settings.panicThresholdPercent - 15) {
          setPetState('warning');
        } else {
          setPetState('sleep');
        }
      }
    };

    poll();
    timer = setInterval(poll, 3000);
    return () => clearInterval(timer);
  }, [isCleaning, cleanResult, petState, settings]);

  // Handle Clean
  const handleClean = async () => {
    if (isCleaning) return;
    setIsCleaning(true);
    setPetState('cleaning');
    if (settings.soundEnabled) sfx.playSweep();

    try {
      const res = await triggerCleanMemory();
      setCleanResult(res);
      setPetState('cheerful');
      if (settings.soundEnabled) sfx.playFanfare();

      setEvolution((prev) => {
        const nextExpTotal = prev.exp + res.expGained;
        const leveledUp = nextExpTotal >= prev.nextExp;
        return {
          ...prev,
          level: leveledUp ? prev.level + 1 : prev.level,
          exp: nextExpTotal,
          nextExp: leveledUp ? prev.nextExp * 2 : prev.nextExp,
          totalFreedMb: prev.totalFreedMb + res.freedMb,
        };
      });

      setTimeout(() => {
        setCleanResult(null);
        setIsCleaning(false);
        setPetState('sleep');
      }, 4500);
    } catch (e) {
      console.error(e);
      setIsCleaning(false);
      setPetState('sleep');
    }
  };

  // Click on Pet
  const handlePetClick = () => {
    if (petState === 'sleep') {
      setPetState('warning');
      setTimeout(() => setPetState('sleep'), 2000);
    } else if (petState === 'panic' || petState === 'warning') {
      handleClean();
    }
  };

  const handleOpenSettings = async () => {
    setIsSettingsOpen(true);
    await resizeWindow(380, 420);
  };

  const handleCloseSettings = async () => {
    setIsSettingsOpen(false);
    await resizeWindow(260, 200);
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-end pb-2 px-2 bg-transparent select-none overflow-hidden relative">
      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={handleCloseSettings}
        />
      )}

      {/* 1. Speech Bubble / Receipt area (Above Pet) */}
      <div className="flex flex-col items-center mb-0.5 w-full">
        {cleanResult && (
          <CleanReceipt result={cleanResult} onClose={() => setCleanResult(null)} />
        )}

        {!cleanResult && petState === 'panic' && stats && (
          <PanicBubble stats={stats} onClean={handleClean} isCleaning={isCleaning} />
        )}
      </div>

      {/* 2. Floating Pet Container */}
      <div className="relative group flex flex-col items-center">
        <RamgottiPet
          state={petState}
          character={currentChar}
          onClick={handlePetClick}
          onOpenSettings={handleOpenSettings}
        />

        {/* Level & RAM badge on hover */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 border border-slate-700 text-slate-200 px-2 py-0.5 rounded-full text-[9px] font-pixel whitespace-nowrap pointer-events-none shadow-lg z-10">
          Lv.{evolution.level} {currentChar.name} · RAM {stats?.usedPercent ?? 0}%
        </div>
      </div>

      {/* 3. Dev Simulator Controls (Web Browser Only) */}
      {typeof window !== 'undefined' && !('__TAURI_INTERNALS__' in window) && (
        <div className="fixed top-3 left-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-[11px] text-slate-300 font-pretendard flex items-center gap-2 backdrop-blur-md">
          <span className="font-pixel text-[9px] text-indigo-400">DEV MOCK:</span>
          <button
            onClick={() => {
              setStats((prev) => prev && { ...prev, usedPercent: 55 });
              setPetState('sleep');
            }}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            55% (수면)
          </button>
          <button
            onClick={() => {
              setStats((prev) => prev && { ...prev, usedPercent: 72 });
              setPetState('warning');
            }}
            className="px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300"
          >
            72% (주의)
          </button>
          <button
            onClick={() => {
              setStats((prev) => prev && { ...prev, usedPercent: 88 });
              setPetState('panic');
              if (settings.soundEnabled) sfx.playPanic();
            }}
            className="px-2 py-0.5 rounded bg-red-950/60 hover:bg-red-900/60 text-red-300 font-bold"
          >
            88% (위기)
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-2 py-0.5 rounded bg-cyan-900/60 hover:bg-cyan-800/60 text-cyan-300 font-bold ml-1"
          >
            ⚙️ 설정 열기
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
