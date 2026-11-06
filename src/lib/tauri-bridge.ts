import { MemoryStats, CleanResult } from '../types';

// Tauri API는 데스크톱 앱 환경에서만 활성화되며,
// 웹 브라우저(`pnpm dev`)로 열었을 때는 자연스러운 Mock 시뮬레이터가 동작합니다.
const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export async function fetchMemoryStats(): Promise<MemoryStats> {
  if (isTauri) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<MemoryStats>('get_memory_stats');
    } catch (e) {
      console.warn('Tauri invoke failed, falling back to mock:', e);
    }
  }

  // Web Browser Mock Telemetry
  const now = Date.now();
  // 30초 주기로 55% -> 88% 오르내리는 시뮬레이션
  const cycle = Math.sin(now / 8000);
  const usedPercent = Math.round(70 + cycle * 18); // 52% ~ 88%

  return {
    usedPercent,
    totalMb: 16384, // 16GB Mac
    usedMb: Math.round((16384 * usedPercent) / 100),
    freeMb: Math.round(16384 * (1 - usedPercent / 100)),
    inactiveMb: 3200,
    pressureLevel: usedPercent >= 80 ? 'critical' : usedPercent >= 65 ? 'warn' : 'normal',
    topProcesses: [
      { name: 'Google Chrome Helper', pid: 14201, memoryMb: 2450, type: 'browser' },
      { name: 'tsserver.js (VS Code)', pid: 28911, memoryMb: 1350, type: 'editor' },
      { name: 'Slack Helper', pid: 1042, memoryMb: 850, type: 'messenger' },
    ],
  };
}

export async function triggerCleanMemory(): Promise<CleanResult> {
  if (isTauri) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<CleanResult>('clean_memory');
    } catch (e) {
      console.warn('Tauri clean invoke failed, falling back to mock:', e);
    }
  }

  // Mock Clean Delay & Outcome
  await new Promise((r) => setTimeout(r, 650));
  const freedMb = 3840; // 3.84 GB
  return {
    freedMb,
    freedInactiveMb: 2200,
    discardedTabsCount: 14,
    restartedLanguageServers: 1,
    expGained: freedMb,
  };
}

export async function startWindowDrag(): Promise<void> {
  if (isTauri) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('start_drag');
      return;
    } catch {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        await getCurrentWindow().startDragging();
      } catch (err) {
        console.warn('startDragging failed:', err);
      }
    }
  }
}
