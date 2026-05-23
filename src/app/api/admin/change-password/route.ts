import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setNewPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { current, next } = await req.json();
    if (!current || !next) {
      return NextResponse.json({ error: "Both passwords required" }, { status: 400 });
    }
    if (typeof next !== "string" || next.length < 10) {
      return NextResponse.json(
        { error: "New password must be at least 10 characters" },
        { status: 400 }
      );
    }
    if (!verifyPassword(current)) {
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }
    setNewPassword(next);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}