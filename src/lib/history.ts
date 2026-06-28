// ============================================
// Riwayat Perjalanan — localStorage persistence
// ============================================

import type { JourneyStep } from "./fork-quest-types";
import type { JourneyAnalysis } from "./ai/types";

export interface SavedJourney {
  id: string;
  questTitle: string;
  entryValue: string;
  timestamp: number;
  steps: JourneyStep[];
  analysis: JourneyAnalysis | null;
}

const STORAGE_KEY = "fork-quest-history";
const MAX_ENTRIES = 20;

function generateId(): string {
  return `j_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function loadHistory(): SavedJourney[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveHistory(journeys: SavedJourney[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

export function addJourney(journey: Omit<SavedJourney, "id" | "timestamp">): SavedJourney {
  const entry: SavedJourney = {
    ...journey,
    id: generateId(),
    timestamp: Date.now(),
  };
  const history = loadHistory();
  history.unshift(entry);
  // FIFO — keep only latest MAX_ENTRIES
  if (history.length > MAX_ENTRIES) {
    history.length = MAX_ENTRIES;
  }
  saveHistory(history);
  return entry;
}

export function deleteJourney(id: string): void {
  const history = loadHistory();
  const filtered = history.filter((j) => j.id !== id);
  saveHistory(filtered);
}

export function clearHistory(): void {
  saveHistory([]);
}

/** Format timestamp relatif ke bahasa Indonesia sehari-hari */
export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "baru aja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  if (days < 30) return `${Math.floor(days / 7)} minggu lalu`;
  return `${Math.floor(days / 30)} bulan lalu`;
}
