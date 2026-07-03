import Link from "next/link";
import {
  getConversationCount,
  getLatestEvalRun,
  getRecentConversations,
} from "@/lib/conversations";
import type { ConversationRow } from "@/types";

export const dynamic = "force-dynamic";

function formatPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  let conversations: ConversationRow[] = [];
  let latestEval: Awaited<ReturnType<typeof getLatestEvalRun>> = null;

  try {
    conversations = (await getRecentConversations(500)) as ConversationRow[];
    latestEval = await getLatestEvalRun();
  } catch {
    // Empty state on DB failure
  }

  const total = conversations.length;
  const avgConfidence =
    total > 0
      ? conversations.reduce((s, c) => s + Number(c.confidence), 0) / total
      : 0;
  const escalated = conversations.filter((c) => c.escalated);
  const escalationRate = total > 0 ? escalated.length / total : 0;
  const avgLatency =
    total > 0
      ? conversations.reduce((s, c) => s + c.latency_ms, 0) / total
      : 0;
  const swahiliCount = conversations.filter((c) => c.language === "sw").length;
  const swahiliShare = total > 0 ? swahiliCount / total : 0;

  const evalLabel = latestEval
    ? `${latestEval.passed}/${latestEval.total_cases}`
    : "n/a";

  const stats = [
    { label: "Conversations", value: String(total) },
    { label: "Avg confidence", value: total > 0 ? avgConfidence.toFixed(2) : "n/a" },
    { label: "Escalation rate", value: total > 0 ? formatPct(escalationRate) : "n/a", accent: true },
    { label: "Avg latency", value: total > 0 ? `${Math.round(avgLatency)}ms` : "n/a" },
    { label: "Swahili share", value: total > 0 ? formatPct(swahiliShare) : "n/a" },
    { label: "Last eval", value: evalLabel },
  ];

  return (
    <div className="min-h-screen bg-paper text-loam">
      <header className="border-b border-line bg-paper-2 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Kilimo AI Admin</h1>
          <nav className="flex gap-4 font-mono text-xs uppercase tracking-wider">
            <Link href="/admin" className="text-murram">Overview</Link>
            <Link href="/admin/conversations" className="text-muted hover:text-loam">Conversations</Link>
            <Link href="/admin/evals" className="text-muted hover:text-loam">Evals</Link>
            <Link href="/" className="text-muted hover:text-loam">Landing</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-line bg-paper-2 p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {stat.label}
              </p>
              <p
                className={`mt-1 font-display text-2xl font-semibold ${
                  stat.accent ? "text-murram" : ""
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Escalation queue
          </h2>
          {escalated.length === 0 ? (
            <p className="text-sm text-muted">No escalated conversations yet.</p>
          ) : (
            <div className="space-y-3">
              {escalated.slice(0, 10).map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-line border-l-4 border-l-murram bg-paper-2 p-4"
                >
                  <p className="text-sm">{c.question}</p>
                  <p className="mt-2 font-mono text-xs text-muted">
                    {c.language} · confidence {Number(c.confidence).toFixed(2)} ·{" "}
                    {formatDate(c.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              Recent conversations
            </h2>
            <Link
              href="/admin/conversations"
              className="font-mono text-xs text-sky hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {conversations.slice(0, 10).map((c) => (
              <div
                key={c.id}
                className={`rounded-lg border border-line border-l-4 bg-paper-2 p-4 ${
                  c.escalated ? "border-l-murram" : "border-l-growth"
                }`}
              >
                <p className="text-sm font-medium">{c.question}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{c.answer}</p>
              </div>
            ))}
            {conversations.length === 0 && (
              <p className="text-sm text-muted">No conversations logged yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
