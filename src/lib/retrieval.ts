import "server-only";

import type { KbEntry } from "@/types";
import { embed } from "./embeddings";
import { supabase } from "./supabase";

export async function retrieveRelevant(
  question: string,
  k: number = 5
): Promise<KbEntry[]> {
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
