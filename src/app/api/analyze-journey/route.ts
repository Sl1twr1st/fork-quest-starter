// POST /api/analyze-journey
// Analyzes the full 5-level journey and returns patterns + reflection.

import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  JOURNEY_ANALYSIS_SYSTEM,
  buildJourneyAnalysisPrompt,
} from "@/lib/ai/prompts";
import type { AnalyzeJourneyInput } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body: AnalyzeJourneyInput = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not set" },
        { status: 500 },
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const userPrompt = buildJourneyAnalysisPrompt(body);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      temperature: 0.7,
      system: JOURNEY_ANALYSIS_SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent =
      message.content.find((block) => block.type === "text")?.text ?? "";

    // Defensive JSON extraction — strip code fences, find first JSON object,
    // handle truncated responses gracefully.
    let jsonStr = "";
    const fenceMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    } else {
      const objMatch = textContent.match(/(\{[\s\S]*\})/);
      if (objMatch) jsonStr = objMatch[1].trim();
    }

    // Fallback: try to extract partial JSON if no complete object found
    if (!jsonStr) {
      // Check if there's at least a partial JSON starting with {
      const partial = textContent.match(/(\{[\s\S]*)/);
      if (partial) jsonStr = partial[1].trim();
    }

    // Try to close truncated JSON by counting braces
    if (jsonStr && !jsonStr.endsWith("}")) {
      let openBraces = 0;
      for (const ch of jsonStr) {
        if (ch === "{") openBraces++;
        if (ch === "}") openBraces--;
      }
      // Close unclosed braces
      while (openBraces > 0) {
        jsonStr += "}";
        openBraces--;
      }
      // Close unclosed strings
      const inString =
        (jsonStr.match(/(?<!\\)"/g) || []).length % 2 !== 0;
      if (inString) jsonStr += '"';
    }

    let patterns: string[] = [];
    let emotionalCore = "";
    let reflection = "";
    let missedQuestions: string[] = [];
    let smallStep24h = "";

    if (jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        patterns = parsed.patterns ?? [];
        emotionalCore = parsed.emotionalCore ?? "";
        reflection = parsed.reflection ?? "";
        missedQuestions = parsed.missedQuestions ?? [];
        smallStep24h = parsed.smallStep24h ?? "";
      } catch (parseErr) {
        // Partial extraction: try to salvage individual fields with regex
        console.warn(
          "JSON parse failed, attempting partial extraction:",
          parseErr,
        );
        const extract = (key: string): string => {
          const m = jsonStr.match(
            new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"),
          );
          return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n") : "";
        };
        const extractArr = (key: string): string[] => {
          const m = jsonStr.match(
            new RegExp(`"${key}"\\s*:\\s*\\[([\\s\\S]*?)\\]`, "s"),
          );
          if (!m) return [];
          const items = m[1].match(/"((?:[^"\\\\]|\\\\.)*)"/g);
          return (items ?? []).map((s) =>
            s.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n"),
          );
        };
        patterns = extractArr("patterns");
        emotionalCore = extract("emotionalCore");
        reflection = extract("reflection");
        missedQuestions = extractArr("missedQuestions");
        smallStep24h = extract("smallStep24h");
      }
    } else {
      console.error(
        "No JSON content found in Claude analysis response:",
        textContent.slice(0, 200),
      );
    }

    // Structured log: journey analysis completed
    console.log(
      JSON.stringify({
        event: "journey_analyzed",
        questType: body.questType,
        questTitle: body.questTitle,
        entryValue: body.entryValue,
        journeyDepth: body.journey?.length ?? 0,
        answerLengths: body.journey?.map((j) => j.answer?.length ?? 0) ?? [],
        emotionalCore,
        patternCount: patterns.length,
        partial: !textContent.includes("smallStep24h"),
        timestamp: new Date().toISOString(),
      }),
    );

    // Return whatever we salvaged — never fail completely
    return NextResponse.json({
      patterns,
      emotionalCore,
      reflection,
      missedQuestions,
      smallStep24h,
      partial: !textContent.includes("smallStep24h"), // signal if response was truncated
    });
  } catch (error) {
    console.error("analyze-journey error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze journey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
