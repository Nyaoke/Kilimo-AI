import { NextRequest, NextResponse } from "next/server";
import { ask } from "@/lib/ask";
import { logConversation } from "@/lib/conversations";
import { isDemoMode } from "@/lib/demo";
import { hashPhone } from "@/lib/hash";
import { logger } from "@/lib/logger";
import { verifyTwilioSignature, twimlMessage } from "@/lib/twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WELCOME_MESSAGE =
  "Karibu Kilimo AI! Uliza swali lako la kilimo kwa Kiingereza au Kiswahili. Welcome to Kilimo AI! Ask your farming question in English or Swahili.";

const ERROR_MESSAGE =
  "Samahani, kuna hitilafu, jaribu tena baadaye. Sorry, something went wrong, please try again.";

function getWebhookUrl(req: NextRequest): string {
  const base = process.env.NEXT_PUBLIC_APP_URL;
  if (base) {
    return `${base.replace(/\/$/, "")}/api/webhook/twilio`;
  }
  return req.url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    const signature = req.headers.get("x-twilio-signature");
    const url = getWebhookUrl(req);

    const skipVerify = isDemoMode() && !process.env.TWILIO_AUTH_TOKEN;
    if (!skipVerify && !verifyTwilioSignature(signature, url, params)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = (params.Body ?? "").trim();
    const from = params.From ?? "unknown";

    if (!body) {
      return new NextResponse(twimlMessage(WELCOME_MESSAGE), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }

    const result = await ask(body);
    await logConversation({
      phoneHash: hashPhone(from),
      question: body,
      result,
    });

    return new NextResponse(twimlMessage(result.answer), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err) {
    logger.error("twilio_webhook_error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return new NextResponse(twimlMessage(ERROR_MESSAGE), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
}
