export type PetState = 'sleep' | 'warning' | 'panic' | 'cleaning' | 'cheerful';

export interface MemoryStats {
  usedPercent: number;
  totalMb: number;
  usedMb: number;
  freeMb: number;
  inactiveMb: number;
  pressureLevel: 'normal' | 'warn' | 'critical';
  topProcesses: ProcessStat[];
}

export interface ProcessStat {
  name: string;
  pid: number;
  memoryMb: number;
  type: 'browser' | 'editor' | 'messenger' | 'other';
}

export interface CleanResult {
  freedMb: number;
  freedInactiveMb: number;
  discardedTabsCount: number;
  restartedLanguageServers: number;
  expGained: number;
}

export interface PetEvolution {
  level: number;
  exp: number;
  nextExp: number;
  title: string;
  avatarStage: number;
  totalFreedMb: number;
}
