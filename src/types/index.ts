export type Language = "en" | "sw";

export interface KbEntry {
  id: string;
  topic: string;
  crop: string;
  question_en: string;
  question_sw: string;
  answer_en: string;
  answer_sw: string;
  source_citation: string;
  similarity?: number;
}

export interface StructuredAnswer {
  answer: string;
  confidence: number;
  citations: string[];
  should_escalate: boolean;
  reason_for_escalation: string | null;
}

export interface AskResult extends StructuredAnswer {
  language: Language;
  retrieved_ids: string[];
  latency_ms: number;
  prompt_version: string;
}

export interface ConversationRow {
  id: string;
  phone_number: string;
  language: string;
  question: string;
  answer: string;
  retrieved_ids: string[];
  confidence: number;
  escalated: boolean;
  latency_ms: number;
  created_at: string;
}

export interface EvalCase {
  id: string;
  question: string;
  language: Language;
  expected_topics: string[];
  expected_min_confidence: number;
  must_cite_source: boolean;
  should_escalate: boolean;
  notes?: string;
}

export interface EvalCaseResult {
  case_id: string;
  question: string;
  language: Language;
  score: number;
  passed: boolean;
  reasoning: string;
  answer: string;
  confidence: number;
  escalated: boolean;
  latency_ms: number;
}

export interface EvalRunSummary {
  commit_sha: string | null;
  model: string;
  prompt_version: string;
  total_cases: number;
  passed: number;
  failed: number;
  average_score: number;
  details: EvalCaseResult[];
}

export interface SeedEntry {
  topic: string;
  crop: string;
  question_en: string;
  question_sw: string;
  answer_en: string;
  answer_sw: string;
  source_citation: string;
}
