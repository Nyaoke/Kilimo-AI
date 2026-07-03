import { NextRequest, NextResponse } from "next/server";
import { runEvals } from "@/evals/run";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function checkAdminKey(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return true;
  const key =
    req.nextUrl.searchParams.get("key") ??
    req.headers.get("x-admin-key");
  return key === adminKey;
}

export async function POST(req: NextRequest) {
  if (!checkAdminKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const commitSha = req.nextUrl.searchParams.get("commit_sha");
  const summary = await runEvals(commitSha);
  return NextResponse.json(summary);
}
