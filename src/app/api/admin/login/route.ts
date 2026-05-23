import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const password: string = body.password || "";
    if (!password || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Password required" }, { status: 400 });
    }
    if (!verifyPassword(password)) {
      // Slight delay to discourage brute force
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
    }
    await setSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}