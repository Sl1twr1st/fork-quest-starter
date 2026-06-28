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

    const jsonMatch =
      textContent.match(/```(?:json)?\s*([\s\S]*?)```/) ??
      textContent.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      console.error(
        "Failed to parse JSON from Claude analysis:",
        textContent,
      );
      return NextResponse.json(
        { error: "Invalid response format", raw: textContent },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(jsonMatch[1]);

    return NextResponse.json({
      patterns: parsed.patterns ?? [],
      emotionalCore: parsed.emotionalCore ?? "",
      reflection: parsed.reflection ?? "",
      missedQuestions: parsed.missedQuestions ?? [],
      smallStep24h: parsed.smallStep24h ?? "",
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
