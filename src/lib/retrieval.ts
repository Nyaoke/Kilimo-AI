import type { KbEntry } from "@/types";
import { demoRetrieveRelevant, isDemoMode } from "./demo";

export async function retrieveRelevant(
  question: string,
  k: number = 5
): Promise<KbEntry[]> {
  if (isDemoMode()) {
    return demoRetrieveRelevant(question, k);
  }

  const { embed } = await import("./embeddings");
  const { supabase } = await import("./supabase");
  const queryEmbedding = await embed(question);

  const { data, error } = await supabase().rpc("match_kb_entries", {
    query_embedding: queryEmbedding,
    match_count: k,
  });

  if (error) {
    throw new Error(`Retrieval failed: ${error.message}`);
  }

  return (data ?? []) as KbEntry[];
}
