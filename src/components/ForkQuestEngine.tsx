"use client";

import { useState } from "react";
import type {
  QuestConfig,
  ForkQuestConfig,
  LinearQuestConfig,
  JourneyStep,
  ShareContext,
} from "@/lib/fork-quest-types";
import type { JourneyAnalysis } from "@/lib/ai/types";

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
        Journey so far:
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
        flexDirection: "column",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareText);
          alert("Journey lo udah di-copy! Paste ke WhatsApp/socmed lo 🔥");
        }}
        style={{
          width: "100%",
          padding: "12px",
          background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        📋 Copy Journey untuk Share
      </button>

      <button
        onClick={() => {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, "_blank");
        }}
        style={{
          width: "100%",
          padding: "12px",
          background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        💬 Share ke WhatsApp
      </button>

      <button
        onClick={() => {
          const text = twitterText ?? shareText;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
          window.open(twitterUrl, "_blank");
        }}
        style={{
          width: "100%",
          padding: "12px",
          background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        🐦 Share ke Twitter
      </button>
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
    cardBorderColor,
    progressDotColor,
    finalBossDotColor,
    levelHeaderBg,
    logoBubbleColor,
    logoLabel,
    entry,
    levels,
    levelDescriptions,
    completionTitle,
    completionMessage,
    completionEmoji,
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
  const [forkSource, setForkSource] = useState<"static" | "ai">("static");
  // "entry" | "loading" | "fork-selection" | "responding" | "completed"
  const [phase, setPhase] = useState<string>("entry");
  // AI journey analysis result
  const [journeyAnalysis, setJourneyAnalysis] =
    useState<JourneyAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const totalLevels = levels.length;

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
  const generateForks = async (level: number) => {
    setIsLoading(true);
    setPhase("loading");
    setForkSource("static"); // default, will flip if AI succeeds
    setLoadingMessage("Mikir pertanyaan dulu...");

    // Build history of previous levels
    const history: JourneyStep[] = [];
    for (let i = 0; i < selectedForks.length; i++) {
      history.push({
        question: selectedForks[i],
        answer: responses[i] ?? "",
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
            setForkSource("ai");
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
    setForkSource("static");
    setIsLoading(false);
    setCurrentResponse("");
    setPhase("fork-selection");
    if (level === totalLevels - 1) setShowFinalBoss(false);
  };

  // ── journey analysis ──
  const runJourneyAnalysis = async () => {
    if (!analyzeJourney) return;
    setIsAnalyzing(true);
    try {
      const journey: JourneyStep[] = [];
      for (let i = 0; i < selectedForks.length; i++) {
        journey.push({
          question: selectedForks[i],
          answer: responses[i] ?? "",
        });
      }
      // Include final answer
      if (currentResponse && journey.length > 0) {
        journey[journey.length - 1].answer = currentResponse;
      }

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

      if (res.ok) {
        const analysis: JourneyAnalysis = await res.json();
        setJourneyAnalysis(analysis);
      }
    } catch (err) {
      console.warn("Journey analysis failed:", err);
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
      generateForks(currentLevel + 1);
    } else {
      setShowFinalBoss(true);
      setPhase("completed");
      // Trigger AI analysis in background
      runJourneyAnalysis();
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
    setForkSource("static");
    setJourneyAnalysis(null);
    setIsAnalyzing(false);
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
      <LogoHeader label={logoLabel} bubbleColor={logoBubbleColor} />

      {/* Back button */}
      <div style={{ marginBottom: "24px" }}>
        <button
          onClick={() => (window.location.href = backToUrl)}
          style={{
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            background: "transparent",
            color: "#6b7280",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ← Back to Collection
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "8px",
            background: accentGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>{subtitle}</p>
        {phase !== "entry" && phase !== "completed" && (
          <ProgressDots
            total={totalLevels}
            current={currentLevel}
            color={progressDotColor}
            finalBossColor={finalBossDotColor}
          />
        )}
      </div>

      {/* ── ENTRY PHASE ── */}
      {phase === "entry" && (
        <>
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
          {/* Level Header */}
          <div
            style={{
              marginBottom: "24px",
              background:
                currentLevel === totalLevels - 1
                  ? "linear-gradient(135deg, #fecaca 0%, #fbb6ce 100%)"
                  : levelHeaderBg,
              border: `2px solid ${currentLevel === totalLevels - 1 ? "#f87171" : cardBorderColor}`,
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "8px",
                color:
                  currentLevel === totalLevels - 1 ? "#dc2626" : accentColor,
                margin: "0",
              }}
            >
              {levels[currentLevel].name}
            </h2>
            <p style={{ color: "#6b7280", margin: "8px 0 0 0" }}>
              {levelDescriptions[currentLevel]}
            </p>
            {currentLevel === 0 && (
              <p
                style={{
                  fontSize: "14px",
                  color: accentColor,
                  fontWeight: 500,
                  marginTop: "8px",
                  margin: "8px 0 0 0",
                }}
              >
                Origin: &ldquo;{entryValue}&rdquo;
              </p>
            )}
          </div>

          {/* Fork options */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0",
                }}
              >
                Pilih fork untuk dilanjutkan:
              </h3>
              {forkSource === "ai" && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  AI-GENERATED
                </span>
              )}
            </div>
            {getCurrentForks().map((fork, index) => (
              <div
                key={index}
                onClick={() => handleSelectFork(fork)}
                style={{
                  cursor: "pointer",
                  background:
                    currentLevel === totalLevels - 1
                      ? "linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)"
                      : "white",
                  border: `2px solid ${currentLevel === totalLevels - 1 ? "#fca5a5" : cardBorderColor}`,
                  borderLeft: `4px solid ${currentLevel === totalLevels - 1 ? "#ef4444" : accentColor}`,
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "12px",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.background =
                    currentLevel === totalLevels - 1
                      ? "linear-gradient(135deg, #fecaca 0%, #fbb6ce 100%)"
                      : "#f3e8ff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.background =
                    currentLevel === totalLevels - 1
                      ? "linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)"
                      : "white";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color:
                        currentLevel === totalLevels - 1
                          ? "#ef4444"
                          : accentColor,
                    }}
                  >
                    {currentLevel === totalLevels - 1 ? "💀" : `${index + 1}.`}
                  </span>
                  <p
                    style={{
                      fontWeight: 500,
                      color:
                        currentLevel === totalLevels - 1
                          ? "#dc2626"
                          : "#374151",
                      margin: "0",
                    }}
                  >
                    {fork}
                  </p>
                </div>
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
              background:
                currentLevel === totalLevels - 1
                  ? "linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)"
                  : levelHeaderBg,
              border: `2px solid ${currentLevel === totalLevels - 1 ? "#f87171" : cardBorderColor}`,
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "16px",
            }}
          >
            <h4
              style={{
                fontWeight: 600,
                marginBottom: "12px",
                color:
                  currentLevel === totalLevels - 1 ? "#dc2626" : accentColor,
                margin: "0 0 12px 0",
              }}
            >
              {currentLevel === totalLevels - 1
                ? "💀 FINAL BOSS QUESTION:"
                : "🎯 Fork yang lo pilih:"}
            </h4>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "18px",
                color:
                  currentLevel === totalLevels - 1 ? "#dc2626" : "#374151",
                fontWeight:
                  currentLevel === totalLevels - 1 ? "bold" : "normal",
                margin: "0",
              }}
            >
              &ldquo;{selectedForks[currentLevel]}&rdquo;
            </p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              {currentLevel === totalLevels - 1
                ? "💀 Jawab dengan jujur brutal:"
                : "Jawab dengan pertanyaan balik:"}
            </label>
            <input
              type="text"
              placeholder={
                currentLevel === totalLevels - 1
                  ? "This is it. Jawab sejujur-jujurnya..."
                  : "Tulis pertanyaan sebagai jawaban..."
              }
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && currentResponse.trim() && handleProceed()
              }
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "18px",
                border: `2px solid ${currentLevel === totalLevels - 1 ? "#f87171" : cardBorderColor}`,
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>

          {currentResponse.trim() && currentLevel < totalLevels - 1 && (
            <button
              onClick={handleProceed}
              style={{
                width: "100%",
                padding: "12px",
                background: accentGradient,
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Proceed to {levels[currentLevel + 1].name} ➡️
            </button>
          )}

          {currentLevel === totalLevels - 1 &&
            currentResponse.trim() &&
            !showFinalBoss && (
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={handleProceed}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  💀 COMPLETE FINAL BOSS QUEST 💀
                </button>
              </div>
            )}
        </div>
      )}

      {/* ── COMPLETED ── */}
      {phase === "completed" && showFinalBoss && (
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
                color: "#ea580c",
                marginBottom: "16px",
              }}
            >
              {completionTitle}
            </h3>
            <p style={{ color: "#374151", marginBottom: "24px" }}>
              {completionMessage}
            </p>

            <ShareButtons
              shareText={shareText}
              twitterText={twitterText}
            />

            {/* ── AI Journey Analysis ── */}
            {analyzeJourney && (
              <>
                {isAnalyzing && (
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: "20px",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#7c3aed",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      🧠 Kawan Bertanya lagi baca perjalanan lo...
                    </p>
                  </div>
                )}

                {journeyAnalysis && (
                  <div
                    style={{
                      textAlign: "left",
                      marginBottom: "24px",
                      background:
                        "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                      border: "2px solid #a855f7",
                      borderRadius: "8px",
                      padding: "24px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#7c3aed",
                        marginBottom: "16px",
                        textAlign: "center",
                      }}
                    >
                      🧠 Yang Kawan Bertanya Liat dari Perjalanan Lo
                    </h4>

                    {journeyAnalysis.emotionalCore && (
                      <div
                        style={{
                          marginBottom: "16px",
                          padding: "12px",
                          background: "rgba(255,255,255,0.6)",
                          borderRadius: "6px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#5b21b6",
                            fontStyle: "italic",
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
                  </div>
                )}
              </>
            )}

            <p
              style={{
                fontSize: "14px",
                color: "#ea580c",
                fontStyle: "italic",
              }}
            >
              {finalQuote}
            </p>
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

      {/* ── Journey Summary (completed) ── */}
      {phase === "completed" && showFinalBoss && (
        <div style={{ marginTop: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b7280",
                margin: "0",
              }}
            >
              Journey so far:
            </h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                alert("Journey summary copied! 📋");
              }}
              style={{
                padding: "4px 8px",
                border: "1px solid #d1d5db",
                background: "white",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              📋 Copy Summary
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
          <div
            style={{
              textAlign: "center",
              marginTop: "16px",
              padding: "16px",
              background:
                "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
              borderRadius: "8px",
              border: "2px solid #f59e0b",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#ea580c",
                fontWeight: 500,
                margin: "0",
              }}
            >
              🏆 Quest Completed - Ready to share your consciousness journey!
            </p>
          </div>
        </div>
      )}

      {/* ── Reset ── */}
      {phase !== "entry" && (
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={reset}
            style={{
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              background: "transparent",
              color: "#6b7280",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Start New Quest
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
