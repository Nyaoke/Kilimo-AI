import { NextRequest, NextResponse } from "next/server";
import { ask } from "@/lib/ask";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function checkAdminKey(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return true;
  const key = req.nextUrl.searchParams.get("key");
  return key === adminKey;
}

export async function GET(req: NextRequest) {
  if (!checkAdminKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "Missing q parameter" }, { status: 400 });
  }

  const lang = req.nextUrl.searchParams.get("lang");
  const forcedLang = lang === "sw" || lang === "en" ? lang : undefined;

  const result = await ask(q, forcedLang);
  return NextResponse.json(result);
}
