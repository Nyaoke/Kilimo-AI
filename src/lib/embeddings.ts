import "server-only";

import { logger } from "./logger";

const BATCH_SIZE = 16;

async function embedVoyage(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    throw new Error("VOYAGE_API_KEY is required when EMBEDDINGS_PROVIDER=voyage");
  }

  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "voyage-3",
      input: texts,
      input_type: "document",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    logger.error("voyage_embed_failed", { status: response.status, body });
    throw new Error(`Voyage embedding failed: ${response.status}`);
  }

  const data = (await response.json()) as { data: { embedding: number[] }[] };
  return data.data.map((d) => d.embedding);
}

async function embedOpenAI(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required when EMBEDDINGS_PROVIDER=openai");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: texts,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    logger.error("openai_embed_failed", { status: response.status, body });
    throw new Error(`OpenAI embedding failed: ${response.status}`);
  }

  const data = (await response.json()) as { data: { embedding: number[] }[] };
  return data.data.map((d) => d.embedding);
}

async function embedBatchInternal(texts: string[]): Promise<number[][]> {
  const provider = process.env.EMBEDDINGS_PROVIDER ?? "voyage";
  if (provider === "openai") {
    return embedOpenAI(texts);
  }
  return embedVoyage(texts);
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const slice = texts.slice(i, i + BATCH_SIZE);
    const embeddings = await embedBatchInternal(slice);
    results.push(...embeddings);
  }
  return results;
}

export async function embed(text: string): Promise<number[]> {
  const [embedding] = await embedBatch([text]);
  return embedding;
}
