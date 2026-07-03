import Link from "next/link";
import { getEvalRuns } from "@/lib/conversations";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function EvalsPage() {
  let runs: Awaited<ReturnType<typeof getEvalRuns>> = [];
  try {
    runs = await getEvalRuns(20);
  } catch {
    // Empty on failure
  }

  return (
    <div className="min-h-screen bg-paper text-loam">
      <header className="border-b border-line bg-paper-2 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Eval Runs</h1>
          <nav className="flex gap-4 font-mono text-xs uppercase tracking-wider">
            <Link href="/admin" className="text-muted hover:text-loam">Overview</Link>
            <Link href="/admin/conversations" className="text-muted hover:text-loam">Conversations</Link>
            <Link href="/admin/evals" className="text-murram">Evals</Link>
            <Link href="/" className="text-muted hover:text-loam">Landing</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-8 text-sm text-muted">
          Trigger a new eval run with{" "}
          <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-xs">
            POST /api/eval/run
          </code>{" "}
          and your ADMIN_KEY as query param or x-admin-key header.
        </p>

        <div className="space-y-4">
          {runs.map((run) => {
            const rate =
              run.total_cases > 0
                ? Math.round((run.passed / run.total_cases) * 100)
                : 0;
            const passColor = rate >= 80 ? "text-growth" : "text-murram";

            return (
              <div
                key={run.id}
                className="rounded-lg border border-line bg-paper-2 p-5"
              >
                <p className={`font-display text-lg font-semibold ${passColor}`}>
                  {run.passed}/{run.total_cases} passed · {rate}%
                </p>
                <p className="mt-2 font-mono text-xs text-muted">
                  avg {Number(run.average_score).toFixed(1)} · {run.model} ·{" "}
                  {run.prompt_version} · {formatDate(run.created_at)}
                </p>
              </div>
            );
          })}
          {runs.length === 0 && (
            <p className="text-sm text-muted">No eval runs recorded yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
