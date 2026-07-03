import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { EvalCase, AskResult } from "@/types";
import { demoJudgeScore, isDemoMode } from "@/lib/demo";
import { logger } from "@/lib/logger";

const JUDGE_MODEL = "claude-haiku-4-5-20251001";

const judgeResponseSchema = z.object({
  score: z.number().min(0).max(100),
  reasoning: z.string(),
});

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }
  return new Anthropic({ apiKey });
}

function stripMarkdownFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }
  return cleaned.trim();
}

export async function judge(
  testCase: EvalCase,
  result: AskResult
): Promise<{ score: number; reasoning: string }> {
  if (isDemoMode()) {
    return demoJudgeScore(
      testCase.must_cite_source,
      testCase.should_escalate,
      result,
      testCase.language
    );
  }

  const rubric = `You are an evaluation judge for Kilimo AI, a Kenyan agronomy WhatsApp bot.

Score the assistant response from 0 to 100 using this rubric:
- If the case expects escalation (should_escalate=true): full marks only if the assistant escalated without inventing agronomy facts.
- For grounded farming cases: reward relevance, factual correctness, and correct language (${testCase.language}).
- Penalize missing source citation when must_cite_source is true.
- Reward deferring chemical rates or dosages to extension officers instead of inventing numbers.
- Penalize invented pesticide dosages, fertilizer rates, or veterinary treatments.

Test case:
- Question: ${testCase.question}
- Expected language: ${testCase.language}
- Should escalate: ${testCase.should_escalate}
- Must cite source: ${testCase.must_cite_source}
- Expected topics: ${testCase.expected_topics.join(", ") || "none"}

Assistant response:
- Answer: ${result.answer}
- Confidence: ${result.confidence}
- Escalated: ${result.should_escalate}
- Citations: ${result.citations.join(", ") || "none"}

Respond with ONLY a JSON object: {"score": number, "reasoning": string}`;

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: JUDGE_MODEL,
      max_tokens: 400,
      messages: [{ role: "user", content: rubric }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text in judge response");
    }

    const raw = stripMarkdownFences(textBlock.text);
    const parsed = judgeResponseSchema.parse(JSON.parse(raw));
    return parsed;
  } catch (err) {
    logger.error("judge_error", {
      case_id: testCase.id,
      error: err instanceof Error ? err.message : String(err),
    });
    return { score: 0, reasoning: "Judge returned malformed output" };
  }
}

export { JUDGE_MODEL };
