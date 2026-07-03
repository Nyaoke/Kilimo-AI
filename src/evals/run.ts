import { ask, ASK_MODEL } from "@/lib/ask";
import { demoSaveEvalRun, isDemoMode } from "@/lib/demo";
import { PROMPT_VERSION } from "@/lib/prompt";
import type { EvalCaseResult, EvalRunSummary } from "@/types";
import { GOLDEN_CASES } from "./golden";
import { judge } from "./judge";

const PASS_THRESHOLD = 70;

export async function runEvals(commitSha?: string | null): Promise<EvalRunSummary> {
  const details: EvalCaseResult[] = [];

  for (const testCase of GOLDEN_CASES) {
    const result = await ask(testCase.question, testCase.language);
    const verdict = await judge(testCase, result);
    const passed = verdict.score >= PASS_THRESHOLD;

    details.push({
      case_id: testCase.id,
      question: testCase.question,
      language: testCase.language,
      score: verdict.score,
      passed,
      reasoning: verdict.reasoning,
      answer: result.answer,
      confidence: result.confidence,
      escalated: result.should_escalate,
      latency_ms: result.latency_ms,
    });
  }

  const passed = details.filter((d) => d.passed).length;
  const failed = details.length - passed;
  const averageScore =
    details.reduce((sum, d) => sum + d.score, 0) / details.length;

  const summary: EvalRunSummary = {
    commit_sha: commitSha ?? null,
    model: ASK_MODEL,
    prompt_version: PROMPT_VERSION,
    total_cases: details.length,
    passed,
    failed,
    average_score: Math.round(averageScore * 100) / 100,
    details,
  };

  if (isDemoMode()) {
    demoSaveEvalRun(summary);
  } else {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase().from("eval_runs").insert({
        commit_sha: summary.commit_sha,
        model: summary.model,
        prompt_version: summary.prompt_version,
        total_cases: summary.total_cases,
        passed: summary.passed,
        failed: summary.failed,
        average_score: summary.average_score,
        details: summary.details,
      });
    } catch {
      // Non-fatal if DB unavailable during CLI run
    }
  }

  return summary;
}

if (process.argv[1]?.endsWith("run.ts")) {
  runEvals()
    .then((summary) => {
      console.log(
        `${summary.passed}/${summary.total_cases} passed, avg ${summary.average_score}`
      );
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
