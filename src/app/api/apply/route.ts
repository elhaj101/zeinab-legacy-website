import { NextResponse } from "next/server";

/**
 * DEV-ONLY STUB. Logs the application payload server-side and returns ok.
 *
 * TODO before this can go live: real storage (a database — see the vault
 * project note's open questions on hosting/DB choice), an auto-confirmation
 * email to the applicant, and a notify-Seinab email. None of that can be
 * wired up until hosting/email accounts exist in Zeinab's own name and a
 * budget is agreed — see 2-Projects/zeinab-website.md in the Brain vault.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const required = ["name", "email", "businessType", "mainChallenge"];
  const missing = required.filter((key) => !body[key]);
  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "missing_fields", missing }, { status: 400 });
  }

  // eslint-disable-next-line no-console -- intentional dev-only visibility until real storage exists
  console.log("[apply] stub submission received:", body);

  return NextResponse.json({ ok: true });
}
