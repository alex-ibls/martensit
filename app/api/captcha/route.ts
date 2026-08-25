import { NextResponse } from "next/server";
import { captchaConfigured, issueCaptcha } from "@/lib/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!captchaConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const { token, svg } = issueCaptcha();
  return NextResponse.json(
    { token, svg },
    { headers: { "Cache-Control": "no-store" } },
  );
}
