# Kilimo AI Deployment Guide

Quick reference for deploying from clone to live demo.

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open the SQL editor and run `supabase/migrations/0001_initial.sql`
3. Copy the project URL and service role key into `.env.local`

## 2. API keys

1. **Anthropic**: get an API key from [console.anthropic.com](https://console.anthropic.com)
2. **Voyage AI**: get an API key from [voyageai.com](https://www.voyageai.com) (or set `EMBEDDINGS_PROVIDER=openai` and use OpenAI)
3. Set `PHONE_HASH_SALT` and `ADMIN_KEY` to long random strings

## 3. Seed the knowledge base

```bash
npm install
npm run seed
```

## 4. Vercel

1. Connect the GitHub repo to Vercel
2. Add all env vars from `.env.example`
3. Set `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL
4. Deploy

## 5. Twilio WhatsApp sandbox

1. Sign up at [twilio.com](https://www.twilio.com) and activate the WhatsApp sandbox
2. Set the sandbox webhook to `https://<your-vercel-url>/api/webhook/twilio`
3. Join the sandbox from your phone using the join code
4. Send an agronomy question and verify the response

Total time: 30 to 45 minutes.
