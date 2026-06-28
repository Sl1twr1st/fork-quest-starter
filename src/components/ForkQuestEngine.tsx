"use client";

import { useState, useEffect } from "react";
import type {
  QuestConfig,
  ForkQuestConfig,
  LinearQuestConfig,
  JourneyStep,
  ShareContext,
} from "@/lib/fork-quest-types";
import type { JourneyAnalysis } from "@/lib/ai/types";
import {
  addJourney,
  loadHistory,
  deleteJourney,
  formatRelativeTime,
  type SavedJourney,
} from "@/lib/history";

// ============================================
// Internal helpers
// ============================================

function buildShareContext(
  entryValue: string,
  selectedForks: string[],
  responses: string[],
  currentResponse: string,
  currentLevel: number,
): ShareContext {
  const steps: JourneyStep[] = [];
  for (let i = 0; i < selectedForks.length; i++) {
    steps.push({
      question: selectedForks[i],
      answer: responses[i] ?? "",
    });
  }
  // If we're at the final level and have a response, include it
  if (currentLevel === 4 && currentResponse) {
    const lastIdx = steps.length - 1;
    if (lastIdx >= 0 && steps[lastIdx].question === selectedForks[selectedForks.length - 1]) {
      steps[lastIdx].answer = currentResponse;
    }
  }
  return { entryValue, steps, finalAnswer: currentResponse };
}

function buildLinearShareContext(
  questions: string[],
  responses: string[],
): ShareContext {
  const steps: JourneyStep[] = questions.map((q, i) => ({
    question: q,
    answer: responses[i] ?? "",
  }));
  return {
    entryValue: "",
    steps,
    finalAnswer: responses[responses.length - 1] ?? "",
  };
}

// ============================================
// Sub-components
// ============================================

function LogoHeader({
  label,
  bubbleColor,
}: {
  label: string;
  bubbleColor: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "16px",
          background: "white",
          padding: "12px 24px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Speech bubble icon */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: bubbleColor,
              borderRadius: "12px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "16px",
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: `8px solid ${bubbleColor}`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#1f2937",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function ProgressDots({
  total,
  current,
  color,
  finalBossColor,
}: {
  total: number;
  current: number;
  color: string;
  finalBossColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "24px",
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background:
              i <= current
                ? i === total - 1
                  ? finalBossColor
                  : color
                : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

function LoadingSpinner({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div style={{ fontSize: "48px", marginBottom: "8px" }}>{emoji}</div>
      <p style={{ color: "#6b7280" }}>{text}</p>
    </div>
  );
}

function JourneySummary({
  selectedForks,
  responses,
  currentResponse,
  currentLevel,
  showFinalBoss,
  color,
}: {
  selectedForks: string[];
  responses: string[];
  currentResponse: string;
  currentLevel: number;
  showFinalBoss: boolean;
  color: string;
}) {
  const visibleCount = showFinalBoss ? selectedForks.length : currentLevel;
  if (visibleCount === 0) return null;

  return (
    <div style={{ marginTop: "32px" }}>
      <h4
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#6b7280",
          margin: "0 0 16px 0",
        }}
      >
        Yang sudah lo jawab:
      </h4>
      {selectedForks.slice(0, visibleCount).map((fork, index) => {
        const answer =
          index === currentLevel && currentResponse
            ? currentResponse
            : responses[index];
        return (
          <div
            key={index}
            style={{
              fontSize: "12px",
              color: "#6b7280",
              padding: "12px",
              background: "linear-gradient(135deg, #f9fafb 0%, #e9d5ff 100%)",
              borderRadius: "8px",
              borderLeft: `4px solid ${color}`,
              marginBottom: "8px",
            }}
          >
            <span style={{ fontWeight: 500, color }}>
              L{index + 1}:
            </span>{" "}
            {fork}
            {answer && (
              <div
                style={{
                  marginLeft: "16px",
                  marginTop: "4px",
                  fontStyle: "italic",
                  color: "#6b7280",
                }}
              >
                ↳ {answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LinearJourneySummary({
  questions,
  responses,
  currentLevel,
  showFinalBoss,
  color,
}: {
  questions: string[];
  responses: string[];
  currentLevel: number;
  showFinalBoss: boolean;
  color: string;
}) {
  const visibleCount = showFinalBoss ? responses.length : currentLevel;
  if (visibleCount === 0) return null;

  return (
    <div style={{ marginTop: "32px" }}>
      <h4
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#6b7280",
          margin: "0 0 16px 0",
        }}
      >
        Ngobrol so far:
      </h4>
      {responses.slice(0, visibleCount).map((answer, index) => (
        <div
          key={index}
          style={{
            fontSize: "12px",
            color: "#6b7280",
            padding: "12px",
            background: "linear-gradient(135deg, #f9fafb 0%, #e9d5ff 100%)",
            borderRadius: "8px",
            borderLeft: `4px solid ${color}`,
            marginBottom: "8px",
          }}
        >
          <span style={{ fontWeight: 500, color }}>Q{index + 1}:</span>{" "}
          {questions[index]}
          <div
            style={{
              marginLeft: "16px",
              marginTop: "4px",
              fontStyle: "italic",
              color: "#6b7280",
            }}
          >
            ↳ {answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShareButtons({
  shareText,
  twitterText,
}: {
  shareText: string;
  twitterText?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareText);
          alert("Udah di-copy! Share ke siapa aja 🪞");
        }}
        style={{
          padding: "10px 18px",
          border: "1px solid #d4d4d8",
          background: "white",
          color: "#374151",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        📋 Copy
      </button>

      <button
        onClick={() => {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, "_blank");
        }}
        style={{
          padding: "10px 18px",
          border: "1px solid #d4d4d8",
          background: "white",
          color: "#374151",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        💬 WhatsApp
      </button>

      <button
        onClick={() => {
          const text = twitterText ?? shareText;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
          window.open(twitterUrl, "_blank");
        }}
        style={{
          padding: "10px 18px",
          border: "1px solid #d4d4d8",
          background: "white",
          color: "#374151",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        🐦 Twitter
      </button>
    </div>
  );
}

// ============================================
// Riwayat Perjalanan
// ============================================

function HistorySection({
  history,
  expandedId,
  onToggle,
  onDelete,
  onRefresh,
}: {
  history: SavedJourney[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) {
  // Load history on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    onRefresh();
    setMounted(true);
  }, []);

  if (!mounted || history.length === 0) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#6b7280",
          margin: "0 0 12px 0",
          textAlign: "center",
        }}
      >
        📝 Riwayat Lo ({history.length})
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {history.slice(0, 5).map((j) => {
          const isExpanded = expandedId === j.id;
          return (
            <div
              key={j.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "hidden",
                background: "white",
              }}
            >
              <div
                onClick={() => onToggle(j.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  cursor: "pointer",
                  background: isExpanded ? "#f9fafb" : "white",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#374151",
                      margin: "0 0 2px 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {j.entryValue}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                    {formatRelativeTime(j.timestamp)} &middot;{" "}
                    {j.questTitle}
                  </p>
                </div>
                <span style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "8px" }}>
                  {isExpanded ? "▲" : "▶"}
                </span>
              </div>
              {isExpanded && (
                <div
                  style={{
                    padding: "16px",
                    borderTop: "1px solid #f3f4f6",
                    background: "#fafafa",
                  }}
                >
                  {/* Journey steps */}
                  <div style={{ marginBottom: "12px" }}>
                    {j.steps.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: "8px",
                          fontSize: "12px",
                        }}
                      >
                        <p
                          style={{
                            color: "#6b7280",
                            margin: "0 0 2px 0",
                            fontWeight: 500,
                          }}
                        >
                          L{i + 1}: {step.question}
                        </p>
                        {step.answer && (
                          <p
                            style={{
                              color: "#374151",
                              margin: "0 0 0 8px",
                              fontStyle: "italic",
                            }}
                          >
                            ↳ {step.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Analysis summary */}
                  {j.analysis && (
                    <div
                      style={{
                        padding: "12px",
                        background: "white",
                        borderRadius: "6px",
                        border: "1px solid #e5e7eb",
                        marginBottom: "12px",
                      }}
                    >
                      {j.analysis.emotionalCore && (
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1f2937",
                            margin: "0 0 8px 0",
                            textAlign: "center",
                          }}
                        >
                          &ldquo;{j.analysis.emotionalCore}&rdquo;
                        </p>
                      )}
                      {j.analysis.patterns &&
                        j.analysis.patterns.length > 0 && (
                          <div style={{ marginBottom: "4px" }}>
                            {j.analysis.patterns.map((p, pi) => (
                              <p
                                key={pi}
                                style={{
                                  fontSize: "11px",
                                  color: "#6b7280",
                                  margin: "0 0 4px 0",
                                }}
                              >
                                🔍 {p}
                              </p>
                            ))}
                          </div>
                        )}
                      {j.analysis.smallStep24h && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#059669",
                            margin: "8px 0 0 0",
                          }}
                        >
                          🌱 {j.analysis.smallStep24h}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Delete button */}
                  <div style={{ textAlign: "right" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Hapus perjalanan ini?")) {
                          onDelete(j.id);
                        }
                      }}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #fecaca",
                        background: "white",
                        color: "#dc2626",
                        borderRadius: "5px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// Main Engine
// ============================================

export default function ForkQuestEngine({ config }: { config: QuestConfig }) {
  if (config.mode === "fork") {
    return <ForkQuest config={config} />;
  }
  return <LinearQuest config={config} />;
}

// ============================================
// Fork Quest Mode
// ============================================

function ForkQuest({ config }: { config: ForkQuestConfig }) {
  const {
    title,
    subtitle,
    accentColor,
    accentGradient,
    bgGradient,
    progressDotColor,
    finalBossDotColor,
    logoBubbleColor,
    logoLabel,
    entry,
    levels,
    levelDescriptions,
    completionTitle,
    finalQuote,
    generateShareText,
    generateTwitterText,
    backToUrl,
    aiMode,
    analyzeJourney,
  } = config;

  const [entryValue, setEntryValue] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [forkHistory, setForkHistory] = useState<string[][]>([]);
  const [selectedForks, setSelectedForks] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showFinalBoss, setShowFinalBoss] = useState(false);
  // "entry" | "loading" | "fork-selection" | "responding" | "completed"
  const [phase, setPhase] = useState<string>("entry");
  // AI journey analysis result
  const [journeyAnalysis, setJourneyAnalysis] =
    useState<JourneyAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);
  const [history, setHistory] = useState<SavedJourney[]>([]);
  const [expandedJourneyId, setExpandedJourneyId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const totalLevels = levels.length;

  // ── load history on mount ──
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // ── static fork generation (fallback) ──
  const generateStaticForks = (level: number): string[] => {
    let forks: string[] = [];
    const levelData = levels[level];

    if (level === 0) {
      const lowerVal = entryValue.toLowerCase();
      let matched = false;
      for (const key of Object.keys(levelData.forks)) {
        if (key === "default") continue;
        if (lowerVal.includes(key.toLowerCase())) {
          forks = levelData.forks[key];
          matched = true;
          break;
        }
      }
      if (!matched) {
        forks = levelData.forks["default"] ?? [];
      }
    } else {
      forks = levelData.forks["default"] ?? [];
    }
    return forks;
  };

  // ── fork generation (AI-first, static-fallback) ──
  // latestResponses overrides state when it hasn't flushed yet
  const generateForks = async (level: number, latestResponses?: string[]) => {
    setIsLoading(true);
    setPhase("loading");
    setLoadingMessage("Mikir pertanyaan dulu...");

    // Build history of previous levels
    // Use latestResponses if available (state may not have flushed yet)
    const effectiveResponses = latestResponses ?? responses;
    const history: JourneyStep[] = [];
    for (let i = 0; i < selectedForks.length; i++) {
      history.push({
        question: selectedForks[i],
        answer: effectiveResponses[i] ?? "",
      });
    }

    // Try AI if enabled
    if (aiMode) {
      setLoadingMessage("Kawan Bertanya mikir... 🧠");
      try {
        const res = await fetch("/api/generate-forks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questType: logoLabel,
            questTitle: title,
            level,
            levelName: levels[level].name,
            levelDescription: levelDescriptions[level],
            entryValue,
            history,
            totalLevels,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.forks && data.forks.length >= 2) {
            const forks: string[] = data.forks;
            setForkHistory((prev) => [...prev, forks]);
            setCurrentLevel(level);
            setIsLoading(false);
            setCurrentResponse("");
            setPhase("fork-selection");
            if (level === totalLevels - 1) setShowFinalBoss(false);
            return;
          }
        }
        console.warn("AI fork generation failed, using static forks");
      } catch (err) {
        console.warn("AI fork generation error, falling back to static:", err);
      }
    }

    // Fallback: static forks with a small delay for UX
    await new Promise((r) => setTimeout(r, 600));
    const forks = generateStaticForks(level);
    setForkHistory((prev) => [...prev, forks]);
    setCurrentLevel(level);
    setIsLoading(false);
    setCurrentResponse("");
    setPhase("fork-selection");
    if (level === totalLevels - 1) setShowFinalBoss(false);
  };

  // ── journey analysis ──
  // latestResponses + latestAnswer overrides stale state after handleProceed
  const runJourneyAnalysis = async (
    latestResponses?: string[],
    latestAnswer?: string,
  ) => {
    if (!analyzeJourney) return;
    setIsAnalyzing(true);
    setAnalysisError(false);

    // Build journey steps — scoped outside try so catch can save to history
    const effectiveResponses = latestResponses ?? responses;
    const journey: JourneyStep[] = [];
    for (let i = 0; i < selectedForks.length; i++) {
      journey.push({
        question: selectedForks[i],
        answer: effectiveResponses[i] ?? "",
      });
    }
    // Include final answer — prefer latestAnswer over stale state
    const finalAnswer = latestAnswer ?? currentResponse;
    if (finalAnswer && journey.length > 0) {
      journey[journey.length - 1].answer = finalAnswer;
    }

    try {

      const res = await fetch("/api/analyze-journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questType: logoLabel,
          questTitle: title,
          entryValue,
          journey,
        }),
      });

      let analysis: JourneyAnalysis | null = null;

      if (res.ok) {
        analysis = await res.json();
        setJourneyAnalysis(analysis);
      } else {
        console.error(
          "Journey analysis API returned",
          res.status,
          await res.text().catch(() => ""),
        );
        setAnalysisError(true);
      }

      // Save to history — always, even if analysis failed
      const saved = addJourney({
        questTitle: title,
        entryValue,
        steps: journey,
        analysis,
      });
      setHistory((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Journey analysis failed:", err);
      setAnalysisError(true);
      // Save journey even on network error
      const saved = addJourney({
        questTitle: title,
        entryValue,
        steps: journey,
        analysis: null,
      });
      setHistory((prev) => [saved, ...prev]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ── handlers ──
  const handleSelectFork = (fork: string) => {
    const updated = [...selectedForks];
    updated[currentLevel] = fork;
    setSelectedForks(updated);
    setCurrentResponse("");
    setPhase("responding");
  };

  const handleProceed = () => {
    if (!currentResponse.trim()) return;
    const updatedResponses = [...responses];
    updatedResponses[currentLevel] = currentResponse;
    setResponses(updatedResponses);

    if (currentLevel < totalLevels - 1) {
      generateForks(currentLevel + 1, updatedResponses);
    } else {
      setShowFinalBoss(true);
      setPhase("completed");
      // Trigger AI analysis — pass fresh data before state flush
      runJourneyAnalysis(updatedResponses, currentResponse);
    }
  };

  const handleStart = () => {
    if (!entryValue.trim()) return;
    generateForks(0);
  };

  const reset = () => {
    setEntryValue("");
    setCurrentLevel(0);
    setForkHistory([]);
    setSelectedForks([]);
    setResponses([]);
    setCurrentResponse("");
    setIsLoading(false);
    setShowFinalBoss(false);
    setPhase("entry");
    setJourneyAnalysis(null);
    setIsAnalyzing(false);
    setAnalysisError(false);
    setExpandedJourneyId(null);
    setShowHistory(false);
  };

  const getCurrentForks = (): string[] => forkHistory[currentLevel] ?? [];

  // ── share data ──
  const shareCtx = buildShareContext(
    entryValue,
    selectedForks,
    responses,
    currentResponse,
    currentLevel,
  );
  const shareText = generateShareText(shareCtx);
  const twitterText = generateTwitterText?.(shareCtx);

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "768px",
        margin: "0 auto",
        background: bgGradient,
        minHeight: "100vh",
      }}
    >
      {/* ── HEADER ── */}
      {phase === "entry" ? (
        <>
          <div style={{ textAlign: "center", marginBottom: "8px", marginTop: "24px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "white",
                padding: "6px 16px",
                borderRadius: "20px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  background: logoBubbleColor,
                  borderRadius: "8px",
                  padding: "6px 10px",
                }}
              >
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  <div style={{ width: "5px", height: "5px", background: "white", borderRadius: "50%" }} />
                  <div style={{ width: "5px", height: "5px", background: "white", borderRadius: "50%" }} />
                  <div style={{ width: "5px", height: "5px", background: "white", borderRadius: "50%" }} />
                </div>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                {logoLabel}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#1f2937",
                margin: "0 0 12px 0",
              }}
            >
              {title}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "16px", margin: "0" }}>
              {subtitle}
            </p>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => (window.location.href = backToUrl)}
            style={{
              padding: "6px 0",
              border: "none",
              background: "transparent",
              color: "#9ca3af",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ← {logoLabel}
          </button>
          {!showFinalBoss && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b7280",
              }}
            >
              Pertanyaan {currentLevel + 1} dari {totalLevels}
            </span>
          )}
          <div style={{ width: "60px" }} /> {/* spacer for balance */}
        </div>
      )}

      {/* Progress dots (quest only) */}
      {phase !== "entry" && phase !== "completed" && (
        <div style={{ marginBottom: "24px" }}>
          <ProgressDots
            total={totalLevels}
            current={currentLevel}
            color={progressDotColor}
            finalBossColor={finalBossDotColor}
          />
        </div>
      )}

      {/* ── ENTRY PHASE ── */}
      {phase === "entry" && (
        <>
          {aiMode && (
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#9ca3af",
                marginBottom: "24px",
                maxWidth: "500px",
                margin: "0 auto 24px auto",
                lineHeight: "1.5",
              }}
            >
              Ini bukan terapi atau diagnosis. Sebuah ruang refleksi
              pribadi lewat pertanyaan. Kalau lo lagi dalam kondisi
              berat, ngobrol sama orang terpercaya atau profesional.
            </p>
          )}
          {entry.type === "direct-input" && (
            <>
              {entry.presets && entry.presets.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "12px",
                    }}
                  >
                    {entry.label ?? "Pilih keluhan umum:"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    {entry.presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setEntryValue(preset)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          background: "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = "#f3e8ff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "white";
                        }}
                      >
                        &ldquo;{preset}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "32px",
                }}
              >
                <input
                  type="text"
                  placeholder={entry.placeholder ?? "Tulis keluhan lo sendiri..."}
                  value={entryValue}
                  onChange={(e) => setEntryValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  style={{
                    flex: 1,
                    padding: "12px",
                    fontSize: "18px",
                    border: "2px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleStart}
                  disabled={!entryValue.trim() || isLoading}
                  style={{
                    padding: "12px 24px",
                    background: entryValue.trim()
                      ? accentGradient
                      : "#d1d5db",
                    color: entryValue.trim() ? "white" : "#6b7280",
                    border: "none",
                    borderRadius: "6px",
                    cursor: entryValue.trim() ? "pointer" : "not-allowed",
                    fontWeight: 600,
                  }}
                >
                  {isLoading ? "🌀" : "Start Quest!"}
                </button>
              </div>
            </>
          )}

          {entry.type === "theme-grid" && entry.themes && (
            <>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <p style={{ color: "#374151", fontSize: "16px" }}>
                  {entry.label ?? "Pilih tema:"}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  marginBottom: "48px",
                  maxWidth: "768px",
                  margin: "0 auto 48px auto",
                }}
              >
                {entry.themes.map((theme, index) => (
                  <div
                    key={index}
                    onClick={() => setEntryValue(theme)}
                    style={{
                      background:
                        entryValue === theme ? "#dbeafe" : "white",
                      border:
                        entryValue === theme
                          ? `2px solid ${accentColor}`
                          : "2px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow:
                        entryValue === theme
                          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                          : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) => {
                      if (entryValue !== theme)
                        e.currentTarget.style.background = "#f9fafb";
                    }}
                    onMouseOut={(e) => {
                      if (entryValue !== theme)
                        e.currentTarget.style.background = "white";
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#374151",
                        margin: "0",
                      }}
                    >
                      {theme}
                    </p>
                    {entryValue === theme && (
                      <div style={{ marginTop: "8px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            background: accentColor,
                            borderRadius: "50%",
                            margin: "0 auto",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── History hint ── */}
              {history.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#9ca3af",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                  >
                    📝 Lo udah {history.length} kali ngobrol —{" "}
                    {showHistory ? "sembunyiin" : "liat riwayat"} ▼
                  </button>
                  {showHistory && (
                    <div
                      style={{
                        marginTop: "8px",
                        maxWidth: "500px",
                        margin: "8px auto 0 auto",
                      }}
                    >
                      <HistorySection
                        history={history}
                        expandedId={expandedJourneyId}
                        onToggle={(id) =>
                          setExpandedJourneyId(
                            expandedJourneyId === id ? null : id,
                          )
                        }
                        onDelete={(id) => {
                          deleteJourney(id);
                          setHistory((prev) =>
                            prev.filter((j) => j.id !== id),
                          );
                          if (expandedJourneyId === id)
                            setExpandedJourneyId(null);
                        }}
                        onRefresh={() => setHistory(loadHistory())}
                      />
                    </div>
                  )}
                </div>
              )}

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <button
                  onClick={handleStart}
                  disabled={!entryValue || isLoading}
                  style={{
                    padding: "16px 32px",
                    fontSize: "18px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "none",
                    cursor: entryValue ? "pointer" : "not-allowed",
                    background: entryValue ? accentGradient : "#d1d5db",
                    color: entryValue ? "white" : "#6b7280",
                    boxShadow: entryValue
                      ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                      : "none",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    if (entryValue) {
                      e.currentTarget.style.transform = "scale(1.02)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {isLoading ? "🌀" : "Start Quest!"}
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ── LOADING ── */}
      {phase === "loading" && (
        <LoadingSpinner
          emoji={aiMode ? "🤔" : "🧠"}
          text={
            loadingMessage ||
            `Generating Level ${currentLevel + 1} forks...`
          }
        />
      )}

      {/* ── FORK SELECTION ── */}
      {phase === "fork-selection" && (
        <div style={{ marginBottom: "32px" }}>
          {/* Level context */}
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {currentLevel === 0 && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  margin: "0 0 8px 0",
                }}
              >
                Lo mulai dari &ldquo;{entryValue}&rdquo;
              </p>
            )}
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0" }}>
              {levelDescriptions[currentLevel]}
            </p>
          </div>

          {/* Fork options */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Pilih pertanyaan yang paling ngena:
            </h3>
            {getCurrentForks().map((fork, index) => (
              <div
                key={index}
                onClick={() => handleSelectFork(fork)}
                style={{
                  cursor: "pointer",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderLeft: "3px solid #6366f1",
                  borderRadius: "8px",
                  padding: "16px 20px",
                  marginBottom: "10px",
                  transition: "all 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.borderLeftColor = "#4f46e5";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderLeftColor = "#6366f1";
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    margin: "0",
                    lineHeight: "1.6",
                  }}
                >
                  {fork}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESPONDING ── */}
      {phase === "responding" && (
        <div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "#1f2937",
                lineHeight: "1.7",
                margin: "0",
              }}
            >
              {selectedForks[currentLevel]}
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "10px",
              }}
            >
              Jawab bebas. Gak perlu rapi.
            </label>
            <textarea
              placeholder="Tulis apa yang muncul di kepala lo..."
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                border: "1px solid #d4d4d8",
                borderRadius: "8px",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: "1.6",
                boxSizing: "border-box",
              }}
            />
          </div>

          {currentResponse.trim() && currentLevel < totalLevels - 1 && (
            <button
              onClick={handleProceed}
              style={{
                width: "100%",
                padding: "14px",
                background: "#1f2937",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Lanjut →
            </button>
          )}

          {currentLevel === totalLevels - 1 &&
            currentResponse.trim() &&
            !showFinalBoss && (
              <button
                onClick={handleProceed}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#1f2937",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Lihat hasilnya
              </button>
            )}
        </div>
      )}

      {/* ── COMPLETED ── */}
      {phase === "completed" && showFinalBoss && (
        <div style={{ padding: "32px 0" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#9ca3af",
                marginBottom: "16px",
                textAlign: "center",
                margin: "0 0 16px 0",
              }}
            >
              {completionTitle}
            </p>

            {/* ── AI Journey Analysis ── */}
            {analyzeJourney && (
              <>
                {isAnalyzing && (
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: "24px 20px",
                      background:
                        "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                      border: "2px dashed #a855f7",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#7c3aed",
                        fontSize: "14px",
                        fontWeight: 600,
                        margin: "0 0 8px 0",
                      }}
                    >
                      🧠 Kawan Bertanya lagi baca perjalanan lo...
                    </p>
                    <p
                      style={{
                        color: "#a78bfa",
                        fontSize: "18px",
                        margin: "0",
                        letterSpacing: "2px",
                      }}
                    >
                      <style>{`
                        @keyframes dotPulse {
                          0%, 20% { opacity: 0.2; }
                          50% { opacity: 1; }
                          100% { opacity: 0.2; }
                        }
                      `}</style>
                      <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0s" }}>.</span>
                      <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0.2s" }}>.</span>
                      <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0.4s" }}>.</span>
                    </p>
                  </div>
                )}

                {analysisError && !isAnalyzing && !journeyAnalysis && (
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: "20px",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#dc2626",
                        fontSize: "13px",
                        fontWeight: 500,
                        margin: "0 0 8px 0",
                      }}
                    >
                      Gagal ambil insight. Coba refresh halaman?
                    </p>
                    <button
                      onClick={() => {
                        setAnalysisError(false);
                        runJourneyAnalysis();
                      }}
                      style={{
                        padding: "6px 14px",
                        border: "1px solid #fca5a5",
                        background: "white",
                        color: "#dc2626",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Coba lagi
                    </button>
                  </div>
                )}

                {journeyAnalysis && (
                  <div
                    style={{
                      textAlign: "left",
                      marginBottom: "24px",
                      background: "#fafafa",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "28px",
                    }}
                  >

                    {journeyAnalysis.emotionalCore && (
                      <div
                        style={{
                          marginBottom: "20px",
                          padding: "16px 0",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#1f2937",
                            lineHeight: "1.5",
                            margin: "0",
                          }}
                        >
                          &ldquo;{journeyAnalysis.emotionalCore}&rdquo;
                        </p>
                      </div>
                    )}

                    {journeyAnalysis.patterns &&
                      journeyAnalysis.patterns.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#6b7280",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Pola yang keliatan:
                          </p>
                          {journeyAnalysis.patterns.map((p, i) => (
                            <div
                              key={i}
                              style={{
                                fontSize: "13px",
                                color: "#374151",
                                padding: "6px 0",
                                borderBottom:
                                  i < journeyAnalysis.patterns.length - 1
                                    ? "1px solid #e9d5ff"
                                    : "none",
                              }}
                            >
                              🔍 {p}
                            </div>
                          ))}
                        </div>
                      )}

                    {journeyAnalysis.reflection && (
                      <div
                        style={{
                          padding: "12px",
                          background: "rgba(255,255,255,0.6)",
                          borderRadius: "6px",
                          marginBottom: "12px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#374151",
                            lineHeight: "1.7",
                            margin: "0",
                          }}
                        >
                          {journeyAnalysis.reflection}
                        </p>
                      </div>
                    )}

                    {journeyAnalysis.missedQuestions &&
                      journeyAnalysis.missedQuestions.length > 0 && (
                        <div>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#6b7280",
                              margin: "0 0 8px 0",
                            }}
                          >
                            Pertanyaan yang mungkin belum sempat ditanyain:
                          </p>
                          {journeyAnalysis.missedQuestions.map((q, i) => (
                            <p
                              key={i}
                              style={{
                                fontSize: "13px",
                                color: "#7c3aed",
                                fontStyle: "italic",
                                margin: "0 0 4px 0",
                              }}
                            >
                              💭 {q}
                            </p>
                          ))}
                        </div>
                      )}

                    {journeyAnalysis.smallStep24h && (
                      <div
                        style={{
                          padding: "14px",
                          background:
                            "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                          borderRadius: "8px",
                          border: "2px solid #10b981",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#059669",
                            margin: "0 0 6px 0",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          🌱 Langkah Kecil 24 Jam
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#065f46",
                            margin: "0",
                          }}
                        >
                          {journeyAnalysis.smallStep24h}
                        </p>
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        marginTop: "16px",
                        margin: "16px 0 0 0",
                        textAlign: "center",
                      }}
                    >
                      Ini bukan terapi atau diagnosis. Ini ruang refleksi.
                      Kalau lo lagi dalam kondisi berat atau krisis, ngobrol
                      sama orang terpercaya atau profesional.
                    </p>
                  </div>
                )}
              </>
            )}

            <ShareButtons
              shareText={shareText}
              twitterText={twitterText}
            />

            {/* ── Riwayat Perjalanan ── */}
            <HistorySection
              history={history}
              expandedId={expandedJourneyId}
              onToggle={(id) =>
                setExpandedJourneyId(
                  expandedJourneyId === id ? null : id,
                )
              }
              onDelete={(id) => {
                deleteJourney(id);
                setHistory((prev) => prev.filter((j) => j.id !== id));
                if (expandedJourneyId === id) setExpandedJourneyId(null);
              }}
              onRefresh={() => setHistory(loadHistory())}
            />

            {finalQuote && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  fontStyle: "italic",
                  margin: "0",
                }}
              >
                {finalQuote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Journey Summary (during quest) ── */}
      {phase !== "entry" && phase !== "completed" && (
        <JourneySummary
          selectedForks={selectedForks}
          responses={responses}
          currentResponse={currentResponse}
          currentLevel={currentLevel}
          showFinalBoss={false}
          color={accentColor}
        />
      )}

      {/* ── Journey Recap (completed) ── */}
      {phase === "completed" && showFinalBoss && (
        <div style={{ marginTop: "32px", maxWidth: "600px", margin: "32px auto 0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#374151",
                margin: "0",
              }}
            >
              📝 Perjalanan Lo
            </h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                alert("Perjalanan lo udah di-copy! 📋");
              }}
              style={{
                padding: "6px 12px",
                border: "1px solid #d1d5db",
                background: "white",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              📋 Copy Full Journey
            </button>
          </div>
          <JourneySummary
            selectedForks={selectedForks}
            responses={responses}
            currentResponse={currentResponse}
            currentLevel={currentLevel}
            showFinalBoss={true}
            color={accentColor}
          />
        </div>
      )}

      {/* ── Reset (only after completion) ── */}
      {phase === "completed" && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={reset}
            style={{
              padding: "10px 20px",
              border: "1px solid #d1d5db",
              background: "white",
              color: "#6b7280",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Mulai dari awal
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// Linear Quest Mode
// ============================================

function LinearQuest({ config }: { config: LinearQuestConfig }) {
  const {
    title,
    subtitle,
    accentColor,
    accentGradient,
    bgGradient,
    cardBorderColor,
    progressDotColor,
    levelHeaderBg,
    logoBubbleColor,
    logoLabel,
    levels,
    completionTitle,
    completionMessage,
    completionEmoji,
    finalQuote,
    generateShareText,
    generateTwitterText,
    backToUrl,
  } = config;

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const totalLevels = levels.length;
  const questions = levels.map((l) => l.question);

  const handleNext = () => {
    if (!currentResponse.trim()) return;
    setIsLoading(true);
    const updated = [...responses, currentResponse];
    setResponses(updated);
    setCurrentResponse("");

    setTimeout(() => {
      if (currentLevel < totalLevels - 1) {
        setCurrentLevel((prev) => prev + 1);
      } else {
        setShowFinalResult(true);
      }
      setIsLoading(false);
    }, 800);
  };

  const restart = () => {
    setCurrentLevel(0);
    setResponses([]);
    setCurrentResponse("");
    setShowFinalResult(false);
  };

  const shareCtx = buildLinearShareContext(questions, responses);
  const shareText = generateShareText(shareCtx);
  const twitterText = generateTwitterText?.(shareCtx);

  const currentLevelData = levels[currentLevel];

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "768px",
        margin: "0 auto",
        background: bgGradient,
        minHeight: "100vh",
      }}
    >
      <LogoHeader label={logoLabel} bubbleColor={logoBubbleColor} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => (window.location.href = backToUrl)}
            style={{
              padding: "8px 16px",
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            ← Back to Collection
          </button>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              margin: "0",
              background: accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>
        </div>
        <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "18px" }}>
          {subtitle}
        </p>
        {!showFinalResult && (
          <ProgressDots
            total={totalLevels}
            current={currentLevel}
            color={progressDotColor}
            finalBossColor={progressDotColor}
          />
        )}
      </div>

      {/* ── LOADING ── */}
      {isLoading && (
        <LoadingSpinner emoji="☕" text="Nyeduh pertanyaan berikutnya..." />
      )}

      {/* ── QUESTION ── */}
      {!isLoading && !showFinalResult && currentLevel < totalLevels && (
        <div style={{ marginBottom: "32px" }}>
          {/* Level Header */}
          <div
            style={{
              marginBottom: "24px",
              background: levelHeaderBg,
              border: `2px solid ${cardBorderColor}`,
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              {currentLevelData.emoji}
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: accentColor,
                margin: "0 0 8px 0",
              }}
            >
              {currentLevelData.name}
            </h2>
            <p style={{ color: "#6b7280", margin: "0", fontSize: "14px" }}>
              {currentLevelData.description}
            </p>
          </div>

          {/* Question Card */}
          <div
            style={{
              background: "white",
              border: `2px solid ${cardBorderColor}`,
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#374151",
                margin: "0",
                lineHeight: "1.6",
              }}
            >
              {currentLevelData.question}
            </p>
          </div>

          {/* Response Input */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Jawab senyaman lo aja:
            </label>
            <input
              type="text"
              placeholder={currentLevelData.placeholder}
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && currentResponse.trim() && handleNext()
              }
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                border: `2px solid ${cardBorderColor}`,
                borderRadius: "8px",
                outline: "none",
                background: "white",
                textAlign: "left",
                paddingLeft: "20px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!currentResponse.trim()}
            style={{
              width: "100%",
              padding: "16px",
              background: currentResponse.trim()
                ? accentGradient
                : "#d1d5db",
              color: currentResponse.trim() ? "white" : "#6b7280",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: 600,
              cursor: currentResponse.trim() ? "pointer" : "not-allowed",
            }}
          >
            {currentLevel < totalLevels - 1
              ? "Jawab & Lanjut ➡️"
              : "Selesaikan Ngobrol ☕"}
          </button>
        </div>
      )}

      {/* ── Journey Summary (during quest) ── */}
      {!isLoading && !showFinalResult && currentLevel > 0 && (
        <LinearJourneySummary
          questions={questions}
          responses={responses}
          currentLevel={currentLevel}
          showFinalBoss={false}
          color={accentColor}
        />
      )}

      {/* ── COMPLETED ── */}
      {!isLoading && showFinalResult && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
              border: "2px solid #f59e0b",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>
              {completionEmoji}
            </div>
            <h3
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "16px",
              }}
            >
              {completionTitle}
            </h3>
            <p
              style={{
                color: "#374151",
                marginBottom: "32px",
                fontSize: "18px",
              }}
            >
              {completionMessage}
            </p>

            {/* Journey Summary */}
            <div style={{ textAlign: "left", marginBottom: "32px" }}>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: accentColor,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Rangkuman Ngobrol Lo:
              </h4>
              {levels.map((lvl, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    borderLeft: `4px solid ${cardBorderColor}`,
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: accentColor,
                      marginBottom: "8px",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {lvl.emoji} {lvl.question}
                  </p>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#6b7280",
                      margin: "0",
                      fontSize: "15px",
                    }}
                  >
                    ↳ {responses[i] ?? ""}
                  </p>
                </div>
              ))}
            </div>

            <ShareButtons
              shareText={shareText}
              twitterText={twitterText}
            />

            <p
              style={{
                fontSize: "14px",
                color: accentColor,
                fontStyle: "italic",
                marginBottom: "24px",
              }}
            >
              {finalQuote}
            </p>

            {/* Restart Button */}
            <button
              onClick={restart}
              style={{
                padding: "12px 24px",
                border: `2px solid ${cardBorderColor}`,
                background: "white",
                color: accentColor,
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              🔁 Ngobrol Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
