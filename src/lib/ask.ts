import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { AskResult, Language } from "@/types";
import { demoSynthesizeAnswer, isDemoMode } from "./demo";
import { detectLanguage } from "./language";
import { logger } from "./logger";
import { buildSystemPrompt, PROMPT_VERSION } from "./prompt";
import { retrieveRelevant } from "./retrieval";

const MODEL = "claude-sonnet-4-6";

const structuredAnswerSchema = z.object({
  answer: z.string(),
  confidence: z.number().min(0).max(1),
  citations: z.array(z.string()),
  should_escalate: z.boolean(),
  reason_for_escalation: z.string().nullable(),
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

function getEscalationThreshold(): number {
  const raw = process.env.ESCALATION_THRESHOLD ?? "0.6";
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0.6;
}

function fallbackResult(language: Language, latencyMs: number): AskResult {
  const answer =
    language === "sw"
      ? "Samahani, siwezi kushughulikia swali hilo kwa sasa. Mtaalamu wa kilimo atakujibu."
      : "Sorry, I cannot handle that question right now. An agronomist will follow up.";
  return {
    answer,
    confidence: 0,
    citations: [],
    should_escalate: true,
    reason_for_escalation: "pipeline_error",
    language,
    retrieved_ids: [],
    latency_ms: latencyMs,
    prompt_version: PROMPT_VERSION,
  };
}

export async function ask(
  question: string,
  forcedLanguage?: Language
): Promise<AskResult> {
  const start = Date.now();
  const language = forcedLanguage ?? detectLanguage(question);

  try {
    const retrieved = await retrieveRelevant(question, 5);

    if (isDemoMode()) {
      const synthesized = demoSynthesizeAnswer(question, language, retrieved);
      const threshold = getEscalationThreshold();
      const shouldEscalate =
        synthesized.should_escalate || synthesized.confidence < threshold;
      return {
        ...synthesized,
        should_escalate: shouldEscalate,
        language,
        retrieved_ids: retrieved.map((e) => e.id),
        latency_ms: Date.now() - start,
        prompt_version: PROMPT_VERSION,
      };
    }

    const systemPrompt = buildSystemPrompt(retrieved, language);
    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: systemPrompt,
      messages: [{ role: "user", content: question }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text block in Claude response");
    }

    const raw = stripMarkdownFences(textBlock.text);
    const parsed = structuredAnswerSchema.parse(JSON.parse(raw));

    const threshold = getEscalationThreshold();
    const shouldEscalate =
      parsed.should_escalate || parsed.confidence < threshold;

    return {
      ...parsed,
      should_escalate: shouldEscalate,
      language,
      retrieved_ids: retrieved.map((e) => e.id),
      latency_ms: Date.now() - start,
      prompt_version: PROMPT_VERSION,
    };
  } catch (err) {
    logger.error("ask_pipeline_error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return fallbackResult(language, Date.now() - start);
  }
}

export { MODEL as ASK_MODEL };
