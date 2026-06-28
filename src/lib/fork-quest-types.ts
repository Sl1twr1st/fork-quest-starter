// ============================================
// Fork Quest — shared types for the engine
// ============================================

export interface JourneyStep {
  question: string;
  answer: string;
}

export interface ShareContext {
  /** The complaint text or selected theme label */
  entryValue: string;
  /** Each completed level: question → answer */
  steps: JourneyStep[];
  /** The final level answer (level 4 / final boss) */
  finalAnswer: string;
}

export type ShareTextGenerator = (ctx: ShareContext) => string;

// ============================================
// Fork mode — branching questions per level
// ============================================

export interface ForkLevel {
  name: string;
  description: string;
  /**
   * For level 0: maps keywords/themes → array of fork strings.
   *   e.g. { "bodoh": ["Kenapa gua takut…", …], "default": […] }
   * For levels 1–4: just { "default": […] }
   */
  forks: Record<string, string[]>;
}

export interface ForkEntry {
  type: "direct-input" | "theme-grid";
  /** Label shown above the input / grid */
  label?: string;
  /** Placeholder for direct-input text field */
  placeholder?: string;
  /** Preset chips shown for quick-select (direct-input) */
  presets?: string[];
  /** Theme options shown in a grid (theme-grid) */
  themes?: string[];
}

export interface ForkQuestConfig {
  mode: "fork";

  // ── Branding ──
  title: string;
  subtitle: string;
  accentColor: string;
  accentGradient: string;
  bgGradient: string;
  cardBorderColor: string;
  progressDotColor: string;
  finalBossDotColor: string;
  levelHeaderBg: string;
  /** Shown in the speech-bubble logo header */
  logoBubbleColor: string;
  logoLabel: string;

  // ── Entry ──
  entry: ForkEntry;

  // ── Levels ──
  levels: ForkLevel[];
  /** Short descriptions for each level (used in level header) */
  levelDescriptions: string[];

  // ── Completion ──
  completionTitle: string;
  completionMessage: string;
  completionEmoji: string;
  finalQuote: string;

  // ── Share ──
  generateShareText: ShareTextGenerator;
  generateTwitterText?: ShareTextGenerator;

  // ── AI Mode (optional) ──
  /** Enable AI-generated forks. Static `levels.forks` becomes fallback. */
  aiMode?: boolean;
  /** After completion, call AI to analyze the full journey. Requires aiMode. */
  analyzeJourney?: boolean;

  // ── Navigation ──
  backToUrl: string;
}

// ============================================
// Linear mode — single question per level
// ============================================

export interface LinearLevel {
  name: string;
  description: string;
  emoji: string;
  question: string;
  placeholder: string;
}

export interface LinearQuestConfig {
  mode: "linear";

  // ── Branding ──
  title: string;
  subtitle: string;
  accentColor: string;
  accentGradient: string;
  bgGradient: string;
  cardBorderColor: string;
  progressDotColor: string;
  levelHeaderBg: string;
  logoBubbleColor: string;
  logoLabel: string;

  // ── Levels ──
  levels: LinearLevel[];

  // ── Completion ──
  completionTitle: string;
  completionMessage: string;
  completionEmoji: string;
  finalQuote: string;

  // ── Share ──
  generateShareText: ShareTextGenerator;
  generateTwitterText?: ShareTextGenerator;

  // ── AI Mode (optional) ──
  /** Enable AI-generated questions. Static `levels` becomes fallback. */
  aiMode?: boolean;
  /** After completion, call AI to analyze the full journey. Requires aiMode. */
  analyzeJourney?: boolean;

  // ── Navigation ──
  backToUrl: string;
}

export type QuestConfig = ForkQuestConfig | LinearQuestConfig;
