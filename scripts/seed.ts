/**
 * Standalone seed script: embeds KB entries and inserts into Supabase.
 * Run with: npm run seed
 */
import { createClient } from "@supabase/supabase-js";
import { KB_SEED } from "../src/data/kb";

const BATCH_SIZE = 16;

async function embedBatch(texts: string[]): Promise<number[][]> {
  const provider = process.env.EMBEDDINGS_PROVIDER ?? "voyage";

  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY required");
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "text-embedding-3-small", input: texts }),
    });
    if (!res.ok) throw new Error(`OpenAI embed failed: ${res.status}`);
    const data = (await res.json()) as { data: { embedding: number[] }[] };
    return data.data.map((d) => d.embedding);
  }

  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) throw new Error("VOYAGE_API_KEY required");
  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
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
  if (!res.ok) throw new Error(`Voyage embed failed: ${res.status}`);
  const data = (await res.json()) as { data: { embedding: number[] }[] };
  return data.data.map((d) => d.embedding);
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }

  const supabase = createClient(url, key);

  console.log(`Seeding ${KB_SEED.length} KB entries...`);

  const texts = KB_SEED.map(
    (e) => `${e.topic}. ${e.question_en} ${e.answer_en}`
  );

  const allEmbeddings: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const slice = texts.slice(i, i + BATCH_SIZE);
    const embeddings = await embedBatch(slice);
    allEmbeddings.push(...embeddings);
    console.log(`Embedded ${Math.min(i + BATCH_SIZE, texts.length)}/${texts.length}`);
  }

  const { error: deleteError } = await supabase
    .from("kb_entries")
    .delete()
    .neq("topic", "__never__");
  if (deleteError) {
    console.warn("Delete warning:", deleteError.message);
  }

  const rows = KB_SEED.map((entry, i) => ({
    topic: entry.topic,
    crop: entry.crop,
    question_en: entry.question_en,
    question_sw: entry.question_sw,
    answer_en: entry.answer_en,
    answer_sw: entry.answer_sw,
    source_citation: entry.source_citation,
    embedding: allEmbeddings[i],
  }));

  const { error: insertError } = await supabase.from("kb_entries").insert(rows);
  if (insertError) {
    throw new Error(`Insert failed: ${insertError.message}`);
  }

  console.log(`Done. Inserted ${rows.length} entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
