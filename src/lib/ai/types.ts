// ============================================
// AI Kawan Bertanya — types
// ============================================

import type { JourneyStep } from "@/lib/fork-quest-types";

/** Context sent to the AI when generating forks */
export interface GenerateForksInput {
  questType: string; // e.g. "galau", "investasi", "indonesia"
  questTitle: string; // e.g. "Galau Sebagai Percakapan"
  level: number; // 0–4
  levelName: string; // e.g. "🌱 Level 1: Surface Questions"
  levelDescription: string; // what this level is supposed to uncover
  entryValue: string; // the complaint or selected theme
  history: JourneyStep[]; // previous levels: question & answer pairs
  totalLevels: number; // always 5 for now
}

/** Response from fork generation */
export interface GenerateForksOutput {
  forks: string[];
}

/** Context sent to the AI for journey analysis */
export interface AnalyzeJourneyInput {
  questType: string;
  questTitle: string;
  entryValue: string;
  journey: JourneyStep[];
}

/** What the AI returns after analyzing the full journey */
export interface JourneyAnalysis {
  /** 3–5 recurring patterns the AI noticed */
  patterns: string[];
  /** One-sentence emotional core — the heart of the journey */
  emotionalCore: string;
  /** A personalized reflection paragraph */
  reflection: string;
  /** Optional: forks the AI thinks should've been asked */
  missedQuestions?: string[];
}
