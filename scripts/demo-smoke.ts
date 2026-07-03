/**
 * Smoke-test the demo without external API keys.
 * Run: npm run demo:smoke
 */
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

async function fetchJson(path: string) {
  const res = await fetch(`${BASE}${path}`);
  const text = await res.text();
  try {
    return { status: res.status, body: JSON.parse(text) };
  } catch {
    return { status: res.status, body: text };
  }
}

async function main() {
  console.log("Kilimo AI demo smoke test\n");

  const home = await fetch(`${BASE}/`);
  console.log(`Landing page: ${home.status} ${home.ok ? "OK" : "FAIL"}`);

  const admin = await fetch(`${BASE}/admin`);
  console.log(`Admin dashboard: ${admin.status} ${admin.ok ? "OK" : "FAIL"}`);

  const en = await fetchJson(
    "/api/dev/ask?q=How do I control fall armyworm in maize?&lang=en"
  );
  console.log(`\nEnglish ask (${en.status}):`);
  console.log(`  confidence: ${en.body.confidence}`);
  console.log(`  escalated: ${en.body.should_escalate}`);
  console.log(`  answer: ${String(en.body.answer).slice(0, 120)}...`);

  const sw = await fetchJson(
    "/api/dev/ask?q=Nidhibitije viwavijeshi kwenye mahindi?&lang=sw"
  );
  console.log(`\nSwahili ask (${sw.status}):`);
  console.log(`  confidence: ${sw.body.confidence}`);
  console.log(`  answer: ${String(sw.body.answer).slice(0, 120)}...`);

  const oos = await fetchJson(
    "/api/dev/ask?q=Who won the football match last night?&lang=en"
  );
  console.log(`\nOut-of-scope (${oos.status}):`);
  console.log(`  escalated: ${oos.body.should_escalate}`);
  console.log(`  confidence: ${oos.body.confidence}`);

  const twilio = await fetch(`${BASE}/api/webhook/twilio`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "Body=When should I plant maize?&From=whatsapp:+254700000000",
  });
  console.log(`\nTwilio webhook (unsigned, demo): ${twilio.status}`);
  const twiml = await twilio.text();
  console.log(`  TwiML preview: ${twiml.slice(0, 100)}...`);

  console.log("\nDemo smoke test complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
