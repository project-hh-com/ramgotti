export type PetState = 'sleep' | 'warning' | 'panic' | 'cleaning' | 'cheerful';

export interface CharacterItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  badge: string;
  tag: string;
}

export interface AppSettings {
  selectedCharacterId: string;
  panicThresholdPercent: number; // 75, 80, 85
  soundEnabled: boolean;
  autoCleanEnabled: boolean;
}

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
