import { randomUUID } from "crypto";
import { KB_SEED } from "@/data/kb";
import type { ConversationRow, EvalRunSummary, KbEntry, Language } from "@/types";

export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "true") return true;
  if (process.env.DEMO_MODE === "false") return false;
  return !process.env.SUPABASE_URL || !process.env.ANTHROPIC_API_KEY;
}

const DEMO_KB: KbEntry[] = KB_SEED.map((entry) => ({
  id: `demo-${entry.topic}`,
  topic: entry.topic,
  crop: entry.crop,
  question_en: entry.question_en,
  question_sw: entry.question_sw,
  answer_en: entry.answer_en,
  answer_sw: entry.answer_sw,
  source_citation: entry.source_citation,
}));

const conversations: ConversationRow[] = [];
const evalRuns: Array<EvalRunSummary & { id: string; created_at: string }> = [];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\u00c0-\u024f\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function demoRetrieveRelevant(question: string, k: number = 5): KbEntry[] {
  const tokens = tokenize(question);
  const scored = DEMO_KB.map((entry) => {
    const haystack = [
      entry.topic,
      entry.crop,
      entry.question_en,
      entry.question_sw,
      entry.answer_en,
      entry.answer_sw,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += 1;
    }
    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, k);

  if (top.length === 0) {
    return [];
  }

  return top.map((s) => ({
    ...s.entry,
    similarity: s.score / Math.max(tokens.length, 1),
  }));
}

const OUT_OF_SCOPE_PATTERNS = [
  "football",
  "soccer",
  "match",
  "politics",
  "president",
  "movie",
  "music",
  "meaning of life",
];

export function demoSynthesizeAnswer(
  question: string,
  language: Language,
  retrieved: KbEntry[]
): {
  answer: string;
  confidence: number;
  citations: string[];
  should_escalate: boolean;
  reason_for_escalation: string | null;
} {
  const lower = question.toLowerCase();
  const isOutOfScope = OUT_OF_SCOPE_PATTERNS.some((p) => lower.includes(p));

  if (isOutOfScope || retrieved.length === 0) {
    const answer =
      language === "sw"
        ? "Samahani, swali hilo liko nje ya upeo wa Kilimo AI. Mtaalamu wa kilimo atakujibu hivi karibuni."
        : "Sorry, that question is outside Kilimo AI's scope. A human agronomist will follow up shortly.";
    return {
      answer,
      confidence: 0.3,
      citations: [],
      should_escalate: true,
      reason_for_escalation: "out_of_scope",
    };
  }

  const best = retrieved[0];
  const body = language === "sw" ? best.answer_sw : best.answer_en;
  const sourceLabel = language === "sw" ? "Chanzo" : "Source";
  const answer = `${body} ${sourceLabel}: ${best.source_citation}`;
  const confidence = Math.min(0.65 + (best.similarity ?? 0) * 0.25, 0.92);

  return {
    answer,
    confidence,
    citations: [best.id],
    should_escalate: false,
    reason_for_escalation: null,
  };
}

export function demoLogConversation(input: {
  phoneHash: string;
  question: string;
  language: Language;
  answer: string;
  retrieved_ids: string[];
  confidence: number;
  escalated: boolean;
  latency_ms: number;
}): void {
  conversations.unshift({
    id: randomUUID(),
    phone_number: input.phoneHash,
    language: input.language,
    question: input.question,
    answer: input.answer,
    retrieved_ids: input.retrieved_ids,
    confidence: input.confidence,
    escalated: input.escalated,
    latency_ms: input.latency_ms,
    created_at: new Date().toISOString(),
  });
}

export function demoGetConversationCount(): number {
  return conversations.length;
}

export function demoGetRecentConversations(limit: number): ConversationRow[] {
  return conversations.slice(0, limit);
}

export function demoSaveEvalRun(summary: EvalRunSummary): void {
  evalRuns.unshift({
    ...summary,
    id: randomUUID(),
    created_at: new Date().toISOString(),
  });
}

export function demoGetLatestEvalRun() {
  return evalRuns[0] ?? null;
}

export function demoGetEvalRuns(limit: number) {
  return evalRuns.slice(0, limit);
}

export function demoJudgeScore(
  mustCite: boolean,
  shouldEscalate: boolean,
  result: {
    answer: string;
    confidence: number;
    should_escalate: boolean;
    citations: string[];
    language: Language;
  },
  expectedLanguage: Language
): { score: number; reasoning: string } {
  let score = 70;

  if (result.language !== expectedLanguage) score -= 20;
  if (shouldEscalate && !result.should_escalate) score -= 40;
  if (!shouldEscalate && result.should_escalate) score -= 15;
  if (mustCite && result.citations.length === 0) score -= 25;
  if (mustCite && !result.answer.toLowerCase().includes("source") && !result.answer.toLowerCase().includes("chanzo")) {
    score -= 15;
  }
  if (shouldEscalate && result.should_escalate) score = 95;
  if (!shouldEscalate && result.confidence >= 0.5 && result.citations.length > 0) score += 10;

  score = Math.max(0, Math.min(100, score));
  return {
    score,
    reasoning: `Demo judge: language match, escalation=${result.should_escalate}, citations=${result.citations.length}`,
  };
}

/** Pre-seed sample conversations so the admin dashboard is not empty on first load. */
export function seedDemoConversations(): void {
  if (conversations.length > 0) return;

  const samples = [
    {
      question: "How do I control fall armyworm in maize?",
      language: "en" as Language,
      topic: "maize_fall_armyworm",
    },
    {
      question: "Majani ya mahindi yangu yanabadilika manjano, nifanye nini?",
      language: "sw" as Language,
      topic: "maize_lethal_necrosis",
    },
    {
      question: "Who won the football match last night?",
      language: "en" as Language,
      topic: "general_out_of_scope",
    },
    {
      question: "Ninapaswa kupanda mahindi lini kwa mvua kubwa?",
      language: "sw" as Language,
      topic: "maize_planting_timing",
    },
    {
      question: "What fodder is good for dairy cows?",
      language: "en" as Language,
      topic: "dairy_fodder",
    },
  ];

  for (const sample of samples) {
    const retrieved = demoRetrieveRelevant(sample.question, 3);
    const synthesized = demoSynthesizeAnswer(
      sample.question,
      sample.language,
      retrieved
    );
    demoLogConversation({
      phoneHash: `demo-${sample.topic}`,
      question: sample.question,
      language: sample.language,
      answer: synthesized.answer,
      retrieved_ids: synthesized.citations,
      confidence: synthesized.confidence,
      escalated: synthesized.should_escalate,
      latency_ms: 120 + Math.floor(Math.random() * 200),
    });
  }
}

// Auto-seed on module load in demo mode
if (isDemoMode()) {
  seedDemoConversations();
}
