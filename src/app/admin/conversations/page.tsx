import Link from "next/link";
import { getRecentConversations } from "@/lib/conversations";
import type { ConversationRow } from "@/types";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function ConversationsPage() {
  let conversations: ConversationRow[] = [];
  try {
    conversations = (await getRecentConversations(200)) as ConversationRow[];
  } catch {
    // Empty on failure
  }

  return (
    <div className="min-h-screen bg-paper text-loam">
      <header className="border-b border-line bg-paper-2 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Conversations</h1>
          <nav className="flex gap-4 font-mono text-xs uppercase tracking-wider">
            <Link href="/admin" className="text-muted hover:text-loam">Overview</Link>
            <Link href="/admin/conversations" className="text-murram">Conversations</Link>
            <Link href="/admin/evals" className="text-muted hover:text-loam">Evals</Link>
            <Link href="/" className="text-muted hover:text-loam">Landing</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="space-y-4">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`rounded-lg border border-line border-l-4 bg-paper-2 p-5 ${
                c.escalated ? "border-l-murram" : "border-l-growth"
              }`}
            >
              <p className="font-medium">{c.question}</p>
              <p className="mt-3 text-sm text-muted">{c.answer}</p>
              <p className="mt-3 font-mono text-xs text-muted">
                {c.language} · confidence {Number(c.confidence).toFixed(2)} ·{" "}
                {c.escalated ? "escalated" : "answered"} · {c.latency_ms}ms ·{" "}
                {formatDate(c.created_at)}
              </p>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-sm text-muted">No conversations logged yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
