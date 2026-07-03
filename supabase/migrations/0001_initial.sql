-- Kilimo AI initial schema
-- Vector dimension is 1024 (voyage-3). If you use OpenAI text-embedding-3-small,
-- change vector(1024) to vector(1536) below and reseed.

create extension if not exists vector;

create table if not exists kb_entries (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  crop text not null,
  question_en text not null,
  question_sw text not null,
  answer_en text not null,
  answer_sw text not null,
  source_citation text not null,
  embedding vector(1024),
  created_at timestamptz default now()
);

create index if not exists kb_entries_embedding_idx
  on kb_entries using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null,
  language text not null,
  question text not null,
  answer text not null,
  retrieved_ids uuid[] not null default '{}',
  confidence numeric(3,2) not null,
  escalated boolean not null default false,
  latency_ms integer not null,
  created_at timestamptz default now()
);

create index if not exists conversations_created_idx on conversations (created_at desc);
create index if not exists conversations_escalated_idx on conversations (escalated) where escalated = true;

create table if not exists eval_runs (
  id uuid primary key default gen_random_uuid(),
  commit_sha text,
  model text not null,
  prompt_version text not null,
  total_cases integer not null,
  passed integer not null,
  failed integer not null,
  average_score numeric(5,2) not null,
  details jsonb not null,
  created_at timestamptz default now()
);

create index if not exists eval_runs_created_idx on eval_runs (created_at desc);

create or replace function match_kb_entries(
  query_embedding vector(1024),
  match_count int default 5
)
returns table (
  id uuid,
  topic text,
  crop text,
  question_en text,
  question_sw text,
  answer_en text,
  answer_sw text,
  source_citation text,
  similarity float
)
language sql stable
as $$
  select
    kb.id, kb.topic, kb.crop,
    kb.question_en, kb.question_sw,
    kb.answer_en, kb.answer_sw,
    kb.source_citation,
    1 - (kb.embedding <=> query_embedding) as similarity
  from kb_entries kb
  where kb.embedding is not null
  order by kb.embedding <=> query_embedding
  limit match_count;
$$;
