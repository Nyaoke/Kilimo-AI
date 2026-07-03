import "server-only";

import type { AskResult } from "@/types";
import { logger } from "./logger";
import { supabase } from "./supabase";

interface LogConversationInput {
  phoneHash: string;
  question: string;
  result: AskResult;
}

export async function logConversation({
  phoneHash,
  question,
  result,
}: LogConversationInput): Promise<void> {
  try {
    const { error } = await supabase().from("conversations").insert({
      phone_number: phoneHash,
      language: result.language,
      question,
      answer: result.answer,
      retrieved_ids: result.retrieved_ids,
      confidence: result.confidence,
      escalated: result.should_escalate,
      latency_ms: result.latency_ms,
    });
    if (error) {
      logger.error("conversation_log_failed", { error: error.message });
    }
  } catch (err) {
    logger.error("conversation_log_exception", {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

export async function getConversationCount(): Promise<number> {
  try {
    const { count, error } = await supabase()
      .from("conversations")
      .select("*", { count: "exact", head: true });
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function getRecentConversations(limit: number = 500) {
  try {
    const { data, error } = await supabase()
      .from("conversations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getLatestEvalRun() {
  try {
    const { data, error } = await supabase()
      .from("eval_runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getEvalRuns(limit: number = 20) {
  try {
    const { data, error } = await supabase()
      .from("eval_runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
