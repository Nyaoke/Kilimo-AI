# Kilimo AI

A WhatsApp-first agronomy assistant for Kenyan smallholder farmers. Farmers ask questions in English or Swahili and receive grounded, source-cited answers via Twilio. Low-confidence responses escalate to a human agronomist queue.

## Architecture

```
Farmer's phone
  │ WhatsApp message
  ▼
Twilio WhatsApp API
  │ POST webhook (signed)
  ▼
Next.js /api/webhook/twilio
  ├─ 1. Verify Twilio signature
  ├─ 2. Detect language (English / Swahili)
  ├─ 3. Embed the question
  ├─ 4. Vector search KB (top-K = 5, cosine)
  ├─ 5. Build prompt with retrieved chunks + system rules
  ├─ 6. Call Claude Sonnet 4.6
  ├─ 7. Parse structured response (answer, confidence, citations)
  ├─ 8. If confidence < 0.6, mark for escalation
  ├─ 9. Log conversation to Supabase
  └─ 10. Return TwiML response
```

## Stack

- Next.js 15 (App Router), TypeScript
- Tailwind CSS 4
- Anthropic Claude Sonnet 4.6 (generation), Haiku 4.5 (eval judge)
- Voyage AI voyage-3 embeddings (OpenAI fallback)
- Supabase Postgres + pgvector
- Twilio WhatsApp Business API

## Setup

1. Clone the repo and install dependencies: `npm install`
2. **Quick demo (no API keys):** copy `.env.example` to `.env.local`, set `DEMO_MODE=true`, then `npm run dev`. Open http://localhost:3000
3. **Full setup:** copy `.env.example` to `.env.local` and fill in all values
4. Create a Supabase project and run the migration in `supabase/migrations/0001_initial.sql` via the SQL editor
5. Seed the knowledge base: `npm run seed`
6. Start the dev server: `npm run dev`
7. Test without WhatsApp:
   - English: `http://localhost:3000/api/dev/ask?q=How do I control fall armyworm in maize?&lang=en`
   - Swahili: `http://localhost:3000/api/dev/ask?q=Nidhibitije viwavijeshi kwenye mahindi?&lang=sw`
8. Run the smoke test: `npm run demo:smoke`
9. Open `http://localhost:3000` for the landing page and `/admin` for the dashboard

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md) for the 5-step quick reference. Total time from clone to live demo: 30 to 45 minutes.

## Evaluations

Run the golden set locally:

```bash
npm run evals
```

Or trigger via API:

```bash
curl -X POST "http://localhost:3000/api/eval/run?key=YOUR_ADMIN_KEY"
```

Pass threshold: score >= 70 per case. Target pass rate: >= 80%.

## 5-minute demo script

1. Open the landing page and explain the retrieval + eval + escalation architecture (10s)
2. Scan the WhatsApp QR and send a real Swahili agronomy question (60s)
3. Send an out-of-scope question to show escalation (30s)
4. Walk through `/admin`: volume, language split, escalation queue, latency (60s)
5. Trigger an eval run on camera and show pass rate (90s)
6. Close on honest limitations: 30-entry KB, heuristic language detection, demo scope (30s)

## Safety and data handling

- Phone numbers are SHA-256 hashed with a server salt before storage
- No invented pesticide dosages or fertilizer rates in KB content
- Twilio webhook signatures verified on every request
- Server secrets protected with `server-only` import guards
- All LLM responses validated with Zod before use

## Honest limitations

- Knowledge base is 30 curated entries; production would need 500+ agronomist-reviewed entries
- Language detection is heuristic; production should use a proper detector
- WhatsApp only; no SMS fallback
- No integration with a farmer system of record
- Single-shot RAG only; no multi-turn memory or tool use
- Evaluation set is 25 cases with single LLM grading; production needs 200+ with dual human grading

## Next steps

- Expand KB with agronomist review
- Add SMS via Twilio Messaging Service
- Add tool use for weather and market prices
- Add multi-turn conversation memory
- Fine-tune embeddings for Swahili agronomy vocabulary
- Integrate with an existing farmer CRM or ERP
