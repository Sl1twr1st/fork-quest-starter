// POST /api/generate-forks
// Proxies to Claude to generate personalized forks for the current level.

import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  KAWAN_BERTANYA_SYSTEM,
  buildForkGenerationPrompt,
} from "@/lib/ai/prompts";
import type { GenerateForksInput } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body: GenerateForksInput = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not set" },
        { status: 500 },
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const userPrompt = buildForkGenerationPrompt(body);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      temperature: 0.9, // higher temperature for creative, varied questions
      system: KAWAN_BERTANYA_SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Parse the JSON from Claude's response
    const textContent =
      message.content.find((block) => block.type === "text")?.text ?? "";

    // Try to extract JSON — Claude sometimes wraps it in markdown code blocks
    const jsonMatch =
      textContent.match(/```(?:json)?\s*([\s\S]*?)```/) ??
      textContent.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      console.error("Failed to parse JSON from Claude response:", textContent);
      return NextResponse.json(
        { error: "Invalid response format", raw: textContent },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(jsonMatch[1]);
    const forks: string[] = parsed.forks ?? [];

    // Structured log: fork generation success
    console.log(
      JSON.stringify({
        event: "forks_generated",
        questType: body.questType,
        questTitle: body.questTitle,
        level: body.level,
        levelName: body.levelName,
        entryValue: body.entryValue,
        historyDepth: body.history?.length ?? 0,
        forkCount: forks.length,
        timestamp: new Date().toISOString(),
      }),
    );

    return NextResponse.json({ forks });
  } catch (error) {
    console.error("generate-forks error:", error);
    console.log(
      JSON.stringify({
        event: "forks_failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }),
    );
    return NextResponse.json(
      {
        error: "Failed to generate forks",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
